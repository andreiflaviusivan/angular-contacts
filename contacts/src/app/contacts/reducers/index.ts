import { ActionReducer, MetaReducer, createFeatureSelector, createSelector, ActionReducerMap } from "@ngrx/store";
import { localStorageSync } from "ngrx-store-localstorage";
import * as Contacts from './contacts.reducers'

export interface State {
    contacts: Contacts.State;
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync(
        {
            keys: ['presenter'],
            rehydrate: true,
        })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export const reducers: ActionReducerMap<State> = {
    contacts: Contacts.reducer,
}

export const selectRootState = createFeatureSelector<State>('contacts');
export const selectContactsState = createSelector(selectRootState, state => state.contacts);

export const selectContactsStateList = createSelector(selectContactsState, (state) => state.contacts);