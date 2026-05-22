import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { TabsModule } from 'primeng/tabs';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DEMO_STYLES } from './demo-shared.styles';

interface Product {
    id: number; name: string; category: string; price: number; status: string;
}

@Component({
    selector: 'app-table-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, TableModule, ButtonModule, InputTextModule, TagModule, TabsModule, IconFieldModule, InputIconModule],
    styles: [DEMO_STYLES + `
        .status-badge { padding: 2px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
        .status-em  { background:#DCFCE7; color:#15803D; }
        .status-bx  { background:#FEF9C3; color:#A16207; }
        .status-ez  { background:#FEE2E2; color:#B91C1C; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">DataTable</h1>
            <p class="comp-desc">Tabela de dados com ordenação, filtro, paginação, seleção de linhas e edição inline.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">TableModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/table'</span><span class="tok-pt">;</span>
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

                    <!-- Basic -->
                    <div id="datatable" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">DataTable</div>
                            <p class="demo-card-desc">Tabela básica com linhas e colunas configuráveis.</p>
                        </div>
                        <div style="background:var(--surface-card)">
                            <p-table [value]="products" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                                <ng-template pTemplate="header">
                                    <tr><th>#</th><th>Nome</th><th>Categoria</th><th style="text-align:right">Preço</th><th>Status</th></tr>
                                </ng-template>
                                <ng-template pTemplate="body" let-p>
                                    <tr>
                                        <td>{{ p.id }}</td><td>{{ p.name }}</td><td>{{ p.category }}</td>
                                        <td style="text-align:right">{{ p.price | currency:'BRL' }}</td>
                                        <td><span class="status-badge" [class.status-em]="p.status==='Em estoque'" [class.status-bx]="p.status==='Baixo'" [class.status-ez]="p.status==='Esgotado'">{{ p.status }}</span></td>
                                    </tr>
                                </ng-template>
                            </p-table>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.basic }}</pre></div>
                    </div>

                    <!-- Ordenação -->
                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Ordenação</div>
                            <p class="demo-card-desc">Adicione <code>pSortableColumn</code> em cada <code>&lt;th&gt;</code> para ativar a ordenação.</p>
                        </div>
                        <div style="background:var(--surface-card)">
                            <p-table [value]="products" sortField="price" [defaultSortOrder]="-1" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                                <ng-template pTemplate="header">
                                    <tr>
                                        <th pSortableColumn="name">Nome <p-sortIcon field="name" /></th>
                                        <th pSortableColumn="category">Categoria <p-sortIcon field="category" /></th>
                                        <th pSortableColumn="price" style="text-align:right">Preço <p-sortIcon field="price" /></th>
                                    </tr>
                                </ng-template>
                                <ng-template pTemplate="body" let-p>
                                    <tr><td>{{ p.name }}</td><td>{{ p.category }}</td><td style="text-align:right">{{ p.price | currency:'BRL' }}</td></tr>
                                </ng-template>
                            </p-table>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.sort }}</pre></div>
                    </div>

                    <!-- Filtro global -->
                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Filtro Global</div>
                            <p class="demo-card-desc">Pesquisa em todas as colunas com um único campo via <code>filterGlobal()</code>.</p>
                        </div>
                        <div style="background:var(--surface-card);padding:12px 16px;border-bottom:1px solid var(--surface-border)">
                            <p-iconfield>
                                <p-inputicon class="pi pi-search" />
                                <input #filterInput pInputText type="text" (input)="dt.filterGlobal(filterInput.value, 'contains')" placeholder="Buscar produto..." style="width:280px" />
                            </p-iconfield>
                        </div>
                        <div style="background:var(--surface-card)">
                            <p-table #dt [value]="products" [globalFilterFields]="['name','category','status']" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                                <ng-template pTemplate="header">
                                    <tr><th>Nome</th><th>Categoria</th><th>Status</th></tr>
                                </ng-template>
                                <ng-template pTemplate="body" let-p>
                                    <tr>
                                        <td>{{ p.name }}</td><td>{{ p.category }}</td>
                                        <td><span class="status-badge" [class.status-em]="p.status==='Em estoque'" [class.status-bx]="p.status==='Baixo'" [class.status-ez]="p.status==='Esgotado'">{{ p.status }}</span></td>
                                    </tr>
                                </ng-template>
                                <ng-template pTemplate="emptymessage">
                                    <tr><td colspan="3" style="text-align:center;padding:20px;color:var(--text-color-secondary)">Nenhum resultado encontrado.</td></tr>
                                </ng-template>
                            </p-table>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.filter }}</pre></div>
                    </div>

                    <!-- Seleção -->
                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Seleção de Linha</div>
                            <p class="demo-card-desc">Clique para selecionar. Use <code>selectionMode="multiple"</code> para múltiplas linhas.</p>
                        </div>
                        <div style="background:var(--surface-card)">
                            <p-table [value]="products" selectionMode="single" [(selection)]="selectedProduct" dataKey="id" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                                <ng-template pTemplate="header">
                                    <tr><th>Nome</th><th>Categoria</th><th style="text-align:right">Preço</th></tr>
                                </ng-template>
                                <ng-template pTemplate="body" let-p>
                                    <tr [pSelectableRow]="p">
                                        <td>{{ p.name }}</td><td>{{ p.category }}</td><td style="text-align:right">{{ p.price | currency:'BRL' }}</td>
                                    </tr>
                                </ng-template>
                            </p-table>
                        </div>
                        @if (selectedProduct) {
                            <div style="padding:10px 16px;font-size:13px;color:var(--text-color-secondary);background:var(--surface-ground);border-top:1px solid var(--surface-border)">
                                Selecionado: <strong>{{ selectedProduct.name }}</strong>
                            </div>
                        }
                        <div class="demo-card-code"><pre>{{ code.selection }}</pre></div>
                    </div>

                    <!-- Paginação -->
                    <div id="paginator" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Paginação</div>
                            <p class="demo-card-desc">Ative com <code>[paginator]="true"</code> e configure <code>[rows]</code> e <code>[rowsPerPageOptions]</code>.</p>
                        </div>
                        <div style="background:var(--surface-card)">
                            <p-table [value]="manyProducts" [paginator]="true" [rows]="5" [rowsPerPageOptions]="[5,10,25]" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                                <ng-template pTemplate="header">
                                    <tr><th>#</th><th>Nome</th><th>Categoria</th><th style="text-align:right">Preço</th></tr>
                                </ng-template>
                                <ng-template pTemplate="body" let-p>
                                    <tr><td>{{ p.id }}</td><td>{{ p.name }}</td><td>{{ p.category }}</td><td style="text-align:right">{{ p.price | currency:'BRL' }}</td></tr>
                                </ng-template>
                            </p-table>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.paginator }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Propriedades</div>
                    <p-table [value]="props" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header"><tr><th style="width:200px">Nome</th><th style="width:140px">Tipo</th><th style="width:100px">Padrão</th><th>Descrição</th></tr></ng-template>
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
                        <ng-template pTemplate="header"><tr><th style="width:360px">Variável CSS</th><th>Descrição</th></tr></ng-template>
                        <ng-template pTemplate="body" let-v>
                            <tr><td><span class="theme-var">{{ v.variable }}</span></td><td style="font-size:13px;color:var(--text-color-secondary)">{{ v.description }}</td></tr>
                        </ng-template>
                    </p-table>
                </div></p-tabpanel>
            </p-tabpanels>
        </p-tabs>
    `
})
export class TableDemo implements OnInit {
    products: Product[] = [];
    manyProducts: Product[] = [];
    selectedProduct: Product | null = null;

    code: any = {
        basic: `<p-table [value]="products" styleClass="p-datatable-sm">
    <ng-template pTemplate="header">
        <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço</th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-produto>
        <tr>
            <td>{{ produto.name }}</td>
            <td>{{ produto.category }}</td>
            <td>{{ produto.price | currency:'BRL' }}</td>
        </tr>
    </ng-template>
</p-table>`,

        sort: `<p-table [value]="products" sortField="price" [defaultSortOrder]="-1">
    <ng-template pTemplate="header">
        <tr>
            <th pSortableColumn="name">
                Nome <p-sortIcon field="name" />
            </th>
            <th pSortableColumn="price">
                Preço <p-sortIcon field="price" />
            </th>
        </tr>
    </ng-template>
</p-table>`,

        filter: `<input pInputText type="text"
    (input)="dt.filterGlobal($event.target.value, 'contains')"
    placeholder="Buscar..." />

<p-table #dt [value]="products"
    [globalFilterFields]="['name','category','status']">
    ...
</p-table>`,

        selection: `<p-table [value]="products"
    selectionMode="single"
    [(selection)]="selectedRow"
    dataKey="id">
    <ng-template pTemplate="body" let-row>
        <tr [pSelectableRow]="row">
            <td>{{ row.name }}</td>
        </tr>
    </ng-template>
</p-table>`,

        paginator: `<p-table [value]="products"
    [paginator]="true"
    [rows]="10"
    [rowsPerPageOptions]="[10, 25, 50]">
    ...
</p-table>`,
    };

    props = [
        { name: 'value',              type: 'any[]',   default: 'null',  description: 'Array de objetos da tabela.' },
        { name: 'paginator',          type: 'boolean', default: 'false', description: 'Habilita paginação.' },
        { name: 'rows',               type: 'number',  default: '0',     description: 'Linhas por página.' },
        { name: 'rowsPerPageOptions', type: 'number[]',default: 'null',  description: 'Opções de linhas por página.' },
        { name: 'sortField',          type: 'string',  default: 'null',  description: 'Campo de ordenação inicial.' },
        { name: 'sortOrder',          type: 'number',  default: '1',     description: '1 = asc, -1 = desc.' },
        { name: 'selectionMode',      type: 'string',  default: 'null',  description: '"single" ou "multiple".' },
        { name: 'selection',          type: 'any',     default: 'null',  description: 'Linha(s) selecionada(s).' },
        { name: 'globalFilterFields', type: 'string[]',default: 'null',  description: 'Campos para filtro global.' },
        { name: 'loading',            type: 'boolean', default: 'false', description: 'Mostra indicador de loading.' },
        { name: 'styleClass',         type: 'string',  default: 'null',  description: 'Classe extra: p-datatable-sm | striped.' },
        { name: 'scrollable',         type: 'boolean', default: 'false', description: 'Ativa scroll horizontal/vertical.' },
        { name: 'scrollHeight',       type: 'string',  default: 'null',  description: 'Altura máxima: "400px" ou "flex".' },
    ];

    themeVars = [
        { variable: '--p-datatable-header-background',       description: 'Fundo do cabeçalho.' },
        { variable: '--p-datatable-header-color',            description: 'Cor do texto do cabeçalho.' },
        { variable: '--p-datatable-row-background',          description: 'Fundo das linhas.' },
        { variable: '--p-datatable-row-hover-background',    description: 'Fundo das linhas no hover.' },
        { variable: '--p-datatable-row-selected-background', description: 'Fundo da linha selecionada.' },
        { variable: '--p-datatable-border-color',            description: 'Cor das bordas.' },
        { variable: '--p-datatable-cell-padding',            description: 'Padding das células.' },
        { variable: '--p-datatable-striped-row-background',  description: 'Linhas alternadas (striped).' },
    ];

    ngOnInit() {
        const cats = ['Eletrônicos', 'Mobiliário', 'Vestuário', 'Alimentação', 'Serviços'];
        const statuses = ['Em estoque', 'Baixo', 'Esgotado'];
        const names = ['Notebook Pro', 'Cadeira Gamer', 'Camiseta Gov', 'Kit Café', 'Suporte Técnico',
                       'Monitor 27"', 'Mesa Escritório', 'Tênis Esportivo', 'Caneca Goiás', 'Consultoria'];
        this.products = names.slice(0, 6).map((n, i) => ({
            id: i + 1, name: n, category: cats[i % cats.length],
            price: 49.9 + i * 87.5, status: statuses[i % statuses.length]
        }));
        this.manyProducts = names.map((n, i) => ({
            id: i + 1, name: n, category: cats[i % cats.length],
            price: 49.9 + i * 87.5, status: statuses[i % statuses.length]
        }));
    }
}
