import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-accordion-demo',
    standalone: true,
    imports: [CommonModule, AccordionModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Accordion</h1>
            <p class="comp-desc">Lista de painéis recolhíveis. Use <code>[multiple]="true"</code> para abrir vários ao mesmo tempo.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">AccordionModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/accordion'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Accordion</div>
                            <p class="demo-card-desc">Lista de painéis recolhíveis. Use <code>[multiple]="true"</code> para abrir vários ao mesmo tempo.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:16px;gap:0">
                            <p-accordion [multiple]="true" styleClass="w-full">
                                <p-accordion-panel value="0">
                                    <p-accordion-header>O que é o Informatiza DS?</p-accordion-header>
                                    <p-accordion-content>
                                        <p style="margin:0;font-size:14px;line-height:1.6;color:var(--text-color-secondary)">
                                            O Informatiza Design System é a biblioteca oficial de componentes do Governo de Goiás, construída com Angular e PrimeNG.
                                        </p>
                                    </p-accordion-content>
                                </p-accordion-panel>
                                <p-accordion-panel value="1">
                                    <p-accordion-header>Como instalar?</p-accordion-header>
                                    <p-accordion-content>
                                        <p style="margin:0;font-size:14px;line-height:1.6;color:var(--text-color-secondary)">
                                            Clone o repositório e execute <code>npm install</code> seguido de <code>ng serve</code>.
                                        </p>
                                    </p-accordion-content>
                                </p-accordion-panel>
                                <p-accordion-panel value="2">
                                    <p-accordion-header>Tem suporte a dark mode?</p-accordion-header>
                                    <p-accordion-content>
                                        <p style="margin:0;font-size:14px;line-height:1.6;color:var(--text-color-secondary)">
                                            Sim! Use o botão de tema na topbar para alternar entre os modos claro e escuro.
                                        </p>
                                    </p-accordion-content>
                                </p-accordion-panel>
                            </p-accordion>
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
export class AccordionDemo {
    code = `<p-accordion [multiple]="true">
    <p-accordion-panel value="0">
        <p-accordion-header>Pergunta 1</p-accordion-header>
        <p-accordion-content>Resposta 1</p-accordion-content>
    </p-accordion-panel>
    <p-accordion-panel value="1">
        <p-accordion-header>Pergunta 2</p-accordion-header>
        <p-accordion-content>Resposta 2</p-accordion-content>
    </p-accordion-panel>
</p-accordion>`;

    props = [
        { name: 'multiple',    type: 'boolean', default: 'false', description: 'Permite múltiplos painéis abertos.' },
        { name: 'value',       type: 'any',     default: 'null',  description: 'Valor do painel ativo.' },
        { name: 'styleClass',  type: 'string',  default: 'null',  description: 'Classe CSS adicional.' },
        { name: 'expandIcon',  type: 'string',  default: 'null',  description: 'Ícone de expansão.' },
        { name: 'collapseIcon',type: 'string',  default: 'null',  description: 'Ícone de colapso.' },
    ];

    themeVars = [
        { variable: '--p-accordion-header-background',        description: 'Fundo do cabeçalho.' },
        { variable: '--p-accordion-header-color',             description: 'Cor do texto do cabeçalho.' },
        { variable: '--p-accordion-header-border-color',      description: 'Borda do cabeçalho.' },
        { variable: '--p-accordion-content-background',       description: 'Fundo do conteúdo.' },
        { variable: '--p-accordion-content-color',            description: 'Cor do texto do conteúdo.' },
        { variable: '--p-accordion-header-hover-background',  description: 'Fundo ao passar o mouse.' },
    ];
}
