import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

interface Linha { nome: string; tipo: string; responsavel: string; status: 'Ativo' | 'Pendente' | 'Inativo'; data: string; }

/**
 * TEMPLATE — Lista com filtros.
 * Padrão para telas de consulta: card branco (bento) para os filtros e outro
 * para a tabela. Copie este arquivo como ponto de partida de novas listagens.
 */
@Component({
    selector: 'app-tpl-lista',
    standalone: true,
    imports: [FormsModule, ButtonModule, InputTextModule, IconFieldModule, InputIconModule, SelectModule, TableModule, TagModule],
    template: `
    <div class="ds-page">
        <div class="ds-page-header">
            <h1 class="ds-page-title">Lista com filtros</h1>
            <p-button label="Novo registro" icon="pi pi-plus" />
        </div>

        <!-- Card de filtros -->
        <div class="ds-card">
            <div class="ds-grid ds-grid--form">
                <div class="ds-campo">
                    <label>Buscar</label>
                    <p-iconfield>
                        <p-inputicon class="pi pi-search" />
                        <input pInputText [(ngModel)]="busca" placeholder="Nome ou responsável" />
                    </p-iconfield>
                </div>
                <div class="ds-campo">
                    <label>Status</label>
                    <p-select [options]="statusOpts" [(ngModel)]="status" placeholder="Todos" [showClear]="true" />
                </div>
                <div class="ds-campo">
                    <label>Tipo</label>
                    <p-select [options]="tipoOpts" [(ngModel)]="tipo" placeholder="Todos" [showClear]="true" />
                </div>
                <div class="ds-campo" style="justify-content: flex-end;">
                    <div class="ds-acoes-row">
                        <p-button label="Filtrar" icon="pi pi-filter" />
                        <p-button label="Limpar" icon="pi pi-times" [text]="true" (onClick)="limpar()" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Card da tabela -->
        <div class="ds-card">
            <p-table [value]="linhasFiltradas()" [paginator]="true" [rows]="5" [rowsPerPageOptions]="[5, 10, 20]"
                     [globalFilterFields]="['nome','responsavel']" styleClass="p-datatable-sm">
                <ng-template #header>
                    <tr>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Responsável</th>
                        <th>Status</th>
                        <th>Data</th>
                        <th style="width: 8rem;">Ações</th>
                    </tr>
                </ng-template>
                <ng-template #body let-l>
                    <tr>
                        <td>{{ l.nome }}</td>
                        <td>{{ l.tipo }}</td>
                        <td>{{ l.responsavel }}</td>
                        <td><p-tag [value]="l.status" [severity]="sev(l.status)" /></td>
                        <td>{{ l.data }}</td>
                        <td>
                            <div class="ds-acoes-row">
                                <p-button icon="pi pi-pencil" [text]="true" [rounded]="true" pTooltip="Editar" />
                                <p-button icon="pi pi-trash" [text]="true" [rounded]="true" severity="danger" pTooltip="Excluir" />
                            </div>
                        </td>
                    </tr>
                </ng-template>
                <ng-template #emptymessage>
                    <tr><td colspan="6" style="text-align: center; padding: 2rem;">Nenhum registro encontrado.</td></tr>
                </ng-template>
            </p-table>
        </div>
    </div>
  `,
})
export class TplLista {
    busca = '';
    status: string | null = null;
    tipo: string | null = null;

    statusOpts = ['Ativo', 'Pendente', 'Inativo'];
    tipoOpts = ['Projeto', 'Documento', 'Relatório'];

    private dados = signal<Linha[]>([
        { nome: 'Portal do Servidor', tipo: 'Projeto', responsavel: 'Ana Souza', status: 'Ativo', data: '02/07/2026' },
        { nome: 'Relatório Trimestral', tipo: 'Relatório', responsavel: 'Bruno Lima', status: 'Pendente', data: '28/06/2026' },
        { nome: 'Manual de Integração', tipo: 'Documento', responsavel: 'Carla Dias', status: 'Ativo', data: '15/06/2026' },
        { nome: 'App de Vistorias', tipo: 'Projeto', responsavel: 'Diego Melo', status: 'Inativo', data: '10/06/2026' },
        { nome: 'API de Pagamentos', tipo: 'Projeto', responsavel: 'Elis Rocha', status: 'Ativo', data: '05/06/2026' },
        { nome: 'Auditoria 2026', tipo: 'Relatório', responsavel: 'Fábio Nunes', status: 'Pendente', data: '01/06/2026' },
    ]);

    linhasFiltradas = signal<Linha[]>(this.dados());

    private aplicar() {
        const b = this.busca.trim().toLowerCase();
        this.linhasFiltradas.set(this.dados().filter(l =>
            (!b || l.nome.toLowerCase().includes(b) || l.responsavel.toLowerCase().includes(b)) &&
            (!this.status || l.status === this.status) &&
            (!this.tipo || l.tipo === this.tipo)));
    }

    ngDoCheck() { this.aplicar(); }

    limpar() { this.busca = ''; this.status = null; this.tipo = null; }

    sev(s: string): 'success' | 'warn' | 'danger' {
        return s === 'Ativo' ? 'success' : s === 'Pendente' ? 'warn' : 'danger';
    }
}
