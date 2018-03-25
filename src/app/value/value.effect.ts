import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { filter, map, mergeMap } from 'rxjs/operators';

import * as fromRoot from '../reducers';
import * as streamActions from '../stream/stream.actions';
import * as valueActions from './value.actions';
import * as nullActions from '../reducers/null/null.actions';

interface ValueResponseType {
    value: number;
}

@Injectable()
export class ValueEffectsService {
    constructor(private action$: Actions, private http: HttpClient) {}

    @Effect() onMessageUpdate$: Observable<Action> = this.action$
        .ofType(streamActions.StreamActionTypes.MESSAGE)
        .pipe(
            map((action: streamActions.Message) => action.payload),
            filter((message: string) => message === '[Value] Modified'),
            mergeMap(() => this.http.get("http://localhost:50001/value")),
            map((res: HttpResponse<ValueResponseType>) => new valueActions.SetValue(res['value']))
        );

    @Effect() onIncrementValue$: Observable<Action> = this.action$
        .ofType(valueActions.ValueActionTypes.INCREMENT_VALUE)
        .pipe(
            mergeMap(() => this.http.get("http://localhost:50001/increment")),
            map((res: HttpResponse<any>) => new nullActions.Null())
        );

    @Effect() onDecrementValue$: Observable<Action> = this.action$
        .ofType(valueActions.ValueActionTypes.DECREMENT_VALUE)
        .pipe(
            mergeMap(() => this.http.get("http://localhost:50001/decrement")),
            map((res: HttpResponse<any>) => new nullActions.Null())
        );

    @Effect() onGetValue$: Observable<Action> = this.action$
        .ofType(valueActions.ValueActionTypes.GET_VALUE)
        .pipe(
            mergeMap(() => this.http.get("http://localhost:50001/value")),
            map((res: HttpResponse<ValueResponseType>) => new valueActions.SetValue(res['value']))
        );
}