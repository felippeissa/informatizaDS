import { Component, HostListener, inject, signal } from '@angular/core';
import { FoundationsService } from './fnd-util';

/** FOUNDATION — Grid, layout e breakpoints. */
@Component({
    selector: 'app-fnd-grid',
    standalone: true,
    template: `
    <div class="ds-page">
        <div class="ds-page-header">
            <div>
                <h1 class="ds-page-title">Grid e layout</h1>
                <p class="fnd-intro">Estrutura das telas, grades responsivas e pontos de quebra. Largura atual da janela: <strong>{{ largura() }}px</strong> ({{ faixaAtual() }}).</p>
            </div>
        </div>

        <!-- Anatomia do layout -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-desktop"></i> Estrutura da aplicação</h2>
            <p class="ds-card-sub">Fornecida pelo <code>AppLayout</code>. As telas só preenchem a área de conteúdo com <code>.ds-page</code>.</p>
            <div class="fnd-app">
                <div class="fnd-app-topbar">Topbar · logo, seletor de sistema, tema, sair</div>
                <div class="fnd-app-corpo">
                    <div class="fnd-app-menu">Menu lateral<br /><small>20rem · some abaixo de 992px</small></div>
                    <div class="fnd-app-conteudo">
                        <div class="fnd-app-page">.ds-page
                            <div class="fnd-app-card">.ds-card</div>
                            <div class="fnd-app-card">.ds-card</div>
                        </div>
                        <div class="fnd-app-footer">Rodapé</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Grades -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-th-large"></i> Grades responsivas</h2>
            <p class="ds-card-sub">As colunas se ajustam sozinhas à largura disponível — não é preciso media query.</p>

            <h3 class="fnd-sub">.ds-grid.ds-grid--form · colunas de no mínimo 240px</h3>
            <div class="ds-grid ds-grid--form">
                @for (i of [1, 2, 3, 4]; track i) { <div class="fnd-cel">Campo {{ i }}</div> }
            </div>

            <h3 class="fnd-sub">.ds-grid.ds-grid--kpi · colunas de no mínimo 180px</h3>
            <div class="ds-grid ds-grid--kpi">
                @for (i of [1, 2, 3, 4, 5]; track i) { <div class="fnd-cel">KPI {{ i }}</div> }
            </div>

            <h3 class="fnd-sub">Grid de 12 colunas (Tailwind) · para layouts específicos</h3>
            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-12 md:col-span-8 fnd-cel">col-span-12 md:col-span-8</div>
                <div class="col-span-12 md:col-span-4 fnd-cel">col-span-12 md:col-span-4</div>
                <div class="col-span-12 md:col-span-6 lg:col-span-3 fnd-cel">lg:col-span-3</div>
                <div class="col-span-12 md:col-span-6 lg:col-span-3 fnd-cel">lg:col-span-3</div>
                <div class="col-span-12 md:col-span-6 lg:col-span-3 fnd-cel">lg:col-span-3</div>
                <div class="col-span-12 md:col-span-6 lg:col-span-3 fnd-cel">lg:col-span-3</div>
            </div>
        </div>

        <!-- Breakpoints -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-mobile"></i> Breakpoints</h2>
            <p class="ds-card-sub">Mesmos valores nas utilities do Tailwind (<code>sm:</code>, <code>md:</code>…) e no layout.</p>
            <table class="fnd-tabela">
                <thead><tr><th>Prefixo</th><th>A partir de</th><th>Dispositivo</th><th></th></tr></thead>
                <tbody>
                    @for (b of breakpoints; track b.prefixo) {
                        <tr [class.fnd-ativo]="faixaAtual() === b.prefixo">
                            <td><code>{{ b.prefixo }}</code></td>
                            <td>{{ b.min }}px</td>
                            <td>{{ b.dispositivo }}</td>
                            <td>@if (faixaAtual() === b.prefixo) { <small class="fnd-agora">você está aqui</small> }</td>
                        </tr>
                    }
                </tbody>
            </table>
            <ul class="fnd-lista">
                <li>Abaixo de <strong>992px</strong> o menu lateral vira sobreposição (botão ☰ na topbar).</li>
                <li>Projete primeiro para <strong>1366px</strong> (notebook comum no governo) e confira em 768px.</li>
                <li>Tabelas largas: envolva em rolagem horizontal em vez de esconder colunas importantes.</li>
            </ul>
        </div>
    </div>
    `
})
export class FndGrid {
    fnd = inject(FoundationsService);

    breakpoints = [
        { prefixo: 'base', min: 0, dispositivo: 'Celular' },
        { prefixo: 'sm', min: 576, dispositivo: 'Celular grande' },
        { prefixo: 'md', min: 768, dispositivo: 'Tablet' },
        { prefixo: 'lg', min: 992, dispositivo: 'Notebook (menu lateral fixo)' },
        { prefixo: 'xl', min: 1200, dispositivo: 'Desktop' },
        { prefixo: '2xl', min: 1920, dispositivo: 'Monitor Full HD' },
    ];

    largura = signal(typeof window !== 'undefined' ? window.innerWidth : 1366);

    faixaAtual() {
        const w = this.largura();
        return [...this.breakpoints].reverse().find((b) => w >= b.min)!.prefixo;
    }

    @HostListener('window:resize')
    onResize() { this.largura.set(window.innerWidth); }
}
