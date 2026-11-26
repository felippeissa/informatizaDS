import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { TagModule } from 'primeng/tag';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { TreeNode } from 'primeng/api';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-orgchart-demo',
    standalone: true,
    imports: [CommonModule, OrganizationChartModule, TagModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        :host ::ng-deep .p-orgchart-node-content { border: 1px solid var(--surface-border); background: var(--surface-card); border-radius: 8px; padding: 12px 16px; }
        .node-card { display:flex; flex-direction:column; align-items:center; gap:4px; }
        .node-name { font-size: 13px; font-weight: 700; color: var(--text-color); }
        .node-role { font-size: 11px; color: var(--text-color-secondary); }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">OrgChart</h1>
            <p class="comp-desc">OrgChart visualiza dados hierárquicos em um organograma com nós expansíveis e templates customizados.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">OrgChartModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/orgchart'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Organograma básico</div>
                            <p class="demo-card-desc">Nós expansíveis com hierarquia de departamentos.</p>
                        </div>
                        <div class="demo-card-body" style="overflow-x:auto; padding:24px">
                            <p-organization-chart [value]="data" styleClass="company">
                                <ng-template #default let-node>
                                    <div class="node-card">
                                        <span class="node-name">{{ node.label }}</span>
                                        <span class="node-role">{{ node.data?.role }}</span>
                                        <p-tag *ngIf="node.data?.tag" [value]="node.data?.tag" [severity]="node.data?.severity" />
                                    </div>
                                </ng-template>
                            </p-organization-chart>
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
export class OrgChartDemo {
    data: TreeNode[] = [
        {
            label: 'Informatiza Goiás',
            data: { role: 'Organização', tag: 'Gov', severity: 'success' },
            expanded: true,
            children: [
                {
                    label: 'Diretoria de TI',
                    data: { role: 'Diretoria' },
                    expanded: true,
                    children: [
                        { label: 'Desenvolvimento', data: { role: 'Gerência' }, children: [
                            { label: 'Front-end', data: { role: 'Equipe' } },
                            { label: 'Back-end', data: { role: 'Equipe' } }
                        ]},
                        { label: 'Infraestrutura', data: { role: 'Gerência' } }
                    ]
                },
                {
                    label: 'Diretoria Administrativa',
                    data: { role: 'Diretoria' },
                    children: [
                        { label: 'Recursos Humanos', data: { role: 'Gerência' } },
                        { label: 'Financeiro', data: { role: 'Gerência' } }
                    ]
                }
            ]
        }
    ];

    apiProps = [
        { prop: 'value', type: 'TreeNode[]', default: 'null', desc: 'Dados hierárquicos do organograma' },
        { prop: 'selection', type: 'TreeNode', default: 'null', desc: 'Nó selecionado' },
        { prop: 'selectionMode', type: 'string', default: 'null', desc: 'Modo de seleção: single | multiple' },
        { prop: 'collapsible', type: 'boolean', default: 'false', desc: 'Habilita colapso dos nós' },
    ];
}
