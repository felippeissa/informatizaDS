import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { DsHome } from './app/pages/ds/ds-home';
import { Notfound } from './app/pages/notfound/notfound';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    {
        path: 'ds',
        component: AppLayout,
        children: [
            { path: '', component: DsHome },
            { path: 'uikit',      loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'templates',  loadChildren: () => import('./app/pages/templates/templates.routes') }
        ]
    },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/auth/login' }
];
