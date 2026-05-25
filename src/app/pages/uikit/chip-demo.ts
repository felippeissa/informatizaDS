import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-chip-demo',
    standalone: true,
    imports: [CommonModule, ChipModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Chip</h1>
            <p class="comp-desc">Elemento compacto para representar filtros, seleções ou informações com ação de remoção.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">ChipModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/chip'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Chip</div>
                            <p class="demo-card-desc">Elemento compacto para representar filtros, seleções ou informações. Adicione <code>[removable]="true"</code> para exibir o botão de remoção.</p>
                        </div>
                        <div class="demo-card-body" style="gap:10px;align-items:center;flex-wrap:wrap">
                            <p-chip label="Angular" />
                            <p-chip label="React" icon="pi pi-bolt" />
                            <p-chip label="Vue" [removable]="true" />
                            <p-chip label="Goiás" icon="pi pi-map-marker" [removable]="true" />
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
export class ChipDemo {
    code = `<p-chip label="Angular" />
<p-chip label="React" icon="pi pi-bolt" />
<p-chip label="Vue" [removable]="true" />
<p-chip label="Goiás" icon="pi pi-map-marker" [removable]="true" />`;

    props = [
        { name: 'label',     type: 'string',  default: 'null',  description: 'Texto exibido no chip.' },
        { name: 'icon',      type: 'string',  default: 'null',  description: 'Ícone PrimeIcons.' },
        { name: 'image',     type: 'string',  default: 'null',  description: 'URL de imagem no chip.' },
        { name: 'removable', type: 'boolean', default: 'false', description: 'Exibe botão de remoção.' },
        { name: 'alt',       type: 'string',  default: 'chip',  description: 'Alt text da imagem.' },
    ];

    themeVars = [
        { variable: '--p-chip-background',       description: 'Fundo do chip.' },
        { variable: '--p-chip-color',            description: 'Cor do texto.' },
        { variable: '--p-chip-border-radius',    description: 'Raio de borda.' },
        { variable: '--p-chip-remove-icon-color', description: 'Cor do ícone de remoção.' },
    ];
}
