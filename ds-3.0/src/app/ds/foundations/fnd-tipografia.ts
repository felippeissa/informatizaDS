import { Component, inject } from '@angular/core';
import { FoundationsService, remParaPx } from './fnd-util';

interface Estilo { nome: string; uso: string; tamanho: number; peso: number; cor: string; css: string; exemplo: string; }

/** FOUNDATION — Tipografia. */
@Component({
    selector: 'app-fnd-tipografia',
    standalone: true,
    template: `
    <div class="ds-page">
        <div class="ds-page-header">
            <div>
                <h1 class="ds-page-title">Tipografia</h1>
                <p class="fnd-intro">Fonte <strong>Inter</strong>. A raiz da página é <strong>14px</strong>, então <code>1rem = {{ px(1) }}px</code>.</p>
            </div>
        </div>

        <!-- Família -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-pencil"></i> Família tipográfica</h2>
            <div class="fnd-familia">
                <span class="fnd-familia-aa">Aa</span>
                <div>
                    <strong>Inter</strong>
                    <p class="fnd-texto-sec">Fonte sem serifa otimizada para interfaces. Carregada de <code>https://rsms.me/inter/inter.css</code>.</p>
                    <code>font-family: 'Inter var', 'Inter', sans-serif;</code>
                    <p class="fnd-alfabeto">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789 áéíóúâêôãõç</p>
                </div>
            </div>
        </div>

        <!-- Escala -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-sort-amount-down"></i> Escala tipográfica</h2>
            <p class="ds-card-sub">Estilos usados nas telas do DS. Clique em um estilo para copiar o CSS.</p>
            <div class="fnd-tipo-lista">
                @for (e of estilos; track e.nome) {
                    <button type="button" class="fnd-tipo-item" (click)="fnd.copiar(e.css)">
                        <div class="fnd-tipo-meta">
                            <strong>{{ e.nome }}</strong>
                            <small>{{ e.uso }}</small>
                            <code>{{ e.tamanho }}rem · {{ px(e.tamanho) }}px · {{ e.peso }}</code>
                        </div>
                        <div class="fnd-tipo-exemplo"
                             [style.font-size.rem]="e.tamanho" [style.font-weight]="e.peso" [style.color]="'var(' + e.cor + ')'">
                            {{ e.exemplo }}
                        </div>
                    </button>
                }
            </div>
        </div>

        <!-- Pesos -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-bars"></i> Pesos</h2>
            <div class="ds-grid ds-grid--kpi">
                @for (p of pesos; track p.valor) {
                    <div class="fnd-peso">
                        <span [style.font-weight]="p.valor">Informatiza</span>
                        <small>{{ p.nome }} · {{ p.valor }}</small>
                    </div>
                }
            </div>
        </div>

        <!-- Boas práticas -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-check-square"></i> Boas práticas</h2>
            <ul class="fnd-lista">
                <li>Um único <code>&lt;h1 class="ds-page-title"&gt;</code> por tela; seções de card usam <code>&lt;h2 class="ds-card-titulo"&gt;</code>.</li>
                <li>Texto em <strong>sentence case</strong> ("Novo usuário", não "Novo Usuário" nem "NOVO USUÁRIO").</li>
                <li>Use <code>var(--text-color-secondary)</code> para descrições e legendas, nunca cinza fixo.</li>
                <li>Não use tamanhos abaixo de <code>0.75rem</code> ({{ px(0.75) }}px) em textos de leitura.</li>
                <li>Números em tabelas e KPIs ficam alinhados com <code>font-variant-numeric: tabular-nums</code>.</li>
            </ul>
        </div>
    </div>
    `
})
export class FndTipografia {
    fnd = inject(FoundationsService);
    px = remParaPx;

    estilos: Estilo[] = [
        { nome: 'Display', uso: 'Hero da vitrine / páginas de boas-vindas', tamanho: 2.5, peso: 800, cor: '--text-color', css: 'font-size: 2.5rem; font-weight: 800; color: var(--text-color);', exemplo: 'Informatiza Goiás' },
        { nome: 'Título da página', uso: '.ds-page-title (h1)', tamanho: 1.5, peso: 700, cor: '--text-color', css: 'font-size: 1.5rem; font-weight: 700; color: var(--text-color);', exemplo: 'Cadastro de servidores' },
        { nome: 'Título de seção', uso: '.ds-card-titulo (h2)', tamanho: 1, peso: 700, cor: '--text-color', css: 'font-size: 1rem; font-weight: 700; color: var(--text-color);', exemplo: 'Informações gerais' },
        { nome: 'Corpo', uso: 'Texto padrão, células de tabela, inputs', tamanho: 1, peso: 400, cor: '--text-color', css: 'font-size: 1rem; font-weight: 400; color: var(--text-color);', exemplo: 'O servidor foi cadastrado com sucesso no sistema.' },
        { nome: 'Rótulo de campo', uso: '.ds-campo label', tamanho: 0.8125, peso: 600, cor: '--text-color', css: 'font-size: 0.8125rem; font-weight: 600; color: var(--text-color);', exemplo: 'Nome completo' },
        { nome: 'Descrição', uso: '.ds-card-sub, textos de apoio', tamanho: 0.8125, peso: 400, cor: '--text-color-secondary', css: 'font-size: 0.8125rem; color: var(--text-color-secondary);', exemplo: 'Preencha os dados conforme o documento oficial.' },
        { nome: 'Legenda', uso: 'Ajuda de campo, metadados, datas', tamanho: 0.75, peso: 500, cor: '--text-color-secondary', css: 'font-size: 0.75rem; font-weight: 500; color: var(--text-color-secondary);', exemplo: 'Atualizado em 26/11/2026' },
    ];

    pesos = [
        { nome: 'Regular', valor: 400 },
        { nome: 'Medium', valor: 500 },
        { nome: 'Semibold', valor: 600 },
        { nome: 'Bold', valor: 700 },
        { nome: 'Extrabold', valor: 800 },
    ];
}
