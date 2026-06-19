import { AfterViewChecked, Component, ElementRef, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';

interface Msg { autor: 'user' | 'ia'; texto: string; sistema?: string; modelo?: string; }
interface Conversa { id: number; titulo: string; msgs: Msg[]; }

@Component({
    selector: 'app-godev-manual',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, SelectModule, TooltipModule],
    templateUrl: './godev-manual.html',
    styleUrl:    './godev-manual.scss',
})
export class GodevManual implements AfterViewChecked {
    sistemas = [
        { label: 'Todos os sistemas', value: 'Todos os sistemas' },
        { label: 'SISLOG',           value: 'SISLOG' },
        { label: 'SIAFIC',           value: 'SIAFIC' },
        { label: 'Portal Goiás',     value: 'Portal Goiás' },
    ];
    modelos = [
        { label: 'Automático',  value: 'Automático' },
        { label: 'Lhama',       value: 'Lhama' },
        { label: 'Gemini 3',    value: 'Gemini 3' },
        { label: 'Claude Code', value: 'Claude Code' },
    ];

    sugestoes = [
        'Como consultar o saldo orçamentário no SIAFIC?',
        'Como rastrear uma entrega no SISLOG?',
        'Quais serviços estão disponíveis no Portal Goiás?',
        'Como incluir um IPOF?',
    ];

    conversas = signal<Conversa[]>([
        {
            id: 1, titulo: 'Como consultar o saldo orçamentário?',
            msgs: [
                { autor: 'user', texto: 'Como consultar o saldo orçamentário no SIAFIC?' },
                { autor: 'ia', sistema: 'SIAFIC', modelo: 'Gemini 3',
                  texto: 'Identifiquei que sua pergunta é sobre o SIAFIC.\n\nNo SIAFIC, acesse Planejamento e execução orçamentária → IPOF → Manutenção de saldo orçamentário. Informe o Exercício (obrigatório) e use os filtros de Unidade, Ação, Grupo de despesa e Fonte de recurso.' },
            ],
        },
        {
            id: 2, titulo: 'Rastreamento de entrega no SISLOG',
            msgs: [
                { autor: 'user', texto: 'Como rastrear uma entrega no SISLOG?' },
                { autor: 'ia', sistema: 'SISLOG', modelo: 'Claude Code',
                  texto: 'Identifiquei que sua pergunta é sobre o SISLOG.\n\nO rastreamento fica em Operações → Entregas. Busque pelo número do romaneio ou da carga para acompanhar o status em tempo real.' },
            ],
        },
        {
            id: 3, titulo: 'Serviços do Portal Goiás',
            msgs: [
                { autor: 'user', texto: 'Quais serviços estão disponíveis no Portal Goiás?' },
                { autor: 'ia', sistema: 'Portal Goiás', modelo: 'Lhama',
                  texto: 'Identifiquei que sua pergunta é sobre o Portal Goiás.\n\nApós login com gov.br ou ID Goiás, é possível buscar serviços por nome, categoria ou órgão e abrir solicitações com anexo de documentos.' },
            ],
        },
    ]);
    conversaAtivaId = signal<number | null>(null);
    busca = signal('');
    input = '';
    sistemaSel = signal('Todos os sistemas');
    modeloSel  = signal('Automático');
    digitando  = signal(false);

    private nextId = 4;
    private deveRolar = false;

    @ViewChild('scrollArea') private scrollArea?: ElementRef<HTMLElement>;

    get conversaAtiva(): Conversa | null {
        return this.conversas().find(c => c.id === this.conversaAtivaId()) ?? null;
    }

    get mensagens(): Msg[] { return this.conversaAtiva?.msgs ?? []; }

    get conversasFiltradas(): Conversa[] {
        const t = this.busca().trim().toLowerCase();
        const lista = this.conversas();
        if (!t) return lista;
        return lista.filter(c => c.titulo.toLowerCase().includes(t));
    }

    ngAfterViewChecked() {
        if (!this.deveRolar || !this.scrollArea) return;
        this.deveRolar = false;
        const el = this.scrollArea.nativeElement;
        el.scrollTop = el.scrollHeight;
    }

    novoChat() {
        this.conversaAtivaId.set(null);
        this.input = '';
    }

    selecionarConversa(c: Conversa) {
        this.conversaAtivaId.set(c.id);
        this.deveRolar = true;
    }

    usarSugestao(s: string) {
        this.input = s;
        this.enviar();
    }

    enviar() {
        const texto = this.input.trim();
        if (!texto || this.digitando()) return;

        // Cria conversa se ainda não houver uma ativa
        let conversa = this.conversaAtiva;
        if (!conversa) {
            conversa = { id: this.nextId++, titulo: this.resumo(texto), msgs: [] };
            this.conversas.update(l => [conversa!, ...l]);
            this.conversaAtivaId.set(conversa.id);
        }

        const sistema = this.identificarSistema(texto);
        conversa.msgs.push({ autor: 'user', texto });
        this.input = '';
        this.digitando.set(true);
        this.deveRolar = true;

        setTimeout(() => {
            conversa!.msgs.push({
                autor: 'ia',
                texto: this.respostaMock(texto, sistema),
                sistema,
                modelo: this.modeloEfetivo(),
            });
            this.digitando.set(false);
            this.deveRolar = true;
        }, 1300);
    }

    // ===================== Helpers / mock =====================
    private resumo(texto: string) {
        return texto.length > 40 ? texto.slice(0, 40) + '…' : texto;
    }

    private modeloEfetivo() {
        return this.modeloSel() === 'Automático' ? 'Gemini 3' : this.modeloSel();
    }

    // Identifica o sistema pela seleção ou por palavras-chave da pergunta
    private identificarSistema(texto: string): string {
        if (this.sistemaSel() !== 'Todos os sistemas') return this.sistemaSel();
        const t = texto.toLowerCase();
        if (/saldo|or[çc]ament|ipof|empenho|daof|despesa|dota[çc]|fonte de recurso/.test(t)) return 'SIAFIC';
        if (/log|rastre|entrega|transporte|carga|frota|romaneio/.test(t)) return 'SISLOG';
        if (/portal|cidad|servi[çc]o|atendimento|certid|iptu|ipva/.test(t)) return 'Portal Goiás';
        return 'SIAFIC';
    }

    private respostaMock(pergunta: string, sistema: string): string {
        const conteudo: Record<string, string> = {
            SIAFIC: 'No SIAFIC, acesse Planejamento e execução orçamentária → IPOF → Manutenção de saldo orçamentário. Informe o Exercício (obrigatório) e use os filtros de Unidade, Ação, Grupo de despesa e Fonte de recurso. O saldo é exibido por linha, com ação de editar.',
            SISLOG: 'No SISLOG, o rastreamento fica em Operações → Entregas. Busque pelo número do romaneio ou da carga para acompanhar o status em tempo real e o histórico de movimentações da frota.',
            'Portal Goiás': 'No Portal Goiás, os serviços ao cidadão ficam na página inicial após login com gov.br ou ID Goiás. É possível buscar por nome, categoria ou órgão e abrir solicitações com anexo de documentos.',
        };
        const base = conteudo[sistema] ?? conteudo['SIAFIC'];
        return `Identifiquei que sua pergunta é sobre o **${sistema}**.\n\n${base}\n\nSe precisar, posso detalhar o passo a passo ou indicar a tela exata.`;
    }
}
