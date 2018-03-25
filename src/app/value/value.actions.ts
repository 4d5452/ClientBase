import { Action } from '@ngrx/store';

export enum ValueActionTypes {
    DECREMENT_VALUE = '[Value] Decrement Value',
    INCREMENT_VALUE = '[Value] Increment Value',
    GET_VALUE = '[Value] Get Value',
    SET_VALUE = '[Value] Set Value'
}

export class DecrementValue implements Action {
    readonly type = ValueActionTypes.DECREMENT_VALUE;
}
export class IncrementValue implements Action {
    readonly type = ValueActionTypes.INCREMENT_VALUE;
}
export class GetValue implements Action {
    readonly type = ValueActionTypes.GET_VALUE;
}
export class SetValue implements Action {
    readonly type = ValueActionTypes.SET_VALUE;
    constructor(public payload: number) {}
}

export type ValueActions 
    = DecrementValue 
    | IncrementValue
    | GetValue 
    | SetValue;