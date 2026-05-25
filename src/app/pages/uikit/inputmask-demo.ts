import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-inputmask-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, InputMaskModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        .form-col { display:flex; flex-direction:column; gap:6px; width:100%; max-width:280px; }
        .form-col label { font-size:13px; font-weight:600; color:var(--text-color-secondary); }
        .form-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:20px; padding:20px; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">InputMask</h1>
            <p class="comp-desc">Campo com máscara de formatação para CPF, CNPJ, telefone e datas. Use <code>mask</code> com <code>9</code> para dígitos, <code>a</code> para letras.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">InputMaskModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/inputmask'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">InputMask</div>
                            <p class="demo-card-desc">Campo com máscara de formatação. Use <code>9</code> para dígitos, <code>a</code> para letras, <code>*</code> para alfanumérico.</p>
                        </div>
                        <div class="demo-card-body form-grid">
                            <div class="form-col">
                                <label>CPF</label>
                                <p-inputmask [(ngModel)]="maskCpf" mask="999.999.999-99" placeholder="000.000.000-00" [fluid]="true" />
                            </div>
                            <div class="form-col">
                                <label>Telefone</label>
                                <p-inputmask [(ngModel)]="maskPhone" mask="(99) 9 9999-9999" placeholder="(62) 9 0000-0000" [fluid]="true" />
                            </div>
                            <div class="form-col">
                                <label>Data</label>
                                <p-inputmask [(ngModel)]="maskDate" mask="99/99/9999" placeholder="dd/mm/aaaa" [fluid]="true" />
                            </div>
                            <div class="form-col">
                                <label>CNPJ</label>
                                <p-inputmask [(ngModel)]="maskCnpj" mask="99.999.999/9999-99" placeholder="00.000.000/0001-00" [fluid]="true" />
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
export class InputMaskDemo {
    maskCpf = '';
    maskPhone = '';
    maskDate = '';
    maskCnpj = '';

    code = `<!-- CPF -->
<p-inputmask [(ngModel)]="cpf"
    mask="999.999.999-99"
    placeholder="000.000.000-00"
    [fluid]="true" />

<!-- Telefone -->
<p-inputmask [(ngModel)]="tel"
    mask="(99) 9 9999-9999"
    placeholder="(62) 9 0000-0000"
    [fluid]="true" />

<!-- Máscara: 9=dígito  a=letra  *=alfanumérico -->`;

    props = [
        { name: 'mask',        type: 'string',  default: 'null', description: 'Padrão da máscara. 9=dígito, a=letra, *=alfanumérico.' },
        { name: 'placeholder', type: 'string',  default: 'null', description: 'Texto placeholder.' },
        { name: 'slotChar',    type: 'string',  default: '_',    description: 'Caractere usado para slots vazios.' },
        { name: 'autoClear',   type: 'boolean', default: 'true', description: 'Limpa o campo se o valor não bater com a máscara.' },
        { name: 'unmask',      type: 'boolean', default: 'false',description: 'Retorna valor sem formatação.' },
        { name: 'fluid',       type: 'boolean', default: 'false',description: 'Largura total.' },
        { name: 'disabled',    type: 'boolean', default: 'false',description: 'Desabilita o campo.' },
    ];

    themeVars = [
        { variable: '--p-inputtext-background',         description: 'Fundo do campo.' },
        { variable: '--p-inputtext-border-color',       description: 'Cor da borda.' },
        { variable: '--p-inputtext-focus-border-color', description: 'Cor da borda em foco.' },
        { variable: '--p-inputtext-border-radius',      description: 'Raio de borda.' },
    ];
}
