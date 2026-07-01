import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ChartModule } from 'primeng/chart';
import { MeterGroupModule } from 'primeng/metergroup';
import { ProgressBarModule } from 'primeng/progressbar';
import { ACOES_TICKER_MOCK, ASSUNTOS_MANUAL_MOCK, PROJETOS_MOCK } from './godev.mock';
import { AgenteTipo, PeriodoUso } from './godev.models';
import { BG_TIPO, COR_AGENTE, COR_SISTEMA_MANUAL, COR_TIPO, ICON_AGENTE, LABEL_AGENTE, iniciais } from './godev.ui';

interface AcaoFeed { id: number; agente: AgenteTipo; texto: string; hora: string; }

const PALETA_PORTFOLIO = ['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4', '#ef4444', '#84cc16', '#6366f1'];

@Component({
    selector: 'app-godev-home',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, TooltipModule, TagModule, SelectButtonModule, ChartModule, MeterGroupModule, ProgressBarModule],
    templateUrl: './godev-home.html',
    styleUrl:    './godev-home.scss',
})
export class GodevHome implements OnInit, OnDestroy {
    private router = inject(Router);

    iniciais = iniciais;
    corTipo = COR_TIPO;
    bgTipo  = BG_TIPO;

    // ===================== Projetos mais populares =====================
    periodoOpcoes: { label: string; value: PeriodoUso }[] = [
        { label: 'Semana',   value: 'semana' },
        { label: 'Mês',      value: 'mes' },
        { label: '3 meses',  value: 'tresMeses' },
    ];
    periodoSel = signal<PeriodoUso>('semana');

    private miniChartOptions = {
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                displayColors: false,
                callbacks: {
                    title: (items: any[]) => items[0]?.label ?? '',
                    label: (item: any) => `${item.parsed.y} atualizações`,
                },
            },
        },
        scales: {
            x: { display: false, offset: false },
            y: { display: false, beginAtZero: true },
        },
        layout: { padding: 0 },
        maintainAspectRatio: false,
        responsive: true,
        interaction: { intersect: false, mode: 'index' },
        elements: { point: { radius: 0, hoverRadius: 4, hitRadius: 12 } },
    };

    private labelDoPeriodo(periodo: PeriodoUso, i: number): string {
        if (periodo === 'semana')    return `Dia ${i + 1}`;
        if (periodo === 'mes')       return `Semana ${i + 1}`;
        return `Mês ${i + 1}`;
    }

    projetosPopulares = computed(() => {
        const periodo = this.periodoSel();
        return [...PROJETOS_MOCK]
            .sort((a, b) => (b.uso?.[periodo].media ?? 0) - (a.uso?.[periodo].media ?? 0))
            .slice(0, 4)
            .map(p => ({
                projeto: p,
                media: p.uso?.[periodo].media ?? 0,
                chartData: {
                    labels: (p.uso?.[periodo].serie ?? []).map((_, i) => this.labelDoPeriodo(periodo, i)),
                    datasets: [{
                        data: p.uso?.[periodo].serie ?? [],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.15)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2,
                    }],
                },
                chartOptions: this.miniChartOptions,
            }));
    });

    // ===================== Portfólio de projetos =====================
    portfolioItems = computed(() => {
        const total = PROJETOS_MOCK.reduce((acc, p) => acc + (p.uso?.tresMeses.media ?? 0), 0) || 1;
        return PROJETOS_MOCK
            .map((p, i) => ({
                label: p.nome,
                value: Math.max(1, Math.round((p.uso!.tresMeses.media / total) * 100)),
                color: PALETA_PORTFOLIO[i % PALETA_PORTFOLIO.length],
            }))
            .sort((a, b) => b.value - a.value);
    });

    // ===================== Ações recentes (ticker) =====================
    private proximoAcaoId = 1;
    private acaoIdx = 0;
    private tickerTimer?: ReturnType<typeof setInterval>;
    feed = signal<AcaoFeed[]>([]);

    private horaAgora(): string {
        return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }

    private proximaAcao() {
        if (!ACOES_TICKER_MOCK.length) return;
        const acao = ACOES_TICKER_MOCK[this.acaoIdx % ACOES_TICKER_MOCK.length];
        this.acaoIdx++;
        this.feed.update(lista => {
            const nova: AcaoFeed = { id: this.proximoAcaoId++, agente: acao.agente, texto: acao.texto, hora: this.horaAgora() };
            const atualizada = [nova, ...lista];
            return atualizada.length > 200 ? atualizada.slice(0, 200) : atualizada;
        });
    }

    ngOnInit() {
        // Primeiras ações aparecem de imediato; as próximas chegam num ritmo legível.
        this.proximaAcao();
        this.proximaAcao();
        this.tickerTimer = setInterval(() => this.proximaAcao(), 5000);
    }

    ngOnDestroy() {
        if (this.tickerTimer) clearInterval(this.tickerTimer);
    }

    labelAgente(agente: AgenteTipo) { return LABEL_AGENTE[agente]; }
    iconAgente(agente: AgenteTipo)  { return ICON_AGENTE[agente]; }
    corAgenteDe(agente: AgenteTipo) { return COR_AGENTE[agente]; }

    // ===================== Principais assuntos do Manual Inteligente =====================
    assuntosManual = computed(() => {
        const max = Math.max(...ASSUNTOS_MANUAL_MOCK.map(a => a.perguntas));
        return [...ASSUNTOS_MANUAL_MOCK]
            .sort((a, b) => b.perguntas - a.perguntas)
            .slice(0, 6)
            .map((a, i) => ({ ...a, posicao: i + 1, percentual: Math.round((a.perguntas / max) * 100) }));
    });

    corSistema(sistema: string) { return COR_SISTEMA_MANUAL[sistema] ?? '#6b7280'; }

    irProjetos()             { this.router.navigate(['/godev/projetos']); }
    abrirProjeto(projetoId: number) { this.router.navigate(['/godev/projetos', projetoId, 'workspace']); }
    abrirManual()             { this.router.navigate(['/manual']); }
}
