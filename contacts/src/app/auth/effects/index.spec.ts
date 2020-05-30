import { TestBed } from '@angular/core/testing';
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { Actions } from '@ngrx/effects';
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { Observable, empty, of } from 'rxjs';
import { cold, hot, getTestScheduler } from 'jasmine-marbles';
import { JwtHelperService } from "@auth0/angular-jwt";

import { AuthEffects } from '.'
import { AuthService, TOKEN_KEY, REFRESH_TOKEN_KEY } from "../services";
import { Login, LoginSuccess, LoginFailure, SetUserInfo, Logout, RequestUpdateUserState } from "../actions";
import { LoginSuccessDto, LoginFailureDto } from "../dto";
import { StoreModule } from "@ngrx/store";
import {} from 'jasmine';

import { reducers } from '../reducers';

export class TestActions extends Actions {
    constructor() {
        super(empty());
    }

    set stream(source: Observable<any>) {
        this.source = source;
    }
}

export function getActions() {
    
    return new TestActions();
}

describe('AuthEffects', () => {
    let effects: AuthEffects;
    let authService: any;
    let userService: any;
    let actions: TestActions;
    let routerService: any;
    let jwtHelperService: any;
    const decodedTokenDefaults = { name: 'user', email: 'test@email.com', roles: [] };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthEffects,
                {
                    provide: AuthService,
                    useValue: jasmine.createSpyObj('AuthService', [ 'login', 'signup' ])
                },
                {
                    provide: Actions,
                    useFactory: getActions,
                },
                {
                    provide: Router,
                    useValue: { navigate: jasmine.createSpy('navigate') },
                },
                {
                    provide: JwtHelperService,
                    useValue: jasmine.createSpyObj('JwtHelperService', [ 'decodeToken', 'isTokenExpired', 'getTokenExpirationDate' ])
                },
            ],
            imports: [
                TranslateModule.forRoot(),
                StoreModule.forRoot({}),
                StoreModule.forFeature('auth', reducers),
            ]
        });

        effects = TestBed.get(AuthEffects);
        authService = TestBed.get(AuthService);
        actions = TestBed.get(Actions);
        routerService = TestBed.get(Router);
        jwtHelperService  = TestBed.get(JwtHelperService);
        jwtHelperService.decodeToken = () => ( decodedTokenDefaults );
        jwtHelperService.isTokenExpired = (token: string) => ( token == 'expired_token' );
        jwtHelperService.getTokenExpirationDate = (token: string) => {
            const ONE_HOUR = 60 * 60 * 1000;
            var date = new Date();
            if (token == 'expired_token') {
                return new Date(date.getTime() - ONE_HOUR)
            }
            return new Date(date.getTime() + ONE_HOUR)
        };

        spyOn(jwtHelperService, 'decodeToken').and.callThrough();
    });

    it('login should be successful', () => {
        const action = new Login('user', 'pass');
        const responseDto = { accessToken: 'this value doesn\'t matter', refreshToken: '', expiresIn: 3600 } as LoginSuccessDto;
        const completion = new LoginSuccess(responseDto);
        
        
        actions.stream = hot('-a---', { a: action });
        const response = cold('-a|', { a: responseDto });
        const expected = cold('--b', { b: completion });

        authService.login = () => response;

        expect(effects.login).toBeObservable(expected);
    })

    function itShouldHandleLoginError(loginError: string, expectedError: string, responseCode: number) {
        const action = new Login('user', 'pass');
        const origErrorDto = {
            error: loginError
        } as ErrorDto;
        const loginFailureDto = {
            reason: expectedError
        } as LoginFailureDto;
        const errorResponseDto = new HttpErrorResponse({
            status: responseCode,
            error: origErrorDto,
        });

        const completion = new LoginFailure(loginFailureDto);
        
        actions.stream = hot('-a---', { a: action });
        const response = cold('-#|', {}, errorResponseDto);
        const expected = cold('--b', { b: completion });

        authService.login = () => response;

        expect(effects.login).toBeObservable(expected);
    }

    it('LoginSuccess should dispatch a SetUserInfo action', () => {
        const action = new LoginSuccess({ accessToken: '123456', refreshToken: '654321', expiresIn: 3600 });
        const completion = new SetUserInfo(decodedTokenDefaults.name, decodedTokenDefaults.roles, decodedTokenDefaults.email, false);
        
        actions.stream = hot('-a---', { a: action });
        const expected = cold('-b', { b: completion });

        expect(effects.loginSuccess).toBeObservable(expected);

        actions.stream = hot('-a---', { a: action });

        effects.loginSuccess.subscribe(_ => {
            expect(jwtHelperService.decodeToken).toHaveBeenCalledWith('123456')
            expect(localStorage.getItem(TOKEN_KEY)).toEqual('123456');
            expect(localStorage.getItem(REFRESH_TOKEN_KEY)).toEqual('654321');
        })
    })

    it('Logout should remove tokens and redirect to home', () => {
        const action = new Logout();
        const completion = action;
        
        actions.stream = hot('-a---', { a: action });
        const expected = cold('-a', { a: action });

        expect(effects.logout).toBeObservable(expected);

        actions.stream = hot('-a---', { a: action });

        localStorage.setItem(TOKEN_KEY, 'token');
        localStorage.setItem(REFRESH_TOKEN_KEY, 'refresh token');

        effects.logout.subscribe(_ => {
            expect(routerService.navigate).toHaveBeenCalledWith(['/']);
            expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
            expect(localStorage.getItem(REFRESH_TOKEN_KEY)).toBeNull();
        })
    })

    it('Logout should remove tokens and not redirect to home', () => {
        const action = new Logout(true);
        const completion = action;
        
        actions.stream = hot('-a---', { a: action });
        const expected = cold('-a', { a: action });

        expect(effects.logout).toBeObservable(expected);

        actions.stream = hot('-a---', { a: action });

        localStorage.setItem(TOKEN_KEY, 'token');
        localStorage.setItem(REFRESH_TOKEN_KEY, 'refresh token');

        effects.logout.subscribe(_ => {
            expect(routerService.navigate).toHaveBeenCalledTimes(0);
            expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
            expect(localStorage.getItem(REFRESH_TOKEN_KEY)).toBeNull();
        })
    })
});