import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollerModule } from 'primeng/scroller';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-virtualscroller-demo',
    standalone: true,
    imports: [CommonModule, ScrollerModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        .list-item { padding: 12px 16px; border-bottom: 1px solid var(--surface-border); display:flex; align-items:center; gap:12px; background: var(--surface-0, #fff); }
        .list-item:hover { background: var(--surface-hover); }
        .item-icon { width:36px; height:36px; border-radius:50%; background: color-mix(in srgb, var(--primary-color) 15%, transparent); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .item-content { flex:1; }
        .item-label { font-size:13px; font-weight:600; color:var(--text-color); }
        .item-sub { font-size:12px; color:var(--text-color-secondary); margin-top:2px; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">VirtualScroller</h1>
            <p class="comp-desc">VirtualScroller (Scroller) renderiza apenas os itens visíveis no viewport, tornando listas com milhares de itens performáticas.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">ScrollerModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/scroller'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Lista com 10.000 itens</div>
                            <p class="demo-card-desc">Apenas os itens visíveis são renderizados no DOM. Role para ver a performance.</p>
                        </div>
                        <div class="demo-card-body" style="flex-direction:column;align-items:stretch;padding:0">
                            <p-scroller [items]="items" [itemSize]="61" [style]="{'height':'360px'}" styleClass="border border-surface-border">
                                <ng-template #item let-item let-opts="options">
                                    <div class="list-item" [style.height]="'61px'">
                                        <div class="item-icon">
                                            <i class="pi pi-user" style="color:var(--primary-color)"></i>
                                        </div>
                                        <div class="item-content">
                                            <div class="item-label">{{ item.name }}</div>
                                            <div class="item-sub">ID: {{ item.id }} &nbsp;·&nbsp; {{ item.dept }}</div>
                                        </div>
                                    </div>
                                </ng-template>
                            </p-scroller>
                            <div style="padding:12px 16px; font-size:12px; color:var(--text-color-secondary); border-top:1px solid var(--surface-border)">
                                Total: <strong>{{ items.length }}</strong> itens — apenas ~6 estão no DOM simultaneamente.
                            </div>
                        </div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Com delay de carregamento</div>
                            <p class="demo-card-desc">Simula carregamento lazy com <code>delay</code>.</p>
                        </div>
                        <div class="demo-card-body" style="flex-direction:column;align-items:stretch;padding:0">
                            <p-scroller [items]="items" [itemSize]="61" [style]="{'height':'240px'}" [delay]="250" styleClass="border border-surface-border">
                                <ng-template #item let-item>
                                    <div class="list-item" [style.height]="'61px'">
                                        <div class="item-content">
                                            <div class="item-label">{{ item.name }}</div>
                                            <div class="item-sub">{{ item.dept }}</div>
                                        </div>
                                    </div>
                                </ng-template>
                                <ng-template #loader let-opts="options">
                                    <div class="list-item" [style.height]="'61px'" style="gap:12px">
                                        <div style="width:36px;height:36px;border-radius:50%;background:var(--surface-border)"></div>
                                        <div style="flex:1">
                                            <div style="height:10px;background:var(--surface-border);border-radius:4px;margin-bottom:6px;width:60%"></div>
                                            <div style="height:8px;background:var(--surface-border);border-radius:4px;width:40%"></div>
                                        </div>
                                    </div>
                                </ng-template>
                            </p-scroller>
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
export class VirtualScrollerDemo implements OnInit {
    items: any[] = [];

    depts = ['TI', 'Financeiro', 'RH', 'Jurídico', 'Operações', 'Marketing'];

    ngOnInit() {
        this.items = Array.from({ length: 10000 }, (_, i) => ({
            id: i + 1,
            name: `Usuário ${i + 1}`,
            dept: this.depts[i % this.depts.length]
        }));
    }

    apiProps = [
        { prop: 'items', type: 'any[]', default: 'null', desc: 'Lista completa de itens' },
        { prop: 'itemSize', type: 'number', default: 'null', desc: 'Altura de cada item em pixels' },
        { prop: 'style', type: 'object', default: 'null', desc: 'Estilo do container (defina height)' },
        { prop: 'delay', type: 'number', default: '0', desc: 'Delay de carregamento em ms' },
        { prop: 'lazy', type: 'boolean', default: 'false', desc: 'Carregamento lazy sob demanda' },
        { prop: 'orientation', type: 'string', default: 'vertical', desc: 'Orientação: vertical | horizontal | both' },
    ];
}
