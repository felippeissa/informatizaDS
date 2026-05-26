import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-editor-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, EditorModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        :host ::ng-deep .ql-container { min-height: 120px; border-radius: 0 0 6px 6px; }
        :host ::ng-deep .ql-toolbar { border-radius: 6px 6px 0 0; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Editor</h1>
            <p class="comp-desc">Editor é um componente de texto rico baseado em Quill. Requer a biblioteca Quill instalada: <code>npm install quill</code>.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">EditorModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/editor'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Básico</div>
                            <p class="demo-card-desc">Editor de texto rico com toolbar padrão do Quill.</p>
                        </div>
                        <div class="demo-card-body" style="flex-direction:column; align-items:stretch; padding:20px">
                            <p-editor [(ngModel)]="text1" [style]="{'height':'160px'}" />
                            <small style="color:var(--text-color-secondary); margin-top:8px">HTML: {{ text1 | slice:0:80 }}...</small>
                        </div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Toolbar customizada</div>
                            <p class="demo-card-desc">Customize os botões da toolbar via <code>headerTemplate</code>.</p>
                        </div>
                        <div class="demo-card-body" style="flex-direction:column; align-items:stretch; padding:20px">
                            <p-editor [(ngModel)]="text2" [style]="{'height':'140px'}">
                                <ng-template #header>
                                    <span class="ql-formats">
                                        <button class="ql-bold" title="Negrito"></button>
                                        <button class="ql-italic" title="Itálico"></button>
                                        <button class="ql-underline" title="Sublinhado"></button>
                                    </span>
                                    <span class="ql-formats">
                                        <select class="ql-color" title="Cor"></select>
                                        <select class="ql-background" title="Fundo"></select>
                                    </span>
                                    <span class="ql-formats">
                                        <button class="ql-list" value="ordered" title="Lista ordenada"></button>
                                        <button class="ql-list" value="bullet" title="Lista não-ordenada"></button>
                                    </span>
                                </ng-template>
                            </p-editor>
                        </div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Readonly</div>
                        </div>
                        <div class="demo-card-body" style="flex-direction:column; align-items:stretch; padding:20px">
                            <p-editor [ngModel]="readonlyText" [readonly]="true" [style]="{'height':'100px'}" />
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
export class EditorDemo {
    text1 = '<p>Comece a digitar aqui...</p>';
    text2 = '';
    readonlyText = '<p><strong>Conteúdo somente leitura.</strong> Este texto não pode ser editado.</p>';

    apiProps = [
        { prop: 'ngModel', type: 'string', default: 'null', desc: 'HTML gerado pelo editor' },
        { prop: 'readonly', type: 'boolean', default: 'false', desc: 'Modo somente leitura' },
        { prop: 'style', type: 'object', default: 'null', desc: 'Estilos inline do container' },
        { prop: 'modules', type: 'object', default: 'null', desc: 'Configuração de módulos Quill' },
        { prop: 'formats', type: 'string[]', default: 'null', desc: 'Formatos permitidos' },
    ];
}
