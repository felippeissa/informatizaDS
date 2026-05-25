import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

const TEMPLATE_STYLES = `
    /* ── wrapper: sangra até as bordas do layout-main-container (2rem cada lado) ── */
    :host {
        display: block;
        height: 100%;
    }
    .tpl-wrapper {
        /* Contrabalanceia o padding lateral e o padding-bottom do layout-main */
        margin: -2rem -2rem -2rem -2rem;
        padding: 0;
        min-height: calc(100% + 2rem);
        display: flex;
        flex-direction: column;
    }

    /* ── page header ── */
    .tpl-page-title {
        font-size: 11px; font-weight: 700; text-transform: uppercase;
        letter-spacing: .08em; color: var(--text-color-secondary);
        margin: 0 0 6px;
    }
    .tpl-page-desc {
        font-size: 13px; color: var(--text-color-secondary);
        margin: 0 0 28px; line-height: 1.6;
    }
    .tpl-page-heading {
        padding: 24px 28px 20px;
        border-bottom: 1px solid var(--surface-border);
    }

    /* ── card container (ocupa todo o espaço disponível) ── */
    .tpl-card {
        background: var(--surface-card);
        border: none;
        border-top: 1px solid var(--surface-border);
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .tpl-card-header {
        padding: 20px 28px 18px;
        border-bottom: 1px solid var(--surface-border);
    }
    .tpl-card-title {
        font-size: 20px; font-weight: 700;
        color: var(--text-color); margin: 0;
    }
    .tpl-card-body {
        padding: 24px 28px;
        flex: 1;
    }

    /* ── grid de campos ── */
    .field-row {
        display: grid;
        gap: 16px;
        margin-bottom: 16px;
    }
    .field-row.cols-3 { grid-template-columns: 1fr 1fr 1fr; }
    .field-row.cols-2 { grid-template-columns: 1fr 1fr; }
    .field-row.cols-1 { grid-template-columns: 1fr; }

    .field-group {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .field-label {
        font-size: 12px; font-weight: 600;
        color: var(--text-color);
        display: flex; align-items: center; gap: 3px;
    }
    .field-required {
        color: #EF4444; font-size: 13px;
    }

    /* inputs desabilitados */
    .field-disabled input {
        background: var(--surface-ground) !important;
        color: var(--text-color-secondary) !important;
        cursor: not-allowed;
    }

    /* ── info box ── */
    .info-box {
        display: flex; align-items: center; gap: 10px;
        background: #EFF6FF; border: 1px solid #BFDBFE;
        border-radius: 8px; padding: 12px 16px;
        color: #1D4ED8; font-size: 13px; font-weight: 500;
        margin-bottom: 24px;
    }
    .info-box i { font-size: 16px; flex-shrink: 0; }

    /* ── seção parcelas ── */
    .parcelas-section { margin-bottom: 8px; }
    .parcelas-header {
        display: flex; align-items: center; justify-content: space-between;
        margin-bottom: 12px;
    }
    .parcelas-title {
        font-size: 14px; font-weight: 700; color: var(--text-color);
    }
    .parcelas-empty {
        border: 1px dashed var(--surface-border); border-radius: 8px;
        padding: 32px; text-align: center;
        color: var(--text-color-secondary); font-size: 13px;
    }
    .parcelas-empty i { font-size: 28px; display: block; margin-bottom: 8px; opacity:.4; }

    /* ── footer ── */
    .tpl-footer {
        display: flex; align-items: center; justify-content: flex-end;
        gap: 10px; padding: 16px 28px;
        border-top: 1px solid var(--surface-border);
        background: var(--surface-ground);
    }

    /* full-width selects/inputs */
    :host ::ng-deep .w-full { width: 100% !important; }
    :host ::ng-deep p-select,
    :host ::ng-deep .p-select { width: 100% !important; }
    :host ::ng-deep .p-inputtext { width: 100%; }
`;

