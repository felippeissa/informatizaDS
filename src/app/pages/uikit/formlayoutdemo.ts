import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-formlayout-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, InputTextModule, TextareaModule, SelectModule, CheckboxModule, ButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        .form-field { display: flex; flex-direction: column; gap: 6px; }
        .form-field label { font-size: 13px; font-weight: 600; color: var(--text-color); }
        .form-field small { font-size: 11px; color: var(--text-color-secondary); }
        .form-grid { display: grid; gap: 16px; }
        .form-grid.cols-2 { grid-template-columns: 1fr 1fr; }
        .form-grid.cols-3 { grid-template-columns: 1fr 1fr 1fr; }
        @media (max-width:640px) { .form-grid.cols-2, .form-grid.cols-3 { grid-template-columns: 1fr; } }
        .form-row { display: flex; align-items: center; gap: 12px; }
        .form-row label { font-size: 13px; font-weight: 600; color: var(--text-color); min-width: 120px; }
        .form-section { background: var(--surface-card); border: 1px solid var(--surface-border); border-radius: 10px; padding: 20px; }
        .form-section-title { font-size: 13px; font-weight: 700; color: var(--text-color-secondary); text-transform: uppercase; letter-spacing: .04em; margin: 0 0 16px; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Form Layout</h1>
            <p class="comp-desc">Padrões de layout para formulários: vertical, horizontal e em grade. Use com os componentes de input do PrimeNG.</p>
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

                    <!-- Vertical -->
                    <div id="vertical" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Vertical</div>
                            <p class="demo-card-desc">Label acima do campo. Padrão mais comum — ideal para formulários compactos ou mobile.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:24px;gap:0">
                            <div class="form-section" style="max-width:480px;width:100%">
                                <p class="form-section-title">Dados Pessoais</p>
                                <div style="display:flex;flex-direction:column;gap:14px">
                                    <div class="form-field">
                                        <label for="v-nome">Nome completo</label>
                                        <input pInputText id="v-nome" type="text" placeholder="Ex.: João Silva" />
                                    </div>
                                    <div class="form-field">
                                        <label for="v-email">E-mail institucional</label>
                                        <input pInputText id="v-email" type="email" placeholder="usuario@goias.gov.br" />
                                        <small>Use o e-mail cadastrado no sistema.</small>
                                    </div>
                                    <div class="form-field">
                                        <label for="v-cargo">Cargo</label>
                                        <p-select id="v-cargo" [(ngModel)]="selectedCargo" [options]="cargos"
                                                  optionLabel="label" placeholder="Selecione o cargo" styleClass="w-full" />
                                    </div>
                                    <div class="form-field">
                                        <label for="v-obs">Observações</label>
                                        <textarea pTextarea id="v-obs" rows="3" placeholder="Informações adicionais..."></textarea>
                                    </div>
                                    <p-button label="Salvar" icon="pi pi-check" />
                                </div>
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.vertical }}</pre></div>
                    </div>

                    <!-- Horizontal -->
                    <div id="horizontal" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Horizontal</div>
                            <p class="demo-card-desc">Label ao lado do campo. Bom para formulários densos em telas maiores.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:24px;gap:0">
                            <div class="form-section" style="max-width:560px;width:100%">
                                <p class="form-section-title">Filtros de Busca</p>
                                <div style="display:flex;flex-direction:column;gap:12px">
                                    <div class="form-row">
                                        <label for="h-nome">Nome</label>
                                        <input pInputText id="h-nome" type="text" placeholder="Pesquisar..." style="flex:1" />
                                    </div>
                                    <div class="form-row">
                                        <label for="h-sistema">Sistema</label>
                                        <p-select id="h-sistema" [(ngModel)]="selectedSistema" [options]="sistemas"
                                                  optionLabel="label" placeholder="Todos os sistemas" style="flex:1" />
                                    </div>
                                    <div class="form-row">
                                        <label for="h-status">Status</label>
                                        <p-select id="h-status" [(ngModel)]="selectedStatus" [options]="statusOptions"
                                                  optionLabel="label" placeholder="Todos" style="flex:1" />
                                    </div>
                                    <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px">
                                        <p-button label="Limpar" severity="secondary" outlined />
                                        <p-button label="Filtrar" icon="pi pi-search" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.horizontal }}</pre></div>
                    </div>

                    <!-- Grid -->
                    <div id="grid" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Grade (Multi-coluna)</div>
                            <p class="demo-card-desc">Campos organizados em colunas com CSS Grid. Ideal para formulários grandes com muitos campos.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:24px;gap:0">
                            <div class="form-section" style="width:100%">
                                <p class="form-section-title">Cadastro de Usuário</p>
                                <div class="form-grid cols-2" style="margin-bottom:14px">
                                    <div class="form-field">
                                        <label for="g-nome">Nome</label>
                                        <input pInputText id="g-nome" type="text" placeholder="Nome" />
                                    </div>
                                    <div class="form-field">
                                        <label for="g-sobrenome">Sobrenome</label>
                                        <input pInputText id="g-sobrenome" type="text" placeholder="Sobrenome" />
                                    </div>
                                </div>
                                <div class="form-grid cols-3" style="margin-bottom:14px">
                                    <div class="form-field">
                                        <label for="g-cpf">CPF</label>
                                        <input pInputText id="g-cpf" type="text" placeholder="000.000.000-00" />
                                    </div>
                                    <div class="form-field">
                                        <label for="g-tel">Telefone</label>
                                        <input pInputText id="g-tel" type="text" placeholder="(62) 9 0000-0000" />
                                    </div>
                                    <div class="form-field">
                                        <label for="g-setor">Setor</label>
                                        <p-select id="g-setor" [(ngModel)]="selectedSetor" [options]="setores"
                                                  optionLabel="label" placeholder="Selecione" styleClass="w-full" />
                                    </div>
                                </div>
                                <div class="form-field" style="margin-bottom:14px">
                                    <label for="g-email">E-mail</label>
                                    <input pInputText id="g-email" type="email" placeholder="usuario@goias.gov.br" />
                                </div>
                                <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">
                                    <p-checkbox [(ngModel)]="aceitaTermos" [binary]="true" inputId="g-termos" />
                                    <label for="g-termos" style="font-size:13px;cursor:pointer">Declaro que as informações são verdadeiras</label>
                                </div>
                                <div style="display:flex;gap:8px">
                                    <p-button label="Cancelar" severity="secondary" outlined />
                                    <p-button label="Cadastrar" icon="pi pi-user-plus" [disabled]="!aceitaTermos" />
                                </div>
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.grid }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Diretivas de Input — Visão Geral</div>
                    <p-table [value]="propsInputs" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:200px">Diretiva / Componente</th><th style="width:200px">Módulo</th><th>Uso</th></tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-r>
                            <tr>
                                <td><strong style="font-family:monospace;font-size:13px">{{ r.name }}</strong></td>
                                <td><span class="badge-type">{{ r.module }}</span></td>
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
export class FormLayoutDemo {
    selectedCargo: any = null;
    selectedSistema: any = null;
    selectedStatus: any = null;
    selectedSetor: any = null;
    aceitaTermos = false;

