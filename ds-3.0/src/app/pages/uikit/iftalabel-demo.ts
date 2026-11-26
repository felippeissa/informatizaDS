import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePickerModule } from 'primeng/datepicker';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-iftalabel-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, IftaLabelModule, InputTextModule, SelectModule, MultiSelectModule, DatePickerModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        .demo-grid { display:flex; flex-wrap:wrap; gap:24px; padding:20px; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">IftaLabel</h1>
            <p class="comp-desc">IftaLabel (In-Field Top Aligned Label) posiciona o label no topo do campo, sempre visível — sem animação de float.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">IftaLabelModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/iftalabel'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">InputText</div>
                            <p class="demo-card-desc">Label fixo no topo do input.</p>
                        </div>
                        <div class="demo-card-body demo-grid">
                            <p-iftalabel>
                                <input pInputText id="username" [(ngModel)]="username" />
                                <label for="username">Usuário</label>
                            </p-iftalabel>

                            <p-iftalabel>
                                <input pInputText id="email" [(ngModel)]="email" />
                                <label for="email">E-mail</label>
                            </p-iftalabel>
                        </div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Com Select e DatePicker</div>
                        </div>
                        <div class="demo-card-body demo-grid">
                            <p-iftalabel>
                                <p-select [(ngModel)]="city" [options]="cities" optionLabel="name" inputId="city" style="min-width:200px" />
                                <label for="city">Cidade</label>
                            </p-iftalabel>

                            <p-iftalabel>
                                <p-datepicker [(ngModel)]="date" inputId="date" style="min-width:200px" />
                                <label for="date">Data</label>
                            </p-iftalabel>

                            <p-iftalabel>
                                <p-multiselect [(ngModel)]="selectedCities" [options]="cities" optionLabel="name" inputId="cities" style="min-width:200px" />
                                <label for="cities">Cidades</label>
                            </p-iftalabel>
                        </div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:20px 0">
                    <p style="color:var(--text-color-secondary);font-size:13px">
                        IftaLabel é um componente de layout sem propriedades adicionais. Envolva o input e o label dentro dele.
                        O label deve ter o atributo <code>for</code> correspondendo ao <code>id</code> do input.
                    </p>
                </div></p-tabpanel>
            </p-tabpanels>
        </p-tabs>
    `
})
export class IftaLabelDemo {
    username = '';  email = '';
    city: any;  selectedCities: any[] = [];  date: any = null;

    cities = [
        { name: 'Goiânia' }, { name: 'Brasília' }, { name: 'São Paulo' }, { name: 'Rio de Janeiro' }
    ];
}
