import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FoundationsService } from './fnd-util';

/** FOUNDATION — Ícones (PrimeIcons). A lista é lida do CSS carregado. */
@Component({
    selector: 'app-fnd-icones',
    standalone: true,
    imports: [FormsModule, InputTextModule, IconFieldModule, InputIconModule],
    template: `
    <div class="ds-page">
        <div class="ds-page-header">
            <div>
                <h1 class="ds-page-title">Ícones</h1>
                <p class="fnd-intro">Biblioteca <strong>PrimeIcons</strong>: <code>&lt;i class="pi pi-nome"&gt;&lt;/i&gt;</code>. Clique em um ícone para copiar a classe.</p>
            </div>
        </div>

        <!-- Uso -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-info-circle"></i> Como usar</h2>
            <div class="ds-grid ds-grid--kpi">
                @for (t of tamanhos; track t.nome) {
                    <div class="fnd-peso">
                        <i class="pi pi-user" [style.font-size]="t.valor"></i>
                        <small>{{ t.nome }} · {{ t.valor }}</small>
                    </div>
                }
            </div>
            <ul class="fnd-lista">
                <li>Ícones herdam a cor do texto. Para destaque use <code>color: var(--primary-color)</code>.</li>
                <li>Botão só com ícone precisa de <code>ariaLabel</code> ou <code>pTooltip</code>.</li>
                <li>Use o mesmo ícone para a mesma ação em todo o sistema (veja a tabela abaixo).</li>
            </ul>
        </div>

        <!-- Ações padrão -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-bolt"></i> Ícones padrão por ação</h2>
            <div class="fnd-acoes-grid">
                @for (a of acoes; track a.acao) {
                    <button type="button" class="fnd-acao" (click)="fnd.copiar('pi ' + a.icone)">
                        <i class="pi" [class]="'pi ' + a.icone"></i>
                        <strong>{{ a.acao }}</strong>
                        <code>{{ a.icone }}</code>
                    </button>
                }
            </div>
        </div>

        <!-- Catálogo -->
        <div class="ds-card">
            <div class="fnd-cat-header">
                <h2 class="ds-card-titulo"><i class="pi pi-th-large"></i> Catálogo ({{ filtrados().length }} de {{ todos().length }})</h2>
                <p-iconfield>
                    <p-inputicon class="pi pi-search" />
                    <input pInputText [ngModel]="busca()" (ngModelChange)="busca.set($event)" placeholder="Buscar ícone (ex.: user, file)" aria-label="Buscar ícone" />
                </p-iconfield>
            </div>
            <div class="fnd-icones-grid">
                @for (n of filtrados(); track n) {
                    <button type="button" class="fnd-icone" (click)="fnd.copiar('pi ' + n)" [attr.aria-label]="n">
                        <i class="pi" [class]="'pi ' + n"></i>
                        <span>{{ n.replace('pi-', '') }}</span>
                    </button>
                } @empty {
                    <p class="fnd-texto-sec">Nenhum ícone encontrado.</p>
                }
            </div>
        </div>
    </div>
    `
})
export class FndIcones implements OnInit {
    fnd = inject(FoundationsService);

    busca = signal('');
    todos = signal<string[]>([]);
    filtrados = computed(() => {
        const b = this.busca().trim().toLowerCase();
        return b ? this.todos().filter((n) => n.includes(b)) : this.todos();
    });

    tamanhos = [
        { nome: 'Pequeno', valor: '0.875rem' },
        { nome: 'Padrão', valor: '1rem' },
        { nome: 'Médio', valor: '1.25rem' },
        { nome: 'Grande', valor: '1.5rem' },
        { nome: 'Destaque', valor: '2rem' },
    ];

    acoes = [
        { acao: 'Novo / adicionar', icone: 'pi-plus' },
        { acao: 'Editar', icone: 'pi-pencil' },
        { acao: 'Excluir', icone: 'pi-trash' },
        { acao: 'Salvar / confirmar', icone: 'pi-check' },
        { acao: 'Cancelar / fechar', icone: 'pi-times' },
        { acao: 'Buscar', icone: 'pi-search' },
        { acao: 'Filtrar', icone: 'pi-filter' },
        { acao: 'Visualizar', icone: 'pi-eye' },
        { acao: 'Baixar', icone: 'pi-download' },
        { acao: 'Enviar arquivo', icone: 'pi-upload' },
        { acao: 'Imprimir', icone: 'pi-print' },
        { acao: 'Voltar', icone: 'pi-arrow-left' },
        { acao: 'Mais ações', icone: 'pi-ellipsis-v' },
        { acao: 'Configurações', icone: 'pi-cog' },
        { acao: 'Ajuda', icone: 'pi-question-circle' },
        { acao: 'Sair', icone: 'pi-sign-out' },
    ];

    ngOnInit() {
        const nomes = new Set<string>();
        for (const folha of Array.from(document.styleSheets)) {
            let regras: CSSRuleList;
            try { regras = folha.cssRules; } catch { continue; }
            for (const r of Array.from(regras)) {
                const sel = (r as CSSStyleRule).selectorText;
                if (!sel) continue;
                for (const m of sel.matchAll(/\.(pi-[a-z0-9-]+)::?before/g)) nomes.add(m[1]);
            }
        }
        ['pi-spin', 'pi-fw'].forEach((n) => nomes.delete(n));
        this.todos.set([...nomes].sort());
    }
}
