import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap, } from 'rxjs/operators';
import { AuthService, TOKEN_KEY, REFRESH_TOKEN_KEY, } from "../services";
import * as AuthActions from '../actions';
import { Observable, Subscription, of } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginFailureDto, } from "../dto";
import { HttpErrorResponse } from "@angular/common/http";
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {

    constructor(
        private actions: Actions,
        private authService: AuthService,
        private jwtHelper: JwtHelperService,
        private route: Router,
        private readonly store: Store<any>
      ) {
    }

    @Effect()
    login = this.actions
        .pipe(
            ofType<AuthActions.Login>(AuthActions.ActionTypes.Login),
            exhaustMap(auth => 
                this.authService.login(auth.username, auth.password)
                    .pipe(
                        map(success => new AuthActions.LoginSuccess(success)),
                        catchError(error => of(new AuthActions.LoginFailure("Could not login"))),
                        
                    )
                )
        );
        

    @Effect()
    loginSuccess = this.actions
        .pipe(
            ofType<AuthActions.LoginSuccess>(AuthActions.ActionTypes.LoginSuccess),
            tap(action => {
                localStorage.setItem(TOKEN_KEY, action.payload.accessToken);
                localStorage.setItem(REFRESH_TOKEN_KEY, action.payload.refreshToken);
            }),
            map(_ => {
                const info = this.jwtHelper.decodeToken(_.payload.accessToken);

                if (!Array.isArray(info.roles) && typeof info.roles === 'string') {
                    info.roles = [ info.roles ];
                }

                return new AuthActions.SetUserInfo(info.name, info.roles, info.email, false)
                        
                    }),
        );

    @Effect({ dispatch: false })
    logout = this.actions
        .pipe(
            ofType<AuthActions.Logout>(AuthActions.ActionTypes.Logout),
            tap(logout => {
                localStorage.removeItem(TOKEN_KEY);
                localStorage.removeItem(REFRESH_TOKEN_KEY);

                !logout.disableRedirection && this.route.navigate(['/']);
            })
        );

    @Effect()
    requestUserStateUpdate = this.actions
        .pipe(
            ofType<AuthActions.RequestUpdateUserState>(AuthActions.ActionTypes.RequestUpdateUserState),
            map(action => {
                let accessToken = localStorage.getItem(TOKEN_KEY);
                let refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

                if (accessToken) {
                   

                    return new AuthActions.LoginSuccess({ accessToken, refreshToken, expiresIn: 500});
                }

                return new AuthActions.Logout(true);
            })
        );

}