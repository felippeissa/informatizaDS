import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TagModule } from 'primeng/tag';

interface MotivoRecusa {
    id: number;
    descricao: string;
    ativo: boolean;
    totalUsos: number;
}

@Component({
    selector: 'app-assinago-config-motivo-recusa',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TableModule, DialogModule, TooltipModule, ToggleSwitchModule, TagModule, ToastModule],
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
        .act-btn.edit:hover { background: #FFF7ED; border-color: #F97316; color: #F97316; }
        .act-btn.del:hover  { background: #FEF2F2; border-color: #EF4444; color: #EF4444; }

        .form-field { display:flex; flex-direction:column; gap:6px; margin-bottom:16px; }
        .form-field label { font-size:12px; font-weight:700; color:var(--text-color-secondary); }
    `],
    template: `
        <p-toast />
        <div class="page-header">
            <div>
                <div class="breadcrumb">Configurações › Motivo de recusa</div>
                <h1 class="page-title">Motivos de recusa</h1>
            </div>
            <p-button
                label="Novo motivo"
                icon="pi pi-plus"
                [style]="{'background':'#3ACC75','border-color':'#3ACC75'}"
                (click)="abrirDialog()"
            />
        </div>

        <div class="list-container">
        <p-table
            [value]="motivos"
            styleClass="p-datatable-sm ds-table"
            [tableStyle]="{'min-width':'100%'}"
            [paginator]="true"
            [rows]="10"
            paginatorDropdownAppendTo="body"
        >
            <ng-template #header>
                <tr>
                    <th pSortableColumn="descricao">Motivo <p-sortIcon field="descricao" /></th>
                    <th style="width:100px;text-align:center">Utilizações</th>
                    <th style="width:90px;text-align:center">Ativo</th>
                    <th style="width:90px;text-align:center">Ações</th>
                </tr>
            </ng-template>
            <ng-template #body let-m>
                <tr>
                    <td>{{ m.descricao }}</td>
                    <td style="text-align:center;font-size:12px;font-weight:700">{{ m.totalUsos }}</td>
                    <td style="text-align:center">
                        <p-toggleswitch [(ngModel)]="m.ativo" />
                    </td>
                    <td style="text-align:center">
                        <div style="display:flex;gap:4px;justify-content:center">
                            <button class="act-btn edit" pTooltip="Editar" tooltipPosition="top" (click)="abrirDialog(m)">
                                <i class="pi pi-pencil"></i>
                            </button>
                            <button
                                class="act-btn del"
                                pTooltip="Excluir"
                                tooltipPosition="top"
                                (click)="excluir(m)"
                                [style.opacity]="m.totalUsos > 0 ? '.4' : '1'"
                                [style.cursor]="m.totalUsos > 0 ? 'not-allowed' : 'pointer'"
                            >
                                <i class="pi pi-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </ng-template>
            <ng-template #emptymessage>
                <tr>
                    <td colspan="4" style="text-align:center;padding:40px;color:var(--text-color-secondary)">
                        Nenhum motivo de recusa cadastrado.
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
            [style]="{'width':'440px'}"
            [header]="editando ? 'Editar motivo de recusa' : 'Novo motivo de recusa'"
        >
            <div class="form-field">
                <label>Descrição do motivo *</label>
                <input pInputText [(ngModel)]="form.descricao" placeholder="Ex: Informações incorretas" />
            </div>

            <ng-template #footer>
                <p-button label="Cancelar" severity="secondary" [outlined]="true" (click)="dialogVisible = false" />
                <p-button
                    [label]="editando ? 'Salvar' : 'Criar'"
                    [style]="{'background':'#3ACC75','border-color':'#3ACC75'}"
                    (click)="salvar()"
                    [disabled]="!form.descricao.trim()"
                />
            </ng-template>
        </p-dialog>
    `
})
export class AssinagoConfigMotivoRecusa {
    private toast = inject(MessageService);
    motivos: MotivoRecusa[] = [
        { id: 1, descricao: 'Informações incorretas',      ativo: true,  totalUsos: 3 },
        { id: 2, descricao: 'Documento ilegível',           ativo: true,  totalUsos: 1 },
        { id: 3, descricao: 'Não autorizado a assinar',     ativo: true,  totalUsos: 5 },
        { id: 4, descricao: 'Documento duplicado',          ativo: true,  totalUsos: 2 },
        { id: 5, descricao: 'Prazo expirado',               ativo: true,  totalUsos: 0 },
        { id: 6, descricao: 'Ausência de documentação complementar', ativo: false, totalUsos: 0 },
        { id: 7, descricao: 'Outro',                       ativo: true,  totalUsos: 5 },
    ];

    dialogVisible = false;
    editando      = false;
    editandoId    = 0;
    form          = { descricao: '' };

    abrirDialog(m?: MotivoRecusa) {
        this.editando   = !!m;
        this.editandoId = m?.id ?? 0;
        this.form       = { descricao: m?.descricao ?? '' };
        this.dialogVisible = true;
    }

    salvar() {
        if (this.editando) {
            const m = this.motivos.find(x => x.id === this.editandoId);
            if (m) m.descricao = this.form.descricao;
            this.toast.add({ severity: 'success', summary: 'Motivo atualizado', detail: `"${this.form.descricao}" foi atualizado.`, life: 3000 });
        } else {
            this.motivos = [
                ...this.motivos,
                { id: Date.now(), descricao: this.form.descricao, ativo: true, totalUsos: 0 }
            ];
            this.toast.add({ severity: 'success', summary: 'Motivo criado', detail: `"${this.form.descricao}" foi adicionado à lista.`, life: 3000 });
        }
        this.dialogVisible = false;
    }

    excluir(m: MotivoRecusa) {
        if (m.totalUsos > 0) {
            this.toast.add({ severity: 'warn', summary: 'Não é possível excluir', detail: 'Este motivo já foi utilizado em documentos.', life: 4000 });
            return;
        }
        this.motivos = this.motivos.filter(x => x.id !== m.id);
        this.toast.add({ severity: 'warn', summary: 'Motivo removido', detail: `"${m.descricao}" foi excluído.`, life: 3000 });
    }
}
