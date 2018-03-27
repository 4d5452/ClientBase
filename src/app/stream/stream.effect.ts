import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { filter, map, mergeMap } from 'rxjs/operators';

import * as fromRoot from '../reducers';
import * as streamActions from './stream.actions';

const READY_STATE = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSED: 2
}

@Injectable()
export class StreamEffectsService {
    constructor(private action$: Actions) {}

    @Effect() onStreamErrorEvent$: Observable<Action> = this.action$
        .ofType(streamActions.StreamActionTypes.ERROR)
        .pipe(
            map((action: streamActions.Error) => action.payload),
            filter((error: ErrorEvent) => error.target['readyState'] === READY_STATE.CLOSED),
            map(() => new streamActions.Open())
        );
}