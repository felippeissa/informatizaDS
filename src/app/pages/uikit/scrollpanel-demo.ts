import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-scrollpanel-demo',
    standalone: true,
    imports: [CommonModule, ScrollPanelModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">ScrollPanel</h1>
            <p class="comp-desc">Contêiner com scrollbar customizada para exibir conteúdo em área limitada com design consistente.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">ScrollPanelModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/scrollpanel'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">ScrollPanel</div>
                            <p class="demo-card-desc">Contêiner com scrollbar customizada para exibir conteúdo em área limitada.</p>
                        </div>
                        <div class="demo-card-body" style="padding:20px;align-items:flex-start;gap:20px">
                            <p-scrollpanel [style]="{'width':'280px','height':'200px'}">
                                @for (item of scrollItems; track item) {
                                    <p style="margin:0 0 10px;font-size:14px;color:var(--text-color-secondary);line-height:1.5">{{ item }}</p>
                                }
                            </p-scrollpanel>
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
export class ScrollPanelDemo {
    scrollItems = [
        'Item 1: Secretaria de Fazenda e Planejamento',
        'Item 2: Secretaria de Saúde do Estado de Goiás',
        'Item 3: Secretaria de Educação de Goiás',
        'Item 4: Secretaria de Segurança Pública',
        'Item 5: Secretaria de Meio Ambiente',
        'Item 6: Secretaria de Agricultura',
        'Item 7: Secretaria de Infraestrutura',
        'Item 8: Secretaria de Desenvolvimento Social',
        'Item 9: SEFAZ — Receita Estadual',
        'Item 10: AGE — Auditoria Geral do Estado',
    ];

    code = `<p-scrollpanel [style]="{'width':'300px','height':'200px'}">
    <p>Conteúdo longo que vai além da área visível...</p>
</p-scrollpanel>`;

    props = [
        { name: 'style',      type: 'object', default: 'null', description: 'Estilos inline (width e height obrigatórios).' },
        { name: 'styleClass', type: 'string', default: 'null', description: 'Classe CSS adicional.' },
        { name: 'step',       type: 'number', default: '5',    description: 'Passo de scroll em pixels.' },
    ];

    themeVars = [
        { variable: '--p-scrollpanel-bar-background',  description: 'Cor da scrollbar.' },
        { variable: '--p-scrollpanel-bar-border-radius',description: 'Raio de borda da scrollbar.' },
        { variable: '--p-scrollpanel-bar-size',        description: 'Largura/altura da scrollbar.' },
    ];
}
