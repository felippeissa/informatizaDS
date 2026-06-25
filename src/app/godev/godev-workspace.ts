import { AfterViewChecked, Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { SelectModule } from 'primeng/select';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { PopoverModule } from 'primeng/popover';
import { Projeto, Documento, Tela, Papel, ComponenteTela, TipoComponente } from './godev.models';
import { PROJETOS_MOCK } from './godev.mock';
import {
    BG_PAPEL, BG_STATUS, COR_PAPEL, COR_STATUS,
    ICON_STATUS, LABEL_STATUS, PAPEL_OPCOES, iniciais,
} from './godev.ui';

type Aba = 'requisitos' | 'telas' | 'codigo' | 'membros';

interface ChatMsg { autor: 'user' | 'ia'; texto: string; contexto?: string; }

interface ChatSessao { id: number; titulo: string; msgs: ChatMsg[]; }

interface StatusAgente { texto: string; icon: string; cor: string; }

@Component({
    selector: 'app-godev-workspace',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, DialogModule,
              InputTextModule, TooltipModule, SelectModule, ProgressSpinnerModule, TableModule, CheckboxModule, PopoverModule],
    templateUrl: './godev-workspace.html',
    styleUrl:    './godev-workspace.scss',
})
export class GodevWorkspace implements OnInit, AfterViewChecked, OnDestroy {
    private router = inject(Router);
    private route  = inject(ActivatedRoute);

    // ===================== Status do agente (o que o GO.DEV está fazendo) =====================
    atividades: StatusAgente[] = [
        { texto: 'Criando repositório do projeto...',                                  icon: 'pi-server',          cor: '#2563eb' },
        { texto: 'Criando arquivo da wiki...',                                         icon: 'pi-book',            cor: '#2563eb' },
        { texto: 'Criando arquivo do Design System...',                                icon: 'pi-palette',         cor: '#7c3aed' },
        { texto: 'Sincronizando com o GitLab...',                                      icon: 'pi-sync',            cor: '#2563eb' },
        { texto: 'Analisando o documento de requisitos...',                            icon: 'pi-file-edit',       cor: '#0e7490' },
        { texto: 'Gerando componentes a partir da tela aprovada...',                   icon: 'pi-objects-column',  cor: '#15803d' },
        { texto: 'Gerando código do frontend...',                                      icon: 'pi-code',            cor: '#15803d' },
        { texto: 'Gerando endpoints do backend...',                                    icon: 'pi-server',          cor: '#15803d' },
        { texto: 'Aguardando Renildo finalizar o documento de requisitos...',          icon: 'pi-clock',           cor: '#b45309' },
        { texto: 'Aguardando aprovação da tela de Login...',                           icon: 'pi-clock',           cor: '#b45309' },
        { texto: 'Atualizando a documentação no repositório...',                       icon: 'pi-book',            cor: '#0e7490' },
    ];
    statusAtual = signal<StatusAgente>(this.atividades[0]);
    statusAtivo = signal(true);
    atividadeIdx = signal(0);
    private statusTimer?: ReturnType<typeof setInterval>;

    corPapel = COR_PAPEL;   bgPapel  = BG_PAPEL;
    corStatus = COR_STATUS; bgStatus = BG_STATUS;
    iconStatus = ICON_STATUS; labelStatus = LABEL_STATUS;
    papelOpcoes = PAPEL_OPCOES;
    iniciais = iniciais;

    projeto!: Projeto;
    aba = signal<Aba>('requisitos');

    abas: { id: Aba; label: string; icon: string }[] = [
        { id: 'requisitos', label: 'Requisitos', icon: 'pi-file-edit' },
        { id: 'telas',      label: 'Telas',      icon: 'pi-desktop' },
        { id: 'codigo',     label: 'Código',     icon: 'pi-code' },
        { id: 'membros',    label: 'Membros',    icon: 'pi-users' },
    ];

