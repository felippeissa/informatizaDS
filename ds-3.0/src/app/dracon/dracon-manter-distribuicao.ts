import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';

interface ProcessoSelecionado {
    id: number; numero: string; tipo: string; assunto: string; processoSEI: string;
}

@Component({
    selector: 'app-dracon-manter-distribuicao',
    standalone: true,
    imports: [CommonModule, ButtonModule, TooltipModule, TagModule],
    template: `
<div class="page-container">
    <div class="page-header">
        <h2 class="page-title">Distribuir processos</h2>
    </div>

    <div class="id-bar">
        <span class="id-label"><i class="pi pi-id-card"></i> Identificação</span>
        <span class="id-item"><strong>Usuário</strong> João da Silva</span>
        <span class="id-item"><strong>Unidade</strong> 21189 - Gerência de Tecnologia do Estado</span>
    </div>

    <div class="form-card">
        <div class="section-header">
            <div>
                <p class="section-title">Processos selecionados para distribuição</p>
                <p class="section-sub">{{ processos.length }} processo(s) serão incluídos nesta distribuição.</p>
            </div>
        </div>

        <div class="processo-list">
            @for (p of processos; track p.id) {
                <div class="processo-item">
                    <div class="processo-info">
                        <div class="processo-numero">
                            <i class="pi pi-folder"></i>
                            <span>{{ p.numero }}</span>
                        </div>
                        <div class="processo-meta">
                            <span class="meta-item"><strong>Tipo:</strong> {{ p.tipo }}</span>
                            <span class="meta-sep">·</span>
                            <span class="meta-item"><strong>SEI:</strong> {{ p.processoSEI }}</span>
                        </div>
                        <p class="processo-assunto">{{ p.assunto }}</p>
                    </div>
                    <p-button icon="pi pi-times" [rounded]="true" [text]="true" severity="danger"
                              pTooltip="Remover da distribuição" (onClick)="remover(p.id)" />
                </div>
            }
            @if (processos.length === 0) {
                <div class="empty-state">
                    <i class="pi pi-inbox"></i>
                    <p>Nenhum processo selecionado. Volte e selecione processos para distribuir.</p>
                </div>
            }
        </div>
    </div>

    <div class="confirm-card">
        <i class="pi pi-send confirm-icon"></i>
        <div>
            <p class="confirm-title">Confirmar distribuição</p>
            <p class="confirm-desc">Ao executar, todos os processos listados acima serão distribuídos e receberão um número de distribuição único.</p>
        </div>
    </div>

    <div class="footer-actions">
        <p-button label="Voltar" severity="secondary" [outlined]="true" (onClick)="voltar()" />
        <p-button label="Executar distribuição" icon="pi pi-send" (onClick)="executar()" [disabled]="processos.length === 0" />
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
        .section-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .section-title { font-size: 1rem; font-weight: 700; margin: 0 0 .2rem; color: #1e293b; }
        .section-sub { font-size: .8125rem; color: #64748b; margin: 0; }
        .processo-list { display: flex; flex-direction: column; gap: .75rem; }
        .processo-item { display: flex; align-items: flex-start; justify-content: space-between;
                         background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: .875rem 1rem; }
        .processo-info { flex: 1; display: flex; flex-direction: column; gap: .35rem; }
        .processo-numero { display: flex; align-items: center; gap: .5rem; font-weight: 700; color: #1e293b; font-size: .9375rem; }
        .processo-numero .pi { color: #3ACC75; }
        .processo-meta { display: flex; align-items: center; gap: .5rem; font-size: .8125rem; color: #64748b; }
        .meta-sep { color: #cbd5e1; }
        .processo-assunto { font-size: .875rem; color: #475569; margin: 0; }
        .empty-state { display: flex; flex-direction: column; align-items: center; gap: .5rem; padding: 2rem; color: #94a3b8; }
        .empty-state .pi { font-size: 2rem; }
        .empty-state p { margin: 0; font-size: .875rem; }
        .confirm-card { display: flex; align-items: flex-start; gap: 1rem; background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 1rem 1.25rem; }
        .confirm-icon { font-size: 1.5rem; color: #16a34a; margin-top: .1rem; }
        .confirm-title { font-size: .9375rem; font-weight: 700; color: #14532d; margin: 0 0 .25rem; }
        .confirm-desc { font-size: .8125rem; color: #166534; margin: 0; }
        .footer-actions { display: flex; justify-content: flex-end; gap: .5rem; padding-top: .5rem; }
    `]
})
export class DraconManterDistribuicao implements OnInit {
    private router = inject(Router);

    processos: ProcessoSelecionado[] = [];

    ngOnInit() {
        this.processos = [
            { id: 1, numero: 'DRN-2025-001234', tipo: 'Atos Administrativos', assunto: 'Autógrafo de lei para publicação no DOE', processoSEI: '53019.000001/2024-01' },
            { id: 2, numero: 'DRN-2025-001235', tipo: 'Atos Administrativos', assunto: 'Decreto de nomeação de servidor público efetivo', processoSEI: '53019.000002/2024-01' },
            { id: 3, numero: 'DRN-2025-001236', tipo: 'Processo Legislativo', assunto: 'Projeto de lei complementar — regulamentação fiscal', processoSEI: '53019.000003/2024-01' },
        ];
    }

    remover(id: number) { this.processos = this.processos.filter(p => p.id !== id); }
    executar() { this.router.navigate(['/dracon/gestao/distribuicao']); }
    voltar() { this.router.navigate(['/dracon/gestao/distribuicao']); }
}
