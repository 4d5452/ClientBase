import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';

import * as fromRoot from '../reducers';
import * as valueActions from './value.actions';

@Injectable()
export class ValueService {
    private message$: Observable<string>;
    private date$: Observable<number>;
    private value$: Observable<number>;

    constructor(private store: Store<fromRoot.State>, private http: HttpClient) {

        this.store.pipe(
            select(fromRoot.getStreamOpen),
            filter(open => open === true)
        ).subscribe(() => this.store.dispatch(new valueActions.GetValue()));
        this.value$ = this.store.select<number>(fromRoot.getValue);
    }

    getValue(): Observable<number> {
        return this.value$;
    }

    increment(): void {
        this.store.dispatch(new valueActions.IncrementValue());
    }

    decrement(): void {
        this.store.dispatch(new valueActions.DecrementValue());
    }
}