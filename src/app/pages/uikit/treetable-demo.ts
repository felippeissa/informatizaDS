import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-treetable-demo',
    standalone: true,
    imports: [CommonModule, TreeTableModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">TreeTable</h1>
            <p class="comp-desc">Tabela hierárquica que exibe dados em estrutura de árvore com colunas. Combina a navegação de árvore com a visualização tabular.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">TreeTableModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/treetable'</span><span class="tok-pt">;</span>
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

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">TreeTable</div>
                            <p class="demo-card-desc">Tabela com hierarquia de linhas expansíveis. Use <code>[ttRow]</code> e <code>p-treeTableToggler</code> nas células.</p>
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
                        <div class="demo-card-code"><pre>{{ code }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Propriedades</div>
                    <p-table [value]="props" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:180px">Nome</th><th style="width:130px">Tipo</th><th style="width:120px">Padrão</th><th>Descrição</th></tr>
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
export class TreeTableDemo {
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

    code = `<p-treetable [value]="nodes">
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
</p-treetable>

// Cada nó:
{ data: { name: 'Documentos', size: '—', type: 'Pasta' },
  expanded: true,
  children: [
    { data: { name: 'relatorio.pdf', size: '245 KB', type: 'PDF' } }
  ]
}`;

    props = [
        { name: 'value',         type: 'TreeNode[]', default: 'null',  description: 'Array de nós raiz.' },
        { name: 'selectionMode', type: 'string',     default: 'null',  description: '"single" | "multiple" | "checkbox".' },
        { name: 'selection',     type: 'any',        default: 'null',  description: 'Nó(s) selecionado(s).' },
        { name: 'paginator',     type: 'boolean',    default: 'false', description: 'Habilita paginação.' },
        { name: 'rows',          type: 'number',     default: '0',     description: 'Linhas por página.' },
        { name: 'loading',       type: 'boolean',    default: 'false', description: 'Exibe indicador de carregamento.' },
        { name: 'styleClass',    type: 'string',     default: 'null',  description: 'Classe CSS extra.' },
        { name: 'scrollable',    type: 'boolean',    default: 'false', description: 'Ativa scroll.' },
        { name: 'scrollHeight',  type: 'string',     default: 'null',  description: 'Altura máxima do scroll.' },
    ];

    themeVars = [
        { variable: '--p-treetable-header-background',        description: 'Fundo do cabeçalho.' },
        { variable: '--p-treetable-header-color',             description: 'Cor do texto do cabeçalho.' },
        { variable: '--p-treetable-row-background',           description: 'Fundo das linhas.' },
        { variable: '--p-treetable-row-hover-background',     description: 'Fundo das linhas em hover.' },
        { variable: '--p-treetable-row-selected-background',  description: 'Fundo da linha selecionada.' },
        { variable: '--p-treetable-border-color',             description: 'Cor das bordas.' },
    ];
}