@Component({
    selector: 'app-incluir-ipof',
    standalone: true,
    imports: [CommonModule, FormsModule, SelectModule, InputTextModule, TextareaModule, ButtonModule, TableModule],
    styles: [TEMPLATE_STYLES],
    template: `
        <div class="tpl-wrapper">

            <!-- Card principal (ocupa todo o espaço) -->
            <div class="tpl-card">

                <!-- Header: breadcrumb + título -->
                <div class="tpl-card-header">
                    <p class="tpl-page-title" style="margin-bottom:6px">Templates · Formulários</p>
                    <h2 class="tpl-card-title">Incluir IPOF</h2>
                </div>

                <!-- Corpo do formulário -->
                <div class="tpl-card-body">

                    <!-- Linha 1: Tipo cronograma | Unidade orçamentária | Referente a emenda -->
                    <div class="field-row cols-3">
                        <div class="field-group">
                            <label class="field-label">
                                Tipo de cronograma <span class="field-required">*</span>
                            </label>
                            <p-select [options]="tiposCronograma" [(ngModel)]="form.tipoCronograma"
                                      optionLabel="label" optionValue="value"
                                      placeholder="Escolha uma opção" styleClass="w-full" />
                        </div>
                        <div class="field-group">
                            <label class="field-label">
                                Unidade orçamentária <span class="field-required">*</span>
                            </label>
                            <p-select [options]="unidadesOrcamentarias" [(ngModel)]="form.unidadeOrcamentaria"
                                      optionLabel="label" optionValue="value"
                                      placeholder="Escolha uma opção" styleClass="w-full" />
                        </div>
                        <div class="field-group">
                            <label class="field-label">
                                IPOF é referente a uma emenda <span class="field-required">*</span>
                            </label>
                            <p-select [options]="simNao" [(ngModel)]="form.referenciaEmenda"
                                      optionLabel="label" optionValue="value"
                                      placeholder="Escolha uma opção" styleClass="w-full" />
                        </div>
                    </div>

                    <!-- Linha 2: Número DDO | Exercício DDO (disabled) | Tipo DDO (disabled) -->
                    <div class="field-row cols-3">
                        <div class="field-group">
                            <label class="field-label">
                                Número do DDO <span class="field-required">*</span>
                            </label>
                            <p-select [options]="numerosDDO" [(ngModel)]="form.numeroDDO"
                                      optionLabel="label" optionValue="value"
                                      placeholder="Escolha uma opção" styleClass="w-full" />
                        </div>
                        <div class="field-group field-disabled">
                            <label class="field-label">Exercício DDO</label>
                            <input pInputText [value]="form.numeroDDO ? '2025' : ''"
                                   placeholder="Insira um DDO válido para visualizar"
                                   [disabled]="true" />
                        </div>
                        <div class="field-group field-disabled">
                            <label class="field-label">Tipo DDO</label>
                            <input pInputText [value]="form.numeroDDO ? 'Ordinário' : ''"
                                   placeholder="Insira um DDO válido para visualizar"
                                   [disabled]="true" />
                        </div>
                    </div>

                    <!-- Linha 3: Projeto / Entrega / IPE (full width) -->
                    <div class="field-row cols-1">
                        <div class="field-group">
                            <label class="field-label">
                                Projeto / Entrega / IPE <span class="field-required">*</span>
                            </label>
                            <p-select [options]="projetos" [(ngModel)]="form.projeto"
                                      optionLabel="label" optionValue="value"
                                      placeholder="Escolha uma opção" styleClass="w-full" />
                        </div>
                    </div>

                    <!-- Linha 4: Unidade / Operação (full width) -->
                    <div class="field-row cols-1">
                        <div class="field-group">
                            <label class="field-label">
                                Unidade / Operação <span class="field-required">*</span>
                            </label>
                            <p-select [options]="unidadesOperacao" [(ngModel)]="form.unidadeOperacao"
                                      optionLabel="label" optionValue="value"
                                      placeholder="Escolha uma opção" styleClass="w-full" />
                        </div>
                    </div>

                    <!-- Linha 5: Formalidade | Modalidade licitação | Número processo -->
                    <div class="field-row cols-3">
                        <div class="field-group">
                            <label class="field-label">Formalidade</label>
                            <p-select [options]="formalidades" [(ngModel)]="form.formalidade"
                                      optionLabel="label" optionValue="value"
                                      placeholder="Escolha uma opção" styleClass="w-full" />
                        </div>
                        <div class="field-group">
                            <label class="field-label">Modalidade de licitação</label>
                            <p-select [options]="modalidades" [(ngModel)]="form.modalidade"
                                      optionLabel="label" optionValue="value"
                                      placeholder="Escolha uma opção" styleClass="w-full" />
                        </div>
                        <div class="field-group">
                            <label class="field-label">
                                Número do processo <span class="field-required">*</span>
                            </label>
                            <p-select [options]="processos" [(ngModel)]="form.processo"
                                      optionLabel="label" optionValue="value"
                                      placeholder="Escolha uma opção" styleClass="w-full" />
                        </div>
                    </div>

                    <!-- Linha 6: Fornecedor (full width) -->
                    <div class="field-row cols-1">
                        <div class="field-group">
                            <label class="field-label">Fornecedor</label>
                            <p-select [options]="fornecedores" [(ngModel)]="form.fornecedor"
                                      optionLabel="label" optionValue="value"
                                      placeholder="Escolha uma opção" styleClass="w-full" />
                        </div>
                    </div>

                    <!-- Linha 7: Descrição (full width) -->
                    <div class="field-row cols-1" style="margin-bottom:24px">
                        <div class="field-group">
                            <label class="field-label">
                                Descrição <span class="field-required">*</span>
                            </label>
                            <p-select [options]="descricoes" [(ngModel)]="form.descricao"
                                      optionLabel="label" optionValue="value"
                                      placeholder="Escolha uma opção" styleClass="w-full" />
                        </div>
                    </div>

                    <!-- Info box -->
                    <div class="info-box">
                        <i class="pi pi-info-circle"></i>
                        <span>Valor total o IPOF: insira ao menos uma parcela para visualizar</span>
                    </div>

                    <!-- Seção Parcelas -->
                    <div class="parcelas-section">
                        <div class="parcelas-header">
                            <span class="parcelas-title">Parcelas</span>
                            <p-button label="Inserir parcelas" icon="pi pi-plus"
                                      severity="success" outlined
                                      (onClick)="adicionarParcela()" />
                        </div>

                        @if (parcelas.length === 0) {
                            <div class="parcelas-empty">
                                <i class="pi pi-list"></i>
                                Nenhuma parcela inserida. Clique em "Inserir parcelas" para adicionar.
                            </div>
                        } @else {
                            <p-table [value]="parcelas" styleClass="p-datatable-sm"
                                     [tableStyle]="{'min-width':'100%'}">
                                <ng-template pTemplate="header">
                                    <tr>
                                        <th>Data de referência</th>
                                        <th>Data de desembolso</th>
                                        <th>Sequencial dotação</th>
                                        <th>Dotação Orçamentária / Programa de Trabalho</th>
                                        <th style="width:80px"></th>
                                    </tr>
                                </ng-template>
                                <ng-template pTemplate="body" let-p>
                                    <tr>
                                        <td>{{ p.dataRef }}</td>
                                        <td>{{ p.dataDesembolso }}</td>
                                        <td>{{ p.sequencial }}</td>
                                        <td>{{ p.dotacao }}</td>
                                        <td>
                                            <p-button icon="pi pi-trash" severity="danger" text rounded
                                                      (onClick)="removerParcela(p)" />
                                        </td>
                                    </tr>
                                </ng-template>
                            </p-table>
                        }
                    </div>

                </div><!-- /tpl-card-body -->

                <!-- Footer -->
                <div class="tpl-footer">
                    <p-button label="Voltar" icon="pi pi-arrow-left"
                              severity="secondary" outlined />
                    <p-button label="Salvar" icon="pi pi-save" />
                </div>

            </div><!-- /tpl-card -->
        </div>
    `
})
export class IncluirIpofTemplate implements OnInit {

