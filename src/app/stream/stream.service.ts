import { Injectable, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../reducers';
import * as streamActions from './stream.actions';

declare var EventSource;

//TODO: Handle perm. close of communication to server by broswer
@Injectable()
export class StreamService {
    private eventSource$: Subscription;

    private event$: Observable<string>;
    private error$: Observable<boolean>;
    private open$: Observable<boolean>;
    private message$: Observable<string>;
    private date$: Observable<number>;

    constructor(private store: Store<fromRoot.State>, private zone: NgZone) {
        this.event$ = this.store.select<string>(fromRoot.getStreamEvent);
        this.error$ = this.store.select<boolean>(fromRoot.getStreamError);
        this.open$ = this.store.select<boolean>(fromRoot.getStreamOpen);
        this.message$ = this.store.select<string>(fromRoot.getStreamMessage);
        this.date$ = this.store.select<number>(fromRoot.getStreamDate);
    }

    openEventSource(origin: String, url: String): Observable<any> {
        //https://blog.octo.com/en/angular-2-sse-and-changes-detection/
        return Observable.create(observer => {
            let eventSource = new EventSource(`${origin}${url}`);
            eventSource.onopen = event => this.zone.run(() => {
                this.store.dispatch(new streamActions.Open());
                observer.next(event);
            });
            eventSource.onmessage = message => this.zone.run(() => {
                if(message.origin != origin) {
                    this.store.dispatch(new streamActions.Close());
                    observer.error("Invalid Origin");
                } else {
                    this.store.dispatch(new streamActions.Message(message.data));
                    observer.next(message);
                }
            });
            eventSource.onerror = error => this.zone.run(() => {
                this.store.dispatch(new streamActions.Error());
                observer.next(error);
            });
            return () => eventSource.close();            
        });
    }

    open(origin: String, url: String) {
        if(!this.eventSource$) {
            this.eventSource$ = this.openEventSource(origin, url).subscribe();
        }
    }

    close() {
        if(this.eventSource$) {
            this.store.dispatch(new streamActions.Close());
            this.eventSource$.unsubscribe();
            this.eventSource$ = null;
        }
    }

    getEvent(): Observable<string> {
        return this.event$;
    }

    hasError(): Observable<boolean> {
        return this.error$;
    }

    isOpen(): Observable<boolean> {
        return this.open$;
    }

    getMessage(): Observable<string> {
        return this.message$;
    }

    getDate(): Observable<number> {
        return this.date$;
    }
}

//https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events