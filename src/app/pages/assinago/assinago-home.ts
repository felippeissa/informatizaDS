import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TagModule } from 'primeng/tag';
import { TabsModule } from 'primeng/tabs';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputOtpModule } from 'primeng/inputotp';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TextareaModule } from 'primeng/textarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';

export interface Documento {
    id: number;
    bloco: string;
    titulo: string;
    assinadores: { nome: string; iniciais: string; cor: string }[];
    dataStatus: string;
    status: 'assinado' | 'pendente' | 'expirado' | 'recusado' | 'aguardando';
    expandido?: boolean;
    filhos?: Documento[];
    _isFilho?: boolean;
}

const CORES = ['#3ACC75', '#0EA5E9', '#F97316', '#A855F7', '#EF4444', '#14B8A6'];
function cor(i: number) { return CORES[i % CORES.length]; }

const INITIAL_DOCS: Documento[] = [
    {
        id: 1, bloco: 'SIS - Contratação',
        titulo: 'Portaria de contratação 2000',
        assinadores: [
            { nome: 'Ana Paula',  iniciais: 'AP', cor: cor(0) },
            { nome: 'Bruno Lima', iniciais: 'BL', cor: cor(1) },
            { nome: 'Carla Dias', iniciais: 'CD', cor: cor(2) },
            { nome: 'Daniel S.',  iniciais: 'DS', cor: cor(3) },
        ],
        dataStatus: '03/12/2024 10:00:00', status: 'assinado', expandido: false,
        filhos: [
            { id: 101, bloco: 'SIS - Contratação', titulo: 'Anexo I — Memorial descritivo', assinadores: [{ nome: 'Ana Paula', iniciais: 'AP', cor: cor(0) }], dataStatus: '03/12/2024 10:00:00', status: 'assinado' },
            { id: 102, bloco: 'SIS - Contratação', titulo: 'Anexo II — Planilha de custos',  assinadores: [{ nome: 'Bruno Lima', iniciais: 'BL', cor: cor(1) }], dataStatus: '03/12/2024 10:00:00', status: 'assinado' },
        ]
    },
    { id: 2, bloco: 'SIS - Contratação', titulo: 'Portaria de contratação 2001', assinadores: [{ nome: 'Eva Torres', iniciais: 'ET', cor: cor(4) }], dataStatus: '03/12/2024 10:00:00', status: 'assinado' },
    { id: 3, bloco: 'SIS - Contratação', titulo: 'Portaria de contratação 2002',
        assinadores: [{ nome: 'Felipe R.', iniciais: 'FR', cor: cor(0) }, { nome: 'Gabi S.', iniciais: 'GS', cor: cor(1) }, { nome: 'Hugo P.', iniciais: 'HP', cor: cor(2) }, { nome: 'Íris N.', iniciais: 'IN', cor: cor(3) }],
        dataStatus: '03/12/2024 10:00:00', status: 'assinado' },
    { id: 4, bloco: 'SIS - Contratação', titulo: 'Portaria de contratação 2003', assinadores: [{ nome: 'Julia M.',  iniciais: 'JM', cor: cor(5) }], dataStatus: '03/12/2024 10:00:00', status: 'assinado' },
    { id: 5, bloco: 'SIS - Contratação', titulo: 'Portaria de contratação 3000',
        assinadores: [{ nome: 'Kayo B.', iniciais: 'KB', cor: cor(0) }, { nome: 'Lara C.', iniciais: 'LC', cor: cor(1) }, { nome: 'Murilo F.', iniciais: 'MF', cor: cor(2) }, { nome: 'Nina G.', iniciais: 'NG', cor: cor(3) }],
        dataStatus: '03/12/2024 10:00:00', status: 'pendente' },
    { id: 6, bloco: 'SIS - Contratação', titulo: 'Portaria de contratação 3001', assinadores: [{ nome: 'Otávio L.', iniciais: 'OL', cor: cor(4) }], dataStatus: '03/12/2024 10:00:00', status: 'pendente' },
    { id: 7, bloco: 'SIS - Contratação', titulo: 'Portaria de contratação 3002',
        assinadores: [{ nome: 'Paula T.', iniciais: 'PT', cor: cor(0) }, { nome: 'Rafa W.', iniciais: 'RW', cor: cor(1) }, { nome: 'Sara X.', iniciais: 'SX', cor: cor(2) }, { nome: 'Tiago Z.', iniciais: 'TZ', cor: cor(3) }],
        dataStatus: '03/12/2024 10:00:00', status: 'expirado' },
    { id: 8, bloco: 'SIS - Contratação', titulo: 'Portaria de contratação 4000',
        assinadores: [{ nome: 'Ubiratan A.', iniciais: 'UA', cor: cor(0) }, { nome: 'Vera B.', iniciais: 'VB', cor: cor(1) }, { nome: 'Wagner C.', iniciais: 'WC', cor: cor(2) }, { nome: 'Xênia D.', iniciais: 'XD', cor: cor(3) }],
        dataStatus: '03/12/2024 10:00:00', status: 'recusado' },
    { id: 9, bloco: 'SIS - Contratação',  titulo: 'Portaria de contratação 4001', assinadores: [{ nome: 'Yara E.', iniciais: 'YE', cor: cor(4) }], dataStatus: '10/12/2024 10:00:00', status: 'recusado' },
    { id: 10, bloco: 'SIS - Contratação', titulo: 'Portaria de contratação 4002',
        assinadores: [{ nome: 'Zé F.', iniciais: 'ZF', cor: cor(0) }, { nome: 'Alice G.', iniciais: 'AG', cor: cor(1) }, { nome: 'Bob H.', iniciais: 'BH', cor: cor(2) }, { nome: 'Cris I.', iniciais: 'CI', cor: cor(3) }],
        dataStatus: '11/12/2024 10:00:00', status: 'recusado' },
    { id: 11, bloco: 'RH - Admissão', titulo: 'Termo de posse Concurso 2024', assinadores: [{ nome: 'Diana J.', iniciais: 'DJ', cor: cor(5) }], dataStatus: '12/12/2024 09:00:00', status: 'aguardando' },
    { id: 12, bloco: 'RH - Admissão', titulo: 'Portaria de nomeação nº 88',     assinadores: [{ nome: 'Eduardo K.', iniciais: 'EK', cor: cor(0) }], dataStatus: '15/12/2024 14:30:00', status: 'aguardando' },
    { id: 13, bloco: 'SEFAZ - Financeiro', titulo: 'Contrato de prestação de serviços 001', assinadores: [{ nome: 'Fernanda L.', iniciais: 'FL', cor: cor(1) }, { nome: 'Gustavo M.', iniciais: 'GM', cor: cor(2) }], dataStatus: '20/12/2024 08:00:00', status: 'pendente' },
    { id: 14, bloco: 'SEFAZ - Financeiro', titulo: 'Nota de empenho 2024/4521', assinadores: [{ nome: 'Helena N.', iniciais: 'HN', cor: cor(3) }], dataStatus: '22/12/2024 11:00:00', status: 'assinado' },
    { id: 15, bloco: 'SEFAZ - Financeiro', titulo: 'Ordem de pagamento 888',    assinadores: [{ nome: 'Igor O.', iniciais: 'IO', cor: cor(4) }, { nome: 'Joana P.', iniciais: 'JP', cor: cor(5) }], dataStatus: '28/12/2024 16:00:00', status: 'assinado' },
    { id: 16, bloco: 'GABINETE',           titulo: 'Memorando 087/2024 — Gov. do Estado', assinadores: [{ nome: 'Kleber Q.', iniciais: 'KQ', cor: cor(0) }, { nome: 'Larissa R.', iniciais: 'LR', cor: cor(1) }], dataStatus: '30/12/2024 17:00:00', status: 'recusado' },
];

