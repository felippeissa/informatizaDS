import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeNode } from 'primeng/api';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-treeselect-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, TreeSelectModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        .demo-grid { display:flex; flex-wrap:wrap; gap:24px; padding:20px; }
        .form-col { display:flex; flex-direction:column; gap:6px; }
        .form-col label { font-size:13px; font-weight:600; color:var(--text-color-secondary); }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">TreeSelect</h1>
            <p class="comp-desc">TreeSelect é um componente de seleção que exibe as opções em estrutura hierárquica de árvore.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">TreeSelectModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/treeselect'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Seleção única</div>
                        </div>
                        <div class="demo-card-body demo-grid">
                            <div class="form-col">
                                <label>Departamento</label>
                                <p-treeselect [(ngModel)]="selected1" [options]="nodes" placeholder="Selecione" style="min-width:220px" />
                                <small style="color:var(--text-color-secondary)" *ngIf="selected1">Selecionado: {{ selected1?.label }}</small>
                            </div>
                        </div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Seleção múltipla</div>
                            <p class="demo-card-desc">Use <code>selectionMode="multiple"</code> para selecionar vários nós.</p>
                        </div>
                        <div class="demo-card-body demo-grid">
                            <div class="form-col">
                                <label>Múltiplas categorias</label>
                                <p-treeselect [(ngModel)]="selected2" [options]="nodes" selectionMode="multiple"
                                    placeholder="Selecione múltiplos" style="min-width:240px" />
                            </div>
                            <div class="form-col">
                                <label>Checkbox</label>
                                <p-treeselect [(ngModel)]="selected3" [options]="nodes" selectionMode="checkbox"
                                    placeholder="Checkbox" style="min-width:240px" />
                            </div>
                        </div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Com filtro</div>
                        </div>
                        <div class="demo-card-body demo-grid">
                            <div class="form-col">
                                <label>Filtro na árvore</label>
                                <p-treeselect [(ngModel)]="selected4" [options]="nodes" [filter]="true"
                                    placeholder="Pesquisar..." style="min-width:240px" />
                            </div>
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
export class TreeSelectDemo {
    selected1: any;  selected2: any;  selected3: any;  selected4: any;

    nodes: TreeNode[] = [
        {
            key: 'ti', label: 'Tecnologia da Informação', icon: 'pi pi-desktop',
            children: [
                { key: 'ti-dev', label: 'Desenvolvimento', icon: 'pi pi-code',
                  children: [
                    { key: 'ti-dev-fe', label: 'Front-end', icon: 'pi pi-globe' },
                    { key: 'ti-dev-be', label: 'Back-end', icon: 'pi pi-server' }
                  ]
                },
                { key: 'ti-infra', label: 'Infraestrutura', icon: 'pi pi-server' }
            ]
        },
        {
            key: 'rh', label: 'Recursos Humanos', icon: 'pi pi-users',
            children: [
                { key: 'rh-rec', label: 'Recrutamento', icon: 'pi pi-search' },
                { key: 'rh-ben', label: 'Benefícios', icon: 'pi pi-heart' }
            ]
        },
        {
            key: 'fin', label: 'Financeiro', icon: 'pi pi-dollar',
            children: [
                { key: 'fin-cont', label: 'Contabilidade', icon: 'pi pi-calculator' },
                { key: 'fin-fisc', label: 'Fiscal', icon: 'pi pi-file' }
            ]
        }
    ];

    apiProps = [
        { prop: 'options', type: 'TreeNode[]', default: 'null', desc: 'Nós da árvore' },
        { prop: 'selectionMode', type: 'string', default: 'null', desc: 'Modo: null | multiple | checkbox' },
        { prop: 'filter', type: 'boolean', default: 'false', desc: 'Habilita busca na árvore' },
        { prop: 'placeholder', type: 'string', default: 'null', desc: 'Texto de placeholder' },
        { prop: 'disabled', type: 'boolean', default: 'false', desc: 'Desabilita o componente' },
    ];
}
