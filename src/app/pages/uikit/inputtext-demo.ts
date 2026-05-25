import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-inputtext-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, InputTextModule, FloatLabelModule, IconFieldModule, InputIconModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        .form-col { display:flex; flex-direction:column; gap:6px; width:100%; max-width:280px; }
        .form-col label { font-size:13px; font-weight:600; color:var(--text-color-secondary); }
        .form-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:20px; padding:20px; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">InputText</h1>
            <p class="comp-desc">Campo de texto simples. Use <code>pInputText</code> em inputs nativos ou com Float Label e ícones.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">InputTextModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/inputtext'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">InputText</div>
                            <p class="demo-card-desc">Campo de texto simples com suporte a Float Label e ícones.</p>
                        </div>
                        <div class="demo-card-body form-grid">
                            <div class="form-col">
                                <label>Básico</label>
                                <input pInputText type="text" placeholder="Digite algo" [(ngModel)]="txt" />
                            </div>
                            <div class="form-col">
                                <label>Desabilitado</label>
                                <input pInputText type="text" value="Valor fixo" [disabled]="true" />
                            </div>
                            <div class="form-col">
                                <label>Com ícone</label>
                                <p-iconfield>
                                    <p-inputicon class="pi pi-search" />
                                    <input pInputText type="text" placeholder="Buscar..." />
                                </p-iconfield>
                            </div>
                            <div class="form-col">
                                <p-floatlabel>
                                    <input pInputText id="fl" type="text" [(ngModel)]="txt2" />
                                    <label for="fl">Float Label</label>
                                </p-floatlabel>
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Propriedades (diretiva pInputText)</div>
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
export class InputTextDemo {
    txt = '';
    txt2 = '';

    code = `<!-- Básico -->
<input pInputText type="text" placeholder="Digite algo" [(ngModel)]="txt" />

<!-- Com ícone -->
<p-iconfield>
    <p-inputicon class="pi pi-search" />
    <input pInputText type="text" placeholder="Buscar..." />
</p-iconfield>

<!-- Float Label -->
<p-floatlabel>
    <input pInputText id="fl" type="text" [(ngModel)]="txt" />
    <label for="fl">Seu nome</label>
</p-floatlabel>`;

    props = [
        { name: 'type',        type: 'string',  default: 'text',  description: 'Tipo do input HTML.' },
        { name: 'placeholder', type: 'string',  default: 'null',  description: 'Texto exibido quando vazio.' },
        { name: 'disabled',    type: 'boolean', default: 'false', description: 'Desabilita o campo.' },
        { name: 'readonly',    type: 'boolean', default: 'false', description: 'Torna o campo somente leitura.' },
        { name: 'fluid',       type: 'boolean', default: 'false', description: 'Ocupa toda a largura disponível.' },
        { name: 'invalid',     type: 'boolean', default: 'false', description: 'Aplica estilo de erro ao campo.' },
        { name: 'size',        type: 'string',  default: 'null',  description: 'Tamanho: "small" ou "large".' },
    ];

    themeVars = [
        { variable: '--p-inputtext-background',            description: 'Fundo do campo de texto.' },
        { variable: '--p-inputtext-color',                 description: 'Cor do texto digitado.' },
        { variable: '--p-inputtext-border-color',          description: 'Cor da borda padrão.' },
        { variable: '--p-inputtext-focus-border-color',    description: 'Cor da borda em foco.' },
        { variable: '--p-inputtext-invalid-border-color',  description: 'Cor da borda em estado inválido.' },
        { variable: '--p-inputtext-placeholder-color',     description: 'Cor do placeholder.' },
        { variable: '--p-inputtext-border-radius',         description: 'Raio de borda.' },
        { variable: '--p-inputtext-padding-x',             description: 'Padding horizontal.' },
        { variable: '--p-inputtext-padding-y',             description: 'Padding vertical.' },
    ];
}
