import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { TabsModule } from 'primeng/tabs';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { DividerModule } from 'primeng/divider';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-panels-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, CardModule, AccordionModule, TabsModule, PanelModule, ToolbarModule, DividerModule, StepperModule, ButtonModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Painéis</h1>
            <p class="comp-desc">Componentes de agrupamento e layout: Card, Accordion, Tabs, Panel, Toolbar, Divider e Stepper.</p>
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

                    <!-- Card -->
                    <div id="card" class="demo-card">
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
                        <div class="demo-card-code"><pre>{{ code.card }}</pre></div>
                    </div>

                    <!-- Accordion -->
                    <div id="accordion" class="demo-card">
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
                        <div class="demo-card-code"><pre>{{ code.accordion }}</pre></div>
                    </div>

                    <!-- Tabs -->
                    <div id="tabs" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Tabs</div>
                            <p class="demo-card-desc">Navegação em abas para organizar conteúdo em seções.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:16px;gap:0">
                            <p-tabs value="t1" styleClass="w-full">
                                <p-tablist>
                                    <p-tab value="t1">Resumo</p-tab>
                                    <p-tab value="t2">Detalhes</p-tab>
                                    <p-tab value="t3">Histórico</p-tab>
                                </p-tablist>
                                <p-tabpanels>
                                    <p-tabpanel value="t1"><p style="font-size:14px;margin:16px 0 0;color:var(--text-color-secondary)">Conteúdo da aba Resumo.</p></p-tabpanel>
                                    <p-tabpanel value="t2"><p style="font-size:14px;margin:16px 0 0;color:var(--text-color-secondary)">Conteúdo da aba Detalhes.</p></p-tabpanel>
                                    <p-tabpanel value="t3"><p style="font-size:14px;margin:16px 0 0;color:var(--text-color-secondary)">Conteúdo da aba Histórico.</p></p-tabpanel>
                                </p-tabpanels>
                            </p-tabs>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.tabs }}</pre></div>
                    </div>

                    <!-- Panel -->
                    <div id="panel" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Panel</div>
                            <p class="demo-card-desc">Container com header e opção de recolher o conteúdo.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:16px;gap:12px">
                            <p-panel header="Painel Normal" styleClass="w-full">
                                <p style="margin:0;font-size:14px;color:var(--text-color-secondary)">Conteúdo do painel.</p>
                            </p-panel>
                            <p-panel header="Painel Recolhível" [toggleable]="true" styleClass="w-full">
                                <p style="margin:0;font-size:14px;color:var(--text-color-secondary)">Clique no ícone do cabeçalho para recolher este painel.</p>
                            </p-panel>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.panel }}</pre></div>
                    </div>

                    <!-- Toolbar -->
                    <div id="toolbar" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Toolbar</div>
                            <p class="demo-card-desc">Barra de ações com seções esquerda, central e direita.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:16px;gap:0">
                            <p-toolbar styleClass="w-full">
                                <ng-template pTemplate="start">
                                    <p-button label="Novo" icon="pi pi-plus" size="small" />
                                    <p-button label="Editar" icon="pi pi-pencil" severity="secondary" size="small" />
                                    <p-button icon="pi pi-trash" severity="danger" size="small" outlined />
                                </ng-template>
                                <ng-template pTemplate="end">
                                    <p-button icon="pi pi-download" severity="secondary" size="small" outlined />
                                    <p-button icon="pi pi-print" severity="secondary" size="small" text />
                                </ng-template>
                            </p-toolbar>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.toolbar }}</pre></div>
                    </div>

                    <!-- Divider -->
                    <div id="divider" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Divider</div>
                            <p class="demo-card-desc">Separador horizontal ou vertical com conteúdo central opcional.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:20px;gap:0">
                            <p style="font-size:14px;margin:0;color:var(--text-color-secondary)">Seção acima do divisor</p>
                            <p-divider />
                            <p style="font-size:14px;margin:0;color:var(--text-color-secondary)">Seção abaixo do divisor</p>
                            <p-divider align="center"><span style="font-size:12px;color:var(--text-color-secondary);font-weight:600">OU</span></p-divider>
                            <p style="font-size:14px;margin:0;color:var(--text-color-secondary)">Seção após o divisor com label</p>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.divider }}</pre></div>
                    </div>

                    <!-- Stepper -->
                    <div id="stepper" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Stepper</div>
                            <p class="demo-card-desc">Progresso em etapas para fluxos de onboarding ou wizards.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:16px;gap:0">
                            <p-stepper [value]="1" styleClass="w-full">
                                <p-step-list>
                                    <p-step [value]="1">Dados Pessoais</p-step>
                                    <p-step [value]="2">Endereço</p-step>
                                    <p-step [value]="3">Revisão</p-step>
                                </p-step-list>
                                <p-step-panels>
                                    <p-step-panel [value]="1">
                                        <ng-template #content let-activateCallback="activateCallback">
                                            <p style="font-size:14px;color:var(--text-color-secondary);margin:0 0 16px">Preencha seus dados pessoais.</p>
                                            <p-button label="Próximo" (click)="activateCallback(2)" size="small" />
                                        </ng-template>
                                    </p-step-panel>
                                    <p-step-panel [value]="2">
                                        <ng-template #content let-activateCallback="activateCallback">
                                            <p style="font-size:14px;color:var(--text-color-secondary);margin:0 0 16px">Informe seu endereço.</p>
                                            <div style="display:flex;gap:8px">
                                                <p-button label="Anterior" severity="secondary" (click)="activateCallback(1)" size="small" />
                                                <p-button label="Próximo" (click)="activateCallback(3)" size="small" />
                                            </div>
                                        </ng-template>
                                    </p-step-panel>
                                    <p-step-panel [value]="3">
                                        <ng-template #content let-activateCallback="activateCallback">
                                            <p style="font-size:14px;color:var(--text-color-secondary);margin:0 0 16px">Revise e confirme.</p>
                                            <div style="display:flex;gap:8px">
                                                <p-button label="Anterior" severity="secondary" (click)="activateCallback(2)" size="small" />
                                                <p-button label="Concluir" severity="success" size="small" />
                                            </div>
                                        </ng-template>
                                    </p-step-panel>
                                </p-step-panels>
                            </p-stepper>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.stepper }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Card — Propriedades</div>
                    <p-table [value]="propsCard" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header"><tr><th style="width:180px">Nome</th><th style="width:140px">Tipo</th><th style="width:110px">Padrão</th><th>Descrição</th></tr></ng-template>
                        <ng-template pTemplate="body" let-r>
                            <tr><td><strong style="font-family:monospace;font-size:13px">{{ r.name }}</strong></td>
                                <td><span class="badge-type">{{ r.type }}</span></td>
                                <td><span class="badge-default">{{ r.default }}</span></td>
                                <td style="font-size:13px;color:var(--text-color-secondary)">{{ r.description }}</td></tr>
                        </ng-template>
                    </p-table>
                </div></p-tabpanel>

                <p-tabpanel value="theming"><div style="padding:16px 0">
                    <p-table [value]="themeVars" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header"><tr><th style="width:360px">Variável CSS</th><th>Descrição</th></tr></ng-template>
                        <ng-template pTemplate="body" let-v>
                            <tr><td><span class="theme-var">{{ v.variable }}</span></td><td style="font-size:13px;color:var(--text-color-secondary)">{{ v.description }}</td></tr>
                        </ng-template>
                    </p-table>
                </div></p-tabpanel>
            </p-tabpanels>
        </p-tabs>
    `
})
export class PanelsDemo {
    code: any = {
        card: `<p-card header="Título" subheader="Subtítulo">
    <p>Conteúdo do card</p>
    <ng-template pTemplate="footer">
        <p-button label="Ação" />
    </ng-template>
