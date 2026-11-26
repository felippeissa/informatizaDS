import { MenuItem } from 'primeng/api';

/**
 * Busca no menu — regras do padrão GESIS (Definições de padrões de design, item 2.2):
 * 1. Cada item é buscado pelo CAMINHO COMPLETO da raiz até ele ("Gestão de usuários · Consultas · Consultar").
 * 2. Todas as palavras precisam aparecer, em qualquer ordem, em qualquer parte do caminho.
 * 3. Ignora maiúsculas/minúsculas, acentos (orçamento = orcamento) e plural/singular (usuário = usuários; ação = ações).
 * 4. Ordem por relevância: nome idêntico > nome contém o termo > nome + pai direto > nome + ancestral distante.
 */

export interface ItemIndexado {
    item: MenuItem;
    /** Rótulos dos ancestrais, do mais distante ao pai direto. */
    ancestrais: string[];
    nome: string[];        // palavras normalizadas do nome
    pai: string[];         // palavras normalizadas do pai direto
    outros: string[];      // palavras normalizadas dos demais ancestrais
    nomeNormalizado: string;
}

export interface ResultadoBusca { item: MenuItem; caminho: string; relevancia: number; }

/** Minúsculas, sem acento, só letras/números. */
export function normalizar(texto: string): string {
    return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

/** Reduz plural do português ao singular (aproximação suficiente para menus). */
export function singular(p: string): string {
    if (p.length <= 3) return p;
    if (p.endsWith('oes') || p.endsWith('aes')) return p.slice(0, -3) + 'ao';   // ações → acao, pães → pao
    if (p.endsWith('ais')) return p.slice(0, -3) + 'al';                        // gerais → geral
    if (p.endsWith('eis')) return p.slice(0, -3) + 'el';                        // papéis → papel
    if (p.endsWith('ois')) return p.slice(0, -3) + 'ol';
    if (p.endsWith('ns')) return p.slice(0, -2) + 'm';                          // itens → item
    if (p.endsWith('res') || p.endsWith('zes') || p.endsWith('ses')) return p.slice(0, -2); // valores → valor
    if (p.endsWith('s')) return p.slice(0, -1);                                 // usuarios → usuario
    return p;
}

const IGNORAR = new Set(['de', 'da', 'do', 'das', 'dos', 'e', 'em', 'a', 'o', 'para', 'com']);

export function palavras(texto: string): string[] {
    return normalizar(texto).split(' ').filter((w) => w && !IGNORAR.has(w)).map(singular);
}

export function indexarMenu(model: MenuItem[]): ItemIndexado[] {
    const saida: ItemIndexado[] = [];
    const visitar = (itens: MenuItem[] | undefined, ancestrais: string[]) => {
        for (const it of itens ?? []) {
            if (it.separator || !it.label) continue;
            if (it.routerLink) {
                const pai = ancestrais[ancestrais.length - 1] ?? '';
                saida.push({
                    item: it,
                    ancestrais,
                    nome: palavras(it.label),
                    pai: palavras(pai),
                    outros: ancestrais.slice(0, -1).flatMap(palavras),
                    nomeNormalizado: normalizar(it.label),
                });
            }
            if (it.items?.length) visitar(it.items as MenuItem[], [...ancestrais, it.label]);
        }
    };
    visitar(model, []);
    return saida;
}

/** A palavra buscada "bate" com a do menu se for igual ou o começo dela (busca enquanto digita). */
const bate = (termo: string, lista: string[]) => lista.some((w) => w === termo || w.startsWith(termo));

export function buscarNoMenu(indice: ItemIndexado[], termo: string): ResultadoBusca[] {
    const consulta = palavras(termo);
    if (!consulta.length) return [];
    const consultaNormalizada = normalizar(termo);

    const resultados: ResultadoBusca[] = [];
    for (const r of indice) {
        const todas = [...r.nome, ...r.pai, ...r.outros];
        if (!consulta.every((t) => bate(t, todas))) continue;

        let relevancia: number;
        if (r.nomeNormalizado === consultaNormalizada) relevancia = 1;                          // nome idêntico
        else if (consulta.every((t) => bate(t, r.nome))) relevancia = 2;                         // nome contém
        else if (consulta.every((t) => bate(t, [...r.nome, ...r.pai]))) relevancia = 3;          // nome + pai direto
        else relevancia = 4;                                                                     // nome + ancestral distante

        resultados.push({ item: r.item, caminho: [...r.ancestrais].join(' › '), relevancia });
    }
    return resultados.sort((a, b) => a.relevancia - b.relevancia || String(a.item.label).localeCompare(String(b.item.label), 'pt-BR'));
}
