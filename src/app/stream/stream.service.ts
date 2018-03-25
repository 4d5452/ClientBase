import { Injectable, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import * as streamActions from './stream.actions';

declare var EventSource;
//TODO: Handle perm. close of communication to server by broswer
@Injectable()
export class StreamService {
    private eventSource: EventSource;

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

    open(origin: String, url: String) {
        if(!this.eventSource) { 
            //https://blog.octo.com/en/angular-2-sse-and-changes-detection/
            this.eventSource = new EventSource(`${origin}${url}`);

            this.eventSource.onerror = (event) => {
                //check that the origin matches for every event
                this.zone.run(() =>
                    this.store.dispatch(new streamActions.Error()));
            }
            
            this.eventSource.onopen = (event) => {
                this.zone.run(() =>
                    this.store.dispatch(new streamActions.Open()));
            }
             
            this.eventSource.onmessage = (event) => {
                if(event.origin != origin) {
                    this.zone.run(() => 
                        this.store.dispatch(new streamActions.Close()));
                    return;
                }
                this.zone.run(() =>
                    this.store.dispatch(new streamActions.Message(event.data)));
            }
        }
    }

    close() {
        if(this.eventSource) {
            this.store.dispatch(new streamActions.Close());
            this.eventSource.close();
            this.eventSource = null;
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