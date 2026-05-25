import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PickListModule } from 'primeng/picklist';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-picklist-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, PickListModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">PickList</h1>
            <p class="comp-desc">Transferência de itens entre duas listas (disponível e selecionado) com controles direcionais. Ideal para seleção de múltiplos recursos.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">PickListModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/picklist'</span><span class="tok-pt">;</span>
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

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">PickList</div>
                            <p class="demo-card-desc">Mova itens entre as listas usando os botões de controle ou dando duplo clique nos itens.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:20px;gap:0">
                            <p-pick-list [source]="sourceCities" [target]="targetCities"
                                         sourceHeader="Disponível" targetHeader="Selecionado"
                                         breakpoint="1400px"
                                         [showSourceControls]="false" [showTargetControls]="false">
                                <ng-template #item let-item>
                                    <div style="display:flex;align-items:center;gap:10px;padding:2px 0">
                                        <i class="pi pi-map-marker" style="color:var(--primary-color);font-size:13px"></i>
                                        <span style="font-size:14px">{{ item.name }}</span>
                                    </div>
                                </ng-template>
                            </p-pick-list>
                        </div>
                        <div class="demo-card-code"><pre>{{ code }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Propriedades</div>
                    <p-table [value]="props" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:200px">Nome</th><th style="width:130px">Tipo</th><th style="width:120px">Padrão</th><th>Descrição</th></tr>
                        </ng-template>
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
                        <ng-template pTemplate="header">
                            <tr><th style="width:360px">Variável CSS</th><th>Descrição</th></tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-v>
                            <tr>
                                <td><span class="theme-var">{{ v.variable }}</span></td>
                                <td style="font-size:13px;color:var(--text-color-secondary)">{{ v.description }}</td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div></p-tabpanel>
            </p-tabpanels>
        </p-tabs>
    `
})
export class PickListDemo {
    sourceCities = [
        { id: '1', name: 'Goiânia' },
        { id: '2', name: 'Anápolis' },
        { id: '3', name: 'Aparecida de Goiânia' },
        { id: '4', name: 'Rio Verde' },
        { id: '5', name: 'Luziânia' },
        { id: '6', name: 'Formosa' },
        { id: '7', name: 'Novo Gama' },
    ];

    targetCities: any[] = [];

    code = `<p-pick-list [source]="source" [target]="target"
             sourceHeader="Disponível"
             targetHeader="Selecionado">
    <ng-template #item let-item>
        {{ item.name }}
    </ng-template>
</p-pick-list>

// No componente:
sourceCities = [{ id: '1', name: 'Goiânia' }];
targetCities: any[] = [];`;

    props = [
        { name: 'source',               type: 'any[]',   default: 'null',  description: 'Array de itens disponíveis (origem).' },
        { name: 'target',               type: 'any[]',   default: 'null',  description: 'Array de itens selecionados (destino).' },
        { name: 'sourceHeader',         type: 'string',  default: 'null',  description: 'Título da lista de origem.' },
        { name: 'targetHeader',         type: 'string',  default: 'null',  description: 'Título da lista de destino.' },
        { name: 'showSourceControls',   type: 'boolean', default: 'true',  description: 'Exibe botões de reordenação na origem.' },
        { name: 'showTargetControls',   type: 'boolean', default: 'true',  description: 'Exibe botões de reordenação no destino.' },
        { name: 'breakpoint',           type: 'string',  default: '960px', description: 'Breakpoint para layout responsivo (vertical).' },
        { name: 'filterBy',             type: 'string',  default: 'null',  description: 'Campo para filtro nas listas.' },
        { name: 'sourceFilterPlaceholder', type: 'string', default: 'null', description: 'Placeholder do filtro da origem.' },
    ];

    themeVars = [
        { variable: '--p-picklist-list-border-color',     description: 'Borda das listas.' },
        { variable: '--p-picklist-list-background',       description: 'Fundo das listas.' },
        { variable: '--p-picklist-item-hover-background', description: 'Fundo do item em hover.' },
        { variable: '--p-picklist-item-selected-background', description: 'Fundo do item selecionado.' },
        { variable: '--p-picklist-header-background',     description: 'Fundo dos cabeçalhos.' },
    ];
}
