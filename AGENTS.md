# Informatiza Design System — guia para agentes de IA

Este repositório contém **duas versões independentes** do Informatiza Design System,
usado em sistemas do Governo de Goiás. Antes de gerar qualquer interface, escolha a
versão certa para a stack do projeto e siga **somente** o guia dela.

| Versão | Stack | Quando usar | Guia completo | Tokens |
|---|---|---|---|---|
| **DS 3.0** | Angular 21 + PrimeNG 21 (preset Aura, primária emerald) | Projeto Angular / SPA | [`ds-3.0/AGENTS.md`](ds-3.0/AGENTS.md) | [`ds-3.0/tokens.json`](ds-3.0/tokens.json) |
| **DS 3.1** | HTML + CSS estático, Bootstrap 5 (base Inspinia) | Página HTML sem framework, protótipo estático | [`ds-3.1/AGENTS.md`](ds-3.1/AGENTS.md) | [`ds-3.1/tokens.json`](ds-3.1/tokens.json) |

Nunca misture as duas: não use classes Bootstrap/Inspinia no 3.0, nem componentes PrimeNG no 3.1.

## Versão publicada (para IAs que leem pela web)
- Índice: https://felippeissa.github.io/informatizaDS/llms.txt
- Tudo em um arquivo: https://felippeissa.github.io/informatizaDS/llms-full.txt
- DS 3.0 ao vivo: https://felippeissa.github.io/informatizaDS/3.0/ds
- DS 3.1 ao vivo: https://felippeissa.github.io/informatizaDS/3.1/index.html

## Regras que valem para as duas versões
1. Idioma da interface: **português do Brasil** (rótulos, mensagens, placeholders, datas `dd/mm/aaaa`).
2. Use os **tokens/variáveis de tema** da versão. Não invente cores hexadecimais.
3. Reaproveite componentes existentes antes de criar algo novo.
4. Toda tela de sistema tem: título da página, conteúdo dentro de cards, ações principais à direita do título.
5. Dados de exemplo devem ser fictícios e realistas (nomes brasileiros, órgãos públicos genéricos).
6. Acessibilidade: todo campo tem `<label>`, botões só com ícone têm `aria-label`/tooltip, contraste mínimo WCAG AA.