    // --- Chats (vários por documento/tela) ---
    private sessoes: Record<string, ChatSessao[]> = {};
    private sessaoAtivaPorChave: Record<string, number> = {};
    private proximaSessaoId = 1;
    chatInput = '';
    chatDigitando = false;

    // --- Requisitos ---
    docSelecionado: Documento | null = null;
    editandoDoc = false;
    docConteudo = '';
    novoDocModal  = false;
    novoDocTitulo = '';

    // --- Telas (canvas) ---
    telaSelecionada: Tela | null = null;
    novaTelaModal = false;
    novaTelaNome  = '';
    compSelecionado: ComponenteTela | null = null;
    private proximoCompId = 1000;

    paleta: { tipo: TipoComponente; label: string; icon: string }[] = [
        { tipo: 'titulo', label: 'Título',         icon: 'pi-heading' },
        { tipo: 'texto',  label: 'Texto',          icon: 'pi-align-left' },
        { tipo: 'campo',  label: 'Campo de texto', icon: 'pi-pencil' },
        { tipo: 'botao',    label: 'Botão',          icon: 'pi-stop' },
        { tipo: 'checkbox', label: 'Checkbox',       icon: 'pi-check-square' },
        { tipo: 'tabela',   label: 'Tabela',         icon: 'pi-table' },
    ];

    // --- Código ---
    codigoAba = signal<'frontend' | 'backend' | 'json'>('frontend');
    copiado   = signal(false);

    // --- Membros ---
    addMembroModal = false;
    novoMembro = { nome: '', email: '', papel: null as Papel | null };
    membroErro = '';
    private nextId = 200;

    // --- Publicar ---
    publicando = signal(false);

