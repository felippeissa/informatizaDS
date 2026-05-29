import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';

interface EtiquetaVinculada { id: number; nome: string; cor: string; }

@Component({
    selector: 'app-dracon-manter-processo',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TextareaModule, SelectModule, TooltipModule],
    template: `
<div class="page-container">
    <div class="page-header">
        <h2 class="page-title">{{ isEdit ? 'Editar processo' : 'Novo processo' }}</h2>
    </div>

    <div class="id-bar">
        <span class="id-label"><i class="pi pi-id-card"></i> Identificação</span>
        <span class="id-item"><strong>Usuário</strong> João da Silva</span>
        <span class="id-item"><strong>Unidade</strong> 21189 - Gerência de Tecnologia do Estado</span>
    </div>

    <div class="form-card">
        <p class="section-title">Dados do processo</p>
        <div class="form-grid">
            <div class="form-field">
                <label>Tipo de processo <span class="required">*</span></label>
                <p-select [(ngModel)]="form.tipoProcesso" [options]="tiposProcesso" placeholder="Selecione uma opção" />
            </div>
            <div class="form-field full">
                <label>Assunto <span class="required">*</span></label>
                <textarea pTextarea [(ngModel)]="form.assunto" placeholder="Digite o assunto do processo" rows="3" style="width:100%;resize:vertical"></textarea>
            </div>
            <div class="form-field">
                <label>Processo SEI principal</label>
                <input pInputText [(ngModel)]="form.processoSEI" placeholder="Ex.: 53019.000001/2024-01" />
            </div>
            <div class="form-field">
                <label>Processo de lei</label>
                <input pInputText [(ngModel)]="form.processoLei" placeholder="Ex.: PL-001/2024" />
            </div>
            <div class="form-field full">
                <label>Nota</label>
                <textarea pTextarea [(ngModel)]="form.nota" placeholder="Observações adicionais" rows="3" style="width:100%;resize:vertical"></textarea>
            </div>
        </div>
    </div>

    <div class="form-card">
        <div class="etiq-header">
            <p class="section-title" style="margin:0">Etiquetas</p>
            <p-button label="Vincular etiqueta" icon="pi pi-tag" [outlined]="true" size="small" (onClick)="vincularEtiqueta()" />
        </div>
        <div class="etiq-list" *ngIf="etiquetas.length > 0; else semEtiqueta">
            @for (e of etiquetas; track e.id) {
                <span class="etiq-chip" [style.background]="e.cor + '22'" [style.border-color]="e.cor" [style.color]="e.cor">
                    {{ e.nome }}
                    <i class="pi pi-times etiq-remove" (click)="removerEtiqueta(e.id)"></i>
                </span>
            }
        </div>
        <ng-template #semEtiqueta>
            <p class="empty-hint">Nenhuma etiqueta vinculada. Clique em "Vincular etiqueta" para adicionar.</p>
        </ng-template>
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
        .form-field.full { grid-column: span 2; }
        .form-field label { font-size: .8125rem; font-weight: 500; color: #475569; }
        .form-field input, .form-field p-select { width: 100%; }
        .required { color: #ef4444; }
        .etiq-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .etiq-list { display: flex; flex-wrap: wrap; gap: .5rem; }
        .etiq-chip { display: inline-flex; align-items: center; gap: .35rem; padding: .2rem .65rem;
                     border-radius: 999px; border: 1.5px solid; font-size: .8125rem; font-weight: 500; }
        .etiq-remove { cursor: pointer; font-size: .7rem; opacity: .7; }
        .etiq-remove:hover { opacity: 1; }
        .empty-hint { font-size: .8125rem; color: #94a3b8; margin: 0; }
        .footer-actions { display: flex; justify-content: flex-end; gap: .5rem; padding-top: .5rem; }
    `]
})
export class DraconManterProcesso implements OnInit {
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    isEdit = false;
    form = { tipoProcesso: null as any, assunto: '', processoSEI: '', processoLei: '', nota: '' };
    etiquetas: EtiquetaVinculada[] = [
        { id: 1, nome: 'Em atraso', cor: '#f59e0b' },
        { id: 2, nome: 'Urgente', cor: '#ef4444' },
    ];
    tiposProcesso = [{ label: 'Atos Administrativos', value: 'atos' }, { label: 'Processo Legislativo', value: 'leg' }];

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.isEdit = !!id;
        if (this.isEdit) {
            this.form = { tipoProcesso: 'atos', assunto: 'Autógrafo de lei para publicação no DOE', processoSEI: '53019.000001/2024-01', processoLei: 'PL-001/2024', nota: '' };
        }
    }

    removerEtiqueta(id: number) { this.etiquetas = this.etiquetas.filter(e => e.id !== id); }
    vincularEtiqueta() { this.router.navigate(['/dracon/processos/etiquetas']); }
    salvar() { this.router.navigate(['/dracon/processos']); }
    voltar() { this.router.navigate(['/dracon/processos']); }
}
