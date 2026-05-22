import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-menu-demo',
    standalone: true,
    imports: [CommonModule, RouterModule, MenuModule, MenubarModule, BreadcrumbModule, PanelMenuModule, TieredMenuModule, ButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Navegação</h1>
            <p class="comp-desc">Componentes de navegação: Menu, Menubar, Breadcrumb, PanelMenu e TieredMenu.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">MenuModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/menu'</span><span class="tok-pt">;</span>
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

                    <!-- Menu -->
                    <div id="menu" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Menu</div>
                            <p class="demo-card-desc">Lista de itens de navegação com suporte a separadores e ícones.</p>
                        </div>
                        <div class="demo-card-body" style="align-items:flex-start;gap:20px">
                            <p-menu [model]="menuItems" styleClass="w-full" [style]="{'max-width':'220px'}" />
                            <div>
                                <p style="font-size:13px;margin:0 0 8px;color:var(--text-color-secondary);font-weight:600">Popup (clique):</p>
                                <p-button label="Abrir Menu" icon="pi pi-bars" (click)="popupMenu.toggle($event)" severity="secondary" />
                                <p-menu #popupMenu [model]="menuItems" [popup]="true" />
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.menu }}</pre></div>
                    </div>

                    <!-- Menubar -->
                    <div id="menubar" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Menubar</div>
                            <p class="demo-card-desc">Barra de menu horizontal com suporte a submenus aninhados.</p>
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
                        <div class="demo-card-code"><pre>{{ code.menubar }}</pre></div>
                    </div>

                    <!-- Breadcrumb -->
                    <div id="breadcrumb" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Breadcrumb</div>
                            <p class="demo-card-desc">Trilha de navegação hierárquica mostrando o caminho até a página atual.</p>
                        </div>
                        <div class="demo-card-body col" style="gap:12px;padding:20px">
                            <p-breadcrumb [model]="breadcrumbItems" [home]="breadcrumbHome" styleClass="w-full" />
                            <p-breadcrumb [model]="breadcrumbDeep" [home]="breadcrumbHome" styleClass="w-full" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.breadcrumb }}</pre></div>
                    </div>

                    <!-- PanelMenu -->
                    <div id="panelmenu" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">PanelMenu</div>
                            <p class="demo-card-desc">Menu vertical com accordion para organizar links em categorias recolhíveis. Ideal para sidebars.</p>
                        </div>
                        <div class="demo-card-body" style="align-items:flex-start">
                            <p-panelmenu [model]="panelMenuItems" styleClass="w-full" style="max-width:280px" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.panelmenu }}</pre></div>
                    </div>

                    <!-- TieredMenu -->
                    <div id="tieredmenu" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">TieredMenu</div>
                            <p class="demo-card-desc">Menu com submenus hierárquicos que abrem ao lado. Útil para menus de contexto complexos.</p>
                        </div>
                        <div class="demo-card-body" style="align-items:flex-start;gap:20px">
                            <p-tieredmenu [model]="tieredMenuItems" />
                            <div>
                                <p style="font-size:13px;margin:0 0 8px;color:var(--text-color-secondary);font-weight:600">Popup:</p>
                                <p-button label="Menu Contextual" icon="pi pi-angle-down" iconPos="right" (click)="tieredPopup.toggle($event)" severity="secondary" />
                                <p-tieredmenu #tieredPopup [model]="tieredMenuItems" [popup]="true" />
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.tieredmenu }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">MenuItem — Interface</div>
                    <p-table [value]="propsMenuItem" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header"><tr><th style="width:180px">Prop</th><th style="width:140px">Tipo</th><th>Descrição</th></tr></ng-template>
                        <ng-template pTemplate="body" let-r>
                            <tr><td><strong style="font-family:monospace;font-size:13px">{{ r.name }}</strong></td>
                                <td><span class="badge-type">{{ r.type }}</span></td>
                                <td style="font-size:13px;color:var(--text-color-secondary)">{{ r.description }}</td></tr>
                        </ng-template>
                    </p-table>
                </div></p-tabpanel>

                <p-tabpanel value="theming"><div style="padding:16px 0">
                    <p-table [value]="themeVars" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header"><tr><th style="width:360px">Variável CSS</th><th>Descrição</th></tr></ng-template>
                        <ng-template pTemplate="body" let-v>
                            <tr><td><span class="theme-var">{{ v.variable }}</span></td><td style="font-size:13px;color:var(--text-color-secondary)">{{ v.description }}</td></tr>
                        </ng-template>
                    </p-table>
                </div></p-tabpanel>
            </p-tabpanels>
        </p-tabs>
    `
})
export class MenuDemo implements OnInit {
    menuItems: MenuItem[] = [];
    menubarItems: MenuItem[] = [];
    breadcrumbItems: MenuItem[] = [];
    breadcrumbDeep: MenuItem[] = [];
    breadcrumbHome: MenuItem = {};
    panelMenuItems: MenuItem[] = [];
    tieredMenuItems: MenuItem[] = [];

    ngOnInit() {
        this.menuItems = [
            { label: 'Início', icon: 'pi pi-home' },
            { label: 'Minha Conta', icon: 'pi pi-user' },
            { separator: true },
            { label: 'Configurações', icon: 'pi pi-cog' },
            { label: 'Sair', icon: 'pi pi-sign-out' },
        ];

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

        this.breadcrumbHome = { icon: 'pi pi-home', routerLink: '/ds' };
        this.breadcrumbItems = [
            { label: 'Componentes' },
            { label: 'Navegação' },
        ];
        this.breadcrumbDeep = [
            { label: 'Sistemas' },
            { label: 'Financeiro' },
            { label: 'Lançamentos' },
            { label: 'Novo Lançamento' },
        ];

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

        this.tieredMenuItems = [
            { label: 'Arquivo', icon: 'pi pi-file',
              items: [
                { label: 'Novo', icon: 'pi pi-plus' },
                { label: 'Abrir', icon: 'pi pi-folder-open' },
                { separator: true },
                { label: 'Exportar', icon: 'pi pi-download',
                  items: [
                    { label: 'PDF', icon: 'pi pi-file-pdf' },
                    { label: 'Excel', icon: 'pi pi-file-excel' },
                  ]
                }
              ]
            },
            { label: 'Editar', icon: 'pi pi-pencil',
              items: [
                { label: 'Copiar', icon: 'pi pi-copy' },
                { label: 'Colar', icon: 'pi pi-clipboard' },
              ]
            },
        ];
    }

    code: any = {
        menu: `<p-menu [model]="items" />

