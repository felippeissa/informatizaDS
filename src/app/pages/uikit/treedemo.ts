import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-tree-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, TreeModule, TreeTableModule, ButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Tree</h1>
            <p class="comp-desc">Estrutura hierárquica de nós para representar árvores de dados, como pastas e arquivos ou categorias aninhadas.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">TreeModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/tree'</span><span class="tok-pt">;</span>
            </div>
        </div>

        <p-tabs value="features" styleClass="mt-1">
            <p-tablist>
                <p-tab value="features">Features</p-tab>
                <p-tab value="api">API</p-tab>
                <p-tab value="theming">Theming</p-tab>
            </p-tablist>
            <p-tabpanels>
                <p-tabpanel value="features"><div style="padding:20px 0">

                    <!-- Básico -->
                    <div id="tree" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Básico</div>
                            <p class="demo-card-desc">Árvore de nós expansíveis com ícones. Os nós filhos são mostrados ao clicar no toggle.</p>
                        </div>
                        <div class="demo-card-body" style="padding:20px;align-items:flex-start">
                            <p-tree [value]="nodes" styleClass="w-full" style="max-width:360px" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.basic }}</pre></div>
                    </div>

                    <!-- Seleção -->
                    <div id="selection" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Seleção</div>
                            <p class="demo-card-desc">Use <code>selectionMode="single"</code>, <code>"multiple"</code> ou <code>"checkbox"</code> para habilitar seleção de nós.</p>
                        </div>
                        <div class="demo-card-body" style="gap:24px;align-items:flex-start;flex-wrap:wrap">
                            <div>
                                <p style="font-size:12px;font-weight:700;color:var(--text-color-secondary);margin:0 0 8px;text-transform:uppercase;letter-spacing:.04em">Single</p>
                                <p-tree [value]="nodes" selectionMode="single" [(selection)]="selectedSingle"
                                        styleClass="w-full" style="min-width:220px;max-width:260px" />
                            </div>
                            <div>
                                <p style="font-size:12px;font-weight:700;color:var(--text-color-secondary);margin:0 0 8px;text-transform:uppercase;letter-spacing:.04em">Checkbox</p>
                                <p-tree [value]="nodes" selectionMode="checkbox" [(selection)]="selectedCheckbox"
                                        styleClass="w-full" style="min-width:220px;max-width:260px" />
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.selection }}</pre></div>
                    </div>

                    <!-- Filtro -->
                    <div id="filter" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Filtro</div>
                            <p class="demo-card-desc">Pesquise nós por label com <code>[filter]="true"</code>. Os nós não encontrados são ocultados automaticamente.</p>
                        </div>
                        <div class="demo-card-body" style="padding:20px;align-items:flex-start">
                            <p-tree [value]="nodes" [filter]="true" filterPlaceholder="Buscar..."
                                    styleClass="w-full" style="max-width:360px" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.filter }}</pre></div>
                    </div>

                    <!-- TreeTable -->
                    <div id="treetable" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">TreeTable</div>
                            <p class="demo-card-desc">Tabela hierárquica que exibe dados em estrutura de árvore com colunas. Use <code>[ttRow]</code> e o botão toggler nos nós.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:20px;gap:0">
                            <p-treetable [value]="ttNodes" styleClass="p-treetable-sm w-full">
                                <ng-template pTemplate="header">
                                    <tr>
                                        <th style="width:240px">Nome</th>
                                        <th style="width:100px">Tamanho</th>
                                        <th>Tipo</th>
                                    </tr>
                                </ng-template>
                                <ng-template pTemplate="body" let-rowNode let-rowData="rowData">
                                    <tr [ttRow]="rowNode">
                                        <td>
                                            <p-treeTableToggler [rowNode]="rowNode" />
                                            {{ rowData['name'] }}
                                        </td>
                                        <td>{{ rowData['size'] }}</td>
                                        <td>{{ rowData['type'] }}</td>
                                    </tr>
                                </ng-template>
                            </p-treetable>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.treetable }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Tree — Propriedades</div>
                    <p-table [value]="propsTree" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:160px">Nome</th><th style="width:130px">Tipo</th><th style="width:120px">Padrão</th><th>Descrição</th></tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-r>
                            <tr>
                                <td><strong style="font-family:monospace;font-size:13px">{{ r.name }}</strong></td>
                                <td><span class="badge-type">{{ r.type }}</span></td>
                                <td><span class="badge-default">{{ r.default }}</span></td>
                                <td style="font-size:13px;color:var(--text-color-secondary)">{{ r.description }}</td>
                            </tr>
                        </ng-template>
                    </p-table>

                    <div class="api-block-title" style="margin-top:24px">TreeNode — Interface</div>
                    <p-table [value]="propsTreeNode" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:160px">Prop</th><th style="width:130px">Tipo</th><th>Descrição</th></tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-r>
                            <tr>
                                <td><strong style="font-family:monospace;font-size:13px">{{ r.name }}</strong></td>
                                <td><span class="badge-type">{{ r.type }}</span></td>
                                <td style="font-size:13px;color:var(--text-color-secondary)">{{ r.description }}</td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div></p-tabpanel>

                <p-tabpanel value="theming"><div style="padding:16px 0">
                    <p-table [value]="themeVars" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:360px">Variável CSS</th><th>Descrição</th></tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-v>
                            <tr>
                                <td><span class="theme-var">{{ v.variable }}</span></td>
                                <td style="font-size:13px;color:var(--text-color-secondary)">{{ v.description }}</td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div></p-tabpanel>
            </p-tabpanels>
        </p-tabs>
    `
})
export class TreeDemo {
    selectedSingle: TreeNode | null = null;
    selectedCheckbox: TreeNode[] = [];

    ttNodes: TreeNode[] = [
        {
            data: { name: 'Documentos', size: '—', type: 'Pasta' },
            expanded: true,
            children: [
                {
                    data: { name: 'Relatórios', size: '—', type: 'Pasta' },
                    children: [
                        { data: { name: 'Financeiro 2024.pdf', size: '245 KB', type: 'PDF' } },
                        { data: { name: 'Operacional.pdf',     size: '180 KB', type: 'PDF' } },
                    ]
                },
                { data: { name: 'Contrato_001.docx', size: '128 KB', type: 'Word' } },
                { data: { name: 'Contrato_002.docx', size: '132 KB', type: 'Word' } },
            ]
        },
        {
            data: { name: 'Imagens', size: '—', type: 'Pasta' },
            children: [
                { data: { name: 'logo.png',   size: '56 KB',  type: 'PNG' } },
                { data: { name: 'banner.jpg', size: '320 KB', type: 'JPEG' } },
            ]
        },
    ];

    nodes: TreeNode[] = [
        {
            key: '0', label: 'Documentos', icon: 'pi pi-fw pi-folder-open', expanded: true,
            children: [
                {
                    key: '0-0', label: 'Relatórios', icon: 'pi pi-fw pi-folder',
                    children: [
                        { key: '0-0-0', label: 'Financeiro 2024.pdf', icon: 'pi pi-fw pi-file-pdf' },
                        { key: '0-0-1', label: 'Operacional 2024.pdf', icon: 'pi pi-fw pi-file-pdf' },
                    ]
                },
                {
                    key: '0-1', label: 'Contratos', icon: 'pi pi-fw pi-folder',
                    children: [
                        { key: '0-1-0', label: 'Contrato_001.docx', icon: 'pi pi-fw pi-file' },
                        { key: '0-1-1', label: 'Contrato_002.docx', icon: 'pi pi-fw pi-file' },
                    ]
                },
            ]
        },
        {
            key: '1', label: 'Imagens', icon: 'pi pi-fw pi-folder',
            children: [
                { key: '1-0', label: 'logo.png', icon: 'pi pi-fw pi-image' },
                { key: '1-1', label: 'banner.jpg', icon: 'pi pi-fw pi-image' },
            ]
        },
        {
            key: '2', label: 'Vídeos', icon: 'pi pi-fw pi-folder',
            children: [
                { key: '2-0', label: 'tutorial.mp4', icon: 'pi pi-fw pi-video' },
            ]
        },
    ];

    code: any = {
        basic: `<p-tree [value]="nodes" />

