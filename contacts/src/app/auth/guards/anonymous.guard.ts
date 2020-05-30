import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsUserPresentState, selectUpdateUserStateBeat } from '../reducers';
import { map, filter, exhaustMap } from 'rxjs/operators';
import { RequestUpdateUserState } from '../actions';

@Injectable()
export class AnonymousGuard implements CanActivate {
    isAuth: Observable<boolean>;
    isUserStateUpdated: Observable<number>;

    constructor(private router: Router, readonly store: Store<any>) {
        this.isAuth = store.select(selectIsUserPresentState);
        this.isUserStateUpdated = store.select(selectUpdateUserStateBeat);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.isUserStateUpdated.pipe(
            filter(u => u > 0),
            exhaustMap(_ => 
                this.isAuth.pipe(
                    map(auth => {
                        if (auth) {
                            let reasonKey = route.params['reasonKey'] as string;
                            if (reasonKey != null && reasonKey.length > 0) {
                                // Allow this navigation because the user might lack privileges
                                return true;
                            }
                            this.router.navigate(['/']);
                            return false;
                        }
                        return true;
                    })
                )
            )
        );
    }
}
