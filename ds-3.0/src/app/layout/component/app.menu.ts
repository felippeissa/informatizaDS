import { Component, computed, ElementRef, HostListener, inject, OnInit, OnDestroy, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { AppMenuitem } from './app.menuitem';
import { LayoutService } from '@/app/layout/service/layout.service';
import { DS_MENU } from './ds-menu';
import { buscarNoMenu, indexarMenu, ResultadoBusca } from './menu-busca';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Menu lateral (padrão GESIS):
 * - ABERTO (padrão): campo de busca + itens agrupados.
 * - FECHADO (hambúrguer no desktop): só ícones — um por seção, mais a lupa.
 *   Como o menu tem busca, clicar em qualquer ícone EXPANDE o menu (já na seção clicada).
 * - Busca: caminho completo, palavras em qualquer ordem, ignora maiúsculas/acentos/plural,
 *   resultados por relevância (ver menu-busca.ts).
 */
@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule, TooltipModule],
    template: `
    @if (recolhido()) {
        <nav class="menu-trilho" aria-label="Menu recolhido">
            <button type="button" class="menu-trilho-item" (click)="abrirBusca()" pTooltip="Buscar no menu" tooltipPosition="right" aria-label="Buscar no menu">
                <i class="pi pi-search"></i>
            </button>
            <span class="menu-trilho-divisor" aria-hidden="true"></span>
            @for (g of model; track g.label) {
                <button type="button" class="menu-trilho-item" [class.menu-trilho-item--ativo]="grupoAtivo(g)"
                        (click)="abrirGrupo(g)" [pTooltip]="g.label" tooltipPosition="right" [attr.aria-label]="g.label">
                    <i [class]="g.icon"></i>
                </button>
            }
        </nav>
    } @else {
        <div class="menu-busca" role="search">
            <i class="pi pi-search menu-busca-icone" aria-hidden="true"></i>
            <input #campoBusca type="search" class="menu-busca-campo" placeholder="Buscar no menu" aria-label="Buscar no menu"
                   [value]="termo()" (input)="termo.set($any($event.target).value)" (keydown.escape)="limparBusca()" />
            @if (termo()) {
                <button type="button" class="menu-busca-limpar" (click)="limparBusca()" aria-label="Limpar busca"><i class="pi pi-times"></i></button>
            }
        </div>

        @if (termo().trim()) {
            <ul class="menu-resultados" aria-live="polite">
                @for (r of resultados(); track r.item.label + r.caminho) {
                    <li>
                        <a [routerLink]="r.item.routerLink" (click)="limparBusca()" class="menu-resultado">
                            @if (r.item.icon) { <i [class]="r.item.icon" class="menu-resultado-icone"></i> }
                            <span class="menu-resultado-texto">
                                <span class="menu-resultado-titulo">{{ r.item.label }}</span>
                                <span class="menu-resultado-caminho">{{ r.caminho }}</span>
                            </span>
                        </a>
                    </li>
                } @empty {
                    <li class="menu-resultados-vazio">Nenhum item encontrado.</li>
                }
            </ul>
        } @else {
            <ul class="layout-menu">
                @for (item of model; track item.label) {
                    @if (!item.separator) {
                        <li app-menuitem [item]="item" [root]="true" [attr.data-grupo]="item.label"></li>
                    } @else {
                        <li class="menu-separator"></li>
                    }
                }
            </ul>
        }
    }`
})
export class AppMenu implements OnInit, OnDestroy {
    model: MenuItem[] = [];
    private router = inject(Router);
    private el = inject(ElementRef<HTMLElement>);
    layoutService = inject(LayoutService);
    private sub!: Subscription;

    private campoBusca = viewChild<ElementRef<HTMLInputElement>>('campoBusca');
    private desktop = signal(typeof window === 'undefined' || window.innerWidth > 1023);
    private url = signal('');

    termo = signal('');
    private indice = computed(() => indexarMenu(this.model));
    resultados = computed<ResultadoBusca[]>(() => buscarNoMenu(this.indice(), this.termo()));

    recolhido = computed(() =>
        this.layoutService.menuRecolhido() && this.desktop() && this.layoutService.layoutConfig().menuMode === 'static');

    @HostListener('window:resize')
    onResize() { this.desktop.set(window.innerWidth > 1023); }

    ngOnInit() {
        this.buildMenu(this.router.url);
        this.url.set(this.router.url);
        this.sub = this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((e: any) => { this.buildMenu(e.urlAfterRedirects); this.url.set(e.urlAfterRedirects); });
    }

    ngOnDestroy() { this.sub?.unsubscribe(); }

    private buildMenu(_url: string) {
        if (!this.model.length) this.model = DS_MENU;
    }

    /** Seção que contém a página atual (destaca o ícone no menu recolhido). */
    grupoAtivo(g: MenuItem) {
        const url = this.url().split('?')[0];
        return (g.items ?? []).some((i) => i.routerLink && url === i.routerLink[0]);
    }

    /** Fechado → clicar no ícone da seção expande o menu já posicionado nela. */
    abrirGrupo(g: MenuItem) {
        this.layoutService.expandirMenu();
        setTimeout(() => {
            const alvo = this.el.nativeElement.querySelector(`[data-grupo="${g.label}"]`) as HTMLElement | null;
            alvo?.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }, 80);
    }

    /** Fechado → lupa expande o menu e foca a busca. */
    abrirBusca() {
        this.layoutService.expandirMenu();
        setTimeout(() => this.campoBusca()?.nativeElement.focus(), 80);
    }

    limparBusca() { this.termo.set(''); }

}
