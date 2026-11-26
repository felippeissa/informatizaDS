import { Component, computed, effect, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MM_MENU, MmNo, paraMenuItem } from './mm-dados';
import { buscarNoMenu, indexarMenu } from '@/app/layout/component/menu-busca';

const CHAVE_FAVORITOS = 'informatiza-ds:sigo:favoritos';

/**
 * EXEMPLO — Sistema com MegaMenu (padrão GESIS, item 2.3 e 2.4).
 * - Só para sistemas com 3+ níveis. Sem versão fechada: o ☰ esconde o menu por inteiro.
 * - Item de 1º nível (ícone único + angle-right) abre o MegaMenu Overlay: colunas (2º nível) com
 *   subitens (3º); subitem com seta abre o TieredMenu híbrido (4º nível).
 * - Overlay: até 1636px (tela 1920), 826 (1280), 556 (1024), 286 (768); se houver poucos itens, ajusta ao conteúdo.
 * - Busca no header (obrigatória com MegaMenu): dialog de 700px, "Recentes" (2 últimas), estrela para favoritar.
 * - Favoritos (obrigatório): item fixo no topo, por usuário, mais recente primeiro, sem limite.
 * - Abaixo de 768px: menu mobile sequencial em tela cheia.
 * Estilos em src/assets/ds/_megamenu.scss (prefixo .mm-).
 */