    cargos = [
        { label: 'Analista de TI' },
        { label: 'Servidor Público' },
        { label: 'Gestor' },
        { label: 'Diretor' },
    ];

    sistemas = [
        { label: 'Protocolo' },
        { label: 'Financeiro' },
        { label: 'RH' },
        { label: 'TI' },
    ];

    statusOptions = [
        { label: 'Ativo' },
        { label: 'Inativo' },
        { label: 'Pendente' },
    ];

    setores = [
        { label: 'Secretaria de Fazenda' },
        { label: 'Secretaria de Saúde' },
        { label: 'Secretaria de Educação' },
        { label: 'SEFAZ' },
    ];

    code: any = {
        vertical: `<!-- Label acima do campo -->
<div style="display:flex;flex-direction:column;gap:6px">
    <label for="nome">Nome completo</label>
    <input pInputText id="nome" type="text" />
    <small>Texto de ajuda opcional</small>
</div>`,

        horizontal: `<!-- Label ao lado do campo -->
<div style="display:flex;align-items:center;gap:12px">
    <label style="min-width:120px;font-weight:600">Nome</label>
    <input pInputText type="text" style="flex:1" />
</div>`,

        grid: `<!-- 2 colunas com CSS Grid -->
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
    <div style="display:flex;flex-direction:column;gap:6px">
        <label>Nome</label>
        <input pInputText type="text" />
    </div>
    <div style="display:flex;flex-direction:column;gap:6px">
        <label>Sobrenome</label>
        <input pInputText type="text" />
    </div>
</div>`,
    };

    propsInputs = [
        { name: 'pInputText',  module: 'InputTextModule',  description: 'Diretiva para estilizar <input> com o tema PrimeNG.' },
        { name: 'pTextarea',   module: 'TextareaModule',   description: 'Diretiva para <textarea> responsivo.' },
        { name: 'p-select',    module: 'SelectModule',     description: 'Dropdown com busca e opções customizadas.' },
        { name: 'p-checkbox',  module: 'CheckboxModule',   description: 'Caixa de seleção binária ou múltipla.' },
        { name: 'p-inputnumber', module: 'InputNumberModule', description: 'Input numérico com máscara e formatação.' },
        { name: 'p-password',  module: 'PasswordModule',   description: 'Input de senha com medidor de força.' },
    ];

    themeVars = [
        { variable: '--p-inputtext-background',         description: 'Fundo do campo de texto.' },
        { variable: '--p-inputtext-border-color',       description: 'Borda padrão do campo.' },
        { variable: '--p-inputtext-focus-border-color', description: 'Borda ao focar o campo.' },
        { variable: '--p-inputtext-placeholder-color',  description: 'Cor do placeholder.' },
        { variable: '--p-inputtext-color',              description: 'Cor do texto digitado.' },
        { variable: '--p-inputtext-padding-x',          description: 'Padding horizontal interno.' },
        { variable: '--p-inputtext-padding-y',          description: 'Padding vertical interno.' },
    ];
}
