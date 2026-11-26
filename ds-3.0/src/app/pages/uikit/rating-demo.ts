import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-rating-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, RatingModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Rating</h1>
            <p class="comp-desc">Avaliação por estrelas com suporte a diferentes quantidades e modo somente leitura.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">RatingModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/rating'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Rating</div>
                            <p class="demo-card-desc">Avaliação por estrelas. Use <code>[stars]</code> para alterar a quantidade de estrelas.</p>
                        </div>
                        <div class="demo-card-body col" style="gap:16px;padding:20px">
                            <div style="display:flex;align-items:center;gap:12px">
                                <p-rating [(ngModel)]="ratingVal" />
                                <span style="font-size:13px;color:var(--text-color-secondary)">{{ ratingVal }} / 5 estrelas</span>
                            </div>
                            <div style="display:flex;align-items:center;gap:12px">
                                <p-rating [(ngModel)]="ratingVal2" [stars]="10" />
                                <span style="font-size:13px;color:var(--text-color-secondary)">{{ ratingVal2 }}/10</span>
                            </div>
                            <div style="display:flex;align-items:center;gap:12px">
                                <p-rating [(ngModel)]="ratingVal3" [readonly]="true" />
                                <span style="font-size:13px;color:var(--text-color-secondary)">Somente leitura</span>
                            </div>
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
export class RatingDemo {
    ratingVal = 3;
    ratingVal2 = 7;
    ratingVal3 = 4;

    code = `<!-- Padrão (5 estrelas) -->
<p-rating [(ngModel)]="rating" />

<!-- 10 estrelas -->
<p-rating [(ngModel)]="rating"
    [stars]="10" />

<!-- Somente leitura -->
<p-rating [(ngModel)]="rating"
    [readonly]="true" />`;

    props = [
        { name: 'stars',    type: 'number',  default: '5',     description: 'Número de estrelas.' },
        { name: 'readonly', type: 'boolean', default: 'false', description: 'Somente leitura.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o componente.' },
        { name: 'iconOnClass',  type: 'string', default: 'null', description: 'Classe do ícone de estrela preenchida.' },
        { name: 'iconOffClass', type: 'string', default: 'null', description: 'Classe do ícone de estrela vazia.' },
    ];

    themeVars = [
        { variable: '--p-rating-icon-color',        description: 'Cor das estrelas não selecionadas.' },
        { variable: '--p-rating-icon-active-color', description: 'Cor das estrelas selecionadas.' },
        { variable: '--p-rating-icon-size',         description: 'Tamanho dos ícones.' },
        { variable: '--p-rating-gap',               description: 'Espaçamento entre estrelas.' },
    ];
}
