import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-fieldset-demo',
    standalone: true,
    imports: [CommonModule, FieldsetModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Fieldset</h1>
            <p class="comp-desc">Agrupa campos relacionados com uma borda e legenda. Suporte a modo <code>[toggleable]</code> para recolher o conteúdo.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">FieldsetModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/fieldset'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Fieldset</div>
                            <p class="demo-card-desc">Agrupa campos relacionados com uma borda e legenda. Suporte a modo <code>[toggleable]</code> para recolher o conteúdo.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:20px;gap:12px">
                            <p-fieldset legend="Dados do Responsável" styleClass="w-full">
                                <p style="margin:0;font-size:14px;color:var(--text-color-secondary)">Conteúdo do fieldset: campos de formulário, textos ou qualquer componente.</p>
                            </p-fieldset>
                            <p-fieldset legend="Configurações Avançadas" [toggleable]="true" styleClass="w-full">
                                <p style="margin:0;font-size:14px;color:var(--text-color-secondary)">Clique na legenda para recolher este fieldset.</p>
                            </p-fieldset>
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
export class FieldsetDemo {
    code = `<p-fieldset legend="Título do Grupo">
    <p>Conteúdo do fieldset</p>
</p-fieldset>

<!-- Recolhível -->
<p-fieldset legend="Avançado" [toggleable]="true">
    <p>Pode ser recolhido</p>
</p-fieldset>`;

    props = [
        { name: 'legend',     type: 'string',  default: 'null',  description: 'Texto da legenda.' },
        { name: 'toggleable', type: 'boolean', default: 'false', description: 'Permite recolher/expandir o conteúdo.' },
        { name: 'collapsed',  type: 'boolean', default: 'false', description: 'Define o estado inicial como recolhido.' },
        { name: 'styleClass', type: 'string',  default: 'null',  description: 'Classe CSS adicional.' },
    ];

    themeVars = [
        { variable: '--p-fieldset-background',        description: 'Fundo do fieldset.' },
        { variable: '--p-fieldset-border-color',      description: 'Borda do fieldset.' },
        { variable: '--p-fieldset-border-radius',     description: 'Raio de borda.' },
        { variable: '--p-fieldset-legend-background', description: 'Fundo da legenda.' },
        { variable: '--p-fieldset-legend-color',      description: 'Cor do texto da legenda.' },
        { variable: '--p-fieldset-content-padding',   description: 'Padding do conteúdo.' },
    ];
}
