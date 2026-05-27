import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService, MenuItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';
import { TabsModule } from 'primeng/tabs';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { BadgeModule } from 'primeng/badge';
import { Menu } from 'primeng/menu';

export interface Etiqueta {
    texto: string;
    cor: string;
    textoCor: string;
}

export interface Ato {
    id: number;
    processoDracon: string;
    processoSEI: string;
    etiquetas: Etiqueta[];
    tipoProcesso: string;
    assunto: string;
    situacao: string;
    responsavel: string;
    dataCriacao: string;
    prioridade: string;
    unidade: string;
}

const MOCK_ATOS: Ato[] = [
    {
        id: 1, processoDracon: '2025000089', processoSEI: '00310.001234/2025-89',
        etiquetas: [{ texto: 'Urgente', cor: '#FEF3C7', textoCor: '#92400E' }],
        tipoProcesso: 'Decreto', assunto: 'Regulamentação de convênio para desenvolvimento de sistemas públicos de informação',
        situacao: 'Em elaboração', responsavel: 'João da Silva Pereira', dataCriacao: '10/01/2025', prioridade: 'Urgente', unidade: 'Setor de TI - SEAD',
    },
    {
        id: 2, processoDracon: '2025000102', processoSEI: '00310.002345/2025-12',
        etiquetas: [
            { texto: 'SUP.JURÍDICO', cor: '#EFF6FF', textoCor: '#1D4ED8' },
            { texto: 'Aprovada', cor: '#F0FDF4', textoCor: '#166534' },
        ],
        tipoProcesso: 'Portaria', assunto: 'Designação de servidores para comissão de avaliação de desempenho 2025',
        situacao: 'Publicado', responsavel: 'Maria Souza da Silva', dataCriacao: '12/01/2025', prioridade: 'Alta', unidade: 'Gerência de RH - SEAD',
    },
    {
        id: 3, processoDracon: '2025000118', processoSEI: '00310.003456/2025-33',
        etiquetas: [{ texto: 'Em análise', cor: '#FFF7ED', textoCor: '#C2410C' }],
        tipoProcesso: 'Instrução Normativa', assunto: 'Normas para contratação de serviços de tecnologia da informação no âmbito estadual',
        situacao: 'Em análise', responsavel: 'Carlos Eduardo Martins', dataCriacao: '15/01/2025', prioridade: 'Alta', unidade: 'SECTEC - Assessoria',
    },
    {
        id: 4, processoDracon: '2025000137', processoSEI: '00310.004567/2025-41',
        etiquetas: [
            { texto: 'Urgente', cor: '#FEF3C7', textoCor: '#92400E' },
            { texto: 'Reprovada', cor: '#FFF1F2', textoCor: '#BE123C' },
        ],
        tipoProcesso: 'Resolução', assunto: 'Aprovação do Plano de Gestão de Riscos da Secretaria para o exercício de 2025',
        situacao: 'Cancelado', responsavel: 'Ana Paula Rodrigues', dataCriacao: '18/01/2025', prioridade: 'Urgente', unidade: 'Controladoria Geral',
    },
    {
        id: 5, processoDracon: '2025000154', processoSEI: '00310.005678/2025-58',
        etiquetas: [{ texto: 'Aguardando', cor: '#F5F3FF', textoCor: '#6D28D9' }],
        tipoProcesso: 'Despacho', assunto: 'Autorização de abertura de processo licitatório para aquisição de equipamentos',
        situacao: 'Em elaboração', responsavel: 'Roberto Ferreira Neto', dataCriacao: '20/01/2025', prioridade: 'Média', unidade: 'SEAD - Licitações',
    },
    {
        id: 6, processoDracon: '2025000171', processoSEI: '00310.006789/2025-67',
        etiquetas: [{ texto: 'SUP.JURÍDICO', cor: '#EFF6FF', textoCor: '#1D4ED8' }],
        tipoProcesso: 'Portaria', assunto: 'Nomeação de servidor para cargo em comissão de Gerente de Projetos',
        situacao: 'Publicado', responsavel: 'Fernanda Lima Costa', dataCriacao: '22/01/2025', prioridade: 'Média', unidade: 'Gabinete SEAD',
    },
    {
        id: 7, processoDracon: '2025000198', processoSEI: '00310.007890/2025-74',
        etiquetas: [
            { texto: 'Aprovada', cor: '#F0FDF4', textoCor: '#166534' },
        ],
        tipoProcesso: 'Decreto', assunto: 'Institui o programa de modernização da gestão pública e reestruturação administrativa',
        situacao: 'Aprovado', responsavel: 'Luciano Fagundes', dataCriacao: '25/01/2025', prioridade: 'Alta', unidade: 'SUP ASSUNTOS JURÍDICOS',
    },
    {
        id: 8, processoDracon: '2025000215', processoSEI: '00310.008901/2025-83',
        etiquetas: [{ texto: 'Em análise', cor: '#FFF7ED', textoCor: '#C2410C' }],
        tipoProcesso: 'Instrução Normativa', assunto: 'Regulamenta os procedimentos para gestão de contratos administrativos',
        situacao: 'Em análise', responsavel: 'Patrícia Alves Santos', dataCriacao: '28/01/2025', prioridade: 'Baixa', unidade: 'SEAD - Contratos',
    },
    {
        id: 9, processoDracon: '2025000230', processoSEI: '00310.009012/2025-91',
        etiquetas: [],
        tipoProcesso: 'Memorando', assunto: 'Solicitação de liberação de crédito orçamentário para custeio de eventos institucionais',
        situacao: 'Em elaboração', responsavel: 'Marcos Vinicius Prado', dataCriacao: '01/02/2025', prioridade: 'Baixa', unidade: 'SEAD - Financeiro',
    },
    {
        id: 10, processoDracon: '2025000247', processoSEI: '00310.010123/2025-05',
        etiquetas: [
            { texto: 'Urgente', cor: '#FEF3C7', textoCor: '#92400E' },
            { texto: 'SUP.JURÍDICO', cor: '#EFF6FF', textoCor: '#1D4ED8' },
        ],
        tipoProcesso: 'Resolução', assunto: 'Dispõe sobre o regime de trabalho remoto para servidores do poder executivo estadual',
        situacao: 'Em elaboração', responsavel: 'Hélio Bastos Júnior', dataCriacao: '03/02/2025', prioridade: 'Urgente', unidade: 'Gabinete do Governador',
    },
    {
        id: 11, processoDracon: '2025000263', processoSEI: '00310.011234/2025-18',
        etiquetas: [{ texto: 'Aprovada', cor: '#F0FDF4', textoCor: '#166534' }],
        tipoProcesso: 'Portaria', assunto: 'Regulamenta o processo de avaliação especial de desempenho para estágio probatório',
        situacao: 'Publicado', responsavel: 'Camila Dias Nogueira', dataCriacao: '05/02/2025', prioridade: 'Média', unidade: 'Gerência de RH - SEAD',
    },
    {
        id: 12, processoDracon: '2025000280', processoSEI: '00310.012345/2025-24',
        etiquetas: [{ texto: 'Aguardando', cor: '#F5F3FF', textoCor: '#6D28D9' }],
        tipoProcesso: 'Despacho', assunto: 'Encaminhamento de processo de sindicância ao núcleo de correição disciplinar',
        situacao: 'Em análise', responsavel: 'Gustavo Andrade Lima', dataCriacao: '08/02/2025', prioridade: 'Alta', unidade: 'Corregedoria',
    },
];

