import { Routes } from '@angular/router';

/**
 * TEMPORÁRIO — rotas só para revisar as páginas que não estão em uso no DS
 * (vieram do template Sakai). Acesso: /ds/revisao/<nome>. Remover junto com os arquivos
 * depois da decisão de apagar ou manter cada página.
 */
export const revisaoRoutes: Routes = [
    { path: 'buttondemo', loadComponent: () => import('./uikit/buttondemo').then((m) => m.ButtonDemo) },
    { path: 'chartdemo', loadComponent: () => import('./uikit/chartdemo').then((m) => m.ChartDemo) },
    { path: 'inputdemo', loadComponent: () => import('./uikit/inputdemo').then((m) => m.InputDemo) },
    { path: 'listdemo', loadComponent: () => import('./uikit/listdemo').then((m) => m.ListDemo) },
    { path: 'mediademo', loadComponent: () => import('./uikit/mediademo').then((m) => m.MediaDemo) },
    { path: 'menudemo', loadComponent: () => import('./uikit/menudemo').then((m) => m.MenuDemo) },
    { path: 'messagesdemo', loadComponent: () => import('./uikit/messagesdemo').then((m) => m.MessagesDemo) },
    { path: 'miscdemo', loadComponent: () => import('./uikit/miscdemo').then((m) => m.MiscDemo) },
    { path: 'overlaydemo', loadComponent: () => import('./uikit/overlaydemo').then((m) => m.OverlayDemo) },
    { path: 'panelsdemo', loadComponent: () => import('./uikit/panelsdemo').then((m) => m.PanelsDemo) },
    { path: 'treedemo', loadComponent: () => import('./uikit/treedemo').then((m) => m.TreeDemo) },
    { path: 'crud', loadComponent: () => import('./crud/crud').then((m) => m.Crud) },
    { path: 'documentation', loadComponent: () => import('./documentation/documentation').then((m) => m.Documentation) },
    { path: 'empty', loadComponent: () => import('./empty/empty').then((m) => m.Empty) },
];
