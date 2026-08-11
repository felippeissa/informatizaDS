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
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TabsModule } from 'primeng/tabs';
import { MessageService } from 'primeng/api';
import { Membro, Papel, Projeto } from './godev.models';
import { PROJETOS_MOCK } from './godev.mock';
import { BG_PAPEL, COR_PAPEL, PAPEL_OPCOES, iniciais } from './godev.ui';

type RepoTipo = 'wiki' | 'frontend' | 'backend' | 'api';

interface RepoScan { nome: string; url: string; tipo: RepoTipo; template: string; excluir: boolean; editando: boolean; }

interface UsuarioBase { nome: string; login: string; email: string; cpf: string; }
interface SugestaoUsuario extends UsuarioBase { display: string; }

@Component({
    selector: 'app-godev-manter-projeto',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TextareaModule,
              SelectModule, DialogModule, ProgressSpinnerModule, TooltipModule, AutoCompleteModule, TabsModule],
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
    iniciais = iniciais;

    isEdicao      = false;
    salvando      = signal(false);
    inativarModal = false;


    form = {
        nome: '', descricao: '',
        rootUrl: '',
    };
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

    get reposParaExcluir() { return this.repos().filter(r => r.excluir); }
    get temEdicaoAberta()  { return this.repos().some(r => r.editando); }

    toggleExcluir(r: RepoScan) { r.excluir = !r.excluir; this.confirmado.set(false); }

    get labelConfirmar() {
        const n = this.reposParaExcluir.length;
        return n ? `Confirmar (desvincular ${n})` : 'Confirmar repositórios';
    }

    // Editar URL/TAG/Template de um resultado
    tipoRepoOpcoes: { label: string; value: RepoTipo }[] = [
        { label: 'Wiki',      value: 'wiki' },
        { label: 'Front-end', value: 'frontend' },
        { label: 'Back-end',  value: 'backend' },
        { label: 'API',       value: 'api' },
    ];

    // Cada repositório se baseia em um template
    templateOpcoes = ['smart-arquivos', 'smart-clientes-api', 'smart-sakai-primeng'];

    // Sugestão de template conforme o tipo do repositório
    private templatePadrao(tipo: RepoTipo): string {
        if (tipo === 'wiki') return 'smart-arquivos';
        if (tipo === 'frontend') return 'smart-sakai-primeng';
        return 'smart-clientes-api'; // backend / api
    }

    editarRepo(r: RepoScan) { r.editando = true; this.confirmado.set(false); }

    salvarRepo(r: RepoScan) {
        if (!r.url.trim()) return;
        r.url = r.url.trim();
        r.nome = this.nomeDaUrl(r.url);
        r.editando = false;
    }

    // ===================== Modal "Novo repositório" =====================
    novoRepoModal = false;
    abaRepo: 'criar' | 'url' = 'criar';
    pathStatus = signal<'idle' | 'verificando' | 'livre' | 'existe'>('idle');

    formRepo = {
        area: '', prefixo: '', servico: '',
        tipo: 'api' as RepoTipo,
        template: '',
    };
    formUrlRepo = { url: '' };

    // Sufixo aplicado ao nome do repositório conforme o tipo
    private sufixoTipo: Record<RepoTipo, string> = {
        wiki: '-wiki', frontend: '-web', backend: '-back', api: '-api',
    };

    tipoRepoModalOpcoes = this.tipoRepoOpcoes.map(t => ({
        label: `${t.label} (${this.sufixoTipo[t.value]})`, value: t.value,
    }));

    templateModalOpcoes = [
        { label: 'Vazio (sem template)', value: '' },
        ...this.templateOpcoes.map(t => ({ label: t, value: t })),
    ];

    // Transforma um texto em slug (usado no prefixo e no nome do serviço)
    private slug(txt: string) {
        return txt.trim().toLowerCase()
            .normalize('NFD').replace(/[̀-ͯ]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    // Path montado a partir dos campos: {dominio}/{area}/{prefixo}-{servico}{sufixo}
    // Usa só o domínio da URL raiz — a "área de negócio" já é o grupo do GitLab.
    get pathFinal(): string {
        const f = this.formRepo;
        const area = this.slug(f.area);
        const servico = this.slug(f.servico);
        if (!area || !servico) return '';
        const raiz = this.form.rootUrl.trim();
        let dominio = 'https://gitlab.goias.gov.br';
        try { dominio = new URL(raiz).origin; } catch { /* raiz inválida: usa o padrão */ }
        const prefixo = this.slug(f.prefixo);
        const nome = (prefixo ? `${prefixo}-` : '') + servico + this.sufixoTipo[f.tipo];
        return `${dominio}/${area}/${nome}`;
    }

    abrirNovoRepo() {
        this.abaRepo = 'criar';
        this.pathStatus.set('idle');
        this.formRepo = {
            area: '', prefixo: this.slug(this.form.nome), servico: '',
            tipo: 'api', template: '',
        };
        this.formUrlRepo = { url: '' };
        this.novoRepoModal = true;
    }

    onRepoFormChange() { this.pathStatus.set('idle'); }

    verificarPath() {
        if (!this.pathFinal) return;
        this.pathStatus.set('verificando');
        // Mock: considera existente quando o serviço já está na lista
        setTimeout(() => {
            const jaExiste = this.repos().some(r => r.url === this.pathFinal);
            this.pathStatus.set(jaExiste ? 'existe' : 'livre');
        }, 1200);
    }

    get podeAdicionarRepo() {
        return !!this.formRepo.area.trim() && !!this.formRepo.servico.trim() && this.pathStatus() !== 'existe';
    }

    adicionarRepoCriado() {
        if (!this.podeAdicionarRepo) return;
        const url = this.pathFinal;
        this.repos.update(l => [...l, {
            nome: this.nomeDaUrl(url),
            url,
            tipo: this.formRepo.tipo,
            template: this.formRepo.template || '—',
            excluir: false,
            editando: false,
        }]);
        this.confirmado.set(false);
        this.novoRepoModal = false;
    }

    get podeVincularRepo() { return this.urlValida(this.formUrlRepo.url); }

    vincularRepoUrl() {
        if (!this.podeVincularRepo) return;
        const url = this.formUrlRepo.url.trim().replace(/\/+$/, '');
        const tipo = this.tipoDoRepo(url);
        this.repos.update(l => [...l, {
            nome: this.nomeDaUrl(url),
            url,
            tipo,
            template: this.templatePadrao(tipo),
            excluir: false,
            editando: false,
        }]);
        this.confirmado.set(false);
        this.novoRepoModal = false;
    }

    removerRepo(r: RepoScan) { this.repos.update(l => l.filter(x => x !== r)); }

    private nomeDaUrl(url: string): string {
        const seg = url.replace(/\/+$/, '').split('/').pop() ?? '';
        const limpo = seg.replace(/[-_]/g, ' ').trim();
        return limpo ? limpo.charAt(0).toUpperCase() + limpo.slice(1) : 'Repositório';
    }

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
        const raiz = this.form.rootUrl.trim().replace(/\/+$/, '');
        setTimeout(() => {
            // Só os repositórios existentes na raiz — os demais podem ser adicionados com "Novo"
            this.repos.set(base.filter(e => e.encontrado).map(e => {
                const tipo = this.tipoDoRepo(e.path);
                return {
                    nome: e.nome,
                    url: raiz + e.path,
                    tipo,
                    template: this.templatePadrao(tipo),
                    excluir: false,
                    editando: false,
                };
            }));
            this.buscaStatus.set('concluido');
        }, 1500);
    }

    confirmarRepos() {
        if (this.temEdicaoAberta) return;
        this.confirmado.set(true);
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
            const rootUrl = `https://gitlab.goias.gov.br/${p.nome.toLowerCase().replace(/\s+/g, '-')}`;
            this.form = {
                ...this.form,
                nome: p.nome, descricao: p.descricao,
                rootUrl,
            };
            // Repositórios já verificados do projeto existente
            this.repos.set(this.cenarioEdicao.map(e => {
                const tipo = this.tipoDoRepo(e.path);
                return {
                    nome: e.nome, url: rootUrl + e.path, tipo,
                    template: this.templatePadrao(tipo),
                    excluir: false, editando: false,
                };
            }));
            this.buscaStatus.set('concluido');
            this.confirmado.set(true);
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
        // Raiz do projeto: precisa buscar os repositórios e confirmar (sem edições abertas)
        const reposOk = !!f.rootUrl.trim() && this.confirmado() && !this.temEdicaoAberta;
        return !!f.nome.trim() && reposOk;
    }

    private persistir(): Projeto {
        const f = this.form;
        if (this.isEdicao && this.projetoEditando) {
            // Atualiza o projeto existente no mock
            const p = this.projetoEditando;
            p.nome = f.nome.trim();
            p.descricao = f.descricao.trim();
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
            tipo: 'Web',
            status: 'ativo',
            sincronizacao: 'sincronizado',
            membros: this.membros(),
            specs: [],
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
