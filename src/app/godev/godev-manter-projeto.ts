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
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessageService } from 'primeng/api';
import { Membro, Papel, Projeto, TipoProjeto } from './godev.models';
import { PROJETOS_MOCK } from './godev.mock';
import { BG_PAPEL, COR_PAPEL, PAPEL_OPCOES, TIPO_OPCOES, iniciais } from './godev.ui';

type ConexaoStatus = 'idle' | 'testando' | 'conectado' | 'falhou';
type RepoTipo = 'wiki' | 'frontend' | 'backend' | 'api';

interface RepoScan { nome: string; path: string; tipo: RepoTipo; encontrado: boolean; criar: boolean; excluir: boolean; }

interface UsuarioBase { nome: string; login: string; email: string; cpf: string; }
interface SugestaoUsuario extends UsuarioBase { display: string; }

@Component({
    selector: 'app-godev-manter-projeto',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TextareaModule,
              SelectModule, DialogModule, ProgressSpinnerModule, TooltipModule, PasswordModule, CheckboxModule, AutoCompleteModule],
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


    form = {
        nome: '', descricao: '', tipo: null as TipoProjeto | null,
        rootUrl: '',
        // Conexões
        banco: null as string | null, dbUsuario: '', dbSenha: '',
    };
    bancoOpcoes = [
        { label: 'PostgreSQL', value: 'postgres' },
        { label: 'MySQL',      value: 'mysql' },
        { label: 'SQL Server', value: 'sqlserver' },
        { label: 'Oracle',     value: 'oracle' },
        { label: 'MongoDB',    value: 'mongodb' },
    ];
    membros = signal<Membro[]>([]);

    // 10 cenários possíveis ao CRIAR um projeto — sorteados a cada "Buscar repositórios".
    // Regras: a Wiki sempre existe; o Frontend existe; o Backend pode ter 0, 1 ou vários
    // (alguns já existentes, outros a criar). Não há "Design System" nem "Código" genérico.
    private cenarios: { nome: string; path: string; encontrado: boolean }[][] = [
        [
            { nome: 'Wiki',                 path: '/wiki',            encontrado: true },
            { nome: 'Frontend Web',         path: '/web',             encontrado: true },
            { nome: 'API Principal',        path: '/api',             encontrado: true },
        ],
        [
            { nome: 'Wiki',                 path: '/wiki',            encontrado: true },
            { nome: 'Frontend Web',         path: '/web',             encontrado: true },
            { nome: 'API Principal',        path: '/api',             encontrado: false },
        ],
        [
            { nome: 'Wiki',                 path: '/wiki',            encontrado: true },
            { nome: 'Portal Web',           path: '/portal-web',      encontrado: true },
            { nome: 'API de Autenticação',  path: '/api-auth',        encontrado: true },
            { nome: 'API de Dados',         path: '/api-dados',       encontrado: true },
        ],
        [
            { nome: 'Wiki',                 path: '/wiki',            encontrado: true },
            { nome: 'App Web',              path: '/app-web',         encontrado: true },
            { nome: 'API Core',             path: '/api-core',        encontrado: true },
            { nome: 'API de Pagamentos',    path: '/api-pagamentos',  encontrado: false },
        ],
        [
            { nome: 'Wiki',                 path: '/wiki',            encontrado: true },
            { nome: 'Frontend',             path: '/frontend',        encontrado: true },
            { nome: 'BFF',                  path: '/bff',             encontrado: true },
            { nome: 'API Principal',        path: '/api',             encontrado: true },
        ],
        [
            { nome: 'Wiki',                  path: '/wiki',            encontrado: true },
            { nome: 'Frontend',             path: '/frontend',        encontrado: true },
            { nome: 'API de Autenticação',  path: '/api-auth',        encontrado: true },
            { nome: 'API de Notificações',  path: '/api-notificacoes',encontrado: false },
            { nome: 'API de Relatórios',    path: '/api-relatorios',  encontrado: false },
        ],
        [
            { nome: 'Wiki',                 path: '/wiki',            encontrado: true },
            { nome: 'Frontend Web',         path: '/web',             encontrado: true },
            { nome: 'API Principal',        path: '/api',             encontrado: false },
        ],
        [
            { nome: 'Wiki',                 path: '/wiki',            encontrado: true },
            { nome: 'Painel Administrativo',path: '/painel-admin',    encontrado: true },
            { nome: 'API Gateway',          path: '/api-gateway',     encontrado: true },
            { nome: 'Microsserviço de Usuários',  path: '/ms-usuarios',    encontrado: true },
            { nome: 'Microsserviço de Pagamentos',path: '/ms-pagamentos',  encontrado: true },
        ],
        [
            { nome: 'Wiki',                 path: '/wiki',            encontrado: true },
            { nome: 'Frontend Mobile',      path: '/frontend-mobile', encontrado: true },
            { nome: 'API Principal',        path: '/api',             encontrado: true },
            { nome: 'Worker de Filas',      path: '/worker-filas',    encontrado: false },
        ],
        [
            { nome: 'Wiki',                 path: '/wiki',            encontrado: true },
            { nome: 'Frontend Web',         path: '/web',             encontrado: true },
            { nome: 'API Principal',        path: '/api',             encontrado: true },
            { nome: 'API de Integração',    path: '/api-integracao',  encontrado: false },
        ],
    ];

    // Conjunto FIXO usado ao EDITAR um projeto (sem sorteio).
    private cenarioEdicao: { nome: string; path: string; encontrado: boolean }[] = [
        { nome: 'Wiki',                path: '/wiki',     encontrado: true },
        { nome: 'Frontend Web',        path: '/web',      encontrado: true },
        { nome: 'API Core',            path: '/api-core', encontrado: true },
        { nome: 'API de Autenticação', path: '/api-auth', encontrado: true },
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
        if (this.reposParaExcluir.length) partes.push(`desvincular ${this.reposParaExcluir.length}`);
        return partes.length ? `Confirmar (${partes.join(' · ')})` : 'Confirmar repositórios';
    }

    // Estado de conexão do banco
    dbStatus = signal<ConexaoStatus>('idle');


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
        // Edição: conjunto fixo. Criação: sorteia um dos 10 cenários possíveis.
        const base = this.isEdicao
            ? this.cenarioEdicao
            : this.cenarios[Math.floor(Math.random() * this.cenarios.length)];
        setTimeout(() => {
            this.repos.set(base.map(e => ({
                ...e,
                tipo: this.tipoDoRepo(e.path),
                criar: !e.encontrado, // sugere criar os que faltam
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

    // ===================== Membros (busca na base do estado) =====================
    addMembroModal = false;
    novoMembro = { papel: null as Papel | null };
    usuarioSel: SugestaoUsuario | null = null;
    sugestoesUsuarios: SugestaoUsuario[] = [];
    membroErro = '';
    private nextId = 100;

    // Base mock de usuários do estado (login = nome.sobrenome)
    private baseUsuarios: UsuarioBase[] = [
        { nome: 'Felipe Santiago',  login: 'felipe.santiago',  email: 'felipe.santiago@goias.gov.br',  cpf: '012.345.678-90' },
        { nome: 'Maria Souza',      login: 'maria.souza',      email: 'maria.souza@goias.gov.br',      cpf: '123.456.789-01' },
        { nome: 'Carlos Lima',      login: 'carlos.lima',      email: 'carlos.lima@goias.gov.br',      cpf: '234.567.890-12' },
        { nome: 'Ana Pereira',      login: 'ana.pereira',      email: 'ana.pereira@goias.gov.br',      cpf: '345.678.901-23' },
        { nome: 'João Alves',       login: 'joao.alves',       email: 'joao.alves@goias.gov.br',       cpf: '456.789.012-34' },
        { nome: 'Renata Dias',      login: 'renata.dias',      email: 'renata.dias@goias.gov.br',      cpf: '567.890.123-45' },
        { nome: 'Bruno Teixeira',   login: 'bruno.teixeira',   email: 'bruno.teixeira@goias.gov.br',   cpf: '678.901.234-56' },
        { nome: 'Luciano Fagundes', login: 'luciano.fagundes', email: 'luciano.fagundes@goias.gov.br', cpf: '789.012.345-67' },
        { nome: 'Patrícia Gomes',   login: 'patricia.gomes',   email: 'patricia.gomes@goias.gov.br',   cpf: '890.123.456-78' },
        { nome: 'Rodrigo Martins',  login: 'rodrigo.martins',  email: 'rodrigo.martins@goias.gov.br',  cpf: '901.234.567-89' },
    ];

    buscarUsuarios(event: { query: string }) {
        const q = (event.query || '').toLowerCase().trim();
        const dig = q.replace(/\D/g, '');
        this.sugestoesUsuarios = this.baseUsuarios
            .filter(u =>
                u.nome.toLowerCase().includes(q) ||
                u.login.toLowerCase().includes(q) ||
                u.email.toLowerCase().includes(q) ||
                (dig.length >= 3 && u.cpf.replace(/\D/g, '').includes(dig)))
            .map(u => ({ ...u, display: this.formatarSugestao(u, q, dig) }));
    }

    // Mostra o resultado conforme o que foi pesquisado
    private formatarSugestao(u: UsuarioBase, q: string, dig: string): string {
        if (q.includes('@'))                                   return `${u.email} - ${u.login}`;   // e-mail
        if (dig.length >= 3 && dig === q.replace(/[\s.\-]/g, '')) return `${u.nome} - ${u.login}`; // cpf
        if (q.includes('.') && !q.includes(' '))               return u.login;                     // login
        return `${u.nome} - ${u.login}`;                                                           // nome
    }

    // Tipo do repositório a partir do path (wiki / frontend / backend / api)
    private tipoDoRepo(path: string): RepoTipo {
        if (path.includes('wiki')) return 'wiki';
        if (/web|frontend|portal|app|painel/.test(path)) return 'frontend';
        if (/ms-|worker/.test(path)) return 'backend';
        return 'api';
    }
    tipoLabel: Record<RepoTipo, string> = { wiki: 'Wiki', frontend: 'Front-end', backend: 'Back-end', api: 'API' };

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
            // Repositórios já verificados (todos existentes) e banco conectado
            this.repos.set(this.cenarioEdicao.map(e => ({ ...e, tipo: this.tipoDoRepo(e.path), criar: false, excluir: false })));
            this.buscaStatus.set('concluido');
            this.confirmado.set(true);
            this.dbStatus.set('conectado');
            this.membros.set([...p.membros]);
        }
    }

    abrirAddMembro() {
        this.novoMembro = { papel: null };
        this.usuarioSel = null;
        this.sugestoesUsuarios = [];
        this.membroErro = '';
        this.addMembroModal = true;
    }

    confirmarAddMembro() {
        const u = this.usuarioSel;
        const papel = this.novoMembro.papel;
        if (!u || !u.login) {
            this.membroErro = 'Selecione um usuário da base.';
            return;
        }
        if (!papel) {
            this.membroErro = 'Selecione o perfil.';
            return;
        }
        this.membros.update(lista => [...lista, {
            id: this.nextId++,
            nome:   u.nome,
            email:  u.email,
            papel,
            avatar: iniciais(u.nome),
        }]);
        this.addMembroModal = false;
    }

    removerMembro(id: number) {
        this.membros.update(lista => lista.filter(m => m.id !== id));
    }

    get podeSalvar() {
        const f = this.form;
        // Banco é sempre obrigatório e precisa estar conectado
        const dbOk = !!f.banco && !!f.dbUsuario.trim() && !!f.dbSenha.trim()
            && this.dbStatus() === 'conectado';
        // Raiz do projeto: precisa buscar os repositórios e confirmar
        const reposOk = !!f.rootUrl.trim() && this.confirmado();
        return !!f.nome.trim() && dbOk && reposOk;
    }

    private persistir(): Projeto {
        const f = this.form;
        if (this.isEdicao && this.projetoEditando) {
            // Atualiza o projeto existente no mock
            const p = this.projetoEditando;
            p.nome = f.nome.trim();
            p.descricao = f.descricao.trim();
            p.tipo = f.tipo ?? p.tipo;
            p.membros = this.membros();
            p.ultimaPublicacao = 'agora mesmo';
            return p;
        }
        // Cria um novo projeto e adiciona no topo da lista
        const novoId = Math.max(0, ...PROJETOS_MOCK.map(p => p.id)) + 1;
        const novo: Projeto = {
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
        };
        PROJETOS_MOCK.unshift(novo);
        return novo;
    }

    salvar() {
        if (!this.podeSalvar) return;
        this.salvando.set(true);
        const nome = this.form.nome.trim();
        const edicao = this.isEdicao;
        setTimeout(() => {
            const projeto = this.persistir();
            this.salvando.set(false);
            // Edição volta para a lista; criação vai direto para o workspace
            const destino = edicao
                ? ['/godev/projetos']
                : ['/godev/projetos', projeto.id, 'workspace'];
            this.router.navigate(destino).then(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: edicao ? 'Projeto atualizado' : 'Projeto criado',
                    detail: edicao
                        ? `As alterações de "${nome}" foram salvas com sucesso.`
                        : `Projeto "${nome}" criado com sucesso.`,
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
