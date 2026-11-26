import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogModule, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

/* ── Componente de conteúdo do dialog ─────────────────── */
@Component({
    selector: 'app-product-dialog',
    standalone: true,
    imports: [CommonModule, ButtonModule, TagModule],
    template: `
        <div style="padding:8px 0">
            <p style="color:var(--text-color-secondary);font-size:14px;margin:0 0 16px">
                Este é o conteúdo carregado dinamicamente pelo <strong>DialogService</strong>.
                Dados recebidos via <code>config.data</code>:
            </p>
            <div style="display:flex;flex-direction:column;gap:8px">
                <div *ngFor="let item of products" style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border:1px solid var(--surface-border);border-radius:8px">
                    <div>
                        <div style="font-size:13px;font-weight:700;color:var(--text-color)">{{ item.name }}</div>
                        <div style="font-size:12px;color:var(--text-color-secondary)">{{ item.category }}</div>
                    </div>
                    <p-tag [value]="'R$ ' + item.price" severity="success" />
                </div>
            </div>
            <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:20px">
                <p-button label="Cancelar" severity="secondary" (click)="close()" />
                <p-button label="Confirmar" (click)="confirm()" />
            </div>
        </div>
    `
})
export class ProductDialogContent {
    products: any[];
    constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
        this.products = config.data?.products || [];
    }
    close() { this.ref.close(); }
    confirm() { this.ref.close({ confirmed: true, products: this.products }); }
}

/* ── Demo principal ───────────────────────────────────── */
@Component({
    selector: 'app-dynamicdialog-demo',
    standalone: true,
    imports: [CommonModule, DynamicDialogModule, ButtonModule, TabsModule, TableModule],
    providers: [DialogService],
    styles: [DEMO_STYLES + `
        .result-box { padding: 12px 16px; background: color-mix(in srgb, var(--primary-color) 8%, transparent); border: 1px solid color-mix(in srgb, var(--primary-color) 20%, transparent); border-radius: 8px; font-size: 13px; color: var(--text-color); margin-top: 12px; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">DynamicDialog</h1>
            <p class="comp-desc">DynamicDialog permite abrir qualquer componente Angular dentro de um dialog via <code>DialogService</code>, sem template fixo.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">DialogService</span><span class="tok-pt">,&nbsp;</span><span class="tok-id">DynamicDialogModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/dynamicdialog'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Abrir componente dinamicamente</div>
                            <p class="demo-card-desc">O <code>DialogService.open()</code> recebe o componente e configurações, retornando uma <code>DynamicDialogRef</code>.</p>
                        </div>
                        <div class="demo-card-body" style="flex-direction:column;align-items:flex-start;padding:20px;gap:16px">
                            <p-button label="Abrir Dialog com Produtos" icon="pi pi-shopping-cart" (click)="openDialog()" />
                            <p-button label="Dialog sem header" severity="secondary" (click)="openMinimal()" />
                            <div class="result-box" *ngIf="result">
                                Resultado: <strong>{{ result }}</strong>
                            </div>
                        </div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:20px 0">
                    <p class="api-block-title">DialogService.open() — config</p>
                    <p-table [value]="apiProps" styleClass="p-datatable-sm">
                        <ng-template #header><tr><th>Opção</th><th>Tipo</th><th>Descrição</th></tr></ng-template>
                        <ng-template #body let-r><tr>
                            <td><code>{{r.prop}}</code></td>
                            <td><span class="badge-type">{{r.type}}</span></td>
                            <td>{{r.desc}}</td>
                        </tr></ng-template>
                    </p-table>
                </div></p-tabpanel>
            </p-tabpanels>
        </p-tabs>
    `
})
export class DynamicDialogDemo {
    result = '';
    ref: any;

    products = [
        { name: 'Notebook Dell', category: 'Informática', price: '4.299,00' },
        { name: 'Monitor LG 27"', category: 'Periféricos', price: '1.499,00' },
        { name: 'Teclado Mecânico', category: 'Periféricos', price: '349,00' },
    ];

    constructor(private dialogService: DialogService) {}

    openDialog() {
        this.result = '';
        this.ref = this.dialogService.open(ProductDialogContent, {
            header: 'Produtos disponíveis',
            width: '520px',
            modal: true,
            closable: true,
            data: { products: this.products }
        });
        this.ref.onClose.subscribe((res: any) => {
            if (res?.confirmed) this.result = `Confirmado com ${res.products.length} produtos.`;
            else this.result = 'Dialog fechado sem confirmar.';
        });
    }

    openMinimal() {
        this.result = '';
        this.ref = this.dialogService.open(ProductDialogContent, {
            width: '480px',
            modal: true,
            closable: true,
            data: { products: this.products.slice(0, 1) }
        });
        this.ref.onClose.subscribe((res: any) => {
            this.result = res?.confirmed ? 'Confirmado!' : 'Cancelado.';
        });
    }

    apiProps = [
        { prop: 'header', type: 'string', desc: 'Título do dialog' },
        { prop: 'width', type: 'string', desc: 'Largura do dialog (CSS)' },
        { prop: 'modal', type: 'boolean', desc: 'Exibe backdrop' },
        { prop: 'closable', type: 'boolean', desc: 'Botão de fechar' },
        { prop: 'data', type: 'any', desc: 'Dados passados via DynamicDialogConfig.data' },
        { prop: 'dismissableMask', type: 'boolean', desc: 'Fecha ao clicar no backdrop' },
    ];
}