// TreeNode:
nodes: TreeNode[] = [
    { key: '0', label: 'Documentos', icon: 'pi pi-fw pi-folder',
      children: [
          { key: '0-0', label: 'Relatório.pdf', icon: 'pi pi-fw pi-file' }
      ]
    }
];`,

        selection: `<!-- Seleção simples -->
<p-tree [value]="nodes"
    selectionMode="single"
    [(selection)]="selectedNode" />

<!-- Seleção com checkbox -->
<p-tree [value]="nodes"
    selectionMode="checkbox"
    [(selection)]="selectedNodes" />`,

        treetable: `<p-treetable [value]="nodes">
    <ng-template pTemplate="header">
        <tr>
            <th>Nome</th>
            <th>Tamanho</th>
            <th>Tipo</th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-rowNode let-rowData="rowData">
        <tr [ttRow]="rowNode">
            <td>
                <p-treeTableToggler [rowNode]="rowNode" />
                {{ rowData['name'] }}
            </td>
            <td>{{ rowData['size'] }}</td>
            <td>{{ rowData['type'] }}</td>
        </tr>
    </ng-template>
</p-treetable>`,

        filter: `<p-tree [value]="nodes"
    [filter]="true"
    filterPlaceholder="Buscar..." />`,
    };

    propsTree = [
        { name: 'value',         type: 'TreeNode[]', default: 'null',     description: 'Array de nós raiz.' },
        { name: 'selectionMode', type: 'string',     default: 'null',     description: '"single" | "multiple" | "checkbox".' },
        { name: 'selection',     type: 'any',        default: 'null',     description: 'Nó(s) selecionado(s), two-way binding.' },
        { name: 'filter',        type: 'boolean',    default: 'false',    description: 'Exibe campo de filtro/busca.' },
        { name: 'filterMode',    type: 'string',     default: 'lenient',  description: '"lenient" ou "strict".' },
        { name: 'loading',       type: 'boolean',    default: 'false',    description: 'Exibe indicador de carregamento.' },
        { name: 'styleClass',    type: 'string',     default: 'null',     description: 'Classe CSS extra.' },
    ];

    propsTreeNode = [
        { name: 'key',      type: 'string',     description: 'Identificador único do nó.' },
        { name: 'label',    type: 'string',     description: 'Texto exibido.' },
        { name: 'data',     type: 'any',        description: 'Dados associados ao nó.' },
        { name: 'icon',     type: 'string',     description: 'Ícone PrimeIcons.' },
        { name: 'children', type: 'TreeNode[]', description: 'Nós filhos.' },
        { name: 'expanded', type: 'boolean',    description: 'Se true, nó inicia expandido.' },
        { name: 'leaf',     type: 'boolean',    description: 'Marca como nó folha (sem filhos).' },
    ];

    themeVars = [
        { variable: '--p-tree-node-hover-background',     description: 'Fundo do nó no hover.' },
        { variable: '--p-tree-node-selected-background',  description: 'Fundo do nó selecionado.' },
        { variable: '--p-tree-node-color',                description: 'Cor do texto dos nós.' },
        { variable: '--p-tree-node-selected-color',       description: 'Cor do texto selecionado.' },
        { variable: '--p-tree-node-padding',              description: 'Padding interno do nó.' },
        { variable: '--p-tree-indent',                    description: 'Indentação dos filhos.' },
    ];
}
