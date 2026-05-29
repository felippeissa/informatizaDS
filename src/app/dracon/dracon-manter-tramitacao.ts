import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';

interface Destinatario { id: number; nome: string; unidade: string; selecionado: boolean; }

@Component({
    selector: 'app-dracon-manter-tramitacao',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TextareaModule, SelectModule, DatePickerModule, TableModule, TooltipModule, TagModule],
    template: `
<div class="page-container">
    <div class="page-header">
        <h2 class="page-title">Nova tramitação</h2>
    </div>

    <div class="id-bar">
        <span class="id-label"><i class="pi pi-id-card"></i> Identificação</span>
        <span class="id-item"><strong>Usuário</strong> João da Silva</span>
        <span class="id-item"><strong>Unidade</strong> 21189 - Gerência de Tecnologia do Estado</span>
    </div>

    <div class="form-card">
        <p class="section-title">Dados da tramitação</p>
        <div class="form-grid">
            <div class="form-field">
                <label>Tipo de tramitação <span class="required">*</span></label>
                <p-select [(ngModel)]="form.tipo" [options]="tiposTramitacao" placeholder="Selecione uma opção" />
            </div>
            <div class="form-field">
                <label>Data <span class="required">*</span></label>
                <p-datepicker [(ngModel)]="form.data" dateFormat="dd/mm/yy" [showIcon]="true" />
            </div>
            <div class="form-field full">
                <label>Observação</label>
                <textarea pTextarea [(ngModel)]="form.observacao" placeholder="Digite uma observação" rows="3" style="width:100%;resize:vertical"></textarea>
            </div>
        </div>

        <div class="warning-box">
            <i class="pi pi-info-circle"></i>
            <span>A tramitação será enviada para os destinatários selecionados abaixo. Confirme antes de salvar.</span>
        </div>
    </div>

    <div class="form-card">
        <div class="dest-header">
            <p class="section-title" style="margin:0">Destinatários</p>
            <p-button label="Adicionar destinatário" icon="pi pi-plus" [outlined]="true" size="small" (onClick)="adicionarDestinatario()" />
        </div>
        <p-table [value]="destinatarios" styleClass="p-datatable-sm ds-table" dataKey="id">
            <ng-template pTemplate="header"><tr>
                <th>Nome</th>
                <th>Unidade</th>
                <th style="width:5rem">Ações</th>
            </tr></ng-template>
            <ng-template pTemplate="body" let-d><tr>
                <td>{{ d.nome }}</td>
                <td>{{ d.unidade }}</td>
                <td>
                    <p-button icon="pi pi-trash" [rounded]="true" [text]="true" severity="danger" pTooltip="Remover" (onClick)="removerDestinatario(d.id)" />
                </td>
            </tr></ng-template>
            <ng-template pTemplate="emptymessage">
                <tr><td colspan="3" class="text-center p-4">Nenhum destinatário adicionado</td></tr>
            </ng-template>
        </p-table>
    </div>

    <div class="footer-actions">
        <p-button label="Voltar" severity="secondary" [outlined]="true" (onClick)="voltar()" />
        <p-button label="Salvar" icon="pi pi-check" (onClick)="salvar()" />
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
        .form-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem; }
        .section-title { font-size: 1rem; font-weight: 700; margin: 0 0 1rem; color: #1e293b; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-field { display: flex; flex-direction: column; gap: .25rem; }
        .form-field.full { grid-column: span 2; }
        .form-field label { font-size: .8125rem; font-weight: 500; color: #475569; }
        .form-field input, .form-field p-select, .form-field p-datepicker { width: 100%; }
        .required { color: #ef4444; }
        .warning-box { display: flex; align-items: flex-start; gap: .5rem; background: #fefce8; border: 1px solid #fbbf24; border-radius: 6px; padding: .75rem 1rem; font-size: .8125rem; color: #92400e; }
        .warning-box .pi { margin-top: .1rem; color: #d97706; }
        .dest-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .footer-actions { display: flex; justify-content: flex-end; gap: .5rem; padding-top: .5rem; }
    `]
})
export class DraconManterTramitacao implements OnInit {
    private router = inject(Router);

    form = { tipo: null as any, data: null as any, observacao: '' };
    destinatarios: Destinatario[] = [
        { id: 1, nome: 'Maria Eduarda Fernandes dos Santos Oliveira', unidade: '21189 - Gerência de Tecnologia do Estado', selecionado: false },
        { id: 2, nome: 'José Henrique Batista da Silva Neto', unidade: '21190 - Assessoria Jurídica', selecionado: false },
    ];
    tiposTramitacao = [
        { label: 'Envio', value: 'envio' },
        { label: 'Devolução', value: 'devolucao' },
        { label: 'Arquivamento', value: 'arquivamento' },
    ];

    ngOnInit() {}
    removerDestinatario(id: number) { this.destinatarios = this.destinatarios.filter(d => d.id !== id); }
    adicionarDestinatario() {}
    salvar() { this.router.navigate(['/dracon/processos']); }
    voltar() { this.router.navigate(['/dracon/processos']); }
}
