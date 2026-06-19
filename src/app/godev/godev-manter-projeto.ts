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
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { Membro, Papel, Projeto, TipoProjeto } from './godev.models';
import { PROJETOS_MOCK } from './godev.mock';
import { BG_PAPEL, COR_PAPEL, PAPEL_OPCOES, TIPO_OPCOES, iniciais } from './godev.ui';

type InicioId = 'doc-cod' | 'doc' | 'cod' | 'zero';
type ConexaoStatus = 'idle' | 'testando' | 'conectado' | 'falhou';

interface RepoScan { nome: string; path: string; encontrado: boolean; criar: boolean; excluir: boolean; }

@Component({
    selector: 'app-godev-manter-projeto',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TextareaModule,
              SelectModule, DialogModule, ProgressSpinnerModule, TooltipModule, PasswordModule, CheckboxModule],
    templateUrl: './godev-manter-projeto.html',
    styleUrl:    './godev-manter-projeto.scss',
})
export class GodevManterProjeto implements OnInit {
    private router = inject(Router);
    private route  = inject(ActivatedRoute);
    private messageService = inject(MessageService);

    corPapel = COR_PAPEL;
    bgPapel  = BG_PAPEL;
    papelOpcoes = PAPEL_OPCOES;
    tipoOpcoes  = TIPO_OPCOES;
    iniciais = iniciais;

    isEdicao      = false;
    salvando      = signal(false);
    inativarModal = false;

    // Os 4 fluxos de início (matriz: tem documentação? × tem código?)
    inicios: { id: InicioId; titulo: string; desc: string; icon: string; temDoc: boolean; temCod: boolean }[] = [
        { id: 'doc-cod', titulo: 'Documentação e código', desc: 'O projeto já existe: possui documentação e código-fonte.',          icon: 'pi-check-circle', temDoc: true,  temCod: true  },
        { id: 'doc',     titulo: 'Só documentação',        desc: 'Tem documentação, mas o código ainda será desenvolvido.',           icon: 'pi-file-edit',    temDoc: true,  temCod: false },
        { id: 'cod',     titulo: 'Só código',              desc: 'Tem código-fonte, mas não há documentação formal.',                 icon: 'pi-code',         temDoc: false, temCod: true  },
        { id: 'zero',    titulo: 'Do zero',                desc: 'Sem documentação e sem código — começar do início no GO.DEV.',       icon: 'pi-sparkles',     temDoc: false, temCod: false },
    ];
    inicioSelecionado = signal<InicioId | null>(null);

    get inicioAtual() { return this.inicios.find(i => i.id === this.inicioSelecionado()); }
    get temDoc() { return this.inicioAtual?.temDoc ?? false; }
    get temCod() { return this.inicioAtual?.temCod ?? false; }

    form = {
        nome: '', descricao: '', tipo: null as TipoProjeto | null,
        // Condicionais conforme o fluxo escolhido
        docOrigem: null as string | null, docUrl: '',
        rootUrl: '',
        // Conexões
        banco: null as string | null, dbUsuario: '', dbSenha: '',
    };
    origemDocOpcoes = [
        { label: 'Upload de arquivo (.md / Word)', value: 'upload' },
        { label: 'Link externo (URL)',            value: 'url' },
        { label: 'Confluence',                    value: 'confluence' },
        { label: 'SharePoint',                    value: 'sharepoint' },
    ];
    bancoOpcoes = [
        { label: 'PostgreSQL', value: 'postgres' },
        { label: 'MySQL',      value: 'mysql' },
        { label: 'SQL Server', value: 'sqlserver' },
        { label: 'Oracle',     value: 'oracle' },
        { label: 'MongoDB',    value: 'mongodb' },
    ];
    membros = signal<Membro[]>([]);

    // Sub-repositórios esperados na raiz do projeto
    private esperados: { nome: string; path: string }[] = [
        { nome: 'WIKI',          path: '/wiki' },
        { nome: 'Design System', path: '/designsystem' },
        { nome: 'Código',        path: '/codigo' },
        { nome: 'Frontend',      path: '/frontend' },
        { nome: 'Backend',       path: '/backend' },
    ];

    // Resultado da busca na raiz
    buscaStatus = signal<'idle' | 'buscando' | 'concluido' | 'falhou'>('idle');
    repos = signal<RepoScan[]>([]);
    confirmado = signal(false);

    get reposEncontrados()  { return this.repos().filter(r => r.encontrado); }
    get reposFaltando()     { return this.repos().filter(r => !r.encontrado); }
    get reposParaCriar()    { return this.reposFaltando.filter(r => r.criar); }
    get reposParaExcluir()  { return this.repos().filter(r => r.encontrado && r.excluir); }

    toggleExcluir(r: RepoScan) { r.excluir = !r.excluir; this.confirmado.set(false); }

    get labelConfirmar() {
        const partes: string[] = [];
        if (this.reposParaCriar.length)   partes.push(`criar ${this.reposParaCriar.length}`);
        if (this.reposParaExcluir.length) partes.push(`excluir ${this.reposParaExcluir.length}`);
        return partes.length ? `Confirmar (${partes.join(' · ')})` : 'Confirmar repositórios';
    }

    // Estado de conexão do banco
    dbStatus = signal<ConexaoStatus>('idle');

    selecionarInicio(id: InicioId) { this.inicioSelecionado.set(id); }

