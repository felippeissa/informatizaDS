import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { LayoutService } from '@/app/layout/service/layout.service';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-chart-demo',
    standalone: true,
    imports: [CommonModule, ChartModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Charts</h1>
            <p class="comp-desc">Gráficos baseados em Chart.js integrados ao PrimeNG. Suporte a linha, barra, pizza, rosca e mais. Detecta automaticamente o tema claro/escuro.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">ChartModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/chart'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Linha</div>
                            <p class="demo-card-desc">Ideal para visualizar tendências ao longo do tempo. Use <code>type="line"</code>.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:24px;gap:0">
                            <p-chart type="line" [data]="lineData" [options]="chartOptions" style="width:100%;max-width:680px" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.line }}</pre></div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Barras</div>
                            <p class="demo-card-desc">Comparação de valores entre categorias. Use <code>type="bar"</code>.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:24px;gap:0">
                            <p-chart type="bar" [data]="barData" [options]="chartOptions" style="width:100%;max-width:680px" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.bar }}</pre></div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Pizza e Rosca</div>
                            <p class="demo-card-desc">Proporção entre partes de um todo. Use <code>type="pie"</code> ou <code>type="doughnut"</code>.</p>
                        </div>
                        <div class="demo-card-body" style="gap:32px;justify-content:center;flex-wrap:wrap;padding:24px">
                            <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
                                <p style="font-size:12px;font-weight:700;color:var(--text-color-secondary);margin:0;text-transform:uppercase;letter-spacing:.04em">Pizza</p>
                                <p-chart type="pie" [data]="pieData" [options]="pieOptions" style="max-width:280px" />
                            </div>
                            <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
                                <p style="font-size:12px;font-weight:700;color:var(--text-color-secondary);margin:0;text-transform:uppercase;letter-spacing:.04em">Rosca</p>
                                <p-chart type="doughnut" [data]="pieData" [options]="pieOptions" style="max-width:280px" />
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.pie }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Chart — Propriedades</div>
                    <p-table [value]="propsChart" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:160px">Nome</th><th style="width:130px">Tipo</th><th style="width:120px">Padrão</th><th>Descrição</th></tr>
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
                    <p style="font-size:13px;color:var(--text-color-secondary);margin:0 0 16px;line-height:1.6">
                        O Chart usa as cores do tema via <code>getComputedStyle(document.documentElement)</code> para detectar automaticamente o tema claro/escuro. Use as variáveis abaixo para customizar as cores dos datasets.
                    </p>
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
export class ChartDemoPage {
    layoutService = inject(LayoutService);

    lineData: any = null;
    barData: any = null;
    pieData: any = null;
    chartOptions: any = null;
    pieOptions: any = null;

    constructor() {
        effect(() => {
            this.layoutService.layoutConfig().darkTheme;
            setTimeout(() => this.initCharts(), 100);
        });
    }

    initCharts() {
        const doc = getComputedStyle(document.documentElement);
        const textColor     = doc.getPropertyValue('--text-color').trim();
        const textSecondary = doc.getPropertyValue('--text-color-secondary').trim();
        const surfaceBorder = doc.getPropertyValue('--surface-border').trim();
        const primary       = doc.getPropertyValue('--p-primary-500').trim() || '#059669';
        const primaryLight  = doc.getPropertyValue('--p-primary-200').trim() || '#6EE7B7';

        this.lineData = {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
            datasets: [
                {
                    label: 'Protocolos Abertos',
                    data: [65, 59, 80, 81, 56, 75, 90],
                    fill: false, tension: 0.4,
                    borderColor: primary, backgroundColor: primary,
                },
                {
                    label: 'Protocolos Encerrados',
                    data: [28, 48, 40, 50, 46, 60, 70],
                    fill: false, tension: 0.4,
                    borderColor: primaryLight, backgroundColor: primaryLight,
                },
            ]
        };

        this.barData = {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [
                {
                    label: 'Atendimentos',
                    data: [120, 98, 145, 133, 160, 175],
                    backgroundColor: primary,
                },
                {
                    label: 'Resolvidos',
                    data: [100, 88, 130, 120, 148, 165],
                    backgroundColor: primaryLight,
                },
            ]
        };

        this.pieData = {
            labels: ['Protocolo', 'Financeiro', 'RH', 'TI'],
            datasets: [{
                data: [42, 28, 18, 12],
                backgroundColor: [
                    doc.getPropertyValue('--p-indigo-500').trim() || '#6366F1',
                    doc.getPropertyValue('--p-teal-500').trim()   || '#14B8A6',
                    doc.getPropertyValue('--p-orange-500').trim() || '#F97316',
                    doc.getPropertyValue('--p-purple-500').trim() || '#A855F7',
                ],
            }]
        };

        const scales = {
            x: { ticks: { color: textSecondary }, grid: { color: surfaceBorder } },
            y: { ticks: { color: textSecondary }, grid: { color: surfaceBorder } },
        };

        this.chartOptions = {
            maintainAspectRatio: false, aspectRatio: 0.8,
            plugins: { legend: { labels: { color: textColor } } },
            scales,
        };

        this.pieOptions = {
            plugins: { legend: { labels: { color: textColor, usePointStyle: true } } },
        };
    }

    code: any = {
        line: `<p-chart type="line" [data]="lineData" [options]="options" />

// Dados:
lineData = {
    labels: ['Jan','Fev','Mar'],
    datasets: [{
        label: 'Dataset',
        data: [65, 59, 80],
        fill: false, tension: 0.4,
        borderColor: '#059669',
    }]
};`,

        bar: `<p-chart type="bar" [data]="barData" [options]="options" />

barData = {
    labels: ['Jan','Fev','Mar'],
    datasets: [{
        label: 'Atendimentos',
        data: [120, 98, 145],
        backgroundColor: '#059669',
    }]
};`,

        pie: `<!-- Pizza -->
<p-chart type="pie" [data]="pieData" [options]="pieOptions" />

<!-- Rosca -->
<p-chart type="doughnut" [data]="pieData" [options]="pieOptions" />

pieData = {
    labels: ['A', 'B', 'C'],
    datasets: [{ data: [42, 28, 30],
                 backgroundColor: ['#6366F1','#14B8A6','#F97316'] }]
};`,
    };

    propsChart = [
        { name: 'type',    type: 'string',  default: 'null', description: '"line" | "bar" | "pie" | "doughnut" | "radar" | "polarArea".' },
        { name: 'data',    type: 'object',  default: 'null', description: 'Objeto de dados Chart.js (labels + datasets).' },
        { name: 'options', type: 'object',  default: 'null', description: 'Opções de configuração Chart.js.' },
        { name: 'width',   type: 'string',  default: 'null', description: 'Largura do canvas.' },
        { name: 'height',  type: 'string',  default: 'null', description: 'Altura do canvas.' },
    ];

    themeVars = [
        { variable: '--p-primary-500',        description: 'Cor principal — use nos borderColor/backgroundColor.' },
        { variable: '--p-indigo-500',          description: 'Indigo para datasets secundários.' },
        { variable: '--p-teal-500',            description: 'Teal para datasets terciários.' },
        { variable: '--text-color',            description: 'Cor dos labels da legenda.' },
        { variable: '--text-color-secondary',  description: 'Cor dos ticks dos eixos.' },
        { variable: '--surface-border',        description: 'Cor das linhas de grade.' },
    ];
}
