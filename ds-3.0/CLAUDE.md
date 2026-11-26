# informatizaDS — Guia do projeto

Projeto Angular (pasta `ds-3.0/` do repo; o DS 3.1 em HTML/CSS fica em `../ds-3.1/`) com a vitrine do
**Informatiza Design System 3.0**. Base: template **sakai-ng**.

> Leia este arquivo antes de explorar o código. Ele existe para você resolver
> tarefas sem varrer o projeto (economia de tokens). Se algo aqui divergir do
> código, o código vence — e atualize este arquivo.

## Stack
- **Angular 21** + **PrimeNG 21** (preset **Aura**, cor primária **emerald**), standalone components, lazy loading, signals.
- Fonte **Inter var** (carregada de `rsms.me` no `src/index.html`).
- Tudo é **mockado** — sem backend, banco de dados ou IA reais.

## Rodar / validar / deployar
- Dev server (dentro de `ds-3.0/`): `npm start` (ng serve na porta 4200). **O usuário costuma deixar o servidor rodando — não mate a porta 4200 sem avisar.**
- Validar sem tocar no servidor: `npx ng build --configuration development` (filtre a saída por `ERROR`/`Output location`, não leia o log inteiro).
- Deploy: **push na branch `main`** dispara a GitHub Action que publica no **GitHub Pages** (publicado em https://felippeissa.github.io/informatizaDS/3.0/ (workflow builda com `--base-href /informatizaDS/3.0/`)). **Commit/push só quando o usuário pedir.**
- `gh` fica em `C:\Program Files\GitHub CLI\gh.exe`; autentique com o token do git credential manager (`git credential fill`).

## Rotas (switcher na topbar → `app.topbar.ts`; menu → `app.menu.ts`)
| Rota | Sistema | Onde |
|---|---|---|
| `/ds` | Design System (vitrine PrimeNG) | `src/app/ds/` + demos em `src/app/pages/uikit/` |

Rotas raiz em `src/app.routes.ts` (`/ds` embrulhada por `AppLayout`; `/auth` e `/notfound` sem layout). Os sistemas GO.DEV, Manual Inteligente, Drácon, ASSINAGO e PROTEGE foram removidos.

Andamento dos padrões da GESIS: [`CHECKLIST_GESIS.md`](CHECKLIST_GESIS.md) — **atualize os checks ao concluir itens**.

Guia para outras IAs: [`AGENTS.md`](AGENTS.md) + [`tokens.json`](tokens.json) — mantenha em sincronia com este arquivo. Estilos `.ds-*` ficam em `src/assets/ds/_ds.scss`. Padrões de UX da GESIS em `src/app/ds/padroes/` (rota `/ds/padroes`, estilos `.ux-*` em `src/assets/ds/_padroes.scss`). Foundations (cores, tipografia, espaçamento, bordas, ícones, grid) em `src/app/ds/foundations/` (rota `/ds/foundations`), estilos `.fnd-*` em `src/assets/ds/_foundations.scss`. A raiz é 14px (1rem = 14px).

## Regras de design (OBRIGATÓRIAS)
1. **Nunca `padding: 0` / `0px`.** Todo elemento tem respiro.
2. **Bento:** toda div/seção/campo tem background próprio (`var(--surface-card)` ou `var(--surface-ground)`), `border-radius` e padding.
3. Conteúdo de página dentro de um **card branco** com border-radius. **Sempre variáveis de tema, nunca cores fixas.**
4. **Sempre usar componentes do PrimeNG 21** (`p-select`, `p-button`, `p-table`, `p-autoComplete`…). Não recriar com HTML/cor fixa.
5. Padrão de tela: card branco = `background: var(--surface-card); border: 1px solid var(--surface-border); border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 4px rgba(0,0,0,.04)`. Classes de página do DS: `.ds-page`, `.ds-page-header`, `.ds-page-title`, `.ds-table`, `.ds-acoes-row`.

## Convenções / pegadinhas
- Assets estáticos ficam em **`public/assets/`** (NÃO `src/assets/` — arquivos lá dão 404 no dev/prod).
- **Budget de CSS por componente** no `angular.json`: erro em **32 kB**. O build de produção (CI) falha se um `.scss` estourar, mesmo que o `ng serve` passe.
- `p-select`/`p-autoComplete` dentro de `p-dialog` precisam de **`appendTo="body"`** (senão o overlay fica atrás do modal).
- PrimeNG 21: usar nomes novos — `p-select` (não dropdown), `p-datepicker` (não calendar), `p-drawer` (não sidebar), `p-toggleswitch`, `p-popover`, `p-tabs/p-tablist/p-tab/p-tabpanel`. `p-autoComplete` usa `optionLabel` (não `field`).
- Menu lateral: hambúrguer (desktop) alterna aberto ⇄ só ícones (`LayoutService.menuRecolhido`); busca do menu em `app/layout/component/menu-busca.ts`. Toda seção do menu precisa de `icon`.
- Topbar: o Sakai esconde `<span>` dentro de `.layout-topbar-action` — use `<b>`/`<strong>` para textos e selos nesses botões.
- Git no Windows converte LF→CRLF (warning inofensivo).
- Mensagem de commit termina com: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.

## Trabalho eficiente (menos tokens)
- **Edite cirúrgico**, não reescreva arquivos inteiros.
- **grep/glob para localizar; `Read` só o trecho** necessário (evite reler arquivos grandes).
- Build com saída filtrada (só `ERROR`).
- **Uma sessão por frente de trabalho** (DS / refactor) — o histórico é reenviado a cada turno.

## Memória do agente
Regras de design também estão em `~/.claude/projects/.../memory/` (`godev-design-rules`, `godev-card-branco-pattern`).
