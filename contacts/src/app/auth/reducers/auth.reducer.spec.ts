import * as Auth from './auth.reducer';
import { ClearLoginSuccessAndFailure, Login, LoginFailure, LoginSuccess, Logout, SetUserInfo, UpdateUserState } from '../actions';
import {} from 'jasmine';

describe('AuthReducer', () => {

    it('should return the default state', () => {
        const action = {} as any;

        const result = Auth.reducer(undefined, action);

        expect(result).toBe(Auth.initialState)
    })

    it('login should work', () => {
        const action = new Login('user', 'pass');

        const result = Auth.reducer(undefined, action);

        expect(result).toBe(Auth.initialState)
    })

    it('logout should work', () => {
        const action = new Logout();

        const result = Auth.reducer(undefined, action);

        expect(result).toBe(Auth.initialState)
    })
});