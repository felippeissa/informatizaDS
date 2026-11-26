import { Injectable, effect, inject, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LayoutService } from '@/app/layout/service/layout.service';

/** Lê o valor computado de uma variável CSS no :root. */
export function lerVar(nome: string): string {
    if (typeof document === 'undefined') return '';
    return getComputedStyle(document.documentElement).getPropertyValue(nome).trim();
}

/** Converte rem em px usando o font-size raiz atual (no DS 3.0 é 14px). */
export function remParaPx(rem: number): number {
    if (typeof document === 'undefined') return rem * 14;
    return Math.round(rem * parseFloat(getComputedStyle(document.documentElement).fontSize) * 100) / 100;
}

/**
 * Utilitário das páginas de Foundations: copia texto com toast e expõe um
 * "tick" que muda sempre que o tema (cor primária, superfície, claro/escuro)
 * muda — use-o para reler as variáveis CSS.
 */
@Injectable({ providedIn: 'root' })
export class FoundationsService {
    private msg = inject(MessageService);
    private layout = inject(LayoutService);

    tick = signal(0);

    constructor() {
        effect(() => {
            this.layout.layoutConfig();
            // espera o PrimeNG aplicar o novo tema antes de reler as variáveis
            setTimeout(() => this.tick.update((v) => v + 1), 60);
        });
    }

    copiar(texto: string) {
        navigator.clipboard?.writeText(texto);
        this.msg.add({ severity: 'success', summary: 'Sucesso', detail: 'Copiado: ' + texto, life: 3000 });
    }
}
