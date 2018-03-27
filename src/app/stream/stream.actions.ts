import { Action } from '@ngrx/store';

export enum StreamActionTypes {
    OPEN = '[Stream] Open',
    CLOSE = '[Stream] Close',
    ERROR = '[Stream] Error',
    MESSAGE = '[Stream] Message'
}

export class Open implements Action {
    readonly type = StreamActionTypes.OPEN;
    constructor() {}
}
export class Close implements Action {
    readonly type = StreamActionTypes.CLOSE;
    constructor() {}
}
export class Error implements Action {
    readonly type = StreamActionTypes.ERROR;
    constructor(public payload: ErrorEvent) {}
}
export class Message implements Action {
    readonly type = StreamActionTypes.MESSAGE;
    constructor(public payload: string) {}
}

export type StreamActions 
    = Open 
    | Close
    | Error
    | Message