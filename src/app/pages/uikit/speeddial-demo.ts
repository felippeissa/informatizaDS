import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { SpeedDialModule } from 'primeng/speeddial';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-speeddial-demo',
    standalone: true,
    imports: [CommonModule, SpeedDialModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">SpeedDial</h1>
            <p class="comp-desc">Menu radial de ações rápidas que se expande ao clicar. Configure a direção com <code>direction</code>.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">SpeedDialModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/speeddial'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">SpeedDial</div>
                            <p class="demo-card-desc">Menu radial de ações rápidas que se expande ao clicar. Configure a direção com <code>direction</code> e adicione uma máscara com <code>[mask]="true"</code>.</p>
                        </div>
                        <div class="demo-card-body" style="position:relative;min-height:220px;overflow:hidden;justify-content:center;align-items:center;gap:80px">
                            <div style="position:relative;width:80px;height:80px;display:flex;align-items:flex-end;justify-content:center">
                                <p-speeddial [model]="items" direction="up" />
                                <span style="position:absolute;top:-22px;font-size:11px;font-weight:600;color:var(--text-color-secondary);white-space:nowrap">up</span>
                            </div>
                            <div style="position:relative;width:80px;height:80px;display:flex;align-items:center;justify-content:flex-start">
                                <p-speeddial [model]="items" direction="right" />
                                <span style="position:absolute;bottom:-18px;font-size:11px;font-weight:600;color:var(--text-color-secondary);white-space:nowrap">right</span>
                            </div>
                            <div style="position:relative;width:80px;height:80px;display:flex;align-items:flex-start;justify-content:center">
                                <p-speeddial [model]="items" direction="down" />
                                <span style="position:absolute;bottom:-22px;font-size:11px;font-weight:600;color:var(--text-color-secondary);white-space:nowrap">down</span>
                            </div>
                            <div style="position:relative;width:80px;height:80px;display:flex;align-items:center;justify-content:flex-end">
                                <p-speeddial [model]="items" direction="left" />
                                <span style="position:absolute;bottom:-18px;font-size:11px;font-weight:600;color:var(--text-color-secondary);white-space:nowrap">left</span>
                            </div>
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
export class SpeedDialDemo implements OnInit {
    items: MenuItem[] = [];

    ngOnInit() {
        this.items = [
            { label: 'Adicionar', icon: 'pi pi-pencil', command: () => {} },
            { label: 'Atualizar', icon: 'pi pi-refresh', command: () => {} },
            { label: 'Excluir',   icon: 'pi pi-trash',   command: () => {} },
            { label: 'Upload',    icon: 'pi pi-upload',  command: () => {} },
        ];
    }

    code = `<p-speeddial [model]="items" direction="up" />
<p-speeddial [model]="items" direction="right" />
<p-speeddial [model]="items" direction="down" />
<p-speeddial [model]="items" direction="left" />

// Com máscara:
<p-speeddial [model]="items" direction="up" [mask]="true" />

// Items (MenuItem[]):
items = [
    { label: 'Adicionar', icon: 'pi pi-pencil', command: () => {} },
    { label: 'Atualizar', icon: 'pi pi-refresh', command: () => {} },
    { label: 'Excluir',   icon: 'pi pi-trash',   command: () => {} },
];`;

    props = [
        { name: 'model',     type: 'MenuItem[]', default: 'null',  description: 'Itens do menu radial.' },
        { name: 'direction', type: 'string',     default: 'up',    description: 'Direção: up | down | left | right.' },
        { name: 'mask',      type: 'boolean',    default: 'false', description: 'Exibe overlay escuro ao abrir.' },
        { name: 'visible',   type: 'boolean',    default: 'false', description: 'Controla abertura (two-way).' },
        { name: 'disabled',  type: 'boolean',    default: 'false', description: 'Desabilita o componente.' },
        { name: 'type',      type: 'string',     default: 'linear', description: 'Tipo de animação: linear | circle | semi-circle | quarter-circle.' },
    ];

    themeVars = [
        { variable: '--p-speeddial-button-background',       description: 'Fundo do botão principal.' },
        { variable: '--p-speeddial-button-color',            description: 'Cor do ícone do botão principal.' },
        { variable: '--p-speeddial-action-background',       description: 'Fundo dos botões de ação.' },
        { variable: '--p-speeddial-action-color',            description: 'Cor dos ícones de ação.' },
        { variable: '--p-speeddial-mask-background',         description: 'Cor do overlay mask.' },
    ];
}
