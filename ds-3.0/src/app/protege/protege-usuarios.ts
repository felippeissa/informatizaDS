import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { Usuario, USUARIOS_MOCK, PERFIS, SITUACOES, UNIDADES, iniciais, severidadeSituacao } from './protege-usuarios.model';

@Component({
    selector: 'app-protege-usuarios',
    standalone: true,
    imports: [
        CommonModule, FormsModule, ButtonModule, InputTextModule, IconFieldModule, InputIconModule,
        SelectModule, TableModule, TagModule, TooltipModule, AvatarModule, DialogModule, MessageModule
    ],
    templateUrl: './protege-usuarios.html',
    styleUrl: './protege-usuarios.scss',
})
export class ProtegeUsuarios {
    private router = inject(Router);
    private messageService = inject(MessageService);

    perfis = PERFIS;
    situacoes = SITUACOES;
    unidades = UNIDADES;

    usuarios = signal<Usuario[]>(USUARIOS_MOCK);
    filtro = signal({ busca: '', perfil: null as string | null, situacao: null as string | null, unidade: null as string | null });

    // Exclusão
    excluirVisivel = signal(false);
    usuarioExcluir = signal<Usuario | null>(null);
    confirmacao = signal('');

    filtrados = computed(() => {
        const f = this.filtro();
        const busca = f.busca.trim().toLowerCase();
        return this.usuarios().filter(u =>
            (!busca || u.nome.toLowerCase().includes(busca) || u.email.toLowerCase().includes(busca) || u.cpf.includes(busca)) &&
            (!f.perfil || u.perfil === f.perfil) &&
            (!f.situacao || u.situacao === f.situacao) &&
            (!f.unidade || u.unidade === f.unidade)
        );
    });

    totalAtivos = computed(() => this.usuarios().filter(u => u.situacao === 'Ativo').length);

    iniciais = iniciais;
    severidade = severidadeSituacao;

    limparFiltro() {
        this.filtro.set({ busca: '', perfil: null, situacao: null, unidade: null });
    }

    atualizarFiltro<K extends 'busca' | 'perfil' | 'situacao' | 'unidade'>(campo: K, valor: any) {
        this.filtro.update(f => ({ ...f, [campo]: valor }));
    }

    novoUsuario() { this.router.navigate(['/protege/usuarios/novo']); }
    editarUsuario(u: Usuario) { this.router.navigate(['/protege/usuarios', u.id]); }

    // ── Exclusão ────────────────────────────────────────────
    abrirExclusao(u: Usuario) {
        this.usuarioExcluir.set(u);
        this.confirmacao.set('');
        this.excluirVisivel.set(true);
    }

    podeExcluir = computed(() => this.confirmacao().trim().toUpperCase() === 'EXCLUIR');

    confirmarExclusao() {
        const u = this.usuarioExcluir();
        if (!u || !this.podeExcluir()) return;
        this.usuarios.update(lista => lista.filter(x => x.id !== u.id));
        this.excluirVisivel.set(false);
        this.messageService.add({
            severity: 'success',
            summary: 'Usuário excluído',
            detail: `${u.nome} foi removido do sistema.`,
            life: 4000,
        });
    }

    inativar(u: Usuario) {
        this.usuarios.update(lista => lista.map(x => x.id === u.id ? { ...x, situacao: x.situacao === 'Ativo' ? 'Inativo' : 'Ativo' } : x));
        this.messageService.add({
            severity: 'info',
            summary: 'Situação alterada',
            detail: `${u.nome} agora está ${u.situacao === 'Ativo' ? 'inativo' : 'ativo'}.`,
            life: 3500,
        });
    }
}
