import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';

interface RowItem {
    id: number;
    header: string;
    tag: string;
    tagSeverity: 'success' | 'secondary' | 'danger' | 'warn' | 'info' | 'contrast';
    tagColor?: string;
    data: string;
    descricao: string;
    valor: number;
}

@Component({
    selector: 'app-lista-filtros',
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        ButtonModule, InputTextModule, InputMaskModule,
        InputNumberModule, TableModule, TagModule,
        PaginatorModule, TooltipModule
    ],
    styles: [`
        :host { display: block; width: 100%; }

        /* ── page header ── */
        .tpl-page-header {
            display: flex; align-items: center; justify-content: space-between;
            margin-bottom: 24px;
        }
        .tpl-page-title {
            font-size: 22px; font-weight: 800; color: var(--text-color);
            letter-spacing: -.02em; margin: 0;
        }

        /* ── filter card ── */
        .filter-card {
            background: var(--surface-card);
            border: 1px solid var(--surface-border);
            border-radius: 10px;
            padding: 18px 20px 14px;
            margin-bottom: 20px;
        }
        .filter-card-title {
            font-size: 13px; font-weight: 700; color: var(--text-color);
            margin: 0 0 14px; letter-spacing: -.01em;
        }
        .filter-row {
            display: grid;
            grid-template-columns: 1.4fr 1.4fr 1.4fr 1fr 1fr 1fr;
            gap: 10px;
            margin-bottom: 12px;
        }
        .filter-field { display: flex; flex-direction: column; gap: 5px; }
        .filter-label {
            font-size: 11px; font-weight: 600; color: var(--text-color-secondary);
            letter-spacing: .02em;
        }
        .filter-actions {
            display: flex; align-items: center; justify-content: flex-end;
            gap: 8px; margin-top: 4px;
        }
        .filter-more-btn {
            display: flex; align-items: center; gap: 6px;
            background: none; border: none; cursor: pointer;
            color: var(--text-color-secondary); font-size: 13px; font-weight: 600;
            padding: 6px 10px; border-radius: 6px;
            transition: color .15s, background .15s;
        }
        .filter-more-btn:hover { color: var(--text-color); background: var(--surface-hover); }

        /* ── table card ── */
        .table-card {
            background: var(--surface-card);
            border: 1px solid var(--surface-border);
            border-radius: 10px;
            overflow: hidden;
        }

        /* ── action icons ── */
        .action-btn {
            width: 30px; height: 30px; border-radius: 6px;
            border: none; background: none; cursor: pointer;
            display: inline-flex; align-items: center; justify-content: center;
            color: var(--text-color-secondary); font-size: 13px;
            transition: background .12s, color .12s;
        }
        .action-btn:hover { background: var(--surface-hover); color: var(--text-color); }
        .action-btn.danger:hover { background: #FEE2E2; color: #DC2626; }

        /* ── paginator row ── */
        .paginator-row {
            display: flex; align-items: center; justify-content: center;
            padding: 12px 20px;
            border-top: 1px solid var(--surface-border);
        }

        /* ── custom tag colors (beyond PrimeNG severity) ── */
        .tag-ativo    { background: #D1FAE5; color: #065F46; font-weight: 700; font-size: 11px; padding: 2px 10px; border-radius: 4px; }
        .tag-inativo  { background: var(--surface-ground); color: var(--text-color-secondary); font-weight: 700; font-size: 11px; padding: 2px 10px; border-radius: 4px; border: 1px solid var(--surface-border); }
        .tag-vencido  { background: #FEE2E2; color: #991B1B; font-weight: 700; font-size: 11px; padding: 2px 10px; border-radius: 4px; }
        .tag-avencer  { background: #FEF3C7; color: #92400E; font-weight: 700; font-size: 11px; padding: 2px 10px; border-radius: 4px; }
        .tag-neutro   { background: #CCFBF1; color: #0F766E; font-weight: 700; font-size: 11px; padding: 2px 10px; border-radius: 4px; }

        /* ── override table styles ── */
        :host ::ng-deep .tpl-table .p-datatable-table-container { border: none; border-radius: 0; }
        :host ::ng-deep .tpl-table .p-datatable-thead > tr > th {
            background: var(--surface-ground);
            border-bottom: 1px solid var(--surface-border);
            font-size: 12px; font-weight: 700; color: var(--text-color);
            padding: 11px 16px;
        }
        :host ::ng-deep .tpl-table .p-datatable-tbody > tr > td {
            padding: 11px 16px;
            border-bottom: 1px solid var(--surface-border);
            font-size: 13px; color: var(--text-color);
        }
        :host ::ng-deep .tpl-table .p-datatable-tbody > tr:last-child > td { border-bottom: none; }
        :host ::ng-deep .tpl-table .p-datatable-tbody > tr:hover > td {
            background: color-mix(in srgb, var(--primary-color) 4%, var(--surface-card));
        }
        :host ::ng-deep .p-paginator { background: transparent; border: none; padding: 0; }
        :host ::ng-deep .p-inputtext { width: 100%; }
        :host ::ng-deep .p-inputnumber { width: 100%; }
        :host ::ng-deep .p-inputnumber input { width: 100%; }
    `],
    template: `
        <!-- Page header -->
        <div class="tpl-page-header">
            <h1 class="tpl-page-title">&lt;Nome da página&gt;</h1>
            <p-button label="Cadastrar &lt;nome&gt;" icon="pi pi-plus" />
        </div>

        <!-- Filters -->
        <div class="filter-card">
            <p class="filter-card-title">Inputs de texto – Filtros de pesquisa</p>
            <div class="filter-row">
                <div class="filter-field">
                    <span class="filter-label">Texto</span>
                    <input pInputText [(ngModel)]="f.texto" placeholder="Digite" />
                </div>
                <div class="filter-field">
                    <span class="filter-label">Texto</span>
                    <p-inputmask [(ngModel)]="f.cpf" mask="999.999.999-99" placeholder="000.000.000-00" />
                </div>
                <div class="filter-field">
                    <span class="filter-label">Texto</span>
                    <p-inputmask [(ngModel)]="f.cep" mask="99999-999" placeholder="00000-000" />
                </div>
                <div class="filter-field">
                    <span class="filter-label">Valor</span>
                    <p-inputnumber [(ngModel)]="f.valor1" mode="currency" currency="BRL" locale="pt-BR" />
                </div>
                <div class="filter-field">
                    <span class="filter-label">Valor</span>
                    <p-inputnumber [(ngModel)]="f.valor2" mode="currency" currency="BRL" locale="pt-BR" />
                </div>
                <div class="filter-field">
                    <span class="filter-label">Valor</span>
                    <p-inputnumber [(ngModel)]="f.valor3" mode="currency" currency="BRL" locale="pt-BR" />
                </div>
            </div>
            <div class="filter-actions">
                <button class="filter-more-btn">
                    <i class="pi pi-filter"></i> Mais filtros
                </button>
                <p-button label="Limpar" severity="secondary" outlined (click)="limparFiltros()" />
                <p-button label="Filtrar" icon="pi pi-search" (click)="filtrar()" />
            </div>
        </div>

        <!-- Table -->
        <div class="table-card">
            <p-table
                [value]="rows"
                styleClass="tpl-table"
                [tableStyle]="{'min-width':'100%'}"
                [sortField]="'header'"
                [sortOrder]="1"
            >
                <ng-template pTemplate="header">
                    <tr>
                        <th pSortableColumn="header">
                            Header <p-sortIcon field="header" />
                        </th>
                        <th pSortableColumn="tag" style="width:140px">
                            Uso das tags <p-sortIcon field="tag" />
                        </th>
                        <th pSortableColumn="data" style="width:120px">
                            Data <p-sortIcon field="data" />
                        </th>
                        <th pSortableColumn="descricao">
                            Descrição <p-sortIcon field="descricao" />
                        </th>
                        <th pSortableColumn="valor" style="width:160px; text-align:right">
                            Valor <p-sortIcon field="valor" />
                        </th>
                        <th style="width:130px; text-align:center">Ações</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-row>
                    <tr>
                        <td>{{ row.header }}</td>
                        <td>
                            <span [class]="getTagClass(row.tag)">{{ row.tag }}</span>
                        </td>
                        <td>{{ row.data }}</td>
                        <td style="max-width:0">
                            <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:420px;color:var(--text-color-secondary);font-size:12px">
                                {{ row.descricao }}
                            </div>
                        </td>
                        <td style="text-align:right;font-weight:600;font-variant-numeric:tabular-nums">
                            {{ row.valor | currency:'BRL':'symbol':'1.2-2':'pt-BR' }}
                        </td>
                        <td style="text-align:center">
                            <button class="action-btn" pTooltip="Editar" tooltipPosition="top">
                                <i class="pi pi-pencil"></i>
                            </button>
                            <button class="action-btn" pTooltip="Visualizar" tooltipPosition="top">
                                <i class="pi pi-eye"></i>
                            </button>
                            <button class="action-btn danger" pTooltip="Excluir" tooltipPosition="top">
                                <i class="pi pi-trash"></i>
                            </button>
                            <button class="action-btn" pTooltip="Mais opções" tooltipPosition="top">
                                <i class="pi pi-list"></i>
                            </button>
                        </td>
                    </tr>
                </ng-template>
            </p-table>

            <!-- Paginator -->
            <div class="paginator-row">
                <p-paginator
                    [rows]="10"
                    [totalRecords]="50"
                    [rowsPerPageOptions]="[10, 25, 50]"
                    [pageLinkSize]="5"
                />
            </div>
        </div>
    `
})
export class ListaFiltrosTemplate implements OnInit {

