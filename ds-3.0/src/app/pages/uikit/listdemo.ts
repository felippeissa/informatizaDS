import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { PickListModule } from 'primeng/picklist';
import { DataViewModule } from 'primeng/dataview';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-list-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, OrderListModule, PickListModule, DataViewModule, ButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        :host ::ng-deep .p-orderlist-list-container { width: 100%; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Listas</h1>
            <p class="comp-desc">Componentes para gerenciar listas ordenáveis e transferência de itens entre duas coleções.</p>
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

                    <!-- OrderList -->
                    <div id="orderlist" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">OrderList</div>
                            <p class="demo-card-desc">Lista reordenável com botões para mover itens para cima, para baixo ou para as extremidades.</p>
                        </div>
                        <div class="demo-card-body" style="padding:20px;align-items:flex-start">
                            <p-orderlist [value]="orderItems" dataKey="id" styleClass="w-full" style="max-width:340px"
                                         header="Municípios de Goiás" [listStyle]="{'min-height':'200px'}">
                                <ng-template #option let-item>
                                    <div style="display:flex;align-items:center;gap:10px;padding:2px 0">
                                        <i class="pi pi-map-marker" style="color:var(--primary-color);font-size:13px"></i>
                                        <span style="font-size:14px">{{ item.name }}</span>
                                    </div>
                                </ng-template>
                            </p-orderlist>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.orderlist }}</pre></div>
                    </div>

                    <!-- PickList -->
                    <div id="picklist" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">PickList</div>
                            <p class="demo-card-desc">Transferência de itens entre duas listas (disponível e selecionado) com controles direcionais.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:20px;gap:0">
                            <p-pick-list [source]="sourceCities" [target]="targetCities"
                                         sourceHeader="Disponível" targetHeader="Selecionado"
                                         breakpoint="1400px" [showSourceControls]="false" [showTargetControls]="false">
                                <ng-template #item let-item>
                                    <div style="display:flex;align-items:center;gap:10px;padding:2px 0">
                                        <i class="pi pi-map-marker" style="color:var(--primary-color);font-size:13px"></i>
                                        <span style="font-size:14px">{{ item.name }}</span>
                                    </div>
                                </ng-template>
                            </p-pick-list>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.picklist }}</pre></div>
                    </div>

                    <!-- DataView -->
                    <div id="dataview" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">DataView</div>
                            <p class="demo-card-desc">Exibe coleções de dados em layout de lista ou grade. Suporta paginação, ordenação e filtragem.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:0;gap:0">
                            <div style="display:flex;justify-content:flex-end;align-items:center;padding:12px 16px;border-bottom:1px solid var(--surface-border);gap:8px">
                                <span style="font-size:13px;color:var(--text-color-secondary)">Layout:</span>
                                <p-button [icon]="dvLayout === 'list' ? 'pi pi-list' : 'pi pi-th-large'"
                                          [severity]="'secondary'" [text]="true" size="small"
                                          (click)="dvLayout = dvLayout === 'list' ? 'grid' : 'list'" />
                            </div>
                            <p-dataview [value]="dvItems" [layout]="dvLayout">
                                <ng-template #list let-items>
                                    @for (item of items; track item.id) {
                                        <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid var(--surface-border)">
                                            <i class="pi pi-map-marker" style="color:var(--primary-color);font-size:14px"></i>
                                            <div style="flex:1">
                                                <p style="margin:0;font-size:14px;font-weight:600;color:var(--text-color)">{{ item.name }}</p>
                                                <p style="margin:0;font-size:12px;color:var(--text-color-secondary)">{{ item.region }} — {{ item.pop }}</p>
                                            </div>
                                        </div>
                                    }
                                </ng-template>
                                <ng-template #grid let-items>
                                    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;padding:16px">
                                        @for (item of items; track item.id) {
                                            <div style="border:1px solid var(--surface-border);border-radius:8px;padding:16px;background:var(--surface-card)">
                                                <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:var(--text-color)">{{ item.name }}</p>
                                                <p style="margin:0;font-size:12px;color:var(--text-color-secondary)">{{ item.region }}</p>
                                                <p style="margin:6px 0 0;font-size:12px;color:var(--primary-color);font-weight:600">{{ item.pop }}</p>
                                            </div>
                                        }
                                    </div>
                                </ng-template>
                            </p-dataview>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.dataview }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">OrderList — Propriedades</div>
                    <p-table [value]="propsOrderList" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
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

                    <div class="api-block-title" style="margin-top:24px">PickList — Propriedades</div>
                    <p-table [value]="propsPickList" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
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
export class ListDemo {
    dvLayout: 'list' | 'grid' = 'list';

