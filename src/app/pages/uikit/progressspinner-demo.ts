import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-progressspinner-demo',
    standalone: true,
    imports: [CommonModule, ProgressSpinnerModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">ProgressSpinner</h1>
            <p class="comp-desc">Indicador circular de carregamento indeterminado para operações assíncronas sem duração conhecida.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">ProgressSpinnerModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/progressspinner'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">ProgressSpinner</div>
                            <p class="demo-card-desc">Indicador circular de carregamento indeterminado para operações assíncronas sem duração conhecida.</p>
                        </div>
                        <div class="demo-card-body" style="gap:24px;align-items:center;flex-wrap:wrap">
                            <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
                                <p-progressspinner />
                                <span style="font-size:11px;color:var(--text-color-secondary)">Padrão</span>
                            </div>
                            <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
                                <p-progressspinner [style]="{'width':'50px','height':'50px'}" strokeWidth="6" />
                                <span style="font-size:11px;color:var(--text-color-secondary)">Stroke 6</span>
                            </div>
                            <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
                                <p-progressspinner [style]="{'width':'40px','height':'40px'}" strokeWidth="4" animationDuration=".5s" />
                                <span style="font-size:11px;color:var(--text-color-secondary)">Rápido</span>
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
export class ProgressSpinnerDemo {
    code = `<!-- Padrão -->
<p-progressspinner />

<!-- Customizado -->
<p-progressspinner
    [style]="{'width':'50px','height':'50px'}"
    strokeWidth="6"
    animationDuration=".5s" />`;

    props = [
        { name: 'strokeWidth',        type: 'string', default: '2',  description: 'Espessura do traço (CSS stroke-width).' },
        { name: 'fill',               type: 'string', default: 'none', description: 'Cor de preenchimento do círculo de fundo.' },
        { name: 'animationDuration',  type: 'string', default: '2s', description: 'Duração da animação de rotação.' },
    ];

    themeVars = [
        { variable: '--p-progressspinner-color-1', description: 'Primeira cor da animação do spinner.' },
        { variable: '--p-progressspinner-color-2', description: 'Segunda cor da animação do spinner.' },
        { variable: '--p-progressspinner-color-3', description: 'Terceira cor da animação do spinner.' },
        { variable: '--p-progressspinner-color-4', description: 'Quarta cor da animação do spinner.' },
    ];
}
