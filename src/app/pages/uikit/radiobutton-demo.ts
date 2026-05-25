import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-radiobutton-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, RadioButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">RadioButton</h1>
            <p class="comp-desc">Seleção única dentro de um grupo de opções. Use o mesmo <code>name</code> para agrupar os botões.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">RadioButtonModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/radiobutton'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">RadioButton</div>
                            <p class="demo-card-desc">Seleção única dentro de um grupo de opções.</p>
                        </div>
                        <div class="demo-card-body" style="gap:20px">
                            @for (opt of radioOptions; track opt.value) {
                                <div style="display:flex;align-items:center;gap:8px">
                                    <p-radiobutton [(ngModel)]="radioSelected" [value]="opt.value" [inputId]="'r'+opt.value" name="radio" />
                                    <label [for]="'r'+opt.value" style="font-size:14px;cursor:pointer">{{ opt.label }}</label>
                                </div>
                            }
                            <p style="font-size:13px;color:var(--text-color-secondary);margin:0">Selecionado: <strong>{{ radioSelected }}</strong></p>
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
export class RadioButtonDemo {
    radioSelected = 'goiania';

    radioOptions = [
        { label: 'Goiânia',   value: 'goiania' },
        { label: 'Anápolis',  value: 'anapolis' },
        { label: 'Rio Verde', value: 'rioverde' },
    ];

    code = `<p-radiobutton [(ngModel)]="selected" value="goiania"
    inputId="r1" name="city" />
<label for="r1">Goiânia</label>

<p-radiobutton [(ngModel)]="selected" value="anapolis"
    inputId="r2" name="city" />
<label for="r2">Anápolis</label>`;

    props = [
        { name: 'value',    type: 'any',     default: 'null',  description: 'Valor que será atribuído ao ngModel quando selecionado.' },
        { name: 'inputId',  type: 'string',  default: 'null',  description: 'ID para associar ao label.' },
        { name: 'name',     type: 'string',  default: 'null',  description: 'Nome do grupo (obrigatório para agrupamento).' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o radiobutton.' },
        { name: 'readonly', type: 'boolean', default: 'false', description: 'Somente leitura.' },
    ];

    themeVars = [
        { variable: '--p-radiobutton-background',         description: 'Fundo do radiobutton.' },
        { variable: '--p-radiobutton-border-color',       description: 'Cor da borda.' },
        { variable: '--p-radiobutton-checked-background', description: 'Fundo quando selecionado.' },
        { variable: '--p-radiobutton-icon-color',         description: 'Cor do ícone interno.' },
        { variable: '--p-radiobutton-border-radius',      description: 'Raio de borda (geralmente 50%).' },
    ];
}