    f = { texto: '', cpf: '', cep: '', valor1: 0, valor2: 0, valor3: 0 };

    rows: RowItem[] = [];

    ngOnInit() {
        const desc = 'Para linhas com muitos caracteres, delimitar tamanho com "..." e inserir modal de "Detalhes"';
        this.rows = [
            { id: 1,  header: 'Nome do conteúdo aqui', tag: 'Ativo',    tagSeverity: 'success',   data: '06/12/2025', descricao: desc, valor: 1000 },
            { id: 2,  header: 'Nome do conteúdo aqui', tag: 'Inativo',  tagSeverity: 'secondary', data: '07/12/2025', descricao: desc, valor: 1000 },
            { id: 3,  header: 'Nome do conteúdo aqui', tag: 'Vencido',  tagSeverity: 'danger',    data: '08/12/2025', descricao: desc, valor: 1000000 },
            { id: 4,  header: 'Nome do conteúdo aqui', tag: 'A vencer', tagSeverity: 'warn',      data: '09/12/2025', descricao: desc, valor: 1000000 },
            { id: 5,  header: 'Nome do conteúdo aqui', tag: 'Tag',      tagSeverity: 'info',      data: '10/12/2025', descricao: desc, valor: 1000 },
            { id: 6,  header: 'Nome do conteúdo aqui', tag: 'Tag',      tagSeverity: 'info',      data: '05/01/2026', descricao: desc, valor: 1000000000 },
            { id: 7,  header: 'Nome do conteúdo aqui', tag: 'Tag',      tagSeverity: 'info',      data: '01/04/2026', descricao: desc, valor: 1000 },
            { id: 8,  header: 'Nome do conteúdo aqui', tag: 'Tag',      tagSeverity: 'info',      data: '31/07/2026', descricao: desc, valor: 1000 },
            { id: 9,  header: 'Nome do conteúdo aqui', tag: 'Tag',      tagSeverity: 'info',      data: '12/12/2026', descricao: desc, valor: 1000 },
            { id: 10, header: 'Nome do conteúdo aqui', tag: 'Tag',      tagSeverity: 'info',      data: '14/09/2026', descricao: desc, valor: 1000 },
        ];
    }

    getTagClass(tag: string): string {
        const map: Record<string, string> = {
            'Ativo':    'tag-ativo',
            'Inativo':  'tag-inativo',
            'Vencido':  'tag-vencido',
            'A vencer': 'tag-avencer',
            'Tag':      'tag-neutro',
        };
        return map[tag] ?? 'tag-neutro';
    }

    limparFiltros() {
        this.f = { texto: '', cpf: '', cep: '', valor1: 0, valor2: 0, valor3: 0 };
    }

    filtrar() {
        // lógica de filtro aqui
    }
}
