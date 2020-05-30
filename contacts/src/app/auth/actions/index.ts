import { Action } from '@ngrx/store';
import { LoginSuccessDto, LoginFailureDto, } from "../dto";

export enum ActionTypes {
    Login = '[MdzAuthActionTypes] Login',
    Logout = '[MdzAuthActionTypes] Logout',
    LoginSuccess = '[MdzAuthActionTypes] LoginSuccess',
    LoginFailure = '[MdzAuthActionTypes] LoginFailure',
    ClearLoginSuccessAndFailure = '[MdzAuthActionTypes] ClearLoginSuccessAndFailure',
    SetUserInfo = '[MdzAuthActionTypes] SetUserInfo',
    UpdateUserState = '[MdzAuthActionTypes] UpdateUserState',
    RequestUpdateUserState = '[MdzAuthActionTypes] RequestUpdateUserState',
}

export class Login implements Action {
    readonly type = ActionTypes.Login;

    constructor(public username: string, public password: string) {}
}


export class LoginSuccess implements Action {
    readonly type = ActionTypes.LoginSuccess;

    constructor(public payload: LoginSuccessDto) {}
}

export class LoginFailure implements Action {
    readonly type = ActionTypes.LoginFailure;

    constructor(public failure: string) {}
}

export class ClearLoginSuccessAndFailure implements Action {
    readonly type = ActionTypes.ClearLoginSuccessAndFailure;
}

export class Logout implements Action {
    readonly type = ActionTypes.Logout;

    constructor(public disableRedirection = false) {
    }
}

export class SetUserInfo implements Action {
    readonly type = ActionTypes.SetUserInfo;

    constructor(
        public username: string,
        public roles: string[],
        public email: string,
        public isEmailVerified: boolean,
    ) {}
}

export class UpdateUserState implements Action {
    readonly type = ActionTypes.UpdateUserState;
}

export class RequestUpdateUserState implements Action {
    readonly type = ActionTypes.RequestUpdateUserState;
}

export type ActionUnion = 
    Login | 
    Logout | 
    LoginSuccess | 
    LoginFailure | 
    ClearLoginSuccessAndFailure |
    SetUserInfo |
    UpdateUserState |
    RequestUpdateUserState
    ;