@Component({
    selector: 'app-assinago-home',
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        ButtonModule, InputTextModule, IconFieldModule, InputIconModule,
        SelectModule, DatePickerModule,
        TableModule, CheckboxModule,
        AvatarModule, AvatarGroupModule,
        TagModule, TabsModule, TooltipModule, DividerModule,
        DialogModule, FileUploadModule, InputOtpModule,
        RadioButtonModule, TextareaModule,
        ProgressSpinnerModule, ProgressBarModule,
    ],
    styles: [`
        :host { --assa-green: #3ACC75; --assa-green-light: #ECFDF5; }

        .page-header { margin-bottom: 24px; display:flex; justify-content:space-between; align-items:flex-start; }
        .breadcrumb  { font-size: 12px; color: var(--text-color-secondary); margin-bottom: 4px; }
        .page-title  { font-size: 28px; font-weight: 800; color: var(--text-color); margin: 0; }

        .tab-badge {
            display: inline-flex; align-items: center; justify-content: center;
            background: var(--surface-border); color: var(--text-color-secondary);
            font-size: 10px; font-weight: 700;
            width: 20px; height: 20px; border-radius: 50%;
            margin-left: 6px;
        }
        .tab-badge.active { background: var(--assa-green, #3ACC75); color: #fff; }

        .filter-bar {
            display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
            padding: 14px 16px;
            background: var(--surface-card);
            border: 1px solid var(--surface-border);
            border-radius: 10px 10px 0 0;
            border-bottom: none;
        }

        .action-bar {
            display: flex; align-items: center; gap: 8px;
            padding: 10px 16px;
            background: var(--surface-card);
            border: 1px solid var(--surface-border);
            border-top: 1px solid var(--surface-border);
            border-bottom: none;
        }

        ::ng-deep .assa-table .p-datatable-table-container { border-radius: 0 0 10px 10px; }
        ::ng-deep .assa-table .p-datatable-thead > tr > th {
            background: var(--surface-ground) !important;
            font-size: 12px; font-weight: 700;
            color: var(--text-color-secondary) !important;
            border-bottom: 1px solid var(--surface-border) !important;
            padding: 10px 12px !important;
        }
        ::ng-deep .assa-table .p-datatable-tbody > tr > td {
            padding: 11px 12px !important;
            border-bottom: 1px solid var(--surface-border) !important;
            font-size: 13px;
        }
        ::ng-deep .assa-table .p-datatable-tbody > tr:last-child > td { border-bottom: none !important; }
        ::ng-deep .assa-table .p-datatable-tbody > tr:hover > td { background: var(--surface-ground) !important; }

        .bloco-text { font-size: 12px; color: var(--text-color-secondary); }
        .doc-expand-btn {
            background: none; border: none; cursor: pointer;
            color: var(--text-color-secondary); padding: 2px 4px; margin-right: 4px;
            border-radius: 4px; transition: background .12s;
        }
        .doc-expand-btn:hover { background: var(--surface-border); }
        .doc-title  { font-size: 13px; font-weight: 500; color: var(--text-color); }
        .doc-filho  { font-size: 12px; color: var(--text-color-secondary); padding-left: 24px; }

        .avatar-group { display: flex; align-items: center; }
        .av {
            width: 28px; height: 28px; border-radius: 50%;
            border: 2px solid var(--surface-card);
            display: flex; align-items: center; justify-content: center;
            font-size: 9px; font-weight: 700; color: #fff;
            margin-left: -8px; flex-shrink: 0;
        }
        .av:first-child { margin-left: 0; }
        .av-extra { background: var(--surface-border); color: var(--text-color-secondary); font-size: 9px; font-weight: 700; }

        .status-text { font-size: 12px; font-weight: 700; }
        .status-date { font-size: 11px; color: var(--text-color-secondary); margin-bottom: 2px; }
        .s-assinado   { color: #059669; }
        .s-pendente   { color: #D97706; }
        .s-expirado   { color: #6B7280; }
        .s-recusado   { color: #DC2626; }
        .s-aguardando { color: #0EA5E9; }

        .act-btn {
            width: 30px; height: 30px; border-radius: 6px;
            border: 1px solid var(--surface-border);
            background: var(--surface-card);
            display: inline-flex; align-items: center; justify-content: center;
            cursor: pointer; transition: all .12s;
            color: var(--text-color-secondary); font-size: 13px;
        }
        .act-btn:hover       { background: var(--surface-hover); }
        .act-btn.download:hover { background: #EFF6FF; border-color: #3B82F6; color: #3B82F6; }
        .act-btn.view:hover     { background: #F0FDF4; border-color: #3ACC75; color: #3ACC75; }
        .act-btn.edit:hover     { background: #FFF7ED; border-color: #F97316; color: #F97316; }

        .child-row > td { background: var(--surface-ground) !important; }
        .child-row > td:first-child { border-left: 3px solid var(--assa-green, #3ACC75) !important; }

        /* ── viewer ── */
        .viewer-doc-item { cursor: pointer; border-radius: 6px; margin-bottom: 2px; transition: background .1s; }
        .viewer-doc-item:hover > div { background: var(--surface-hover) !important; }

        /* ── metodo cards ── */
        .metodo-card {
            border: 2px solid var(--surface-border);
            border-radius: 10px; padding: 16px;
            cursor: pointer; transition: all .15s;
            display: flex; align-items: center; gap: 14px;
            margin-bottom: 10px;
        }
        .metodo-card:hover { border-color: #3ACC75; background: #F0FDF4; }
        .metodo-card.selected { border-color: #3ACC75; background: #F0FDF4; box-shadow: 0 0 0 3px rgba(58,204,117,.15); }
        .metodo-icon {
            width: 44px; height: 44px; border-radius: 10px;
            display: flex; align-items: center; justify-content: center;
            font-size: 18px; flex-shrink: 0;
        }
        .metodo-nome { font-size: 14px; font-weight: 700; color: var(--text-color); margin: 0 0 2px; }
        .metodo-desc { font-size: 12px; color: var(--text-color-secondary); margin: 0; }

        /* ── novo doc stepper ── */
        .step-header {
            display: flex; align-items: center;
            margin-bottom: 24px; padding-bottom: 20px;
            border-bottom: 1px solid var(--surface-border);
        }
        .step-item { display: flex; align-items: center; }
        .step-circle {
            width: 28px; height: 28px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-size: 12px; font-weight: 700; flex-shrink: 0;
            border: 2px solid var(--surface-border);
            color: var(--text-color-secondary);
            background: var(--surface-card);
            transition: all .15s;
        }
        .step-circle.active { border-color: #3ACC75; background: #3ACC75; color: #fff; }
        .step-circle.done   { border-color: #3ACC75; background: #3ACC75; color: #fff; }
        .step-label { font-size: 12px; font-weight: 600; color: var(--text-color-secondary); margin-left: 8px; white-space: nowrap; }
        .step-label.active { color: var(--text-color); }
        .step-line { flex: 1; height: 2px; background: var(--surface-border); margin: 0 12px; }
        .step-line.done { background: #3ACC75; }

        .form-field { display:flex; flex-direction:column; gap:6px; margin-bottom:14px; }
        .form-field label { font-size:12px; font-weight:700; color:var(--text-color-secondary); }

        .assinador-row {
            display: flex; align-items: center; gap: 8px;
            padding: 8px 10px; border-radius: 8px;
            background: var(--surface-ground);
            border: 1px solid var(--surface-border);
            margin-bottom: 6px;
        }
        .assinador-ordem {
            width: 20px; height: 20px; border-radius: 50%;
            background: #3ACC75; color: #fff;
            display: flex; align-items: center; justify-content: center;
            font-size: 10px; font-weight: 700; flex-shrink: 0;
        }

        /* ── success ── */
        .success-state { text-align: center; padding: 32px 16px; }
        .success-icon {
            width: 72px; height: 72px; border-radius: 50%;
            background: #DCFCE7; display: flex; align-items: center; justify-content: center;
            margin: 0 auto 20px; font-size: 28px; color: #059669;
        }
    `],
    template: `
        <!-- ─── PAGE HEADER ─── -->
        <div class="page-header">
            <div>
                <div class="breadcrumb">Página inicial</div>
                <h1 class="page-title">Página inicial</h1>
            </div>
            <p-button
                label="Novo documento"
                icon="pi pi-plus"
                [style]="{'background':'#3ACC75','border-color':'#3ACC75'}"
                (click)="openNovoDoc()"
            />
        </div>

        <!-- ─── TABS ─── -->
        <p-tabs [(value)]="activeTab" styleClass="mb-0">
            <p-tablist>
                <p-tab value="todos">
                    Todos os meus documentos
                    <span class="tab-badge" [class.active]="activeTab === 'todos'">{{ docs.length }}</span>
                </p-tab>
                <p-tab value="assinados">
                    Assinados por mim
                    <span class="tab-badge" [class.active]="activeTab === 'assinados'">{{ countByStatus('assinado') }}</span>
                </p-tab>
                <p-tab value="aguardando">
                    Aguardando minha assinatura
                    <span class="tab-badge" [class.active]="activeTab === 'aguardando'">{{ countByStatus('aguardando') + countByStatus('pendente') }}</span>
                </p-tab>
                <p-tab value="recusados">
                    Recusados por mim
                    <span class="tab-badge" [class.active]="activeTab === 'recusados'">{{ countByStatus('recusado') }}</span>
                </p-tab>
            </p-tablist>
        </p-tabs>

        <!-- ─── FILTER BAR ─── -->
        <div class="filter-bar">
            <p-iconfield style="flex:1;min-width:200px">
                <p-inputicon styleClass="pi pi-search" />
                <input pInputText [(ngModel)]="searchTerm" placeholder="Buscar um documento ou autor" style="width:100%" />
            </p-iconfield>

            <p-select [(ngModel)]="filterBloco" [options]="blocoOptions" optionLabel="label" optionValue="value"
                placeholder="Bloco de assinatura" [showClear]="true" style="min-width:200px" />

            <p-select [(ngModel)]="filterTipo" [options]="tipoOptions" optionLabel="label" optionValue="value"
                placeholder="Tipo de documento" [showClear]="true" style="min-width:180px" />

            <p-select [(ngModel)]="filterStatus" [options]="statusOptions" optionLabel="label" optionValue="value"
                placeholder="Status do documento" [showClear]="true" style="min-width:190px" />

            <p-datepicker [(ngModel)]="filterPeriodo" selectionMode="range" [readonlyInput]="true"
                placeholder="Período" style="min-width:180px" dateFormat="dd/mm/yy" />

            <p-button label="Limpar" severity="secondary" [text]="true" icon="pi pi-filter-slash" (click)="limparFiltros()" />
        </div>

        <!-- ─── ACTION BAR ─── -->
        <div class="action-bar">
            <p-button label="Download" icon="pi pi-download" severity="secondary" [outlined]="true" size="small" [disabled]="selectedDocs.length === 0" />
            <p-button label="Compartilhar link" icon="pi pi-share-alt" severity="secondary" [outlined]="true" size="small" [disabled]="selectedDocs.length === 0" />
            <p-button
                label="Assinar documentos" icon="pi pi-pen-to-square" size="small"
                [style]="{'background':'#3ACC75','border-color':'#3ACC75'}"
                [disabled]="selectedDocsAssinaveis.length === 0"
                (click)="openAssinarSelecionados()"
            />
        </div>

        <!-- ─── TABLE ─── -->
        <p-table [value]="docsVisiveis" [(selection)]="selectedDocs" dataKey="id"
            styleClass="p-datatable-sm assa-table" [tableStyle]="{'min-width':'100%'}"
            [paginator]="true" [rows]="10" [rowsPerPageOptions]="[10, 25, 50]" paginatorDropdownAppendTo="body">

            <ng-template #header>
                <tr>
                    <th style="width:40px"><p-tableHeaderCheckbox /></th>
                    <th pSortableColumn="bloco" style="min-width:160px">Bloco de assinatura <p-sortIcon field="bloco" /></th>
                    <th pSortableColumn="titulo" style="min-width:300px">Documento <p-sortIcon field="titulo" /></th>
                    <th style="min-width:120px">Assinadores</th>
                    <th pSortableColumn="dataStatus" style="min-width:180px">Status do documento <p-sortIcon field="dataStatus" /></th>
                    <th style="width:110px;text-align:center">Ações</th>
                </tr>
            </ng-template>

            <ng-template #body let-doc>
                <tr [ngClass]="{'child-row': doc._isFilho}">
                    <td><p-tableCheckbox [value]="doc" /></td>
                    <td><span class="bloco-text">{{ doc.bloco }}</span></td>
                    <td>
                        <div style="display:flex;align-items:center">
                            @if (doc.filhos?.length) {
                                <button class="doc-expand-btn" (click)="toggleExpand(doc)">
                                    <i [class]="doc.expandido ? 'pi pi-chevron-down' : 'pi pi-chevron-right'" style="font-size:11px"></i>
                                </button>
                            } @else if (doc._isFilho) {
                                <span style="width:20px;display:inline-block"></span>
                            }
                            <span [class]="doc._isFilho ? 'doc-filho' : 'doc-title'">{{ doc.titulo }}</span>
                        </div>
                    </td>
                    <td>
                        <div class="avatar-group">
                            @for (a of doc.assinadores.slice(0, 3); track a.iniciais) {
                                <div class="av" [style.background]="a.cor" [pTooltip]="a.nome" tooltipPosition="top">{{ a.iniciais }}</div>
                            }
                            @if (doc.assinadores.length > 3) {
                                <div class="av av-extra">+{{ doc.assinadores.length - 3 }}</div>
                            }
                        </div>
                    </td>
                    <td>
                        <div class="status-date">{{ doc.dataStatus }}</div>
                        <div class="status-text" [ngClass]="'s-' + doc.status">{{ statusLabel(doc.status) }}</div>
                    </td>
                    <td style="text-align:center">
                        <div style="display:flex;align-items:center;justify-content:center;gap:4px">
                            <button class="act-btn download" pTooltip="Baixar" tooltipPosition="top">
                                <i class="pi pi-download"></i>
                            </button>
                            <button class="act-btn view" pTooltip="Visualizar" tooltipPosition="top" (click)="openViewer(doc)">
                                <i class="pi pi-eye"></i>
                            </button>
                            <button class="act-btn edit" pTooltip="Editar" tooltipPosition="top">
                                <i class="pi pi-pencil"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </ng-template>

            <ng-template #emptymessage>
                <tr>
                    <td colspan="6" style="text-align:center;padding:40px;color:var(--text-color-secondary)">
                        <i class="pi pi-folder-open" style="font-size:32px;display:block;margin-bottom:12px;opacity:.4"></i>
                        Nenhum documento encontrado
                    </td>
                </tr>
            </ng-template>
        </p-table>


        <!-- ═══════════════════════════════════════════
             DIALOG: VISUALIZAR DOCUMENTO
        ═══════════════════════════════════════════ -->
        <p-dialog
            [(visible)]="viewerVisible"
            [modal]="true"
            [draggable]="false"
            [resizable]="false"
            [style]="{'width':'92vw','max-width':'1280px','height':'87vh'}"
            [contentStyle]="{'padding':'0','overflow':'hidden','display':'flex','flex-direction':'column','height':'100%'}"
            styleClass="viewer-dialog"
        >
            <ng-template #header>
                @if (viewerDoc) {
                    <div style="display:flex;align-items:center;gap:12px">
                        <i class="pi pi-file-pdf" style="font-size:18px;color:#EF4444"></i>
                        <span style="font-weight:700;font-size:15px">{{ viewerDoc.titulo }}</span>
                        <span class="status-text" [ngClass]="'s-' + viewerDoc.status" style="font-size:12px">
                            {{ statusLabel(viewerDoc.status) }}
                        </span>
                    </div>
                }
            </ng-template>

            @if (viewerDoc) {
                <div style="display:grid;grid-template-columns:280px 1fr;flex:1;overflow:hidden;height:100%">

                    <!-- Left: batch list -->
                    <div style="border-right:1px solid var(--surface-border);overflow-y:auto;padding:12px;background:var(--surface-card)">
                        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-color-secondary);margin-bottom:8px;padding:2px 6px">
                            Bloco: {{ viewerDoc.bloco }}
                        </div>
                        @for (d of viewerDocsBatch; track d.id) {
                            <div class="viewer-doc-item" (click)="viewerDoc = d">
                                <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;border-radius:6px;transition:background .1s"
                                     [style.background]="d.id === viewerDoc.id ? 'color-mix(in srgb,#3ACC75 10%,transparent)' : 'transparent'"
                                     [style.border]="d.id === viewerDoc.id ? '1px solid color-mix(in srgb,#3ACC75 30%,transparent)' : '1px solid transparent'"
                                >
                                    <i class="pi pi-file" style="color:#EF4444;font-size:14px;flex-shrink:0;margin-top:2px"></i>
                                    <div style="flex:1;min-width:0">
                                        <div style="font-size:12px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--text-color)">{{ d.titulo }}</div>
                                        <div class="status-text" [ngClass]="'s-' + d.status" style="font-size:11px;margin-top:1px">{{ statusLabel(d.status) }}</div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                    <!-- Right: PDF mock + actions -->
                    <div style="display:flex;flex-direction:column;overflow:hidden">

                        <!-- PDF viewer area -->
                        <div style="flex:1;overflow:auto;background:#E5E7EB;display:flex;justify-content:center;padding:24px 32px">
                            <div style="background:#fff;width:100%;max-width:680px;min-height:960px;box-shadow:0 4px 32px rgba(0,0,0,.15);border-radius:3px;padding:72px 80px;font-family:'Georgia',serif;color:#1F2937">
                                <!-- Mock PDF header -->
                                <div style="text-align:center;margin-bottom:40px;padding-bottom:24px;border-bottom:2px solid #E5E7EB">
                                    <div style="font-size:10px;font-weight:700;letter-spacing:.15em;color:#6B7280;text-transform:uppercase;margin-bottom:8px">
                                        GOVERNO DO ESTADO — SECRETARIA DE TI
                                    </div>
                                    <div style="font-size:9px;color:#9CA3AF">CNPJ 00.000.000/0001-00 • Rua das Flores, 123 — Maceió/AL</div>
                                </div>

                                <h2 style="text-align:center;font-size:18px;font-weight:700;margin:0 0 8px;text-transform:uppercase">
                                    {{ viewerDoc.titulo }}
                                </h2>
                                <div style="text-align:center;font-size:12px;color:#6B7280;margin-bottom:32px">
                                    Bloco: {{ viewerDoc.bloco }} · {{ viewerDoc.dataStatus }}
                                </div>

                                <p style="font-size:13px;line-height:2;text-align:justify;margin-bottom:16px">
                                    O SECRETÁRIO DE ESTADO DE TI, no uso das atribuições que lhe são conferidas pela Lei nº 7.102, de 20 de junho de 2010, e tendo em vista o que consta no processo administrativo nº 003456/2024-SETIN, <strong>RESOLVE:</strong>
                                </p>
                                <p style="font-size:13px;line-height:2;text-align:justify;margin-bottom:16px">
                                    Art. 1º — Fica autorizada a contratação dos serviços descritos no presente instrumento, conforme especificações técnicas constantes no Anexo I deste documento.
                                </p>
                                <p style="font-size:13px;line-height:2;text-align:justify;margin-bottom:16px">
                                    Art. 2º — As despesas decorrentes desta contratação correrão por conta das dotações consignadas no orçamento vigente, conforme nota de empenho correspondente.
                                </p>
                                <p style="font-size:13px;line-height:2;text-align:justify;margin-bottom:32px">
                                    Art. 3º — Esta portaria entra em vigor na data de sua publicação, revogadas as disposições em contrário.
                                </p>

                                <!-- Signature boxes -->
                                <div style="margin-top:56px;display:grid;grid-template-columns:repeat({{ viewerDoc.assinadores.length > 1 ? 2 : 1 }},1fr);gap:20px">
                                    @for (a of viewerDoc.assinadores; track a.iniciais) {
                                        <div style="border:1px solid #D1D5DB;border-radius:4px;padding:20px 16px;text-align:center;min-height:80px">
                                            @if (viewerDoc.status === 'assinado') {
                                                <div [style.color]="a.cor" style="font-size:22px;font-style:italic;margin-bottom:6px;letter-spacing:.03em">
                                                    {{ a.nome }}
                                                </div>
                                                <div style="font-size:10px;color:#059669;font-weight:700">
                                                    <i class="pi pi-check-circle" style="margin-right:4px"></i>Assinado digitalmente
                                                </div>
                                                <div style="font-size:10px;color:#9CA3AF;margin-top:2px">{{ viewerDoc.dataStatus }}</div>
                                            } @else {
                                                <div style="height:32px;margin-bottom:10px"></div>
                                                <div style="border-top:1px solid #D1D5DB;padding-top:8px;font-size:11px;color:#6B7280">{{ a.nome }}</div>
                                            }
                                        </div>
                                    }
                                </div>

                                <!-- QR Code mock -->
                                <div style="margin-top:48px;padding-top:24px;border-top:1px dashed #D1D5DB;display:flex;align-items:center;gap:16px">
                                    <div style="width:60px;height:60px;border:1px solid #E5E7EB;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0">
                                        <i class="pi pi-qrcode" style="font-size:32px;color:#D1D5DB"></i>
                                    </div>
                                    <div>
                                        <div style="font-size:9px;color:#9CA3AF">Documento assinado digitalmente via AssinaGO</div>
                                        <div style="font-size:9px;color:#9CA3AF">Código: ASSA-2024-{{ viewerDoc.id.toString().padStart(3,'0') }}</div>
                                        <div style="font-size:9px;color:#9CA3AF">Validar em: assinago.gov.br/validar</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Footer actions -->
                        @if (viewerDoc.status === 'pendente' || viewerDoc.status === 'aguardando') {
                            <div style="padding:16px 24px;border-top:1px solid var(--surface-border);display:flex;justify-content:space-between;align-items:center;background:var(--surface-card);flex-shrink:0">
                                <p-button
                                    label="Recusar documento"
                                    severity="danger"
                                    [outlined]="true"
                                    icon="pi pi-times-circle"
                                    (click)="openRecusar()"
                                />
                                <p-button
                                    label="Assinar documento"
                                    icon="pi pi-pen-to-square"
                                    [style]="{'background':'#3ACC75','border-color':'#3ACC75'}"
                                    (click)="openAssinar()"
                                />
                            </div>
                        } @else {
                            <div style="padding:12px 24px;border-top:1px solid var(--surface-border);display:flex;justify-content:flex-end;background:var(--surface-card);flex-shrink:0">
                                <p-button label="Fechar" severity="secondary" [outlined]="true" (click)="viewerVisible = false" />
                            </div>
                        }
                    </div>
                </div>
            }
        </p-dialog>


        <!-- ═══════════════════════════════════════════
             DIALOG: ASSINAR DOCUMENTO
        ═══════════════════════════════════════════ -->
        <p-dialog
            [(visible)]="assinarVisible"
            [modal]="true"
            [draggable]="false"
            [style]="{'width':'480px'}"
            header="Assinar documento"
            (onHide)="assinarStep = 'metodo'"
        >
            <!-- STEP: escolher método -->
            @if (assinarStep === 'metodo') {
                <p style="font-size:13px;color:var(--text-color-secondary);margin:0 0 20px">
                    Escolha como deseja assinar o documento:
                </p>

                <div class="metodo-card" [class.selected]="selectedMetodo === 'token'" (click)="selectedMetodo = 'token'">
                    <div class="metodo-icon" style="background:color-mix(in srgb,#3ACC75 12%,transparent)">
                        <i class="pi pi-envelope" style="color:#059669"></i>
                    </div>
                    <div>
                        <p class="metodo-nome">Token de e-mail</p>
                        <p class="metodo-desc">Código de 6 dígitos enviado para seu e-mail</p>
                    </div>
                    @if (selectedMetodo === 'token') {
                        <i class="pi pi-check-circle" style="color:#3ACC75;margin-left:auto;font-size:18px"></i>
                    }
                </div>

                <div class="metodo-card" [class.selected]="selectedMetodo === 'certificado'" (click)="selectedMetodo = 'certificado'">
                    <div class="metodo-icon" style="background:color-mix(in srgb,#2563EB 12%,transparent)">
                        <i class="pi pi-id-card" style="color:#2563EB"></i>
                    </div>
                    <div>
                        <p class="metodo-nome">Certificado digital</p>
                        <p class="metodo-desc">Certificado A1 ou A3 homologado ICP-Brasil</p>
                    </div>
                    @if (selectedMetodo === 'certificado') {
                        <i class="pi pi-check-circle" style="color:#3ACC75;margin-left:auto;font-size:18px"></i>
                    }
                </div>

                <div class="metodo-card" [class.selected]="selectedMetodo === 'govbr'" (click)="selectedMetodo = 'govbr'">
                    <div class="metodo-icon" style="background:color-mix(in srgb,#1755A3 12%,transparent)">
                        <i class="pi pi-shield" style="color:#1755A3"></i>
                    </div>
                    <div>
                        <p class="metodo-nome">Gov.br</p>
                        <p class="metodo-desc">Autenticação com conta Gov.br nível Prata ou Ouro</p>
                    </div>
                    @if (selectedMetodo === 'govbr') {
                        <i class="pi pi-check-circle" style="color:#3ACC75;margin-left:auto;font-size:18px"></i>
                    }
                </div>

                <ng-template #footer>
                    <p-button label="Cancelar" severity="secondary" [outlined]="true" (click)="assinarVisible = false" />
                    <p-button label="Continuar" icon="pi pi-arrow-right" iconPos="right"
                        [style]="{'background':'#3ACC75','border-color':'#3ACC75'}"
                        [disabled]="!selectedMetodo" (click)="avancarAssinar()" />
                </ng-template>
            }

            <!-- STEP: token e-mail -->
            @if (assinarStep === 'token') {
                <div style="text-align:center">
                    <div style="width:56px;height:56px;border-radius:50%;background:color-mix(in srgb,#3ACC75 12%,transparent);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:22px;color:#059669">
                        <i class="pi pi-envelope"></i>
                    </div>
                    <p style="font-size:14px;font-weight:700;margin:0 0 6px">Confirme seu código</p>
                    <p style="font-size:13px;color:var(--text-color-secondary);margin:0 0 24px">
                        Um código de 6 dígitos foi enviado para<br>
                        <strong>f***&#64;setin.gov.br</strong>
                    </p>
                    <div style="display:flex;justify-content:center;margin-bottom:16px">
                        <p-inputotp [(ngModel)]="tokenCode" [length]="6" [integerOnly]="true" />
                    </div>
                    <button style="background:none;border:none;cursor:pointer;color:#3ACC75;font-size:13px;text-decoration:underline">
                        Reenviar código
                    </button>
                </div>

                <ng-template #footer>
                    <p-button label="Voltar" severity="secondary" [outlined]="true" icon="pi pi-arrow-left" (click)="assinarStep = 'metodo'" />
                    <p-button label="Confirmar assinatura"
                        [style]="{'background':'#3ACC75','border-color':'#3ACC75'}"
                        [disabled]="tokenCode.length < 6"
                        (click)="confirmarAssinatura()" />
                </ng-template>
            }

            <!-- STEP: certificado digital -->
            @if (assinarStep === 'certificado') {
                <p style="font-size:13px;color:var(--text-color-secondary);margin:0 0 20px">
                    Selecione o tipo de certificado:
                </p>

                <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px">
                    <label style="display:flex;align-items:center;gap:12px;padding:14px;border:2px solid var(--surface-border);border-radius:8px;cursor:pointer;transition:border-color .15s"
                           [style.border-color]="certTipo === 'a1' ? '#3ACC75' : 'var(--surface-border)'"
                           (click)="certTipo = 'a1'">
                        <p-radioButton [ngModel]="certTipo" value="a1" name="certTipo" (onClick)="certTipo = 'a1'" />
                        <div>
                            <div style="font-size:13px;font-weight:700">Certificado A1 (arquivo)</div>
                            <div style="font-size:12px;color:var(--text-color-secondary)">Arquivo .pfx ou .p12 armazenado no computador</div>
                        </div>
                    </label>

                    <label style="display:flex;align-items:center;gap:12px;padding:14px;border:2px solid var(--surface-border);border-radius:8px;cursor:pointer;transition:border-color .15s"
                           [style.border-color]="certTipo === 'a3' ? '#3ACC75' : 'var(--surface-border)'"
                           (click)="certTipo = 'a3'">
                        <p-radioButton [ngModel]="certTipo" value="a3" name="certTipo" (onClick)="certTipo = 'a3'" />
                        <div>
                            <div style="font-size:13px;font-weight:700">Certificado A3 (token / cartão)</div>
                            <div style="font-size:12px;color:var(--text-color-secondary)">Dispositivo físico USB ou smartcard</div>
                        </div>
                    </label>
                </div>

                @if (certTipo === 'a1') {
                    <p-fileupload
                        mode="basic"
                        accept=".pfx,.p12"
                        chooseLabel="Selecionar certificado .pfx"
                        chooseIcon="pi pi-upload"
                        [style]="{'width':'100%'}"
                    />
                } @else {
                    <div style="padding:16px;background:var(--surface-ground);border-radius:8px;display:flex;align-items:center;gap:12px">
                        <p-progressSpinner strokeWidth="4" [style]="{'width':'24px','height':'24px'}" />
                        <span style="font-size:13px;color:var(--text-color-secondary)">Aguardando dispositivo A3…</span>
                    </div>
                }

                <ng-template #footer>
                    <p-button label="Voltar" severity="secondary" [outlined]="true" icon="pi pi-arrow-left" (click)="assinarStep = 'metodo'" />
                    <p-button label="Assinar com certificado"
                        [style]="{'background':'#3ACC75','border-color':'#3ACC75'}"
                        (click)="confirmarAssinatura()" />
                </ng-template>
            }

            <!-- STEP: Gov.br -->
            @if (assinarStep === 'govbr') {
                <div style="text-align:center;padding:16px 0">
                    <div style="width:72px;height:72px;border-radius:16px;background:color-mix(in srgb,#1755A3 10%,transparent);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:28px;color:#1755A3">
                        <i class="pi pi-shield"></i>
                    </div>
                    <p style="font-size:14px;font-weight:700;margin:0 0 8px">Autenticando via Gov.br</p>
                    <p style="font-size:13px;color:var(--text-color-secondary);margin:0 0 24px">
                        Aguarde enquanto redirecionamos para a plataforma Gov.br para autenticar sua identidade.
                    </p>
                    <p-progressbar mode="indeterminate" [style]="{'height':'4px','border-radius':'2px'}" styleClass="mb-4" />
                    <p style="font-size:11px;color:var(--text-color-secondary);margin-top:16px">
                        Em um ambiente real, você seria redirecionado para login.gov.br
                    </p>
                    <p-button label="Simular autenticação com sucesso" severity="secondary" [outlined]="true"
                        styleClass="mt-4" (click)="confirmarAssinatura()" />
                </div>

                <ng-template #footer>
                    <p-button label="Cancelar" severity="secondary" [outlined]="true" (click)="assinarVisible = false" />
                </ng-template>
            }

            <!-- STEP: sucesso -->
            @if (assinarStep === 'sucesso') {
                <div class="success-state">
                    <div class="success-icon"><i class="pi pi-check"></i></div>
                    <h3 style="margin:0 0 8px;font-size:18px;font-weight:700;color:var(--text-color)">Documento assinado!</h3>
                    <p style="margin:0 0 4px;font-size:13px;color:var(--text-color-secondary)">
                        {{ viewerDoc?.titulo }}
                    </p>
                    <p style="margin:0 0 24px;font-size:12px;color:#9CA3AF">
                        Assinatura registrada com sucesso em {{ agora }}
                    </p>
                    <p-button label="Fechar" [style]="{'background':'#3ACC75','border-color':'#3ACC75'}"
                        (click)="assinarVisible = false; viewerVisible = false" />
                </div>
            }
        </p-dialog>


        <!-- ═══════════════════════════════════════════
             DIALOG: RECUSAR DOCUMENTO
        ═══════════════════════════════════════════ -->
        <p-dialog
            [(visible)]="recusarVisible"
            [modal]="true"
            [draggable]="false"
            [style]="{'width':'440px'}"
            header="Recusar documento"
        >
            <p style="font-size:13px;color:var(--text-color-secondary);margin:0 0 20px">
                Informe o motivo da recusa. O remetente será notificado.
            </p>

            <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:16px">
                <label style="font-size:12px;font-weight:700;color:var(--text-color-secondary)">Motivo da recusa *</label>
                <p-select
                    [(ngModel)]="recusarMotivo"
                    [options]="motivoOptions"
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Selecione o motivo"
                />
            </div>

            <div style="display:flex;flex-direction:column;gap:6px">
                <label style="font-size:12px;font-weight:700;color:var(--text-color-secondary)">Comentário (opcional)</label>
                <textarea
                    pTextarea
                    [(ngModel)]="recusarComentario"
                    rows="4"
                    placeholder="Descreva o motivo com mais detalhes…"
                    style="width:100%;resize:vertical"
                ></textarea>
            </div>

            <ng-template #footer>
                <p-button label="Cancelar" severity="secondary" [outlined]="true" (click)="recusarVisible = false" />
                <p-button
                    label="Confirmar recusa"
                    severity="danger"
                    icon="pi pi-times"
                    [disabled]="!recusarMotivo"
                    (click)="confirmarRecusar()"
                />
            </ng-template>
        </p-dialog>


        <!-- ═══════════════════════════════════════════
             DIALOG: NOVO DOCUMENTO
        ═══════════════════════════════════════════ -->
        <p-dialog
            [(visible)]="novoDocVisible"
            [modal]="true"
            [draggable]="false"
            [style]="{'width':'580px'}"
            header="Novo documento"
        >
            <!-- custom stepper header -->
            <div class="step-header">
                @for (s of novoDocSteps; track s.n; let i = $index) {
                    <div class="step-item">
                        <div class="step-circle"
                             [class.active]="novoDocStep === s.n"
                             [class.done]="novoDocStep > s.n">
                            @if (novoDocStep > s.n) {
                                <i class="pi pi-check" style="font-size:11px"></i>
                            } @else {
                                {{ s.n }}
                            }
                        </div>
                        <span class="step-label" [class.active]="novoDocStep === s.n">{{ s.label }}</span>
                    </div>
                    @if (i < novoDocSteps.length - 1) {
                        <div class="step-line" [class.done]="novoDocStep > s.n"></div>
                    }
                }
            </div>

            <!-- Step 1: Dados básicos -->
            @if (novoDocStep === 1) {
                <div class="form-field">
                    <label>Nome do documento *</label>
                    <input pInputText [(ngModel)]="novoDoc.nome" placeholder="Ex: Portaria de contratação 5000" />
                </div>
                <div class="form-field">
                    <label>Tipo de documento *</label>
                    <p-select [(ngModel)]="novoDoc.tipo" [options]="tipoDocOpts" optionLabel="label" optionValue="value"
                        placeholder="Selecione o tipo" />
                </div>
                <div class="form-field">
                    <label>Descrição (opcional)</label>
                    <textarea pTextarea [(ngModel)]="novoDoc.descricao" rows="3"
                        placeholder="Descreva o conteúdo do documento…" style="width:100%;resize:vertical"></textarea>
                </div>
            }

            <!-- Step 2: Upload PDF -->
            @if (novoDocStep === 2) {
                <div style="text-align:center">
                    <p-fileupload
                        name="pdf"
                        accept=".pdf"
                        [maxFileSize]="20000000"
                        chooseLabel="Selecionar PDF"
                        uploadLabel="Enviar"
                        cancelLabel="Remover"
                        [showUploadButton]="false"
                        [style]="{'width':'100%'}"
                        (onSelect)="onPdfSelect($event)"
                    >
                        <ng-template #empty>
                            <div style="padding:32px;color:var(--text-color-secondary)">
                                <i class="pi pi-file-pdf" style="font-size:40px;display:block;margin-bottom:12px;color:#EF4444;opacity:.5"></i>
                                <p style="margin:0 0 4px;font-size:14px;font-weight:600">Arraste um PDF aqui</p>
                                <p style="margin:0;font-size:12px">ou clique em "Selecionar PDF"</p>
                            </div>
                        </ng-template>
                    </p-fileupload>
                    @if (novoDoc.pdfNome) {
                        <div style="margin-top:12px;padding:10px 14px;background:#F0FDF4;border:1px solid #86EFAC;border-radius:8px;display:flex;align-items:center;gap:8px;text-align:left">
                            <i class="pi pi-file-pdf" style="color:#EF4444"></i>
                            <span style="font-size:13px;font-weight:600;flex:1">{{ novoDoc.pdfNome }}</span>
                            <i class="pi pi-check-circle" style="color:#059669"></i>
                        </div>
                    }
                </div>
            }

            <!-- Step 3: Assinadores -->
            @if (novoDocStep === 3) {
                <div style="display:flex;gap:8px;margin-bottom:12px">
                    <input pInputText [(ngModel)]="novoDoc.novoEmail" placeholder="E-mail do assinador"
                        style="flex:1" (keyup.enter)="addNovoAssinador()" />
                    <p-button icon="pi pi-plus" severity="secondary" [outlined]="true"
                        (click)="addNovoAssinador()" [disabled]="!novoDoc.novoEmail.trim()" />
                </div>
                @for (a of novoDoc.assinadores; track a.email; let i = $index) {
                    <div class="assinador-row">
                        <div class="assinador-ordem">{{ a.ordem }}</div>
                        <i class="pi pi-user" style="color:var(--text-color-secondary);font-size:12px"></i>
                        <span style="flex:1;font-size:13px">{{ a.email }}</span>
                        <button style="background:none;border:none;cursor:pointer;color:var(--text-color-secondary);padding:4px" (click)="removeNovoAssinador(i)">
                            <i class="pi pi-times" style="font-size:12px"></i>
                        </button>
                    </div>
                }
                @if (novoDoc.assinadores.length === 0) {
                    <div style="text-align:center;padding:24px;background:var(--surface-ground);border-radius:8px;color:var(--text-color-secondary);font-size:13px">
                        <i class="pi pi-users" style="font-size:24px;display:block;margin-bottom:8px;opacity:.5"></i>
                        Nenhum assinador adicionado
                    </div>
                }
            }

            <!-- Step 4: Revisão -->
            @if (novoDocStep === 4) {
                <div style="background:var(--surface-ground);border-radius:10px;padding:20px;margin-bottom:12px">
                    <div style="display:grid;gap:12px">
                        <div style="display:flex;gap:8px">
                            <span style="font-size:12px;font-weight:700;color:var(--text-color-secondary);width:100px;flex-shrink:0">Documento:</span>
                            <span style="font-size:13px;font-weight:600;color:var(--text-color)">{{ novoDoc.nome }}</span>
                        </div>
                        <div style="display:flex;gap:8px">
                            <span style="font-size:12px;font-weight:700;color:var(--text-color-secondary);width:100px;flex-shrink:0">Tipo:</span>
                            <span style="font-size:13px;color:var(--text-color)">{{ novoDoc.tipo || '—' }}</span>
                        </div>
                        <div style="display:flex;gap:8px">
                            <span style="font-size:12px;font-weight:700;color:var(--text-color-secondary);width:100px;flex-shrink:0">Arquivo:</span>
                            <span style="font-size:13px;color:var(--text-color)">{{ novoDoc.pdfNome || 'Sem arquivo' }}</span>
                        </div>
                        <div style="display:flex;gap:8px;align-items:flex-start">
                            <span style="font-size:12px;font-weight:700;color:var(--text-color-secondary);width:100px;flex-shrink:0">Assinadores:</span>
                            <div>
                                @for (a of novoDoc.assinadores; track a.email) {
                                    <div style="font-size:13px;color:var(--text-color);margin-bottom:2px">
                                        {{ a.ordem }}. {{ a.email }}
                                    </div>
                                }
                                @if (novoDoc.assinadores.length === 0) {
                                    <span style="font-size:13px;color:var(--text-color-secondary)">Nenhum</span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <p style="font-size:12px;color:var(--text-color-secondary);margin:0">
                    Ao enviar, todos os assinadores receberão uma notificação por e-mail.
                </p>
            }

            <!-- Footer navigation -->
            <ng-template #footer>
                <div style="display:flex;justify-content:space-between;width:100%">
                    <p-button
                        [label]="novoDocStep === 1 ? 'Cancelar' : 'Voltar'"
                        severity="secondary" [outlined]="true"
                        [icon]="novoDocStep > 1 ? 'pi pi-arrow-left' : ''"
                        (click)="novoDocStep > 1 ? novoDocStep = novoDocStep - 1 : novoDocVisible = false"
                    />
                    @if (novoDocStep < 4) {
                        <p-button
                            label="Próximo"
                            icon="pi pi-arrow-right"
                            iconPos="right"
                            [style]="{'background':'#3ACC75','border-color':'#3ACC75'}"
                            [disabled]="!podeProsseguir()"
                            (click)="novoDocStep = novoDocStep + 1"
                        />
                    } @else {
                        <p-button
                            label="Enviar para assinatura"
                            icon="pi pi-send"
                            iconPos="right"
                            [style]="{'background':'#3ACC75','border-color':'#3ACC75'}"
                            (click)="enviarDocumento()"
                        />
                    }
                </div>
            </ng-template>
        </p-dialog>
    `
})
export class AssinagoHome {
    /* ── docs ── */
    docs: Documento[] = [...INITIAL_DOCS];

