import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import * as Components from './components';
import { AuthorizeGuard } from '../auth/guards/authorize.guard';

export const ModuleRoutes: Routes = [
    { path: 'contacts', children: [
        {
            path: '', component: Components.ViewContactsComponent, canActivate: [AuthorizeGuard]
        },
        {
            path: 'create', component: Components.ContactEditorComponent, canActivate: [AuthorizeGuard],
        },
        {
            path: 'edit/:id', component: Components.ContactEditorComponent, canActivate: [AuthorizeGuard],
        },
    ]},
];

export const Routing: ModuleWithProviders = RouterModule.forChild(ModuleRoutes);
