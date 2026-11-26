import { Routes } from '@angular/router';
import { AssinagoHome } from './assinago-home';
import { AssinagoMinhaConta } from './assinago-minha-conta';
import { AssinagoValidarDocumento } from './assinago-validar-documento';
import { AssinagoConfigDocumentos } from './assinago-config-documentos';
import { AssinagoConfigAssinaturas } from './assinago-config-assinaturas';
import { AssinagoConfigMotivoRecusa } from './assinago-config-motivo-recusa';
import { AssinagoConfigBlocos } from './assinago-config-blocos';

export const assinagoRoutes: Routes = [
    { path: '', redirectTo: 'pagina-inicial', pathMatch: 'full' },
    { path: 'pagina-inicial',                   component: AssinagoHome },
    { path: 'minha-conta',                      component: AssinagoMinhaConta },
    { path: 'validar-documento',                component: AssinagoValidarDocumento },
    { path: 'configuracoes/documentos',         component: AssinagoConfigDocumentos },
    { path: 'configuracoes/assinaturas',        component: AssinagoConfigAssinaturas },
    { path: 'configuracoes/motivo-recusa',      component: AssinagoConfigMotivoRecusa },
    { path: 'configuracoes/blocos-assinatura',  component: AssinagoConfigBlocos },
];
