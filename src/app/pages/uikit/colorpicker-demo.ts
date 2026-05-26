import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-colorpicker-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, ColorPickerModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        .demo-grid { display:flex; flex-wrap:wrap; gap:32px; padding:20px; align-items:flex-end; }
        .form-col { display:flex; flex-direction:column; gap:8px; align-items:center; }
        .form-col label { font-size:12px; font-weight:600; color:var(--text-color-secondary); }
        .color-preview { width:40px; height:40px; border-radius:8px; border:1px solid var(--surface-border); }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">ColorPicker</h1>
            <p class="comp-desc">ColorPicker é um componente de entrada para selecionar cores. Suporta os formatos hex, rgb e hsb.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">ColorPickerModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/colorpicker'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Inline vs. Popup</div>
                            <p class="demo-card-desc">Por padrão o picker abre em popup; defina <code>inline</code> para exibi-lo sempre visível.</p>
                        </div>
                        <div class="demo-card-body demo-grid">
                            <div class="form-col">
                                <label>Popup (padrão)</label>
                                <p-colorpicker [(ngModel)]="colorPopup" />
                                <div class="color-preview" [style.background]="'#' + (colorPopup || 'cccccc')"></div>
                            </div>
                            <div class="form-col">
                                <label>Inline</label>
                                <p-colorpicker [(ngModel)]="colorInline" [inline]="true" />
                            </div>
                        </div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Formatos</div>
                            <p class="demo-card-desc">O formato de retorno pode ser <code>hex</code>, <code>rgb</code> ou <code>hsb</code>.</p>
                        </div>
                        <div class="demo-card-body demo-grid">
                            <div class="form-col">
                                <label>HEX</label>
                                <p-colorpicker [(ngModel)]="colorHex" format="hex" />
                                <small style="color:var(--text-color-secondary)">#{{ colorHex }}</small>
                            </div>
                            <div class="form-col">
                                <label>RGB</label>
                                <p-colorpicker [(ngModel)]="colorRgb" format="rgb" />
                                <small style="color:var(--text-color-secondary)" *ngIf="colorRgb">r:{{colorRgb.r}} g:{{colorRgb.g}} b:{{colorRgb.b}}</small>
                            </div>
                            <div class="form-col">
                                <label>HSB</label>
                                <p-colorpicker [(ngModel)]="colorHsb" format="hsb" />
                            </div>
                        </div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Disabled</div>
                        </div>
                        <div class="demo-card-body">
                            <p-colorpicker [ngModel]="'1976D2'" [disabled]="true" />
                        </div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:20px 0">
                    <p class="api-block-title">Propriedades</p>
                    <p-table [value]="apiProps" styleClass="p-datatable-sm">
                        <ng-template #header><tr>
                            <th>Prop</th><th>Tipo</th><th>Padrão</th><th>Descrição</th>
                        </tr></ng-template>
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
export class ColorPickerDemo {
    colorPopup = '1976D2';
    colorInline = '059669';
    colorHex = 'D97706';
    colorRgb: any = { r: 25, g: 118, b: 210 };
    colorHsb: any;

    apiProps = [
        { prop: 'format', type: 'string', default: 'hex', desc: 'Formato de valor: hex | rgb | hsb' },
        { prop: 'inline', type: 'boolean', default: 'false', desc: 'Exibe o picker inline' },
        { prop: 'disabled', type: 'boolean', default: 'false', desc: 'Desabilita o componente' },
        { prop: 'appendTo', type: 'string', default: 'null', desc: 'Target do overlay (body, etc.)' },
    ];
}
