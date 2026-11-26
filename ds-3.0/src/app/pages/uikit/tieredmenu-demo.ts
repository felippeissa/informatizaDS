import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-tieredmenu-demo',
    standalone: true,
    imports: [CommonModule, RouterModule, TieredMenuModule, ButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">TieredMenu</h1>
            <p class="comp-desc">Menu com submenus hierárquicos que abrem ao lado. Útil para menus de contexto complexos com múltiplos níveis.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">TieredMenuModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/tieredmenu'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">TieredMenu</div>
                            <p class="demo-card-desc">Menu hierárquico estático e como popup. Use <code>[popup]="true"</code> para o modo popup.</p>
                        </div>
                        <div class="demo-card-body" style="align-items:flex-start;gap:20px">
                            <p-tieredmenu [model]="tieredMenuItems" />
                            <div>
                                <p style="font-size:13px;margin:0 0 8px;color:var(--text-color-secondary);font-weight:600">Popup:</p>
                                <p-button label="Menu Contextual" icon="pi pi-angle-down" iconPos="right"
                                          (click)="tieredPopup.toggle($event)" severity="secondary" />
                                <p-tieredmenu #tieredPopup [model]="tieredMenuItems" [popup]="true" />
                            </div>
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
export class TieredMenuDemo implements OnInit {
    tieredMenuItems: MenuItem[] = [];

    ngOnInit() {
        this.tieredMenuItems = [
            {
                label: 'Arquivo', icon: 'pi pi-file',
                items: [
                    { label: 'Novo', icon: 'pi pi-plus' },
                    { label: 'Abrir', icon: 'pi pi-folder-open' },
                    { separator: true },
                    {
                        label: 'Exportar', icon: 'pi pi-download',
                        items: [
                            { label: 'PDF', icon: 'pi pi-file-pdf' },
                            { label: 'Excel', icon: 'pi pi-file-excel' },
                        ]
                    }
                ]
            },
            {
                label: 'Editar', icon: 'pi pi-pencil',
                items: [
                    { label: 'Copiar', icon: 'pi pi-copy' },
                    { label: 'Colar', icon: 'pi pi-clipboard' },
                ]
            },
        ];
    }

    code = `<p-tieredmenu [model]="items" />

<!-- Como popup -->
<p-button label="Ações" (click)="tm.toggle($event)" />
<p-tieredmenu #tm [model]="items" [popup]="true" />

// Dados:
items: MenuItem[] = [
    {
        label: 'Arquivo', icon: 'pi pi-file',
        items: [
            { label: 'Novo', icon: 'pi pi-plus' },
            { separator: true },
            {
                label: 'Exportar', icon: 'pi pi-download',
                items: [
                    { label: 'PDF', icon: 'pi pi-file-pdf' },
                ]
            }
        ]
    },
];`;

    props = [
        { name: 'model',      type: 'MenuItem[]', default: 'null',  description: 'Array de itens do menu.' },
        { name: 'popup',      type: 'boolean',    default: 'false', description: 'Modo popup (oculto por padrão).' },
        { name: 'styleClass', type: 'string',     default: 'null',  description: 'Classe CSS extra.' },
        { name: 'style',      type: 'object',     default: 'null',  description: 'Estilos inline.' },
        { name: 'appendTo',   type: 'any',        default: 'null',  description: 'Elemento ao qual o popup é anexado.' },
    ];

    themeVars = [
        { variable: '--p-tieredmenu-background',            description: 'Fundo do menu.' },
        { variable: '--p-tieredmenu-border-color',          description: 'Borda do menu.' },
        { variable: '--p-tieredmenu-item-color',            description: 'Cor do texto dos itens.' },
        { variable: '--p-tieredmenu-item-hover-background', description: 'Fundo do item em hover.' },
        { variable: '--p-tieredmenu-submenu-background',    description: 'Fundo do submenu.' },
    ];
}
