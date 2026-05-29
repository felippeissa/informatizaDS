import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';

@Component({
    selector: 'app-dracon-manter-etiqueta',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, ColorPickerModule],
    template: `
<div class="page-container">
    <div class="page-header">
        <h2 class="page-title">{{ isEdit ? 'Editar etiqueta' : 'Criar etiqueta' }}</h2>
    </div>

    <div class="id-bar">
        <span class="id-label"><i class="pi pi-id-card"></i> Identificação</span>
        <span class="id-item"><strong>Usuário</strong> João da Silva</span>
        <span class="id-item"><strong>Unidade</strong> 21189 - Gerência de Tecnologia do Estado</span>
    </div>

    <div class="form-card">
        <p class="section-title">Dados da etiqueta</p>

        <div class="form-grid">
            <div class="form-field full">
                <label>Descrição <span class="required">*</span></label>
                <input pInputText [(ngModel)]="form.descricao" placeholder="Ex.: Em atraso" />
            </div>
            <div class="form-field">
                <label>Cor <span class="required">*</span></label>
                <div class="color-row">
                    <p-colorpicker [(ngModel)]="form.cor" format="hex" />
                    <span class="color-value">#{{ form.cor }}</span>
                    <span class="etiq-preview" [style.background]="'#' + form.cor + '22'"
                          [style.border-color]="'#' + form.cor" [style.color]="'#' + form.cor">
                        {{ form.descricao || 'Pré-visualização' }}
                    </span>
                </div>
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
        .form-field.full { grid-column: span 2; }
        .form-field label { font-size: .8125rem; font-weight: 500; color: #475569; }
        .form-field input { width: 100%; }
        .required { color: #ef4444; }
        .color-row { display: flex; align-items: center; gap: .75rem; }
        .color-value { font-size: .875rem; font-family: monospace; color: #475569; }
        .etiq-preview { display: inline-block; padding: .2rem .65rem; border-radius: 999px;
                        border: 1.5px solid; font-size: .8125rem; font-weight: 500; }
        .footer-actions { display: flex; justify-content: flex-end; gap: .5rem; padding-top: .5rem; }
    `]
})
export class DraconManterEtiqueta implements OnInit {
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    isEdit = false;
    form = { descricao: '', cor: 'f59e0b' };

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.isEdit = !!id;
        if (this.isEdit) {
            this.form = { descricao: 'Em atraso', cor: 'f59e0b' };
        }
    }

    salvar() { this.router.navigate(['/dracon/cadastros/etiquetas']); }
    voltar() { this.router.navigate(['/dracon/cadastros/etiquetas']); }
}