    /* ── list state ── */
    activeTab    = 'todos';
    searchTerm   = '';
    filterBloco: string | null  = null;
    filterTipo: string | null   = null;
    filterStatus: string | null = null;
    filterPeriodo: Date[] | null = null;
    selectedDocs: Documento[]   = [];

    /* ── viewer ── */
    viewerVisible     = false;
    viewerDoc: Documento | null = null;
    viewerDocsBatch: Documento[] = [];

    /* ── signing ── */
    assinarVisible = false;
    assinarStep: 'metodo' | 'token' | 'certificado' | 'govbr' | 'sucesso' = 'metodo';
    selectedMetodo: string | null = null;
    tokenCode  = '';
    certTipo: 'a1' | 'a3' = 'a1';
    agora = '';

    /* ── refuse ── */
    recusarVisible   = false;
    recusarMotivo: string | null = null;
    recusarComentario = '';

    /* ── novo doc ── */
    novoDocVisible = false;
    novoDocStep    = 1;
    novoDocSteps   = [
        { n: 1, label: 'Dados' },
        { n: 2, label: 'PDF' },
        { n: 3, label: 'Assinadores' },
        { n: 4, label: 'Revisão' },
    ];
    novoDoc = {
        nome: '', tipo: null as string | null, descricao: '',
        pdfNome: '' as string,
        assinadores: [] as { email: string; ordem: number }[],
        novoEmail: '',
    };

