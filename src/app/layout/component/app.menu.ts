import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MegaMenuModule } from 'primeng/megamenu';
import { AppMenuitem } from './app.menuitem';
import { LayoutService } from '@/app/layout/service/layout.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule, TieredMenuModule, MegaMenuModule],
    styles: [`
        :host ::ng-deep .layout-menu-tiered.p-tieredmenu,
        :host ::ng-deep .layout-menu-mega.p-megamenu {
            width: 100%;
            border: none;
            background: transparent;
            padding: 0;
        }
        :host ::ng-deep .layout-menu-mega.p-megamenu .p-megamenu-root-list { width: 100%; }
    `],
    template: `
        @switch (menuType) {
            @case ('tiered') {
                <p-tieredmenu [model]="itens" [popup]="false" styleClass="layout-menu-tiered" />
            }
            @case ('mega') {
                <p-megamenu [model]="itensMega" orientation="vertical" styleClass="layout-menu-mega" />
            }
            @default {
                <ul class="layout-menu">
                    @for (item of model; track item.label) {
                        @if (!item.separator) {
                            <li app-menuitem [item]="item" [root]="true"></li>
                        } @else {
                            <li class="menu-separator"></li>
                        }
                    }
                </ul>
            }
        }
    `
})
export class AppMenu implements OnInit, OnDestroy {
    model: MenuItem[] = [];
    private router = inject(Router);
    private layoutService = inject(LayoutService);
    private sub!: Subscription;

    get menuType(): string { return this.layoutService.layoutConfig().menuType; }

    // Itens reais (sem o wrapper) para TieredMenu / MegaMenu
    get itens(): MenuItem[] { return this.model[0]?.items ?? []; }

    // MegaMenu espera os filhos como colunas (array de arrays de grupos).
    // O menu do SIAFIC tem 5-6 níveis, então adaptamos: módulo → colunas
    // (cada grupo vira uma coluna) → itens (níveis mais profundos achatados).
    get itensMega(): any[] {
        return this.itens.map((top) => ({
            label: top.label,
            icon: top.icon,
            routerLink: top.routerLink,
            items: top.items ? this.megaColunas(top.items) : undefined,
        }));
    }

    private megaColunas(filhos: MenuItem[]): any[][] {
        // Pula wrappers de filho único (ex.: Financeiro → Execução Orçamentária)
        let nivel = filhos;
        if (nivel.length === 1 && nivel[0].items?.length) nivel = nivel[0].items!;
        // Cada grupo do nível vira uma coluna com cabeçalho + itens
        return nivel.map((grupo) => [
            {
                label: grupo.label,
                items: (grupo.items ?? []).map((it) => this.megaItem(it)),
            },
        ]);
    }

    private megaItem(it: MenuItem): any {
        if (it.items?.length) {
            return {
                label: it.label,
                items: it.items.map((c) =>
                    c.items?.length ? { label: c.label, items: c.items.map((x) => ({ label: x.label })) } : { label: c.label },
                ),
            };
        }
        return { label: it.label, routerLink: it.routerLink };
    }

    ngOnInit() {
        this.buildMenu(this.router.url);
        this.sub = this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((e: any) => this.buildMenu(e.urlAfterRedirects));
    }

    ngOnDestroy() { this.sub?.unsubscribe(); }

    private buildMenu(url: string) {
        if (url.startsWith('/assinago')) {
            this.model = this.assinagoMenu;
        } else if (url.startsWith('/dracon')) {
            this.model = this.draconMenu;
        } else if (url.startsWith('/godev')) {
            this.model = this.godevMenu;
        } else if (url.startsWith('/siafic')) {
            this.model = this.siaficMenu;
        } else {
            this.model = this.dsMenu;
        }
    }

