import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { PROJETOS_MOCK } from './godev.mock';
import { Projeto } from './godev.models';

interface FiltroAplicado {
    nome: string;
    status: string | null;
    sinc: string | null;
}

@Component({
    selector: 'app-godev-projetos',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TooltipModule, TableModule, SelectModule],
    templateUrl: './godev-projetos.html',
    styleUrl:    './godev-projetos.scss',
})
export class GodevProjetos {
    private router = inject(Router);

    projetos = signal<Projeto[]>(PROJETOS_MOCK);

    // Campos de filtro (rascunho) — só aplicam ao clicar em Filtrar
    fNome   = signal('');
    fStatus = signal<string | null>(null);
    fSinc   = signal<string | null>(null);

    private aplicado = signal<FiltroAplicado>({ nome: '', status: null, sinc: null });

    statusOpcoes = [
        { label: 'Ativo',   value: 'ativo' },
        { label: 'Inativo', value: 'inativo' },
    ];
    sincOpcoes = [
        { label: 'Sincronizado',          value: 'sincronizado' },
        { label: 'Perdeu sincronização',  value: 'dessincronizado' },
    ];

    filtrados = computed(() => {
        const a = this.aplicado();
        return this.projetos().filter(p =>
            (!a.nome   || p.nome.toLowerCase().includes(a.nome.toLowerCase())) &&
            (!a.status || p.status === a.status) &&
            (!a.sinc   || p.sincronizacao === a.sinc)
        );
    });

    filtrar() {
        this.aplicado.set({
            nome: this.fNome().trim(),
            status: this.fStatus(),
            sinc: this.fSinc(),
        });
    }

    limpar() {
        this.fNome.set('');
        this.fStatus.set(null);
        this.fSinc.set(null);
        this.aplicado.set({ nome: '', status: null, sinc: null });
    }

    novo()             { this.router.navigate(['/godev/projetos/novo']); }
    abrir(p: Projeto)  { this.router.navigate(['/godev/projetos', p.id, 'workspace']); }
    editar(p: Projeto) { this.router.navigate(['/godev/projetos', p.id]); }

    // Helpers de exibição (p é any no template do p-table)
    labelStatus(s: string) { return s === 'ativo' ? 'Ativo' : 'Inativo'; }
    corStatus(s: string)   { return s === 'ativo' ? '#15803d' : '#6b7280'; }
    bgStatus(s: string)    { return s === 'ativo' ? '#dcfce7' : '#f3f4f6'; }

    labelSinc(s: string) { return s === 'sincronizado' ? 'Sincronizado' : 'Perdeu sincronização'; }
    corSinc(s: string)   { return s === 'sincronizado' ? '#15803d' : '#b45309'; }
    bgSinc(s: string)    { return s === 'sincronizado' ? '#dcfce7' : '#fef3c7'; }
    iconSinc(s: string)  { return s === 'sincronizado' ? 'pi-check-circle' : 'pi-exclamation-triangle'; }
}