    /* ── options ── */
    blocoOptions = [
        { label: 'SIS - Contratação',   value: 'SIS - Contratação' },
        { label: 'RH - Admissão',        value: 'RH - Admissão' },
        { label: 'SEFAZ - Financeiro',   value: 'SEFAZ - Financeiro' },
        { label: 'GABINETE',             value: 'GABINETE' },
    ];
    tipoOptions = [
        { label: 'Portaria',  value: 'Portaria' },
        { label: 'Contrato',  value: 'Contrato' },
        { label: 'Memorando', value: 'Memorando' },
        { label: 'Termo',     value: 'Termo' },
        { label: 'Nota',      value: 'Nota' },
    ];
    statusOptions = [
        { label: 'Assinado',   value: 'assinado' },
        { label: 'Pendente',   value: 'pendente' },
        { label: 'Aguardando', value: 'aguardando' },
        { label: 'Expirado',   value: 'expirado' },
        { label: 'Recusado',   value: 'recusado' },
    ];
    motivoOptions = [
        { label: 'Informações incorretas',      value: 'informacoes-incorretas' },
        { label: 'Documento ilegível',           value: 'ilegivel' },
        { label: 'Não autorizado a assinar',    value: 'nao-autorizado' },
        { label: 'Documento duplicado',          value: 'duplicado' },
        { label: 'Prazo expirado',               value: 'prazo-expirado' },
        { label: 'Outro',                        value: 'outro' },
    ];
    tipoDocOpts = [
        { label: 'Portaria',          value: 'Portaria' },
        { label: 'Contrato',          value: 'Contrato' },
        { label: 'Memorando',         value: 'Memorando' },
        { label: 'Termo',             value: 'Termo' },
        { label: 'Nota de empenho',   value: 'Nota de empenho' },
        { label: 'Ordem de pagamento',value: 'Ordem de pagamento' },
    ];

