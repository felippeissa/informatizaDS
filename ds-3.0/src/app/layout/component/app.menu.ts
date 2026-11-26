import { Component, computed, ElementRef, HostListener, inject, OnInit, OnDestroy, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { AppMenuitem } from './app.menuitem';
import { LayoutService } from '@/app/layout/service/layout.service';
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
                            <i [class]="r.item.icon" class="menu-resultado-icone"></i>
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
        if (!this.model.length) this.model = this.dsMenu;
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

    /* ══════════════════════════════════════════════════════
       Menu: Informatiza Design System
    ══════════════════════════════════════════════════════ */
    private get dsMenu(): MenuItem[] { return [
            {
                label: 'Início',
                icon: 'pi pi-home',
                items: [
                    { label: 'Visão Geral', icon: 'pi pi-fw pi-home', routerLink: ['/ds'] }
                ]
            },

            /* ══════════════ PADRÕES DE UX (GESIS) ══════════════ */
            {
                label: 'Padrões de UX',
                icon: 'pi pi-book',
                items: [
                    { label: 'Layout e navegação',  icon: 'pi pi-fw pi-objects-column', routerLink: ['/ds/padroes/layout'] },
                    { label: 'Feedback ao usuário', icon: 'pi pi-fw pi-bell',           routerLink: ['/ds/padroes/feedback'] },
                    { label: 'Inputs',              icon: 'pi pi-fw pi-pen-to-square',  routerLink: ['/ds/padroes/inputs'] },
                    { label: 'Botões',              icon: 'pi pi-fw pi-stop',           routerLink: ['/ds/padroes/botoes'] },
                    { label: 'Filtros',             icon: 'pi pi-fw pi-filter',         routerLink: ['/ds/padroes/filtros'] },
                    { label: 'Tabelas',             icon: 'pi pi-fw pi-table',          routerLink: ['/ds/padroes/tabelas'] },
                    { label: 'Formulários',         icon: 'pi pi-fw pi-file-edit',      routerLink: ['/ds/padroes/formularios'] }
                ]
            },

            /* ══════════════ FOUNDATIONS ══════════════ */
            {
                label: 'Foundations',
                icon: 'pi pi-palette',
                items: [
                    { label: 'Cores',             icon: 'pi pi-fw pi-palette',    routerLink: ['/ds/foundations/cores'] },
                    { label: 'Tipografia',        icon: 'pi pi-fw pi-pencil',     routerLink: ['/ds/foundations/tipografia'] },
                    { label: 'Espaçamento',       icon: 'pi pi-fw pi-arrows-h',   routerLink: ['/ds/foundations/espacamento'] },
                    { label: 'Bordas e elevação', icon: 'pi pi-fw pi-clone',      routerLink: ['/ds/foundations/bordas'] },
                    { label: 'Ícones',            icon: 'pi pi-fw pi-star',       routerLink: ['/ds/foundations/icones'] },
                    { label: 'Grid e layout',     icon: 'pi pi-fw pi-th-large',   routerLink: ['/ds/foundations/grid'] }
                ]
            },

            /* ══════════════ TEMPLATES DE TELA ══════════════ */
            {
                label: 'Templates',
                icon: 'pi pi-objects-column',
                items: [
                    { label: 'Lista com filtros',   icon: 'pi pi-fw pi-list',          routerLink: ['/ds/templates/lista'] },
                    { label: 'Cadastro',  icon: 'pi pi-fw pi-pencil',        routerLink: ['/ds/templates/formulario'] },
                    { label: 'Dashboard',           icon: 'pi pi-fw pi-chart-line',    routerLink: ['/ds/templates/dashboard'] },
                    { label: 'Visualização', icon: 'pi pi-fw pi-eye', routerLink: ['/ds/templates/detalhe'] },
                    { label: 'Sistema com MegaMenu', icon: 'pi pi-fw pi-th-large', routerLink: ['/sistema-megamenu'] }
                ]
            },

            /* ══════════════ ÁTOMOS ══════════════ */
            {
                label: 'Átomos',
                icon: 'pi pi-circle',
                items: [
                    { label: 'Button',         icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/button'] },
                    { label: 'SplitButton',    icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/splitbutton'] },
                    { label: 'SpeedDial',      icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/speeddial'] },
                    { label: 'InputText',      icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/inputtext'] },
                    { label: 'InputMask',      icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/inputmask'] },
                    { label: 'InputGroup',     icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/inputgroup'] },
                    { label: 'IconField',      icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/iconfield'] },
                    { label: 'FloatLabel',     icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/floatlabel'] },
                    { label: 'IftaLabel',      icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/iftalabel'] },
                    { label: 'Password',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/password'] },
                    { label: 'Textarea',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/textarea'] },
                    { label: 'InputNumber',    icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/inputnumber'] },
                    { label: 'InputOtp',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/inputotp'] },
                    { label: 'KeyFilter',      icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/keyfilter'] },
                    { label: 'Checkbox',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/checkbox'] },
                    { label: 'RadioButton',    icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/radiobutton'] },
                    { label: 'ToggleSwitch',   icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/toggleswitch'] },
                    { label: 'SelectButton',   icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/selectbutton'] },
                    { label: 'ToggleButton',   icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/togglebutton'] },
                    { label: 'Slider',         icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/slider'] },
                    { label: 'Rating',         icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/rating'] },
                    { label: 'Knob',           icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/knob'] },
                    { label: 'ColorPicker',    icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/colorpicker'] },
                    { label: 'Editor',         icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/editor'] },
                    { label: 'Select',         icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/select'] },
                    { label: 'Listbox',        icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/listbox'] },
                    { label: 'MultiSelect',    icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/multiselect'] },
                    { label: 'AutoComplete',   icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/autocomplete'] },
                    { label: 'CascadeSelect',  icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/cascadeselect'] },
                    { label: 'TreeSelect',     icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/treeselect'] },
                    { label: 'DatePicker',     icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/datepicker'] },
                    { label: 'Avatar',         icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/avatar'] },
                    { label: 'Badge',          icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/badge'] },
                    { label: 'Tag',            icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/tag'] },
                    { label: 'Chip',           icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/chip'] },
                    { label: 'ProgressBar',    icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/progressbar'] },
                    { label: 'ProgressSpinner',icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/progressspinner'] },
                    { label: 'MeterGroup',     icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/metergroup'] },
                    { label: 'Skeleton',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/skeleton'] },
                    { label: 'Inplace',        icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/inplace'] },
                    { label: 'BlockUI',        icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/blockui'] },
                    { label: 'ScrollTop',      icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/scrolltop'] },
                    { label: 'AnimateOnScroll',icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/animateonscroll'] },
                    { label: 'Terminal',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/terminal'] },
                ]
            },

            /* ══════════════ MOLÉCULAS ══════════════ */
            {
                label: 'Moléculas',
                icon: 'pi pi-clone',
                items: [
                    { label: 'Card',          icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/card'] },
                    { label: 'Accordion',     icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/accordion'] },
                    { label: 'Tabs',          icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/tabs'] },
                    { label: 'Panel',         icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/panel'] },
                    { label: 'Fieldset',      icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/fieldset'] },
                    { label: 'Toolbar',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/toolbar'] },
                    { label: 'Divider',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/divider'] },
                    { label: 'Stepper',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/stepper'] },
                    { label: 'Splitter',      icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/splitter'] },
                    { label: 'ScrollPanel',   icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/scrollpanel'] },
                    { label: 'Toast',         icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/toast'] },
                    { label: 'Message',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/message'] },
                    { label: 'Dialog',        icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/dialog'] },
                    { label: 'DynamicDialog', icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/dynamicdialog'] },
                    { label: 'Drawer',        icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/drawer'] },
                    { label: 'Tooltip',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/tooltip'] },
                    { label: 'Popover',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/popover'] },
                    { label: 'ConfirmDialog', icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/confirmdialog'] },
                    { label: 'ConfirmPopup',  icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/confirmpopup'] },
                ]
            },

            /* ══════════════ ORGANISMOS ══════════════ */
            {
                label: 'Organismos',
                icon: 'pi pi-sitemap',
                items: [
                    { label: 'DataTable',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/datatable'] },
                    { label: 'Paginator',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/paginator'] },
                    { label: 'Tree',            icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/tree'] },
                    { label: 'TreeTable',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/treetable'] },
                    { label: 'Timeline',        icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/timeline'] },
                    { label: 'OrderList',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/orderlist'] },
                    { label: 'PickList',        icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/picklist'] },
                    { label: 'DataView',        icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/dataview'] },
                    { label: 'OrgChart',        icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/orgchart'] },
                    { label: 'VirtualScroller', icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/virtualscroller'] },
                    { label: 'Menu',            icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/menu'] },
                    { label: 'Menubar',         icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/menubar'] },
                    { label: 'MegaMenu',        icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/megamenu'] },
                    { label: 'Breadcrumb',      icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/breadcrumb'] },
                    { label: 'PanelMenu',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/panelmenu'] },
                    { label: 'TieredMenu',      icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/tieredmenu'] },
                    { label: 'ContextMenu',     icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/contextmenu'] },
                    { label: 'Dock',            icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/dock'] },
                    { label: 'Steps',           icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/steps'] },
                    { label: 'Image',           icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/image'] },
                    { label: 'ImageCompare',    icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/imagecompare'] },
                    { label: 'Galleria',        icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/galleria'] },
                    { label: 'Carousel',        icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/carousel'] },
                    { label: 'FileUpload',      icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/fileupload'] },
                    { label: 'Chart',           icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/chart'] },
                    { label: 'Form Layout',     icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/formlayout'] },
                ]
            },
        ]; }
}
