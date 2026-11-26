import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-panel-demo',
    standalone: true,
    imports: [CommonModule, PanelModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Panel</h1>
            <p class="comp-desc">Container com header e opção de recolher o conteúdo. Suporta modo <code>[toggleable]</code>.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">PanelModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/panel'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Panel</div>
                            <p class="demo-card-desc">Container com header e opção de recolher o conteúdo.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:16px;gap:12px">
                            <p-panel header="Painel Normal" styleClass="w-full">
                                <p style="margin:0;font-size:14px;color:var(--text-color-secondary)">Conteúdo do painel.</p>
                            </p-panel>
                            <p-panel header="Painel Recolhível" [toggleable]="true" styleClass="w-full">
                                <p style="margin:0;font-size:14px;color:var(--text-color-secondary)">Clique no ícone do cabeçalho para recolher este painel.</p>
                            </p-panel>
                        </div>
                        <div class="demo-card-code"><pre>{{ code }}</pre></div>
                    </div>

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
export class PanelDemo {
    code = `<p-panel header="Título do Painel">
    <p>Conteúdo do painel</p>
</p-panel>

<!-- Recolhível -->
<p-panel header="Painel" [toggleable]="true">
    <p>Pode ser recolhido</p>
</p-panel>`;

    props = [
        { name: 'header',      type: 'string',  default: 'null',  description: 'Título do painel.' },
        { name: 'toggleable',  type: 'boolean', default: 'false', description: 'Permite recolher/expandir o conteúdo.' },
        { name: 'collapsed',   type: 'boolean', default: 'false', description: 'Define o estado inicial como recolhido.' },
        { name: 'styleClass',  type: 'string',  default: 'null',  description: 'Classe CSS adicional.' },
        { name: 'expandIcon',  type: 'string',  default: 'null',  description: 'Ícone de expansão.' },
        { name: 'collapseIcon',type: 'string',  default: 'null',  description: 'Ícone de colapso.' },
    ];

    themeVars = [
        { variable: '--p-panel-background',         description: 'Fundo do painel.' },
        { variable: '--p-panel-border-color',       description: 'Borda do painel.' },
        { variable: '--p-panel-border-radius',      description: 'Raio de borda.' },
        { variable: '--p-panel-header-background',  description: 'Fundo do cabeçalho.' },
        { variable: '--p-panel-header-color',       description: 'Cor do texto do cabeçalho.' },
        { variable: '--p-panel-header-padding',     description: 'Padding do cabeçalho.' },
        { variable: '--p-panel-content-padding',    description: 'Padding do conteúdo.' },
    ];
}
