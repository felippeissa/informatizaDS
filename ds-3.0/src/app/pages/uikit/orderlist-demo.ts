import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderListModule } from 'primeng/orderlist';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-orderlist-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, OrderListModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        :host ::ng-deep .p-orderlist-list-container { width: 100%; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">OrderList</h1>
            <p class="comp-desc">Lista reordenável com botões para mover itens para cima, para baixo ou para as extremidades. Permite personalizar a renderização de cada item.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">OrderListModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/orderlist'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">OrderList</div>
                            <p class="demo-card-desc">Selecione um item e use os botões laterais para reordenar. Suporta templates customizados para cada item.</p>
                        </div>
                        <div class="demo-card-body" style="padding:20px;align-items:flex-start">
                            <p-orderlist [value]="orderItems" dataKey="id" styleClass="w-full" style="max-width:360px"
                                         header="Municípios de Goiás" [listStyle]="{'min-height':'220px'}">
                                <ng-template #option let-item>
                                    <div style="display:flex;align-items:center;gap:10px;padding:2px 0">
                                        <i class="pi pi-map-marker" style="color:var(--primary-color);font-size:13px"></i>
                                        <span style="font-size:14px">{{ item.name }}</span>
                                    </div>
                                </ng-template>
                            </p-orderlist>
                        </div>
                        <div class="demo-card-code"><pre>{{ code }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Propriedades</div>
                    <p-table [value]="props" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:180px">Nome</th><th style="width:130px">Tipo</th><th style="width:120px">Padrão</th><th>Descrição</th></tr>
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
export class OrderListDemo {
    orderItems = [
        { id: '1', name: 'Goiânia' },
        { id: '2', name: 'Anápolis' },
        { id: '3', name: 'Aparecida de Goiânia' },
        { id: '4', name: 'Rio Verde' },
        { id: '5', name: 'Luziânia' },
        { id: '6', name: 'Águas Lindas de Goiás' },
        { id: '7', name: 'Valparaíso de Goiás' },
    ];

    code = `<p-orderlist [value]="items" dataKey="id" header="Lista"
             [listStyle]="{'min-height':'200px'}">
    <ng-template #option let-item>
        <div style="display:flex;align-items:center;gap:10px">
            <i class="pi pi-map-marker"></i>
            <span>{{ item.name }}</span>
        </div>
    </ng-template>
</p-orderlist>

// Dados:
items = [
    { id: '1', name: 'Goiânia' },
    { id: '2', name: 'Anápolis' },
];`;

    props = [
        { name: 'value',       type: 'any[]',   default: 'null',  description: 'Array de itens da lista.' },
        { name: 'dataKey',     type: 'string',  default: 'null',  description: 'Campo usado como chave única.' },
        { name: 'header',      type: 'string',  default: 'null',  description: 'Título acima da lista.' },
        { name: 'listStyle',   type: 'object',  default: 'null',  description: 'Estilos inline da lista interna.' },
        { name: 'breakpoint',  type: 'string',  default: '960px', description: 'Breakpoint para layout responsivo.' },
        { name: 'stripedRows', type: 'boolean', default: 'false', description: 'Linhas alternadas.' },
    ];

    themeVars = [
        { variable: '--p-orderlist-list-border-color',     description: 'Borda da lista.' },
        { variable: '--p-orderlist-list-background',       description: 'Fundo da lista.' },
        { variable: '--p-orderlist-item-hover-background', description: 'Fundo do item em hover.' },
        { variable: '--p-orderlist-item-selected-background', description: 'Fundo do item selecionado.' },
        { variable: '--p-orderlist-header-background',     description: 'Fundo do cabeçalho.' },
    ];
}
