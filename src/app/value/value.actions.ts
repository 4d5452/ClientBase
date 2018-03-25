import { Action } from '@ngrx/store';

export enum ValueActionTypes {
    DEC_VALUE = '[value] Decrement Value',
    INC_VALUE = '[Value] Increment Value',
    SET_VALUE = '[Value] Set Value'
}

export class DecValue implements Action {
    readonly type = ValueActionTypes.DEC_VALUE;
}
export class IncValue implements Action {
    readonly type = ValueActionTypes.INC_VALUE;
}
export class SetValue implements Action {
    readonly type = ValueActionTypes.SET_VALUE;
    constructor(public payload: number) {}
}

export type ValueActions 
    = DecValue 
    | IncValue 
    | SetValue;