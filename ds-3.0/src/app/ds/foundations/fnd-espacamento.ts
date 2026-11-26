import { Component, inject } from '@angular/core';
import { FoundationsService, remParaPx } from './fnd-util';

/** FOUNDATION — Espaçamento. */
@Component({
    selector: 'app-fnd-espacamento',
    standalone: true,
    template: `
    <div class="ds-page">
        <div class="ds-page-header">
            <div>
                <h1 class="ds-page-title">Espaçamento</h1>
                <p class="fnd-intro">Escala em <code>rem</code> (raiz de 14px). Onde o guia da GESIS define a medida — <strong>16px</strong> entre botões, campos, colunas e blocos — use 16px.</p>
            </div>
        </div>

        <div class="ds-warning-box fnd-regra">
            <i class="pi pi-exclamation-triangle"></i>
            <span><strong>Regra:</strong> nunca use <code>padding: 0</code>. Todo bloco tem respiro — o mínimo dentro de um card é <code>1rem</code>.</span>
        </div>

        <!-- Escala -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-arrows-h"></i> Escala</h2>
            <p class="ds-card-sub">Clique para copiar o valor.</p>
            <div class="fnd-espaco-lista">
                @for (e of escala; track e.token) {
                    <button type="button" class="fnd-espaco" (click)="fnd.copiar(e.rem + 'rem')">
                        <code class="fnd-espaco-token">{{ e.token }}</code>
                        <span class="fnd-espaco-barra" [style.width.rem]="e.rem"></span>
                        <span class="fnd-espaco-valor">{{ e.rem }}rem · {{ px(e.rem) }}px</span>
                        <small>{{ e.uso }}</small>
                    </button>
                }
            </div>
        </div>

        <!-- Aplicação -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-th-large"></i> Espaçamentos padrão das telas</h2>
            <p class="ds-card-sub">Já aplicados pelas classes <code>.ds-*</code> — você não precisa repetir.</p>
            <div class="fnd-anatomia">
                <div class="fnd-anat-page">
                    <span class="fnd-anat-tag">.ds-page · padding 1.5rem · gap 16px</span>
                    <div class="fnd-anat-header">
                        <span class="fnd-anat-titulo">Título da página</span>
                        <span class="fnd-anat-botao">Ação</span>
                    </div>
                    <div class="fnd-anat-card">
                        <span class="fnd-anat-tag">.ds-card · padding 1.5rem</span>
                        <div class="fnd-anat-campos">
                            <div class="fnd-anat-campo"><span>Rótulo</span><i></i></div>
                            <div class="fnd-anat-campo"><span>Rótulo</span><i></i></div>
                            <div class="fnd-anat-campo"><span>Rótulo</span><i></i></div>
                        </div>
                        <span class="fnd-anat-tag">.ds-grid · gap 16px · .ds-campo · gap 0.4rem</span>
                    </div>
                    <div class="fnd-anat-card fnd-anat-card--baixo">
                        <span class="fnd-anat-tag">.ds-card</span>
                    </div>
                </div>
            </div>
            <table class="fnd-tabela">
                <thead><tr><th>Onde</th><th>Valor</th><th>Classe</th></tr></thead>
                <tbody>
                    @for (a of aplicacoes; track a.onde) {
                        <tr><td>{{ a.onde }}</td><td><code>{{ a.valor }}</code></td><td><code>{{ a.classe }}</code></td></tr>
                    }
                </tbody>
            </table>
        </div>
    </div>
    `
})
export class FndEspacamento {
    fnd = inject(FoundationsService);
    px = remParaPx;

    escala = [
        { token: 'space-1', rem: 0.25, uso: 'Ícone e texto colados, chips' },
        { token: 'space-2', rem: 0.5, uso: 'Entre botões, ícone + rótulo' },
        { token: 'space-3', rem: 0.75, uso: 'Itens de lista, barra de ações' },
        { token: 'space-4', rem: 1, uso: 'Espaçamentos internos menores' },
        { token: 'space-5', rem: 1.25, uso: 'Separação de grupos internos' },
        { token: 'space-6', rem: 1.5, uso: 'Padding de card e de página' },
        { token: 'space-8', rem: 2, uso: 'Estados vazios, seções grandes' },
        { token: 'space-12', rem: 3, uso: 'Hero, telas de boas-vindas' },
    ];

    aplicacoes = [
        { onde: 'Padding da página', valor: '1.5rem', classe: '.ds-page' },
        { onde: 'Espaço entre cards', valor: '16px', classe: '.ds-page (gap)' },
        { onde: 'Padding do card', valor: '1.5rem', classe: '.ds-card' },
        { onde: 'Título do card → conteúdo', valor: '1rem', classe: '.ds-card-titulo' },
        { onde: 'Entre campos e colunas (guia GESIS)', valor: '16px', classe: '.ds-grid' },
        { onde: 'Rótulo → campo', valor: '0.4rem', classe: '.ds-campo' },
        { onde: 'Entre botões (guia GESIS)', valor: '16px', classe: '.ds-botoes' },
        { onde: 'Entre ícones de ação da tabela', valor: '0.25rem', classe: '.ds-acoes-row' },
    ];
}
