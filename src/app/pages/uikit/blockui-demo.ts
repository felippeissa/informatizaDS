import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockUIModule } from 'primeng/blockui';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-blockui-demo',
    standalone: true,
    imports: [CommonModule, BlockUIModule, PanelModule, ButtonModule, ProgressSpinnerModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        .demo-grid { display:flex; flex-wrap:wrap; gap:24px; padding:20px; align-items:flex-start; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">BlockUI</h1>
            <p class="comp-desc">BlockUI bloqueia visualmente um elemento ou a página inteira durante processamentos, exibindo um overlay com template customizável.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">BlockUIModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/blockui'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Bloquear painel</div>
                            <p class="demo-card-desc">Use <code>[target]</code> para apontar para o elemento a ser bloqueado.</p>
                        </div>
                        <div class="demo-card-body" style="flex-direction:column;gap:12px;padding:20px">
                            <p-button [label]="blockedPanel ? 'Desbloquear Painel' : 'Bloquear Painel'"
                                [icon]="blockedPanel ? 'pi pi-lock-open' : 'pi pi-lock'"
                                (click)="togglePanel()" />

                            <p-blockui [target]="panel" [blocked]="blockedPanel">
                                <p-progressspinner styleClass="w-8 h-8" />
                            </p-blockui>

                            <p-panel #panel header="Conteúdo do Painel" style="width:100%">
                                <p style="color:var(--text-color-secondary);font-size:13px;margin:0">
                                    Este conteúdo será bloqueado quando o BlockUI estiver ativo.
                                    O usuário não pode interagir com este elemento.
                                </p>
                                <div style="display:flex;gap:8px;margin-top:16px">
                                    <p-button label="Ação 1" size="small" severity="secondary" />
                                    <p-button label="Ação 2" size="small" severity="secondary" />
                                </div>
                            </p-panel>
                        </div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Bloquear documento inteiro</div>
                            <p class="demo-card-desc">Sem <code>[target]</code>, o BlockUI cobre toda a página.</p>
                        </div>
                        <div class="demo-card-body" style="padding:20px">
                            <p-blockui [blocked]="blockedDoc">
                                <div style="background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;width:100%;height:100%">
                                    <p-progressspinner />
                                </div>
                            </p-blockui>
                            <p-button label="Bloquear Página por 2s" icon="pi pi-spinner" (click)="blockDoc()" />
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
export class BlockUIDemo {
    blockedPanel = false;
    blockedDoc = false;

    togglePanel() { this.blockedPanel = !this.blockedPanel; }

    blockDoc() {
        this.blockedDoc = true;
        setTimeout(() => this.blockedDoc = false, 2000);
    }

    apiProps = [
        { prop: 'blocked', type: 'boolean', default: 'false', desc: 'Controla o estado de bloqueio' },
        { prop: 'target', type: 'any', default: 'null', desc: 'Referência ao elemento alvo (#ref). Sem target bloqueia o documento.' },
        { prop: 'baseZIndex', type: 'number', default: '0', desc: 'z-index base do overlay' },
    ];
}