    dvItems = [
        { id: '1', name: 'Goiânia',               region: 'Centro-Oeste', pop: '1,6 mi hab.' },
        { id: '2', name: 'Anápolis',               region: 'Centro-Goiano', pop: '400 mil hab.' },
        { id: '3', name: 'Aparecida de Goiânia',   region: 'Entorno Sul',   pop: '590 mil hab.' },
        { id: '4', name: 'Rio Verde',              region: 'Sudoeste',      pop: '240 mil hab.' },
        { id: '5', name: 'Luziânia',               region: 'Entorno Sul',   pop: '215 mil hab.' },
        { id: '6', name: 'Formosa',                region: 'Leste',         pop: '120 mil hab.' },
    ];

    orderItems = [
        { id: '1', name: 'Goiânia' },
        { id: '2', name: 'Anápolis' },
        { id: '3', name: 'Aparecida de Goiânia' },
        { id: '4', name: 'Rio Verde' },
        { id: '5', name: 'Luziânia' },
        { id: '6', name: 'Águas Lindas de Goiás' },
        { id: '7', name: 'Valparaíso de Goiás' },
    ];

    sourceCities = [
        { id: '1', name: 'Goiânia' },
        { id: '2', name: 'Anápolis' },
        { id: '3', name: 'Aparecida de Goiânia' },
        { id: '4', name: 'Rio Verde' },
        { id: '5', name: 'Luziânia' },
        { id: '6', name: 'Formosa' },
        { id: '7', name: 'Novo Gama' },
    ];

    targetCities: any[] = [];

    code: any = {
        orderlist: `<p-orderlist [value]="items" dataKey="id" header="Lista">
    <ng-template #option let-item>
        {{ item.name }}
    </ng-template>
</p-orderlist>

// Dados:
items = [
    { id: '1', name: 'Goiânia' },
    { id: '2', name: 'Anápolis' },
];`,

        dataview: `<p-dataview [value]="items" [layout]="layout">
    <ng-template #list let-items>
        @for (item of items; track item.id) {
            <div style="padding:12px 16px;border-bottom:1px solid var(--surface-border)">
                <strong>{{ item.name }}</strong>
                <p>{{ item.description }}</p>
            </div>
        }
    </ng-template>
    <ng-template #grid let-items>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:16px">
            @for (item of items; track item.id) {
                <div style="border:1px solid var(--surface-border);border-radius:8px;padding:16px">
                    {{ item.name }}
                </div>
            }
        </div>
    </ng-template>
</p-dataview>`,

        picklist: `<p-pick-list [source]="source" [target]="target"
             sourceHeader="Disponível"
             targetHeader="Selecionado">
    <ng-template #item let-item>
        {{ item.name }}
    </ng-template>
</p-pick-list>`,
    };

    propsOrderList = [
        { name: 'value',       type: 'any[]',   default: 'null',  description: 'Array de itens.' },
        { name: 'dataKey',     type: 'string',  default: 'null',  description: 'Campo usado como chave única.' },
        { name: 'header',      type: 'string',  default: 'null',  description: 'Título da lista.' },
        { name: 'listStyle',   type: 'object',  default: 'null',  description: 'Estilos inline da lista interna.' },
        { name: 'breakpoint',  type: 'string',  default: '960px', description: 'Breakpoint para layout responsivo.' },
    ];

    propsPickList = [
        { name: 'source',               type: 'any[]',   default: 'null',   description: 'Array de itens disponíveis.' },
        { name: 'target',               type: 'any[]',   default: 'null',   description: 'Array de itens selecionados.' },
        { name: 'sourceHeader',         type: 'string',  default: 'null',   description: 'Título da lista de origem.' },
        { name: 'targetHeader',         type: 'string',  default: 'null',   description: 'Título da lista de destino.' },
        { name: 'showSourceControls',   type: 'boolean', default: 'true',   description: 'Exibe botões de ordenação na origem.' },
        { name: 'showTargetControls',   type: 'boolean', default: 'true',   description: 'Exibe botões de ordenação no destino.' },
        { name: 'breakpoint',           type: 'string',  default: '960px',  description: 'Breakpoint para layout responsivo.' },
    ];

    themeVars = [
        { variable: '--p-orderlist-list-border-color',    description: 'Borda da lista.' },
        { variable: '--p-orderlist-list-background',      description: 'Fundo da lista.' },
        { variable: '--p-orderlist-item-hover-background',description: 'Fundo do item no hover.' },
        { variable: '--p-picklist-list-border-color',     description: 'Borda das listas do PickList.' },
        { variable: '--p-picklist-list-background',       description: 'Fundo das listas do PickList.' },
        { variable: '--p-dataview-list-border-color',     description: 'Borda do DataView no modo lista.' },
        { variable: '--p-dataview-content-background',    description: 'Fundo do conteúdo do DataView.' },
    ];
}
