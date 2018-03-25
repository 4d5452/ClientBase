import { Action } from '@ngrx/store';

export enum NullActionTypes {
    NULL = '[Null] Null'
}

export class Null implements Action {
    readonly type = NullActionTypes.NULL;
}

export type NullActions 
    = Null;