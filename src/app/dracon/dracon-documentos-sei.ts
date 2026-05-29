import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    selector: 'app-dracon-documentos-sei',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, CheckboxModule],
    template: `
<div class="page-container">
    <div class="page-header">
        <h2 class="page-title">Documentos SEI</h2>
    </div>

    <div class="id-bar">
        <span class="id-label"><i class="pi pi-id-card"></i> Identificação</span>
        <span class="id-item"><strong>Usuário</strong> João da Silva</span>
        <span class="id-item"><strong>Unidade</strong> 21189 - Gerência de Tecnologia do Estado</span>
    </div>

    <div class="form-card">
        <div class="process-info">
            <i class="pi pi-folder-open info-icon"></i>
            <div>
                <p class="info-label">Processo SEI principal</p>
                <p class="info-value">53019.001234/2025-77</p>
            </div>
        </div>

        <div class="divider"></div>

        <div class="notice-box">
            <i class="pi pi-info-circle"></i>
            <p>Ao visualizar os documentos, você será redirecionado para o sistema SEI. Os documentos estarão disponíveis conforme seu nível de acesso no sistema externo.</p>
        </div>

        <div class="consent-row">
            <p-checkbox [(ngModel)]="concordo" [binary]="true" inputId="concordo" />
            <label for="concordo" class="consent-label">
                Estou ciente de que serei redirecionado para o sistema SEI e que o acesso está sujeito às permissões do meu perfil.
            </label>
        </div>
    </div>

    <div class="footer-actions">
        <p-button label="Voltar" severity="secondary" [outlined]="true" (onClick)="voltar()" />
        <p-button label="Ver documentos no SEI" icon="pi pi-external-link" (onClick)="verDocumentos()" [disabled]="!concordo" />
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
        .form-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem; }
        .process-info { display: flex; align-items: center; gap: 1rem; }
        .info-icon { font-size: 2rem; color: #3ACC75; }
        .info-label { font-size: .75rem; font-weight: 600; color: #64748b; text-transform: uppercase; margin: 0 0 .2rem; }
        .info-value { font-size: 1.125rem; font-weight: 700; color: #1e293b; margin: 0; }
        .divider { height: 1px; background: #e2e8f0; }
        .notice-box { display: flex; gap: .75rem; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 1rem; }
        .notice-box .pi { color: #2563eb; font-size: 1.1rem; margin-top: .1rem; flex-shrink: 0; }
        .notice-box p { margin: 0; font-size: .875rem; color: #1e40af; }
        .consent-row { display: flex; align-items: flex-start; gap: .75rem; padding: .5rem 0; }
        .consent-label { font-size: .875rem; color: #475569; cursor: pointer; line-height: 1.5; }
        .footer-actions { display: flex; justify-content: flex-end; gap: .5rem; padding-top: .5rem; }
    `]
})
export class DraconDocumentosSEI {
    private router = inject(Router);
    concordo = false;
    verDocumentos() { /* open SEI in new tab */ }
    voltar() { this.router.navigate(['/dracon/processos']); }
}
