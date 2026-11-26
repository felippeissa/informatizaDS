import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'app-dracon-alterar-situacao',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, SelectModule, DatePickerModule],
    template: `
<div class="page-container">
    <div class="page-header">
        <h2 class="page-title">Alterar situação do ato</h2>
    </div>

    <div class="id-bar">
        <span class="id-label"><i class="pi pi-id-card"></i> Identificação</span>
        <span class="id-item"><strong>Usuário</strong> João da Silva</span>
        <span class="id-item"><strong>Unidade</strong> 21189 - Gerência de Tecnologia do Estado</span>
    </div>

    <div class="form-card">
        <p class="section-title">Dados do ato</p>
        <div class="form-grid">
            <div class="form-field">
                <label>Número do ato</label>
                <input pInputText [ngModel]="numeroAto" [disabled]="true" />
            </div>
            <div class="form-field">
                <label>Tipo modelo de ato</label>
                <input pInputText [ngModel]="tipoModelo" [disabled]="true" />
            </div>
            <div class="form-field">
                <label>Nova situação <span class="required">*</span></label>
                <p-select [(ngModel)]="form.situacao" [options]="situacoes" placeholder="Selecione uma opção" />
            </div>
            <div class="form-field">
                <label>Responsável <span class="required">*</span></label>
                <p-select [(ngModel)]="form.responsavel" [options]="responsaveis" placeholder="Selecione uma opção" />
            </div>
            <div class="form-field">
                <label>Data de criação</label>
                <p-datepicker [(ngModel)]="form.dataCriacao" dateFormat="dd/mm/yy" [showIcon]="true" />
            </div>
            <div class="form-field">
                <label>Data de conclusão</label>
                <p-datepicker [(ngModel)]="form.dataConclusao" dateFormat="dd/mm/yy" [showIcon]="true" />
            </div>
        </div>
    </div>

    <div class="footer-actions">
        <p-button label="Voltar" severity="secondary" [outlined]="true" (onClick)="voltar()" />
        <p-button label="Salvar" icon="pi pi-check" (onClick)="salvar()" />
    </div>
</div>`,
    styles: [`
        .page-container { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
        .page-header { display: flex; justify-content: space-between; align-items: center; }
        .page-title { font-size: 1.5rem; font-weight: 700; margin: 0; }
        .id-bar { display: flex; align-items: center; gap: 1.5rem; padding: .6rem 1rem;
                  border: 1px solid #e2e8f0; border-radius: 8px; background: #fff; font-size: .875rem; }
        .id-label { font-weight: 600; display: flex; align-items: center; gap: .4rem; }
        .id-item strong { color: #1e293b; margin-right: .25rem; }
        .form-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem; }
        .section-title { font-size: 1rem; font-weight: 700; margin: 0 0 1rem; color: #1e293b; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-field { display: flex; flex-direction: column; gap: .25rem; }
        .form-field label { font-size: .8125rem; font-weight: 500; color: #475569; }
        .form-field input, .form-field p-select, .form-field p-datepicker { width: 100%; }
        .required { color: #ef4444; }
        .footer-actions { display: flex; justify-content: flex-end; gap: .5rem; padding-top: .5rem; }
    `]
})
export class DraconAlterarSituacao implements OnInit {
    private router = inject(Router);

    numeroAto = '00310031003100315457';
    tipoModelo = 'Autógrafo de lei';
    form = { situacao: null as any, responsavel: null as any, dataCriacao: null as any, dataConclusao: null as any };

    situacoes = [
        { label: 'Em elaboração', value: 'elaboracao' },
        { label: 'Aguardando assinatura', value: 'assinatura' },
        { label: 'Conclusão', value: 'conclusao' },
        { label: 'Cancelado', value: 'cancelado' },
    ];
    responsaveis = [
        { label: 'Elizandra Silvério da Silva', value: 1 },
        { label: 'Pedro Carvalho Amado', value: 2 },
        { label: 'Bruno Pereira da Silva Oliveira', value: 3 },
    ];

    ngOnInit() {}
    salvar() { this.router.navigate(['/dracon/atos']); }
    voltar() { this.router.navigate(['/dracon/atos']); }
}
