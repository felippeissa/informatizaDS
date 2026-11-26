import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-scrolltop-demo',
    standalone: true,
    imports: [CommonModule, ScrollTopModule, ScrollPanelModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        .scroll-content { padding: 12px; }
        .scroll-content p { margin: 0 0 12px; font-size:13px; color:var(--text-color-secondary); line-height:1.7; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">ScrollTop</h1>
            <p class="comp-desc">ScrollTop exibe um botão para rolar de volta ao topo quando o usuário rola a página ou um container além de um limite configurável.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">ScrollTopModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/scrolltop'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Em um ScrollPanel</div>
                            <p class="demo-card-desc">Use <code>target="parent"</code> para monitorar o elemento pai em vez da janela.</p>
                        </div>
                        <div class="demo-card-body" style="padding:20px;flex-direction:column;align-items:stretch">
                            <p-scrollpanel [style]="{'height':'200px'}" styleClass="border border-surface-border rounded-lg">
                                <div class="scroll-content">
                                    <p *ngFor="let p of paragraphs">{{ p }}</p>
                                </div>
                                <p-scrolltop target="parent" [threshold]="100" />
                            </p-scrollpanel>
                            <small style="color:var(--text-color-secondary);margin-top:8px">
                                <i class="pi pi-info-circle"></i> Role o conteúdo do painel para ver o botão aparecer.
                            </small>
                        </div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Na janela (window)</div>
                            <p class="demo-card-desc">Sem <code>target</code>, o botão aparece ao rolar a janela do browser.</p>
                        </div>
                        <div class="demo-card-body" style="padding:20px">
                            <p-scrolltop [threshold]="300" icon="pi pi-angle-double-up" />
                            <p style="color:var(--text-color-secondary);font-size:13px;margin:0">
                                O botão <strong>ScrollTop</strong> global aparece no canto inferior direito da página quando você rola mais de 300px.
                                Role esta página para vê-lo.
                            </p>
                        </div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Ícone e comportamento customizados</div>
                        </div>
                        <div class="demo-card-body" style="padding:20px;flex-direction:column;align-items:stretch">
                            <p-scrollpanel [style]="{'height':'180px'}" styleClass="border border-surface-border rounded-lg">
                                <div class="scroll-content">
                                    <p *ngFor="let p of paragraphs">{{ p }}</p>
                                </div>
                                <p-scrolltop target="parent" [threshold]="50" icon="pi pi-arrow-up"
                                    behavior="smooth" styleClass="custom-scrolltop" />
                            </p-scrollpanel>
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
export class ScrollTopDemo {
    paragraphs = Array.from({ length: 12 }, (_, i) =>
        `Parágrafo ${i + 1}: O Design System Informatiza 3.0 fornece componentes Angular prontos para uso nos sistemas do Governo de Goiás.`
    );

    apiProps = [
        { prop: 'target', type: 'string', default: 'window', desc: 'Alvo do scroll: window | parent' },
        { prop: 'threshold', type: 'number', default: '400', desc: 'Pixels rolados para exibir o botão' },
        { prop: 'icon', type: 'string', default: 'pi pi-chevron-up', desc: 'Ícone do botão' },
        { prop: 'behavior', type: 'string', default: 'smooth', desc: 'Comportamento do scroll: smooth | auto' },
    ];
}
