import { ActionUnion, ActionTypes,  LoadContactsResult } from "../actions";
import { ContactDto } from '../dto/contact';

export interface State {
    contacts: ContactDto[];
}

export const initialState: State = {
    contacts: [],
}

export function reducer(state = initialState, action: ActionUnion): State {
    switch (action.type) {
        case ActionTypes.LoadContactsResult:
            const result = action as LoadContactsResult;
            return {
                ...state,
                contacts: result.result,
            }
        default: {
            return state;
        }
    }
}