    /* ══════════════════════════════════════════════════════
       Menu: SIAFIC — menu extenso (até 5/6 níveis) p/ validação
    ══════════════════════════════════════════════════════ */
    private siaficMenu: MenuItem[] = [
        {
            items: [
                { label: 'Página inicial', icon: 'pi pi-home', routerLink: ['/siafic'] },

                {
                    label: 'Financeiro', icon: 'pi pi-dollar', path: '/financeiro',
                    items: [
                        {
                            label: 'Execução Orçamentária', path: '/exec',
                            items: [
                                {
                                    label: 'Consultas', path: '/consultas',
                                    items: [
                                        { label: 'Consultar Empenhos' },
                                        { label: 'Consultar Natureza de Despesa' },
                                        { label: 'Consultar Elemento/Subelemento' },
                                    ],
                                },
                                {
                                    label: 'Empenhos', path: '/empenhos',
                                    items: [
                                        { label: 'Efetuar Empenho' },
                                        { label: 'Pré-Empenho' },
                                        { label: 'Anular Empenho' },
                                        { label: 'Excluir Anulação de Empenho' },
                                        { label: 'Cancelar Empenho' },
                                        { label: 'Reserva de Dotação' },
                                        { label: 'Manutenção de Critério' },
                                        { label: 'Alteração de Critério' },
                                    ],
                                },
                                {
                                    label: 'Restos a Pagar', path: '/restos',
                                    items: [
                                        { label: 'Cancelar Empenho' },
                                        { label: 'Anulação de Cancelamento' },
                                    ],
                                },
                                {
                                    label: 'Natureza da Despesa', path: '/natureza',
                                    items: [
                                        { label: 'Inclusão de Elemento/Subelemento' },
                                        { label: 'Manter Item x Natureza' },
                                        { label: 'Declaração de Adequação' },
                                    ],
                                },
                                {
                                    label: 'Créditos Orçamentários', path: '/cred-orc',
                                    items: [
                                        { label: 'Crédito' },
                                        { label: 'Débito' },
                                    ],
                                },
                                {
                                    label: 'Créditos Adicionais', path: '/cred-add',
                                    items: [
                                        {
                                            label: 'Crédito Suplementar', path: '/cred-supl',
                                            items: [
                                                { label: 'Solicitar Crédito Suplementar' },
                                                { label: 'Reabertura de Solicitação' },
                                                { label: 'Ajustar Solicitação' },
                                                { label: 'Aprovar Solicitação' },
                                                { label: 'Revisar Decreto' },
                                                { label: 'Autorizar Crédito' },
                                                { label: 'Indeferir Solicitação' },
                                                { label: 'Excluir Crédito' },
                                                {
                                                    label: 'Agregadores de Créditos Suplementares', path: '/agreg',
                                                    items: [
                                                        { label: 'Agregar Créditos Suplementares' },
                                                        { label: 'Autorizar Agregador de Crédito' },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            label: 'Crédito Especial', path: '/cred-esp',
                                            items: [
                                                { label: 'Solicitar' },
                                                { label: 'Aprovar' },
                                                { label: 'Consultar' },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Migração de Saldos', path: '/migracao',
                                    items: [
                                        { label: 'Elemento → Subelemento' },
                                        { label: 'Fonte → Modalidade' },
                                        { label: 'Modalidade → Aplicação' },
                                        { label: 'Função → Subfunção' },
                                        { label: 'Código de Acompanhamento' },
                                        { label: 'Entre Fontes' },
                                    ],
                                },
                                {
                                    label: 'Pessoas', path: '/pessoas',
                                    items: [
                                        { label: 'Manter Pessoa' },
                                    ],
                                },
                                {
                                    label: 'Relatórios', path: '/rel-exec',
                                    items: [
                                        { label: 'Execução' },
                                        { label: 'Empenhos' },
                                        { label: 'Créditos' },
                                        { label: 'Restos a Pagar' },
                                    ],
                                },
                            ],
                        },
                    ],
                },

                {
                    label: 'Contabilidade', icon: 'pi pi-book', path: '/contabilidade',
                    items: [
                        {
                            label: 'Lançamentos Contábeis', path: '/lancamentos',
                            items: [
                                { label: 'Incluir Lançamento' },
                                { label: 'Estornar Lançamento' },
                                {
                                    label: 'Consultar Lançamentos', path: '/cons-lanc',
                                    items: [
                                        { label: 'Por Conta Contábil' },
                                        { label: 'Por Período' },
                                    ],
                                },
                            ],
                        },
                        {
                            label: 'Conformidade Contábil', path: '/conformidade',
                            items: [
                                { label: 'Registrar Conformidade' },
                                { label: 'Consultar Conformidade' },
                            ],
                        },
                        {
                            label: 'Encerramento do Exercício', path: '/encerramento',
                            items: [
                                { label: 'Apuração de Resultado' },
                                { label: 'Fechamento de Balanço' },
                            ],
                        },
                    ],
                },

                {
                    label: 'Planejamento', icon: 'pi pi-chart-line', path: '/planejamento',
                    items: [
                        {
                            label: 'PPA', path: '/ppa',
                            items: [
                                { label: 'Manter Programa' },
                                { label: 'Manter Ação' },
                                { label: 'Consultar PPA' },
                            ],
                        },
                        {
                            label: 'LDO', path: '/ldo',
                            items: [
                                { label: 'Metas Fiscais' },
                                { label: 'Consultar LDO' },
                            ],
                        },
                        {
                            label: 'LOA', path: '/loa',
                            items: [
                                { label: 'Elaborar Proposta' },
                                { label: 'Consultar LOA' },
                            ],
                        },
                    ],
                },

                {
                    label: 'Cadastros', icon: 'pi pi-folder', path: '/cadastros',
                    items: [
                        {
                            label: 'Unidades Orçamentárias', path: '/unidades',
                            items: [
                                { label: 'Incluir Unidade' },
                                { label: 'Consultar Unidades' },
                            ],
                        },
                        {
                            label: 'Fontes de Recurso', path: '/fontes',
                            items: [
                                { label: 'Manter Fonte' },
                                { label: 'Consultar Fontes' },
                            ],
                        },
                        {
                            label: 'Credores', path: '/credores',
                            items: [
                                { label: 'Manter Credor' },
                                { label: 'Consultar Credores' },
                            ],
                        },
                    ],
                },

                {
                    label: 'Relatórios Gerenciais', icon: 'pi pi-file', path: '/rel-ger',
                    items: [
                        { label: 'Balancetes' },
                        { label: 'Demonstrativos' },
                        { label: 'Exportações' },
                    ],
                },
            ],
        },
    ];

    /* ══════════════════════════════════════════════════════
       Menu: ASSINAGO
    ══════════════════════════════════════════════════════ */
    private assinagoMenu: MenuItem[] = [
        {
            items: [
                { label: 'Página inicial',    routerLink: ['/assinago/pagina-inicial'] },
                { label: 'Minha conta',       routerLink: ['/assinago/minha-conta'] },
                { label: 'Validar documento', routerLink: ['/assinago/validar-documento'] },
                {
                    label: 'Configurações',
                    path: 'assinago-config',
                    items: [
                        { label: 'Documentos',           routerLink: ['/assinago/configuracoes/documentos'] },
                        { label: 'Assinaturas',          routerLink: ['/assinago/configuracoes/assinaturas'] },
                        { label: 'Motivo de recusa',     routerLink: ['/assinago/configuracoes/motivo-recusa'] },
                        { label: 'Blocos de assinatura', routerLink: ['/assinago/configuracoes/blocos-assinatura'] },
                    ]
                },
            ]
        },
    ];

    /* ══════════════════════════════════════════════════════
       Menu: DRACON
    ══════════════════════════════════════════════════════ */
    private draconMenu: MenuItem[] = [
        {
            items: [
                // ── 1. Processos ──────────────────────────────────────
                {
                    label: 'Processos',
                    path: 'dracon-processos',
                    routerLink: ['/dracon/processos'],
                    items: [
                        { label: 'Gestão',       routerLink: ['/dracon/gestao/afastamentos'] },
                        { label: 'Distribuição', routerLink: ['/dracon/gestao/distribuicao'] },
                    ]
                },

                // ── 2. Atos ───────────────────────────────────────────
                {
                    label: 'Atos',
                    path: 'dracon-atos',
                    items: [
                        { label: 'Listagem',             routerLink: ['/dracon/atos'] },
                        { label: 'Modelos',              routerLink: ['/dracon/atos/modelos'] },
                        { label: 'Auditoria',            routerLink: ['/dracon/atos/auditoria'] },
                        { label: 'Auditoria de modelos', routerLink: ['/dracon/atos/auditoria-modelos'] },
                    ]
                },

                // ── 3. Cadastros ──────────────────────────────────────
                {
                    label: 'Cadastros',
                    path: 'dracon-cadastros',
                    items: [
                        { label: 'Tipo ato',         routerLink: ['/dracon/cadastros/tipo-ato'] },
                        { label: 'Tipo de processo', routerLink: ['/dracon/cadastros/tipo-processo'] },
                        { label: 'Etiqueta',         routerLink: ['/dracon/cadastros/etiquetas'] },
                        { label: 'Afastamento',      routerLink: ['/dracon/cadastros/afastamento'] },
                    ]
                },

                // ── 4. Relatórios ─────────────────────────────────────
                { label: 'Relatórios', routerLink: ['/dracon/relatorios'] },
            ]
        },
    ];

    /* ══════════════════════════════════════════════════════
       Menu: GO.DEV
    ══════════════════════════════════════════════════════ */
    private godevMenu: MenuItem[] = [
        {
            items: [
                { label: 'Página inicial',     icon: 'pi pi-home',   routerLink: ['/godev/inicio'] },
                { label: 'Projetos',           icon: 'pi pi-folder', routerLink: ['/godev/projetos'] },
                { label: 'Manual Inteligente', icon: 'pi pi-book',   routerLink: ['/godev/manual'] },
            ]
        },
    ];

    /* ══════════════════════════════════════════════════════
       Menu: Informatiza Design System
    ══════════════════════════════════════════════════════ */
    private get dsMenu(): MenuItem[] { return [
            {
                label: 'Início',
                items: [
                    { label: 'Visão Geral', icon: 'pi pi-fw pi-home', routerLink: ['/ds'] }
                ]
            },

            /* ══════════════ ÁTOMOS ══════════════ */
            {
                label: 'Átomos',
                items: [
                    {
                        label: 'Buttons',
                        icon: 'pi pi-fw pi-stop',
                        path: 'atm-buttons',
                        items: [
                            { label: 'Button',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/button'] },
                            { label: 'SplitButton',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/splitbutton'] },
                            { label: 'SpeedDial',    icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/speeddial'] },
                        ]
                    },
                    {
                        label: 'Input',
                        icon: 'pi pi-fw pi-pencil',
                        path: 'atm-input',
                        items: [
                            { label: 'InputText',    icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/inputtext'] },
                            { label: 'InputMask',    icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/inputmask'] },
                            { label: 'InputGroup',   icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/inputgroup'] },
                            { label: 'IconField',    icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/iconfield'] },
                            { label: 'FloatLabel',   icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/floatlabel'] },
                            { label: 'IftaLabel',    icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/iftalabel'] },
                            { label: 'Password',     icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/password'] },
                            { label: 'Textarea',     icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/textarea'] },
                            { label: 'InputNumber',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/inputnumber'] },
                            { label: 'InputOtp',     icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/inputotp'] },
                            { label: 'KeyFilter',    icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/keyfilter'] },
                            { label: 'Checkbox',     icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/checkbox'] },
                            { label: 'RadioButton',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/radiobutton'] },
                            { label: 'ToggleSwitch', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/toggleswitch'] },
                            { label: 'SelectButton', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/selectbutton'] },
                            { label: 'ToggleButton', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/togglebutton'] },
                            { label: 'Slider',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/slider'] },
                            { label: 'Rating',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/rating'] },
                            { label: 'Knob',         icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/knob'] },
                            { label: 'ColorPicker',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/colorpicker'] },
                            { label: 'Editor',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/editor'] },
                        ]
                    },
                    {
                        label: 'Select',
                        icon: 'pi pi-fw pi-chevron-down',
                        path: 'atm-select',
                        items: [
                            { label: 'Select',         icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/select'] },
                            { label: 'Listbox',        icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/listbox'] },
                            { label: 'MultiSelect',    icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/multiselect'] },
                            { label: 'AutoComplete',   icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/autocomplete'] },
                            { label: 'CascadeSelect',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/cascadeselect'] },
                            { label: 'TreeSelect',     icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/treeselect'] },
                            { label: 'DatePicker',     icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/datepicker'] },
                        ]
                    },
                    {
                        label: 'Misc',
                        icon: 'pi pi-fw pi-circle',
                        path: 'atm-misc',
                        items: [
                            { label: 'Avatar',           icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/avatar'] },
                            { label: 'Badge',            icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/badge'] },
                            { label: 'Tag',              icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/tag'] },
                            { label: 'Chip',             icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/chip'] },
                            { label: 'ProgressBar',      icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/progressbar'] },
                            { label: 'ProgressSpinner',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/progressspinner'] },
                            { label: 'MeterGroup',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/metergroup'] },
                            { label: 'Skeleton',         icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/skeleton'] },
                            { label: 'Inplace',          icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/inplace'] },
                            { label: 'BlockUI',          icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/blockui'] },
                            { label: 'ScrollTop',        icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/scrolltop'] },
                            { label: 'AnimateOnScroll',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/animateonscroll'] },
                            { label: 'Terminal',         icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/terminal'] },
                        ]
                    },
                ]
            },

            /* ══════════════ MOLÉCULAS ══════════════ */
            {
                label: 'Moléculas',
                items: [
                    {
                        label: 'Painéis',
                        icon: 'pi pi-fw pi-tablet',
                        path: 'mol-panels',
                        items: [
                            { label: 'Card',        icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/card'] },
                            { label: 'Accordion',   icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/accordion'] },
                            { label: 'Tabs',        icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/tabs'] },
                            { label: 'Panel',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/panel'] },
                            { label: 'Fieldset',    icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/fieldset'] },
                            { label: 'Toolbar',     icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/toolbar'] },
                            { label: 'Divider',     icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/divider'] },
                            { label: 'Stepper',     icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/stepper'] },
                            { label: 'Splitter',    icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/splitter'] },
                            { label: 'ScrollPanel', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/scrollpanel'] },
                        ]
                    },
                    {
                        label: 'Mensagens',
                        icon: 'pi pi-fw pi-comment',
                        path: 'mol-messages',
                        items: [
                            { label: 'Toast',   icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/toast'] },
                            { label: 'Message', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/message'] },
                        ]
                    },
                    {
                        label: 'Sobreposições',
                        icon: 'pi pi-fw pi-clone',
                        path: 'mol-overlays',
                        items: [
                            { label: 'Dialog',         icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/dialog'] },
                            { label: 'DynamicDialog',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/dynamicdialog'] },
                            { label: 'Drawer',         icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/drawer'] },
                            { label: 'Tooltip',        icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/tooltip'] },
                            { label: 'Popover',        icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/popover'] },
                            { label: 'ConfirmDialog',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/confirmdialog'] },
                            { label: 'ConfirmPopup',   icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/confirmpopup'] },
                        ]
                    },
                ]
            },

            /* ══════════════ ORGANISMOS ══════════════ */
            {
                label: 'Organismos',
                items: [
                    {
                        label: 'Dados',
                        icon: 'pi pi-fw pi-table',
                        path: 'org-dados',
                        items: [
                            { label: 'DataTable',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/datatable'] },
                            { label: 'Paginator',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/paginator'] },
                            { label: 'Tree',            icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/tree'] },
                            { label: 'TreeTable',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/treetable'] },
                            { label: 'Timeline',        icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/timeline'] },
                            { label: 'OrderList',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/orderlist'] },
                            { label: 'PickList',        icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/picklist'] },
                            { label: 'DataView',        icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/dataview'] },
                            { label: 'OrgChart',        icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/orgchart'] },
                            { label: 'VirtualScroller', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/virtualscroller'] },
                        ]
                    },
                    {
                        label: 'Navegação',
                        icon: 'pi pi-fw pi-bars',
                        path: 'org-nav',
                        items: [
                            { label: 'Menu',        icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/menu'] },
                            { label: 'Menubar',     icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/menubar'] },
                            { label: 'MegaMenu',    icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/megamenu'] },
                            { label: 'Breadcrumb',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/breadcrumb'] },
                            { label: 'PanelMenu',   icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/panelmenu'] },
                            { label: 'TieredMenu',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/tieredmenu'] },
                            { label: 'ContextMenu', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/contextmenu'] },
                            { label: 'Dock',        icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/dock'] },
                            { label: 'Steps',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/steps'] },
                        ]
                    },
                    {
                        label: 'Mídia',
                        icon: 'pi pi-fw pi-image',
                        path: 'org-media',
                        items: [
                            { label: 'Image',         icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/image'] },
                            { label: 'ImageCompare',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/imagecompare'] },
                            { label: 'Galleria',      icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/galleria'] },
                            { label: 'Carousel',      icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/carousel'] },
                            { label: 'FileUpload',    icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/fileupload'] },
                        ]
                    },
                    {
                        label: 'Charts',
                        icon: 'pi pi-fw pi-chart-bar',
                        path: 'org-charts',
                        items: [
                            { label: 'Chart',    icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/chart'] },
                        ]
                    },
                    {
                        label: 'Formulários',
                        icon: 'pi pi-fw pi-file-edit',
                        path: 'org-forms',
                        items: [
                            { label: 'Form Layout', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/formlayout'] },
                        ]
                    },
                ]
            },
        ]; }
}
