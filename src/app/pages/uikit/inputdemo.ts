import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SliderModule } from 'primeng/slider';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { DatePickerModule } from 'primeng/datepicker';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-input-demo',
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        InputTextModule, PasswordModule, TextareaModule, InputNumberModule,
        CheckboxModule, RadioButtonModule, ToggleSwitchModule, SliderModule,
        SelectModule, MultiSelectModule, AutoCompleteModule, DatePickerModule,
        TabsModule, TableModule, FloatLabelModule, IconFieldModule, InputIconModule
    ],
    styles: [DEMO_STYLES + `
        .form-col { display: flex; flex-direction: column; gap: 6px; width: 100%; max-width: 280px; }
        .form-col label { font-size: 13px; font-weight: 600; color: var(--text-color-secondary); }
        .demo-card-body.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; padding: 20px; background: var(--surface-ground); }
    `],
    template: `
        <!-- ── Header ── -->
        <div class="comp-header">
            <h1 class="comp-name">Input & Select</h1>
            <p class="comp-desc">Campos de entrada e seleção para formulários. Integrados com Angular Forms e temas PrimeNG.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">InputTextModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/inputtext'</span><span class="tok-pt">;</span>
            </div>
        </div>

        <p-tabs value="features" styleClass="mt-1">
            <p-tablist>
                <p-tab value="features">Features</p-tab>
                <p-tab value="api">API</p-tab>
                <p-tab value="theming">Theming</p-tab>
            </p-tablist>
            <p-tabpanels>

                <!-- ══ FEATURES ══ -->
                <p-tabpanel value="features"><div style="padding:20px 0">

                    <!-- InputText -->
                    <div id="inputtext" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">InputText</div>
                            <p class="demo-card-desc">Campo de texto simples. Use <code>pInputText</code> em inputs nativos ou com Float Label e ícones.</p>
                        </div>
                        <div class="demo-card-body grid">
                            <div class="form-col">
                                <label>Básico</label>
                                <input pInputText type="text" placeholder="Digite algo" [(ngModel)]="txt" />
                            </div>
                            <div class="form-col">
                                <label>Desabilitado</label>
                                <input pInputText type="text" value="Valor fixo" [disabled]="true" />
                            </div>
                            <div class="form-col">
                                <label>Com ícone</label>
                                <p-iconfield>
                                    <p-inputicon class="pi pi-search" />
                                    <input pInputText type="text" placeholder="Buscar..." />
                                </p-iconfield>
                            </div>
                            <div class="form-col">
                                <p-floatlabel>
                                    <input pInputText id="fl" type="text" [(ngModel)]="txt2" />
                                    <label for="fl">Float Label</label>
                                </p-floatlabel>
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.inputtext }}</pre></div>
                    </div>

                    <!-- Password -->
                    <div id="password" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Password</div>
                            <p class="demo-card-desc">Campo de senha com toggle de visibilidade e medidor de força opcional.</p>
                        </div>
                        <div class="demo-card-body grid">
                            <div class="form-col">
                                <label>Básico</label>
                                <p-password [(ngModel)]="pwd" [feedback]="false" [toggleMask]="true" [fluid]="true" placeholder="Senha" />
                            </div>
                            <div class="form-col">
                                <label>Com medidor de força</label>
                                <p-password [(ngModel)]="pwd2" [feedback]="true" [toggleMask]="true" [fluid]="true" placeholder="Digite sua senha" />
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.password }}</pre></div>
                    </div>

                    <!-- Textarea -->
                    <div id="textarea" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Textarea</div>
                            <p class="demo-card-desc">Campo de texto multilinha com redimensionamento automático opcional.</p>
                        </div>
                        <div class="demo-card-body grid">
                            <div class="form-col" style="max-width:340px">
                                <label>Básico</label>
                                <textarea pTextarea rows="3" placeholder="Escreva aqui..." [(ngModel)]="area" style="width:100%"></textarea>
                            </div>
                            <div class="form-col" style="max-width:340px">
                                <label>Auto-resize</label>
                                <textarea pTextarea [autoResize]="true" rows="2" placeholder="Cresce conforme o conteúdo..." style="width:100%"></textarea>
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.textarea }}</pre></div>
                    </div>

                    <!-- InputNumber -->
                    <div id="inputnumber" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">InputNumber</div>
                            <p class="demo-card-desc">Campo numérico com formatação de moeda, porcentagem e botões de incremento.</p>
                        </div>
                        <div class="demo-card-body grid">
                            <div class="form-col">
                                <label>Inteiro</label>
                                <p-inputnumber [(ngModel)]="num" [fluid]="true" placeholder="0" />
                            </div>
                            <div class="form-col">
                                <label>Moeda (BRL)</label>
                                <p-inputnumber [(ngModel)]="currency" mode="currency" currency="BRL" locale="pt-BR" [fluid]="true" />
                            </div>
                            <div class="form-col">
                                <label>Com botões</label>
                                <p-inputnumber [(ngModel)]="num2" [showButtons]="true" [min]="0" [max]="100" [fluid]="true" />
                            </div>
                            <div class="form-col">
                                <label>Porcentagem</label>
                                <p-inputnumber [(ngModel)]="pct" mode="decimal" [minFractionDigits]="1" [maxFractionDigits]="2" suffix="%" [fluid]="true" />
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.inputnumber }}</pre></div>
                    </div>

                    <!-- Checkbox -->
                    <div id="checkbox" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Checkbox</div>
                            <p class="demo-card-desc">Seleção booleana ou múltipla com suporte a estados indeterminados.</p>
                        </div>
                        <div class="demo-card-body" style="gap:20px">
                            <div style="display:flex;align-items:center;gap:8px">
                                <p-checkbox [(ngModel)]="chk1" [binary]="true" inputId="chk1" />
                                <label for="chk1" style="font-size:14px;cursor:pointer">Aceito os termos</label>
                            </div>
                            <div style="display:flex;align-items:center;gap:8px">
                                <p-checkbox [(ngModel)]="chk2" [binary]="true" inputId="chk2" [disabled]="true" />
                                <label for="chk2" style="font-size:14px;color:var(--text-color-secondary)">Desabilitado</label>
                            </div>
                            @for (opt of chkOptions; track opt.value) {
                                <div style="display:flex;align-items:center;gap:8px">
                                    <p-checkbox [(ngModel)]="chkSelected" [value]="opt.value" [inputId]="opt.value" name="opts" />
                                    <label [for]="opt.value" style="font-size:14px;cursor:pointer">{{ opt.label }}</label>
                                </div>
                            }
                        </div>
                        <div class="demo-card-code"><pre>{{ code.checkbox }}</pre></div>
                    </div>

                    <!-- RadioButton -->
                    <div id="radio" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">RadioButton</div>
                            <p class="demo-card-desc">Seleção única dentro de um grupo de opções.</p>
                        </div>
                        <div class="demo-card-body" style="gap:20px">
                            @for (opt of radioOptions; track opt.value) {
                                <div style="display:flex;align-items:center;gap:8px">
                                    <p-radiobutton [(ngModel)]="radioSelected" [value]="opt.value" [inputId]="'r'+opt.value" name="radio" />
                                    <label [for]="'r'+opt.value" style="font-size:14px;cursor:pointer">{{ opt.label }}</label>
                                </div>
                            }
                        </div>
                        <div class="demo-card-code"><pre>{{ code.radio }}</pre></div>
                    </div>

                    <!-- ToggleSwitch -->
                    <div id="toggle" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">ToggleSwitch</div>
                            <p class="demo-card-desc">Interruptor on/off para configurações binárias.</p>
                        </div>
                        <div class="demo-card-body" style="gap:24px">
                            <div style="display:flex;align-items:center;gap:10px">
                                <p-toggleswitch [(ngModel)]="tog1" />
                                <span style="font-size:14px">Notificações {{ tog1 ? 'ativas' : 'inativas' }}</span>
                            </div>
                            <div style="display:flex;align-items:center;gap:10px">
                                <p-toggleswitch [(ngModel)]="tog2" [disabled]="true" />
                                <span style="font-size:14px;color:var(--text-color-secondary)">Desabilitado</span>
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.toggle }}</pre></div>
                    </div>

                    <!-- Slider -->
                    <div id="slider" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Slider</div>
                            <p class="demo-card-desc">Controle deslizante para selecionar valores dentro de um intervalo.</p>
                        </div>
                        <div class="demo-card-body col" style="gap:20px;padding:24px">
                            <div style="width:100%;max-width:360px">
                                <p style="font-size:13px;margin:0 0 8px;color:var(--text-color-secondary)">Valor: <strong>{{ sliderVal }}</strong></p>
                                <p-slider [(ngModel)]="sliderVal" [min]="0" [max]="100" styleClass="w-full" />
                            </div>
                            <div style="width:100%;max-width:360px">
                                <p style="font-size:13px;margin:0 0 8px;color:var(--text-color-secondary)">Range: <strong>{{ sliderRange[0] }} – {{ sliderRange[1] }}</strong></p>
                                <p-slider [(ngModel)]="sliderRange" [range]="true" [min]="0" [max]="100" styleClass="w-full" />
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.slider }}</pre></div>
                    </div>

                    <!-- ─── SELECT ─── -->

                    <!-- Select -->
                    <div id="select" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Select</div>
                            <p class="demo-card-desc">Dropdown de seleção única com suporte a filtro e grupos.</p>
                        </div>
                        <div class="demo-card-body grid">
                            <div class="form-col">
                                <label>Básico</label>
                                <p-select [(ngModel)]="selVal" [options]="cities" optionLabel="name" placeholder="Selecione a cidade" [fluid]="true" />
                            </div>
                            <div class="form-col">
                                <label>Com filtro</label>
                                <p-select [(ngModel)]="selVal2" [options]="cities" optionLabel="name" [filter]="true" placeholder="Busque a cidade" [fluid]="true" />
                            </div>
                            <div class="form-col">
                                <label>Desabilitado</label>
                                <p-select [options]="cities" optionLabel="name" placeholder="—" [disabled]="true" [fluid]="true" />
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.select }}</pre></div>
                    </div>

                    <!-- MultiSelect -->
                    <div id="multiselect" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">MultiSelect</div>
                            <p class="demo-card-desc">Dropdown de seleção múltipla com chips e filtro.</p>
                        </div>
                        <div class="demo-card-body grid">
                            <div class="form-col" style="max-width:320px">
                                <label>Básico</label>
                                <p-multiselect [(ngModel)]="multiVal" [options]="cities" optionLabel="name" placeholder="Selecione cidades" [fluid]="true" display="chip" />
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.multiselect }}</pre></div>
                    </div>

                    <!-- AutoComplete -->
                    <div id="autocomplete" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">AutoComplete</div>
                            <p class="demo-card-desc">Campo de texto com sugestões dinâmicas ao digitar.</p>
                        </div>
                        <div class="demo-card-body grid">
                            <div class="form-col" style="max-width:320px">
                                <label>Básico (digite uma cidade)</label>
                                <p-autocomplete [(ngModel)]="autoVal" [suggestions]="autoSuggestions" (completeMethod)="onComplete($event)" field="name" [fluid]="true" placeholder="Ex: Goiânia" />
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.autocomplete }}</pre></div>
                    </div>

                    <!-- DatePicker -->
                    <div id="datepicker" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">DatePicker</div>
                            <p class="demo-card-desc">Seletor de data com calendário, range e modo inline.</p>
                        </div>
                        <div class="demo-card-body grid">
                            <div class="form-col">
                                <label>Data simples</label>
                                <p-datepicker [(ngModel)]="date1" [fluid]="true" dateFormat="dd/mm/yy" placeholder="dd/mm/aaaa" />
                            </div>
                            <div class="form-col">
                                <label>Range de datas</label>
                                <p-datepicker [(ngModel)]="dateRange" selectionMode="range" [fluid]="true" dateFormat="dd/mm/yy" placeholder="Início – Fim" />
                            </div>
                            <div class="form-col">
                                <label>Com hora</label>
                                <p-datepicker [(ngModel)]="dateTime" [showTime]="true" hourFormat="24" [fluid]="true" dateFormat="dd/mm/yy" />
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.datepicker }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <!-- ══ API ══ -->
                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">InputText — Propriedades principais</div>
                    <p-table [value]="propsInput" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:180px">Nome</th><th style="width:140px">Tipo</th><th style="width:110px">Padrão</th><th>Descrição</th></tr>
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
                    <div class="api-block-title" style="margin-top:28px">Select — Propriedades principais</div>
                    <p-table [value]="propsSelect" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:180px">Nome</th><th style="width:140px">Tipo</th><th style="width:110px">Padrão</th><th>Descrição</th></tr>
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

                <!-- ══ THEMING ══ -->
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
export class InputDemo implements OnInit {
    txt = ''; txt2 = ''; pwd = ''; pwd2 = ''; area = '';
    num: number | null = null; num2 = 50; currency: number | null = null; pct: number | null = null;
    chk1 = false; chk2 = true;
    chkSelected: string[] = [];
    radioSelected = 'goiania';
    tog1 = true; tog2 = false;
    sliderVal = 40; sliderRange = [20, 70];
    selVal: any = null; selVal2: any = null;
    multiVal: any[] = [];
    autoVal: any = null; autoSuggestions: any[] = [];
    date1: Date | null = null; dateRange: Date[] | null = null; dateTime: Date | null = null;

    cities = [
        { name: 'Goiânia', code: 'GYN' },
        { name: 'Anápolis', code: 'ANA' },
        { name: 'Aparecida de Goiânia', code: 'APG' },
        { name: 'Rio Verde', code: 'RVD' },
        { name: 'Luziânia', code: 'LUZ' },
    ];

    chkOptions = [
        { label: 'Angular', value: 'angular' },
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
    ];

    radioOptions = [
        { label: 'Goiânia', value: 'goiania' },
        { label: 'Anápolis', value: 'anapolis' },
        { label: 'Rio Verde', value: 'rioverde' },
    ];

    ngOnInit() {}

    onComplete(event: AutoCompleteCompleteEvent) {
        const q = event.query.toLowerCase();
        this.autoSuggestions = this.cities.filter(c => c.name.toLowerCase().includes(q));
    }

    code: any = {
        inputtext: `<!-- Básico -->
