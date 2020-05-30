import { ActionUnion, ActionTypes, LoginFailure, LoginSuccess } from "../actions";

export interface State {
    isLoginFailure: boolean;
    isLoginSuccess: boolean;
    failureReason: string;
    expiresIn: number;
}

export const initialState: State = {
    isLoginFailure: false,
    isLoginSuccess: false,
    failureReason: '',
    expiresIn: -1,
}

export function reducer(state = initialState, action: ActionUnion): State {
    switch (action.type) {
        case ActionTypes.LoginFailure:
            const failureAction = action as LoginFailure;
            return {
                ...state,
                isLoginFailure: true,
                isLoginSuccess: false,
                failureReason: failureAction.failure
            }
        case ActionTypes.LoginSuccess:
            const successAction = action as LoginSuccess;
            return {
                ...state,
                isLoginFailure: false,
                isLoginSuccess: true,
                expiresIn: successAction.payload.expiresIn,
            }
        case ActionTypes.ClearLoginSuccessAndFailure:
            return {
                ...state,
                isLoginFailure: false,
                isLoginSuccess: false,
                failureReason: ''
            }
        default: {
            return state;
        }
    }
}


