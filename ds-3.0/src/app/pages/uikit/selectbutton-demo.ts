import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-selectbutton-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, SelectButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">SelectButton</h1>
            <p class="comp-desc">Seleção de uma ou múltiplas opções exibidas como botões agrupados. Alternativa visual ao RadioButton e Checkbox.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">SelectButtonModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/selectbutton'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">SelectButton</div>
                            <p class="demo-card-desc">Seleção de uma ou múltiplas opções exibidas como botões agrupados.</p>
                        </div>
                        <div class="demo-card-body col" style="gap:16px;padding:20px">
                            <div>
                                <p style="font-size:12px;font-weight:700;color:var(--text-color-secondary);margin:0 0 8px;text-transform:uppercase;letter-spacing:.04em">Seleção única</p>
                                <p-selectbutton [(ngModel)]="sbSingle" [options]="sbViewOptions" optionLabel="label" optionValue="value" />
                            </div>
                            <div>
                                <p style="font-size:12px;font-weight:700;color:var(--text-color-secondary);margin:0 0 8px;text-transform:uppercase;letter-spacing:.04em">Múltipla seleção</p>
                                <p-selectbutton [(ngModel)]="sbMulti" [options]="sbDayOptions" optionLabel="label" optionValue="value" [multiple]="true" />
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
export class SelectButtonDemo {
    sbSingle = 'list';
    sbMulti: string[] = [];

    sbViewOptions = [
        { label: 'Lista',  value: 'list'   },
        { label: 'Grade',  value: 'grid'   },
        { label: 'Kanban', value: 'kanban' },
    ];

    sbDayOptions = [
        { label: 'Seg', value: 'mon' },
        { label: 'Ter', value: 'tue' },
        { label: 'Qua', value: 'wed' },
        { label: 'Qui', value: 'thu' },
        { label: 'Sex', value: 'fri' },
    ];

    code = `<p-selectbutton [(ngModel)]="value"
    [options]="options"
    optionLabel="label"
    optionValue="value" />

<!-- Múltiplo -->
<p-selectbutton [(ngModel)]="days"
    [options]="dayOptions"
    optionLabel="label"
    optionValue="value"
    [multiple]="true" />`;

    props = [
        { name: 'options',      type: 'any[]',   default: 'null',  description: 'Lista de opções.' },
        { name: 'optionLabel',  type: 'string',  default: 'null',  description: 'Propriedade usada como label.' },
        { name: 'optionValue',  type: 'string',  default: 'null',  description: 'Propriedade usada como valor.' },
        { name: 'multiple',     type: 'boolean', default: 'false', description: 'Permite seleção múltipla.' },
        { name: 'disabled',     type: 'boolean', default: 'false', description: 'Desabilita o componente.' },
        { name: 'allowEmpty',   type: 'boolean', default: 'true',  description: 'Permite desselecionar.' },
    ];

    themeVars = [
        { variable: '--p-selectbutton-background',         description: 'Fundo dos botões.' },
        { variable: '--p-selectbutton-border-color',       description: 'Borda dos botões.' },
        { variable: '--p-selectbutton-color',              description: 'Cor do texto.' },
        { variable: '--p-selectbutton-selected-background',description: 'Fundo do botão selecionado.' },
        { variable: '--p-selectbutton-selected-color',     description: 'Cor do texto selecionado.' },
    ];
}
