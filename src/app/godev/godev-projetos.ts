import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { PROJETOS_MOCK } from './godev.mock';
import { Projeto, TipoProjeto } from './godev.models';
import { BG_TIPO, COR_TIPO } from './godev.ui';

@Component({
    selector: 'app-godev-projetos',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TooltipModule, TableModule],
    templateUrl: './godev-projetos.html',
    styleUrl:    './godev-projetos.scss',
})
export class GodevProjetos {
    private router = inject(Router);

    corTipo(tipo: TipoProjeto) { return COR_TIPO[tipo]; }
    bgTipo(tipo: TipoProjeto)  { return BG_TIPO[tipo]; }

    projetos = signal<Projeto[]>(PROJETOS_MOCK);
    busca    = signal('');

    filtrados = computed(() => {
        const termo = this.busca().trim().toLowerCase();
        if (!termo) return this.projetos();
        return this.projetos().filter(p =>
            p.nome.toLowerCase().includes(termo) ||
            p.descricao.toLowerCase().includes(termo)
        );
    });

    novo()             { this.router.navigate(['/godev/projetos/novo']); }
    abrir(p: Projeto)  { this.router.navigate(['/godev/projetos', p.id, 'workspace']); }
    editar(p: Projeto) { this.router.navigate(['/godev/projetos', p.id]); }
}
