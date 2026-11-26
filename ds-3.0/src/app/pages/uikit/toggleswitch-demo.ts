import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-toggleswitch-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, ToggleSwitchModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">ToggleSwitch</h1>
            <p class="comp-desc">Interruptor on/off para configurações binárias com feedback visual imediato.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">ToggleSwitchModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/toggleswitch'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">ToggleSwitch</div>
                            <p class="demo-card-desc">Interruptor on/off para configurações binárias.</p>
                        </div>
                        <div class="demo-card-body" style="gap:24px">
                            <div style="display:flex;align-items:center;gap:10px">
                                <p-toggleswitch [(ngModel)]="tog1" />
                                <span style="font-size:14px">Notificações {{ tog1 ? 'ativas' : 'inativas' }}</span>
                            </div>
                            <div style="display:flex;align-items:center;gap:10px">
                                <p-toggleswitch [(ngModel)]="tog2" [disabled]="true" />
                                <span style="font-size:14px;color:var(--text-color-secondary)">Desabilitado (ativo)</span>
                            </div>
                            <div style="display:flex;align-items:center;gap:10px">
                                <p-toggleswitch [(ngModel)]="tog3" [disabled]="true" />
                                <span style="font-size:14px;color:var(--text-color-secondary)">Desabilitado (inativo)</span>
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
export class ToggleSwitchDemo {
    tog1 = true;
    tog2 = true;
    tog3 = false;

    code = `<p-toggleswitch [(ngModel)]="ativo" />`;

    props = [
        { name: 'disabled',   type: 'boolean', default: 'false', description: 'Desabilita o toggle.' },
        { name: 'readonly',   type: 'boolean', default: 'false', description: 'Somente leitura.' },
        { name: 'trueValue',  type: 'any',     default: 'true',  description: 'Valor quando ligado.' },
        { name: 'falseValue', type: 'any',     default: 'false', description: 'Valor quando desligado.' },
        { name: 'invalid',    type: 'boolean', default: 'false', description: 'Aplica estilo de erro.' },
    ];

    themeVars = [
        { variable: '--p-toggleswitch-background',         description: 'Fundo quando desligado.' },
        { variable: '--p-toggleswitch-border-color',       description: 'Borda quando desligado.' },
        { variable: '--p-toggleswitch-handle-background',  description: 'Cor da alça.' },
        { variable: '--p-toggleswitch-checked-background', description: 'Fundo quando ligado.' },
        { variable: '--p-toggleswitch-border-radius',      description: 'Raio de borda.' },
    ];
}
