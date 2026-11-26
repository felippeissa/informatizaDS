import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-dataview-demo',
    standalone: true,
    imports: [CommonModule, DataViewModule, ButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">DataView</h1>
            <p class="comp-desc">Exibe coleções de dados em layout de lista ou grade. Suporta paginação, ordenação e templates customizados para cada modo.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">DataViewModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/dataview'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">DataView</div>
                            <p class="demo-card-desc">Alterne entre lista e grade usando o botão de layout. Templates distintos para cada modo de exibição.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:0;gap:0">
                            <div style="display:flex;justify-content:flex-end;align-items:center;padding:12px 16px;border-bottom:1px solid var(--surface-border);gap:8px">
                                <span style="font-size:13px;color:var(--text-color-secondary)">Layout:</span>
                                <p-button [icon]="dvLayout === 'list' ? 'pi pi-list' : 'pi pi-th-large'"
                                          severity="secondary" [text]="true" size="small"
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
export class DataViewDemo {
    dvLayout: 'list' | 'grid' = 'list';

    dvItems = [
        { id: '1', name: 'Goiânia',               region: 'Centro-Oeste',  pop: '1,6 mi hab.' },
        { id: '2', name: 'Anápolis',               region: 'Centro-Goiano', pop: '400 mil hab.' },
        { id: '3', name: 'Aparecida de Goiânia',   region: 'Entorno Sul',   pop: '590 mil hab.' },
        { id: '4', name: 'Rio Verde',              region: 'Sudoeste',      pop: '240 mil hab.' },
        { id: '5', name: 'Luziânia',               region: 'Entorno Sul',   pop: '215 mil hab.' },
        { id: '6', name: 'Formosa',                region: 'Leste',         pop: '120 mil hab.' },
    ];

    code = `<p-dataview [value]="items" [layout]="layout">
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
</p-dataview>`;

    props = [
        { name: 'value',      type: 'any[]',   default: 'null',  description: 'Array de itens para exibir.' },
        { name: 'layout',     type: 'string',  default: 'list',  description: '"list" ou "grid".' },
        { name: 'paginator',  type: 'boolean', default: 'false', description: 'Habilita paginação.' },
        { name: 'rows',       type: 'number',  default: '0',     description: 'Itens por página.' },
        { name: 'sortField',  type: 'string',  default: 'null',  description: 'Campo de ordenação.' },
        { name: 'sortOrder',  type: 'number',  default: '1',     description: '1 = asc, -1 = desc.' },
        { name: 'loading',    type: 'boolean', default: 'false', description: 'Exibe indicador de carregamento.' },
    ];

    themeVars = [
        { variable: '--p-dataview-list-border-color',    description: 'Borda no modo lista.' },
        { variable: '--p-dataview-content-background',   description: 'Fundo do conteúdo.' },
        { variable: '--p-dataview-header-background',    description: 'Fundo do cabeçalho.' },
        { variable: '--p-dataview-footer-background',    description: 'Fundo do rodapé.' },
    ];
}
