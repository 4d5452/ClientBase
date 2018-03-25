import { NullActionTypes, NullActions, Null } from './null.actions';

export interface State {}

const initialState: State = {}


export function reducer(state: State = initialState, action: NullActions): State {
    switch(action.type) {
        case NullActionTypes.NULL:
            return {}
        default:
            return state;
    }
}