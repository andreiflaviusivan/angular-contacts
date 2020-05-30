import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
} from '@ngrx/store';

import * as Auth from './auth.reducer';
import * as User from './user.reducer';

export interface State {
    auth: Auth.State;
    user: User.State;
}

export const reducers: ActionReducerMap<State> = {
    auth: Auth.reducer,
    user: User.reducer,
}

export const selectMainState = createFeatureSelector<State>('auth');
export const selectAuthState = createSelector(selectMainState, (state: State) => state.auth);
export const selectUserState = createSelector(selectMainState, (state: State) => state.user);

export const selectIsLoginSuccessState = createSelector(selectAuthState, (state: Auth.State) => state.isLoginSuccess);
export const selectIsLoginFailureState = createSelector(selectAuthState, (state: Auth.State) => state.isLoginFailure);
export const selectAuthFailureReasonState = createSelector(selectAuthState, (state: Auth.State) => state.failureReason);

export const selectUsernameState = createSelector(selectUserState, (state: User.State) => state.username);
export const selectEmailState = createSelector(selectUserState, (state: User.State) => state.email);

export const selectIsAdminState = createSelector(selectUserState, (state: User.State) => User.hasRole(state, 'admin'));
export const selectIsSuperAdminState = createSelector(selectUserState, (state: User.State) => User.hasRole(state, 'super-admin'));
export const selectIsAnyAdminState = createSelector(selectUserState, (state: User.State) => User.hasRole(state, 'super-admin') || User.hasRole(state, 'admin'));
export const selectIsInAnyOfRolesState = (roles: string[]) => createSelector(selectUserState, (state: User.State) => User.hasAnyOfRoles(state, roles));
export const selectIsNotInAnyOfRolesState = (roles: string[]) => createSelector(selectUserState, (state: User.State) => !User.hasAnyOfRoles(state, roles));

export const selectIsUserPresentState = createSelector(selectUserState, (state: User.State) => !!state.username);
// TODO
export const selectIsUserPresenceExpiredState = createSelector(selectUserState, (state: User.State) => !!state.username);

export const selectIsSignUpFailedState = createSelector(selectUserState, (state: User.State) => state.signUpFailed);
export const selectIsSignUpSuccessState = createSelector(selectUserState, (state: User.State) => state.signUpSuccess);
export const selectSignUpFailureState = createSelector(selectUserState, (state: User.State) => state.signUpFailure);

export const selectChangeEmailAttempt = createSelector(selectUserState, (state: User.State) => state.changeEmail);
export const selectChangePasswordAttempt = createSelector(selectUserState, (state: User.State) => state.changePassword);
export const selectEmailVerifyAttempt = createSelector(selectUserState, (state: User.State) => state.verifyEmail);

export const selectUpdateUserStateBeat = createSelector(selectUserState, (state: User.State) => state.updateUserStateBeat);