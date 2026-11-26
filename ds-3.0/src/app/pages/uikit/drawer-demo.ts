import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-drawer-demo',
    standalone: true,
    imports: [CommonModule, DrawerModule, ButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Drawer</h1>
            <p class="comp-desc">Painel lateral que desliza da borda da tela. Ideal para menus, filtros e formulários.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">DrawerModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/drawer'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Drawer</div>
                            <p class="demo-card-desc">Painel lateral que desliza da borda da tela. Ideal para menus, filtros e formulários.</p>
                        </div>
                        <div class="demo-card-body" style="gap:12px">
                            <p-button label="Esquerda" (click)="openDrawer('left')" />
                            <p-button label="Direita"  (click)="openDrawer('right')" severity="secondary" />
                            <p-button label="Topo"     (click)="openDrawer('top')" severity="secondary" outlined />
                            <p-button label="Inferior" (click)="openDrawer('bottom')" severity="secondary" outlined />
                        </div>
                        <div class="demo-card-code"><pre>{{ code }}</pre></div>
                    </div>

                    <p-drawer [(visible)]="drawerVisible" [position]="drawerPos" header="Drawer">
                        <p style="line-height:1.6">Conteúdo do drawer. Posição: <strong>{{ drawerPos }}</strong></p>
                    </p-drawer>

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
export class DrawerDemo {
    drawerVisible = false;
    drawerPos: 'left' | 'right' | 'top' | 'bottom' = 'left';

    openDrawer(pos: 'left' | 'right' | 'top' | 'bottom') {
        this.drawerPos = pos;
        this.drawerVisible = true;
    }

    code = `<p-button label="Abrir" (click)="drawerVisible=true" />

<p-drawer [(visible)]="drawerVisible"
    position="left"
    header="Menu">
    <p>Conteúdo do drawer</p>
</p-drawer>`;

    props = [
        { name: 'visible',   type: 'boolean', default: 'false',  description: 'Controla visibilidade (two-way).' },
        { name: 'position',  type: 'string',  default: 'left',   description: 'Posição: left | right | top | bottom.' },
        { name: 'header',    type: 'string',  default: 'null',   description: 'Texto do cabeçalho.' },
        { name: 'modal',     type: 'boolean', default: 'true',   description: 'Exibe overlay escuro de fundo.' },
        { name: 'fullScreen',type: 'boolean', default: 'false',  description: 'Ocupa a tela inteira.' },
        { name: 'style',     type: 'object',  default: 'null',   description: 'Estilos inline.' },
        { name: 'closeOnEscape', type: 'boolean', default: 'true', description: 'Fecha ao pressionar Escape.' },
    ];

    themeVars = [
        { variable: '--p-drawer-background',      description: 'Fundo do drawer.' },
        { variable: '--p-drawer-border-color',    description: 'Borda do drawer.' },
        { variable: '--p-drawer-header-padding',  description: 'Padding do cabeçalho.' },
        { variable: '--p-drawer-content-padding', description: 'Padding do conteúdo.' },
        { variable: '--p-overlay-mask-background', description: 'Cor do overlay de fundo.' },
    ];
}
