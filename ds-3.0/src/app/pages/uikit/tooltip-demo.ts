import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-tooltip-demo',
    standalone: true,
    imports: [CommonModule, TooltipModule, ButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Tooltip</h1>
            <p class="comp-desc">Dica de texto que aparece ao passar o mouse. Use a diretiva <code>pTooltip</code> em qualquer elemento.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">TooltipModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/tooltip'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Tooltip</div>
                            <p class="demo-card-desc">Dica de texto que aparece ao passar o mouse. Use a diretiva <code>pTooltip</code> em qualquer elemento.</p>
                        </div>
                        <div class="demo-card-body" style="gap:12px;flex-wrap:wrap">
                            <p-button label="Topo"     pTooltip="Tooltip acima"     tooltipPosition="top" />
                            <p-button label="Direita"  severity="secondary" pTooltip="Tooltip à direita"  tooltipPosition="right" />
                            <p-button label="Inferior" severity="secondary" pTooltip="Tooltip abaixo"     tooltipPosition="bottom" />
                            <p-button label="Esquerda" severity="secondary" outlined pTooltip="Tooltip à esquerda" tooltipPosition="left" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Propriedades (diretiva pTooltip)</div>
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
export class TooltipDemo {
    code = `<!-- Diretiva pTooltip em qualquer elemento -->
<p-button label="Salvar"
    pTooltip="Clique para salvar as alterações"
    tooltipPosition="top" />

<input pInputText pTooltip="Campo obrigatório" />`;

    props = [
        { name: 'pTooltip',         type: 'string',  default: 'null',    description: 'Texto do tooltip.' },
        { name: 'tooltipPosition',  type: 'string',  default: 'right',   description: 'Posição: top | right | bottom | left.' },
        { name: 'tooltipEvent',     type: 'string',  default: 'hover',   description: 'Evento ativador: hover | focus.' },
        { name: 'tooltipStyleClass',type: 'string',  default: 'null',    description: 'Classe CSS adicional.' },
        { name: 'hideDelay',        type: 'number',  default: '0',       description: 'Atraso para esconder (ms).' },
        { name: 'showDelay',        type: 'number',  default: '0',       description: 'Atraso para exibir (ms).' },
        { name: 'escape',           type: 'boolean', default: 'true',    description: 'Escapa HTML no texto.' },
        { name: 'disabled',         type: 'boolean', default: 'false',   description: 'Desativa o tooltip.' },
    ];

    themeVars = [
        { variable: '--p-tooltip-background',   description: 'Fundo do tooltip.' },
        { variable: '--p-tooltip-color',        description: 'Cor do texto.' },
        { variable: '--p-tooltip-border-radius',description: 'Raio de borda.' },
        { variable: '--p-tooltip-padding',      description: 'Padding interno.' },
        { variable: '--p-tooltip-shadow',       description: 'Sombra do tooltip.' },
    ];
}
