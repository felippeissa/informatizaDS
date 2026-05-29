import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

interface TipoDocumento {
    id: number;
    nome: string;
    descricao: string;
    ativo: boolean;
    totalDocumentos: number;
}

@Component({
    selector: 'app-assinago-config-documentos',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TextareaModule, TableModule, DialogModule, TooltipModule, TagModule, ToggleSwitchModule, ToastModule],
    providers: [MessageService],
    styles: [`
        :host { --assa-green: #3ACC75; }
        .page-header { margin-bottom: 28px; display:flex; justify-content:space-between; align-items:flex-start; }
        .breadcrumb  { font-size: 12px; color: var(--text-color-secondary); margin-bottom: 4px; }
        .page-title  { font-size: 28px; font-weight: 800; color: var(--text-color); margin: 0; }

        .list-container {
            border: 1px solid var(--surface-border);
            border-radius: 8px;
            overflow: hidden;
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
            padding: 11px 12px !important;
            border-bottom: 1px solid var(--surface-border) !important;
            font-size: 13px;
        }
        ::ng-deep .ds-table .p-datatable-tbody > tr:last-child > td { border-bottom: none !important; }
        ::ng-deep .ds-table .p-datatable-tbody > tr:hover > td { background: var(--surface-ground) !important; }

        .act-btn {
            width: 30px; height: 30px; border-radius: 6px;
            border: 1px solid var(--surface-border);
            background: var(--surface-card);
            display: inline-flex; align-items: center; justify-content: center;
            cursor: pointer; transition: all .12s;
            color: var(--text-color-secondary); font-size: 13px;
        }
        .act-btn:hover { background: var(--surface-hover); }
        .act-btn.edit:hover   { background: #FFF7ED; border-color: #F97316; color: #F97316; }
        .act-btn.del:hover    { background: #FEF2F2; border-color: #EF4444; color: #EF4444; }

        .form-field { display:flex; flex-direction:column; gap:6px; margin-bottom:16px; }
        .form-field label { font-size:12px; font-weight:700; color:var(--text-color-secondary); }
    `],
    template: `
        <p-toast />
        <div class="page-header">
            <div>
                <div class="breadcrumb">Configurações › Documentos</div>
                <h1 class="page-title">Tipos de documento</h1>
            </div>
            <p-button
                label="Novo tipo"
                icon="pi pi-plus"
                [style]="{'background':'#3ACC75','border-color':'#3ACC75'}"
                (click)="abrirDialog()"
            />
        </div>

        <div class="list-container">
        <p-table
            [value]="tipos"
            styleClass="p-datatable-sm ds-table"
            [tableStyle]="{'min-width':'100%'}"
            [paginator]="true"
            [rows]="10"
            paginatorDropdownAppendTo="body"
        >
            <ng-template #header>
                <tr>
                    <th pSortableColumn="nome">Nome <p-sortIcon field="nome" /></th>
                    <th>Descrição</th>
                    <th style="width:100px;text-align:center">Documentos</th>
                    <th style="width:80px;text-align:center">Ativo</th>
                    <th style="width:90px;text-align:center">Ações</th>
                </tr>
            </ng-template>
            <ng-template #body let-t>
                <tr>
                    <td><strong>{{ t.nome }}</strong></td>
                    <td style="color:var(--text-color-secondary)">{{ t.descricao }}</td>
                    <td style="text-align:center">
                        <span style="font-size:12px;font-weight:700">{{ t.totalDocumentos }}</span>
                    </td>
                    <td style="text-align:center">
                        <p-toggleswitch [(ngModel)]="t.ativo" />
                    </td>
                    <td style="text-align:center">
                        <div style="display:flex;gap:4px;justify-content:center">
                            <button class="act-btn edit" pTooltip="Editar" tooltipPosition="top" (click)="abrirDialog(t)">
                                <i class="pi pi-pencil"></i>
                            </button>
                            <button class="act-btn del" pTooltip="Excluir" tooltipPosition="top" (click)="excluir(t)">
                                <i class="pi pi-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </ng-template>
            <ng-template #emptymessage>
                <tr>
                    <td colspan="5" style="text-align:center;padding:40px;color:var(--text-color-secondary)">
                        Nenhum tipo de documento cadastrado.
                    </td>
                </tr>
            </ng-template>
        </p-table>
        </div>

        <!-- ── Dialog criar/editar ── -->
        <p-dialog
            [(visible)]="dialogVisible"
            [modal]="true"
            [draggable]="false"
            [style]="{'width':'480px'}"
            [header]="editando ? 'Editar tipo de documento' : 'Novo tipo de documento'"
        >
            <div class="form-field">
                <label>Nome do tipo *</label>
                <input pInputText [(ngModel)]="form.nome" placeholder="Ex: Portaria" />
            </div>
            <div class="form-field">
                <label>Descrição</label>
                <textarea pTextarea [(ngModel)]="form.descricao" rows="3" placeholder="Descreva o tipo de documento…" style="width:100%;resize:vertical"></textarea>
            </div>

            <ng-template #footer>
                <p-button label="Cancelar" severity="secondary" [outlined]="true" (click)="dialogVisible = false" />
                <p-button
                    [label]="editando ? 'Salvar' : 'Criar'"
                    [style]="{'background':'#3ACC75','border-color':'#3ACC75'}"
                    (click)="salvar()"
                    [disabled]="!form.nome.trim()"
                />
            </ng-template>
        </p-dialog>
    `
})
export class AssinagoConfigDocumentos {
    private toast = inject(MessageService);
    tipos: TipoDocumento[] = [
        { id: 1, nome: 'Portaria',       descricao: 'Ato administrativo normativo expedido por autoridade competente', ativo: true,  totalDocumentos: 8  },
        { id: 2, nome: 'Contrato',       descricao: 'Acordo formal firmado entre duas ou mais partes',                 ativo: true,  totalDocumentos: 3  },
        { id: 3, nome: 'Memorando',      descricao: 'Comunicação interna entre setores da organização',               ativo: true,  totalDocumentos: 1  },
        { id: 4, nome: 'Termo',          descricao: 'Termo de compromisso ou declaração formal',                      ativo: true,  totalDocumentos: 1  },
        { id: 5, nome: 'Nota de empenho',descricao: 'Documento financeiro de comprometimento de despesa',             ativo: true,  totalDocumentos: 1  },
        { id: 6, nome: 'Ordem de pagamento', descricao: 'Autorização para realização de pagamento',                   ativo: false, totalDocumentos: 1  },
    ];

