import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';

interface Etiqueta { id: number; descricao: string; representacao: string; cor: string; situacao: string; }

@Component({
    selector: 'app-dracon-listar-etiquetas',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, SelectModule, TableModule, TooltipModule, TagModule],
    template: `
<div class="list-container">
    <div class="list-header">
        <h2 class="list-title">Listar etiquetas</h2>
        <p-button label="Nova etiqueta" icon="pi pi-plus" (onClick)="novaEtiqueta()" />
    </div>

    <div class="id-bar">
        <span class="id-label"><i class="pi pi-id-card"></i> Identificação</span>
        <span class="id-item"><strong>Usuário</strong> João da Silva</span>
        <span class="id-item"><strong>Unidade</strong> 21189 - Gerência de Tecnologia do Estado</span>
    </div>

    <div class="filter-card">
        <div class="filter-row">
            <div class="filter-field"><label>Descrição</label><input pInputText [(ngModel)]="filtro.descricao" placeholder="Digite aqui" /></div>
            <div class="filter-field"><label>Situação</label><p-select [(ngModel)]="filtro.situacao" [options]="situacoes" placeholder="Selecione uma opção" [showClear]="true" /></div>
        </div>
        <div class="filter-actions">
            <p-button label="Limpar filtro" severity="secondary" [outlined]="true" (onClick)="limparFiltro()" />
            <p-button label="Filtrar" icon="pi pi-filter" />
        </div>
    </div>

    <p-table [value]="etiquetas" styleClass="p-datatable-sm ds-table"
             [rows]="10" [paginator]="true" [totalRecords]="60"
             [showCurrentPageReport]="true"
             currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords} resultados"
             dataKey="id">
        <ng-template pTemplate="header"><tr>
            <th pSortableColumn="descricao">Descrição <p-sortIcon field="descricao" /></th>
            <th pSortableColumn="representacao">Representação <p-sortIcon field="representacao" /></th>
            <th pSortableColumn="situacao">Situação <p-sortIcon field="situacao" /></th>
            <th style="width:4rem">Ações</th>
        </tr></ng-template>
        <ng-template pTemplate="body" let-e><tr>
            <td>{{ e.descricao }}</td>
            <td>
                <span class="etiq-chip" [style.background]="e.cor + '22'" [style.border-color]="e.cor" [style.color]="e.cor">
                    {{ e.representacao }}
                </span>
            </td>
            <td><p-tag [value]="e.situacao" [severity]="e.situacao === 'Ativo' ? 'success' : 'secondary'" /></td>
            <td>
                <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" pTooltip="Editar" (onClick)="editarEtiqueta(e)" />
            </td>
        </tr></ng-template>
        <ng-template pTemplate="emptymessage">
            <tr><td colspan="4" class="text-center p-4">Nenhuma etiqueta encontrada</td></tr>
        </ng-template>
    </p-table>
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
        .filter-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; }
        .filter-row { display: grid; grid-template-columns: repeat(2,1fr); gap: 1rem; margin-bottom: .75rem; }
        .filter-field { display: flex; flex-direction: column; gap: .25rem; }
        .filter-field label { font-size: .8125rem; font-weight: 500; color: #475569; }
        .filter-field input, .filter-field p-select { width: 100%; }
        .filter-actions { display: flex; justify-content: flex-end; gap: .5rem; }
        .etiq-chip { display: inline-block; padding: .15rem .6rem; border-radius: 999px;
                     border: 1.5px solid; font-size: .8125rem; font-weight: 500; }
    `]
})
export class DraconListarEtiquetas implements OnInit {
    private router = inject(Router);
    etiquetas: Etiqueta[] = [];
    filtro = { descricao: '', situacao: null as any };
    situacoes = [{ label: 'Ativo', value: 'ativo' }, { label: 'Inativo', value: 'inativo' }];
    ngOnInit() {
        const cores = ['#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#8b5cf6'];
        const nomes = ['Em atraso', 'Concluído', 'Urgente', 'Em análise', 'Pendente'];
        this.etiquetas = Array.from({ length: 10 }, (_, i) => ({
            id: i + 1, descricao: nomes[i % nomes.length],
            representacao: nomes[i % nomes.length],
            cor: cores[i % cores.length],
            situacao: i % 2 === 0 ? 'Ativo' : 'Inativo',
        }));
    }
    limparFiltro() { this.filtro = { descricao: '', situacao: null }; }
    novaEtiqueta() { this.router.navigate(['/dracon/cadastros/etiquetas/nova']); }
    editarEtiqueta(e: Etiqueta) { this.router.navigate(['/dracon/cadastros/etiquetas', e.id]); }
}
