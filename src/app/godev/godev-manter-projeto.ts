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
import { MessageService } from 'primeng/api';
import { Membro, Papel, TipoProjeto } from './godev.models';
import { PROJETOS_MOCK } from './godev.mock';
import { BG_PAPEL, COR_PAPEL, PAPEL_OPCOES, TIPO_OPCOES, iniciais } from './godev.ui';

type InicioId = 'doc-cod' | 'doc' | 'cod' | 'zero';
type ConexaoStatus = 'idle' | 'testando' | 'conectado' | 'falhou';

@Component({
    selector: 'app-godev-manter-projeto',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TextareaModule,
              SelectModule, DialogModule, ProgressSpinnerModule, TooltipModule, PasswordModule],
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
        repoUrl: '', wikiUrl: '', branch: 'main',
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

    // Estados de teste de conexão (GitLab código, WIKI e Banco)
    gitlabStatus = signal<ConexaoStatus>('idle');
    wikiStatus   = signal<ConexaoStatus>('idle');
    dbStatus     = signal<ConexaoStatus>('idle');

    selecionarInicio(id: InicioId) { this.inicioSelecionado.set(id); }

    // Mudar a URL invalida o teste anterior — exige testar de novo
    onRepoChange() { this.gitlabStatus.set('idle'); }
    onWikiChange() { this.wikiStatus.set('idle'); }
    onDbChange()   { this.dbStatus.set('idle'); }

    private urlValida(url: string) { return /^https?:\/\/[^\s]+\.[^\s]+/.test(url.trim()); }

    testarGitlab() {
        this.gitlabStatus.set('testando');
        const url = this.form.repoUrl;
        setTimeout(() => this.gitlabStatus.set(this.urlValida(url) ? 'conectado' : 'falhou'), 1500);
    }

    testarWiki() {
        this.wikiStatus.set('testando');
        const url = this.form.wikiUrl;
        setTimeout(() => this.wikiStatus.set(this.urlValida(url) ? 'conectado' : 'falhou'), 1500);
    }

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

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.isEdicao = !!id;
        if (!this.isEdicao) return;

        const p = PROJETOS_MOCK.find(x => x.id === +id!);
        if (p) {
            this.form = {
                ...this.form,
                nome: p.nome, descricao: p.descricao, tipo: p.tipo,
                // Conexões já configuradas (mock) do projeto existente
                repoUrl: `https://gitlab.goias.gov.br/${p.nome.toLowerCase().replace(/\s+/g, '-')}.git`,
                wikiUrl: `https://gitlab.goias.gov.br/${p.nome.toLowerCase().replace(/\s+/g, '-')}.wiki.git`,
                banco: 'postgres', dbUsuario: 'svc_godev', dbSenha: 'senha-mock-123',
            };
            // Projeto existente: assume que já tem doc e código
            this.inicioSelecionado.set('doc-cod');
            // Conexões já validadas anteriormente
            this.gitlabStatus.set('conectado');
            this.wikiStatus.set('conectado');
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
        // Código (GitLab) obrigatório só quando o projeto tem código
        const codigoOk = !this.temCod
            || (!!f.repoUrl.trim() && this.gitlabStatus() === 'conectado');
        // WIKI obrigatória só quando o projeto tem documentação
        const wikiOk = !this.temDoc
            || (!!f.wikiUrl.trim() && this.wikiStatus() === 'conectado');
        return !!f.nome.trim() && inicioOk && dbOk && codigoOk && wikiOk;
    }

    salvar() {
        if (!this.podeSalvar) return;
        this.salvando.set(true);
        const nome = this.form.nome.trim();
        const edicao = this.isEdicao;
        // Mock: simula criação do workspace antes de voltar para a lista
        setTimeout(() => {
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