    /* ══ GETTERS ══ */
    get docsVisiveis(): Documento[] {
        let base = this.docsDoTab;
        if (this.searchTerm.trim()) {
            const q = this.searchTerm.toLowerCase();
            base = base.filter(d =>
                d.titulo.toLowerCase().includes(q) ||
                d.bloco.toLowerCase().includes(q) ||
                d.assinadores.some(a => a.nome.toLowerCase().includes(q))
            );
        }
        if (this.filterBloco)  base = base.filter(d => d.bloco   === this.filterBloco);
        if (this.filterStatus) base = base.filter(d => d.status  === this.filterStatus);
        const resultado: Documento[] = [];
        for (const doc of base) {
            resultado.push(doc);
            if (doc.expandido && doc.filhos?.length)
                doc.filhos.forEach(f => resultado.push({ ...f, _isFilho: true }));
        }
        return resultado;
    }

    private get docsDoTab(): Documento[] {
        switch (this.activeTab) {
            case 'assinados':   return this.docs.filter(d => d.status === 'assinado');
            case 'aguardando':  return this.docs.filter(d => d.status === 'aguardando' || d.status === 'pendente');
            case 'recusados':   return this.docs.filter(d => d.status === 'recusado');
            default:            return this.docs;
        }
    }

    countByStatus(s: string) { return this.docs.filter(d => d.status === s).length; }

