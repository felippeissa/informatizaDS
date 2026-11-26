import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-checkbox-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, CheckboxModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Checkbox</h1>
            <p class="comp-desc">Seleção booleana ou múltipla com suporte a estados indeterminados.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">CheckboxModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/checkbox'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Checkbox</div>
                            <p class="demo-card-desc">Seleção booleana ou múltipla com suporte a estados indeterminados.</p>
                        </div>
                        <div class="demo-card-body" style="gap:20px">
                            <div style="display:flex;align-items:center;gap:8px">
                                <p-checkbox [(ngModel)]="chk1" [binary]="true" inputId="chk1" />
                                <label for="chk1" style="font-size:14px;cursor:pointer">Aceito os termos</label>
                            </div>
                            <div style="display:flex;align-items:center;gap:8px">
                                <p-checkbox [(ngModel)]="chk2" [binary]="true" inputId="chk2" [disabled]="true" />
                                <label for="chk2" style="font-size:14px;color:var(--text-color-secondary)">Desabilitado</label>
                            </div>
                            @for (opt of chkOptions; track opt.value) {
                                <div style="display:flex;align-items:center;gap:8px">
                                    <p-checkbox [(ngModel)]="chkSelected" [value]="opt.value" [inputId]="opt.value" name="opts" />
                                    <label [for]="opt.value" style="font-size:14px;cursor:pointer">{{ opt.label }}</label>
                                </div>
                            }
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
export class CheckboxDemo {
    chk1 = false;
    chk2 = true;
    chkSelected: string[] = [];

    chkOptions = [
        { label: 'Angular', value: 'angular' },
        { label: 'React',   value: 'react' },
        { label: 'Vue',     value: 'vue' },
    ];

    code = `<!-- Binário -->
<p-checkbox [(ngModel)]="aceito" [binary]="true" inputId="chk" />
<label for="chk">Aceito os termos</label>

<!-- Múltipla seleção -->
<p-checkbox [(ngModel)]="selecionados" value="angular"
    inputId="ang" name="techs" />
<label for="ang">Angular</label>`;

    props = [
        { name: 'binary',        type: 'boolean', default: 'false', description: 'Modo booleano (true/false).' },
        { name: 'value',         type: 'any',     default: 'null',  description: 'Valor inserido no array ao selecionar.' },
        { name: 'inputId',       type: 'string',  default: 'null',  description: 'ID para associar ao label.' },
        { name: 'name',          type: 'string',  default: 'null',  description: 'Nome do grupo de checkboxes.' },
        { name: 'disabled',      type: 'boolean', default: 'false', description: 'Desabilita o checkbox.' },
        { name: 'readonly',      type: 'boolean', default: 'false', description: 'Somente leitura.' },
        { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Estado indeterminado.' },
    ];

    themeVars = [
        { variable: '--p-checkbox-background',               description: 'Fundo do checkbox.' },
        { variable: '--p-checkbox-border-color',             description: 'Cor da borda.' },
        { variable: '--p-checkbox-checked-background',       description: 'Fundo quando marcado.' },
        { variable: '--p-checkbox-checked-border-color',     description: 'Borda quando marcado.' },
        { variable: '--p-checkbox-icon-color',               description: 'Cor do ícone de check.' },
        { variable: '--p-checkbox-border-radius',            description: 'Raio de borda.' },
    ];
}
