import { Routes } from '@angular/router';

// P1 — Gestão de Atos
import { DraconListarAtos }          from './dracon-listar-atos';
import { DraconAlterarSituacao }     from './dracon-alterar-situacao';
import { DraconAuditoriaAto }        from './dracon-auditoria-ato';
import { DraconVersoesAto }          from './dracon-versoes-ato';
import { DraconManterTramitacao }    from './dracon-manter-tramitacao';
import { DraconListarModelos }       from './dracon-listar-modelos';

// P2 — Gestão de Etiquetas
import { DraconListarEtiquetas }     from './dracon-listar-etiquetas';
import { DraconManterEtiqueta }      from './dracon-manter-etiqueta';
import { DraconVincularEtiquetas }   from './dracon-vincular-etiquetas';

// P3 — Cancelamento e Histórico
import { DraconCancelarProcesso }    from './dracon-cancelar-processo';
import { DraconHistoricoEtiquetas }  from './dracon-historico-etiquetas';

// P4 — Gestão de Processos
import { DraconListarProcessos }     from './dracon-listar-processos';
import { DraconManterProcesso }      from './dracon-manter-processo';
import { DraconDocumentosSEI }       from './dracon-documentos-sei';

// P5 — Distribuição e Afastamentos
import { DraconListarDistribuicao }  from './dracon-listar-distribuicao';
import { DraconManterDistribuicao }  from './dracon-manter-distribuicao';
import { DraconListarAfastamentos }  from './dracon-listar-afastamentos';

// Extras
import { DraconRelatorios }          from './dracon-relatorios';

export const draconRoutes: Routes = [
    { path: '', redirectTo: 'processos', pathMatch: 'full' },

    // ── P1 ──────────────────────────────────────────────────────────────────
    { path: 'atos',                             component: DraconListarAtos },
    { path: 'atos/alterar-situacao/:id',        component: DraconAlterarSituacao },
    { path: 'atos/auditoria',                   component: DraconAuditoriaAto },
    { path: 'atos/auditoria-modelos',           component: DraconAuditoriaAto },          // reusa auditoria
    { path: 'atos/versoes/:id',                 component: DraconVersoesAto },
    { path: 'atos/tramitacao/:id',              component: DraconManterTramitacao },
    { path: 'atos/modelos',                     component: DraconListarModelos },

    // ── P2 ──────────────────────────────────────────────────────────────────
    { path: 'atos/etiquetas/:id',               component: DraconVincularEtiquetas },
    { path: 'cadastros/etiquetas',              component: DraconListarEtiquetas },
    { path: 'cadastros/etiquetas/nova',         component: DraconManterEtiqueta },
    { path: 'cadastros/etiquetas/:id',          component: DraconManterEtiqueta },

    // ── P3 ──────────────────────────────────────────────────────────────────
    { path: 'processos/cancelar/:id',           component: DraconCancelarProcesso },
    { path: 'processos/historico-etiquetas/:id',component: DraconHistoricoEtiquetas },
    { path: 'processos/etiquetas',              component: DraconVincularEtiquetas },

    // ── P4 ──────────────────────────────────────────────────────────────────
    { path: 'processos',                        component: DraconListarProcessos },
    { path: 'processos/novo',                   component: DraconManterProcesso },
    { path: 'processos/documentos-sei/:id',     component: DraconDocumentosSEI },
    { path: 'processos/:id',                    component: DraconManterProcesso },

    // ── P5 ──────────────────────────────────────────────────────────────────
    { path: 'gestao/distribuicao',              component: DraconListarDistribuicao },
    { path: 'gestao/distribuicao/nova',         component: DraconManterDistribuicao },
    { path: 'gestao/afastamentos',              component: DraconListarAfastamentos },

    // ── Cadastros extras (menu) ──────────────────────────────────────────────
    { path: 'cadastros/tipo-ato',               component: DraconListarModelos },          // reusa modelos
    { path: 'cadastros/tipo-processo',          component: DraconListarModelos },          // reusa modelos
    { path: 'cadastros/afastamento',            component: DraconListarAfastamentos },     // placeholder — tela própria a criar

    // ── Relatórios ──────────────────────────────────────────────────────────
    { path: 'relatorios',                       component: DraconRelatorios },
];
