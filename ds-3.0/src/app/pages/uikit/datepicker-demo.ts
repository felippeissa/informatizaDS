import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-datepicker-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, DatePickerModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        .form-col { display:flex; flex-direction:column; gap:6px; width:100%; max-width:280px; }
        .form-col label { font-size:13px; font-weight:600; color:var(--text-color-secondary); }
        .form-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:20px; padding:20px; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">DatePicker</h1>
            <p class="comp-desc">Seletor de data com calendário, range, modo inline e suporte a hora.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">DatePickerModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/datepicker'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">DatePicker</div>
                            <p class="demo-card-desc">Seletor de data com calendário, range e modo inline.</p>
                        </div>
                        <div class="demo-card-body form-grid">
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
export class DatePickerDemo {
    date1: Date | null = null;
    dateRange: Date[] | null = null;
    dateTime: Date | null = null;

    code = `<!-- Data simples -->
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
    [fluid]="true" />`;

    props = [
        { name: 'selectionMode',  type: 'string',  default: 'single',    description: '"single" | "multiple" | "range".' },
        { name: 'dateFormat',     type: 'string',  default: 'mm/dd/yy',  description: 'Formato da data exibida.' },
        { name: 'showTime',       type: 'boolean', default: 'false',     description: 'Exibe seletor de hora.' },
        { name: 'hourFormat',     type: 'string',  default: '12',        description: 'Formato 12h ou 24h.' },
        { name: 'showIcon',       type: 'boolean', default: 'false',     description: 'Exibe ícone de calendário.' },
        { name: 'inline',         type: 'boolean', default: 'false',     description: 'Exibe calendário sempre visível.' },
        { name: 'minDate',        type: 'Date',    default: 'null',      description: 'Data mínima selecionável.' },
        { name: 'maxDate',        type: 'Date',    default: 'null',      description: 'Data máxima selecionável.' },
        { name: 'disabledDates',  type: 'Date[]',  default: 'null',      description: 'Datas desabilitadas.' },
        { name: 'disabledDays',   type: 'number[]',default: 'null',      description: 'Dias da semana desabilitados (0=Dom, 6=Sáb).' },
        { name: 'showWeek',       type: 'boolean', default: 'false',     description: 'Exibe número da semana.' },
        { name: 'fluid',          type: 'boolean', default: 'false',     description: 'Largura total.' },
    ];

    themeVars = [
        { variable: '--p-datepicker-background',           description: 'Fundo do campo.' },
        { variable: '--p-datepicker-border-color',         description: 'Borda do campo.' },
        { variable: '--p-datepicker-panel-background',     description: 'Fundo do painel do calendário.' },
        { variable: '--p-datepicker-date-hover-background',description: 'Fundo da data em hover.' },
        { variable: '--p-datepicker-date-selected-background', description: 'Fundo da data selecionada.' },
        { variable: '--p-datepicker-date-range-background',description: 'Fundo do intervalo selecionado.' },
    ];
}