    form: any = {
        tipoCronograma: null,
        unidadeOrcamentaria: null,
        referenciaEmenda: null,
        numeroDDO: null,
        projeto: null,
        unidadeOperacao: null,
        formalidade: null,
        modalidade: null,
        processo: null,
        fornecedor: null,
        descricao: null,
    };

    parcelas: any[] = [];

    tiposCronograma = [
        { label: 'Anual',     value: 'anual' },
        { label: 'Semestral', value: 'semestral' },
        { label: 'Trimestral',value: 'trimestral' },
        { label: 'Bimestral', value: 'bimestral' },
        { label: 'Mensal',    value: 'mensal' },
    ];

    unidadesOrcamentarias = [
        { label: '01.01 – Gabinete do Governador',            value: '0101' },
        { label: '02.01 – Secretaria da Fazenda',             value: '0201' },
        { label: '03.01 – Secretaria de Educação',            value: '0301' },
        { label: '04.01 – Secretaria de Saúde',               value: '0401' },
        { label: '05.01 – Secretaria de Infraestrutura',      value: '0501' },
    ];

    simNao = [
        { label: 'Sim', value: true },
        { label: 'Não', value: false },
    ];

    numerosDDO = [
        { label: 'DDO-2025-0001', value: '2025-0001' },
        { label: 'DDO-2025-0002', value: '2025-0002' },
        { label: 'DDO-2025-0047', value: '2025-0047' },
        { label: 'DDO-2025-0112', value: '2025-0112' },
    ];

