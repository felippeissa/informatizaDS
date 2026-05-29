import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';

@Component({
    selector: 'app-dracon-cancelar-processo',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, TextareaModule],
    template: `
<div class="page-container">
    <div class="page-header">
        <h2 class="page-title">Cancelar processo</h2>
    </div>

    <div class="id-bar">
        <span class="id-label"><i class="pi pi-id-card"></i> Identificação</span>
        <span class="id-item"><strong>Usuário</strong> João da Silva</span>
        <span class="id-item"><strong>Unidade</strong> 21189 - Gerência de Tecnologia do Estado</span>
    </div>

    <div class="form-card">
        <div class="warning-banner">
            <i class="pi pi-exclamation-triangle"></i>
            <div>
                <p class="warn-title">Atenção — esta ação é irreversível</p>
                <p class="warn-desc">Ao cancelar o processo, todas as tramitações e atos vinculados serão encerrados. Informe abaixo o motivo do cancelamento.</p>
            </div>
        </div>

        <div class="form-field">
            <label>Motivo do cancelamento <span class="required">*</span></label>
            <textarea pTextarea [(ngModel)]="motivo" placeholder="Descreva o motivo do cancelamento..."
                      rows="5" [maxlength]="300" style="width:100%;resize:vertical"></textarea>
            <small class="char-count">{{ motivo.length }}/300 caracteres</small>
        </div>
    </div>

    <div class="footer-actions">
        <p-button label="Voltar" severity="secondary" [outlined]="true" (onClick)="voltar()" />
        <p-button label="Confirmar cancelamento" icon="pi pi-ban" severity="danger" (onClick)="confirmar()" [disabled]="!motivo.trim()" />
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
        .form-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem; display: flex; flex-direction: column; gap: 1.25rem; }
        .warning-banner { display: flex; gap: 1rem; background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 1rem 1.25rem; }
        .warning-banner .pi { font-size: 1.4rem; color: #dc2626; margin-top: .1rem; flex-shrink: 0; }
        .warn-title { font-size: .9375rem; font-weight: 700; color: #7f1d1d; margin: 0 0 .25rem; }
        .warn-desc { font-size: .8125rem; color: #991b1b; margin: 0; }
        .form-field { display: flex; flex-direction: column; gap: .25rem; }
        .form-field label { font-size: .8125rem; font-weight: 500; color: #475569; }
        .required { color: #ef4444; }
        .char-count { font-size: .75rem; color: #94a3b8; text-align: right; }
        .footer-actions { display: flex; justify-content: flex-end; gap: .5rem; padding-top: .5rem; }
    `]
})
export class DraconCancelarProcesso {
    private router = inject(Router);
    motivo = '';
    confirmar() { this.router.navigate(['/dracon/processos']); }
    voltar() { this.router.navigate(['/dracon/processos']); }
}
