import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-card-demo',
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Card</h1>
            <p class="comp-desc">Container com header, conteúdo, subheader e footer opcionais para agrupamento de informações.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">CardModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/card'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Card</div>
                            <p class="demo-card-desc">Container com header, conteúdo, subheader e footer opcionais.</p>
                        </div>
                        <div class="demo-card-body" style="gap:16px;flex-wrap:wrap;align-items:flex-start">
                            <p-card header="Título do Card" subheader="Subtítulo" [style]="{width:'280px'}">
                                <p style="margin:0;font-size:14px;line-height:1.6;color:var(--text-color-secondary)">
                                    Conteúdo principal do card. Adicione qualquer elemento aqui.
                                </p>
                                <ng-template pTemplate="footer">
                                    <p-button label="Ação" size="small" />
                                    <p-button label="Cancelar" size="small" severity="secondary" text />
                                </ng-template>
                            </p-card>
                            <p-card header="Card Simples" [style]="{width:'280px'}">
                                <p style="margin:0;font-size:14px;line-height:1.6;color:var(--text-color-secondary)">
                                    Versão simples sem subheader.
                                </p>
                            </p-card>
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
export class CardDemo {
    code = `<p-card header="Título" subheader="Subtítulo">
    <p>Conteúdo do card</p>
    <ng-template pTemplate="footer">
        <p-button label="Ação" />
    </ng-template>
</p-card>`;

    props = [
        { name: 'header',    type: 'string', default: 'null', description: 'Título do card.' },
        { name: 'subheader', type: 'string', default: 'null', description: 'Subtítulo abaixo do título.' },
        { name: 'style',     type: 'object', default: 'null', description: 'Estilos inline.' },
        { name: 'styleClass',type: 'string', default: 'null', description: 'Classe CSS adicional.' },
    ];

    themeVars = [
        { variable: '--p-card-background',    description: 'Fundo do card.' },
        { variable: '--p-card-border-color',  description: 'Borda do card.' },
        { variable: '--p-card-border-radius', description: 'Raio de borda.' },
        { variable: '--p-card-shadow',        description: 'Sombra do card.' },
        { variable: '--p-card-body-padding',  description: 'Padding do conteúdo.' },
    ];
}
