import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'app-dracon-relatorios',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, SelectModule],
    template: `
<div class="list-container">
    <div class="list-header">
        <h2 class="list-title">Relatórios</h2>
    </div>

    <div class="id-bar">
        <span class="id-label"><i class="pi pi-id-card"></i> Identificação</span>
        <span class="id-item"><strong>Usuário</strong> João da Silva</span>
        <span class="id-item"><strong>Unidade</strong> 21189 - Gerência de Tecnologia do Estado</span>
    </div>

    <!-- Relatório 1: Quantidade de processos -->
    <div class="report-card">
        <div class="report-card-header">
            <i class="pi pi-chart-bar report-icon"></i>
            <div>
                <p class="report-title">Relatório de quantidade de processo</p>
                <p class="report-desc">Gera um relatório com a quantidade de processos agrupados por tipo no período informado.</p>
            </div>
        </div>
        <div class="filter-row five-col">
            <div class="filter-field">
                <label>Tipo de processo</label>
                <p-select [(ngModel)]="r1.tipoProcesso" [options]="tiposProcesso" placeholder="Selecione uma opção" [showClear]="true" />
            </div>
            <div class="filter-field">
                <label>Ano início</label>
                <p-select [(ngModel)]="r1.anoInicio" [options]="anos" placeholder="Selecione" [showClear]="true" />
            </div>
            <div class="filter-field">
                <label>Mês início</label>
                <p-select [(ngModel)]="r1.mesInicio" [options]="meses" placeholder="Selecione" [showClear]="true" />
            </div>
            <div class="filter-field">
                <label>Ano fim</label>
                <p-select [(ngModel)]="r1.anoFim" [options]="anos" placeholder="Selecione" [showClear]="true" />
            </div>
            <div class="filter-field">
                <label>Mês fim</label>
                <p-select [(ngModel)]="r1.mesFim" [options]="meses" placeholder="Selecione" [showClear]="true" />
            </div>
        </div>
        <div class="report-actions">
            <p-button label="Gerar relatório" icon="pi pi-file-export" (onClick)="gerarR1()" />
        </div>
    </div>

    <!-- Relatório 2: Tramitação dos processos -->
    <div class="report-card">
        <div class="report-card-header">
            <i class="pi pi-sitemap report-icon"></i>
            <div>
                <p class="report-title">Relatório de tramitação dos processos</p>
                <p class="report-desc">Gera um relatório detalhado com o histórico de tramitações dos processos no período informado.</p>
            </div>
        </div>
        <div class="filter-row four-col">
            <div class="filter-field">
                <label>Tipo de processo</label>
                <p-select [(ngModel)]="r2.tipoProcesso" [options]="tiposProcesso" placeholder="Selecione uma opção" [showClear]="true" />
            </div>
            <div class="filter-field">
                <label>Processo SEI</label>
                <p-select [(ngModel)]="r2.processoSEI" [options]="[]" placeholder="Selecione uma opção" [showClear]="true" />
            </div>
            <div class="filter-field">
                <label>Ano</label>
                <p-select [(ngModel)]="r2.ano" [options]="anos" placeholder="Selecione" [showClear]="true" />
            </div>
            <div class="filter-field">
                <label>Mês</label>
                <p-select [(ngModel)]="r2.mes" [options]="meses" placeholder="Selecione" [showClear]="true" />
            </div>
        </div>
        <div class="report-actions">
            <p-button label="Gerar relatório" icon="pi pi-file-export" (onClick)="gerarR2()" />
        </div>
    </div>
</div>`,
    styles: [`
        .list-container { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
        .list-header { display: flex; justify-content: space-between; align-items: center; }
        .list-title { font-size: 1.5rem; font-weight: 700; margin: 0; }
        .id-bar { display: flex; align-items: center; gap: 1.5rem; padding: .6rem 1rem;
                  border: 1px solid #e2e8f0; border-radius: 8px; background: #fff; font-size: .875rem; }
        .id-label { font-weight: 600; display: flex; align-items: center; gap: .4rem; }
        .id-item strong { color: #1e293b; margin-right: .25rem; }
        .report-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem; }
        .report-card-header { display: flex; align-items: flex-start; gap: 1rem; }
        .report-icon { font-size: 1.5rem; color: #3ACC75; margin-top: .1rem; }
        .report-title { font-size: 1rem; font-weight: 700; margin: 0 0 .2rem; color: #1e293b; }
        .report-desc { font-size: .8125rem; color: #64748b; margin: 0; }
        .filter-row { display: grid; gap: 1rem; }
        .five-col { grid-template-columns: repeat(5,1fr); }
        .four-col { grid-template-columns: repeat(4,1fr); }
        .filter-field { display: flex; flex-direction: column; gap: .25rem; }
        .filter-field label { font-size: .8125rem; font-weight: 500; color: #475569; }
        .filter-field p-select { width: 100%; }
        .report-actions { display: flex; justify-content: flex-end; }
    `]
})
export class DraconRelatorios {
    r1 = { tipoProcesso: null as any, anoInicio: null as any, mesInicio: null as any, anoFim: null as any, mesFim: null as any };
    r2 = { tipoProcesso: null as any, processoSEI: null as any, ano: null as any, mes: null as any };

    tiposProcesso = [{ label: 'Atos Administrativos', value: 'atos' }, { label: 'Processo Legislativo', value: 'leg' }];
    anos = Array.from({ length: 10 }, (_, i) => ({ label: String(2016 + i), value: 2016 + i }));
    meses = [
        { label: 'Janeiro', value: 1 }, { label: 'Fevereiro', value: 2 }, { label: 'Março', value: 3 },
        { label: 'Abril', value: 4 }, { label: 'Maio', value: 5 }, { label: 'Junho', value: 6 },
        { label: 'Julho', value: 7 }, { label: 'Agosto', value: 8 }, { label: 'Setembro', value: 9 },
        { label: 'Outubro', value: 10 }, { label: 'Novembro', value: 11 }, { label: 'Dezembro', value: 12 },
    ];

    gerarR1() {}
    gerarR2() {}
}
