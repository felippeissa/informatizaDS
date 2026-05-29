import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { DrawerModule } from 'primeng/drawer';

interface ModeloItem {
    id: number; descricao: string; complexidade: string;
    peso: number; prazoTotal: string; situacao: string;
}

@Component({
    selector: 'app-dracon-listar-modelos',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, SelectModule, TableModule, TooltipModule, TagModule, DrawerModule],
    template: `
<div class="list-container">
    <div class="list-header">
        <h2 class="list-title">{{ titulo }}</h2>
        <p-button [label]="'Novo ' + labelSingular" icon="pi pi-plus" />
    </div>

    <div class="id-bar">
        <span class="id-label"><i class="pi pi-id-card"></i> Identificação</span>
        <span class="id-item"><strong>Usuário</strong> João da Silva</span>
        <span class="id-item"><strong>Unidade</strong> 21189 - Gerência de Tecnologia do Estado</span>
    </div>

    <div class="filter-card">
        <div class="filter-row">
            <div class="filter-field"><label>Descrição</label><input pInputText [(ngModel)]="filtro.descricao" placeholder="Digite aqui" /></div>
            <div class="filter-field"><label>Complexidade</label><p-select [(ngModel)]="filtro.complexidade" [options]="complexidades" placeholder="Selecione uma opção" [showClear]="true" /></div>
            @if (mostrarPeso) {
                <div class="filter-field"><label>Peso</label><input pInputText [(ngModel)]="filtro.peso" placeholder="Digite aqui" /></div>
                <div class="filter-field">
                    <label>Prazo total</label>
                    <input pInputText [(ngModel)]="filtro.prazoTotal" placeholder="Digite aqui" />
                    <small class="hint">Dias corridos</small>
                </div>
            }
        </div>
        <div class="filter-actions">
            <p-button label="Mais filtros" icon="pi pi-sliders-h" [text]="true" severity="secondary" />
            <p-button label="Limpar filtro" severity="secondary" [outlined]="true" (onClick)="limparFiltro()" />
            <p-button label="Filtrar" icon="pi pi-filter" />
        </div>
    </div>

    <p-table [value]="itens" styleClass="p-datatable-sm ds-table"
             [rows]="10" [paginator]="true" [totalRecords]="60"
             [showCurrentPageReport]="true"
             currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords} resultados"
             dataKey="id">
        <ng-template pTemplate="header"><tr>
            <th pSortableColumn="descricao">Descrição <p-sortIcon field="descricao" /></th>
            <th pSortableColumn="complexidade">Complexidade <p-sortIcon field="complexidade" /></th>
            @if (mostrarPeso) {
                <th pSortableColumn="peso">Peso <p-sortIcon field="peso" /></th>
                <th pSortableColumn="prazoTotal">Prazo total <p-sortIcon field="prazoTotal" /></th>
            }
            <th pSortableColumn="situacao">Situação <p-sortIcon field="situacao" /></th>
            <th style="width:7rem">Ações</th>
        </tr></ng-template>
        <ng-template pTemplate="body" let-item><tr>
            <td>{{ item.descricao }}</td>
            <td>{{ item.complexidade }}</td>
            @if (mostrarPeso) {
                <td>{{ item.peso }}</td>
                <td>{{ item.prazoTotal }}</td>
            }
            <td>
                <p-tag [value]="item.situacao" [severity]="item.situacao === 'Ativo' ? 'success' : 'secondary'" />
            </td>
            <td>
                <div class="acoes-row">
                    <p-button icon="pi pi-eye" [rounded]="true" [text]="true" pTooltip="Visualizar" (onClick)="expandir(item)" />
                    <p-button icon="pi pi-undo" [rounded]="true" [text]="true" pTooltip="Histórico" />
                    <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" pTooltip="Editar" />
                </div>
            </td>
        </tr></ng-template>
        <ng-template pTemplate="emptymessage">
            <tr><td [attr.colspan]="mostrarPeso ? 6 : 4" class="text-center p-4">Nenhum registro encontrado</td></tr>
        </ng-template>
    </p-table>
</div>

<p-drawer [(visible)]="drawerVisivel" position="right" [style]="{'width':'440px'}">
    <ng-template pTemplate="header"><span class="font-semibold text-lg">Detalhes</span></ng-template>
    @if (sel) {
        <div class="detail-grid">
            <div class="detail-item full"><label>Descrição</label><span>{{ sel.descricao }}</span></div>
            <div class="detail-item"><label>Complexidade</label><span>{{ sel.complexidade }}</span></div>
            @if (mostrarPeso) {
                <div class="detail-item"><label>Peso</label><span>{{ sel.peso }}</span></div>
                <div class="detail-item"><label>Prazo total</label><span>{{ sel.prazoTotal }}</span></div>
            }
            <div class="detail-item"><label>Situação</label>
                <p-tag [value]="sel.situacao" [severity]="sel.situacao === 'Ativo' ? 'success' : 'secondary'" />
            </div>
        </div>
    }
    <ng-template pTemplate="footer"><p-button label="Fechar" severity="secondary" [outlined]="true" (onClick)="drawerVisivel=false" class="w-full" /></ng-template>
</p-drawer>`,
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
        .filter-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 1rem; margin-bottom: .75rem; }
        .filter-field { display: flex; flex-direction: column; gap: .25rem; }
        .filter-field label { font-size: .8125rem; font-weight: 500; color: #475569; }
        .filter-field input, .filter-field p-select { width: 100%; }
        .filter-actions { display: flex; justify-content: flex-end; gap: .5rem; }
        .hint { color: #94a3b8; font-size: .75rem; }
        .acoes-row { display: flex; gap: .25rem; }
        .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; padding: .5rem 0; }
        .detail-item { display: flex; flex-direction: column; gap: .25rem; }
        .detail-item.full { grid-column: span 2; }
        .detail-item label { font-size: .75rem; font-weight: 600; color: #64748b; text-transform: uppercase; }
    `]
})
export class DraconListarModelos implements OnInit {
    private route = inject(ActivatedRoute);
    itens: ModeloItem[] = [];
    drawerVisivel = false;
    sel: ModeloItem | null = null;
    titulo = 'Listar tipo ato';
    labelSingular = 'tipo ato';
    mostrarPeso = true;
    filtro = { descricao: '', complexidade: null as any, peso: '', prazoTotal: '' };
    complexidades = [{ label: 'Alta', value: 'alta' }, { label: 'Média', value: 'media' }, { label: 'Baixa', value: 'baixa' }];

    ngOnInit() {
        const url = this.route.snapshot.url.map(s => s.path).join('/');
        if (url.includes('tipo-processo')) {
            this.titulo = 'Listar tipo de processo';
            this.labelSingular = 'tipo de processo';
            this.mostrarPeso = false;
        } else if (url.includes('modelos')) {
            this.titulo = 'Listar modelos de ato';
            this.labelSingular = 'modelo';
            this.mostrarPeso = false;
        }
        this.itens = Array.from({ length: 10 }, (_, i) => ({
            id: i + 1, descricao: 'Ato de nomeação', complexidade: 'Alta',
            peso: 90, prazoTotal: '90 dias', situacao: i % 2 === 0 ? 'Ativo' : 'Inativo',
        }));
    }
    limparFiltro() { this.filtro = { descricao: '', complexidade: null, peso: '', prazoTotal: '' }; }
    expandir(item: ModeloItem) { this.sel = item; this.drawerVisivel = true; }
}