<!-- Como popup -->
<p-button label="Menu" (click)="menu.toggle($event)" />
<p-menu #menu [model]="items" [popup]="true" />`,

        menubar: `<p-menubar [model]="items">
    <ng-template pTemplate="start">
        <span class="logo">MyApp</span>
    </ng-template>
    <ng-template pTemplate="end">
        <p-button icon="pi pi-user" text />
    </ng-template>
</p-menubar>`,

        breadcrumb: `<p-breadcrumb
    [model]="items"
    [home]="{ icon: 'pi pi-home', routerLink: '/' }" />`,

        panelmenu: `<p-panelmenu [model]="items" />`,

        tieredmenu: `<p-tieredmenu [model]="items" />

<!-- Como popup -->
<p-button label="Ações" (click)="tm.toggle($event)" />
<p-tieredmenu #tm [model]="items" [popup]="true" />`,
    };

    propsMenuItem = [
        { name: 'label',       type: 'string',   description: 'Texto do item.' },
        { name: 'icon',        type: 'string',   description: 'Ícone PrimeIcons.' },
        { name: 'routerLink',  type: 'any[]',    description: 'Rota Angular para navegação.' },
        { name: 'url',         type: 'string',   description: 'URL externa.' },
        { name: 'command',     type: 'Function', description: 'Callback ao clicar no item.' },
        { name: 'items',       type: 'MenuItem[]', description: 'Subitems (submenu).' },
        { name: 'separator',   type: 'boolean',  description: 'Se true, renderiza como separador.' },
        { name: 'disabled',    type: 'boolean',  description: 'Desabilita o item.' },
        { name: 'visible',     type: 'boolean',  description: 'Se false, oculta o item.' },
        { name: 'badge',       type: 'string',   description: 'Valor do badge no item.' },
        { name: 'badgeClass',  type: 'string',   description: 'Classe CSS extra do badge.' },
        { name: 'fragment',    type: 'string',   description: 'Fragment da URL para âncoras.' },
    ];

    themeVars = [
        { variable: '--p-menu-background',              description: 'Fundo do menu.' },
        { variable: '--p-menu-border-color',            description: 'Borda do menu.' },
        { variable: '--p-menu-item-hover-background',   description: 'Fundo do item no hover.' },
        { variable: '--p-menu-item-focus-background',   description: 'Fundo do item em foco.' },
        { variable: '--p-menu-item-color',              description: 'Cor do texto dos itens.' },
        { variable: '--p-menu-item-icon-color',         description: 'Cor dos ícones dos itens.' },
        { variable: '--p-menubar-background',           description: 'Fundo da menubar.' },
        { variable: '--p-breadcrumb-background',        description: 'Fundo do breadcrumb.' },
    ];
}
