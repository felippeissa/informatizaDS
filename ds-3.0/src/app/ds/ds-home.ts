import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { contarItens } from '@/app/layout/component/ds-menu';

const FIGMA = 'https://www.figma.com/design/oBPMZCbXjlFLs1qZ11ofD8/Informatiza-3.0?node-id=8594-22240';
const GITHUB = 'https://github.com/felippeissa/informatizaDS';
const LLMS = 'https://felippeissa.github.io/informatizaDS/llms.txt';

interface Atalho { titulo: string; desc: string; icon: string; rota?: string; url?: string; acao: string; }
interface Secao { titulo: string; desc: string; icon: string; rota: string; total: string; links: { label: string; rota: string }[]; }

/**
 * VISÃO GERAL — página inicial do Informatiza Design System 3.0.
 * Estilos globais em src/assets/ds/_home.scss (prefixo .home-*).
 */
@Component({
    selector: 'app-ds-home',
    standalone: true,
    imports: [RouterModule, ButtonModule],
    template: `
    <div class="home">

        <!-- ═══════════ HERO ═══════════ -->
        <section class="home-hero">
            <div class="home-hero-texto">
                <span class="home-selo"><i class="pi pi-verified"></i> Versão 3.0 · Governo do Estado de Goiás</span>
                <h1 class="home-titulo">Informatiza <span>Design System</span></h1>
                <p class="home-subtitulo">
                    Padrões de UX, fundamentos visuais e componentes para construir sistemas públicos
                    consistentes, acessíveis e fáceis de usar — do protótipo no Figma ao código em Angular.
                </p>
                <div class="home-ctas">
                    <p-button label="Começar a usar" (onClick)="ir('/ds/padroes')" />
                    <p-button label="Ver componentes" [outlined]="true" (onClick)="ir('/ds/uikit/button')" />
                    <p-button label="Abrir no Figma" icon="pi pi-external-link" [text]="true" (onClick)="abrir(figma)" />
                </div>
            </div>

            <!-- Logo animada: as 4 peças chegam voando e se encaixam. Clique para repetir. -->
            <div class="home-logo-palco">
                @for (c of [ciclo()]; track c) {
                    <button type="button" class="home-logo-botao" (click)="repetirAnimacao()" aria-label="Repetir animação da logo">
                        <span class="home-logo-sombra" aria-hidden="true"></span>
                        <svg class="home-logo-svg" viewBox="0 0 218 228" aria-hidden="true">
                            <g class="home-logo-flutua">
                                <rect class="home-logo-peca home-logo-peca--1" x="8" y="20" width="96" height="88" rx="18" fill="#10B981" />
                                <rect class="home-logo-peca home-logo-peca--2" x="114" y="8" width="96" height="100" rx="18" fill="#059669" />
                                <path class="home-logo-peca home-logo-peca--3" d="M26 118H86Q104 118 104 136V213Q104 222 94 219C38 206 8 188 8 163V136Q8 118 26 118Z" fill="#059669" />
                                <path class="home-logo-peca home-logo-peca--4" d="M132 118H192Q210 118 210 136V163C210 188 180 206 124 219Q114 222 114 213V136Q114 118 132 118Z" fill="#10B981" />
                            </g>
                        </svg>
                    </button>
                }
            </div>
        </section>

        <!-- ═══════════ NÚMEROS ═══════════ -->
        <section class="home-numeros" aria-label="O Design System em números">
            @for (n of numeros; track n.label) {
                <a class="home-numero" [routerLink]="n.rota">
                    <strong>{{ n.valor }}</strong>
                    <span>{{ n.label }}</span>
                </a>
            }
        </section>

        <!-- ═══════════ POR ONDE COMEÇAR ═══════════ -->
        <section class="home-secao">
            <div class="home-secao-cab">
                <h2>Por onde começar</h2>
                <p>Escolha o seu papel no projeto e siga o caminho recomendado.</p>
            </div>
            <div class="home-grade home-grade--4">
                @for (a of atalhos; track a.titulo) {
                    <button type="button" class="home-atalho" (click)="a.rota ? ir(a.rota) : abrir(a.url!)">
                        <span class="home-icone"><i [class]="a.icon"></i></span>
                        <strong>{{ a.titulo }}</strong>
                        <span class="home-atalho-desc">{{ a.desc }}</span>
                        <span class="home-link">{{ a.acao }} <i class="pi" [class.pi-arrow-right]="!!a.rota" [class.pi-external-link]="!a.rota"></i></span>
                    </button>
                }
            </div>
        </section>

        <!-- ═══════════ EXPLORE ═══════════ -->
        <section class="home-secao">
            <div class="home-secao-cab">
                <h2>Explore o Design System</h2>
                <p>Do comportamento esperado das telas até cada componente, tudo em um só lugar.</p>
            </div>
            <div class="home-grade home-grade--2">
                @for (s of secoes; track s.titulo) {
                    <div class="home-explorar">
                        <div class="home-explorar-topo">
                            <span class="home-icone home-icone--grande"><i [class]="s.icon"></i></span>
                            <div>
                                <a class="home-explorar-titulo" [routerLink]="s.rota">{{ s.titulo }}</a>
                                <span class="home-explorar-total">{{ s.total }}</span>
                            </div>
                        </div>
                        <p>{{ s.desc }}</p>
                        <div class="home-chips">
                            @for (l of s.links; track l.label) {
                                <a class="home-chip" [routerLink]="l.rota">{{ l.label }}</a>
                            }
                        </div>
                    </div>
                }
            </div>
        </section>

        <!-- ═══════════ PRINCÍPIOS ═══════════ -->
        <section class="home-secao">
            <div class="home-secao-cab">
                <h2>Princípios</h2>
                <p>Do guia de padrões da GESIS: o que orienta cada decisão nos sistemas do Informatiza.</p>
            </div>
            <div class="home-grade home-grade--4">
                @for (p of principios; track p.titulo) {
                    <div class="home-principio">
                        <span class="home-icone"><i [class]="p.icon"></i></span>
                        <strong>{{ p.titulo }}</strong>
                        <p>{{ p.texto }}</p>
                    </div>
                }
            </div>
        </section>

        <!-- ═══════════ NOVIDADES + COMO INICIAR ═══════════ -->
        <section class="home-grade home-grade--2 home-secao">
            <div class="home-bloco">
                <h2 class="home-bloco-titulo"><i class="pi pi-sparkles"></i> Novidades</h2>
                <ul class="home-novidades">
                    @for (n of novidades; track n.titulo) {
                        <li>
                            <span class="home-novidade-data">{{ n.data }}</span>
                            <div>
                                <a [routerLink]="n.rota"><strong>{{ n.titulo }}</strong></a>
                                <p>{{ n.texto }}</p>
                            </div>
                        </li>
                    }
                </ul>
            </div>

            <div class="home-bloco">
                <h2 class="home-bloco-titulo"><i class="pi pi-code"></i> Como iniciar</h2>
                <ol class="home-passos">
                    <li>
                        <strong>Clone o repositório</strong>
                        <code class="home-codigo">git clone https://github.com/felippeissa/informatizaDS.git</code>
                    </li>
                    <li>
                        <strong>Instale as dependências</strong>
                        <code class="home-codigo">cd informatizaDS/ds-3.0 && npm install</code>
                    </li>
                    <li>
                        <strong>Rode localmente</strong>
                        <code class="home-codigo">npm start</code>
                        <span class="home-passo-dica">Abre em http://localhost:4200. Pré-requisitos: Node.js 22+ e npm 10+.</span>
                    </li>
                </ol>
                <div class="home-bloco-acoes">
                    <p-button label="Ver no GitHub" icon="pi pi-github" [text]="true" (onClick)="abrir(github)" />
                </div>
            </div>
        </section>

        <!-- ═══════════ IA ═══════════ -->
        <section class="home-ia">
            <span class="home-icone home-icone--grande"><i class="pi pi-microchip-ai"></i></span>
            <div class="home-ia-texto">
                <strong>Pronto para agentes de IA</strong>
                <p>Cursor, Copilot, Claude e outras IAs leem as regras do DS em <code>AGENTS.md</code> e pela web em <code>llms.txt</code>, com tokens em formato W3C.</p>
            </div>
            <p-button label="Abrir llms.txt" icon="pi pi-external-link" [text]="true" (onClick)="abrir(llms)" />
        </section>
    </div>
    `
})
export class DsHome {
    private router = inject(Router);

