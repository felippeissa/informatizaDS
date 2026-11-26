import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-select-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, SelectModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        .form-col { display:flex; flex-direction:column; gap:6px; width:100%; max-width:280px; }
        .form-col label { font-size:13px; font-weight:600; color:var(--text-color-secondary); }
        .form-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:20px; padding:20px; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Select</h1>
            <p class="comp-desc">Dropdown de seleção única com suporte a filtro, grupos e itens customizados.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">SelectModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/select'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Select</div>
                            <p class="demo-card-desc">Dropdown de seleção única com suporte a filtro e grupos.</p>
                        </div>
                        <div class="demo-card-body form-grid">
                            <div class="form-col">
                                <label>Básico</label>
                                <p-select [(ngModel)]="selVal" [options]="cities" optionLabel="name" placeholder="Selecione a cidade" [fluid]="true" />
                            </div>
                            <div class="form-col">
                                <label>Com filtro</label>
                                <p-select [(ngModel)]="selVal2" [options]="cities" optionLabel="name" [filter]="true" placeholder="Busque a cidade" [fluid]="true" />
                            </div>
                            <div class="form-col">
                                <label>Desabilitado</label>
                                <p-select [options]="cities" optionLabel="name" placeholder="—" [disabled]="true" [fluid]="true" />
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
export class SelectDemo {
    selVal: any = null;
    selVal2: any = null;

    cities = [
        { name: 'Goiânia',              code: 'GYN' },
        { name: 'Anápolis',             code: 'ANA' },
        { name: 'Aparecida de Goiânia', code: 'APG' },
        { name: 'Rio Verde',            code: 'RVD' },
        { name: 'Luziânia',             code: 'LUZ' },
    ];

    code = `<p-select [(ngModel)]="cidade"
    [options]="cidades"
    optionLabel="name"
    placeholder="Selecione a cidade"
    [fluid]="true" />

<!-- Com filtro -->
<p-select [(ngModel)]="cidade"
    [options]="cidades"
    optionLabel="name"
    [filter]="true"
    [fluid]="true" />`;

    props = [
        { name: 'options',     type: 'any[]',   default: 'null',  description: 'Lista de opções.' },
        { name: 'optionLabel', type: 'string',  default: 'null',  description: 'Propriedade do objeto usada como label.' },
        { name: 'optionValue', type: 'string',  default: 'null',  description: 'Propriedade do objeto usada como valor.' },
        { name: 'placeholder', type: 'string',  default: 'null',  description: 'Texto quando nada está selecionado.' },
        { name: 'filter',      type: 'boolean', default: 'false', description: 'Habilita campo de busca interno.' },
        { name: 'disabled',    type: 'boolean', default: 'false', description: 'Desabilita o componente.' },
        { name: 'fluid',       type: 'boolean', default: 'false', description: 'Largura total.' },
        { name: 'showClear',   type: 'boolean', default: 'false', description: 'Exibe botão para limpar seleção.' },
        { name: 'editable',    type: 'boolean', default: 'false', description: 'Permite digitar no campo.' },
    ];

    themeVars = [
        { variable: '--p-select-background',                description: 'Fundo do select.' },
        { variable: '--p-select-border-color',              description: 'Borda do select.' },
        { variable: '--p-select-border-radius',             description: 'Raio de borda.' },
        { variable: '--p-select-option-focus-background',   description: 'Fundo da opção em hover.' },
        { variable: '--p-select-option-selected-background',description: 'Fundo da opção selecionada.' },
        { variable: '--p-select-overlay-background',        description: 'Fundo do painel dropdown.' },
    ];
}
