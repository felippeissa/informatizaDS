import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-splitbutton-demo',
    standalone: true,
    imports: [CommonModule, SplitButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">SplitButton</h1>
            <p class="comp-desc">Combina um botão principal com um dropdown de ações secundárias.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">SplitButtonModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/splitbutton'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">SplitButton</div>
                            <p class="demo-card-desc">Combina um botão principal com um dropdown de ações secundárias. Clique na seta para ver as opções.</p>
                        </div>
                        <div class="demo-card-body" style="gap:12px;flex-wrap:wrap">
                            <p-splitbutton label="Salvar" icon="pi pi-check" [model]="items" />
                            <p-splitbutton label="Salvar" [model]="items" severity="secondary" />
                            <p-splitbutton label="Salvar" [model]="items" severity="success" />
                            <p-splitbutton label="Salvar" [model]="items" severity="danger" outlined />
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
export class SplitButtonDemo implements OnInit {
    items: MenuItem[] = [];

    ngOnInit() {
        this.items = [
            { label: 'Atualizar', icon: 'pi pi-refresh' },
            { label: 'Duplicar',  icon: 'pi pi-copy' },
            { separator: true },
            { label: 'Excluir',   icon: 'pi pi-times' },
        ];
    }

    code = `<p-splitbutton label="Salvar" icon="pi pi-check" [model]="items" />
<p-splitbutton label="Salvar" [model]="items" severity="secondary" />
<p-splitbutton label="Salvar" [model]="items" severity="danger" outlined />

// Items:
items: MenuItem[] = [
    { label: 'Atualizar', icon: 'pi pi-refresh' },
    { label: 'Duplicar',  icon: 'pi pi-copy' },
    { separator: true },
    { label: 'Excluir',   icon: 'pi pi-times' },
];`;

    props = [
        { name: 'label',    type: 'string',     default: 'null',  description: 'Texto do botão principal.' },
        { name: 'icon',     type: 'string',     default: 'null',  description: 'Ícone do botão principal.' },
        { name: 'model',    type: 'MenuItem[]', default: 'null',  description: 'Itens do dropdown.' },
        { name: 'severity', type: 'string',     default: 'null',  description: 'Variante de cor.' },
        { name: 'outlined', type: 'boolean',    default: 'false', description: 'Estilo outlined.' },
        { name: 'disabled', type: 'boolean',    default: 'false', description: 'Desabilita o componente.' },
        { name: 'loading',  type: 'boolean',    default: 'false', description: 'Exibe spinner de carregamento.' },
    ];

    themeVars = [
        { variable: '--p-splitbutton-default-background',       description: 'Fundo do botão padrão.' },
        { variable: '--p-splitbutton-default-border-color',     description: 'Borda do botão padrão.' },
        { variable: '--p-splitbutton-default-hover-background', description: 'Fundo no hover.' },
    ];
}
