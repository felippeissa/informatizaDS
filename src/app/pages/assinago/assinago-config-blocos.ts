import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';

interface Assinador {
    email: string;
    nome: string;
    ordem: number;
}

interface BlocoAssinatura {
    id: number;
    nome: string;
    tipoAssinatura: string;
    assinadores: Assinador[];
}

@Component({
    selector: 'app-assinago-config-blocos',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, SelectModule, TableModule, DialogModule, TooltipModule, TagModule, AvatarModule, ToastModule],
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

        .av-mini {
            width: 26px; height: 26px; border-radius: 50%;
            background: #3ACC75; color: #fff;
            display: inline-flex; align-items: center; justify-content: center;
            font-size: 9px; font-weight: 700;
            border: 2px solid var(--surface-card);
            margin-left: -8px; flex-shrink: 0;
        }
        .av-mini:first-child { margin-left: 0; }

        .form-field { display:flex; flex-direction:column; gap:6px; margin-bottom:16px; }
        .form-field label { font-size:12px; font-weight:700; color:var(--text-color-secondary); }

        .assinador-row {
            display: flex; align-items: center; gap: 8px;
            padding: 8px 10px; border-radius: 8px;
            background: var(--surface-ground);
            border: 1px solid var(--surface-border);
            margin-bottom: 6px;
        }
        .assinador-ordem {
            width: 22px; height: 22px; border-radius: 50%;
            background: #3ACC75; color: #fff;
            display: flex; align-items: center; justify-content: center;
            font-size: 10px; font-weight: 700; flex-shrink: 0;
        }
    `],
    template: `
        <p-toast />
        <div class="page-header">
            <div>
                <div class="breadcrumb">Configurações › Blocos de assinatura</div>
                <h1 class="page-title">Blocos de assinatura</h1>
            </div>
            <p-button
                label="Novo bloco"
                icon="pi pi-plus"
                [style]="{'background':'#3ACC75','border-color':'#3ACC75'}"
                (click)="abrirDialog()"
            />
        </div>

        <div class="list-container">
        <p-table
            [value]="blocos"
            styleClass="p-datatable-sm ds-table"
            [tableStyle]="{'min-width':'100%'}"
            [paginator]="true"
            [rows]="10"
            paginatorDropdownAppendTo="body"
        >
            <ng-template #header>
                <tr>
                    <th pSortableColumn="nome">Nome do bloco <p-sortIcon field="nome" /></th>
                    <th>Tipo de assinatura</th>
                    <th>Assinadores</th>
                    <th style="width:90px;text-align:center">Ações</th>
                </tr>
            </ng-template>
            <ng-template #body let-b>
                <tr>
                    <td><strong>{{ b.nome }}</strong></td>
                    <td>
                        <span style="font-size:12px;padding:3px 8px;border-radius:20px;background:var(--surface-ground);color:var(--text-color-secondary);font-weight:600">
                            {{ b.tipoAssinatura }}
                        </span>
                    </td>
                    <td>
                        <div style="display:flex;align-items:center;gap:0">
                            @for (a of b.assinadores.slice(0, 4); track a.email) {
                                <div class="av-mini" [pTooltip]="a.nome || a.email" tooltipPosition="top">
                                    {{ iniciais(a.nome || a.email) }}
                                </div>
                            }
                            @if (b.assinadores.length > 4) {
                                <div class="av-mini" style="background:var(--surface-border);color:var(--text-color-secondary)">
                                    +{{ b.assinadores.length - 4 }}
                                </div>
                            }
                            <span style="margin-left:10px;font-size:12px;color:var(--text-color-secondary)">
                                {{ b.assinadores.length }} assinador{{ b.assinadores.length !== 1 ? 'es' : '' }}
                            </span>
                        </div>
                    </td>
                    <td style="text-align:center">
                        <div style="display:flex;gap:4px;justify-content:center">
                            <button class="act-btn edit" pTooltip="Editar" tooltipPosition="top" (click)="abrirDialog(b)">
                                <i class="pi pi-pencil"></i>
                            </button>
                            <button class="act-btn del" pTooltip="Excluir" tooltipPosition="top" (click)="excluir(b)">
                                <i class="pi pi-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </ng-template>
            <ng-template #emptymessage>
                <tr>
                    <td colspan="4" style="text-align:center;padding:40px;color:var(--text-color-secondary)">
                        Nenhum bloco de assinatura cadastrado.
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
            [style]="{'width':'540px'}"
            [header]="editando ? 'Editar bloco de assinatura' : 'Novo bloco de assinatura'"
        >
            <div class="form-field">
                <label>Nome do bloco *</label>
                <input pInputText [(ngModel)]="form.nome" placeholder="Ex: SIS - Contratação" />
            </div>

            <div class="form-field">
                <label>Tipo de assinatura</label>
                <p-select
                    [(ngModel)]="form.tipoAssinatura"
                    [options]="tipoOpts"
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Selecione o tipo"
                />
            </div>

            <div class="form-field">
                <label>Assinadores</label>
                <div style="display:flex;gap:8px;margin-bottom:10px">
                    <input
                        pInputText
                        [(ngModel)]="novoAssinadorEmail"
                        placeholder="E-mail do assinador"
                        style="flex:1"
                        (keyup.enter)="addAssinador()"
                    />
                    <p-button
                        icon="pi pi-plus"
                        severity="secondary"
                        [outlined]="true"
                        (click)="addAssinador()"
                        [disabled]="!novoAssinadorEmail.trim()"
                    />
                </div>

                @for (a of form.assinadores; track a.email; let i = $index) {
                    <div class="assinador-row">
                        <div class="assinador-ordem">{{ a.ordem }}</div>
                        <span style="flex:1;font-size:13px">{{ a.email }}</span>
                        <button
                            style="background:none;border:none;cursor:pointer;color:var(--text-color-secondary);padding:4px"
                            (click)="removeAssinador(i)"
                        >
                            <i class="pi pi-times" style="font-size:12px"></i>
                        </button>
                    </div>
                }

                @if (form.assinadores.length === 0) {
                    <p style="font-size:12px;color:var(--text-color-secondary);text-align:center;padding:16px;background:var(--surface-ground);border-radius:8px;margin:0">
                        Nenhum assinador adicionado
                    </p>
                }
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
export class AssinagoConfigBlocos {
    private toast = inject(MessageService);
    blocos: BlocoAssinatura[] = [
        {
            id: 1, nome: 'SIS - Contratação', tipoAssinatura: 'Token de e-mail',
            assinadores: [
                { email: 'ana.ferreira@setin.gov.br', nome: 'Ana Paula Ferreira', ordem: 1 },
                { email: 'bruno.lima@setin.gov.br',   nome: 'Bruno Lima',          ordem: 2 },
                { email: 'carla.dias@setin.gov.br',   nome: 'Carla Dias',          ordem: 3 },
            ]
        },
        {
            id: 2, nome: 'RH - Admissão', tipoAssinatura: 'Certificado digital',
            assinadores: [
                { email: 'diana.jones@rh.gov.br',    nome: 'Diana Jones',    ordem: 1 },
                { email: 'eduardo.kiefer@rh.gov.br', nome: 'Eduardo Kiefer', ordem: 2 },
            ]
        },
        {
            id: 3, nome: 'SEFAZ - Financeiro', tipoAssinatura: 'Todos',
            assinadores: [
                { email: 'igor.oliveira@sefaz.gov.br',  nome: 'Igor Oliveira',  ordem: 1 },
                { email: 'joana.prado@sefaz.gov.br',    nome: 'Joana Prado',    ordem: 2 },
                { email: 'kleber.queiroz@sefaz.gov.br', nome: 'Kleber Queiroz', ordem: 3 },
                { email: 'larissa.rocha@sefaz.gov.br',  nome: 'Larissa Rocha',  ordem: 4 },
            ]
        },
        {
            id: 4, nome: 'GABINETE', tipoAssinatura: 'Gov.br',
            assinadores: [
                { email: 'natalia.barros@gabinete.gov.br', nome: 'Natália Barros',      ordem: 1 },
                { email: 'oscar.pinto@gabinete.gov.br',    nome: 'Oscar Pinto',          ordem: 2 },
                { email: 'patricia.v@gabinete.gov.br',     nome: 'Patrícia Vasconcelos', ordem: 3 },
            ]
        },
        {
            id: 5, nome: 'CORREGEDORIA', tipoAssinatura: 'Certificado digital',
            assinadores: [
                { email: 'tania.lemos@corregedoria.gov.br',  nome: 'Tânia Lemos',  ordem: 1 },
                { email: 'ulisses.maia@corregedoria.gov.br', nome: 'Ulisses Maia', ordem: 2 },
                { email: 'vera.bastos@corregedoria.gov.br',  nome: 'Vera Bastos',  ordem: 3 },
            ]
        },
    ];

    tipoOpts = [
        { label: 'Todos os métodos',       value: 'Todos' },
        { label: 'Token de e-mail',        value: 'Token de e-mail' },
        { label: 'Certificado digital',    value: 'Certificado digital' },
        { label: 'Gov.br',                 value: 'Gov.br' },
    ];

    dialogVisible      = false;
    editando           = false;
    editandoId         = 0;
    novoAssinadorEmail = '';
    form: { nome: string; tipoAssinatura: string; assinadores: Assinador[] } = {
        nome: '', tipoAssinatura: 'Token de e-mail', assinadores: []
    };

    abrirDialog(b?: BlocoAssinatura) {
        this.editando   = !!b;
        this.editandoId = b?.id ?? 0;
        this.novoAssinadorEmail = '';
        this.form = {
            nome:           b?.nome           ?? '',
            tipoAssinatura: b?.tipoAssinatura ?? 'Token de e-mail',
            assinadores:    b ? b.assinadores.map(a => ({ ...a })) : [],
        };
        this.dialogVisible = true;
    }

    addAssinador() {
        const email = this.novoAssinadorEmail.trim();
        if (!email || this.form.assinadores.some(a => a.email === email)) return;
        this.form.assinadores.push({ email, nome: email.split('@')[0], ordem: this.form.assinadores.length + 1 });
        this.novoAssinadorEmail = '';
    }

    removeAssinador(idx: number) {
        this.form.assinadores.splice(idx, 1);
        this.form.assinadores.forEach((a, i) => (a.ordem = i + 1));
    }

    salvar() {
        if (this.editando) {
            const b = this.blocos.find(x => x.id === this.editandoId);
            if (b) {
                b.nome           = this.form.nome;
                b.tipoAssinatura = this.form.tipoAssinatura;
                b.assinadores    = [...this.form.assinadores];
            }
            this.toast.add({ severity: 'success', summary: 'Bloco atualizado', detail: `"${this.form.nome}" foi atualizado com sucesso.`, life: 3000 });
        } else {
            this.blocos = [
                ...this.blocos,
                { id: Date.now(), nome: this.form.nome, tipoAssinatura: this.form.tipoAssinatura, assinadores: [...this.form.assinadores] }
            ];
            this.toast.add({ severity: 'success', summary: 'Bloco criado', detail: `"${this.form.nome}" foi adicionado à lista.`, life: 3000 });
        }
        this.dialogVisible = false;
    }

    excluir(b: BlocoAssinatura) {
        this.blocos = this.blocos.filter(x => x.id !== b.id);
        this.toast.add({ severity: 'warn', summary: 'Bloco removido', detail: `"${b.nome}" foi excluído.`, life: 3000 });
    }

    iniciais(nomeOuEmail: string): string {
        const partes = nomeOuEmail.split(/[\s.@]/);
        return (partes[0]?.[0] ?? '') + (partes[1]?.[0] ?? '');
    }
}
