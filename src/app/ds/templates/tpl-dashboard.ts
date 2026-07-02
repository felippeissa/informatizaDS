import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ChartModule } from 'primeng/chart';
import { TagModule } from 'primeng/tag';

/**
 * TEMPLATE — Dashboard.
 * Padrão para telas de visão geral: linha de KPIs (cards bento), um gráfico
 * e uma lista de destaques, todos em cards brancos.
 */
@Component({
    selector: 'app-tpl-dashboard',
    standalone: true,
    imports: [FormsModule, ButtonModule, SelectButtonModule, ChartModule, TagModule],
    template: `
    <div class="ds-page">
        <div class="ds-page-header">
            <h1 class="ds-page-title">Dashboard</h1>
            <p-selectbutton [options]="periodos" [(ngModel)]="periodo" optionLabel="label" optionValue="value" [allowEmpty]="false" />
        </div>

        <!-- KPIs -->
        <div class="ds-grid ds-grid--kpi">
            @for (k of kpis; track k.titulo) {
                <div class="ds-card">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <span style="color: var(--text-color-secondary); font-size: 0.8125rem; font-weight: 600;">{{ k.titulo }}</span>
                        <i class="pi {{ k.icone }}" style="color: var(--primary-color);"></i>
                    </div>
                    <div style="font-size: 1.75rem; font-weight: 700; margin-top: 0.5rem;">{{ k.valor }}</div>
                    <p-tag [value]="k.variacao" [severity]="k.variacao.startsWith('+') ? 'success' : 'danger'" styleClass="mt-1" />
                </div>
            }
        </div>

        <!-- Gráfico -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-chart-line"></i> Evolução no período</h2>
            <p-chart type="line" [data]="chartData()" [options]="chartOptions" style="height: 300px;" />
        </div>

        <!-- Lista de destaques -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-star"></i> Destaques</h2>
            @for (d of destaques; track d.nome) {
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid var(--surface-border);">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <span style="width: 34px; height: 34px; border-radius: 9px; background: color-mix(in srgb, var(--primary-color) 12%, transparent); display: flex; align-items: center; justify-content: center; color: var(--primary-color);">
                            <i class="pi {{ d.icone }}"></i>
                        </span>
                        <div>
                            <div style="font-weight: 600;">{{ d.nome }}</div>
                            <div style="font-size: 0.75rem; color: var(--text-color-secondary);">{{ d.desc }}</div>
                        </div>
                    </div>
                    <span style="font-weight: 700;">{{ d.valor }}</span>
                </div>
            }
        </div>
    </div>
  `,
})
export class TplDashboard {
    periodos = [
        { label: 'Semana', value: 'semana' },
        { label: 'Mês', value: 'mes' },
        { label: 'Trimestre', value: 'trimestre' },
    ];
    periodo = signal('mes');

    kpis = [
        { titulo: 'Projetos ativos', valor: '24', variacao: '+12%', icone: 'pi-folder-open' },
        { titulo: 'Tarefas concluídas', valor: '318', variacao: '+8%', icone: 'pi-check-circle' },
        { titulo: 'Membros', valor: '57', variacao: '+3%', icone: 'pi-users' },
        { titulo: 'Pendências', valor: '9', variacao: '-5%', icone: 'pi-exclamation-triangle' },
    ];

    destaques = [
        { nome: 'Portal do Servidor', desc: '12 tarefas nesta semana', valor: '92%', icone: 'pi-folder' },
        { nome: 'App de Vistorias', desc: '8 tarefas nesta semana', valor: '78%', icone: 'pi-mobile' },
        { nome: 'API de Pagamentos', desc: '5 tarefas nesta semana', valor: '64%', icone: 'pi-server' },
    ];

    private series: Record<string, number[]> = {
        semana: [12, 19, 15, 22, 18, 25, 21],
        mes: [40, 55, 48, 62, 70, 65, 80],
        trimestre: [120, 150, 135, 180, 210, 195, 240],
    };

    private accent = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#10b981';

    chartData = computed(() => ({
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [{
            label: 'Atividades',
            data: this.series[this.periodo()],
            fill: true,
            tension: 0.4,
            borderColor: this.accent,
            backgroundColor: 'color-mix(in srgb, ' + this.accent + ' 14%, transparent)',
        }],
    }));

    chartOptions = {
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
    };
}
