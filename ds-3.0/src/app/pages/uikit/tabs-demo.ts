import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-tabs-demo',
    standalone: true,
    imports: [CommonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Tabs</h1>
            <p class="comp-desc">Navegação em abas para organizar conteúdo em seções distintas com troca dinâmica.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">TabsModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/tabs'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Tabs</div>
                            <p class="demo-card-desc">Navegação em abas para organizar conteúdo em seções.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:16px;gap:0">
                            <p-tabs value="t1" styleClass="w-full">
                                <p-tablist>
                                    <p-tab value="t1">Resumo</p-tab>
                                    <p-tab value="t2">Detalhes</p-tab>
                                    <p-tab value="t3">Histórico</p-tab>
                                </p-tablist>
                                <p-tabpanels>
                                    <p-tabpanel value="t1"><p style="font-size:14px;margin:16px 0 0;color:var(--text-color-secondary)">Conteúdo da aba Resumo.</p></p-tabpanel>
                                    <p-tabpanel value="t2"><p style="font-size:14px;margin:16px 0 0;color:var(--text-color-secondary)">Conteúdo da aba Detalhes.</p></p-tabpanel>
                                    <p-tabpanel value="t3"><p style="font-size:14px;margin:16px 0 0;color:var(--text-color-secondary)">Conteúdo da aba Histórico.</p></p-tabpanel>
                                </p-tabpanels>
                            </p-tabs>
                        </div>
                        <div class="demo-card-code"><pre>{{ code }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Propriedades (p-tabs)</div>
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
export class TabsDemo {
    code = `<p-tabs value="tab1">
    <p-tablist>
        <p-tab value="tab1">Resumo</p-tab>
        <p-tab value="tab2">Detalhes</p-tab>
    </p-tablist>
    <p-tabpanels>
        <p-tabpanel value="tab1">Conteúdo do Resumo</p-tabpanel>
        <p-tabpanel value="tab2">Conteúdo dos Detalhes</p-tabpanel>
    </p-tabpanels>
</p-tabs>`;

    props = [
        { name: 'value',      type: 'any',     default: 'null',  description: 'Valor da aba ativa.' },
        { name: 'scrollable', type: 'boolean', default: 'false', description: 'Habilita scroll horizontal nas abas.' },
        { name: 'styleClass', type: 'string',  default: 'null',  description: 'Classe CSS adicional.' },
        { name: 'lazy',       type: 'boolean', default: 'false', description: 'Renderiza conteúdo somente ao ativar a aba.' },
    ];

    themeVars = [
        { variable: '--p-tabs-tab-background',              description: 'Fundo da aba inativa.' },
        { variable: '--p-tabs-tab-active-background',       description: 'Fundo da aba ativa.' },
        { variable: '--p-tabs-tab-color',                   description: 'Cor do texto inativo.' },
        { variable: '--p-tabs-tab-active-color',            description: 'Cor do texto ativo.' },
        { variable: '--p-tabs-tab-border-color',            description: 'Borda inferior da aba.' },
        { variable: '--p-tabs-active-bar-background',       description: 'Cor da barra indicadora ativa.' },
        { variable: '--p-tabpanels-background',             description: 'Fundo do painel de conteúdo.' },
    ];
}