<input pInputText type="text" placeholder="Digite algo" [(ngModel)]="txt" />

<!-- Com ícone -->
<p-iconfield>
    <p-inputicon class="pi pi-search" />
    <input pInputText type="text" placeholder="Buscar..." />
</p-iconfield>

<!-- Float Label -->
<p-floatlabel>
    <input pInputText id="fl" type="text" [(ngModel)]="txt" />
    <label for="fl">Seu nome</label>
</p-floatlabel>`,

        password: `<p-password [(ngModel)]="pwd"
    [feedback]="false"
    [toggleMask]="true"
    [fluid]="true"
    placeholder="Senha" />

<!-- Com medidor de força -->
<p-password [(ngModel)]="pwd"
    [feedback]="true"
    [toggleMask]="true"
    [fluid]="true" />`,

        textarea: `<textarea pTextarea rows="4" [(ngModel)]="texto"
    placeholder="Escreva aqui..."
    style="width:100%">
</textarea>

<!-- Auto-resize -->
<textarea pTextarea [autoResize]="true" rows="2"
    placeholder="Cresce conforme o conteúdo...">
</textarea>`,

        inputnumber: `<!-- Inteiro -->
<p-inputnumber [(ngModel)]="num" [fluid]="true" />

<!-- Moeda -->
<p-inputnumber [(ngModel)]="val" mode="currency"
    currency="BRL" locale="pt-BR" [fluid]="true" />

