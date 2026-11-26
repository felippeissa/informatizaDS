import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';

export interface Afastamento {
    id: number;
    funcionario: string;
    tipoAfastamento: string;
    dataInicio: string;
    dataFim: string;
    status: string;
    observacao: string;
    usuarioExecutor: string;
    unidadeExecutor: string;
    dataCadastro: string;
    motivoCancelamento?: string;
    responsavelCancelamento?: string;
    dataCancelamento?: string;
}

@Component({
    selector: 'app-dracon-listar-afastamentos',
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        ButtonModule, InputTextModule, SelectModule,
        TableModule, TooltipModule, TagModule,
        DialogModule, DatePickerModule, TextareaModule, ToastModule,
    ],
    providers: [MessageService],
    templateUrl: './dracon-listar-afastamentos.html',
    styleUrl: './dracon-listar-afastamentos.scss',
})
export class DraconListarAfastamentos implements OnInit {
    private msgService = inject(MessageService);

    afastamentosOriginal: Afastamento[] = [];
    afastamentos: Afastamento[] = [];
    sel: Afastamento | null = null;

    // controle de diálogos
    dialogDetalhesVisivel = false;
    dialogDetalhesCanceladoVisivel = false;
    dialogFormVisivel = false;
    modoEdicao = false;
    dialogCancelarVisivel = false;

    motivoCancelamento = '';

    filtro = {
        funcionario: '',
        tipoAfastamento: null as any,
        status: null as any,
        dataInicio: null as any,
        dataFim: null as any,
    };

    novoForm = {
        funcionario: '',
        tipoAfastamento: null as any,
        dataInicio: null as any,
        dataFim: null as any,
        status: null as any,
        observacao: '',
    };

    tiposAfastamento = [
        { label: 'Licença',      value: 'Licença' },
        { label: 'Férias',       value: 'Férias' },
        { label: 'Afastamento',  value: 'Afastamento' },
        { label: 'Outros',       value: 'Outros' },
    ];
    statusOptions = [
        { label: 'Ativo',     value: 'Ativo' },
        { label: 'Cancelado', value: 'Cancelado' },
    ];

    ngOnInit() { this.carregar(); }

    carregar() {
        const nomes = [
            'Humberto da Silva Oliveira',
            'Maria Eduarda Fernandes dos Santos Oliveira',
            'Maria Joaquina Pereira',
            'José Henrique Batista da Silva Neto',
            'Alberto Francisco Silva',
        ];
        const tipos = ['Licença', 'Férias', 'Afastamento', 'Outros'];

        this.afastamentosOriginal = Array.from({ length: 10 }, (_, i) => {
            const cancelado = i % 3 === 1;
            return {
                id: i + 1,
                funcionario: nomes[i % nomes.length],
                tipoAfastamento: tipos[i % tipos.length],
                dataInicio: '12/12/2025',
                dataFim: i % 3 === 0 ? '29/01/2026' : '12/01/2026',
                status: cancelado ? 'Cancelado' : 'Ativo',
                observacao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                usuarioExecutor: 'Bruno Pereira da Silva',
                unidadeExecutor: 'Loren ipsum',
                dataCadastro: '11/12/2025',
                motivoCancelamento: cancelado ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' : undefined,
                responsavelCancelamento: cancelado ? 'Henrique Brito' : undefined,
                dataCancelamento: cancelado ? '11/12/2025' : undefined,
            };
        });
        this.afastamentos = [...this.afastamentosOriginal];
    }

    // ── Filtro ────────────────────────────────────────────────────
    filtrar() {
        this.afastamentos = this.afastamentosOriginal.filter(a => {
            const okFuncionario = !this.filtro.funcionario ||
                a.funcionario.toLowerCase().includes(this.filtro.funcionario.toLowerCase());
            const okTipo = !this.filtro.tipoAfastamento ||
                a.tipoAfastamento === this.filtro.tipoAfastamento;
            const okStatus = !this.filtro.status || a.status === this.filtro.status;
            return okFuncionario && okTipo && okStatus;
        });
    }

