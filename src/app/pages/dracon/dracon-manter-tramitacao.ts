import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';

interface Destinatario {
    id: number;
    nome: string;
    tipo: string;
    identificador: string;
    ordem: number;
}

interface AtoAssociado {
    id: number;
    numero: string;
    nome: string;
    tipo: string;
}

@Component({
    selector: 'app-dracon-manter-tramitacao',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, SelectModule, TextareaModule, DatePickerModule, FileUploadModule, TableModule, TooltipModule, ToastModule, DividerModule],
    providers: [MessageService],
    styles: [`
        :host { --dracon: #1755A3; }
        .page-header { margin-bottom: 28px; }
        .breadcrumb  { font-size: 12px; color: var(--text-color-secondary); margin-bottom: 4px; }
        .page-title  { font-size: 28px; font-weight: 800; color: var(--text-color); margin: 0; }

        .section-card {
            background: var(--surface-card);
            border: 1px solid var(--surface-border);
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 20px;
        }
        .section-title {
            font-size: 13px; font-weight: 800; color: var(--text-color);
            margin: 0 0 18px; padding-bottom: 12px;
            border-bottom: 1px solid var(--surface-border);
            display: flex; align-items: center; gap: 8px;
        }
        .section-title i { color: #1755A3; }

        .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px 24px; }
        .form-field { display:flex; flex-direction:column; gap:6px; }
        .form-field.full { grid-column: 1 / -1; }
        .form-field label { font-size:12px; font-weight:700; color:var(--text-color-secondary); }
        .readonly-value {
            padding: 8px 12px;
            background: var(--surface-ground);
            border: 1px solid var(--surface-border);
            border-radius: var(--border-radius, 6px);
            font-size: 13px; color: var(--text-color);
            min-height: 38px; display:flex; align-items:center;
        }

        .dest-add-row { display:flex; gap:8px; margin-bottom:12px; align-items:flex-end; }

        ::ng-deep .ds-table { border: none !important; border-radius: 0 !important; }
        ::ng-deep .ds-table .p-datatable-table-container { border-radius: 0 !important; }
        ::ng-deep .ds-table .p-datatable-thead > tr > th {
            background: var(--surface-ground) !important; font-size: 12px; font-weight: 700;
            color: var(--text-color-secondary) !important; border-bottom: 1px solid var(--surface-border) !important; padding: 8px 12px !important;
        }
        ::ng-deep .ds-table .p-datatable-tbody > tr > td {
            padding: 8px 12px !important; border-bottom: 1px solid var(--surface-border) !important; font-size: 13px;
        }
        ::ng-deep .ds-table .p-datatable-tbody > tr:last-child > td { border-bottom: none !important; }
        ::ng-deep .ds-table .p-datatable-tbody > tr:hover > td { background: var(--surface-ground) !important; }

        .act-btn {
            width: 28px; height: 28px; border-radius: 6px;
            border: 1px solid var(--surface-border); background: var(--surface-card);
            display: inline-flex; align-items: center; justify-content: center;
            cursor: pointer; transition: all .12s; color: var(--text-color-secondary); font-size: 12px;
        }
        .act-btn.del:hover { background: #FEF2F2; border-color: #EF4444; color: #EF4444; }

        .action-bar { display:flex; justify-content:space-between; align-items:center; margin-top:8px; }

        .list-container { border: 1px solid var(--surface-border); border-radius: 8px; overflow: hidden; margin-bottom: 4px; }
    `],
    template: `
        <p-toast />
        <div class="page-header">
            <div class="breadcrumb">Atos › Listagem › Nova tramitação</div>
            <h1 class="page-title">Manter tramitação</h1>
        </div>

        <!-- ── Dados da tramitação ── -->
        <div class="section-card">
            <div class="section-title"><i class="pi pi-send"></i> Dados da tramitação</div>
            <div class="form-grid">
                <div class="form-field">
                    <label>Tipo de tramitação</label>
                    <p-select [(ngModel)]="form.tipoTramitacao" [options]="tipoTramitacaoOpts" placeholder="Selecione" />
                </div>
                <div class="form-field">
                    <label>Data</label>
                    <p-datepicker [(ngModel)]="form.data" dateFormat="dd/mm/yy" placeholder="dd/mm/aaaa" />
                </div>
                <div class="form-field">
                    <label>Prioridade</label>
                    <p-select [(ngModel)]="form.prioridade" [options]="prioridadeOpts" placeholder="Selecione" />
                </div>
                <div class="form-field">
                    <label>Unidade / Setor</label>
                    <div class="readonly-value">{{ unidade }}</div>
                </div>
                <div class="form-field full">
                    <label>Observação</label>
                    <textarea pTextarea [(ngModel)]="form.observacao" rows="3"
                        placeholder="Encaminhado para análise da documentação…"
                        style="width:100%;resize:vertical"></textarea>
                </div>
            </div>

            <!-- Upload -->
            <div style="margin-top:16px">
                <label style="font-size:12px;font-weight:700;color:var(--text-color-secondary);display:block;margin-bottom:6px">Documentos</label>
                <p-fileupload name="docs" [multiple]="true" chooseLabel="Selecionar arquivos" [showUploadButton]="false">
                    <ng-template #empty>
                        <div style="padding:16px;text-align:center;color:var(--text-color-secondary);font-size:13px">
                            <i class="pi pi-upload" style="font-size:24px;display:block;margin-bottom:6px;opacity:.4"></i>
                            Escolha os documentos ou arraste aqui
                        </div>
                    </ng-template>
                </p-fileupload>
            </div>
        </div>

        <!-- ── Destinatários ── -->
        <div class="section-card">
            <div class="section-title"><i class="pi pi-users"></i> Destinatários</div>
            <p style="font-size:13px;color:var(--text-color-secondary);margin:0 0 14px">
                Os usuários selecionados pertencem à mesma tramitação.
            </p>

            <div class="dest-add-row">
                <div style="display:flex;flex-direction:column;gap:4px;flex-shrink:0">
                    <label style="font-size:11px;font-weight:700;color:var(--text-color-secondary)">Tipo de destinatário</label>
                    <p-select [(ngModel)]="novoDestinatario.tipo" [options]="tipoDestinatarioOpts"
                        placeholder="Tipo" style="width:160px" />
                </div>
                <div style="display:flex;flex-direction:column;gap:4px;flex:1">
                    <label style="font-size:11px;font-weight:700;color:var(--text-color-secondary)">Destinatário</label>
                    <input pInputText [(ngModel)]="novoDestinatario.nome"
                        placeholder="Mínimo 4 caracteres de nome ou CPF completo"
                        (keyup.enter)="addDestinatario()" />
                </div>
                <p-button label="Limpar" severity="secondary" [outlined]="true" size="small" (click)="limparDestinatario()" />
                <p-button label="Adicionar" icon="pi pi-plus" size="small"
                    [style]="{'background':'#1755A3','border-color':'#1755A3'}"
                    [disabled]="!novoDestinatario.nome.trim() || !novoDestinatario.tipo"
                    (click)="addDestinatario()" />
            </div>

            @if (destinatarios.length > 0) {
                <div class="list-container">
                    <p-table [value]="destinatarios" styleClass="p-datatable-sm ds-table" [tableStyle]="{'min-width':'100%'}">
                        <ng-template #header>
                            <tr>
                                <th style="width:60px;text-align:center">Ordem</th>
                                <th>Visualização</th>
                                <th style="min-width:140px">Tipo destinatário</th>
                                <th style="min-width:140px">ID</th>
                                <th style="width:70px;text-align:center">Ações</th>
                            </tr>
                        </ng-template>
                        <ng-template #body let-d>
                            <tr>
                                <td style="text-align:center;font-weight:700;color:#1755A3">{{ d.ordem }}º</td>
                                <td>{{ d.nome }}</td>
                                <td style="color:var(--text-color-secondary)">{{ d.tipo }}</td>
                                <td style="font-size:12px;color:var(--text-color-secondary)">{{ d.identificador }}</td>
                                <td style="text-align:center">
                                    <button class="act-btn del" pTooltip="Remover" tooltipPosition="top" (click)="removeDestinatario(d)">
                                        <i class="pi pi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div>
            } @else {
                <div style="text-align:center;padding:24px;background:var(--surface-ground);border-radius:8px;color:var(--text-color-secondary);font-size:13px">
                    <i class="pi pi-users" style="font-size:24px;display:block;margin-bottom:8px;opacity:.4"></i>
                    Nenhum destinatário adicionado
                </div>
            }
        </div>

        <!-- ── Atos associados ── -->
        <div class="section-card">
            <div class="section-title"><i class="pi pi-file-edit"></i> Atos associados</div>
            <div class="list-container">
                <p-table [value]="atosAssociados" styleClass="p-datatable-sm ds-table" [tableStyle]="{'min-width':'100%'}">
                    <ng-template #header>
                        <tr>
                            <th pSortableColumn="numero">Número do ato <p-sortIcon field="numero"/></th>
                            <th>Nome do ato</th>
                            <th style="min-width:160px">Tipo</th>
                            <th style="width:100px;text-align:center">Ações</th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-a>
                        <tr>
                            <td><strong>{{ a.numero }}</strong></td>
                            <td>{{ a.nome }}</td>
                            <td style="color:var(--text-color-secondary);font-size:12px">{{ a.tipo }}</td>
                            <td style="text-align:center">
                                <button class="act-btn" pTooltip="Visualizar ato" tooltipPosition="left">
                                    <i class="pi pi-eye"></i>
                                </button>
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
            <div style="font-size:12px;color:var(--text-color-secondary);margin-top:8px">
                Mostrando {{ atosAssociados.length }} de {{ atosAssociados.length }} resultados
            </div>
        </div>

        <!-- ── Action bar ── -->
        <div class="action-bar">
            <p-button label="Voltar" severity="secondary" [outlined]="true" icon="pi pi-arrow-left" (click)="voltar()" />
            <p-button label="Salvar" icon="pi pi-check"
                [style]="{'background':'#1755A3','border-color':'#1755A3'}"
                (click)="salvar()" />
        </div>
    `
})
export class DraconManterTramitacao implements OnInit {
    private toast  = inject(MessageService);
    private route  = inject(ActivatedRoute);
    private router = inject(Router);

