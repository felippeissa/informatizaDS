import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-inputotp-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, InputOtpModule, ButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        .demo-grid { display:flex; flex-direction:column; gap:24px; padding:20px; }
        .otp-row { display:flex; flex-direction:column; gap:8px; }
        .otp-row label { font-size:13px; font-weight:600; color:var(--text-color-secondary); }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">InputOtp</h1>
            <p class="comp-desc">InputOtp é usado para inserir senhas de uso único (OTP). Suporta máscaras, inteiro/string e tamanho customizável.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">InputOtpModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/inputotp'</span><span class="tok-pt">;</span>
            </div>
        </div>

        <p-tabs value="features" styleClass="mt-1">
            <p-tablist>
                <p-tab value="features">Features</p-tab>
                <p-tab value="api">API</p-tab>
            </p-tablist>
            <p-tabpanels>
                <p-tabpanel value="features"><div style="padding:20px 0">

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Básico</div>
                            <p class="demo-card-desc">Padrão com 4 dígitos.</p>
                        </div>
                        <div class="demo-card-body demo-grid">
                            <div class="otp-row">
                                <label>OTP Básico (4 dígitos)</label>
                                <p-inputotp [(ngModel)]="otp1" />
                                <small style="color:var(--text-color-secondary)">Valor: {{ otp1 }}</small>
                            </div>
                        </div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Tamanho e Máscara</div>
                        </div>
                        <div class="demo-card-body demo-grid">
                            <div class="otp-row">
                                <label>6 Dígitos</label>
                                <p-inputotp [(ngModel)]="otp2" [length]="6" />
                            </div>
                            <div class="otp-row">
                                <label>Com Máscara</label>
                                <p-inputotp [(ngModel)]="otp3" [mask]="true" />
                            </div>
                            <div class="otp-row">
                                <label>Apenas Inteiros</label>
                                <p-inputotp [(ngModel)]="otp4" [integerOnly]="true" />
                            </div>
                        </div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Variantes</div>
                        </div>
                        <div class="demo-card-body demo-grid">
                            <div class="otp-row">
                                <label>Filled</label>
                                <p-inputotp [(ngModel)]="otp5" variant="filled" />
                            </div>
                            <div class="otp-row">
                                <label>Disabled</label>
                                <p-inputotp [(ngModel)]="otp6" [disabled]="true" />
                            </div>
                        </div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:20px 0">
                    <p class="api-block-title">Propriedades</p>
                    <p-table [value]="apiProps" styleClass="p-datatable-sm">
                        <ng-template #header><tr><th>Prop</th><th>Tipo</th><th>Padrão</th><th>Descrição</th></tr></ng-template>
                        <ng-template #body let-r><tr>
                            <td><code>{{r.prop}}</code></td>
                            <td><span class="badge-type">{{r.type}}</span></td>
                            <td><span class="badge-default">{{r.default}}</span></td>
                            <td>{{r.desc}}</td>
                        </tr></ng-template>
                    </p-table>
                </div></p-tabpanel>
            </p-tabpanels>
        </p-tabs>
    `
})
export class InputOtpDemo {
    otp1: any;  otp2: any;  otp3: any;  otp4: any;  otp5: any;  otp6: any = '1234';

    apiProps = [
        { prop: 'length', type: 'number', default: '4', desc: 'Número de dígitos' },
        { prop: 'mask', type: 'boolean', default: 'false', desc: 'Oculta os dígitos (senha)' },
        { prop: 'integerOnly', type: 'boolean', default: 'false', desc: 'Aceita apenas números inteiros' },
        { prop: 'variant', type: 'string', default: 'outlined', desc: 'Variante visual: outlined | filled' },
        { prop: 'disabled', type: 'boolean', default: 'false', desc: 'Desabilita o componente' },
    ];
}
