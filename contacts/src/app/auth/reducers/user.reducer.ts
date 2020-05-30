import { ActionUnion, ActionTypes, LoginFailure, LoginSuccess, SetUserInfo, } from "../actions";

export interface AttemptResult {
    attempted: boolean;
    result: boolean;
}

export interface State {
    username: string;
    email: string;
    roles: string[];
    signUpFailed: boolean;
    signUpSuccess: boolean;
    signUpFailure: string;
    emailVerified: boolean;
    changePassword: AttemptResult;
    changeEmail: AttemptResult;
    verifyEmail: AttemptResult;
    updateUserStateBeat: number;
}

export const initialState: State = {
    username: null,
    email: null,
    roles: null,
    signUpFailed: false,
    signUpSuccess: false,
    signUpFailure: '',
    emailVerified: false,
    changePassword: {
        attempted: false,
        result: false,
    },
    changeEmail: {
        attempted: false,
        result: false,
    },
    verifyEmail: {
        attempted: false,
        result: false,
    },
    updateUserStateBeat : 0,
}

export function reducer(state = initialState, action: ActionUnion): State {
    switch (action.type) {
        case ActionTypes.SetUserInfo:
            const userInfoAction = action as SetUserInfo;
            return {
                ...state,
                email: userInfoAction.email,
                roles: userInfoAction.roles,
                username: userInfoAction.username,
                emailVerified: userInfoAction.isEmailVerified,
                updateUserStateBeat: state.updateUserStateBeat + 1,
            }
        case ActionTypes.Logout:
            return {
                ...state,
                updateUserStateBeat: state.updateUserStateBeat + 1,
                email: null,
                roles: [],
                username: null,
                emailVerified: false,
            }
        case ActionTypes.LoginFailure: {
            return {
                ...state,
                email: null,
                roles: [],
                username: null,
                emailVerified: false,
                updateUserStateBeat: state.updateUserStateBeat + 1,
            }
        }
        default: {
            return state;
        }
    }
}

export const hasRole = (state: State, role: string) => state.roles != null && state.roles.indexOf(role) >= 0;
export const hasAnyOfRoles = (state: State, roles: string[]) => roles.some(role => hasRole(state, role))