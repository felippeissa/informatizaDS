import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-steps-demo',
    standalone: true,
    imports: [CommonModule, RouterModule, StepsModule, ButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Steps</h1>
            <p class="comp-desc">Indicador de progresso em etapas com navegação clicável. Ideal para assistentes e formulários multi-etapa.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">StepsModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/steps'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Steps</div>
                            <p class="demo-card-desc">Indicador de progresso com navegação entre etapas. Clique nos passos ou use os botões para navegar.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:20px;gap:16px">
                            <p-steps [model]="stepItems" [activeIndex]="activeStepIndex" [readonly]="false"
                                     (activeIndexChange)="activeStepIndex=$event" styleClass="w-full" />
                            <div style="display:flex;gap:8px;justify-content:center">
                                <p-button label="Anterior" icon="pi pi-arrow-left" severity="secondary" size="small"
                                          [disabled]="activeStepIndex === 0"
                                          (click)="activeStepIndex = activeStepIndex - 1" />
                                <p-button label="Próximo" icon="pi pi-arrow-right" iconPos="right" size="small"
                                          [disabled]="activeStepIndex === stepItems.length - 1"
                                          (click)="activeStepIndex = activeStepIndex + 1" />
                            </div>
                            <div style="padding:16px;background:var(--surface-ground);border-radius:8px;text-align:center;font-size:13px;color:var(--text-color-secondary)">
                                Etapa atual: <strong style="color:var(--primary-color)">{{ stepItems[activeStepIndex]?.label }}</strong>
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Propriedades</div>
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
export class StepsDemo implements OnInit {
    stepItems: MenuItem[] = [];
    activeStepIndex = 0;

    ngOnInit() {
        this.stepItems = [
            { label: 'Identificação' },
            { label: 'Endereço' },
            { label: 'Confirmação' },
            { label: 'Concluído' },
        ];
    }

    code = `<p-steps [model]="stepItems"
    [activeIndex]="activeIndex"
    [readonly]="false"
    (activeIndexChange)="activeIndex=$event" />

// Dados:
stepItems: MenuItem[] = [
    { label: 'Identificação' },
    { label: 'Endereço' },
    { label: 'Confirmação' },
    { label: 'Concluído' },
];`;

    props = [
        { name: 'model',             type: 'MenuItem[]', default: 'null',  description: 'Array de etapas.' },
        { name: 'activeIndex',       type: 'number',     default: '0',     description: 'Índice da etapa ativa.' },
        { name: 'readonly',          type: 'boolean',    default: 'true',  description: 'Se false, permite clicar para navegar.' },
        { name: 'styleClass',        type: 'string',     default: 'null',  description: 'Classe CSS extra.' },
        { name: 'activeIndexChange', type: 'EventEmitter', default: 'null', description: 'Emite o novo índice ao clicar.' },
    ];

    themeVars = [
        { variable: '--p-steps-item-label-color',          description: 'Cor do label das etapas.' },
        { variable: '--p-steps-item-number-color',         description: 'Cor do número das etapas.' },
        { variable: '--p-steps-item-number-background',    description: 'Fundo do número das etapas.' },
        { variable: '--p-steps-item-active-label-color',   description: 'Cor do label da etapa ativa.' },
        { variable: '--p-steps-item-active-number-color',  description: 'Cor do número da etapa ativa.' },
        { variable: '--p-steps-item-active-number-background', description: 'Fundo do número da etapa ativa.' },
        { variable: '--p-steps-separator-background',      description: 'Cor do separador entre etapas.' },
    ];
}
