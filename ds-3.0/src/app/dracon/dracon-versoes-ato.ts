import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';

interface VersaoAto {
    id: number; versao: string; data: string; situacao: string;
    acaoExecutada: string; executadoPor: string; responsavel: string;
    atual: boolean;
}

@Component({
    selector: 'app-dracon-versoes-ato',
    standalone: true,
    imports: [CommonModule, ButtonModule, TableModule, TooltipModule, TagModule],
    template: `
<div class="list-container">
    <div class="list-header"><h2 class="list-title">Versões do ato</h2></div>

    <div class="id-bar">
        <span class="id-label"><i class="pi pi-id-card"></i> Identificação</span>
        <span class="id-item"><strong>Usuário</strong> João da Silva</span>
        <span class="id-item"><strong>Unidade</strong> 21189 - Gerência de Tecnologia do Estado</span>
    </div>

    <!-- Detalhes do ato -->
    <div class="detail-card">
        <p class="detail-card-title">Detalhes do ato</p>
        <div class="detail-grid">
            <div class="detail-item"><label>Número do ato</label><span>00310031003100315457</span></div>
            <div class="detail-item"><label>Tipo modelo de ato</label><span>Autógrafo de lei</span></div>
            <div class="detail-item"><label>Assunto</label><span>Loren ipsum loren loren</span></div>
            <div class="detail-item"><label>Nível de acesso</label><span>Restrito</span></div>
            <div class="detail-item"><label>Data de criação</label><span>15/06/2025</span></div>
            <div class="detail-item"><label>Processo SEI</label><span>123456788923</span></div>
            <div class="detail-item"><label>Processo interno</label><span>123457892455</span></div>
            <div class="detail-item"><label>Situação de ato</label><span>Conclusão</span></div>
        </div>
    </div>

    <!-- Tabela de versões -->
    <p-table [value]="versoes" styleClass="p-datatable-sm ds-table"
             [rows]="10" [paginator]="true" [totalRecords]="60"
             [showCurrentPageReport]="true"
             currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords} resultados"
             dataKey="id">
        <ng-template pTemplate="header"><tr>
            <th pSortableColumn="versao">Versão <p-sortIcon field="versao" /></th>
            <th pSortableColumn="data">Data <p-sortIcon field="data" /></th>
            <th pSortableColumn="situacao">Situação <p-sortIcon field="situacao" /></th>
            <th pSortableColumn="acaoExecutada">Ação executada <p-sortIcon field="acaoExecutada" /></th>
            <th pSortableColumn="executadoPor">Executado por <p-sortIcon field="executadoPor" /></th>
            <th pSortableColumn="responsavel">Responsável <p-sortIcon field="responsavel" /></th>
            <th style="width:6rem">Ações</th>
        </tr></ng-template>
        <ng-template pTemplate="body" let-v><tr>
            <td>{{ v.versao }}</td>
            <td>{{ v.data }}</td>
            <td>{{ v.situacao }}</td>
            <td>{{ v.acaoExecutada }}</td>
            <td>{{ v.executadoPor }}</td>
            <td>{{ v.responsavel }}</td>
            <td>
                <div class="acoes-row">
                    <p-button icon="pi pi-eye" [rounded]="true" [text]="true" pTooltip="Visualizar" />
                    @if (v.atual) {
                        <p-button icon="pi pi-database" [rounded]="true" [text]="true" pTooltip="Restaurar versão" />
                    }
                </div>
            </td>
        </tr></ng-template>
        <ng-template pTemplate="emptymessage">
            <tr><td colspan="7" class="text-center p-4">Nenhuma versão encontrada</td></tr>
        </ng-template>
    </p-table>

    <div class="footer-actions">
        <p-button label="Voltar" severity="secondary" [outlined]="true" (onClick)="voltar()" />
    </div>
</div>`,
    styles: [`
        ::ng-deep .ds-table .p-datatable-thead > tr > th { background: #f8fafc; font-weight: 600; }
        .list-container { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
        .list-header { display: flex; justify-content: space-between; align-items: center; }
        .list-title { font-size: 1.5rem; font-weight: 700; margin: 0; }
        .id-bar { display: flex; align-items: center; gap: 1.5rem; padding: .6rem 1rem;
                  border: 1px solid #e2e8f0; border-radius: 8px; background: #fff; font-size: .875rem; }
        .id-label { font-weight: 600; display: flex; align-items: center; gap: .4rem; }
        .id-item strong { color: #1e293b; margin-right: .25rem; }
        .detail-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem; }
        .detail-card-title { font-size: 1rem; font-weight: 700; margin: 0 0 1rem; }
        .detail-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1rem; }
        .detail-item { display: flex; flex-direction: column; gap: .25rem; }
        .detail-item label { font-size: .75rem; font-weight: 700; color: #475569; }
        .detail-item span { font-size: .875rem; }
        .acoes-row { display: flex; gap: .25rem; }
        .footer-actions { display: flex; justify-content: flex-end; padding-top: .5rem; }
    `]
})
export class DraconVersoesAto implements OnInit {
    private router = inject(Router);
    versoes: VersaoAto[] = [];
    ngOnInit() {
        this.versoes = [
            { id: 1, versao: '1.0', data: '15/02/2025', situacao: 'Conclusão', acaoExecutada: 'Autógrafo de lei', executadoPor: 'Pedro Carvalho Amado', responsavel: 'Elizandra Silvério da Silva', atual: true },
            ...Array.from({ length: 9 }, (_, i) => ({
                id: i + 2, versao: i % 2 === 0 ? '1.2' : '1.0', data: '15/02/2025',
                situacao: 'Alteração textual', acaoExecutada: 'Autógrafo de lei',
                executadoPor: 'Pedro Carvalho Amado', responsavel: 'Elizandra Silvério da Silva', atual: false,
            })),
        ];
    }
    voltar() { this.router.navigate(['/dracon/atos']); }
}