    get selectedDocsAssinaveis() {
        return this.selectedDocs.filter(d => d.status === 'pendente' || d.status === 'aguardando');
    }

    /* ══ VIEWER ══ */
    openViewer(doc: Documento) {
        this.viewerDoc      = doc;
        this.viewerDocsBatch = this.docs.filter(d => d.bloco === doc.bloco);
        this.viewerVisible  = true;
    }

    /* ══ SIGNING ══ */
    openAssinar() {
        this.assinarStep   = 'metodo';
        this.selectedMetodo = null;
        this.tokenCode     = '';
        this.certTipo      = 'a1';
        this.assinarVisible = true;
    }

    openAssinarSelecionados() {
        if (this.selectedDocsAssinaveis.length === 0) return;
        this.viewerDoc = this.selectedDocsAssinaveis[0];
        this.openAssinar();
    }

    avancarAssinar() {
        if (this.assinarStep === 'metodo' && this.selectedMetodo) {
            this.assinarStep = this.selectedMetodo as typeof this.assinarStep;
        }
    }

    confirmarAssinatura() {
        this.agora = new Date().toLocaleString('pt-BR');
        this.assinarStep = 'sucesso';
        if (this.viewerDoc) {
            const doc = this.docs.find(d => d.id === this.viewerDoc!.id);
            if (doc) doc.status = 'assinado';
        }
    }