@Component({
    selector: 'app-sistema-megamenu',
    standalone: true,
    imports: [RouterModule, NgTemplateOutlet, ButtonModule, DialogModule, AvatarModule, TooltipModule, ConfirmDialogModule],
    providers: [ConfirmationService],
    template: `
    <div class="mm-app" [class.mm-app--sem-menu]="!menuAberto() && !mobile()">

        <!-- ═════════ HEADER ═════════ -->
        <header class="mm-header">
            <button type="button" class="mm-icone-btn" (click)="alternarMenu()" [attr.aria-expanded]="mobile() ? mobileAberto() : menuAberto()"
                    aria-label="Abrir ou fechar o menu"><i class="pi pi-bars"></i></button>
            <span class="mm-marca"><img src="assets/logo-informatiza-ds-simbolo.svg" alt="" /><strong>SIGO</strong></span>
            <span class="mm-espaco"></span>
            <button type="button" class="mm-icone-btn" (click)="abrirBusca()" aria-label="Buscar funcionalidade" pTooltip="Buscar funcionalidade" tooltipPosition="bottom">
                <i class="pi pi-search"></i>
            </button>
            <span class="mm-usuario"><p-avatar label="AS" shape="circle" styleClass="mm-avatar" /><span class="mm-usuario-nome">Ana Souza</span></span>
            <button type="button" class="mm-icone-btn" (click)="sair()" aria-label="Sair do sistema" pTooltip="Sair" tooltipPosition="bottom">
                <i class="pi pi-sign-out"></i>
            </button>
        </header>

        <!-- ═════════ MEGAMENU (≥ 768px) ═════════ -->
        @if (!mobile() && menuAberto()) {
            <nav class="mm-menu" aria-label="Menu principal">
                <button type="button" class="mm-item" [class.mm-item--ativo]="raiz() === 'favoritos'"
                        (click)="abrirRaiz('favoritos', $event)" [attr.aria-expanded]="raiz() === 'favoritos'">
                    <i class="pi pi-star mm-item-icone"></i><span class="mm-item-texto">Favoritos</span><i class="pi pi-angle-right mm-item-seta"></i>
                </button>
                <span class="mm-divisor" aria-hidden="true"></span>
                @for (n of menu; track n.label) {
                    <button type="button" class="mm-item" [class.mm-item--ativo]="raiz() === n" [class.mm-item--atual]="atual().startsWith(n.label + ' ›')"
                            (click)="abrirRaiz(n, $event)" [attr.aria-expanded]="raiz() === n">
                        <i [class]="n.icon + ' mm-item-icone'"></i><span class="mm-item-texto">{{ n.label }}</span><i class="pi pi-angle-right mm-item-seta"></i>
                    </button>
                }
            </nav>

            <!-- Overlay -->
            @if (raiz()) {
                <div class="mm-overlay" #overlay role="dialog" [attr.aria-label]="raiz() === 'favoritos' ? 'Favoritos' : $any(raiz()).label">
                    @if (raiz() === 'favoritos') {
                        <div class="mm-favoritos">
                            <h2 class="mm-col-titulo">Favoritos</h2>
                            @for (c of favoritos(); track c) {
                                <div class="mm-fav-item">
                                    <button type="button" class="mm-estrela mm-estrela--on" (click)="alternarFavorito(c)" aria-label="Remover dos favoritos"><i class="pi pi-star-fill"></i></button>
                                    <button type="button" class="mm-fav-link" (click)="selecionar(c)">
                                        <span class="mm-fav-titulo">{{ titulo(c) }}</span>
                                        <span class="mm-fav-caminho">{{ caminhoPai(c) }}</span>
                                    </button>
                                </div>
                            } @empty {
                                <p class="mm-vazio"><i class="pi pi-info-circle"></i> Nenhum favorito ainda. Use a <strong>busca</strong> (lupa no topo) e marque a estrela das funcionalidades que você mais usa.</p>
                            }
                        </div>
                    } @else {
                        <div class="mm-colunas" [class.mm-colunas--titulo-longo]="tituloLongo()">
                            @for (col of $any(raiz()).itens; track col.label) {
                                <div class="mm-coluna">
                                    <h2 class="mm-col-titulo">{{ col.label }}</h2>
                                    <ul class="mm-lista">
                                        @for (sub of col.itens; track sub.label) {
                                            <ng-container *ngTemplateOutlet="itemTpl; context: { $implicit: sub, caminho: $any(raiz()).label + ' › ' + col.label, nivel: 3 }" />
                                        }
                                    </ul>
                                </div>
                            }
                        </div>
                    }
                </div>
            }
        }

        <!-- Item do overlay (recursivo): folha seleciona; com filhos abre o TieredMenu híbrido -->
        <ng-template #itemTpl let-no let-caminho="caminho" let-nivel="nivel">
            <li class="mm-sub" [class.mm-sub--aberto]="tieredAberto(caminho + ' › ' + no.label)">
                @if (no.itens?.length) {
                    <button type="button" class="mm-sub-btn" (click)="alternarTiered(caminho + ' › ' + no.label, nivel, $event)"
                            [attr.aria-expanded]="tieredAberto(caminho + ' › ' + no.label)">
                        <span>{{ no.label }}</span><i class="pi pi-angle-right"></i>
                    </button>
                    @if (tieredAberto(caminho + ' › ' + no.label)) {
                        <ul class="mm-tiered" [class.mm-tiered--esquerda]="paraEsquerda().includes(caminho + ' › ' + no.label)">
                            @for (f of no.itens; track f.label) {
                                <ng-container *ngTemplateOutlet="itemTpl; context: { $implicit: f, caminho: caminho + ' › ' + no.label, nivel: nivel + 1 }" />
                            }
                        </ul>
                    }
                } @else {
                    <button type="button" class="mm-sub-btn" [class.mm-sub-btn--atual]="atual() === caminho + ' › ' + no.label"
                            (click)="selecionar(caminho + ' › ' + no.label)">
                        <span>{{ no.label }}</span>
                    </button>
                }
            </li>
        </ng-template>

        <!-- ═════════ MENU MOBILE (< 768px) ═════════ -->
        @if (mobile() && mobileAberto()) {
            <nav class="mm-mobile" aria-label="Menu principal">
                @if (pilha().length) {
                    <button type="button" class="mm-mobile-item mm-mobile-item--voltar" (click)="voltarMobile()">
                        <i class="pi pi-angle-left"></i><span>{{ pilha()[pilha().length - 1].label }}</span>
                    </button>
                }
                @for (n of nivelMobile(); track n.label) {
                    <button type="button" class="mm-mobile-item" (click)="tocarMobile(n)">
                        @if (n.icon) { <i [class]="n.icon + ' mm-item-icone'"></i> }
                        <span>{{ n.label }}</span>
                        @if (n.itens?.length) { <i class="pi pi-angle-right mm-item-seta"></i> }
                    </button>
                }
            </nav>
        }

        <!-- ═════════ CONTEÚDO ═════════ -->
        <main class="mm-conteudo">
            <div class="ds-page">
                <div class="mm-aviso">
                    <i class="pi pi-info-circle"></i>
                    <span>Exemplo de <strong>sistema com MegaMenu</strong> (padrão GESIS para 3+ níveis). Navegação e dados fictícios.</span>
                    <a routerLink="/ds/padroes/layout" class="mm-aviso-link">Voltar ao Design System</a>
                </div>

                @if (atual()) {
                    <div class="ds-page-header">
                        <div>
                            <div class="mm-breadcrumb">{{ caminhoPai(atual()) }}</div>
                            <h1 class="ds-page-title">{{ titulo(atual()) }}</h1>
                        </div>
                        <p-button [label]="ehFavorito(atual()) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
                                  [icon]="ehFavorito(atual()) ? 'pi pi-star-fill' : 'pi pi-star'" [text]="true" (onClick)="alternarFavorito(atual())" />
                    </div>
                    <div class="ds-card">
                        <p style="margin: 0; color: var(--text-color-secondary);">Tela de exemplo. Aqui entraria um dos templates do DS (Lista com filtros, Cadastro, Visualização…).</p>
                    </div>
                } @else {
                    <div class="ds-page-header"><h1 class="ds-page-title">Página inicial</h1></div>
                    <div class="ds-card">
                        <h2 class="ds-card-titulo"><i class="pi pi-compass"></i> Como navegar</h2>
                        <ul style="margin: 0; padding-left: 1.25rem; line-height: 1.8;">
                            <li>Clique em um item do menu à esquerda para abrir o painel com as funcionalidades.</li>
                            <li>Itens com <i class="pi pi-angle-right"></i> abrem mais um nível (TieredMenu híbrido).</li>
                            <li>Use a <strong>lupa</strong> no topo para buscar qualquer funcionalidade e marque a <i class="pi pi-star"></i> para favoritar.</li>
                            <li>O <strong>☰</strong> esconde o menu por inteiro. Em telas menores que 768px, o menu vira navegação em tela cheia.</li>
                        </ul>
                    </div>
                }
            </div>
        </main>
    </div>

    <!-- ═════════ BUSCA (dialog long content 700px) ═════════ -->
    <p-dialog [(visible)]="buscaVisivel" [modal]="true" styleClass="ds-dialog-longo mm-busca-dialog" [showHeader]="false" [dismissableMask]="true"
              (onShow)="focarBusca()" (onHide)="termo.set('')">
        <div class="mm-busca-campo">
            <i class="pi pi-search"></i>
            <input #campoBusca type="search" placeholder="Buscar funcionalidade" aria-label="Buscar funcionalidade"
                   [value]="termo()" (input)="termo.set($any($event.target).value)" (keydown.enter)="abrirPrimeiro()" />
            <button type="button" class="mm-icone-btn" (click)="buscaVisivel = false" aria-label="Fechar busca"><i class="pi pi-times"></i></button>
        </div>

        @if (!termo().trim()) {
            <h3 class="mm-busca-secao">Recentes</h3>
            @for (c of recentes(); track c) {
                <ng-container *ngTemplateOutlet="resultadoTpl; context: { $implicit: c }" />
            } @empty {
                <p class="mm-vazio">As duas últimas funcionalidades acessadas nesta sessão aparecem aqui.</p>
            }
        } @else {
            <h3 class="mm-busca-secao">Resultados</h3>
            @for (r of resultados(); track r) {
                <ng-container *ngTemplateOutlet="resultadoTpl; context: { $implicit: r }" />
            } @empty {
                <p class="mm-vazio">Nenhuma funcionalidade encontrada. Tente outras palavras.</p>
            }
        }

        <ng-template #resultadoTpl let-c>
            <div class="mm-fav-item">
                <button type="button" class="mm-estrela" [class.mm-estrela--on]="ehFavorito(c)" (click)="alternarFavorito(c)"
                        [attr.aria-label]="ehFavorito(c) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'">
                    <i [class]="ehFavorito(c) ? 'pi pi-star-fill' : 'pi pi-star'"></i>
                </button>
                <button type="button" class="mm-fav-link" (click)="selecionar(c)">
                    <span class="mm-fav-titulo">{{ titulo(c) }}</span>
                    <span class="mm-fav-caminho">{{ caminhoPai(c) }}</span>
                </button>
            </div>
        </ng-template>
    </p-dialog>

    <p-confirmdialog key="mm-sair" styleClass="ds-dialog-basico" />
    `,
})
export class SistemaMegamenu {
    private confirm = inject(ConfirmationService);
    private el = inject(ElementRef<HTMLElement>);
    private campoBusca = viewChild<ElementRef<HTMLInputElement>>('campoBusca');

