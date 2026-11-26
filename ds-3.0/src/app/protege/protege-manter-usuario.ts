import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { PERFIS, UNIDADES, USUARIOS_MOCK, iniciais } from './protege-usuarios.model';

interface FormUsuario {
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    matricula: string;
    perfil: string | null;
    unidade: string | null;
    sistemas: string[];
    validade: Date | null;
    ativo: boolean;
    notificar: boolean;
    observacoes: string;
}

function formVazio(): FormUsuario {
    return {
        nome: '', email: '', cpf: '', telefone: '', matricula: '',
        perfil: null, unidade: null, sistemas: [], validade: null,
        ativo: true, notificar: true, observacoes: '',
    };
}

@Component({
    selector: 'app-protege-manter-usuario',
    standalone: true,
    imports: [
        CommonModule, FormsModule, ButtonModule, InputTextModule, InputMaskModule, SelectModule,
        MultiSelectModule, ToggleSwitchModule, DatePickerModule, TextareaModule, AvatarModule,
        DialogModule, MessageModule
    ],
    templateUrl: './protege-manter-usuario.html',
    styleUrl: './protege-manter-usuario.scss',
})
export class ProtegeManterUsuario {
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private messageService = inject(MessageService);

    perfis = PERFIS;
    unidades = UNIDADES;
    sistemasDisponiveis = ['PROTEGE', 'DRÁCON', 'ASSINAGO', 'GO.DEV', 'Manual Inteligente'];

    id = signal<number | null>(null);
    form = signal<FormUsuario>(formVazio());
    tentouSalvar = signal(false);
    excluirVisivel = signal(false);

    edicao = computed(() => this.id() !== null);
    iniciais = iniciais;

    constructor() {
        const param = this.route.snapshot.paramMap.get('id');
        if (param && param !== 'novo') {
            const existente = USUARIOS_MOCK.find(u => u.id === Number(param));
            if (existente) {
                this.id.set(existente.id);
                this.form.set({
                    ...formVazio(),
                    nome: existente.nome,
                    email: existente.email,
                    cpf: existente.cpf,
                    perfil: existente.perfil,
                    unidade: existente.unidade,
                    sistemas: ['PROTEGE'],
                    ativo: existente.situacao === 'Ativo',
                    matricula: String(100000 + existente.id),
                });
            }
        }
    }

    campo<K extends keyof FormUsuario>(nome: K, valor: FormUsuario[K]) {
        this.form.update(f => ({ ...f, [nome]: valor }));
    }

    // ── Validação ───────────────────────────────────────────
    invalido(nome: 'nome' | 'email' | 'cpf' | 'perfil' | 'unidade'): boolean {
        if (!this.tentouSalvar()) return false;
        const f = this.form();
        if (nome === 'email') return !f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email);
        const valor = f[nome];
        return !valor || (typeof valor === 'string' && !valor.trim());
    }

    private valido(): boolean {
        return !(['nome', 'email', 'cpf', 'perfil', 'unidade'] as const).some(c => {
            const f = this.form();
            if (c === 'email') return !f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email);
            const v = f[c];
            return !v || (typeof v === 'string' && !v.trim());
        });
    }

    // ── Ações ───────────────────────────────────────────────
    salvar() {
        this.tentouSalvar.set(true);
        if (!this.valido()) {
            this.messageService.add({
                severity: 'error',
                summary: 'Campos obrigatórios',
                detail: 'Preencha os campos destacados antes de salvar.',
                life: 4000,
            });
            return;
        }
        this.messageService.add({
            severity: 'success',
            summary: this.edicao() ? 'Usuário atualizado' : 'Usuário adicionado',
            detail: `${this.form().nome} foi salvo com sucesso.`,
            life: 4000,
        });
        this.router.navigate(['/protege/usuarios']);
    }

    salvarENovo() {
        this.tentouSalvar.set(true);
        if (!this.valido()) return;
        this.messageService.add({
            severity: 'success',
            summary: 'Usuário adicionado',
            detail: `${this.form().nome} foi salvo. Formulário limpo para um novo cadastro.`,
            life: 4000,
        });
        this.form.set(formVazio());
        this.tentouSalvar.set(false);
    }

    cancelar() {
        this.router.navigate(['/protege/usuarios']);
    }

    confirmarExclusao() {
        const nome = this.form().nome;
        this.excluirVisivel.set(false);
        this.messageService.add({
            severity: 'success',
            summary: 'Usuário excluído',
            detail: `${nome} foi removido do sistema.`,
            life: 4000,
        });
        this.router.navigate(['/protege/usuarios']);
    }
}
