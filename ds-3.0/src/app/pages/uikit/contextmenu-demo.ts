import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-contextmenu-demo',
    standalone: true,
    imports: [CommonModule, RouterModule, ContextMenuModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">ContextMenu</h1>
            <p class="comp-desc">Menu ativado pelo clique com o botão direito em uma área ou elemento específico. Exibe ações contextuais relevantes.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">ContextMenuModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/contextmenu'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">ContextMenu</div>
                            <p class="demo-card-desc">Clique com botão direito na área abaixo para ver o menu contextual. Use <code>cm.show($event)</code> no evento <code>contextmenu</code>.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:20px;gap:0">
                            <p-contextmenu #cm [model]="contextMenuItems" />
                            <div (contextmenu)="cm.show($event)"
                                 style="padding:32px 24px;border:2px dashed var(--surface-border);border-radius:10px;text-align:center;cursor:context-menu;background:var(--surface-ground)">
                                <i class="pi pi-mouse" style="font-size:2rem;color:var(--text-color-secondary);display:block;margin-bottom:10px"></i>
                                <p style="margin:0;font-size:13px;color:var(--text-color-secondary)">Clique com o botão direito aqui para ver o menu contextual</p>
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
export class ContextMenuDemo implements OnInit {
    contextMenuItems: MenuItem[] = [];

    ngOnInit() {
        this.contextMenuItems = [
            { label: 'Ver', icon: 'pi pi-eye' },
            { label: 'Copiar', icon: 'pi pi-copy' },
            { separator: true },
            { label: 'Editar', icon: 'pi pi-pencil' },
            { label: 'Excluir', icon: 'pi pi-trash' },
        ];
    }

    code = `<p-contextmenu #cm [model]="items" />

<!-- Área que abre o menu com botão direito -->
<div (contextmenu)="cm.show($event)">
    Clique com o botão direito aqui
</div>

// Dados:
items: MenuItem[] = [
    { label: 'Ver',    icon: 'pi pi-eye' },
    { label: 'Copiar', icon: 'pi pi-copy' },
    { separator: true },
    { label: 'Editar', icon: 'pi pi-pencil' },
    { label: 'Excluir', icon: 'pi pi-trash' },
];`;

    props = [
        { name: 'model',       type: 'MenuItem[]', default: 'null',  description: 'Array de itens do menu.' },
        { name: 'global',      type: 'boolean',    default: 'false', description: 'Ativa em qualquer lugar da página.' },
        { name: 'styleClass',  type: 'string',     default: 'null',  description: 'Classe CSS extra.' },
        { name: 'appendTo',    type: 'any',        default: 'null',  description: 'Elemento ao qual o menu é anexado.' },
    ];

    themeVars = [
        { variable: '--p-contextmenu-background',            description: 'Fundo do menu.' },
        { variable: '--p-contextmenu-border-color',          description: 'Borda do menu.' },
        { variable: '--p-contextmenu-border-radius',         description: 'Raio de borda.' },
        { variable: '--p-contextmenu-item-color',            description: 'Cor do texto dos itens.' },
        { variable: '--p-contextmenu-item-hover-background', description: 'Fundo do item em hover.' },
        { variable: '--p-contextmenu-item-icon-color',       description: 'Cor dos ícones.' },
    ];
}
