import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { DsHome } from './app/ds/ds-home';
import { Notfound } from './app/pages/notfound/notfound';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    {
        path: 'ds',
        component: AppLayout,
        children: [
            { path: '', component: DsHome },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') }
        ]
    },
    {
        path: 'assinago',
        component: AppLayout,
        loadChildren: () => import('./app/assinago/assinago.routes').then(m => m.assinagoRoutes)
    },
    {
        path: 'dracon',
        component: AppLayout,
        loadChildren: () => import('./app/dracon/dracon.routes').then(m => m.draconRoutes)
    },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/auth/login' }
];
