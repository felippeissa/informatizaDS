import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-knob-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, KnobModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Knob</h1>
            <p class="comp-desc">Controle circular (dial) para entrada numérica visual. Suporte a min/max, passo e modo readonly.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">KnobModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/knob'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Knob</div>
                            <p class="demo-card-desc">Controle circular (dial) para entrada numérica visual.</p>
                        </div>
                        <div class="demo-card-body" style="gap:32px;flex-wrap:wrap;padding:20px">
                            <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
                                <p-knob [(ngModel)]="knobVal1" />
                                <span style="font-size:12px;color:var(--text-color-secondary)">Padrão: {{ knobVal1 }}%</span>
                            </div>
                            <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
                                <p-knob [(ngModel)]="knobVal2" [min]="0" [max]="200" [step]="10" valueColor="#059669" rangeColor="#D1FAE5" />
                                <span style="font-size:12px;color:var(--text-color-secondary)">0–200 (step 10): {{ knobVal2 }}</span>
                            </div>
                            <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
                                <p-knob [(ngModel)]="knobVal3" [readonly]="true" valueColor="#3B82F6" />
                                <span style="font-size:12px;color:var(--text-color-secondary)">Somente leitura</span>
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
export class KnobDemo {
    knobVal1 = 60;
    knobVal2 = 80;
    knobVal3 = 45;

    code = `<p-knob [(ngModel)]="valor" />

<!-- Customizado -->
<p-knob [(ngModel)]="valor"
    [min]="0" [max]="200" [step]="10"
    valueColor="#059669"
    rangeColor="#D1FAE5" />`;

    props = [
        { name: 'min',         type: 'number',  default: '0',    description: 'Valor mínimo.' },
        { name: 'max',         type: 'number',  default: '100',  description: 'Valor máximo.' },
        { name: 'step',        type: 'number',  default: '1',    description: 'Incremento por passo.' },
        { name: 'size',        type: 'number',  default: '100',  description: 'Tamanho em pixels.' },
        { name: 'strokeWidth', type: 'number',  default: '14',   description: 'Espessura do arco.' },
        { name: 'valueColor',  type: 'string',  default: 'null', description: 'Cor do arco preenchido.' },
        { name: 'rangeColor',  type: 'string',  default: 'null', description: 'Cor do arco de fundo.' },
        { name: 'textColor',   type: 'string',  default: 'null', description: 'Cor do valor exibido.' },
        { name: 'readonly',    type: 'boolean', default: 'false',description: 'Somente leitura.' },
        { name: 'disabled',    type: 'boolean', default: 'false',description: 'Desabilita o knob.' },
        { name: 'showValue',   type: 'boolean', default: 'true', description: 'Exibe o valor no centro.' },
    ];

    themeVars = [
        { variable: '--p-knob-value-color', description: 'Cor do arco preenchido.' },
        { variable: '--p-knob-range-color', description: 'Cor do arco de fundo.' },
        { variable: '--p-knob-text-color',  description: 'Cor do valor exibido no centro.' },
    ];
}
