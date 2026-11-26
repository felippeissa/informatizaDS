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
            { path: 'padroes', loadChildren: () => import('./app/ds/padroes/padroes.routes').then(m => m.padroesRoutes) },
            { path: 'foundations', loadChildren: () => import('./app/ds/foundations/foundations.routes').then(m => m.foundationsRoutes) },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'templates', loadChildren: () => import('./app/ds/templates/templates.routes').then(m => m.templatesRoutes) }
        ]
    },
    // Exemplo de sistema com MegaMenu (padrão GESIS para 3+ níveis) — tem header e navegação próprios
    { path: 'sistema-megamenu', loadComponent: () => import('./app/ds/megamenu/sistema-megamenu').then(m => m.SistemaMegamenu) },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/auth/login' }
];
