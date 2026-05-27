import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

interface EventoAuditoria {
    id: number;
    processoDracon: string;
    acao: string;
    usuario: string;
    dataHora: string;
    detalhes: string;
    tipo: 'criacao' | 'edicao' | 'cancelamento' | 'publicacao' | 'tramitacao';
}

const MOCK_AUDITORIA: EventoAuditoria[] = [
    { id: 1,  processoDracon: '2025000089', acao: 'Criação do ato',        usuario: 'João da Silva Pereira',  dataHora: '10/01/2025 08:15:32', detalhes: 'Ato criado com tipo Decreto',                          tipo: 'criacao' },
    { id: 2,  processoDracon: '2025000089', acao: 'Alteração de situação', usuario: 'João da Silva Pereira',  dataHora: '11/01/2025 10:22:14', detalhes: 'Situação alterada de "Rascunho" para "Em elaboração"', tipo: 'edicao' },
    { id: 3,  processoDracon: '2025000089', acao: 'Edição de responsável', usuario: 'Maria Souza da Silva',   dataHora: '12/01/2025 14:05:50', detalhes: 'Responsável alterado para João da Silva Pereira',      tipo: 'edicao' },
    { id: 4,  processoDracon: '2025000102', acao: 'Criação do ato',        usuario: 'Maria Souza da Silva',   dataHora: '12/01/2025 09:00:00', detalhes: 'Ato criado com tipo Portaria',                         tipo: 'criacao' },
    { id: 5,  processoDracon: '2025000102', acao: 'Tramitação registrada', usuario: 'Carlos Eduardo Martins', dataHora: '13/01/2025 11:30:45', detalhes: 'Encaminhado para análise da documentação',             tipo: 'tramitacao' },
    { id: 6,  processoDracon: '2025000102', acao: 'Publicação do ato',     usuario: 'Fernanda Lima Costa',    dataHora: '14/01/2025 16:00:00', detalhes: 'Ato publicado no Diário Oficial Eletrônico',           tipo: 'publicacao' },
    { id: 7,  processoDracon: '2025000118', acao: 'Criação do ato',        usuario: 'Carlos Eduardo Martins', dataHora: '15/01/2025 10:15:00', detalhes: 'Ato criado com tipo Instrução Normativa',              tipo: 'criacao' },
    { id: 8,  processoDracon: '2025000118', acao: 'Alteração de situação', usuario: 'Luciano Fagundes',       dataHora: '16/01/2025 09:45:22', detalhes: 'Situação alterada para "Em análise"',                  tipo: 'edicao' },
    { id: 9,  processoDracon: '2025000137', acao: 'Criação do ato',        usuario: 'Ana Paula Rodrigues',    dataHora: '18/01/2025 08:30:00', detalhes: 'Ato criado com tipo Resolução',                        tipo: 'criacao' },
    { id: 10, processoDracon: '2025000137', acao: 'Cancelamento',          usuario: 'Luciano Fagundes',       dataHora: '19/01/2025 15:00:10', detalhes: 'Motivo: Processo duplicado — cancelamento aprovado',   tipo: 'cancelamento' },
    { id: 11, processoDracon: '2025000154', acao: 'Criação do ato',        usuario: 'Roberto Ferreira Neto',  dataHora: '20/01/2025 09:00:00', detalhes: 'Ato criado com tipo Despacho',                         tipo: 'criacao' },
    { id: 12, processoDracon: '2025000171', acao: 'Tramitação registrada', usuario: 'Fernanda Lima Costa',    dataHora: '23/01/2025 11:20:33', detalhes: 'Tramitação para Gerência de RH concluída',             tipo: 'tramitacao' },
];

