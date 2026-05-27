import { Routes } from '@angular/router';
import { DraconListarAtos }       from './dracon-listar-atos';
import { DraconAlterarSituacao }  from './dracon-alterar-situacao';
import { DraconAuditoriaAto }     from './dracon-auditoria-ato';
import { DraconVersoesAto }       from './dracon-versoes-ato';
import { DraconManterTramitacao } from './dracon-manter-tramitacao';

export const draconRoutes: Routes = [
    { path: '',                                  redirectTo: 'atos', pathMatch: 'full' },
    { path: 'atos',                              component: DraconListarAtos },
    { path: 'atos/alterar-situacao/:id',         component: DraconAlterarSituacao },
    { path: 'atos/auditoria',                    component: DraconAuditoriaAto },
    { path: 'atos/versoes/:id',                  component: DraconVersoesAto },
    { path: 'atos/tramitacao/:id',               component: DraconManterTramitacao },
];
