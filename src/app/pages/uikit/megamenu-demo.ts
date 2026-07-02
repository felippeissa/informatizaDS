import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MegaMenuModule } from 'primeng/megamenu';
import { MegaMenuItem } from 'primeng/api';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

/* Modelo do Hybrid (protótipo DS): grupo de colunas como o MegaMenu,
   mas cada item aceita `items` recursivo (cascata TieredMenu). */
interface HybNode { label: string; icon?: string; items?: HybNode[]; }
interface HybGroup { label: string; items: HybNode[]; }
interface HybRoot { label: string; icon: string; cols?: HybGroup[][]; }

@Component({
    selector: 'app-megamenu-demo',
    standalone: true,
    imports: [CommonModule, MegaMenuModule, TabsModule, TableModule],
    styles: [DEMO_STYLES, `
        /* ── Hybrid: MegaMenu + cascata TieredMenu (protótipo DS) ── */
        .hyb-bar {
            display: flex; gap: 4px; padding: 6px;
            background: var(--surface-card);
            border: 1px solid var(--surface-border);
            border-radius: 10px;
        }
        .hyb-root { position: relative; }
        .hyb-root-btn {
            display: flex; align-items: center; gap: 8px;
            padding: 8px 14px; border: none; border-radius: 8px;
            background: transparent; color: var(--text-color);
            font-size: 14px; font-weight: 500; font-family: inherit; cursor: pointer;
        }
        .hyb-root:hover .hyb-root-btn { background: var(--surface-hover); }
        .hyb-root-btn i { font-size: 13px; color: var(--text-color-secondary); }
        .hyb-caret-down { font-size: 11px !important; }

        .hyb-panel {
            display: none; position: absolute; top: 100%; left: 0;
            padding-top: 6px; z-index: 1100;
        }
        .hyb-root:hover .hyb-panel { display: block; }
        .hyb-panel-in {
            display: flex; gap: 28px;
            background: var(--surface-card);
            border: 1px solid var(--surface-border);
            border-radius: 12px; padding: 16px 18px;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.14);
        }
        .hyb-col { display: flex; flex-direction: column; gap: 16px; min-width: 210px; }
        .hyb-group-title {
            font-size: 11px; font-weight: 700; letter-spacing: .06em;
            text-transform: uppercase; color: var(--text-color-secondary);
            padding: 2px 10px 6px;
        }
        .hyb-list { list-style: none; margin: 0; padding: 0.125rem; }
        .hyb-item { position: relative; list-style: none; }
        .hyb-link {
            display: flex; align-items: center; gap: 8px;
            padding: 8px 10px; border-radius: 7px;
            font-size: 13.5px; color: var(--text-color); cursor: pointer;
            white-space: nowrap;
        }
        .hyb-item:hover > .hyb-link { background: var(--surface-hover); }
        .hyb-link i { font-size: 12px; color: var(--text-color-secondary); }
        .hyb-caret { margin-left: auto; font-size: 11px !important; padding-left: 10px; }

        /* cascata: cada nível abre à direita (leve sobreposição evita fechar no trajeto do mouse) */
        .hyb-sub {
            display: none; position: absolute; left: calc(100% - 4px); top: -7px;
            min-width: 210px; padding: 6px; z-index: 1101;
            background: var(--surface-card);
            border: 1px solid var(--surface-border);
            border-radius: 10px;
            box-shadow: 0 10px 26px rgba(0, 0, 0, 0.14);
        }
        .hyb-item:hover > .hyb-sub { display: block; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">MegaMenu</h1>
            <p class="comp-desc">MegaMenu é um menu de navegação com categorias em colunas, ideal para portais e sistemas com muitas seções.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">MegaMenuModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/megamenu'</span><span class="tok-pt">;</span>
            </div>
        </div>

        <p-tabs value="features" styleClass="mt-1">
            <p-tablist>
                <p-tab value="features">Features</p-tab>
                <p-tab value="api">API</p-tab>
            </p-tablist>
            <p-tabpanels>
                <p-tabpanel value="features"><div style="padding:20px 0">

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Horizontal (padrão)</div>
                            <p class="demo-card-desc">Passe o cursor sobre os itens para ver o painel de colunas.</p>
                        </div>
                        <div class="demo-card-body" style="flex-direction:column;align-items:stretch;padding:16px">
                            <p-megamenu [model]="items" />
                        </div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Vertical</div>
                            <p class="demo-card-desc">Orientação vertical com <code>orientation="vertical"</code>.</p>
                        </div>
                        <div class="demo-card-body" style="padding:16px;align-items:flex-start">
                            <p-megamenu [model]="items" orientation="vertical" style="width:220px" />
                        </div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Hybrid (protótipo DS)</div>
                            <p class="demo-card-desc">MegaMenu cujos itens do painel podem ter <strong>subníveis em cascata</strong> (estilo TieredMenu) ao passar o mouse — até <strong>5 níveis</strong>. O MegaMenu nativo do PrimeNG só tem colunas planas; este é um protótipo do DS para avaliação. Ex.: Sistemas → Financeiro → Orçamento → Execução → Empenho → Consultar.</p>
                        </div>
                        <div class="demo-card-body" style="padding:16px;align-items:flex-start;min-height:120px">
                            <nav class="hyb-bar">
                                @for (root of hybrid; track root.label) {
                                    <div class="hyb-root">
                                        <button type="button" class="hyb-root-btn">
                                            <i [class]="root.icon"></i>
                                            <span>{{ root.label }}</span>
                                            @if (root.cols?.length) { <i class="pi pi-angle-down hyb-caret-down"></i> }
                                        </button>
                                        @if (root.cols?.length) {
                                            <div class="hyb-panel">
                                                <div class="hyb-panel-in">
                                                    @for (col of root.cols; track $index) {
                                                        <div class="hyb-col">
                                                            @for (g of col; track g.label) {
                                                                <div class="hyb-group">
                                                                    <div class="hyb-group-title">{{ g.label }}</div>
                                                                    <ul class="hyb-list">
                                                                        <ng-container *ngTemplateOutlet="hybTpl; context: { $implicit: g.items }" />
                                                                    </ul>
                                                                </div>
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        }
                                    </div>
                                }
                            </nav>

                            <!-- nível recursivo: cascata estilo TieredMenu -->
                            <ng-template #hybTpl let-items>
                                @for (n of items; track n.label) {
                                    <li class="hyb-item">
                                        <a class="hyb-link">
                                            @if (n.icon) { <i [class]="n.icon"></i> }
                                            <span>{{ n.label }}</span>
                                            @if (n.items?.length) { <i class="pi pi-angle-right hyb-caret"></i> }
                                        </a>
                                        @if (n.items?.length) {
                                            <ul class="hyb-sub">
                                                <ng-container *ngTemplateOutlet="hybTpl; context: { $implicit: n.items }" />
                                            </ul>
                                        }
                                    </li>
                                }
                            </ng-template>
                        </div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:20px 0">
                    <p class="api-block-title">Propriedades</p>
                    <p-table [value]="apiProps" styleClass="p-datatable-sm">
                        <ng-template #header><tr><th>Prop</th><th>Tipo</th><th>Padrão</th><th>Descrição</th></tr></ng-template>
                        <ng-template #body let-r><tr>
                            <td><code>{{r.prop}}</code></td>
                            <td><span class="badge-type">{{r.type}}</span></td>
                            <td><span class="badge-default">{{r.default}}</span></td>
                            <td>{{r.desc}}</td>
                        </tr></ng-template>
                    </p-table>
                </div></p-tabpanel>
            </p-tabpanels>
        </p-tabs>
    `
})
export class MegaMenuDemo {
    items: MegaMenuItem[] = [
        {
            label: 'Componentes', icon: 'pi pi-box',
            items: [
                [
                    { label: 'Formulário', items: [
                        { label: 'InputText', icon: 'pi pi-pencil' },
                        { label: 'Select', icon: 'pi pi-chevron-down' },
                        { label: 'DatePicker', icon: 'pi pi-calendar' }
                    ]},
                    { label: 'Botões', items: [
                        { label: 'Button', icon: 'pi pi-stop' },
                        { label: 'SplitButton', icon: 'pi pi-chevron-down' }
                    ]}
                ],
                [
                    { label: 'Dados', items: [
                        { label: 'DataTable', icon: 'pi pi-table' },
                        { label: 'Tree', icon: 'pi pi-sitemap' },
                        { label: 'Chart', icon: 'pi pi-chart-bar' }
                    ]},
                    { label: 'Overlay', items: [
                        { label: 'Dialog', icon: 'pi pi-window-maximize' },
                        { label: 'Tooltip', icon: 'pi pi-info-circle' }
                    ]}
                ]
            ]
        },
        {
            label: 'Recursos', icon: 'pi pi-book',
            items: [
                [
                    { label: 'Documentação', items: [
                        { label: 'Guia de início', icon: 'pi pi-play' },
                        { label: 'API Reference', icon: 'pi pi-code' }
                    ]}
                ],
                [
                    { label: 'Comunidade', items: [
                        { label: 'GitHub', icon: 'pi pi-github' },
                        { label: 'Discord', icon: 'pi pi-comments' }
                    ]}
                ]
            ]
        },
        { label: 'Sobre', icon: 'pi pi-info-circle' }
    ];

    apiProps = [
        { prop: 'model', type: 'MegaMenuItem[]', default: 'null', desc: 'Array de itens do menu' },
        { prop: 'orientation', type: 'string', default: 'horizontal', desc: 'Orientação: horizontal | vertical' },
        { prop: 'breakpoint', type: 'string', default: '960px', desc: 'Breakpoint para modo mobile' },
    ];

    /* Hybrid (protótipo): itens do painel podem ter subníveis — máx. 5 níveis.
       Cadeia de exemplo: Financeiro(1) → Orçamento(2) → Execução(3) → Empenho(4) → Consultar(5). */
    hybrid: HybRoot[] = [
        {
            label: 'Sistemas', icon: 'pi pi-th-large',
            cols: [
                [
                    { label: 'Gestão', items: [
                        { label: 'Financeiro', icon: 'pi pi-wallet', items: [
                            { label: 'Orçamento', items: [
                                { label: 'Execução orçamentária', items: [
                                    { label: 'Empenho', items: [
                                        { label: 'Consultar empenho' },
                                        { label: 'Emitir empenho' },
                                    ]},
                                    { label: 'Liquidação' },
                                    { label: 'Pagamento' },
                                ]},
                                { label: 'Programação financeira' },
                            ]},
                            { label: 'Contabilidade' },
                        ]},
                        { label: 'Pessoas', icon: 'pi pi-users', items: [
                            { label: 'Servidores', items: [
                                { label: 'Ativos' },
                                { label: 'Aposentados' },
                            ]},
                            { label: 'Estagiários' },
                        ]},
                    ]},
                    { label: 'Operações', items: [
                        { label: 'Logística', icon: 'pi pi-truck', items: [
                            { label: 'Frota' },
                            { label: 'Entregas' },
                        ]},
                        { label: 'Patrimônio', icon: 'pi pi-box' },
                    ]},
                ],
                [
                    { label: 'Atendimento', items: [
                        { label: 'Portal do cidadão', icon: 'pi pi-globe' },
                        { label: 'Protocolo', icon: 'pi pi-inbox', items: [
                            { label: 'Novo protocolo' },
                            { label: 'Consultar protocolo' },
                        ]},
                    ]},
                ],
            ],
        },
        {
            label: 'Serviços', icon: 'pi pi-briefcase',
            cols: [
                [
                    { label: 'Documentos', items: [
                        { label: 'Assinatura digital', icon: 'pi pi-pen-to-square' },
                        { label: 'Certidões', icon: 'pi pi-file', items: [
                            { label: 'Negativa de débitos' },
                            { label: 'Regularidade fiscal' },
                        ]},
                    ]},
                ],
            ],
        },
        { label: 'Sobre', icon: 'pi pi-info-circle' },
    ];
}