@Component({
    selector: 'app-dracon-auditoria-ato',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, TableModule, TagModule, TooltipModule],
    styles: [`
        :host { --dracon: #1755A3; }
        .page-header { margin-bottom: 28px; display:flex; justify-content:space-between; align-items:flex-start; }
        .breadcrumb  { font-size: 12px; color: var(--text-color-secondary); margin-bottom: 4px; }
        .page-title  { font-size: 28px; font-weight: 800; color: var(--text-color); margin: 0; }

        .list-container { border: 1px solid var(--surface-border); border-radius: 8px; overflow: hidden; }

        ::ng-deep .dracon-table { border: none !important; border-radius: 0 !important; }
        ::ng-deep .dracon-table .p-datatable-table-container { border-radius: 0 !important; }
        ::ng-deep .dracon-table .p-datatable-paginator-bottom { border-top: 1px solid var(--surface-border) !important; border-radius: 0 !important; }
        ::ng-deep .dracon-table .p-datatable-thead > tr > th {
            background: var(--surface-ground) !important; font-size: 12px; font-weight: 700;
            color: var(--text-color-secondary) !important; border-bottom: 1px solid var(--surface-border) !important; padding: 10px 12px !important;
        }
        ::ng-deep .dracon-table .p-datatable-tbody > tr > td {
            padding: 10px 12px !important; border-bottom: 1px solid var(--surface-border) !important; font-size: 13px;
        }
        ::ng-deep .dracon-table .p-datatable-tbody > tr:last-child > td { border-bottom: none !important; }
        ::ng-deep .dracon-table .p-datatable-tbody > tr:hover > td { background: var(--surface-ground) !important; }

        .tipo-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 6px; flex-shrink: 0; }
    `],
    template: `
        <div class="page-header">
            <div>
                <div class="breadcrumb">Atos › Auditoria</div>
                <h1 class="page-title">Auditoria de atos</h1>
            </div>
            <p-button label="Voltar" severity="secondary" [outlined]="true" icon="pi pi-arrow-left" (click)="voltar()" />
        </div>

        <div class="list-container">
            <p-table
                [value]="eventos"
                styleClass="p-datatable-sm dracon-table"
                [tableStyle]="{'min-width':'100%'}"
                [paginator]="true" [rows]="10"
                paginatorDropdownAppendTo="body"
            >
                <ng-template #header>
                    <tr>
                        <th pSortableColumn="processoDracon" style="min-width:140px">Processo Drácon <p-sortIcon field="processoDracon"/></th>
                        <th pSortableColumn="acao" style="min-width:180px">Ação <p-sortIcon field="acao"/></th>
                        <th pSortableColumn="usuario" style="min-width:200px">Executado por <p-sortIcon field="usuario"/></th>
                        <th pSortableColumn="dataHora" style="min-width:160px">Data / Hora <p-sortIcon field="dataHora"/></th>
                        <th style="min-width:280px">Detalhes</th>
                    </tr>
                </ng-template>
                <ng-template #body let-ev>
                    <tr>
                        <td><strong>{{ ev.processoDracon }}</strong></td>
                        <td>
                            <div style="display:flex;align-items:center">
                                <span class="tipo-dot" [style.background]="tipoColor(ev.tipo)"></span>
                                {{ ev.acao }}
                            </div>
                        </td>
                        <td style="color:var(--text-color-secondary)">{{ ev.usuario }}</td>
                        <td style="font-size:12px">{{ ev.dataHora }}</td>
                        <td style="font-size:12px;color:var(--text-color-secondary)">{{ ev.detalhes }}</td>
                    </tr>
                </ng-template>
                <ng-template #emptymessage>
                    <tr><td colspan="5" style="text-align:center;padding:40px;color:var(--text-color-secondary)">Nenhum evento de auditoria encontrado.</td></tr>
                </ng-template>
            </p-table>
        </div>
    `
})
export class DraconAuditoriaAto {
    private router = inject(Router);
    eventos = [...MOCK_AUDITORIA];

    tipoColor(tipo: string): string {
        const m: Record<string, string> = {
            criacao: '#3ACC75', edicao: '#F97316',
            cancelamento: '#EF4444', publicacao: '#1755A3', tramitacao: '#A855F7',
        };
        return m[tipo] ?? '#9CA3AF';
    }

    voltar() { this.router.navigate(['/dracon/atos']); }
}