<!-- Com botões -->
<p-inputnumber [(ngModel)]="num" [showButtons]="true"
    [min]="0" [max]="100" [fluid]="true" />`,

        checkbox: `<!-- Binário -->
<p-checkbox [(ngModel)]="aceito" [binary]="true" inputId="chk" />
<label for="chk">Aceito os termos</label>

<!-- Múltipla seleção -->
<p-checkbox [(ngModel)]="selecionados" value="angular"
    inputId="ang" name="techs" />
<label for="ang">Angular</label>`,

        radio: `<p-radiobutton [(ngModel)]="selected" value="goiania"
    inputId="r1" name="city" />
<label for="r1">Goiânia</label>

<p-radiobutton [(ngModel)]="selected" value="anapolis"
    inputId="r2" name="city" />
<label for="r2">Anápolis</label>`,

        toggle: `<p-toggleswitch [(ngModel)]="ativo" />`,

        slider: `<p-slider [(ngModel)]="valor" [min]="0" [max]="100" styleClass="w-full" />

<!-- Range -->
<p-slider [(ngModel)]="range" [range]="true"
    [min]="0" [max]="100" styleClass="w-full" />`,

        select: `<p-select [(ngModel)]="cidade"
    [options]="cidades"
    optionLabel="name"
    placeholder="Selecione a cidade"
    [fluid]="true" />

