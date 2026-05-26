import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCompareModule } from 'primeng/imagecompare';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-imagecompare-demo',
    standalone: true,
    imports: [CommonModule, ImageCompareModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        :host ::ng-deep .p-imagecompare { border-radius: 10px; overflow: hidden; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">ImageCompare</h1>
            <p class="comp-desc">ImageCompare exibe duas imagens lado a lado com um slider para comparação visual — útil para antes/depois.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">ImageCompareModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/imagecompare'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Básico — Antes / Depois</div>
                            <p class="demo-card-desc">Arraste o divisor para comparar as duas imagens.</p>
                        </div>
                        <div class="demo-card-body" style="padding:20px;flex-direction:column;align-items:stretch">
                            <p-imagecompare>
                                <ng-template #start>
                                    <img src="https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg" alt="Before" style="width:100%;display:block" />
                                </ng-template>
                                <ng-template #end>
                                    <img src="https://primefaces.org/cdn/primeng/images/galleria/galleria1s.jpg" alt="After" style="width:100%;display:block" />
                                </ng-template>
                            </p-imagecompare>
                        </div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Vertical</div>
                            <p class="demo-card-desc">Comparação vertical com <code>orientation="vertical"</code>.</p>
                        </div>
                        <div class="demo-card-body" style="padding:20px;flex-direction:column;align-items:stretch">
                            <p-imagecompare orientation="vertical">
                                <ng-template #start>
                                    <img src="https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg" alt="Before" style="width:100%;display:block" />
                                </ng-template>
                                <ng-template #end>
                                    <img src="https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg" alt="After" style="width:100%;display:block" />
                                </ng-template>
                            </p-imagecompare>
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
                    <p class="api-block-title" style="margin-top:20px">Templates</p>
                    <p-table [value]="templates" styleClass="p-datatable-sm">
                        <ng-template #header><tr><th>Nome</th><th>Descrição</th></tr></ng-template>
                        <ng-template #body let-r><tr>
                            <td><code>#{{r.name}}</code></td><td>{{r.desc}}</td>
                        </tr></ng-template>
                    </p-table>
                </div></p-tabpanel>
            </p-tabpanels>
        </p-tabs>
    `
})
export class ImageCompareDemo {
    apiProps = [
        { prop: 'orientation', type: 'string', default: 'horizontal', desc: 'Orientação: horizontal | vertical' },
    ];

    templates = [
        { name: 'start', desc: 'Imagem do lado esquerdo/superior (antes)' },
        { name: 'end', desc: 'Imagem do lado direito/inferior (depois)' },
    ];
}
