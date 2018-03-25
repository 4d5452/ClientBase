import { StreamActionTypes, StreamActions } from './stream.actions';

export interface State {
    event: string;
    error: boolean;
    open: boolean;
    message: string;
    date: number; //TODO: sync between server-client
}

const initialState: State = {
    event: null,
    error: false,
    open: false,
    message: null,
    date: Date.now() 
}


export function reducer(state: State = initialState, action: StreamActions): State {
    switch(action.type) {
        case StreamActionTypes.OPEN:
            return {
                event: 'open',
                error: false,
                open: true,
                message: null,
                date: Date.now()
            }
        case StreamActionTypes.CLOSE:
            return {
                event: 'close',
                error: false,
                open: false,
                message: null,
                date: Date.now()
            }
        case StreamActionTypes.ERROR:
            return {
                event: 'error',
                error: true,
                open: false,
                message: null,
                date: Date.now()
            }
        case StreamActionTypes.MESSAGE:
            return Object.assign({}, state, 
                { event: 'message',
                message: action.payload,
                date: Date.now() }
            );
        default:
            return state;
    }
}

export const getEvent = (state: State) => state.event;
export const getError = (state: State) => state.error;
export const getOpen = (state: State) => state.open;
export const getMessage = (state: State) => state.message;
export const getDate = (state: State) => state.date;