    /* ══ REFUSE ══ */
    openRecusar() {
        this.recusarMotivo    = null;
        this.recusarComentario = '';
        this.recusarVisible   = true;
    }

    confirmarRecusar() {
        if (this.viewerDoc) {
            const doc = this.docs.find(d => d.id === this.viewerDoc!.id);
            if (doc) doc.status = 'recusado';
        }
        this.recusarVisible  = false;
        this.viewerVisible   = false;
    }

    /* ══ NEW DOC ══ */
    openNovoDoc() {
        this.novoDocStep = 1;
        this.novoDoc = { nome: '', tipo: null, descricao: '', pdfNome: '', assinadores: [], novoEmail: '' };
        this.novoDocVisible = true;
    }

    podeProsseguir(): boolean {
        if (this.novoDocStep === 1) return !!this.novoDoc.nome.trim() && !!this.novoDoc.tipo;
        if (this.novoDocStep === 2) return true; /* PDF optional */
        return true;
    }

    onPdfSelect(event: any) {
        const file = event.files?.[0];
        if (file) this.novoDoc.pdfNome = file.name;
    }

    addNovoAssinador() {
        const email = this.novoDoc.novoEmail.trim();
        if (!email || this.novoDoc.assinadores.some(a => a.email === email)) return;
        this.novoDoc.assinadores.push({ email, ordem: this.novoDoc.assinadores.length + 1 });
        this.novoDoc.novoEmail = '';
    }

