import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-password-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, PasswordModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        .form-col { display:flex; flex-direction:column; gap:6px; width:100%; max-width:280px; }
        .form-col label { font-size:13px; font-weight:600; color:var(--text-color-secondary); }
        .form-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:20px; padding:20px; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Password</h1>
            <p class="comp-desc">Campo de senha com toggle de visibilidade e medidor de força opcional.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">PasswordModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/password'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Password</div>
                            <p class="demo-card-desc">Campo de senha com toggle de visibilidade e medidor de força opcional.</p>
                        </div>
                        <div class="demo-card-body form-grid">
                            <div class="form-col">
                                <label>Básico</label>
                                <p-password [(ngModel)]="pwd" [feedback]="false" [toggleMask]="true" [fluid]="true" placeholder="Senha" />
                            </div>
                            <div class="form-col">
                                <label>Com medidor de força</label>
                                <p-password [(ngModel)]="pwd2" [feedback]="true" [toggleMask]="true" [fluid]="true" placeholder="Digite sua senha" />
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
export class PasswordDemo {
    pwd = '';
    pwd2 = '';

    code = `<p-password [(ngModel)]="pwd"
    [feedback]="false"
    [toggleMask]="true"
    [fluid]="true"
    placeholder="Senha" />

<!-- Com medidor de força -->
<p-password [(ngModel)]="pwd"
    [feedback]="true"
    [toggleMask]="true"
    [fluid]="true" />`;

    props = [
        { name: 'feedback',      type: 'boolean', default: 'true',  description: 'Exibe medidor de força da senha.' },
        { name: 'toggleMask',    type: 'boolean', default: 'false', description: 'Exibe botão para mostrar/ocultar senha.' },
        { name: 'fluid',         type: 'boolean', default: 'false', description: 'Largura total.' },
        { name: 'placeholder',   type: 'string',  default: 'null',  description: 'Texto placeholder.' },
        { name: 'disabled',      type: 'boolean', default: 'false', description: 'Desabilita o campo.' },
        { name: 'promptLabel',   type: 'string',  default: 'null',  description: 'Texto do prompt do medidor.' },
        { name: 'weakLabel',     type: 'string',  default: 'null',  description: 'Rótulo para senha fraca.' },
        { name: 'mediumLabel',   type: 'string',  default: 'null',  description: 'Rótulo para senha média.' },
        { name: 'strongLabel',   type: 'string',  default: 'null',  description: 'Rótulo para senha forte.' },
    ];

    themeVars = [
        { variable: '--p-password-meter-background',        description: 'Fundo do medidor de força.' },
        { variable: '--p-password-meter-weak-background',   description: 'Cor do nível fraco.' },
        { variable: '--p-password-meter-medium-background', description: 'Cor do nível médio.' },
        { variable: '--p-password-meter-strong-background', description: 'Cor do nível forte.' },
    ];
}