    menu = MM_MENU;
    private indice = indexarMenu(paraMenuItem(MM_MENU));

    // Layout
    mobile = signal(typeof window !== 'undefined' && window.innerWidth < 768);
    menuAberto = signal(true);        // desktop: aberto (padrão) ou totalmente oculto
    mobileAberto = signal(false);
    pilha = signal<MmNo[]>([]);       // navegação sequencial do mobile

    // Overlay
    raiz = signal<MmNo | 'favoritos' | null>(null);
    private tiered = signal<string[]>([]);   // caminhos abertos no TieredMenu híbrido (um por nível)
    tituloLongo = computed(() => {
        const r = this.raiz();
        return r && r !== 'favoritos' && (r.itens ?? []).some((c) => c.label.length > 24);
    });

    // Tela atual, recentes e favoritos
    atual = signal('');
    recentes = signal<string[]>([]);
    favoritos = signal<string[]>(this.lerFavoritos());

    // Busca
    buscaVisivel = false;
    termo = signal('');
    resultados = computed(() => buscarNoMenu(this.indice, this.termo()).map((r) => r.item.routerLink![0] as string));

    constructor() {
        effect(() => {
            try { localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(this.favoritos())); } catch { /* armazenamento indisponível */ }
        });
    }

    @HostListener('window:resize')
    onResize() {
        const m = window.innerWidth < 768;
        if (m !== this.mobile()) { this.mobile.set(m); this.fecharOverlay(); this.mobileAberto.set(false); }
    }

    @HostListener('document:keydown.escape')
    onEsc() { this.fecharOverlay(); }

    @HostListener('document:click', ['$event'])
    onClickFora(ev: MouseEvent) {
        if (!this.raiz()) return;
        const alvo = ev.target as HTMLElement;
        if (!alvo.closest('.mm-overlay') && !alvo.closest('.mm-menu')) this.fecharOverlay();
    }

    // ── Menu ──
    alternarMenu() {
        if (this.mobile()) { this.mobileAberto.update((v) => !v); this.pilha.set([]); return; }
        this.menuAberto.update((v) => !v);
        this.fecharOverlay();
    }

    abrirRaiz(r: MmNo | 'favoritos', ev: Event) {
        ev.stopPropagation();
        this.tiered.set([]);
        this.raiz.set(this.raiz() === r ? null : r);
    }

    fecharOverlay() { this.raiz.set(null); this.tiered.set([]); }

    tieredAberto(caminho: string) { return this.tiered().includes(caminho); }

    /** Abre/fecha um nível do TieredMenu híbrido; mantém abertos só os níveis acima. */
    alternarTiered(caminho: string, nivel: number, ev: Event) {
        ev.stopPropagation();
        const idx = nivel - 3;
        const atual = this.tiered();
        const fechando = atual[idx] === caminho;
        this.tiered.set(fechando ? atual.slice(0, idx) : [...atual.slice(0, idx), caminho]);
        if (!fechando) {
            // Abre para a esquerda se não couber à direita (≈ 290px)
            const r = (ev.currentTarget as HTMLElement).getBoundingClientRect();
            const semEspaco = window.innerWidth - r.right < 290;
            this.paraEsquerda.update((l) => [...l.filter((c) => c !== caminho), ...(semEspaco ? [caminho] : [])]);
        }
    }

    /** Caminhos do TieredMenu que abrem para a esquerda (sem espaço à direita). */
    paraEsquerda = signal<string[]>([]);

    // ── Mobile ──
    nivelMobile = computed<MmNo[]>(() => {
        const p = this.pilha();
        return p.length ? (p[p.length - 1].itens ?? []) : this.menu;
    });

    tocarMobile(n: MmNo) {
        if (n.itens?.length) { this.pilha.update((p) => [...p, n]); return; }
        this.selecionar([...this.pilha().map((x) => x.label), n.label].join(' › '));
    }

    voltarMobile() { this.pilha.update((p) => p.slice(0, -1)); }

    // ── Seleção, recentes e favoritos ──
    selecionar(caminho: string) {
        this.atual.set(caminho);
        this.recentes.update((r) => [caminho, ...r.filter((x) => x !== caminho)].slice(0, 2));
        this.fecharOverlay();
        this.buscaVisivel = false;
        this.mobileAberto.set(false);
        this.pilha.set([]);
    }

    ehFavorito(c: string) { return this.favoritos().includes(c); }

    /** Mais recente primeiro, sem limite. */
    alternarFavorito(c: string) {
        this.favoritos.update((f) => (f.includes(c) ? f.filter((x) => x !== c) : [c, ...f]));
    }

    titulo(c: string) { return c.split(' › ').pop() ?? c; }
    caminhoPai(c: string) { return c.split(' › ').slice(0, -1).join(' › '); }

    // ── Busca ──
    abrirBusca() { this.fecharOverlay(); this.buscaVisivel = true; }
    focarBusca() { setTimeout(() => this.campoBusca()?.nativeElement.focus(), 50); }
    abrirPrimeiro() { const r = this.resultados(); if (r.length) this.selecionar(r[0]); }

    sair() {
        this.confirm.confirm({
            key: 'mm-sair', header: 'Sair do sistema', message: 'Deseja realmente sair? Alterações não salvas serão perdidas.',
            acceptLabel: 'Sair', rejectLabel: 'Cancelar', rejectButtonProps: { outlined: true },
        });
    }

    private lerFavoritos(): string[] {
        try { return JSON.parse(localStorage.getItem(CHAVE_FAVORITOS) ?? '[]'); } catch { return []; }
    }
}