    dialogVisible = false;
    editando      = false;
    editandoId    = 0;
    form          = { nome: '', descricao: '' };

    abrirDialog(t?: TipoDocumento) {
        this.editando = !!t;
        this.editandoId = t?.id ?? 0;
        this.form = { nome: t?.nome ?? '', descricao: t?.descricao ?? '' };
        this.dialogVisible = true;
    }

    salvar() {
        if (this.editando) {
            const t = this.tipos.find(x => x.id === this.editandoId);
            if (t) { t.nome = this.form.nome; t.descricao = this.form.descricao; }
            this.toast.add({ severity: 'success', summary: 'Tipo atualizado', detail: `"${this.form.nome}" foi atualizado com sucesso.`, life: 3000 });
        } else {
            this.tipos = [
                ...this.tipos,
                { id: Date.now(), nome: this.form.nome, descricao: this.form.descricao, ativo: true, totalDocumentos: 0 }
            ];
            this.toast.add({ severity: 'success', summary: 'Tipo criado', detail: `"${this.form.nome}" foi adicionado à lista.`, life: 3000 });
        }
        this.dialogVisible = false;
    }

    excluir(t: TipoDocumento) {
        this.tipos = this.tipos.filter(x => x.id !== t.id);
        this.toast.add({ severity: 'warn', summary: 'Tipo removido', detail: `"${t.nome}" foi excluído.`, life: 3000 });
    }
}
