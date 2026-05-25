import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-badge-demo',
    standalone: true,
    imports: [CommonModule, BadgeModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Badge</h1>
            <p class="comp-desc">Marcador numérico ou de status sobreposto a um elemento. Use a diretiva <code>pBadge</code>.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">BadgeModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/badge'</span><span class="tok-pt">;</span>
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

                    <!-- Standalone -->
                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Standalone</div>
                            <p class="demo-card-desc">Badge independente com diferentes severidades.</p>
                        </div>
                        <div class="demo-card-body" style="gap:16px;align-items:center">
                            <p-badge value="8" />
                            <p-badge value="42" severity="secondary" />
                            <p-badge value="3" severity="success" />
                            <p-badge value="!" severity="warn" />
                            <p-badge value="5" severity="danger" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.standalone }}</pre></div>
                    </div>

                    <!-- Overlay -->
                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Overlay (diretiva pBadge)</div>
                            <p class="demo-card-desc">Use a diretiva <code>pBadge</code> em qualquer elemento com <code>p-overlay-badge</code> para sobrepor um badge.</p>
                        </div>
                        <div class="demo-card-body" style="gap:32px;align-items:center">
                            <span class="pi pi-bell p-overlay-badge" style="font-size:1.5rem" pBadge severity="danger" value="4"></span>
                            <span class="pi pi-inbox p-overlay-badge" style="font-size:1.5rem" pBadge value="99+"></span>
                            <span class="pi pi-cog p-overlay-badge" style="font-size:1.5rem" pBadge severity="success" value="2"></span>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.overlay }}</pre></div>
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
export class BadgeDemo {
    code: any = {
        standalone: `<!-- Badge standalone -->
<p-badge value="8" />
<p-badge value="3" severity="success" />
<p-badge value="!" severity="warn" />
<p-badge value="5" severity="danger" />

<!-- Severidades: null | secondary | success | info | warn | danger | contrast -->`,

        overlay: `<!-- Badge sobre elemento via diretiva pBadge -->
<span class="pi pi-bell p-overlay-badge"
    pBadge severity="danger" value="4">
</span>

<span class="pi pi-inbox p-overlay-badge"
    pBadge value="99+">
</span>`,
    };

    props = [
        { name: 'value',    type: 'string', default: 'null', description: 'Texto/número exibido no badge.' },
        { name: 'severity', type: 'string', default: 'null', description: 'Cor semântica: secondary | success | info | warn | danger | contrast.' },
        { name: 'size',     type: 'string', default: 'null', description: '"large" ou "xlarge".' },
    ];

    themeVars = [
        { variable: '--p-badge-primary-background',   description: 'Fundo do badge primary.' },
        { variable: '--p-badge-primary-color',        description: 'Cor do texto primary.' },
        { variable: '--p-badge-success-background',   description: 'Fundo do badge success.' },
        { variable: '--p-badge-danger-background',    description: 'Fundo do badge danger.' },
        { variable: '--p-badge-warn-background',      description: 'Fundo do badge warn.' },
        { variable: '--p-badge-border-radius',        description: 'Raio de borda.' },
    ];
}
