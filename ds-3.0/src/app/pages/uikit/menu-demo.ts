import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-menu-demo',
    standalone: true,
    imports: [CommonModule, RouterModule, MenuModule, ButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Menu</h1>
            <p class="comp-desc">Lista de itens de navegação com suporte a separadores, ícones e modo popup.</p>
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

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Menu</div>
                            <p class="demo-card-desc">Lista de itens de navegação com suporte a separadores e ícones. Use <code>[popup]="true"</code> para modo popup.</p>
                        </div>
                        <div class="demo-card-body" style="align-items:flex-start;gap:20px">
                            <p-menu [model]="menuItems" [style]="{'max-width':'220px'}" />
                            <div>
                                <p style="font-size:13px;margin:0 0 8px;color:var(--text-color-secondary);font-weight:600">Popup (clique):</p>
                                <p-button label="Abrir Menu" icon="pi pi-bars" (click)="popupMenu.toggle($event)" severity="secondary" />
                                <p-menu #popupMenu [model]="menuItems" [popup]="true" />
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">MenuItem — Interface</div>
                    <p-table [value]="propsMenuItem" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:180px">Prop</th><th style="width:140px">Tipo</th><th>Descrição</th></tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-r>
                            <tr>
                                <td><strong style="font-family:monospace;font-size:13px">{{ r.name }}</strong></td>
                                <td><span class="badge-type">{{ r.type }}</span></td>
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
export class MenuDemo implements OnInit {
    menuItems: MenuItem[] = [];

    ngOnInit() {
        this.menuItems = [
            { label: 'Início',        icon: 'pi pi-home' },
            { label: 'Minha Conta',   icon: 'pi pi-user' },
            { separator: true },
            { label: 'Configurações', icon: 'pi pi-cog' },
            { label: 'Sair',          icon: 'pi pi-sign-out' },
        ];
    }

    code = `<p-menu [model]="items" />

<!-- Como popup -->
<p-button label="Menu" (click)="menu.toggle($event)" />
<p-menu #menu [model]="items" [popup]="true" />`;

    propsMenuItem = [
        { name: 'label',      type: 'string',     description: 'Texto do item.' },
        { name: 'icon',       type: 'string',     description: 'Ícone PrimeIcons.' },
        { name: 'routerLink', type: 'any[]',      description: 'Rota Angular para navegação.' },
        { name: 'url',        type: 'string',     description: 'URL externa.' },
        { name: 'command',    type: 'Function',   description: 'Callback ao clicar no item.' },
        { name: 'items',      type: 'MenuItem[]', description: 'Subitems (submenu).' },
        { name: 'separator',  type: 'boolean',    description: 'Se true, renderiza como separador.' },
        { name: 'disabled',   type: 'boolean',    description: 'Desabilita o item.' },
        { name: 'visible',    type: 'boolean',    description: 'Se false, oculta o item.' },
    ];

    themeVars = [
        { variable: '--p-menu-background',            description: 'Fundo do menu.' },
        { variable: '--p-menu-border-color',          description: 'Borda do menu.' },
        { variable: '--p-menu-border-radius',         description: 'Raio de borda.' },
        { variable: '--p-menu-item-hover-background', description: 'Fundo do item no hover.' },
        { variable: '--p-menu-item-color',            description: 'Cor do texto dos itens.' },
        { variable: '--p-menu-item-icon-color',       description: 'Cor dos ícones dos itens.' },
    ];
}
