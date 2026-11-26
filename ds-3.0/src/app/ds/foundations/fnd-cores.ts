import { Component, computed, inject } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { FoundationsService, lerVar } from './fnd-util';

const ESCALA = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

interface Semantica { variavel: string; nome: string; uso: string; }
interface Feedback { severidade: 'success' | 'info' | 'warn' | 'danger' | 'secondary'; variavel: string; nome: string; uso: string; }

/** FOUNDATION — Cores. Valores lidos ao vivo do tema (mudam com o configurador). */
@Component({
    selector: 'app-fnd-cores',
    standalone: true,
    imports: [TagModule, ButtonModule],
    template: `
    <div class="ds-page">
        <div class="ds-page-header">
            <div>
                <h1 class="ds-page-title">Cores</h1>
                <p class="fnd-intro">Paleta do preset <strong>Aura</strong> com primária <strong>emerald</strong>. Clique em uma cor para copiar a variável CSS.</p>
            </div>
        </div>

        <div class="ds-warning-box fnd-regra">
            <i class="pi pi-exclamation-triangle"></i>
            <span><strong>Regra:</strong> use sempre as variáveis do tema (<code>var(--primary-color)</code>, <code>var(--surface-card)</code>…). Nunca escreva cores hexadecimais fixas — elas quebram o modo escuro e a troca de tema.</span>
        </div>

        <!-- Semânticas -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-bookmark"></i> Cores semânticas (use estas primeiro)</h2>
            <p class="ds-card-sub">Variáveis com significado de uso. São as que devem aparecer no CSS das telas.</p>
            <div class="fnd-sem-grid">
                @for (s of semanticas; track s.variavel) {
                    <button type="button" class="fnd-sem" (click)="fnd.copiar('var(' + s.variavel + ')')">
                        <span class="fnd-sem-amostra" [style.background]="'var(' + s.variavel + ')'"></span>
                        <span class="fnd-sem-info">
                            <strong>{{ s.nome }}</strong>
                            <code>{{ s.variavel }}</code>
                            <small>{{ s.uso }}</small>
                            <small class="fnd-hex">{{ valores()[s.variavel] }}</small>
                        </span>
                    </button>
                }
            </div>
        </div>

        <!-- Primária -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-circle-fill"></i> Primária</h2>
            <p class="ds-card-sub">Ações principais, links, itens ativos e foco. O tom <strong>500</strong> é a cor primária (<code>--primary-color</code>).</p>
            <div class="fnd-escala">
                @for (t of escala; track t) {
                    <button type="button" class="fnd-swatch" [class.fnd-swatch--base]="t === '500'" (click)="fnd.copiar('var(--p-primary-' + t + ')')">
                        <span class="fnd-swatch-cor" [style.background]="'var(--p-primary-' + t + ')'"></span>
                        <span class="fnd-swatch-nome">{{ t }}</span>
                        <span class="fnd-swatch-hex">{{ valores()['--p-primary-' + t] }}</span>
                    </button>
                }
            </div>
        </div>

        <!-- Superfície -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-clone"></i> Superfície (neutros)</h2>
            <p class="ds-card-sub">Fundos, bordas e textos. No tema claro a superfície é <strong>slate</strong>; no escuro, <strong>zinc</strong>.</p>
            <div class="fnd-escala">
                @for (t of escalaSuperficie; track t) {
                    <button type="button" class="fnd-swatch" (click)="fnd.copiar('var(--p-surface-' + t + ')')">
                        <span class="fnd-swatch-cor" [style.background]="'var(--p-surface-' + t + ')'"></span>
                        <span class="fnd-swatch-nome">{{ t }}</span>
                        <span class="fnd-swatch-hex">{{ valores()['--p-surface-' + t] }}</span>
                    </button>
                }
            </div>
        </div>

        <!-- Feedback -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-flag"></i> Feedback e status</h2>
            <p class="ds-card-sub">Nos componentes, use a propriedade <code>severity</code> em vez da cor direta.</p>
            <div class="fnd-sem-grid">
                @for (f of feedbacks; track f.severidade) {
                    <div class="fnd-sem fnd-sem--estatico">
                        <span class="fnd-sem-amostra" [style.background]="'var(' + f.variavel + ')'"></span>
                        <span class="fnd-sem-info">
                            <strong>{{ f.nome }} <p-tag [value]="f.nome" [severity]="f.severidade" /></strong>
                            <code>severity="{{ f.severidade }}"</code>
                            <small>{{ f.uso }}</small>
                        </span>
                    </div>
                }
            </div>
        </div>
    </div>
    `
})
export class FndCores {
    fnd = inject(FoundationsService);

    escala = ESCALA;
    escalaSuperficie = ['0', ...ESCALA];

    semanticas: Semantica[] = [
        { variavel: '--primary-color', nome: 'Primária', uso: 'Botão principal, links, item ativo, foco' },
        { variavel: '--surface-ground', nome: 'Fundo da página', uso: 'Área atrás dos cards' },
        { variavel: '--surface-card', nome: 'Fundo de card', uso: 'Cards, painéis, modais, tabelas' },
        { variavel: '--surface-border', nome: 'Borda', uso: 'Bordas de cards, divisores, tabelas' },
        { variavel: '--surface-hover', nome: 'Hover', uso: 'Fundo de item ao passar o mouse' },
        { variavel: '--text-color', nome: 'Texto', uso: 'Títulos e texto principal' },
        { variavel: '--text-color-secondary', nome: 'Texto secundário', uso: 'Descrições, legendas, placeholders' },
    ];

    feedbacks: Feedback[] = [
        { severidade: 'success', variavel: '--p-green-500', nome: 'Sucesso', uso: 'Ativo, concluído, aprovado' },
        { severidade: 'info', variavel: '--p-sky-500', nome: 'Informação', uso: 'Avisos neutros, novidades' },
        { severidade: 'warn', variavel: '--p-orange-500', nome: 'Atenção', uso: 'Pendente, em análise, prazo próximo' },
        { severidade: 'danger', variavel: '--p-red-500', nome: 'Erro', uso: 'Inativo, recusado, exclusão, erro' },
        { severidade: 'secondary', variavel: '--p-surface-500', nome: 'Neutro', uso: 'Rascunho, sem status definido' },
    ];

    valores = computed(() => {
        this.fnd.tick();
        const nomes = [
            ...this.semanticas.map((s) => s.variavel),
            ...ESCALA.map((t) => '--p-primary-' + t),
            ...this.escalaSuperficie.map((t) => '--p-surface-' + t),
        ];
        const r: Record<string, string> = {};
        nomes.forEach((n) => (r[n] = lerVar(n)));
        return r;
    });
}
