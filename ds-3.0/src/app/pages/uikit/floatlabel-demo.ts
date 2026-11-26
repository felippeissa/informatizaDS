import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePickerModule } from 'primeng/datepicker';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-floatlabel-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, FloatLabelModule, InputTextModule, SelectModule, MultiSelectModule, DatePickerModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        .demo-grid { display:flex; flex-wrap:wrap; gap:32px; padding:24px 20px; align-items:flex-end; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">FloatLabel</h1>
            <p class="comp-desc">FloatLabel move o label para cima do campo ao ser focado, economizando espaço e melhorando a UX de formulários.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">FloatLabelModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/floatlabel'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Variantes</div>
                            <p class="demo-card-desc">Três variantes: <code>over</code> (padrão), <code>in</code> e <code>on</code>.</p>
                        </div>
                        <div class="demo-card-body demo-grid">
                            <p-floatlabel>
                                <input pInputText id="over" [(ngModel)]="val1" />
                                <label for="over">Over (padrão)</label>
                            </p-floatlabel>

                            <p-floatlabel variant="in">
                                <input pInputText id="in" [(ngModel)]="val2" />
                                <label for="in">In Label</label>
                            </p-floatlabel>

                            <p-floatlabel variant="on">
                                <input pInputText id="on" [(ngModel)]="val3" />
                                <label for="on">On Label</label>
                            </p-floatlabel>
                        </div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Com outros componentes</div>
                            <p class="demo-card-desc">FloatLabel funciona com InputText, Select, MultiSelect, DatePicker e outros.</p>
                        </div>
                        <div class="demo-card-body demo-grid">
                            <p-floatlabel>
                                <p-select [(ngModel)]="selectedCity" [options]="cities" optionLabel="name" inputId="fl-select" style="min-width:200px" />
                                <label for="fl-select">Cidade</label>
                            </p-floatlabel>

                            <p-floatlabel>
                                <p-multiselect [(ngModel)]="selectedCities" [options]="cities" optionLabel="name" inputId="fl-multi" style="min-width:200px" />
                                <label for="fl-multi">Cidades</label>
                            </p-floatlabel>

                            <p-floatlabel>
                                <p-datepicker [(ngModel)]="date" inputId="fl-date" style="min-width:200px" />
                                <label for="fl-date">Data</label>
                            </p-floatlabel>
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
export class FloatLabelDemo {
    val1 = '';  val2 = '';  val3 = '';
    selectedCity: any;  selectedCities: any[] = [];  date: any = null;

    cities = [
        { name: 'Goiânia' }, { name: 'Brasília' }, { name: 'São Paulo' }, { name: 'Rio de Janeiro' }
    ];

    apiProps = [
        { prop: 'variant', type: 'string', default: 'over', desc: 'Variante: over | in | on' },
    ];
}
