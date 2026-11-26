import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeterGroupModule } from 'primeng/metergroup';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-metergroup-demo',
    standalone: true,
    imports: [CommonModule, MeterGroupModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">MeterGroup</h1>
            <p class="comp-desc">Barra de progresso segmentada para exibir múltiplas métricas lado a lado em uma única barra.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">MeterGroupModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/metergroup'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">MeterGroup</div>
                            <p class="demo-card-desc">Barra de progresso segmentada para exibir múltiplas métricas lado a lado em uma única barra.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:20px;gap:0;width:100%">
                            <p-metergroup [value]="items" />
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
export class MeterGroupDemo {
    items = [
        { label: 'Concluídos',   value: 45, color: '#059669' },
        { label: 'Em andamento', value: 30, color: '#3B82F6' },
        { label: 'Pendentes',    value: 15, color: '#F59E0B' },
        { label: 'Cancelados',   value: 10, color: '#EF4444' },
    ];

    code = `<p-metergroup [value]="items" />

// Dados:
items = [
    { label: 'Concluídos',   value: 45, color: '#059669' },
    { label: 'Em andamento', value: 30, color: '#3B82F6' },
    { label: 'Pendentes',    value: 15, color: '#F59E0B' },
    { label: 'Cancelados',   value: 10, color: '#EF4444' },
];`;

    props = [
        { name: 'value',       type: 'MeterItem[]', default: 'null',        description: 'Array de itens com label, value e color.' },
        { name: 'min',         type: 'number',      default: '0',           description: 'Valor mínimo da escala.' },
        { name: 'max',         type: 'number',      default: '100',         description: 'Valor máximo da escala.' },
        { name: 'orientation', type: 'string',      default: 'horizontal',  description: '"horizontal" ou "vertical".' },
        { name: 'labelPosition', type: 'string',    default: 'end',         description: 'Posição do label: start | end.' },
    ];

    themeVars = [
        { variable: '--p-metergroup-background',    description: 'Fundo da barra do MeterGroup.' },
        { variable: '--p-metergroup-border-radius', description: 'Raio de borda dos segmentos.' },
        { variable: '--p-metergroup-height',        description: 'Altura da barra.' },
    ];
}