@Component({
    selector: 'app-dracon-listar-atos',
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        ButtonModule, InputTextModule, IconFieldModule, InputIconModule,
        SelectModule, DatePickerModule,
        TableModule, CheckboxModule,
        TagModule, TabsModule, TooltipModule, DividerModule,
        DrawerModule, MenuModule, ToastModule, BadgeModule,
    ],
    providers: [MessageService],
    styles: [`
        :host { --dracon: #1755A3; }

        .page-header { margin-bottom: 24px; display:flex; justify-content:space-between; align-items:flex-start; }
        .breadcrumb  { font-size: 12px; color: var(--text-color-secondary); margin-bottom: 4px; }
        .page-title  { font-size: 28px; font-weight: 800; color: var(--text-color); margin: 0; }

        .tab-badge {
            display: inline-flex; align-items: center; justify-content: center;
            background: var(--surface-border); color: var(--text-color-secondary);
            font-size: 10px; font-weight: 700;
            width: 20px; height: 20px; border-radius: 50%; margin-left: 6px;
        }
        .tab-badge.active { background: #1755A3; color: #fff; }

        .list-container {
            border: 1px solid var(--surface-border);
            border-radius: 8px; overflow: hidden; margin-top: 16px;
        }

        .filter-bar {
            display: flex; align-items: flex-start; gap: 10px; flex-wrap: wrap;
            padding: 14px 16px;
            background: var(--surface-card);
            border-bottom: 1px solid var(--surface-border);
        }
        .filter-row { display:flex; align-items:center; gap:10px; flex-wrap:wrap; width:100%; }
        .filter-actions { display:flex; align-items:center; gap:6px; margin-left:auto; flex-shrink:0; }

        .action-bar {
            display: flex; align-items: center; gap: 8px;
            padding: 10px 16px;
            background: var(--surface-card);
            border-bottom: 1px solid var(--surface-border);
        }

        ::ng-deep .ds-table { border: none !important; border-radius: 0 !important; }
        ::ng-deep .ds-table .p-datatable-table-container { border-radius: 0 !important; }
        ::ng-deep .ds-table .p-datatable-paginator-bottom {
            border-top: 1px solid var(--surface-border) !important;
            border-radius: 0 !important;
        }
        ::ng-deep .ds-table .p-datatable-thead > tr > th {
            background: var(--surface-ground) !important;
            font-size: 12px; font-weight: 700;
            color: var(--text-color-secondary) !important;
            border-bottom: 1px solid var(--surface-border) !important;
            padding: 10px 12px !important;
        }
        ::ng-deep .ds-table .p-datatable-tbody > tr > td {
            padding: 10px 12px !important;
            border-bottom: 1px solid var(--surface-border) !important;
            font-size: 13px;
        }
        ::ng-deep .ds-table .p-datatable-tbody > tr:last-child > td { border-bottom: none !important; }
        ::ng-deep .ds-table .p-datatable-tbody > tr:hover > td { background: var(--surface-ground) !important; }

        .dracon-num { font-size: 13px; font-weight: 700; color: var(--text-color); }
        .sei-num    { font-size: 12px; color: var(--text-color-secondary); }
        .assunto    { font-size: 13px; color: var(--text-color); max-width: 320px; }
        .tipo-tag   { font-size: 11px; font-weight: 600; color: var(--text-color-secondary); }

        .etiqueta-chip {
            display: inline-flex; align-items: center;
            padding: 2px 8px; border-radius: 4px;
            font-size: 10px; font-weight: 700;
            margin-right: 4px; margin-bottom: 2px; white-space: nowrap;
        }

        .situacao-badge {
            display: inline-flex; align-items: center; gap: 4px;
            padding: 3px 8px; border-radius: 4px;
            font-size: 11px; font-weight: 700;
        }
        .sit-elaboracao { background: color-mix(in srgb,#6366F1 12%,transparent); color: #4338CA; }
        .sit-publicado  { background: color-mix(in srgb,#22C55E 12%,transparent); color: #166534; }
        .sit-cancelado  { background: color-mix(in srgb,#EF4444 12%,transparent); color: #DC2626; }
        .sit-analise    { background: color-mix(in srgb,#F97316 12%,transparent); color: #C2410C; }
        .sit-aprovado   { background: color-mix(in srgb,#3ACC75 12%,transparent); color: #166534; }

        .act-btn {
            width: 28px; height: 28px; border-radius: 6px;
            border: 1px solid var(--surface-border);
            background: var(--surface-card);
            display: inline-flex; align-items: center; justify-content: center;
            cursor: pointer; transition: all .12s;
            color: var(--text-color-secondary); font-size: 13px;
        }
        .act-btn:hover { background: var(--surface-hover); }

        /* drawer */
        .detail-row { display:flex; gap:8px; margin-bottom:12px; }
        .detail-label { font-size:11px; font-weight:700; color:var(--text-color-secondary); min-width:120px; flex-shrink:0; text-transform:uppercase; letter-spacing:.04em; }
        .detail-value { font-size:13px; color:var(--text-color); }
    `],
    template: `
        <p-toast />

        <!-- ─── PAGE HEADER ─── -->
        <div class="page-header">
            <div>
                <div class="breadcrumb">Atos › Listagem</div>
                <h1 class="page-title">Lista de atos</h1>
            </div>
            <p-button
                label="Novo ato"
                icon="pi pi-plus"
                [style]="{'background':'#1755A3','border-color':'#1755A3'}"
                (click)="novoAto()"
            />
        </div>

        <!-- ─── TABS ─── -->
        <p-tabs [(value)]="activeTab">
            <p-tablist>
                <p-tab value="todos">
                    Todos os processos
                    <span class="tab-badge" [class.active]="activeTab==='todos'">{{ atos.length }}</span>
                </p-tab>
                <p-tab value="nao-lidos">
                    Não lidos e não atribuídos
                    <span class="tab-badge" [class.active]="activeTab==='nao-lidos'">{{ countNaoLidos() }}</span>
                </p-tab>
                <p-tab value="meus">
                    Meus processos
                    <span class="tab-badge" [class.active]="activeTab==='meus'">{{ countMeus() }}</span>
                </p-tab>
            </p-tablist>
        </p-tabs>

        <!-- ─── LIST CONTAINER ─── -->
        <div class="list-container">

            <!-- FILTER BAR -->
            <div class="filter-bar">
                <div class="filter-row">
                    <p-select [(ngModel)]="filtro.tipoNumero" [options]="tipoNumeroOpts"
                        placeholder="Tipo de número" style="min-width:140px" [showClear]="true" />
                    <input pInputText [(ngModel)]="filtro.numero" placeholder="Número" style="width:140px" />
                    <p-select [(ngModel)]="filtro.tipoModelo" [options]="tipoModeloOpts"
                        placeholder="Tipo modelo ato" style="min-width:200px" [showClear]="true" />
                    <p-select [(ngModel)]="filtro.situacao" [options]="situacaoOpts"
                        placeholder="Situação do ato" style="min-width:160px" [showClear]="true" />
                    <div class="filter-actions">
                        @if (filtrosExpandidos) {
                            <p-button label="Menos filtros" [text]="true" size="small" icon="pi pi-chevron-up" (click)="filtrosExpandidos=false" />
                        } @else {
                            <p-button label="Mais filtros" [text]="true" size="small" icon="pi pi-chevron-down" (click)="filtrosExpandidos=true" />
                        }
                        <p-button label="Limpar filtro" severity="secondary" [outlined]="true" size="small" icon="pi pi-filter-slash" (click)="limparFiltros()" />
                        <p-button label="Filtrar" size="small" icon="pi pi-search"
                            [style]="{'background':'#1755A3','border-color':'#1755A3'}" (click)="filtrar()" />
                    </div>
                </div>

                @if (filtrosExpandidos) {
                    <div class="filter-row" style="margin-top:8px;padding-top:12px;border-top:1px solid var(--surface-border)">
                        <input pInputText [(ngModel)]="filtro.responsavel" placeholder="Responsável (mín. 4 chars ou CPF)" style="flex:1;min-width:200px" />
                        <p-datepicker [(ngModel)]="filtro.dataCriacao" placeholder="Data criação" dateFormat="dd/mm/yy" style="min-width:160px" />
                        <p-datepicker [(ngModel)]="filtro.dataConclusao" placeholder="Data conclusão" dateFormat="dd/mm/yy" style="min-width:160px" />
                    </div>
                }
            </div>

            <!-- ACTION BAR -->
            <div class="action-bar">
                <p-button
                    label="Etiqueta"
                    icon="pi pi-tag"
                    severity="secondary"
                    [outlined]="true"
                    size="small"
                    [disabled]="selectedAtos.length === 0"
                    (click)="emBreve('Gerenciar etiquetas em lote')"
                />
                <span style="font-size:12px;color:var(--text-color-secondary);margin-left:4px">
                    @if (selectedAtos.length > 0) {
                        {{ selectedAtos.length }} selecionado(s)
                    }
                </span>
            </div>

            <!-- TABLE -->
            <p-table
                [value]="atosFiltrados"
                [(selection)]="selectedAtos"
                dataKey="id"
                styleClass="p-datatable-sm ds-table"
                [tableStyle]="{'min-width':'100%'}"
                [paginator]="true"
                [rows]="10"
                [rowsPerPageOptions]="[10,25,50]"
                paginatorDropdownAppendTo="body"
            >
                <ng-template #header>
                    <tr>
                        <th style="width:40px"><p-tableHeaderCheckbox /></th>
                        <th pSortableColumn="processoDracon" style="min-width:140px">Processo Drácon <p-sortIcon field="processoDracon"/></th>
                        <th style="min-width:180px">Processo SEI</th>
                        <th style="min-width:180px">Etiquetas</th>
                        <th pSortableColumn="tipoProcesso" style="min-width:140px">Tipo <p-sortIcon field="tipoProcesso"/></th>
                        <th pSortableColumn="assunto" style="min-width:280px">Assunto <p-sortIcon field="assunto"/></th>
                        <th style="min-width:130px;text-align:center">Situação</th>
                        <th style="width:56px;text-align:center">Ações</th>
                    </tr>
                </ng-template>

                <ng-template #body let-ato>
                    <tr>
                        <td><p-tableCheckbox [value]="ato" /></td>
                        <td>
                            <div class="dracon-num">{{ ato.processoDracon }}</div>
                            <div style="font-size:10px;color:var(--text-color-secondary)">{{ ato.dataCriacao }}</div>
                        </td>
                        <td><span class="sei-num">{{ ato.processoSEI }}</span></td>
                        <td>
                            <div style="display:flex;flex-wrap:wrap;gap:2px">
                                @for (et of ato.etiquetas; track et.texto) {
                                    <span class="etiqueta-chip" [style.background]="et.cor" [style.color]="et.textoCor">
                                        {{ et.texto }}
                                    </span>
                                }
                                @if (ato.etiquetas.length === 0) {
                                    <span style="font-size:11px;color:var(--text-color-secondary)">—</span>
                                }
                            </div>
                        </td>
                        <td><span class="tipo-tag">{{ ato.tipoProcesso }}</span></td>
                        <td>
                            <div class="assunto" style="overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">
                                {{ ato.assunto }}
                            </div>
                        </td>
                        <td style="text-align:center">
                            <span class="situacao-badge" [ngClass]="situacaoClass(ato.situacao)">
                                <i [class]="situacaoIcon(ato.situacao)" style="font-size:10px"></i>
                                {{ ato.situacao }}
                            </span>
                        </td>
                        <td style="text-align:center">
                            <p-menu #rowMenu [model]="rowMenuItems" [popup]="true" appendTo="body" />
                            <button class="act-btn" pTooltip="Ações" tooltipPosition="left"
                                (click)="openRowMenu($event, rowMenu, ato)">
                                <i class="pi pi-ellipsis-v"></i>
                            </button>
                        </td>
                    </tr>
                </ng-template>

                <ng-template #emptymessage>
                    <tr>
                        <td colspan="8" style="text-align:center;padding:48px;color:var(--text-color-secondary)">
                            <i class="pi pi-folder-open" style="font-size:36px;display:block;margin-bottom:12px;opacity:.4"></i>
                            Nenhum ato encontrado
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>

        <!-- ─── DRAWER: EXPANDIR ATO ─── -->
        <p-drawer
            [(visible)]="drawerVisible"
            position="right"
            [style]="{'width':'480px'}"
            [header]="expandAto?.processoDracon ?? 'Detalhes do ato'"
        >
            @if (expandAto) {
                <div style="padding:4px 0">
                    <div class="detail-row">
                        <span class="detail-label">Processo Drácon</span>
                        <span class="detail-value" style="font-weight:700">{{ expandAto.processoDracon }}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Processo SEI</span>
                        <span class="detail-value">{{ expandAto.processoSEI }}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Tipo</span>
                        <span class="detail-value">{{ expandAto.tipoProcesso }}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Assunto</span>
                        <span class="detail-value">{{ expandAto.assunto }}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Situação</span>
                        <span class="situacao-badge" [ngClass]="situacaoClass(expandAto.situacao)" style="font-size:11px">
                            {{ expandAto.situacao }}
                        </span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Prioridade</span>
                        <span class="detail-value">{{ expandAto.prioridade }}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Responsável</span>
                        <span class="detail-value">{{ expandAto.responsavel }}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Unidade</span>
                        <span class="detail-value">{{ expandAto.unidade }}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Data de criação</span>
                        <span class="detail-value">{{ expandAto.dataCriacao }}</span>
                    </div>
                    <div class="detail-row" style="margin-top:4px">
                        <span class="detail-label">Etiquetas</span>
                        <div style="display:flex;flex-wrap:wrap;gap:4px">
                            @for (et of expandAto.etiquetas; track et.texto) {
                                <span class="etiqueta-chip" [style.background]="et.cor" [style.color]="et.textoCor">{{ et.texto }}</span>
                            }
                            @if (expandAto.etiquetas.length === 0) {
                                <span style="font-size:12px;color:var(--text-color-secondary)">Nenhuma etiqueta</span>
                            }
                        </div>
                    </div>

                    <div style="margin-top:24px;padding-top:20px;border-top:1px solid var(--surface-border)">
                        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-color-secondary);margin-bottom:12px">
                            Ações disponíveis
                        </div>
                        <div style="display:flex;flex-direction:column;gap:8px">
                            <p-button label="Alterar situação" icon="pi pi-pencil" severity="secondary" [outlined]="true" size="small"
                                [style]="{'width':'100%'}" (click)="navegarParaAlterarSituacao(expandAto)" />
                            <p-button label="Nova tramitação" icon="pi pi-send" severity="secondary" [outlined]="true" size="small"
                                [style]="{'width':'100%'}" (click)="navegarParaTramitacao(expandAto)" />
                            <p-button label="Visualizar versões" icon="pi pi-history" severity="secondary" [outlined]="true" size="small"
                                [style]="{'width':'100%'}" (click)="navegarParaVersoes(expandAto)" />
                            <p-button label="Auditoria do ato" icon="pi pi-list" severity="secondary" [outlined]="true" size="small"
                                [style]="{'width':'100%'}" (click)="router.navigate(['/dracon/atos/auditoria']); drawerVisible=false" />
                        </div>
                    </div>
                </div>
            }
        </p-drawer>
    `
})
export class DraconListarAtos implements OnInit {
    private toast = inject(MessageService);
    router        = inject(Router);

