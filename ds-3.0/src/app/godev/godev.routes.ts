import { Routes } from '@angular/router';
import { GodevProjetos }       from './godev-projetos';
import { GodevManterProjeto }  from './godev-manter-projeto';
import { GodevWorkspace }      from './godev-workspace';
import { GodevManual }         from './godev-manual';
import { GodevHome }           from './godev-home';

export const godevRoutes: Routes = [
    { path: '',                       redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'inicio',                 component: GodevHome },
    { path: 'projetos',               component: GodevProjetos },
    { path: 'projetos/novo',          component: GodevManterProjeto },
    { path: 'projetos/:id',           component: GodevManterProjeto },
    { path: 'projetos/:id/workspace', component: GodevWorkspace },
    { path: 'manual',                 component: GodevManual },
];
