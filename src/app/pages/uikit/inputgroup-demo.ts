import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-inputgroup-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, InputTextModule, InputGroupModule, InputGroupAddonModule, ButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        .form-col { display:flex; flex-direction:column; gap:6px; width:100%; max-width:300px; }
        .form-col label { font-size:13px; font-weight:600; color:var(--text-color-secondary); }
        .form-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:20px; padding:20px; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">InputGroup</h1>
            <p class="comp-desc">Adiciona addons (ícones, texto ou botões) antes ou depois de um input usando <code>p-inputgroup</code> e <code>p-inputgroup-addon</code>.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">InputGroupModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/inputgroup'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">InputGroup</div>
                            <p class="demo-card-desc">Adiciona addons (ícones, texto ou botões) antes ou depois de um input.</p>
                        </div>
                        <div class="demo-card-body form-grid">
                            <div class="form-col">
                                <label>Com ícone à esquerda</label>
                                <p-inputgroup>
                                    <p-inputgroup-addon><i class="pi pi-user"></i></p-inputgroup-addon>
                                    <input pInputText placeholder="Usuário" [(ngModel)]="igUser" />
                                </p-inputgroup>
                            </div>
                            <div class="form-col">
                                <label>Prefixo de texto</label>
                                <p-inputgroup>
                                    <p-inputgroup-addon>R$</p-inputgroup-addon>
                                    <input pInputText placeholder="0,00" type="number" [(ngModel)]="igPrice" />
                                    <p-inputgroup-addon>,00</p-inputgroup-addon>
                                </p-inputgroup>
                            </div>
                            <div class="form-col">
                                <label>Com botão</label>
                                <p-inputgroup>
                                    <input pInputText placeholder="Buscar protocolo..." [(ngModel)]="igSearch" />
                                    <p-button icon="pi pi-search" />
                                </p-inputgroup>
                            </div>
                            <div class="form-col">
                                <label>URL</label>
                                <p-inputgroup>
                                    <p-inputgroup-addon>https://</p-inputgroup-addon>
                                    <input pInputText placeholder="site.goias.gov.br" [(ngModel)]="igUrl" />
                                </p-inputgroup>
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Estrutura dos componentes</div>
                    <p-table [value]="props" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:220px">Componente</th><th>Descrição</th></tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-r>
                            <tr>
                                <td><strong style="font-family:monospace;font-size:13px">{{ r.name }}</strong></td>
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
export class InputGroupDemo {
    igUser = '';
    igPrice: number | null = null;
    igSearch = '';
    igUrl = '';

    code = `<!-- Ícone à esquerda -->
<p-inputgroup>
    <p-inputgroup-addon>
        <i class="pi pi-user"></i>
    </p-inputgroup-addon>
    <input pInputText placeholder="Usuário" />
</p-inputgroup>

<!-- Prefixo texto -->
<p-inputgroup>
    <p-inputgroup-addon>R$</p-inputgroup-addon>
    <input pInputText type="number" placeholder="0,00" />
</p-inputgroup>

<!-- Com botão -->
<p-inputgroup>
    <input pInputText placeholder="Buscar..." />
    <p-button icon="pi pi-search" />
</p-inputgroup>`;

    props = [
        { name: 'p-inputgroup',       description: 'Container que agrupa o input e seus addons.' },
        { name: 'p-inputgroup-addon', description: 'Addon posicionado antes ou depois do input. Pode conter ícone, texto ou checkbox.' },
    ];

    themeVars = [
        { variable: '--p-inputgroup-addon-background',   description: 'Fundo do addon.' },
        { variable: '--p-inputgroup-addon-border-color', description: 'Borda do addon.' },
        { variable: '--p-inputgroup-addon-color',        description: 'Cor do conteúdo do addon.' },
        { variable: '--p-inputgroup-addon-padding',      description: 'Padding do addon.' },
    ];
}