    limparFiltro() {
        this.filtro = { funcionario: '', tipoAfastamento: null, status: null, dataInicio: null, dataFim: null };
        this.afastamentos = [...this.afastamentosOriginal];
    }

    // ── Visualizar ────────────────────────────────────────────────
    expandir(a: Afastamento) {
        this.sel = a;
        if (a.status === 'Cancelado') {
            this.dialogDetalhesCanceladoVisivel = true;
        } else {
            this.dialogDetalhesVisivel = true;
        }
    }

    // ── Novo ──────────────────────────────────────────────────────
    novoAfastamento() {
        this.modoEdicao = false;
        this.novoForm = { funcionario: '', tipoAfastamento: null, dataInicio: null, dataFim: null, status: { label: 'Ativo', value: 'Ativo' }, observacao: '' };
        this.dialogFormVisivel = true;
    }

    // ── Editar ────────────────────────────────────────────────────
    editar(a: Afastamento) {
        this.sel = a;
        this.modoEdicao = true;
        this.novoForm = {
            funcionario: a.funcionario,
            tipoAfastamento: a.tipoAfastamento,
            dataInicio: null,
            dataFim: null,
            status: a.status,
            observacao: a.observacao,
        };
        this.dialogFormVisivel = true;
    }

    salvarForm() {
        if (!this.novoForm.funcionario || !this.novoForm.tipoAfastamento) return;

        if (this.modoEdicao && this.sel) {
            const idx = this.afastamentosOriginal.findIndex(x => x.id === this.sel!.id);
            if (idx > -1) {
                this.afastamentosOriginal[idx] = {
                    ...this.afastamentosOriginal[idx],
                    funcionario: this.novoForm.funcionario,
                    tipoAfastamento: this.novoForm.tipoAfastamento,
                    status: this.novoForm.status ?? this.afastamentosOriginal[idx].status,
                    observacao: this.novoForm.observacao,
                };
            }
            this.msgService.add({ severity: 'success', summary: 'Sucesso', detail: 'Afastamento atualizado.' });
        } else {
            const novo: Afastamento = {
                id: Date.now(),
                funcionario: this.novoForm.funcionario,
                tipoAfastamento: this.novoForm.tipoAfastamento,
                dataInicio: this.novoForm.dataInicio
                    ? new Date(this.novoForm.dataInicio).toLocaleDateString('pt-BR') : '--',
                dataFim: this.novoForm.dataFim
                    ? new Date(this.novoForm.dataFim).toLocaleDateString('pt-BR') : '--',
                status: (this.novoForm.status as any)?.value ?? this.novoForm.status ?? 'Ativo',
                observacao: this.novoForm.observacao,
                usuarioExecutor: 'João da Silva',
                unidadeExecutor: '21189 - Gerência de Tecnologia do Estado',
                dataCadastro: new Date().toLocaleDateString('pt-BR'),
            };
            this.afastamentosOriginal.unshift(novo);
            this.msgService.add({ severity: 'success', summary: 'Sucesso', detail: 'Afastamento cadastrado.' });
        }

        this.afastamentos = [...this.afastamentosOriginal];
        this.dialogFormVisivel = false;
    }

    // ── Cancelar ──────────────────────────────────────────────────
    abrirCancelar(a: Afastamento) {
        this.sel = a;
        this.motivoCancelamento = '';
        this.dialogCancelarVisivel = true;
    }

    confirmarCancelamento() {
        if (!this.sel || !this.motivoCancelamento.trim()) return;
        const idx = this.afastamentosOriginal.findIndex(x => x.id === this.sel!.id);
        if (idx > -1) {
            this.afastamentosOriginal[idx].status = 'Cancelado';
            this.afastamentosOriginal[idx].motivoCancelamento = this.motivoCancelamento;
            this.afastamentosOriginal[idx].responsavelCancelamento = 'João da Silva';
            this.afastamentosOriginal[idx].dataCancelamento = new Date().toLocaleDateString('pt-BR');
            this.afastamentos = [...this.afastamentosOriginal];
        }
        this.dialogCancelarVisivel = false;
        this.msgService.add({ severity: 'success', summary: 'Sucesso', detail: 'Afastamento cancelado.' });
    }
}
