# Informatiza Design System

Este repositório reúne duas versões do Design System:

| Pasta | Versão | Stack | Publicado em |
|---|---|---|---|
| [`ds-3.0/`](ds-3.0/) | **DS 3.0** | Angular 21 + PrimeNG 21 (base sakai-ng) | https://felippeissa.github.io/informatizaDS/3.0/ |
| [`ds-3.1/`](ds-3.1/) | **DS 3.1** | HTML + CSS estático (Inspinia) | https://felippeissa.github.io/informatizaDS/3.1/ |

## Rodar localmente

**3.0 (Angular):**

```bash
cd ds-3.0
npm install
npm start        # http://localhost:4200
```

**3.1 (HTML/CSS):** abra `ds-3.1/index.html` no navegador ou sirva a pasta:

```bash
npx serve ds-3.1
```

## Deploy

Push na `main` dispara `.github/workflows/deploy.yml`, que builda o 3.0, copia o 3.1
e publica os dois no GitHub Pages (`/3.0/` e `/3.1/`), com uma página inicial na raiz
(`.github/pages/index.html`). Links antigos sem `/3.0/` são redirecionados automaticamente.

## Para agentes de IA

Guias legíveis por qualquer IA (Cursor, Copilot, ChatGPT, Claude etc.):

- [`AGENTS.md`](AGENTS.md) — qual versão usar e regras comuns
- [`ds-3.0/AGENTS.md`](ds-3.0/AGENTS.md) + [`ds-3.0/tokens.json`](ds-3.0/tokens.json)
- [`ds-3.1/AGENTS.md`](ds-3.1/AGENTS.md) + [`ds-3.1/tokens.json`](ds-3.1/tokens.json)
- Pela web: https://felippeissa.github.io/informatizaDS/llms.txt (índice) e https://felippeissa.github.io/informatizaDS/llms-full.txt (tudo em um arquivo)