</p-card>`,

        accordion: `<p-accordion [multiple]="true">
    <p-accordion-panel value="0">
        <p-accordion-header>Pergunta 1</p-accordion-header>
        <p-accordion-content>Resposta 1</p-accordion-content>
    </p-accordion-panel>
    <p-accordion-panel value="1">
        <p-accordion-header>Pergunta 2</p-accordion-header>
        <p-accordion-content>Resposta 2</p-accordion-content>
    </p-accordion-panel>
</p-accordion>`,

        tabs: `<p-tabs value="tab1">
    <p-tablist>
        <p-tab value="tab1">Resumo</p-tab>
        <p-tab value="tab2">Detalhes</p-tab>
    </p-tablist>
    <p-tabpanels>
        <p-tabpanel value="tab1">Conteúdo do Resumo</p-tabpanel>
        <p-tabpanel value="tab2">Conteúdo dos Detalhes</p-tabpanel>
    </p-tabpanels>
</p-tabs>`,

        panel: `<p-panel header="Título do Painel">
    <p>Conteúdo do painel</p>
</p-panel>

<!-- Recolhível -->
<p-panel header="Painel" [toggleable]="true">
    <p>Pode ser recolhido</p>
</p-panel>`,

        toolbar: `<p-toolbar>
    <ng-template pTemplate="start">
        <p-button label="Novo" icon="pi pi-plus" />
        <p-button label="Editar" severity="secondary" />
    </ng-template>
    <ng-template pTemplate="end">
        <p-button icon="pi pi-download" outlined />
    </ng-template>
</p-toolbar>`,

        divider: `<p-divider />

<!-- Com label central -->
<p-divider align="center">
    <span>OU</span>
</p-divider>

<!-- Vertical -->
<p-divider layout="vertical" />`,

        stepper: `<p-stepper value="1">
    <p-step-list>
        <p-step value="1">Dados</p-step>
        <p-step value="2">Revisão</p-step>
    </p-step-list>
    <p-step-panels>
        <p-step-panel value="1">
            <ng-template #content let-activateCallback="activateCallback">
                <p-button label="Próximo"
                    (click)="activateCallback('2')" />
            </ng-template>
        </p-step-panel>
    </p-step-panels>
</p-stepper>`,
    };

    propsCard = [
        { name: 'header',    type: 'string', default: 'null', description: 'Título do card.' },
        { name: 'subheader', type: 'string', default: 'null', description: 'Subtítulo abaixo do título.' },
        { name: 'style',     type: 'object', default: 'null', description: 'Estilos inline.' },
    ];

    themeVars = [
        { variable: '--p-card-background',       description: 'Fundo do card.' },
        { variable: '--p-card-border-color',     description: 'Borda do card.' },
        { variable: '--p-card-border-radius',    description: 'Raio de borda.' },
        { variable: '--p-card-shadow',           description: 'Sombra do card.' },
        { variable: '--p-card-body-padding',     description: 'Padding do conteúdo.' },
        { variable: '--p-panel-header-background', description: 'Fundo do cabeçalho do panel.' },
        { variable: '--p-accordion-header-background', description: 'Fundo do cabeçalho do accordion.' },
    ];
}
