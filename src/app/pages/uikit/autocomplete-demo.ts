import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-autocomplete-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, AutoCompleteModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        .form-col { display:flex; flex-direction:column; gap:6px; width:100%; max-width:320px; }
        .form-col label { font-size:13px; font-weight:600; color:var(--text-color-secondary); }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">AutoComplete</h1>
            <p class="comp-desc">Campo de texto com sugestões dinâmicas ao digitar. Ideal para buscas e autocompletar com dados remotos.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">AutoCompleteModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/autocomplete'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">AutoComplete</div>
                            <p class="demo-card-desc">Campo de texto com sugestões dinâmicas ao digitar.</p>
                        </div>
                        <div class="demo-card-body col" style="gap:16px;padding:20px">
                            <div class="form-col">
                                <label>Básico (digite uma cidade)</label>
                                <p-autocomplete [(ngModel)]="autoVal" [suggestions]="autoSuggestions" (completeMethod)="onComplete($event)" field="name" [fluid]="true" placeholder="Ex: Goiânia" />
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Propriedades</div>
                    <p-table [value]="props" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:180px">Nome</th><th style="width:130px">Tipo</th><th style="width:120px">Padrão</th><th>Descrição</th></tr>
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
export class AutoCompleteDemo {
    autoVal: any = null;
    autoSuggestions: any[] = [];

    cities = [
        { name: 'Goiânia',              code: 'GYN' },
        { name: 'Anápolis',             code: 'ANA' },
        { name: 'Aparecida de Goiânia', code: 'APG' },
        { name: 'Rio Verde',            code: 'RVD' },
        { name: 'Luziânia',             code: 'LUZ' },
        { name: 'Caldas Novas',         code: 'CDN' },
        { name: 'Itumbiara',            code: 'ITU' },
    ];

    onComplete(event: AutoCompleteCompleteEvent) {
        const q = event.query.toLowerCase();
        this.autoSuggestions = this.cities.filter(c => c.name.toLowerCase().includes(q));
    }

    code = `<p-autocomplete [(ngModel)]="value"
    [suggestions]="filteredItems"
    (completeMethod)="search($event)"
    field="name"
    [fluid]="true"
    placeholder="Digite para buscar..." />

// No componente:
search(event: AutoCompleteCompleteEvent) {
    const q = event.query.toLowerCase();
    this.filteredItems = this.items.filter(
        i => i.name.toLowerCase().includes(q)
    );
}`;

    props = [
        { name: 'suggestions',    type: 'any[]',   default: 'null',  description: 'Lista de sugestões filtradas.' },
        { name: 'field',          type: 'string',  default: 'null',  description: 'Propriedade do objeto usada como label.' },
        { name: 'completeMethod', type: 'Event',   default: 'null',  description: 'Evento disparado ao digitar para filtrar sugestões.' },
        { name: 'multiple',       type: 'boolean', default: 'false', description: 'Permite seleção múltipla (chips).' },
        { name: 'dropdown',       type: 'boolean', default: 'false', description: 'Exibe botão de dropdown.' },
        { name: 'minLength',      type: 'number',  default: '1',     description: 'Mínimo de caracteres para disparar busca.' },
        { name: 'delay',          type: 'number',  default: '300',   description: 'Atraso em ms antes de disparar busca.' },
        { name: 'fluid',          type: 'boolean', default: 'false', description: 'Largura total.' },
        { name: 'forceSelection', type: 'boolean', default: 'false', description: 'Obriga selecionar das sugestões.' },
    ];

    themeVars = [
        { variable: '--p-autocomplete-background',                description: 'Fundo do campo.' },
        { variable: '--p-autocomplete-border-color',              description: 'Borda do campo.' },
        { variable: '--p-autocomplete-overlay-background',        description: 'Fundo do painel de sugestões.' },
        { variable: '--p-autocomplete-option-focus-background',   description: 'Fundo da sugestão em hover.' },
        { variable: '--p-autocomplete-option-selected-background',description: 'Fundo da sugestão selecionada.' },
    ];
}