    figma = FIGMA;
    github = GITHUB;
    llms = LLMS;

    ciclo = signal(0);

    // Calculados a partir do menu (ds-menu.ts): nunca ficam desatualizados
    numeros = [
        { valor: String(contarItens('Átomos', 'Moléculas', 'Organismos')), label: 'componentes', rota: '/ds/uikit/button' },
        { valor: String(contarItens('Padrões de UX')), label: 'padrões de UX', rota: '/ds/padroes' },
        { valor: String(contarItens('Foundations')), label: 'foundations', rota: '/ds/foundations' },
        { valor: String(contarItens('Templates')), label: 'templates de tela', rota: '/ds/templates' },
    ];

    atalhos: Atalho[] = [
        { titulo: 'Design', icon: 'pi pi-palette', desc: 'Biblioteca de componentes, templates e protótipos navegáveis no Figma.', url: FIGMA, acao: 'Abrir no Figma' },
        { titulo: 'Desenvolvimento', icon: 'pi pi-code', desc: 'Componentes Angular + PrimeNG prontos, com exemplos e código para copiar.', rota: '/ds/uikit/button', acao: 'Ver componentes' },
        { titulo: 'Análise e QA', icon: 'pi pi-check-square', desc: 'Regras de comportamento de filtros, tabelas, formulários e mensagens.', rota: '/ds/padroes', acao: 'Ler os padrões de UX' },
        { titulo: 'Agentes de IA', icon: 'pi pi-microchip-ai', desc: 'Regras e tokens legíveis por IA para gerar telas já no padrão.', url: LLMS, acao: 'Abrir llms.txt' },
    ];

