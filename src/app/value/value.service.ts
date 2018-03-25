import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged, filter, map, mergeMap, zip } from 'rxjs/operators';

import * as fromRoot from '../reducers';
import * as valueActions from './value.actions';

@Injectable()
export class ValueService {
    private message$: Observable<string>;
    private date$: Observable<number>;
    private value$: Observable<number>;
    
    private obj: {} = {message: "", date: Date.now()};

    constructor(private store: Store<fromRoot.State>, private http: HttpClient) {
        //Needed to bypass ngrx 'select' feature.  Store 'select' would not push 'primitives' if value remained the same.
        //Needs to be moved to effects
        /*
        this.message$ = this.store.pipe(map(fromRoot.getStreamMessage));
        this.date$ = this.store.pipe(map(fromRoot.getStreamDate));
        this.message$.pipe(
            zip(this.date$, (msg, date) => {
                if(date !== this.obj['date']) {
                    this.obj = { message: msg, date: date }
                    return this.obj;
                }
                return this.obj;
            }),
            distinctUntilChanged(),
            filter(obj => obj['message'] === "[Value] Modified"),
            mergeMap(() => this.http.get("http://localhost:50001/value"))
        ).subscribe((res) => {
            this.store.dispatch(new valueActions.SetValue(res['value']));
        });*/

        this.store.pipe(
            select(fromRoot.getStreamOpen),
            filter(open => open === true),
            mergeMap(() => this.http.get("http://localhost:50001/value"))
        ).subscribe((res) => {
            this.store.dispatch(new valueActions.SetValue(res['value']));
        });
        this.value$ = this.store.select<number>(fromRoot.getValue);
    }

    getValue(): Observable<number> {
        return this.value$;
    }

    increment(): void {
        this.store.dispatch(new valueActions.IncValue());
    }

    decrement(): void {
        this.store.dispatch(new valueActions.DecValue());
    }
}