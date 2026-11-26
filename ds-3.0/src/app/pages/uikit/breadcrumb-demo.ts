import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-breadcrumb-demo',
    standalone: true,
    imports: [CommonModule, RouterModule, BreadcrumbModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Breadcrumb</h1>
            <p class="comp-desc">Trilha de navegação hierárquica mostrando o caminho até a página atual. Melhora a orientação do usuário em estruturas profundas.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">BreadcrumbModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/breadcrumb'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Breadcrumb</div>
                            <p class="demo-card-desc">Trilha de navegação com ícone de início e separadores automáticos entre os itens.</p>
                        </div>
                        <div class="demo-card-body col" style="gap:12px;padding:20px">
                            <p-breadcrumb [model]="breadcrumbItems" [home]="breadcrumbHome" styleClass="w-full" />
                            <p-breadcrumb [model]="breadcrumbDeep" [home]="breadcrumbHome" styleClass="w-full" />
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
export class BreadcrumbDemo implements OnInit {
    breadcrumbHome: MenuItem = {};
    breadcrumbItems: MenuItem[] = [];
    breadcrumbDeep: MenuItem[] = [];

    ngOnInit() {
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
    }

    code = `<p-breadcrumb
    [model]="items"
    [home]="{ icon: 'pi pi-home', routerLink: '/' }" />

// Dados:
items: MenuItem[] = [
    { label: 'Componentes' },
    { label: 'Navegação' },
];`;

    props = [
        { name: 'model',      type: 'MenuItem[]', default: 'null', description: 'Array de itens da trilha.' },
        { name: 'home',       type: 'MenuItem',   default: 'null', description: 'Item do início (ícone de casa).' },
        { name: 'styleClass', type: 'string',     default: 'null', description: 'Classe CSS extra.' },
        { name: 'style',      type: 'object',     default: 'null', description: 'Estilos inline.' },
    ];

    themeVars = [
        { variable: '--p-breadcrumb-background',   description: 'Fundo do breadcrumb.' },
        { variable: '--p-breadcrumb-border-color', description: 'Borda do breadcrumb.' },
        { variable: '--p-breadcrumb-item-color',   description: 'Cor dos itens.' },
        { variable: '--p-breadcrumb-item-hover-color', description: 'Cor dos itens em hover.' },
        { variable: '--p-breadcrumb-last-item-color', description: 'Cor do último item (página atual).' },
        { variable: '--p-breadcrumb-separator-color', description: 'Cor do separador entre itens.' },
    ];
}
