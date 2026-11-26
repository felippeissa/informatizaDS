import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-tag-demo',
    standalone: true,
    imports: [CommonModule, TagModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Tag</h1>
            <p class="comp-desc">Rótulo compacto para categorizar ou indicar status de um item.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">TagModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/tag'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Severidades</div>
                            <p class="demo-card-desc">Variações semânticas e com ícones para categorizar ou indicar status.</p>
                        </div>
                        <div class="demo-card-body" style="gap:10px;align-items:center;flex-wrap:wrap">
                            <p-tag value="Novo" />
                            <p-tag value="Em andamento" severity="info" />
                            <p-tag value="Concluído" severity="success" />
                            <p-tag value="Atenção" severity="warn" />
                            <p-tag value="Cancelado" severity="danger" />
                            <p-tag value="Arquivado" severity="secondary" />
                            <p-tag value="Novo" icon="pi pi-sparkles" rounded />
                            <p-tag value="Destaque" severity="success" icon="pi pi-check" rounded />
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
export class TagDemo {
    code = `<p-tag value="Novo" />
<p-tag value="Concluído" severity="success" />
<p-tag value="Atenção"   severity="warn" />
<p-tag value="Cancelado" severity="danger" />
<p-tag value="Novo" icon="pi pi-sparkles" rounded />

<!-- Severidades: null | success | info | warn | danger | secondary -->`;

    props = [
        { name: 'value',    type: 'string',  default: 'null',  description: 'Texto exibido na tag.' },
        { name: 'severity', type: 'string',  default: 'null',  description: 'Cor semântica: success | info | warn | danger | secondary.' },
        { name: 'icon',     type: 'string',  default: 'null',  description: 'Ícone PrimeIcons.' },
        { name: 'rounded',  type: 'boolean', default: 'false', description: 'Cantos totalmente arredondados.' },
    ];

    themeVars = [
        { variable: '--p-tag-primary-background',   description: 'Fundo da tag primary.' },
        { variable: '--p-tag-primary-color',        description: 'Cor do texto primary.' },
        { variable: '--p-tag-success-background',   description: 'Fundo da tag success.' },
        { variable: '--p-tag-warn-background',      description: 'Fundo da tag warn.' },
        { variable: '--p-tag-danger-background',    description: 'Fundo da tag danger.' },
        { variable: '--p-tag-border-radius',        description: 'Raio de borda da tag.' },
    ];
}
