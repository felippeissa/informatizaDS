import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

interface Etiqueta { id: number; nome: string; cor: string; selecionada: boolean; }

@Component({
    selector: 'app-dracon-vincular-etiquetas',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule],
    template: `
<div class="page-container">
    <div class="page-header">
        <h2 class="page-title">Vincular etiquetas</h2>
    </div>

    <div class="id-bar">
        <span class="id-label"><i class="pi pi-id-card"></i> Identificação</span>
        <span class="id-item"><strong>Usuário</strong> João da Silva</span>
        <span class="id-item"><strong>Unidade</strong> 21189 - Gerência de Tecnologia do Estado</span>
    </div>

    <div class="form-card">
        <p class="section-title">Selecione as etiquetas</p>

        <div class="search-row">
            <span class="p-input-icon-left search-wrap">
                <i class="pi pi-search"></i>
                <input pInputText [(ngModel)]="busca" (ngModelChange)="filtrar()" placeholder="Buscar etiqueta..." />
            </span>
        </div>

        <div class="etiq-grid">
            @for (e of etiquetasFiltradas; track e.id) {
                <span class="etiq-chip" [class.selected]="e.selecionada"
                      [style.background]="e.selecionada ? '#' + rgbFromHex(e.cor) : e.cor + '22'"
                      [style.border-color]="e.cor"
                      [style.color]="e.selecionada ? '#fff' : e.cor"
                      (click)="toggleEtiqueta(e)">
                    <i class="pi" [class.pi-check]="e.selecionada" [class.pi-tag]="!e.selecionada"></i>
                    {{ e.nome }}
                </span>
            }
        </div>

        @if (selecionadas.length > 0) {
        <div class="selecionadas-info">
            <strong>{{ selecionadas.length }}</strong> etiqueta(s) selecionada(s): {{ selecionadasNomes }}
        </div>
        }
    </div>

    <div class="footer-actions">
        <p-button label="Voltar" severity="secondary" [outlined]="true" (onClick)="voltar()" />
        <p-button label="Salvar" icon="pi pi-check" (onClick)="salvar()" [disabled]="selecionadas.length === 0" />
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
        .form-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem; }
        .section-title { font-size: 1rem; font-weight: 700; margin: 0; color: #1e293b; }
        .search-wrap { width: 100%; max-width: 320px; }
        .search-wrap input { padding-left: 2.25rem; width: 100%; }
        .etiq-grid { display: flex; flex-wrap: wrap; gap: .5rem; }
        .etiq-chip { display: inline-flex; align-items: center; gap: .4rem; padding: .3rem .75rem;
                     border-radius: 999px; border: 1.5px solid; font-size: .875rem; font-weight: 500;
                     cursor: pointer; transition: all .15s; user-select: none; }
        .etiq-chip:hover { filter: brightness(.92); }
        .selecionadas-info { font-size: .8125rem; color: #475569; background: #f1f5f9; border-radius: 6px; padding: .6rem .875rem; }
        .footer-actions { display: flex; justify-content: flex-end; gap: .5rem; padding-top: .5rem; }
    `]
})
export class DraconVincularEtiquetas implements OnInit {
    private router = inject(Router);

    busca = '';
    etiquetas: Etiqueta[] = [];
    etiquetasFiltradas: Etiqueta[] = [];

    get selecionadas() { return this.etiquetas.filter(e => e.selecionada); }
    get selecionadasNomes(): string { return this.selecionadas.map(e => e.nome).join(', '); }

    ngOnInit() {
        const cores = ['f59e0b', '10b981', 'ef4444', '3b82f6', '8b5cf6', 'ec4899', '06b6d4', 'f97316'];
        const nomes = ['Em atraso', 'Concluído', 'Urgente', 'Em análise', 'Pendente', 'Aguardando', 'Em revisão', 'Prioridade'];
        this.etiquetas = nomes.map((nome, i) => ({ id: i + 1, nome, cor: '#' + cores[i], selecionada: false }));
        this.etiquetasFiltradas = [...this.etiquetas];
    }

    filtrar() {
        const q = this.busca.toLowerCase();
        this.etiquetasFiltradas = this.etiquetas.filter(e => e.nome.toLowerCase().includes(q));
    }

    toggleEtiqueta(e: Etiqueta) { e.selecionada = !e.selecionada; }

    rgbFromHex(hex: string): string { return hex.replace('#', ''); }

    salvar() { this.router.navigate(['/dracon/processos']); }
    voltar() { this.router.navigate(['/dracon/processos']); }
}
