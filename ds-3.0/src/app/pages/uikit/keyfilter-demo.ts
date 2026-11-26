import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-keyfilter-demo',
    standalone: true,
    imports: [CommonModule, KeyFilterModule, InputTextModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        .demo-grid { display:flex; flex-wrap:wrap; gap:24px; padding:20px; }
        .form-col { display:flex; flex-direction:column; gap:6px; }
        .form-col label { font-size:13px; font-weight:600; color:var(--text-color-secondary); }
        .form-col small { color:var(--text-color-secondary); font-size:11px; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">KeyFilter</h1>
            <p class="comp-desc">KeyFilter é uma diretiva que filtra as teclas aceitas por um input, como apenas números, letras, alfanuméricos etc.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">KeyFilterModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/keyfilter'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Filtros predefinidos</div>
                            <p class="demo-card-desc">Use a diretiva <code>pKeyFilter</code> com um preset ou uma RegExp. Tente digitar caracteres inválidos.</p>
                        </div>
                        <div class="demo-card-body demo-grid">
                            <div class="form-col">
                                <label>Apenas inteiros (int)</label>
                                <input pInputText pKeyFilter="int" (input)="v1=$any($event.target).value" [value]="v1" placeholder="Somente inteiros" />
                                <small>Valor: {{ v1 }}</small>
                            </div>
                            <div class="form-col">
                                <label>Apenas números positivos (pnum)</label>
                                <input pInputText pKeyFilter="pnum" (input)="v2=$any($event.target).value" [value]="v2" placeholder="Números com decimal" />
                                <small>Valor: {{ v2 }}</small>
                            </div>
                            <div class="form-col">
                                <label>Apenas letras (alpha)</label>
                                <input pInputText pKeyFilter="alpha" (input)="v3=$any($event.target).value" [value]="v3" placeholder="Somente letras" />
                                <small>Valor: {{ v3 }}</small>
                            </div>
                            <div class="form-col">
                                <label>Alfanumérico (alphanum)</label>
                                <input pInputText pKeyFilter="alphanum" (input)="v4=$any($event.target).value" [value]="v4" placeholder="Letras e números" />
                                <small>Valor: {{ v4 }}</small>
                            </div>
                            <div class="form-col">
                                <label>Monetário (money)</label>
                                <input pInputText pKeyFilter="money" (input)="v5=$any($event.target).value" [value]="v5" placeholder="Ex: 1.234,56" />
                                <small>Valor: {{ v5 }}</small>
                            </div>
                            <div class="form-col">
                                <label>E-mail (email)</label>
                                <input pInputText pKeyFilter="email" (input)="v6=$any($event.target).value" [value]="v6" placeholder="Ex: user@email.com" />
                                <small>Valor: {{ v6 }}</small>
                            </div>
                        </div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">RegExp customizado</div>
                            <p class="demo-card-desc">Passe uma expressão regular para filtro personalizado.</p>
                        </div>
                        <div class="demo-card-body demo-grid">
                            <div class="form-col">
                                <label>Apenas hex 0-9 A-F</label>
                                <input pInputText [pKeyFilter]="hexRegex" (input)="v7=$any($event.target).value" [value]="v7" placeholder="Ex: 1A2B3C" />
                                <small>Valor: {{ v7 }}</small>
                            </div>
                        </div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:20px 0">
                    <p class="api-block-title">Presets disponíveis</p>
                    <p-table [value]="presets" styleClass="p-datatable-sm">
                        <ng-template #header><tr><th>Preset</th><th>Descrição</th></tr></ng-template>
                        <ng-template #body let-r><tr>
                            <td><code>{{r.preset}}</code></td><td>{{r.desc}}</td>
                        </tr></ng-template>
                    </p-table>
                </div></p-tabpanel>
            </p-tabpanels>
        </p-tabs>
    `
})
export class KeyFilterDemo {
    v1 = '';  v2 = '';  v3 = '';  v4 = '';  v5 = '';  v6 = '';  v7 = '';
    hexRegex = /^[0-9a-fA-F]+$/;

    presets = [
        { preset: 'int', desc: 'Números inteiros positivos e negativos' },
        { preset: 'pint', desc: 'Apenas inteiros positivos' },
        { preset: 'num', desc: 'Números com decimais' },
        { preset: 'pnum', desc: 'Números positivos com decimais' },
        { preset: 'money', desc: 'Formato monetário' },
        { preset: 'alpha', desc: 'Apenas letras' },
        { preset: 'alphanum', desc: 'Letras e números' },
        { preset: 'hex', desc: 'Hexadecimal (0-9, a-f, A-F)' },
        { preset: 'email', desc: 'Caracteres válidos para e-mail' },
    ];
}
