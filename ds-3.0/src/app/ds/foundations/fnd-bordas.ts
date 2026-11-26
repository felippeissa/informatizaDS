import { Component, inject } from '@angular/core';
import { FoundationsService } from './fnd-util';

/** FOUNDATION — Bordas, raios e elevação. */
@Component({
    selector: 'app-fnd-bordas',
    standalone: true,
    template: `
    <div class="ds-page">
        <div class="ds-page-header">
            <div>
                <h1 class="ds-page-title">Bordas, raios e elevação</h1>
                <p class="fnd-intro">Cantos arredondados e sombras sutis. Clique em um item para copiar o CSS.</p>
            </div>
        </div>

        <!-- Raios -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-stop"></i> Raios de borda</h2>
            <p class="ds-card-sub">Componentes PrimeNG já usam o raio <code>md</code>. Cards de página usam <code>xl</code> (12px).</p>
            <div class="fnd-raios">
                @for (r of raios; track r.token) {
                    <button type="button" class="fnd-raio" (click)="fnd.copiar('border-radius: ' + r.css + ';')">
                        <span class="fnd-raio-box" [style.border-radius]="r.css"></span>
                        <strong>{{ r.token }}</strong>
                        <code>{{ r.valor }}</code>
                        <small>{{ r.uso }}</small>
                    </button>
                }
            </div>
        </div>

        <!-- Bordas -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-minus"></i> Bordas</h2>
            <div class="fnd-raios">
                @for (b of bordas; track b.nome) {
                    <button type="button" class="fnd-raio" (click)="fnd.copiar(b.css)">
                        <span class="fnd-raio-box fnd-raio-box--borda" [attr.style]="b.css"></span>
                        <strong>{{ b.nome }}</strong>
                        <small>{{ b.uso }}</small>
                    </button>
                }
            </div>
        </div>

        <!-- Elevação -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-clone"></i> Elevação (sombras)</h2>
            <p class="ds-card-sub">Quanto mais alto o nível, mais o elemento "flutua". Telas comuns usam só o nível 1.</p>
            <div class="fnd-raios">
                @for (s of sombras; track s.nivel) {
                    <button type="button" class="fnd-raio" (click)="fnd.copiar('box-shadow: ' + s.valor + ';')">
                        <span class="fnd-raio-box fnd-raio-box--sombra" [style.box-shadow]="s.valor"></span>
                        <strong>Nível {{ s.nivel }} · {{ s.nome }}</strong>
                        <small>{{ s.uso }}</small>
                    </button>
                }
            </div>
        </div>
    </div>
    `
})
export class FndBordas {
    fnd = inject(FoundationsService);

    raios = [
        { token: 'none', valor: '0', css: '0', uso: 'Tabelas coladas, divisores' },
        { token: 'xs', valor: '2px', css: 'var(--p-border-radius-xs, 2px)', uso: 'Detalhes mínimos' },
        { token: 'sm', valor: '4px', css: 'var(--p-border-radius-sm, 4px)', uso: 'Tags, badges, checkbox' },
        { token: 'md', valor: '6px', css: 'var(--p-border-radius-md, 6px)', uso: 'Botões, inputs, selects (padrão)' },
        { token: 'lg', valor: '8px', css: 'var(--p-border-radius-lg, 8px)', uso: 'Menus, popovers' },
        { token: 'xl', valor: '12px', css: 'var(--p-border-radius-xl, 12px)', uso: 'Cards (.ds-card), modais' },
        { token: 'full', valor: '9999px', css: '9999px', uso: 'Avatares, botões redondos, pills' },
    ];

    bordas = [
        { nome: 'Padrão', css: 'border: 1px solid var(--surface-border);', uso: 'Cards, tabelas, inputs' },
        { nome: 'Destaque', css: 'border: 1px solid var(--primary-color);', uso: 'Item selecionado, foco' },
        { nome: 'Tracejada', css: 'border: 1px dashed var(--surface-border);', uso: 'Área de upload, estado vazio' },
    ];

    sombras = [
        { nivel: 0, nome: 'Plano', valor: 'none', uso: 'Elementos dentro de cards' },
        { nivel: 1, nome: 'Card', valor: '0 1px 4px rgba(0, 0, 0, 0.04)', uso: '.ds-card — padrão das telas' },
        { nivel: 2, nome: 'Overlay', valor: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)', uso: 'Dropdowns, popovers, menus' },
        { nivel: 3, nome: 'Modal', valor: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', uso: 'Dialogs e drawers' },
    ];
}
