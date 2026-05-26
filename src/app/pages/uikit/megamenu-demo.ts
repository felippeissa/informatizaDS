import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MegaMenuModule } from 'primeng/megamenu';
import { MegaMenuItem } from 'primeng/api';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-megamenu-demo',
    standalone: true,
    imports: [CommonModule, MegaMenuModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
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
}
