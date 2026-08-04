import { Routes } from '@angular/router';

export const protegeRoutes: Routes = [
    { path: '', redirectTo: 'cadastrar', pathMatch: 'full' },
    { path: 'cadastrar', loadComponent: () => import('./protege-cadastro').then(m => m.ProtegeCadastro) },
];
