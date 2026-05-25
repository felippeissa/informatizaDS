import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-listbox-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, ListboxModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Listbox</h1>
            <p class="comp-desc">Lista de opções visível sem necessidade de clicar para expandir. Suporta seleção única, múltipla e filtragem.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">ListboxModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/listbox'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Listbox</div>
                            <p class="demo-card-desc">Lista de opções visível com suporte a seleção única, múltipla e filtro.</p>
                        </div>
                        <div class="demo-card-body" style="gap:24px;align-items:flex-start;flex-wrap:wrap;padding:20px">
                            <div>
                                <p style="font-size:12px;font-weight:700;color:var(--text-color-secondary);margin:0 0 8px;text-transform:uppercase;letter-spacing:.04em">Seleção única</p>
                                <p-listbox [options]="cities" [(ngModel)]="lbSingle" optionLabel="name" style="min-width:200px" />
                            </div>
                            <div>
                                <p style="font-size:12px;font-weight:700;color:var(--text-color-secondary);margin:0 0 8px;text-transform:uppercase;letter-spacing:.04em">Múltipla + filtro</p>
                                <p-listbox [options]="cities" [(ngModel)]="lbMulti" optionLabel="name"
                                           [multiple]="true" [filter]="true" style="min-width:200px" />
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
export class ListboxDemo {
    lbSingle: any = null;
    lbMulti: any[] = [];

    cities = [
        { name: 'Goiânia',              code: 'GYN' },
        { name: 'Anápolis',             code: 'ANA' },
        { name: 'Aparecida de Goiânia', code: 'APG' },
        { name: 'Rio Verde',            code: 'RVD' },
        { name: 'Luziânia',             code: 'LUZ' },
    ];

    code = `<p-listbox [options]="cidades"
    [(ngModel)]="selecionada"
    optionLabel="name" />

<!-- Múltiplo + filtro -->
<p-listbox [options]="cidades"
    [(ngModel)]="selecionadas"
    optionLabel="name"
    [multiple]="true"
    [filter]="true" />`;

    props = [
        { name: 'options',     type: 'any[]',   default: 'null',  description: 'Lista de opções.' },
        { name: 'optionLabel', type: 'string',  default: 'null',  description: 'Propriedade usada como label.' },
        { name: 'optionValue', type: 'string',  default: 'null',  description: 'Propriedade usada como valor.' },
        { name: 'multiple',    type: 'boolean', default: 'false', description: 'Permite seleção múltipla.' },
        { name: 'filter',      type: 'boolean', default: 'false', description: 'Habilita campo de busca.' },
        { name: 'disabled',    type: 'boolean', default: 'false', description: 'Desabilita o listbox.' },
        { name: 'listStyle',   type: 'object',  default: 'null',  description: 'Estilos inline da lista.' },
    ];

    themeVars = [
        { variable: '--p-listbox-background',                description: 'Fundo do listbox.' },
        { variable: '--p-listbox-border-color',              description: 'Borda do listbox.' },
        { variable: '--p-listbox-border-radius',             description: 'Raio de borda.' },
        { variable: '--p-listbox-option-focus-background',   description: 'Fundo da opção em hover.' },
        { variable: '--p-listbox-option-selected-background',description: 'Fundo da opção selecionada.' },
    ];
}
