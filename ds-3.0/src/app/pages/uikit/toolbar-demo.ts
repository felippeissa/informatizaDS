import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-toolbar-demo',
    standalone: true,
    imports: [CommonModule, ToolbarModule, ButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Toolbar</h1>
            <p class="comp-desc">Barra de ações com seções esquerda, central e direita para organizar botões e controles.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">ToolbarModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/toolbar'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Toolbar</div>
                            <p class="demo-card-desc">Barra de ações com seções esquerda, central e direita.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:16px;gap:0">
                            <p-toolbar styleClass="w-full">
                                <ng-template pTemplate="start">
                                    <p-button label="Novo"   icon="pi pi-plus"    size="small" />
                                    <p-button label="Editar" icon="pi pi-pencil"  severity="secondary" size="small" />
                                    <p-button icon="pi pi-trash" severity="danger" size="small" outlined />
                                </ng-template>
                                <ng-template pTemplate="end">
                                    <p-button icon="pi pi-download" severity="secondary" size="small" outlined />
                                    <p-button icon="pi pi-print"    severity="secondary" size="small" text />
                                </ng-template>
                            </p-toolbar>
                        </div>
                        <div class="demo-card-code"><pre>{{ code }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Templates</div>
                    <p-table [value]="props" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:160px">Nome</th><th style="width:130px">Tipo</th><th>Descrição</th></tr>
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
export class ToolbarDemo {
    code = `<p-toolbar>
    <ng-template pTemplate="start">
        <p-button label="Novo" icon="pi pi-plus" />
        <p-button label="Editar" severity="secondary" />
    </ng-template>
    <ng-template pTemplate="end">
        <p-button icon="pi pi-download" outlined />
    </ng-template>
</p-toolbar>`;

    props = [
        { name: 'start',  type: 'template', description: 'Conteúdo da seção esquerda.' },
        { name: 'center', type: 'template', description: 'Conteúdo da seção central.' },
        { name: 'end',    type: 'template', description: 'Conteúdo da seção direita.' },
    ];

    themeVars = [
        { variable: '--p-toolbar-background',   description: 'Fundo da toolbar.' },
        { variable: '--p-toolbar-border-color', description: 'Borda da toolbar.' },
        { variable: '--p-toolbar-border-radius',description: 'Raio de borda.' },
        { variable: '--p-toolbar-padding',      description: 'Padding interno.' },
        { variable: '--p-toolbar-gap',          description: 'Espaçamento entre itens.' },
    ];
}
