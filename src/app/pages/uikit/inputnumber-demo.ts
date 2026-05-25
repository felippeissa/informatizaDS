import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-inputnumber-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, InputNumberModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        .form-col { display:flex; flex-direction:column; gap:6px; width:100%; max-width:280px; }
        .form-col label { font-size:13px; font-weight:600; color:var(--text-color-secondary); }
        .form-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:20px; padding:20px; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">InputNumber</h1>
            <p class="comp-desc">Campo numérico com formatação de moeda, porcentagem e botões de incremento.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">InputNumberModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/inputnumber'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">InputNumber</div>
                            <p class="demo-card-desc">Campo numérico com formatação de moeda, porcentagem e botões de incremento.</p>
                        </div>
                        <div class="demo-card-body form-grid">
                            <div class="form-col">
                                <label>Inteiro</label>
                                <p-inputnumber [(ngModel)]="num" [fluid]="true" placeholder="0" />
                            </div>
                            <div class="form-col">
                                <label>Moeda (BRL)</label>
                                <p-inputnumber [(ngModel)]="currency" mode="currency" currency="BRL" locale="pt-BR" [fluid]="true" />
                            </div>
                            <div class="form-col">
                                <label>Com botões</label>
                                <p-inputnumber [(ngModel)]="num2" [showButtons]="true" [min]="0" [max]="100" [fluid]="true" />
                            </div>
                            <div class="form-col">
                                <label>Porcentagem</label>
                                <p-inputnumber [(ngModel)]="pct" mode="decimal" [minFractionDigits]="1" [maxFractionDigits]="2" suffix="%" [fluid]="true" />
                            </div>
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
export class InputNumberDemo {
    num: number | null = null;
    num2 = 50;
    currency: number | null = null;
    pct: number | null = null;

    code = `<!-- Inteiro -->
<p-inputnumber [(ngModel)]="num" [fluid]="true" />

<!-- Moeda -->
<p-inputnumber [(ngModel)]="val" mode="currency"
    currency="BRL" locale="pt-BR" [fluid]="true" />

<!-- Com botões -->
<p-inputnumber [(ngModel)]="num" [showButtons]="true"
    [min]="0" [max]="100" [fluid]="true" />`;

    props = [
        { name: 'mode',              type: 'string',  default: 'decimal',  description: '"decimal" ou "currency".' },
        { name: 'currency',          type: 'string',  default: 'null',     description: 'Código da moeda (ex: "BRL").' },
        { name: 'locale',            type: 'string',  default: 'null',     description: 'Locale para formatação (ex: "pt-BR").' },
        { name: 'showButtons',       type: 'boolean', default: 'false',    description: 'Exibe botões de incremento/decremento.' },
        { name: 'min',               type: 'number',  default: 'null',     description: 'Valor mínimo.' },
        { name: 'max',               type: 'number',  default: 'null',     description: 'Valor máximo.' },
        { name: 'step',              type: 'number',  default: '1',        description: 'Passo de incremento.' },
        { name: 'prefix',            type: 'string',  default: 'null',     description: 'Prefixo exibido antes do valor.' },
        { name: 'suffix',            type: 'string',  default: 'null',     description: 'Sufixo exibido após o valor.' },
        { name: 'minFractionDigits', type: 'number',  default: 'null',     description: 'Mínimo de casas decimais.' },
        { name: 'maxFractionDigits', type: 'number',  default: 'null',     description: 'Máximo de casas decimais.' },
        { name: 'fluid',             type: 'boolean', default: 'false',    description: 'Largura total.' },
    ];

    themeVars = [
        { variable: '--p-inputtext-background',         description: 'Fundo do campo.' },
        { variable: '--p-inputtext-border-color',       description: 'Cor da borda.' },
        { variable: '--p-inputtext-focus-border-color', description: 'Cor da borda em foco.' },
        { variable: '--p-inputtext-border-radius',      description: 'Raio de borda.' },
    ];
}
