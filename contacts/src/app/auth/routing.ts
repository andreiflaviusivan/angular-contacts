import { RouterModule, Routes }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import * as Guards from './guards';
import * as Components from './components';

export const routes: Routes = [
    {
        path: 'auth', children: [
            {
                path: 'login', component: Components.LoginComponent, canActivate: [ Guards.AnonymousGuard ]
            },
            {
                path: 'logoff', component: Components.LogoffComponent, canActivate: [ Guards.AuthorizeGuard ]
            },
        ]
    }
];

export const Routing: ModuleWithProviders = RouterModule.forChild(routes);