    private urlValida(url: string) { return /^https?:\/\/[^\s]+\.[^\s]+/.test(url.trim()); }

    // Mudar a raiz invalida a busca/confirmação anterior
    onRootChange() {
        this.buscaStatus.set('idle');
        this.repos.set([]);
        this.confirmado.set(false);
    }

    buscarRepos() {
        if (!this.urlValida(this.form.rootUrl)) { this.buscaStatus.set('falhou'); return; }
        this.buscaStatus.set('buscando');
        this.confirmado.set(false);
        // Mock: encontra wiki, código e frontend; faltam design system e backend
        const encontrados = new Set(['/wiki', '/codigo', '/frontend']);
        setTimeout(() => {
            this.repos.set(this.esperados.map(e => ({
                ...e,
                encontrado: encontrados.has(e.path),
                criar: !encontrados.has(e.path), // sugere criar os que faltam
                excluir: false,
            })));
            this.buscaStatus.set('concluido');
        }, 1500);
    }

    confirmarRepos() { this.confirmado.set(true); }

    onDbChange() { this.dbStatus.set('idle'); }

    testarBanco() {
        this.dbStatus.set('testando');
        // Mock: conecta se banco, usuário e senha estiverem preenchidos
        setTimeout(() => {
            const ok = !!this.form.banco && !!this.form.dbUsuario.trim() && !!this.form.dbSenha.trim();
            this.dbStatus.set(ok ? 'conectado' : 'falhou');
        }, 1500);
    }

    addMembroModal = false;
    novoMembro = { nome: '', email: '', papel: null as Papel | null };
    membroErro = '';
    private nextId = 100;

    private projetoEditando: Projeto | null = null;

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.isEdicao = !!id;
        if (!this.isEdicao) return;

        const p = PROJETOS_MOCK.find(x => x.id === +id!);
        if (p) {
            this.projetoEditando = p;
            this.form = {
                ...this.form,
                nome: p.nome, descricao: p.descricao, tipo: p.tipo,
                // Conexões já configuradas (mock) do projeto existente
                rootUrl: `https://gitlab.goias.gov.br/${p.nome.toLowerCase().replace(/\s+/g, '-')}`,
                banco: 'postgres', dbUsuario: 'svc_godev', dbSenha: 'senha-mock-123',
            };
            // Projeto existente: assume que já tem doc e código
            this.inicioSelecionado.set('doc-cod');
            // Repositórios já verificados (todos existentes) e banco conectado
            this.repos.set(this.esperados.map(e => ({ ...e, encontrado: true, criar: false, excluir: false })));
            this.buscaStatus.set('concluido');
            this.confirmado.set(true);
            this.dbStatus.set('conectado');
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

    get podeSalvar() {
        const f = this.form;
        const inicioOk = this.isEdicao || !!this.inicioSelecionado();
        // Banco é sempre obrigatório e precisa estar conectado
        const dbOk = !!f.banco && !!f.dbUsuario.trim() && !!f.dbSenha.trim()
            && this.dbStatus() === 'conectado';
        // Raiz do projeto: precisa buscar os repositórios e confirmar
        const reposOk = !!f.rootUrl.trim() && this.confirmado();
        return !!f.nome.trim() && inicioOk && dbOk && reposOk;
    }

    private persistir() {
        const f = this.form;
        if (this.isEdicao && this.projetoEditando) {
            // Atualiza o projeto existente no mock
            const p = this.projetoEditando;
            p.nome = f.nome.trim();
            p.descricao = f.descricao.trim();
            p.tipo = f.tipo ?? p.tipo;
            p.membros = this.membros();
            p.ultimaPublicacao = 'agora mesmo';
        } else {
            // Cria um novo projeto e adiciona no topo da lista
            const novoId = Math.max(0, ...PROJETOS_MOCK.map(p => p.id)) + 1;
            PROJETOS_MOCK.unshift({
                id: novoId,
                nome: f.nome.trim(),
                descricao: f.descricao.trim(),
                tipo: f.tipo ?? 'Web',
                status: 'ativo',
                sincronizacao: 'sincronizado',
                membros: this.membros(),
                documentos: [],
                telas: [],
                ultimaPublicacao: 'agora mesmo',
            });
        }
    }

    salvar() {
        if (!this.podeSalvar) return;
        this.salvando.set(true);
        const nome = this.form.nome.trim();
        const edicao = this.isEdicao;
        // Mock: simula criação do workspace antes de voltar para a lista
        setTimeout(() => {
            this.persistir();
            this.salvando.set(false);
            this.router.navigate(['/godev/projetos']).then(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: edicao ? 'Projeto atualizado' : 'Projeto criado',
                    detail: edicao
                        ? `As alterações de "${nome}" foram salvas com sucesso.`
                        : `O projeto "${nome}" foi criado com sucesso.`,
                    life: 4000,
                });
            });
        }, 1800);
    }

    cancelar() { this.router.navigate(['/godev/projetos']); }

    inativar() {
        this.inativarModal = false;
        const nome = this.form.nome.trim();
        if (this.projetoEditando) this.projetoEditando.status = 'inativo';
        this.router.navigate(['/godev/projetos']).then(() => {
            this.messageService.add({
                severity: 'warn',
                summary: 'Projeto inativado',
                detail: `O projeto "${nome}" foi inativado.`,
                life: 4000,
            });
        });
    }
}
