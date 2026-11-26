import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-stepper-demo',
    standalone: true,
    imports: [CommonModule, StepperModule, ButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Stepper</h1>
            <p class="comp-desc">Progresso em etapas para fluxos de onboarding, wizards e formulários multi-passo.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">StepperModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/stepper'</span><span class="tok-pt">;</span>
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
export class StepperDemo {
    code = `<p-stepper value="1">
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
</p-stepper>`;

    props = [
        { name: 'value',      type: 'any',     default: 'null',  description: 'Etapa ativa.' },
        { name: 'linear',     type: 'boolean', default: 'false', description: 'Exige completar cada etapa antes de avançar.' },
        { name: 'styleClass', type: 'string',  default: 'null',  description: 'Classe CSS adicional.' },
    ];

    themeVars = [
        { variable: '--p-stepper-separator-background',       description: 'Cor do separador entre etapas.' },
        { variable: '--p-stepper-step-number-background',     description: 'Fundo do número da etapa.' },
        { variable: '--p-stepper-step-number-color',          description: 'Cor do número.' },
        { variable: '--p-stepper-step-number-active-background', description: 'Fundo da etapa ativa.' },
        { variable: '--p-stepper-step-title-color',           description: 'Cor do título da etapa.' },
    ];
}