    projetos = [
        { label: '001 – Modernização da Gestão Pública',           value: '001' },
        { label: '002 – Infraestrutura Viária Estadual',           value: '002' },
        { label: '003 – Saúde Para Todos',                         value: '003' },
        { label: '004 – Educação de Qualidade',                    value: '004' },
        { label: '005 – Segurança Pública Integrada',              value: '005' },
    ];

    unidadesOperacao = [
        { label: '01 – Gerência de Planejamento',                  value: '01' },
        { label: '02 – Gerência de Contratos',                     value: '02' },
        { label: '03 – Gerência Financeira',                       value: '03' },
        { label: '04 – Gerência de Infraestrutura',                value: '04' },
    ];

    formalidades = [
        { label: 'Contrato',       value: 'contrato' },
        { label: 'Convênio',       value: 'convenio' },
        { label: 'Termo de Fomento', value: 'fomento' },
        { label: 'Acordo de Cooperação', value: 'cooperacao' },
        { label: 'Dispensa',       value: 'dispensa' },
    ];

    modalidades = [
        { label: 'Pregão Eletrônico',    value: 'pregao-eletronico' },
        { label: 'Concorrência',         value: 'concorrencia' },
        { label: 'Tomada de Preços',     value: 'tomada-precos' },
        { label: 'Convite',              value: 'convite' },
        { label: 'Dispensa de Licitação',value: 'dispensa' },
        { label: 'Inexigibilidade',      value: 'inexigibilidade' },
    ];

    processos = [
        { label: '202500001 – Aquisição de Equipamentos', value: '202500001' },
        { label: '202500042 – Obras de Pavimentação',     value: '202500042' },
        { label: '202500098 – Serviços de TI',            value: '202500098' },
        { label: '202500134 – Consultoria Técnica',       value: '202500134' },
    ];

    fornecedores = [
        { label: 'Empresa Alpha Tecnologia Ltda – CNPJ 12.345.678/0001-90',  value: 'alpha' },
        { label: 'Construtora Beta S/A – CNPJ 98.765.432/0001-10',           value: 'beta' },
        { label: 'Distribuidora Gamma ME – CNPJ 45.678.901/0001-23',         value: 'gamma' },
        { label: 'Serviços Delta Eireli – CNPJ 56.789.012/0001-34',          value: 'delta' },
    ];

    descricoes = [
        { label: 'Aquisição de material de escritório',            value: 'desc1' },
        { label: 'Contratação de serviços de limpeza',             value: 'desc2' },
        { label: 'Obras de reforma predial',                       value: 'desc3' },
        { label: 'Desenvolvimento de sistema de informação',       value: 'desc4' },
        { label: 'Fornecimento de equipamentos de informática',    value: 'desc5' },
    ];

    ngOnInit() {}

    adicionarParcela() {
        const n = this.parcelas.length + 1;
        this.parcelas = [
            ...this.parcelas,
            {
                dataRef:        `01/${String(n).padStart(2,'0')}/2025`,
                dataDesembolso: `15/${String(n).padStart(2,'0')}/2025`,
                sequencial:     String(n).padStart(3,'0'),
                dotacao:        `33.90.39 – Outros Serviços de Terceiros – PJ (exemplo ${n})`,
            }
        ];
    }

    removerParcela(p: any) {
        this.parcelas = this.parcelas.filter(x => x !== p);
    }
}