    unidade = 'Setor de TI - SEAD';

    form = {
        tipoTramitacao: null as string | null,
        data:           null as Date | null,
        observacao:     '',
        prioridade:     null as string | null,
    };

    novoDestinatario = { tipo: null as string | null, nome: '' };
    destinatarios: Destinatario[] = [];

    atosAssociados: AtoAssociado[] = [
        { id: 1, numero: '2025000089',  nome: 'Decreto nº 7.892/2025 — Modernização da Gestão', tipo: 'Decreto' },
        { id: 2, numero: '2025000102',  nome: 'Portaria de Designação de Servidores 2025',       tipo: 'Portaria' },
        { id: 3, numero: '2025000118',  nome: 'IN TI nº 003/2025 — Normas para contratação',     tipo: 'Instrução Normativa' },
    ];

    tipoTramitacaoOpts  = ['Em elaboração', 'Em análise', 'Encaminhado', 'Concluído', 'Devolvido'].map(v => ({ label: v, value: v }));
    prioridadeOpts      = ['Baixa', 'Média', 'Alta', 'Urgente', 'Prioritário'].map(v => ({ label: v, value: v }));
    tipoDestinatarioOpts = ['Pessoa', 'Órgão', 'Setor'].map(v => ({ label: v, value: v }));

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (id) this.unidade = 'Setor de TI - SEAD';
    }

    addDestinatario() {
        if (!this.novoDestinatario.nome.trim() || !this.novoDestinatario.tipo) return;
        this.destinatarios.push({
            id: Date.now(),
            nome: this.novoDestinatario.nome,
            tipo: this.novoDestinatario.tipo ?? '',
            identificador: `ID-${Math.floor(Math.random() * 90000) + 10000}`,
            ordem: this.destinatarios.length + 1,
        });
        this.limparDestinatario();
    }

    limparDestinatario() {
        this.novoDestinatario = { tipo: null, nome: '' };
    }

    removeDestinatario(d: Destinatario) {
        this.destinatarios = this.destinatarios.filter(x => x.id !== d.id);
        this.destinatarios.forEach((x, i) => (x.ordem = i + 1));
    }

    salvar() {
        this.toast.add({ severity: 'success', summary: 'Tramitação salva!', detail: 'A tramitação foi registrada com sucesso.', life: 3000 });
        setTimeout(() => this.router.navigate(['/dracon/atos']), 1500);
    }

    voltar() { this.router.navigate(['/dracon/atos']); }
}