    atos: Ato[]         = [...MOCK_ATOS];
    atosFiltrados: Ato[] = [];
    selectedAtos: Ato[] = [];
    activeTab           = 'todos';

    filtrosExpandidos = false;
    filtro = {
        tipoNumero:   null as string | null,
        numero:       '',
        tipoModelo:   null as string | null,
        situacao:     null as string | null,
        responsavel:  '',
        dataCriacao:  null as Date | null,
        dataConclusao: null as Date | null,
    };

    rowMenuItems: MenuItem[] = [];
    selectedAtoForMenu: Ato | null = null;

    drawerVisible = false;
    expandAto: Ato | null = null;

    tipoNumeroOpts  = ['Ato', 'Processo', 'SEI'].map(v => ({ label: v, value: v }));
    tipoModeloOpts  = ['Decreto', 'Portaria', 'Instrução Normativa', 'Resolução', 'Despacho', 'Memorando'].map(v => ({ label: v, value: v }));
    situacaoOpts    = ['Em elaboração', 'Publicado', 'Cancelado', 'Em análise', 'Aprovado'].map(v => ({ label: v, value: v }));

    ngOnInit() { this.atosFiltrados = [...this.atos]; }

    filtrar() { this.atosFiltrados = [...this.atos]; }
    limparFiltros() {
        this.filtro = { tipoNumero: null, numero: '', tipoModelo: null, situacao: null, responsavel: '', dataCriacao: null, dataConclusao: null };
        this.atosFiltrados = [...this.atos];
    }