    removeNovoAssinador(idx: number) {
        this.novoDoc.assinadores.splice(idx, 1);
        this.novoDoc.assinadores.forEach((a, i) => (a.ordem = i + 1));
    }

    enviarDocumento() {
        const newDoc: Documento = {
            id: Date.now(),
            bloco: 'SIS - Contratação',
            titulo: this.novoDoc.nome,
            assinadores: this.novoDoc.assinadores.length
                ? this.novoDoc.assinadores.map((a, i) => ({
                    nome: a.email.split('@')[0],
                    iniciais: a.email.substring(0, 2).toUpperCase(),
                    cor: CORES[i % CORES.length],
                }))
                : [{ nome: 'Você', iniciais: 'VC', cor: CORES[0] }],
            dataStatus: new Date().toLocaleString('pt-BR'),
            status: 'aguardando',
        };
        this.docs = [newDoc, ...this.docs];
        this.novoDocVisible = false;
    }

    /* ══ MISC ══ */
    toggleExpand(doc: Documento) { doc.expandido = !doc.expandido; }

    limparFiltros() {
        this.searchTerm    = '';
        this.filterBloco   = null;
        this.filterTipo    = null;
        this.filterStatus  = null;
        this.filterPeriodo = null;
    }

    statusLabel(s: string): string {
        const m: Record<string, string> = {
            assinado: 'Assinado', pendente: 'Pendente',
            aguardando: 'Aguardando', expirado: 'Expirado', recusado: 'Recusado'
        };
        return m[s] ?? s;
    }
}
