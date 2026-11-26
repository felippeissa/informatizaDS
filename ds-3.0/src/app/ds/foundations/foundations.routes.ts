import { Routes } from '@angular/router';

/**
 * Seção "Foundations" do Design System (/ds/foundations).
 * Fundamentos visuais: cores, tipografia, espaçamento, bordas/elevação, ícones e grid.
 */
export const foundationsRoutes: Routes = [
    { path: '', redirectTo: 'cores', pathMatch: 'full' },
    { path: 'cores', loadComponent: () => import('./fnd-cores').then((m) => m.FndCores), data: { breadcrumb: 'Cores' } },
    { path: 'tipografia', loadComponent: () => import('./fnd-tipografia').then((m) => m.FndTipografia), data: { breadcrumb: 'Tipografia' } },
    { path: 'espacamento', loadComponent: () => import('./fnd-espacamento').then((m) => m.FndEspacamento), data: { breadcrumb: 'Espaçamento' } },
    { path: 'bordas', loadComponent: () => import('./fnd-bordas').then((m) => m.FndBordas), data: { breadcrumb: 'Bordas e elevação' } },
    { path: 'icones', loadComponent: () => import('./fnd-icones').then((m) => m.FndIcones), data: { breadcrumb: 'Ícones' } },
    { path: 'grid', loadComponent: () => import('./fnd-grid').then((m) => m.FndGrid), data: { breadcrumb: 'Grid e layout' } },
];
