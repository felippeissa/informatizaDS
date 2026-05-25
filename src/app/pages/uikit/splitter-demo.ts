import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitterModule } from 'primeng/splitter';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-splitter-demo',
    standalone: true,
    imports: [CommonModule, SplitterModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Splitter</h1>
            <p class="comp-desc">Divide a área em painéis redimensionáveis. Suporte a divisão horizontal e vertical com <code>layout</code>.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">SplitterModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/splitter'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Splitter</div>
                            <p class="demo-card-desc">Divide a área em painéis redimensionáveis. Suporte a divisão horizontal e vertical.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:20px;gap:12px">
                            <p-splitter [style]="{'height':'180px'}" styleClass="w-full">
                                <ng-template pTemplate>
                                    <div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:14px;color:var(--text-color-secondary)">Painel 1</div>
                                </ng-template>
                                <ng-template pTemplate>
                                    <div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:14px;color:var(--text-color-secondary)">Painel 2</div>
                                </ng-template>
                                <ng-template pTemplate>
                                    <div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:14px;color:var(--text-color-secondary)">Painel 3</div>
                                </ng-template>
                            </p-splitter>
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
export class SplitterDemo {
    code = `<p-splitter [style]="{'height':'300px'}">
    <ng-template pTemplate>
        <div>Painel 1</div>
    </ng-template>
    <ng-template pTemplate>
        <div>Painel 2</div>
    </ng-template>
</p-splitter>

<!-- Vertical -->
<p-splitter layout="vertical" [style]="{'height':'300px'}">
    <ng-template pTemplate><div>Topo</div></ng-template>
    <ng-template pTemplate><div>Base</div></ng-template>
</p-splitter>`;

    props = [
        { name: 'layout',      type: 'string',   default: 'horizontal', description: '"horizontal" ou "vertical".' },
        { name: 'panelSizes',  type: 'number[]', default: 'null',       description: 'Tamanhos iniciais dos painéis em porcentagem.' },
        { name: 'minSizes',    type: 'number[]', default: 'null',       description: 'Tamanhos mínimos dos painéis em porcentagem.' },
        { name: 'gutterSize',  type: 'number',   default: '4',          description: 'Tamanho do divisor em pixels.' },
        { name: 'stateKey',    type: 'string',   default: 'null',       description: 'Chave para salvar estado no localStorage.' },
        { name: 'styleClass',  type: 'string',   default: 'null',       description: 'Classe CSS adicional.' },
    ];

    themeVars = [
        { variable: '--p-splitter-background',         description: 'Fundo do splitter.' },
        { variable: '--p-splitter-border-color',       description: 'Borda do splitter.' },
        { variable: '--p-splitter-gutter-background',  description: 'Cor do divisor (gutter).' },
        { variable: '--p-splitter-gutter-handle-background', description: 'Cor da alça do divisor.' },
    ];
}
