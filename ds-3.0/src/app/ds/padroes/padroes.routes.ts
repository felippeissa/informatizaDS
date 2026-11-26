import { Routes } from '@angular/router';

/**
 * Seção "Padrões de UX" do Design System (/ds/padroes).
 * Regras de usabilidade e comportamento definidas pelo time de UX da GESIS
 * (Definições de padrões de design — MGS 2.0.1).
 */
export const padroesRoutes: Routes = [
    { path: '', redirectTo: 'layout', pathMatch: 'full' },
    { path: 'layout', loadComponent: () => import('./ux-layout').then((m) => m.UxLayout), data: { breadcrumb: 'Layout e navegação' } },
    { path: 'feedback', loadComponent: () => import('./ux-feedback').then((m) => m.UxFeedback), data: { breadcrumb: 'Feedback ao usuário' } },
    { path: 'inputs', loadComponent: () => import('./ux-inputs').then((m) => m.UxInputs), data: { breadcrumb: 'Inputs' } },
    { path: 'botoes', loadComponent: () => import('./ux-botoes').then((m) => m.UxBotoes), data: { breadcrumb: 'Botões' } },
    { path: 'filtros', loadComponent: () => import('./ux-filtros').then((m) => m.UxFiltros), data: { breadcrumb: 'Filtros' } },
    { path: 'tabelas', loadComponent: () => import('./ux-tabelas').then((m) => m.UxTabelas), data: { breadcrumb: 'Tabelas' } },
    { path: 'formularios', loadComponent: () => import('./ux-formularios').then((m) => m.UxFormularios), data: { breadcrumb: 'Formulários' } },
];
