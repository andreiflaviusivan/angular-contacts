import { NgModule, ModuleWithProviders, APP_BOOTSTRAP_LISTENER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CovalentCommonModule, } from '@covalent/core/common';
import { CovalentMessageModule } from '@covalent/core/message';
import { CovalentExpansionPanelModule, } from '@covalent/core/expansion-panel';
import { CovalentDialogsModule, } from '@covalent/core/dialogs';
import { CovalentChipsModule } from '@covalent/core/chips';

import { MatCommonModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';

import { StoreModule, Store } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";


import * as Services from './services';
import * as Components from './components';
import * as Guards from './guards';
import { AuthEffects } from './effects';
import { reducers } from './reducers';

import { Routing } from './routing';
import { RequestUpdateUserState } from './actions';
import { MatDividerModule } from '@angular/material/divider';

export function tokenGetter() {
  return localStorage.getItem(Services.TOKEN_KEY);
}

export function updateUserState(store: Store<any>) {
  return () => store.dispatch(new RequestUpdateUserState());
}


@NgModule({
  imports: [
    CommonModule, 
    Routing, 
    HttpClientModule,
    JwtModule.forRoot({
        config: {
            tokenGetter: tokenGetter
        }
    }),
    ReactiveFormsModule, 
    CovalentCommonModule, 
    CovalentMessageModule, 
    CovalentExpansionPanelModule, 
    CovalentDialogsModule, 
    CovalentChipsModule, 
    MatCommonModule, 
    MatChipsModule, 
    MatInputModule, 
    MatButtonModule, 
    FlexLayoutModule, 
    MatCardModule, 
    MatIconModule,
    MatDividerModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [ Components.LoginComponent, Components.LogoffComponent, ],
    exports: [ CommonModule, HttpClientModule, Components.LoginComponent ],
    providers: [ Services.AuthService, Guards.AnonymousGuard, Guards.AuthorizeGuard, Guards.NoAdminGuard, 
        {
            provide: APP_BOOTSTRAP_LISTENER,
            useFactory: updateUserState,
            deps: [Store],
            multi: true
        },
    ]
})
export class AuthModule { }
