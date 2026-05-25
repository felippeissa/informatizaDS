import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-skeleton-demo',
    standalone: true,
    imports: [CommonModule, SkeletonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Skeleton</h1>
            <p class="comp-desc">Placeholder animado para indicar carregamento de conteúdo, preservando o layout.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">SkeletonModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/skeleton'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Skeleton</div>
                            <p class="demo-card-desc">Placeholder animado para indicar carregamento de conteúdo, preservando o layout da interface.</p>
                        </div>
                        <div class="demo-card-body col" style="gap:12px;padding:20px">
                            <div style="display:flex;align-items:center;gap:12px;width:100%">
                                <p-skeleton shape="circle" size="48px" />
                                <div style="flex:1;display:flex;flex-direction:column;gap:6px">
                                    <p-skeleton width="60%" height="14px" />
                                    <p-skeleton width="40%" height="12px" />
                                </div>
                            </div>
                            <p-skeleton width="100%" height="14px" />
                            <p-skeleton width="80%" height="14px" />
                            <p-skeleton width="90%" height="14px" />
                            <p-skeleton width="100%" height="160px" borderRadius="8px" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code }}</pre></div>
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
export class SkeletonDemo {
    code = `<!-- Linha de texto -->
<p-skeleton width="100%" height="14px" />

<!-- Avatar circular -->
<p-skeleton shape="circle" size="48px" />

<!-- Card completo -->
<p-skeleton width="100%" height="160px" borderRadius="8px" />`;

    props = [
        { name: 'shape',        type: 'string', default: 'rectangle', description: '"rectangle" ou "circle".' },
        { name: 'size',         type: 'string', default: 'null',       description: 'Tamanho (para circles) ex: "48px".' },
        { name: 'width',        type: 'string', default: '100%',       description: 'Largura ex: "100%", "200px".' },
        { name: 'height',       type: 'string', default: '1rem',       description: 'Altura ex: "14px", "2rem".' },
        { name: 'borderRadius', type: 'string', default: 'null',       description: 'Raio de borda personalizado.' },
        { name: 'animation',    type: 'string', default: 'wave',       description: '"wave" ou "none".' },
    ];

    themeVars = [
        { variable: '--p-skeleton-background',          description: 'Cor de fundo do skeleton.' },
        { variable: '--p-skeleton-animation-background', description: 'Cor da onda de animação.' },
        { variable: '--p-skeleton-border-radius',        description: 'Raio de borda padrão.' },
    ];
}