<!-- Com filtro -->
<p-select [(ngModel)]="cidade"
    [options]="cidades"
    optionLabel="name"
    [filter]="true"
    [fluid]="true" />`,

        multiselect: `<p-multiselect [(ngModel)]="cidades"
    [options]="opcoes"
    optionLabel="name"
    placeholder="Selecione cidades"
    display="chip"
    [fluid]="true" />`,

        autocomplete: `<p-autocomplete [(ngModel)]="value"
    [suggestions]="filteredItems"
    (completeMethod)="search($event)"
    field="name"
    [fluid]="true"
    placeholder="Digite para buscar..." />`,

        datepicker: `<!-- Data simples -->
<p-datepicker [(ngModel)]="date"
    dateFormat="dd/mm/yy"
    [fluid]="true" />

<!-- Range -->
<p-datepicker [(ngModel)]="dateRange"
    selectionMode="range"
    dateFormat="dd/mm/yy"
    [fluid]="true" />

<!-- Com hora -->
<p-datepicker [(ngModel)]="date"
    [showTime]="true"
    hourFormat="24"
    [fluid]="true" />`,
    };

    propsInput = [
        { name: 'type',        type: 'string',  default: 'text',  description: 'Tipo do input HTML.' },
        { name: 'placeholder', type: 'string',  default: 'null',  description: 'Texto exibido quando vazio.' },
        { name: 'disabled',    type: 'boolean', default: 'false', description: 'Desabilita o campo.' },
        { name: 'readonly',    type: 'boolean', default: 'false', description: 'Torna o campo somente leitura.' },
        { name: 'fluid',       type: 'boolean', default: 'false', description: 'Ocupa toda a largura disponível.' },
        { name: 'invalid',     type: 'boolean', default: 'false', description: 'Aplica estilo de erro ao campo.' },
        { name: 'size',        type: 'string',  default: 'null',  description: 'Tamanho: "small" ou "large".' },
    ];

    propsSelect = [
        { name: 'options',      type: 'any[]',   default: 'null',  description: 'Lista de opções.' },
        { name: 'optionLabel',  type: 'string',  default: 'null',  description: 'Propriedade do objeto usada como label.' },
        { name: 'optionValue',  type: 'string',  default: 'null',  description: 'Propriedade do objeto usada como valor.' },
        { name: 'placeholder',  type: 'string',  default: 'null',  description: 'Texto quando nada está selecionado.' },
        { name: 'filter',       type: 'boolean', default: 'false', description: 'Habilita campo de busca interno.' },
        { name: 'disabled',     type: 'boolean', default: 'false', description: 'Desabilita o componente.' },
        { name: 'fluid',        type: 'boolean', default: 'false', description: 'Largura total.' },
        { name: 'showClear',    type: 'boolean', default: 'false', description: 'Exibe botão para limpar seleção.' },
        { name: 'editable',     type: 'boolean', default: 'false', description: 'Permite digitar no campo.' },
    ];

    themeVars = [
        { variable: '--p-inputtext-background',       description: 'Fundo do campo de texto.' },
        { variable: '--p-inputtext-color',            description: 'Cor do texto digitado.' },
        { variable: '--p-inputtext-border-color',     description: 'Cor da borda padrão.' },
        { variable: '--p-inputtext-focus-border-color', description: 'Cor da borda em foco.' },
        { variable: '--p-inputtext-invalid-border-color', description: 'Cor da borda em estado inválido.' },
        { variable: '--p-inputtext-placeholder-color', description: 'Cor do placeholder.' },
        { variable: '--p-inputtext-border-radius',    description: 'Raio de borda.' },
        { variable: '--p-inputtext-padding-x',        description: 'Padding horizontal.' },
        { variable: '--p-inputtext-padding-y',        description: 'Padding vertical.' },
        { variable: '--p-select-background',          description: 'Fundo do Select.' },
        { variable: '--p-select-border-color',        description: 'Borda do Select.' },
        { variable: '--p-select-option-focus-background', description: 'Fundo da opção em hover.' },
        { variable: '--p-select-option-selected-background', description: 'Fundo da opção selecionada.' },
    ];
}
