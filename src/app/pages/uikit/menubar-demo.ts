import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-menubar-demo',
    standalone: true,
    imports: [CommonModule, RouterModule, MenubarModule, ButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Menubar</h1>
            <p class="comp-desc">Barra de menu horizontal com suporte a submenus aninhados. Ideal para navegação principal de aplicações.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">MenubarModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/menubar'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Menubar</div>
                            <p class="demo-card-desc">Barra de menu horizontal com submenus aninhados, slots para logo e ações no início/fim.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:16px;gap:0">
                            <p-menubar [model]="menubarItems" styleClass="w-full">
                                <ng-template pTemplate="start">
                                    <span style="font-weight:800;font-size:15px;color:var(--primary-color)">InDS</span>
                                </ng-template>
                                <ng-template pTemplate="end">
                                    <p-button icon="pi pi-user" severity="secondary" text size="small" />
                                </ng-template>
                            </p-menubar>
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
export class MenubarDemo implements OnInit {
    menubarItems: MenuItem[] = [];

    ngOnInit() {
        this.menubarItems = [
            {
                label: 'Sistemas', icon: 'pi pi-th-large',
                items: [
                    { label: 'Protocolo', icon: 'pi pi-file' },
                    { label: 'Financeiro', icon: 'pi pi-money-bill' },
                ]
            },
            { label: 'Relatórios', icon: 'pi pi-chart-bar' },
            { label: 'Cadastros', icon: 'pi pi-list' },
            { label: 'Ajuda', icon: 'pi pi-question-circle' },
        ];
    }

    code = `<p-menubar [model]="items">
    <ng-template pTemplate="start">
        <span class="logo">MyApp</span>
    </ng-template>
    <ng-template pTemplate="end">
        <p-button icon="pi pi-user" text />
    </ng-template>
</p-menubar>

// Dados:
items: MenuItem[] = [
    {
        label: 'Sistemas', icon: 'pi pi-th-large',
        items: [
            { label: 'Protocolo', icon: 'pi pi-file' },
            { label: 'Financeiro', icon: 'pi pi-money-bill' },
        ]
    },
    { label: 'Relatórios', icon: 'pi pi-chart-bar' },
];`;

    props = [
        { name: 'model',      type: 'MenuItem[]', default: 'null',  description: 'Array de itens do menu.' },
        { name: 'start',      type: 'Template',   default: 'null',  description: 'Template para o início da barra (logo).' },
        { name: 'end',        type: 'Template',   default: 'null',  description: 'Template para o fim da barra (ações).' },
        { name: 'styleClass', type: 'string',     default: 'null',  description: 'Classe CSS extra.' },
        { name: 'style',      type: 'object',     default: 'null',  description: 'Estilos inline.' },
        { name: 'breakpoint', type: 'string',     default: '960px', description: 'Largura para colapsar em modo mobile.' },
    ];

    themeVars = [
        { variable: '--p-menubar-background',            description: 'Fundo da barra.' },
        { variable: '--p-menubar-border-color',          description: 'Borda da barra.' },
        { variable: '--p-menubar-item-color',            description: 'Cor do texto dos itens.' },
        { variable: '--p-menubar-item-hover-background', description: 'Fundo do item em hover.' },
        { variable: '--p-menubar-item-focus-background', description: 'Fundo do item em foco.' },
        { variable: '--p-menubar-submenu-background',    description: 'Fundo do submenu.' },
    ];
}