    countNaoLidos() { return this.atos.filter(a => a.situacao === 'Em elaboração').length; }
    countMeus()     { return this.atos.filter(a => a.responsavel.toLowerCase().includes('luciano')).length; }

    situacaoClass(s: string): string {
        const m: Record<string, string> = {
            'Em elaboração': 'sit-elaboracao', 'Publicado': 'sit-publicado',
            'Cancelado': 'sit-cancelado', 'Em análise': 'sit-analise', 'Aprovado': 'sit-aprovado',
        };
        return m[s] ?? '';
    }

    situacaoIcon(s: string): string {
        const m: Record<string, string> = {
            'Em elaboração': 'pi pi-pencil', 'Publicado': 'pi pi-check-circle',
            'Cancelado': 'pi pi-times-circle', 'Em análise': 'pi pi-clock', 'Aprovado': 'pi pi-verified',
        };
        return m[s] ?? 'pi pi-circle';
    }

    openRowMenu(event: Event, menu: Menu, ato: Ato) {
        this.selectedAtoForMenu = ato;
        this.rowMenuItems = [
            { label: 'Tramitar processo',   icon: 'pi pi-send',        command: () => this.navegarParaTramitacao(ato) },
            { label: 'Alterar situação',    icon: 'pi pi-pencil',      command: () => this.navegarParaAlterarSituacao(ato) },
            { label: 'Expandir ato',        icon: 'pi pi-expand',      command: () => { this.expandAto = ato; this.drawerVisible = true; } },
            { separator: true },
            { label: 'Visualizar versões',  icon: 'pi pi-history',     command: () => this.navegarParaVersoes(ato) },
            { label: 'Auditoria do ato',    icon: 'pi pi-list',        command: () => this.router.navigate(['/dracon/atos/auditoria']) },
            { separator: true },
            { label: 'Inserir ato',         icon: 'pi pi-plus-circle', command: () => this.emBreve('Inserir ato') },
            { label: 'Cancelar processo',   icon: 'pi pi-times-circle',command: () => this.emBreve('Cancelar processo') },
            { label: 'Documentos SEI',      icon: 'pi pi-file',        command: () => this.emBreve('Visualizar documentos SEI') },
            { separator: true },
            { label: 'Desvincular etiquetas', icon: 'pi pi-tag',       command: () => this.emBreve('Desvincular etiquetas') },
            { label: 'Histórico de etiquetas', icon: 'pi pi-clock',    command: () => this.emBreve('Histórico de etiquetas') },
        ];
        menu.toggle(event);
    }

    navegarParaAlterarSituacao(ato: Ato) {
        this.drawerVisible = false;
        this.router.navigate(['/dracon/atos/alterar-situacao', ato.id]);
    }
    navegarParaTramitacao(ato: Ato) {
        this.drawerVisible = false;
        this.router.navigate(['/dracon/atos/tramitacao', ato.id]);
    }
    navegarParaVersoes(ato: Ato) {
        this.drawerVisible = false;
        this.router.navigate(['/dracon/atos/versoes', ato.id]);
    }

    novoAto() {
        this.emBreve('Criar novo ato');
    }

    emBreve(label: string) {
        this.toast.add({ severity: 'info', summary: 'Em breve', detail: `"${label}" estará disponível em breve.`, life: 3000 });
    }
}
