import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

interface HistoricoEtiqueta {
    id: number; etiqueta: string; cor: string;
    executadoPor: string; dataAcao: string; acaoExecutada: string;
}

@Component({
    selector: 'app-dracon-historico-etiquetas',
    standalone: true,
    imports: [CommonModule, ButtonModule, TableModule],
    template: `
<div class="page-container">
    <div class="page-header">
        <h2 class="page-title">Histórico de etiquetas</h2>
    </div>

    <div class="id-bar">
        <span class="id-label"><i class="pi pi-id-card"></i> Identificação</span>
        <span class="id-item"><strong>Usuário</strong> João da Silva</span>
        <span class="id-item"><strong>Unidade</strong> 21189 - Gerência de Tecnologia do Estado</span>
    </div>

    <div class="info-card">
        <div class="info-item"><label>Processo</label><span>DRN-2025-001234</span></div>
        <div class="info-item"><label>Tipo</label><span>Atos Administrativos</span></div>
    </div>

    <p-table [value]="historico" styleClass="p-datatable-sm ds-table"
             [rows]="10" [paginator]="true" [totalRecords]="historico.length"
             [showCurrentPageReport]="true"
             currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords} resultados"
             dataKey="id">
        <ng-template pTemplate="header"><tr>
            <th pSortableColumn="etiqueta">Etiqueta <p-sortIcon field="etiqueta" /></th>
            <th pSortableColumn="executadoPor">Executado por <p-sortIcon field="executadoPor" /></th>
            <th pSortableColumn="dataAcao">Data da ação <p-sortIcon field="dataAcao" /></th>
            <th pSortableColumn="acaoExecutada">Ação executada <p-sortIcon field="acaoExecutada" /></th>
        </tr></ng-template>
        <ng-template pTemplate="body" let-h><tr>
            <td>
                <span class="etiq-chip" [style.background]="h.cor + '22'" [style.border-color]="h.cor" [style.color]="h.cor">
                    {{ h.etiqueta }}
                </span>
            </td>
            <td>{{ h.executadoPor }}</td>
            <td>{{ h.dataAcao }}</td>
            <td>{{ h.acaoExecutada }}</td>
        </tr></ng-template>
        <ng-template pTemplate="emptymessage">
            <tr><td colspan="4" class="text-center p-4">Nenhum histórico encontrado</td></tr>
        </ng-template>
    </p-table>

    <div class="footer-actions">
        <p-button label="Voltar" severity="secondary" [outlined]="true" (onClick)="voltar()" />
    </div>
</div>`,
    styles: [`
        ::ng-deep .ds-table .p-datatable-thead > tr > th { background: #f8fafc; font-weight: 600; }
        .page-container { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
        .page-header { display: flex; justify-content: space-between; align-items: center; }
        .page-title { font-size: 1.5rem; font-weight: 700; margin: 0; }
        .id-bar { display: flex; align-items: center; gap: 1.5rem; padding: .6rem 1rem;
                  border: 1px solid #e2e8f0; border-radius: 8px; background: #fff; font-size: .875rem; }
        .id-label { font-weight: 600; display: flex; align-items: center; gap: .4rem; }
        .id-item strong { color: #1e293b; margin-right: .25rem; }
        .info-card { display: flex; gap: 2rem; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: .75rem 1rem; }
        .info-item { display: flex; flex-direction: column; gap: .15rem; }
        .info-item label { font-size: .75rem; font-weight: 600; color: #64748b; text-transform: uppercase; }
        .info-item span { font-size: .875rem; color: #1e293b; font-weight: 500; }
        .etiq-chip { display: inline-block; padding: .15rem .6rem; border-radius: 999px;
                     border: 1.5px solid; font-size: .8125rem; font-weight: 500; }
        .footer-actions { display: flex; justify-content: flex-end; padding-top: .5rem; }
    `]
})
export class DraconHistoricoEtiquetas {
    private router = inject(Router);

    historico: HistoricoEtiqueta[] = [
        { id: 1, etiqueta: 'Em atraso', cor: '#f59e0b', executadoPor: 'João da Silva', dataAcao: '12/05/2025 14:32', acaoExecutada: 'Vinculação' },
        { id: 2, etiqueta: 'Urgente', cor: '#ef4444', executadoPor: 'Maria Eduarda Fernandes', dataAcao: '10/05/2025 09:15', acaoExecutada: 'Vinculação' },
        { id: 3, etiqueta: 'Em análise', cor: '#3b82f6', executadoPor: 'Pedro Carvalho Amado', dataAcao: '08/05/2025 16:47', acaoExecutada: 'Remoção' },
        { id: 4, etiqueta: 'Concluído', cor: '#10b981', executadoPor: 'Elizandra Silvério da Silva', dataAcao: '05/05/2025 11:22', acaoExecutada: 'Vinculação' },
        ...Array.from({ length: 6 }, (_, i) => ({
            id: i + 5, etiqueta: 'Pendente', cor: '#8b5cf6',
            executadoPor: 'Bruno Pereira da Silva Oliveira',
            dataAcao: `0${i + 1}/05/2025 10:00`, acaoExecutada: i % 2 === 0 ? 'Vinculação' : 'Remoção',
        })),
    ];

    voltar() { this.router.navigate(['/dracon/processos']); }
}
