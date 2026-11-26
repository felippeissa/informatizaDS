import { Routes } from '@angular/router';

/**
 * Seção "Templates" do Design System (/ds/templates).
 * Cada rota é um modelo de tela pronto para copiar ao criar novas telas.
 */
export const templatesRoutes: Routes = [
    { path: '', redirectTo: 'lista', pathMatch: 'full' },
    { path: 'lista', loadComponent: () => import('./tpl-lista').then(m => m.TplLista), data: { breadcrumb: 'Lista com filtros' } },
    { path: 'formulario', loadComponent: () => import('./tpl-formulario').then(m => m.TplFormulario), data: { breadcrumb: 'Formulário em card' } },
    { path: 'dashboard', loadComponent: () => import('./tpl-dashboard').then(m => m.TplDashboard), data: { breadcrumb: 'Dashboard' } },
    { path: 'detalhe', loadComponent: () => import('./tpl-detalhe').then(m => m.TplDetalhe), data: { breadcrumb: 'Detalhe / Workspace' } },
];
