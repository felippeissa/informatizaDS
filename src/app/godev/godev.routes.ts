import { Routes } from '@angular/router';
import { GodevProjetos }       from './godev-projetos';
import { GodevManterProjeto }  from './godev-manter-projeto';
import { GodevWorkspace }      from './godev-workspace';

export const godevRoutes: Routes = [
    { path: '',                       redirectTo: 'projetos', pathMatch: 'full' },
    { path: 'projetos',               component: GodevProjetos },
    { path: 'projetos/novo',          component: GodevManterProjeto },
    { path: 'projetos/:id',           component: GodevManterProjeto },
    { path: 'projetos/:id/workspace', component: GodevWorkspace },
];
