import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-cascadeselect-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, CascadeSelectModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        .form-col { display:flex; flex-direction:column; gap:6px; }
        .form-col label { font-size:13px; font-weight:600; color:var(--text-color-secondary); }
        .demo-grid { display:flex; flex-wrap:wrap; gap:24px; padding:20px; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">CascadeSelect</h1>
            <p class="comp-desc">CascadeSelect exibe um menu encadeado de opções hierárquicas com submenus aninhados.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">CascadeSelectModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/cascadeselect'</span><span class="tok-pt">;</span>
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
                            <p class="demo-card-desc">Selecione uma opção em uma hierarquia de três níveis.</p>
                        </div>
                        <div class="demo-card-body demo-grid">
                            <div class="form-col">
                                <label>Cidades</label>
                                <p-cascadeselect [(ngModel)]="selected" [options]="countries" optionLabel="cname" optionGroupLabel="name"
                                    [optionGroupChildren]="['states','cities']" placeholder="Selecione uma cidade" style="min-width:220px" />
                                <small *ngIf="selected" style="color:var(--text-color-secondary)">Selecionado: {{ selected.cname }}</small>
                            </div>
                        </div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Disabled</div>
                            <p class="demo-card-desc">Estado desabilitado do componente.</p>
                        </div>
                        <div class="demo-card-body">
                            <p-cascadeselect [options]="countries" optionLabel="cname" optionGroupLabel="name"
                                [optionGroupChildren]="['states','cities']" placeholder="Desabilitado" [disabled]="true" style="min-width:220px" />
                        </div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:20px 0">
                    <p class="api-block-title">Propriedades principais</p>
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
export class CascadeSelectDemo {
    selected: any;

    countries: any[] = [
        {
            name: 'Brasil', code: 'BR',
            states: [
                { name: 'São Paulo', cities: [{ cname: 'São Paulo' }, { cname: 'Campinas' }, { cname: 'Santos' }] },
                { name: 'Rio de Janeiro', cities: [{ cname: 'Rio de Janeiro' }, { cname: 'Niterói' }] },
                { name: 'Goiás', cities: [{ cname: 'Goiânia' }, { cname: 'Anápolis' }] }
            ]
        },
        {
            name: 'Estados Unidos', code: 'US',
            states: [
                { name: 'California', cities: [{ cname: 'Los Angeles' }, { cname: 'San Francisco' }] },
                { name: 'New York', cities: [{ cname: 'New York City' }, { cname: 'Buffalo' }] }
            ]
        }
    ];

    apiProps = [
        { prop: 'options', type: 'any[]', default: 'null', desc: 'Lista de opções hierárquicas' },
        { prop: 'optionLabel', type: 'string', default: 'label', desc: 'Campo exibido como label' },
        { prop: 'optionGroupLabel', type: 'string', default: 'label', desc: 'Campo do grupo' },
        { prop: 'optionGroupChildren', type: 'string[]', default: 'null', desc: 'Array com chaves de filhos por nível' },
        { prop: 'placeholder', type: 'string', default: 'null', desc: 'Texto de placeholder' },
        { prop: 'disabled', type: 'boolean', default: 'false', desc: 'Desabilita o componente' },
    ];
}