    @ViewChild('chatScroll') private chatScroll?: ElementRef<HTMLElement>;
    private deveRolarChat = false;

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        const p  = PROJETOS_MOCK.find(x => x.id === Number(id));
        if (!p) { this.router.navigate(['/godev/projetos']); return; }
        this.projeto = p;
        if (p.documentos.length) this.selecionarDoc(p.documentos[0]);
        if (p.telas.length)      this.selecionarTela(p.telas[0]);
        this.iniciarStatus();
    }

    // Rotaciona as atividades simulando o agente trabalhando; ao final, fica "Tudo sincronizado"
    private iniciarStatus() {
        this.statusTimer = setInterval(() => {
            const prox = this.atividadeIdx() + 1;
            if (prox >= this.atividades.length) {
                this.atividadeIdx.set(this.atividades.length);
                this.statusAtivo.set(false);
                clearInterval(this.statusTimer);
                return;
            }
            this.atividadeIdx.set(prox);
            this.statusAtual.set(this.atividades[prox]);
        }, 3500);
    }

    ngOnDestroy() {
        if (this.statusTimer) clearInterval(this.statusTimer);
    }

    ngAfterViewChecked() {
        if (!this.deveRolarChat || !this.chatScroll) return;
        this.deveRolarChat = false;
        const el = this.chatScroll.nativeElement;
        el.scrollTop = el.scrollHeight;
    }

    voltar() { this.router.navigate(['/godev/projetos']); }

    publicar() {
        this.publicando.set(true);
        // Mock: simula commit + push para todos os membros do projeto
        setTimeout(() => {
            this.projeto.ultimaPublicacao = 'agora mesmo';
            this.publicando.set(false);
        }, 2000);
    }

    // ===================== Chat contextual =====================
    // Chave que identifica o contexto atual: cada documento e cada tela tem seus próprios chats
    private get chaveContexto(): string {
        switch (this.aba()) {
            case 'requisitos': return this.docSelecionado ? `doc-${this.docSelecionado.id}` : 'requisitos';
            case 'telas':      return this.telaSelecionada ? `tela-${this.telaSelecionada.id}` : 'telas';
            default:           return this.aba();
        }
    }

    get sessoesAtuais(): ChatSessao[] {
        const chave = this.chaveContexto;
        if (!this.sessoes[chave]) {
            this.sessoes[chave] = [{ id: this.proximaSessaoId++, titulo: 'Chat 1', msgs: [] }];
            this.sessaoAtivaPorChave[chave] = this.sessoes[chave][0].id;
        }
        return this.sessoes[chave];
    }

    get sessaoAtiva(): ChatSessao {
        const lista = this.sessoesAtuais;
        const ativaId = this.sessaoAtivaPorChave[this.chaveContexto];
        return lista.find(s => s.id === ativaId) ?? lista[0];
    }

    get chat(): ChatMsg[] { return this.sessaoAtiva.msgs; }

    novoChat() {
        const lista = this.sessoesAtuais;
        const nova: ChatSessao = { id: this.proximaSessaoId++, titulo: `Chat ${lista.length + 1}`, msgs: [] };
        lista.push(nova);
        this.sessaoAtivaPorChave[this.chaveContexto] = nova.id;
    }

    selecionarChat(s: ChatSessao) {
        this.sessaoAtivaPorChave[this.chaveContexto] = s.id;
        this.deveRolarChat = true;
    }

    excluirChat(s: ChatSessao, event: Event) {
        event.stopPropagation();
        const chave = this.chaveContexto;
        this.sessoes[chave] = this.sessoes[chave].filter(x => x.id !== s.id);
        if (!this.sessoes[chave].length) {
            this.sessoes[chave] = [{ id: this.proximaSessaoId++, titulo: 'Chat 1', msgs: [] }];
        }
        if (this.sessaoAtivaPorChave[chave] === s.id) {
            this.sessaoAtivaPorChave[chave] = this.sessoes[chave][0].id;
        }
    }

    get chatContexto(): string {
        switch (this.aba()) {
            case 'requisitos': return this.docSelecionado ? `Documento: ${this.docSelecionado.titulo}` : 'Requisitos';
            case 'telas':      return this.telaSelecionada ? `Tela: ${this.telaSelecionada.nome}` : 'Telas';
            case 'codigo':     return 'Código gerado';
            default:           return 'Projeto';
        }
    }

    get chatPlaceholder(): string {
        switch (this.aba()) {
            case 'requisitos': return 'Peça melhorias no documento...';
            case 'telas':      return '"Adicione um botão", "mude o campo"...';
            case 'codigo':     return 'Pergunte sobre o código gerado...';
            default:           return 'Pergunte algo sobre o projeto...';
        }
    }

    enviarChat() {
        const txt = this.chatInput.trim();
        if (!txt || this.chatDigitando) return;
        const sessao = this.sessaoAtiva;
        // A primeira mensagem vira o título do chat
        if (!sessao.msgs.length) {
            sessao.titulo = txt.length > 28 ? txt.slice(0, 28) + '…' : txt;
        }
        sessao.msgs.push({ autor: 'user', texto: txt, contexto: this.chatContexto });
        this.chatInput = '';
        this.chatDigitando = true;
        this.deveRolarChat = true;
        setTimeout(() => {
            sessao.msgs.push({ autor: 'ia', texto: this.respostaMock() });
            this.chatDigitando = false;
            this.deveRolarChat = true;
        }, 1200);
    }

    sugestao(texto: string) {
        this.chatInput = texto;
        this.enviarChat();
    }

    get sugestoes(): string[] {
        switch (this.aba()) {
            case 'requisitos': return ['Resuma este documento', 'Sugira critérios de aceite', 'Identifique requisitos faltantes'];
            case 'telas':      return ['Adicione um botão de voltar', 'Melhore o contraste dos textos', 'Deixe o layout responsivo'];
            case 'codigo':     return ['Explique este código', 'Gere testes unitários'];
            default:           return [];
        }
    }

    // ===================== Requisitos =====================
    selecionarDoc(d: Documento) {
        this.docSelecionado = d;
        this.docConteudo = d.conteudo;
        this.editandoDoc = false;
    }

    cancelarEdicaoDoc() {
        this.editandoDoc = false;
        if (this.docSelecionado) this.docConteudo = this.docSelecionado.conteudo;
    }

    salvarDoc() {
        if (this.docSelecionado) {
            this.docSelecionado.conteudo = this.docConteudo;
            this.docSelecionado.atualizadoEm = 'agora mesmo';
        }
        this.editandoDoc = false;
    }

    criarDoc() {
        const titulo = this.novoDocTitulo.trim();
        if (!titulo) return;
        const doc: Documento = {
            id: this.nextId++,
            titulo,
            conteudo: `# ${titulo}\n\nDescreva os requisitos aqui...\n`,
            criadoPor: 'Você',
            atualizadoEm: 'agora mesmo',
        };
        this.projeto.documentos.push(doc);
        this.selecionarDoc(doc);
        this.editandoDoc = true;
        this.novoDocModal = false;
        this.novoDocTitulo = '';
    }

    // ===================== Telas (canvas) =====================
    selecionarTela(t: Tela) {
        this.telaSelecionada = t;
        this.compSelecionado = null;
        if (!t.componentes) t.componentes = [];
    }

    selecionarComp(c: ComponenteTela, event: Event) {
        event.stopPropagation();
        this.compSelecionado = this.compSelecionado?.id === c.id ? null : c;
    }

    desselecionarComp() { this.compSelecionado = null; }

    adicionarComp(tipo: TipoComponente) {
        if (!this.telaSelecionada) return;
        const padrao: Record<TipoComponente, string> = {
            titulo: 'Novo título', texto: 'Novo texto', campo: 'Novo campo', botao: 'Novo botão',
            tabela: 'Coluna 1 | Coluna 2 | Coluna 3', checkbox: 'Nova opção',
        };
        const larguraPadrao: Partial<Record<TipoComponente, number>> = { botao: 16, checkbox: 20 };
        const comp: ComponenteTela = {
            id: this.proximoCompId++,
            tipo,
            texto: padrao[tipo],
            largura: larguraPadrao[tipo] ?? 100,
            ...(tipo === 'botao'  ? { variante: 'primario' as const } : {}),
            ...(tipo === 'tabela' ? { linhas: [['Dado 1', 'Dado 2', 'Dado 3'], ['Dado 1', 'Dado 2', 'Dado 3']] } : {}),
        };
        this.telaSelecionada.componentes!.push(comp);
        this.compSelecionado = comp;
    }

    removerComp(c: ComponenteTela) {
        if (!this.telaSelecionada?.componentes) return;
        this.telaSelecionada.componentes = this.telaSelecionada.componentes.filter(x => x.id !== c.id);
        if (this.compSelecionado?.id === c.id) this.compSelecionado = null;
    }

    moverComp(c: ComponenteTela, direcao: -1 | 1) {
        const lista = this.telaSelecionada?.componentes;
        if (!lista) return;
        const i = lista.indexOf(c);
        const j = i + direcao;
        if (j < 0 || j >= lista.length) return;
        [lista[i], lista[j]] = [lista[j], lista[i]];
    }

    colunasDe(c: ComponenteTela): string[] {
        return c.texto.split('|').map(s => s.trim()).filter(Boolean);
    }

    // Gera o HTML final da tela a partir dos componentes do canvas
    htmlDaTela(t: Tela): string {
        if (!t.componentes?.length) return t.html;
        const corpo = t.componentes.map(c => {
            const w = `width:${c.largura}%`;
            switch (c.tipo) {
                case 'tabela': {
                    const ths = this.colunasDe(c).map(col =>
                        `<th style="text-align:left;padding:14px 18px;font-size:13px;font-weight:600;color:#334155;background:#f8fafc;border-bottom:1px solid #e5e7eb;white-space:nowrap">${col} <span style="color:#94a3b8;font-size:11px">&#8645;</span></th>`).join('');
                    const thAcoes = `<th style="padding:14px 18px;font-size:13px;font-weight:600;color:#334155;background:#f8fafc;border-bottom:1px solid #e5e7eb;width:70px">Ações</th>`;
                    const trs = (c.linhas ?? []).map(linha => {
                        const tds = linha.map(celula => `<td style="padding:15px 18px;font-size:13px;color:#1e293b;border-bottom:1px solid #eef2f6;vertical-align:top;line-height:1.45">${celula}</td>`).join('');
                        const tdAcoes = `<td style="padding:15px 18px;border-bottom:1px solid #eef2f6;text-align:center"><span style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:7px;border:1px solid #a7f3d0;background:#ecfdf5;color:#10b981">&#9998;</span></td>`;
                        return `<tr>${tds}${tdAcoes}</tr>`;
                    }).join('');
                    const total = (c.linhas ?? []).length;
                    const seta = (s: string) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;color:#94a3b8;font-size:14px">${s}</span>`;
                    const num = (n: string, ativo: boolean) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:6px;font-size:12px;font-weight:600;${ativo ? 'background:#10b981;color:#fff' : 'color:#475569'}">${n}</span>`;
                    const pag = `<div style="display:flex;align-items:center;justify-content:center;gap:18px;padding:14px 18px;border-top:1px solid #eef2f6;font-size:13px;color:#64748b"><span>Mostrando <b style="color:#1e293b">1</b> a <b style="color:#1e293b">${total}</b> de <b style="color:#1e293b">${total}</b> registros</span><span style="display:inline-flex;align-items:center;gap:6px">${seta('&#171;')}${seta('&#8249;')}${num('1', true)}${num('2', false)}${num('3', false)}${seta('&#8250;')}${seta('&#187;')}<span style="display:inline-flex;align-items:center;gap:5px;margin-left:8px;padding:4px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:12px;color:#475569">05 &#9662;</span></span></div>`;
                    return `<div style="${w};background:#fff;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden"><table style="width:100%;border-collapse:collapse"><thead><tr>${ths}${thAcoes}</tr></thead><tbody>${trs}</tbody></table>${pag}</div>`;
                }
                case 'checkbox':
                    return `<label style="${w};display:flex;align-items:center;gap:9px;font-size:14px;color:#334155;padding-bottom:10px"><span style="width:19px;height:19px;border:1.5px solid #cbd5e1;border-radius:5px;background:#fff;flex-shrink:0"></span>${c.texto}</label>`;
                case 'titulo':
                    return `<h1 style="${w};font-size:26px;color:#1e293b;margin:0;font-weight:700;letter-spacing:-0.01em">${c.texto}</h1>`;
                case 'texto':
                    return `<p style="${w};font-size:14px;color:#64748b;margin:0;line-height:1.6">${c.texto}</p>`;
                case 'campo':
                    return `<div style="${w}"><label style="display:block;font-size:14px;font-weight:600;color:#334155;margin-bottom:7px">${c.texto}</label><input style="width:100%;border:1px solid #cbd5e1;border-radius:8px;padding:11px 14px;font-size:14px;box-sizing:border-box" placeholder="Digite aqui"/></div>`;
                case 'botao': {
                    const estilo = c.variante === 'secundario'
                        ? 'background:#eef2f1;color:#334155;border:1px solid #d7dedb'
                        : 'background:#10b981;color:#fff;border:none';
                    return `<button style="${w};${estilo};border-radius:8px;padding:11px 18px;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap">${c.texto}</button>`;
                }
            }
        }).join('\n');
        return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${t.nome}</title></head><body style="margin:0;font-family:sans-serif;background:#f1f5f9;min-height:100vh;padding:32px;box-sizing:border-box"><div style="max-width:1280px;margin:0 auto;display:flex;flex-wrap:wrap;gap:16px 2%;align-items:flex-end">${corpo}</div></body></html>`;
    }

    abrirPreviewNovaAba(t: Tela) {
        const w = window.open('', '_blank');
        if (w) { w.document.write(this.htmlDaTela(t)); w.document.close(); }
    }

    aprovarTela(t: Tela)  { t.status = 'aprovada'; }
    reprovarTela(t: Tela) { t.status = 'reprovada'; }

    criarTela() {
        const nome = this.novaTelaNome.trim();
        if (!nome) return;
        const tela: Tela = {
            id: this.nextId++,
            nome,
            status: 'pendente',
            criadoPor: 'Você',
            html: '',
            componentes: [
                { id: this.proximoCompId++, tipo: 'titulo', texto: nome, largura: 100 },
            ],
        };
        this.projeto.telas.push(tela);
        this.selecionarTela(tela);
        this.novaTelaModal = false;
        this.novaTelaNome = '';
    }

    // ===================== Código =====================
    get telasAprovadas(): Tela[] {
        return this.projeto.telas.filter(t => t.status === 'aprovada');
    }

    get codigoFrontend(): string {
        const aprovadas = this.telasAprovadas;
        if (!aprovadas.length) return '<!-- Nenhuma tela aprovada ainda. Aprove uma tela na aba "Telas" para gerar o código. -->';
        return aprovadas.map(t => `<!-- Tela: ${t.nome} -->\n${this.htmlDaTela(t)}`).join('\n\n');
    }

    get codigoBackend(): string {
        return `// Endpoints gerados a partir das telas aprovadas do projeto "${this.projeto.nome}"
const express = require('express');
const router  = express.Router();

router.get('/api/dados', async (req, res) => {
  try {
    const dados = await DadosService.listar(req.query);
    res.json({ sucesso: true, dados });
  } catch (err) {
    res.status(500).json({ sucesso: false, erro: err.message });
  }
});

router.post('/api/dados', async (req, res) => {
  const novo = await DadosService.criar(req.body);
  res.status(201).json({ sucesso: true, dados: novo });
});

module.exports = router;`;
    }

    get codigoJson(): string {
        return JSON.stringify({
            projeto:  this.projeto.nome,
            tipo:     this.projeto.tipo,
            telas:    this.projeto.telas.map(t => ({ id: t.id, nome: t.nome, status: t.status })),
            membros:  this.projeto.membros.map(m => ({ nome: m.nome, papel: m.papel })),
            ultimaPublicacao: this.projeto.ultimaPublicacao,
        }, null, 2);
    }

    get codigoAtual(): string {
        switch (this.codigoAba()) {
            case 'frontend': return this.codigoFrontend;
            case 'backend':  return this.codigoBackend;
            default:         return this.codigoJson;
        }
    }

    copiarCodigo() {
        navigator.clipboard.writeText(this.codigoAtual).then(() => {
            this.copiado.set(true);
            setTimeout(() => this.copiado.set(false), 2000);
        });
    }

    // ===================== Membros =====================
    corPapelDe(p: Papel) { return COR_PAPEL[p]; }
    bgPapelDe(p: Papel)  { return BG_PAPEL[p]; }

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
        this.projeto.membros.push({
            id: this.nextId++,
            nome:   nome.trim(),
            email:  email.trim(),
            papel,
            avatar: iniciais(nome),
        });
        this.addMembroModal = false;
    }

    removerMembro(id: number) {
        this.projeto.membros = this.projeto.membros.filter(m => m.id !== id);
    }

    // ===================== Helpers =====================
    private respostaMock(): string {
        const ctx = this.aba() === 'telas' ? 'design da tela' : this.aba() === 'codigo' ? 'código' : 'documento';
        const respostas = [
            `Entendido! Apliquei a sugestão ao ${ctx}. Confira o resultado ao lado e me diga se precisa de mais ajustes.`,
            `Ótima ideia — incorporei isso ao ${ctx}. Quer que eu detalhe mais algum ponto?`,
            `Feito! O ${ctx} foi atualizado com a sua solicitação.`,
            `Anotado. Considerei isso no contexto do ${ctx} — pode continuar detalhando.`,
        ];
        return respostas[Math.floor(Math.random() * respostas.length)];
    }
}
