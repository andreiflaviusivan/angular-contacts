import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsUserPresentState, selectIsNotInAnyOfRolesState, selectUpdateUserStateBeat } from '../reducers';
import { tap, exhaustMap, filter } from 'rxjs/operators';
import { RequestUpdateUserState } from '../actions';

@Injectable()
export class NoAdminGuard implements CanActivate, CanActivateChild {
    isAuth: Observable<boolean>;
    isUserStateUpdated: Observable<number>;

    constructor(private router: Router, readonly store: Store<any>) {
        this.isAuth = store.select(selectIsUserPresentState);
        this.isUserStateUpdated = store.select(selectUpdateUserStateBeat);
    }

    redirectToLogin(state: RouterStateSnapshot, reasonKey?: string) {
        let currentUrl = '/';

        if (state.url.length > 0) {
            currentUrl = state.url;
        }
        
        this.router.navigate(['auth', 'login', { returnUrl: currentUrl, externalUrl: false, reasonKey } ]);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        let roles = [ 'admin', 'super-admin' ];

        return this.isUserStateUpdated.pipe(
            filter(u => u > 0),
            exhaustMap(_ => 
                this.isAuth.pipe(
                    exhaustMap(auth => {
                        if (auth) {
                            if (roles != null && roles.length > 0) {
                                return this.store.select(selectIsNotInAnyOfRolesState(roles)).pipe(
                                    tap(val => val || this.redirectToLogin(state, 'authModule_loginInvalidRoleReason'))
                                )
                            }
                            return of(true);
                        }
                        this.redirectToLogin(state, 'authModule_loginRequireAuthReason');
                        return of(false);
                    })
                )
            )
        );
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.canActivate(route, state);
    }
}
