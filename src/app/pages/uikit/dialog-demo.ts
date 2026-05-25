import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-dialog-demo',
    standalone: true,
    imports: [CommonModule, DialogModule, ButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Dialog</h1>
            <p class="comp-desc">Modal com cabeçalho, conteúdo e rodapé configuráveis. Suporta arrastar e redimensionar.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">DialogModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/dialog'</span><span class="tok-pt">;</span>
            </div>
        </div>

        <p-tabs value="features" styleClass="mt-1">
            <p-tablist>
                <p-tab value="features">Features</p-tab>
                <p-tab value="api">API</p-tab>
                <p-tab value="theming">Theming</p-tab>
            </p-tablist>
            <p-tabpanels>
                <p-tabpanel value="features"><div style="padding:20px 0">

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Dialog</div>
                            <p class="demo-card-desc">Modal com cabeçalho, conteúdo e rodapé configuráveis. Suporta arrastar e redimensionar.</p>
                        </div>
                        <div class="demo-card-body" style="gap:12px">
                            <p-button label="Básico" (click)="dlgBasic=true" />
                            <p-button label="Com rodapé" (click)="dlgFooter=true" severity="secondary" />
                            <p-button label="Maximizável" (click)="dlgMax=true" severity="secondary" outlined />
                        </div>
                        <div class="demo-card-code"><pre>{{ code }}</pre></div>
                    </div>

                    <p-dialog header="Diálogo Básico" [(visible)]="dlgBasic" [style]="{width:'420px'}" [modal]="true">
                        <p style="margin:0;line-height:1.6">Conteúdo do diálogo. Adicione formulários, tabelas ou qualquer componente aqui.</p>
                    </p-dialog>

                    <p-dialog header="Com Rodapé" [(visible)]="dlgFooter" [style]="{width:'420px'}" [modal]="true">
                        <p style="margin:0;line-height:1.6">Confirme a ação abaixo.</p>
                        <ng-template pTemplate="footer">
                            <p-button label="Cancelar" severity="secondary" text (click)="dlgFooter=false" />
                            <p-button label="Confirmar" icon="pi pi-check" (click)="dlgFooter=false" />
                        </ng-template>
                    </p-dialog>

                    <p-dialog header="Maximizável" [(visible)]="dlgMax" [style]="{width:'560px'}" [modal]="true" [maximizable]="true">
                        <p style="margin:0;line-height:1.6">Este diálogo pode ser maximizado clicando no ícone no cabeçalho.</p>
                    </p-dialog>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Propriedades</div>
                    <p-table [value]="props" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:160px">Nome</th><th style="width:130px">Tipo</th><th style="width:120px">Padrão</th><th>Descrição</th></tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-r>
                            <tr>
                                <td><strong style="font-family:monospace;font-size:13px">{{ r.name }}</strong></td>
                                <td><span class="badge-type">{{ r.type }}</span></td>
                                <td><span class="badge-default">{{ r.default }}</span></td>
                                <td style="font-size:13px;color:var(--text-color-secondary)">{{ r.description }}</td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div></p-tabpanel>

                <p-tabpanel value="theming"><div style="padding:16px 0">
                    <p-table [value]="themeVars" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:360px">Variável CSS</th><th>Descrição</th></tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-v>
                            <tr>
                                <td><span class="theme-var">{{ v.variable }}</span></td>
                                <td style="font-size:13px;color:var(--text-color-secondary)">{{ v.description }}</td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div></p-tabpanel>
            </p-tabpanels>
        </p-tabs>
    `
})
export class DialogDemo {
    dlgBasic = false;
    dlgFooter = false;
    dlgMax = false;

    code = `<p-button label="Abrir" (click)="visible=true" />

<p-dialog header="Título" [(visible)]="visible"
    [style]="{width:'450px'}" [modal]="true">
    <p>Conteúdo do diálogo</p>
    <ng-template pTemplate="footer">
        <p-button label="Fechar" (click)="visible=false" />
    </ng-template>
</p-dialog>`;

    props = [
        { name: 'header',      type: 'string',  default: 'null',   description: 'Texto do cabeçalho.' },
        { name: 'visible',     type: 'boolean', default: 'false',  description: 'Controla visibilidade (two-way).' },
        { name: 'modal',       type: 'boolean', default: 'true',   description: 'Exibe overlay escuro de fundo.' },
        { name: 'style',       type: 'object',  default: 'null',   description: 'Estilos inline: ex. {width: "450px"}.' },
        { name: 'draggable',   type: 'boolean', default: 'true',   description: 'Permite arrastar o diálogo.' },
        { name: 'resizable',   type: 'boolean', default: 'true',   description: 'Permite redimensionar.' },
        { name: 'maximizable', type: 'boolean', default: 'false',  description: 'Exibe botão de maximizar.' },
        { name: 'closable',    type: 'boolean', default: 'true',   description: 'Exibe botão de fechar.' },
        { name: 'position',    type: 'string',  default: 'center', description: 'Posição: center | top | bottom | left | right.' },
    ];

    themeVars = [
        { variable: '--p-dialog-background',      description: 'Fundo do diálogo.' },
        { variable: '--p-dialog-border-color',    description: 'Borda do diálogo.' },
        { variable: '--p-dialog-border-radius',   description: 'Raio de borda.' },
        { variable: '--p-dialog-header-padding',  description: 'Padding do cabeçalho.' },
        { variable: '--p-dialog-content-padding', description: 'Padding do conteúdo.' },
        { variable: '--p-dialog-footer-padding',  description: 'Padding do rodapé.' },
        { variable: '--p-overlay-mask-background', description: 'Cor do overlay de fundo.' },
    ];
}
