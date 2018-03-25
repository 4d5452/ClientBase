import { ValueActionTypes, ValueActions } from './value.actions';

export interface State {
    value: number;
}

const initialState: State = {
    value: 0
}

export function reducer(state: State = initialState, action: ValueActions): State {
    switch(action.type) {
        case ValueActionTypes.DEC_VALUE:
            return {
                value: state.value -1
            }
        case ValueActionTypes.INC_VALUE:
            return {
                value: state.value + 1
            }
        case ValueActionTypes.SET_VALUE:
            return {
                value: action.payload
            }
        default:
            return state;
    }
}

export const getValue = (state: State) => state.value;