# informatizaDS — raiz

Dois Design Systems independentes neste repositório:

- **`ds-3.0/`** — Angular 21 + PrimeNG 21. Guia completo em [`ds-3.0/CLAUDE.md`](ds-3.0/CLAUDE.md). Rode comandos npm/ng **dentro de `ds-3.0/`**.
- **`ds-3.1/`** — HTML + CSS estático baseado no Inspinia (sem build). Páginas `.html` na raiz da pasta, assets em `ds-3.1/assets/`. Use sempre caminhos relativos (o site é publicado em `/informatizaDS/3.1/`).

Deploy: push na `main` → `.github/workflows/deploy.yml` publica `/3.0/` e `/3.1/` no GitHub Pages. Commit/push só quando o usuário pedir.

Guias para agentes de IA (qualquer ferramenta): `AGENTS.md` (raiz), `ds-3.0/AGENTS.md`, `ds-3.1/AGENTS.md`, tokens em `ds-3.0/tokens.json` e `ds-3.1/tokens.json`, índice web em `.github/pages/llms.txt` (publicado em `/llms.txt`; `llms-full.txt` é gerado no deploy). **Ao mudar regras, componentes ou tokens, atualize esses arquivos.**
