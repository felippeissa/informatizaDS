import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-panelmenu-demo',
    standalone: true,
    imports: [CommonModule, RouterModule, PanelMenuModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">PanelMenu</h1>
            <p class="comp-desc">Menu vertical com accordion para organizar links em categorias recolhíveis. Ideal para sidebars de navegação.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">PanelMenuModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/panelmenu'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">PanelMenu</div>
                            <p class="demo-card-desc">Menu com categorias expansíveis em formato accordion. Perfeito para menus laterais.</p>
                        </div>
                        <div class="demo-card-body" style="align-items:flex-start;padding:20px">
                            <p-panelmenu [model]="panelMenuItems" styleClass="w-full" style="max-width:280px" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Propriedades</div>
                    <p-table [value]="props" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:180px">Nome</th><th style="width:130px">Tipo</th><th style="width:120px">Padrão</th><th>Descrição</th></tr>
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
export class PanelMenuDemo implements OnInit {
    panelMenuItems: MenuItem[] = [];

    ngOnInit() {
        this.panelMenuItems = [
            {
                label: 'Átomos', icon: 'pi pi-circle',
                items: [
                    { label: 'Buttons', icon: 'pi pi-stop' },
                    { label: 'Input', icon: 'pi pi-pencil' },
                ]
            },
            {
                label: 'Moléculas', icon: 'pi pi-clone',
                items: [
                    { label: 'Painéis', icon: 'pi pi-tablet' },
                    { label: 'Mensagens', icon: 'pi pi-comment' },
                ]
            },
            {
                label: 'Organismos', icon: 'pi pi-box',
                items: [
                    { label: 'DataTable', icon: 'pi pi-table' },
                    { label: 'Navegação', icon: 'pi pi-bars' },
                ]
            },
        ];
    }

    code = `<p-panelmenu [model]="items" />

// Dados:
items: MenuItem[] = [
    {
        label: 'Átomos', icon: 'pi pi-circle',
        items: [
            { label: 'Buttons', icon: 'pi pi-stop' },
            { label: 'Input', icon: 'pi pi-pencil' },
        ]
    },
    {
        label: 'Moléculas', icon: 'pi pi-clone',
        items: [
            { label: 'Painéis', icon: 'pi pi-tablet' },
        ]
    },
];`;

    props = [
        { name: 'model',       type: 'MenuItem[]', default: 'null',  description: 'Array de itens do menu.' },
        { name: 'multiple',    type: 'boolean',    default: 'false', description: 'Permite múltiplos painéis abertos.' },
        { name: 'styleClass',  type: 'string',     default: 'null',  description: 'Classe CSS extra.' },
        { name: 'style',       type: 'object',     default: 'null',  description: 'Estilos inline.' },
        { name: 'expandedKeys', type: 'object',    default: 'null',  description: 'Chaves dos painéis expandidos.' },
    ];

    themeVars = [
        { variable: '--p-panelmenu-panel-background',    description: 'Fundo do painel.' },
        { variable: '--p-panelmenu-panel-border-color',  description: 'Borda do painel.' },
        { variable: '--p-panelmenu-header-color',        description: 'Cor do texto do cabeçalho.' },
        { variable: '--p-panelmenu-header-hover-background', description: 'Fundo do cabeçalho em hover.' },
        { variable: '--p-panelmenu-item-color',          description: 'Cor do texto dos itens.' },
        { variable: '--p-panelmenu-item-hover-background', description: 'Fundo do item em hover.' },
    ];
}
