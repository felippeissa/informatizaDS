import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { Membro, Papel, TipoProjeto } from './godev.models';
import { PROJETOS_MOCK } from './godev.mock';
import { BG_PAPEL, COR_PAPEL, PAPEL_OPCOES, TIPO_OPCOES, iniciais } from './godev.ui';

@Component({
    selector: 'app-godev-manter-projeto',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TextareaModule,
              SelectModule, DialogModule, ProgressSpinnerModule, TooltipModule],
    templateUrl: './godev-manter-projeto.html',
    styleUrl:    './godev-manter-projeto.scss',
})
export class GodevManterProjeto implements OnInit {
    private router = inject(Router);
    private route  = inject(ActivatedRoute);

    corPapel = COR_PAPEL;
    bgPapel  = BG_PAPEL;
    papelOpcoes = PAPEL_OPCOES;
    tipoOpcoes  = TIPO_OPCOES;
    iniciais = iniciais;

    isEdicao      = false;
    salvando      = signal(false);
    inativarModal = false;

    form = { nome: '', descricao: '', tipo: null as TipoProjeto | null };
    membros = signal<Membro[]>([]);

    addMembroModal = false;
    novoMembro = { nome: '', email: '', papel: null as Papel | null };
    membroErro = '';
    private nextId = 100;

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.isEdicao = !!id;
        if (!this.isEdicao) return;

        const p = PROJETOS_MOCK.find(x => x.id === +id!);
        if (p) {
            this.form = { nome: p.nome, descricao: p.descricao, tipo: p.tipo };
            this.membros.set([...p.membros]);
        }
    }

    abrirAddMembro() {
        this.novoMembro = { nome: '', email: '', papel: null };
        this.membroErro = '';
        this.addMembroModal = true;
    }

    confirmarAddMembro() {
        const { nome, email, papel } = this.novoMembro;
        if (!nome.trim() || !email.trim() || !papel) {
            this.membroErro = 'Preencha todos os campos.';
            return;
        }
        if (!email.includes('@')) {
            this.membroErro = 'Informe um e-mail válido.';
            return;
        }
        this.membros.update(lista => [...lista, {
            id: this.nextId++,
            nome:   nome.trim(),
            email:  email.trim(),
            papel,
            avatar: iniciais(nome),
        }]);
        this.addMembroModal = false;
    }

    removerMembro(id: number) {
        this.membros.update(lista => lista.filter(m => m.id !== id));
    }

    salvar() {
        if (!this.form.nome.trim()) return;
        this.salvando.set(true);
        // Mock: simula criação do workspace antes de voltar para a lista
        setTimeout(() => {
            this.salvando.set(false);
            this.router.navigate(['/godev/projetos']);
        }, 1800);
    }

    cancelar() { this.router.navigate(['/godev/projetos']); }
    inativar() { this.inativarModal = false; this.router.navigate(['/godev/projetos']); }
}
