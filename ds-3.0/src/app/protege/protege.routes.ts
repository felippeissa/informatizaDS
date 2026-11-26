import { Routes } from '@angular/router';

export const protegeRoutes: Routes = [
    { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
    { path: 'cadastrar', loadComponent: () => import('./protege-cadastro').then(m => m.ProtegeCadastro) },
    { path: 'usuarios', loadComponent: () => import('./protege-usuarios').then(m => m.ProtegeUsuarios) },
    { path: 'usuarios/novo', loadComponent: () => import('./protege-manter-usuario').then(m => m.ProtegeManterUsuario) },
    { path: 'usuarios/:id', loadComponent: () => import('./protege-manter-usuario').then(m => m.ProtegeManterUsuario) },
];
