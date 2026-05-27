import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';

interface VersaoAto {
    versao: number;
    tipo: string;
    descricao: string;
    criadoPor: string;
    data: string;
    atual: boolean;
}

const MOCK_VERSOES: VersaoAto[] = [
    { versao: 3, tipo: 'Instrução Normativa', descricao: 'Revisão final com ajustes jurídicos e complementação de artigos',              criadoPor: 'Luciano Fagundes',       data: '16/01/2025 09:45', atual: true  },
    { versao: 2, tipo: 'Instrução Normativa', descricao: 'Segunda versão com inclusão de parágrafos sobre compliance digital',           criadoPor: 'Carlos Eduardo Martins', data: '15/01/2025 14:20', atual: false },
    { versao: 1, tipo: 'Instrução Normativa', descricao: 'Versão inicial do documento enviada para análise da assessoria jurídica',      criadoPor: 'Carlos Eduardo Martins', data: '15/01/2025 10:15', atual: false },
];

@Component({
    selector: 'app-dracon-versoes-ato',
    standalone: true,
    imports: [CommonModule, ButtonModule, TableModule, TooltipModule, TagModule],
    styles: [`
        :host { --dracon: #1755A3; }
        .page-header { margin-bottom: 28px; display:flex; justify-content:space-between; align-items:flex-start; }
        .breadcrumb  { font-size: 12px; color: var(--text-color-secondary); margin-bottom: 4px; }
        .page-title  { font-size: 28px; font-weight: 800; color: var(--text-color); margin: 0; }

        .info-card {
            background: color-mix(in srgb, #1755A3 6%, transparent);
            border: 1px solid color-mix(in srgb, #1755A3 20%, transparent);
            border-radius: 8px; padding: 14px 18px; margin-bottom: 24px;
            font-size: 13px; color: var(--text-color);
        }

        .list-container { border: 1px solid var(--surface-border); border-radius: 8px; overflow: hidden; }

        ::ng-deep .ds-table { border: none !important; border-radius: 0 !important; }
        ::ng-deep .ds-table .p-datatable-table-container { border-radius: 0 !important; }
        ::ng-deep .ds-table .p-datatable-paginator-bottom { border-top: 1px solid var(--surface-border) !important; border-radius: 0 !important; }
        ::ng-deep .ds-table .p-datatable-thead > tr > th {
            background: var(--surface-ground) !important; font-size: 12px; font-weight: 700;
            color: var(--text-color-secondary) !important; border-bottom: 1px solid var(--surface-border) !important; padding: 10px 12px !important;
        }
        ::ng-deep .ds-table .p-datatable-tbody > tr > td {
            padding: 10px 12px !important; border-bottom: 1px solid var(--surface-border) !important; font-size: 13px;
        }
        ::ng-deep .ds-table .p-datatable-tbody > tr:last-child > td { border-bottom: none !important; }
        ::ng-deep .ds-table .p-datatable-tbody > tr:hover > td { background: var(--surface-ground) !important; }

        .act-btn {
            width: 28px; height: 28px; border-radius: 6px;
            border: 1px solid var(--surface-border); background: var(--surface-card);
            display: inline-flex; align-items: center; justify-content: center;
            cursor: pointer; transition: all .12s; color: var(--text-color-secondary); font-size: 12px;
        }
        .act-btn:hover { background: #EFF6FF; border-color: #1755A3; color: #1755A3; }
    `],
    template: `
        <div class="page-header">
            <div>
                <div class="breadcrumb">Atos › Listagem › Visualizar versões</div>
                <h1 class="page-title">Versões do ato — {{ processoDracon }}</h1>
            </div>
            <p-button label="Voltar" severity="secondary" [outlined]="true" icon="pi pi-arrow-left" (click)="voltar()" />
        </div>

        <div class="info-card">
            <i class="pi pi-info-circle" style="color:#1755A3;margin-right:8px"></i>
            <strong>{{ versoes.length }} versões encontradas.</strong>
            A versão atual é a <strong>v{{ versaoAtual }}</strong>, criada em {{ dataAtual }}.
        </div>

        <div class="list-container">
            <p-table
                [value]="versoes"
                styleClass="p-datatable-sm ds-table"
                [tableStyle]="{'min-width':'100%'}"
                [paginator]="true" [rows]="10"
                paginatorDropdownAppendTo="body"
            >
                <ng-template #header>
                    <tr>
                        <th style="width:80px;text-align:center">Versão</th>
                        <th pSortableColumn="tipo" style="min-width:160px">Tipo <p-sortIcon field="tipo"/></th>
                        <th style="min-width:300px">Descrição da alteração</th>
                        <th pSortableColumn="criadoPor" style="min-width:180px">Criado por <p-sortIcon field="criadoPor"/></th>
                        <th pSortableColumn="data" style="min-width:150px">Data / Hora <p-sortIcon field="data"/></th>
                        <th style="width:80px;text-align:center">Ações</th>
                    </tr>
                </ng-template>
                <ng-template #body let-v>
                    <tr>
                        <td style="text-align:center">
                            <span style="font-size:13px;font-weight:700;color:#1755A3">v{{ v.versao }}</span>
                            @if (v.atual) {
                                <span style="display:block;font-size:9px;font-weight:700;color:#059669;text-transform:uppercase">atual</span>
                            }
                        </td>
                        <td style="font-size:12px;color:var(--text-color-secondary)">{{ v.tipo }}</td>
                        <td style="font-size:13px">{{ v.descricao }}</td>
                        <td style="color:var(--text-color-secondary);font-size:12px">{{ v.criadoPor }}</td>
                        <td style="font-size:12px">{{ v.data }}</td>
                        <td style="text-align:center">
                            <button class="act-btn" pTooltip="Visualizar esta versão" tooltipPosition="left">
                                <i class="pi pi-eye"></i>
                            </button>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `
})
export class DraconVersoesAto implements OnInit {
    private route  = inject(ActivatedRoute);
    private router = inject(Router);

    versoes: VersaoAto[] = [...MOCK_VERSOES];
    processoDracon = '2025000118';
    versaoAtual    = 3;
    dataAtual      = '16/01/2025 09:45';

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id')) || 3;
        this.processoDracon = `202500${String(id).padStart(4, '0')}`;
    }

    voltar() { this.router.navigate(['/dracon/atos']); }
}
