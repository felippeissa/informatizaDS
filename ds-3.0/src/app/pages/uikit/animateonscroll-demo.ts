import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-animateonscroll-demo',
    standalone: true,
    imports: [CommonModule, AnimateOnScrollModule, CardModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        .anim-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(200px,1fr)); gap:16px; padding:20px; }
        .anim-card { padding:20px; background:var(--surface-card); border:1px solid var(--surface-border); border-radius:10px; text-align:center; }
        .anim-icon { font-size:32px; color:var(--primary-color); margin-bottom:8px; }
        .anim-title { font-size:13px; font-weight:700; color:var(--text-color); }
        .anim-desc { font-size:12px; color:var(--text-color-secondary); margin-top:4px; }
        .scroll-hint { text-align:center; padding:12px; font-size:12px; color:var(--text-color-secondary); border-top:1px solid var(--surface-border); }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">AnimateOnScroll</h1>
            <p class="comp-desc">AnimateOnScroll adiciona animações CSS aos elementos quando eles entram no viewport. Usa a Intersection Observer API.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">AnimateOnScrollModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/animateonscroll'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Animações de entrada</div>
                            <p class="demo-card-desc">Use <code>pAnimateOnScroll</code> com <code>enterClass</code> e <code>leaveClass</code> (classes do PrimeNG animate).</p>
                        </div>
                        <div class="anim-grid">
                            <div class="anim-card" pAnimateOnScroll enterClass="animate-fadein" leaveClass="animate-fadeout">
                                <div class="anim-icon"><i class="pi pi-eye"></i></div>
                                <div class="anim-title">Fade In</div>
                                <div class="anim-desc">animate-fadein</div>
                            </div>
                            <div class="anim-card" pAnimateOnScroll enterClass="animate-scalein" leaveClass="animate-fadeout">
                                <div class="anim-icon"><i class="pi pi-expand"></i></div>
                                <div class="anim-title">Scale In</div>
                                <div class="anim-desc">animate-scalein</div>
                            </div>
                            <div class="anim-card" pAnimateOnScroll enterClass="animate-slidedown" leaveClass="animate-fadeout">
                                <div class="anim-icon"><i class="pi pi-arrow-down"></i></div>
                                <div class="anim-title">Slide Down</div>
                                <div class="anim-desc">animate-slidedown</div>
                            </div>
                            <div class="anim-card" pAnimateOnScroll enterClass="animate-slideup" leaveClass="animate-fadeout">
                                <div class="anim-icon"><i class="pi pi-arrow-up"></i></div>
                                <div class="anim-title">Slide Up</div>
                                <div class="anim-desc">animate-slideup</div>
                            </div>
                            <div class="anim-card" pAnimateOnScroll enterClass="animate-slideinright" leaveClass="animate-fadeout">
                                <div class="anim-icon"><i class="pi pi-arrow-right"></i></div>
                                <div class="anim-title">Slide In Right</div>
                                <div class="anim-desc">animate-slideinright</div>
                            </div>
                            <div class="anim-card" pAnimateOnScroll enterClass="animate-slideinleft" leaveClass="animate-fadeout">
                                <div class="anim-icon"><i class="pi pi-arrow-left"></i></div>
                                <div class="anim-title">Slide In Left</div>
                                <div class="anim-desc">animate-slideinleft</div>
                            </div>
                        </div>
                        <div class="scroll-hint"><i class="pi pi-info-circle"></i> Role a página para re-disparar as animações.</div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:20px 0">
                    <p class="api-block-title">Diretiva pAnimateOnScroll — Propriedades</p>
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
export class AnimateOnScrollDemo {
    apiProps = [
        { prop: 'enterClass', type: 'string', default: 'null', desc: 'Classe CSS aplicada ao entrar no viewport' },
        { prop: 'leaveClass', type: 'string', default: 'null', desc: 'Classe CSS aplicada ao sair do viewport' },
        { prop: 'threshold', type: 'number', default: '0', desc: 'Proporção visível para disparar (0 a 1)' },
        { prop: 'root', type: 'HTMLElement', default: 'null', desc: 'Elemento raiz do observer' },
        { prop: 'rootMargin', type: 'string', default: 'null', desc: 'Margem do root observer' },
    ];
}