    secoes: Secao[] = [
        {
            titulo: 'Padrões de UX', icon: 'pi pi-book', rota: '/ds/padroes', total: `${contarItens('Padrões de UX')} guias`,
            desc: 'Como as telas devem se comportar: navegação, feedback, inputs, botões, filtros, tabelas e formulários (time de UX da GESIS).',
            links: [
                { label: 'Layout e navegação', rota: '/ds/padroes/layout' }, { label: 'Feedback', rota: '/ds/padroes/feedback' },
                { label: 'Inputs', rota: '/ds/padroes/inputs' }, { label: 'Botões', rota: '/ds/padroes/botoes' },
                { label: 'Filtros', rota: '/ds/padroes/filtros' }, { label: 'Tabelas', rota: '/ds/padroes/tabelas' },
                { label: 'Formulários', rota: '/ds/padroes/formularios' },
            ]
        },
        {
            titulo: 'Foundations', icon: 'pi pi-palette', rota: '/ds/foundations', total: `${contarItens('Foundations')} fundamentos`,
            desc: 'A base visual de tudo: paleta de cores, tipografia, espaçamento, bordas e elevação, ícones e grid.',
            links: [
                { label: 'Cores', rota: '/ds/foundations/cores' }, { label: 'Tipografia', rota: '/ds/foundations/tipografia' },
                { label: 'Espaçamento', rota: '/ds/foundations/espacamento' }, { label: 'Bordas e elevação', rota: '/ds/foundations/bordas' },
                { label: 'Ícones', rota: '/ds/foundations/icones' }, { label: 'Grid e layout', rota: '/ds/foundations/grid' },
            ]
        },
        {
            titulo: 'Componentes', icon: 'pi pi-th-large', rota: '/ds/uikit/button', total: `${contarItens('Átomos', 'Moléculas', 'Organismos')} componentes`,
            desc: 'Átomos, moléculas e organismos do PrimeNG 21 com o tema do Informatiza, exemplos ao vivo e código.',
            links: [
                { label: 'Button', rota: '/ds/uikit/button' }, { label: 'InputText', rota: '/ds/uikit/inputtext' },
                { label: 'Select', rota: '/ds/uikit/select' }, { label: 'DatePicker', rota: '/ds/uikit/datepicker' },
                { label: 'DataTable', rota: '/ds/uikit/datatable' }, { label: 'Dialog', rota: '/ds/uikit/dialog' },
                { label: 'Toast', rota: '/ds/uikit/toast' }, { label: 'Tabs', rota: '/ds/uikit/tabs' },
            ]
        },
        {
            titulo: 'Templates de tela', icon: 'pi pi-objects-column', rota: '/ds/templates', total: `${contarItens('Templates')} modelos`,
            desc: 'Pontos de partida prontos para as telas mais comuns dos sistemas. Copie e adapte.',
            links: [
                { label: 'Lista com filtros', rota: '/ds/templates/lista' }, { label: 'Cadastro', rota: '/ds/templates/formulario' },
                { label: 'Visualização', rota: '/ds/templates/detalhe' }, { label: 'Painel de indicadores', rota: '/ds/templates/dashboard' },
                { label: 'Sistema com MegaMenu', rota: '/sistema-megamenu' },
            ]
        },
    ];

    /** Princípios tirados do guia de padrões da GESIS (introdução e diretrizes gerais de escrita). */
    principios = [
        { titulo: 'Consistência', icon: 'pi pi-sync', texto: 'O mesmo visual e o mesmo comportamento em todos os sistemas do Informatiza, do Figma ao código.' },
        { titulo: 'Previsibilidade', icon: 'pi pi-compass', texto: 'Botões, filtros e mensagens sempre no mesmo lugar e com os mesmos nomes: o usuário sabe o que vai acontecer.' },
        { titulo: 'Qualidade', icon: 'pi pi-verified', texto: 'Padrões construídos a partir das dúvidas reais dos projetos, revisados pelo time de UX da GESIS.' },
        { titulo: 'Linguagem clara', icon: 'pi pi-comment', texto: 'Simples, objetiva e em voz ativa, sem termos técnicos. Mensagens de erro dizem como corrigir.' },
    ];

    novidades = [
        { data: '26/11/2026', titulo: 'Padrões de UX', texto: 'Regras do time de UX da GESIS documentadas com exemplos ao vivo.', rota: '/ds/padroes' },
        { data: '26/11/2026', titulo: 'Foundations', texto: 'Cores, tipografia, espaçamento, bordas, ícones e grid.', rota: '/ds/foundations' },
        { data: '26/11/2026', titulo: 'Interface em português', texto: 'Calendário, mensagens e filtros dos componentes traduzidos.', rota: '/ds/uikit/datepicker' },
        { data: '26/11/2026', titulo: 'Guias para IA', texto: 'AGENTS.md, tokens W3C e llms.txt publicados.', rota: '/ds/foundations/cores' },
    ];

    ir(rota: string) { this.router.navigateByUrl(rota); }

    abrir(url: string) { window.open(url, '_blank', 'noopener'); }

    /** Recria o SVG da logo para tocar a animação de novo. */
    repetirAnimacao() { this.ciclo.update((v) => v + 1); }
}
