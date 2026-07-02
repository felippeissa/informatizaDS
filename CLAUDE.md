# informatizaDS — Guia do projeto

Monorepo Angular que hospeda vários sistemas do Governo de Goiás sobre o
**Informatiza Design System 3.0**. Base: template **sakai-ng**.

> Leia este arquivo antes de explorar o código. Ele existe para você resolver
> tarefas sem varrer o projeto (economia de tokens). Se algo aqui divergir do
> código, o código vence — e atualize este arquivo.

## Stack
- **Angular 21** + **PrimeNG 21** (preset **Aura**, cor primária **emerald**), standalone components, lazy loading, signals.
- Fonte **Inter var** (carregada de `rsms.me` no `src/index.html`).
- Tudo é **mockado** — sem backend, banco de dados ou IA reais.

## Rodar / validar / deployar
- Dev server: `npm start` (ng serve na porta 4200). **O usuário costuma deixar o servidor rodando — não mate a porta 4200 sem avisar.**
- Validar sem tocar no servidor: `npx ng build --configuration development` (filtre a saída por `ERROR`/`Output location`, não leia o log inteiro).
- Deploy: **push na branch `main`** dispara a GitHub Action que publica no **GitHub Pages** (https://felippeissa/informatizaDS → https://felippeissa.github.io/informatizaDS/). **Commit/push só quando o usuário pedir.**
- `gh` fica em `C:\Program Files\GitHub CLI\gh.exe`; autentique com o token do git credential manager (`git credential fill`).

## Sistemas (switcher na topbar → `app.topbar.ts`; menu → `app.menu.ts`)
| Rota | Sistema | Onde |
|---|---|---|
| `/ds` | Design System (vitrine PrimeNG) | `src/app/ds/` + demos em `src/app/pages/uikit/` |
| `/godev` | **GO.DEV** — plataforma colaborativa com IA | `src/app/godev/` |
| `/manual` | Manual Inteligente (chat standalone) | `src/app/manual/` (reusa `GodevManual`) |
| `/dracon` | Drácon — processos/atos | `src/app/dracon/` |
| `/assinago` | ASSINAGO — assinatura digital | `src/app/assinago/` |

Rotas raiz em `src/app.routes.ts` (todas embrulhadas por `AppLayout`, exceto `/manual` que usa `ManualLayout` sem menu lateral).

## GO.DEV (`src/app/godev/`)
- `godev.models.ts` — tipos. **Projeto** = `{ membros[], specs[], status, sincronizacao, secretaria?, uso? }`. **Spec** = `{ nome, requisito(md), tela: Tela|null }` (**1 tela por spec**). **Tela** = lista de `ComponenteTela` (titulo/texto/campo/botao/checkbox/tabela). Tipos de dashboard: `AgenteTipo`, `SerieUso`, `UsoProjeto`.
- `godev.mock.ts` — `PROJETOS_MOCK` (fonte única de dados). **Cuidado:** tem HTML inline grande nas telas; edite cirurgicamente.
- `godev.ui.ts` — **paleta central** (cores/labels de papel, status, tipo) + `iniciais()`. Reutilize daqui, não redefina cores.
- `godev-projetos` — lista (card branco: header + filtros + `p-table`).
- `godev-manter-projeto` — cadastro/edição: repositório raiz (busca sub-repos, tag de tipo, desvincular), banco de dados (teste de conexão), **busca de membro na base** (`p-autoComplete`, `optionLabel`), campo "Perfil". Criar → workspace + toast.
- `godev-workspace` — abas **Specs / Telas / Código** (sem Membros); seletor de Spec + "Nova spec"; **chat único**; status do agente = notificação (detalhe no hover). Canvas monta a tela a partir de `ComponenteTela`.
- `godev-home` — dashboard "Central de Agentes" (KPIs, `p-chart`, `p-meterGroup`, feed).
- `godev-manual` — Manual Inteligente (chat com seletor de sistema/modelo).
- Chat flutuante acoplável: `src/app/chat/` (`chat-flutuante`, `chat-bridge.service`); modo **None/Bottom/Upper** no configurador (`app.configurator.ts` → `LayoutService.chatMode`).

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
- Git no Windows converte LF→CRLF (warning inofensivo).
- Mensagem de commit termina com: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.

## Trabalho eficiente (menos tokens)
- **Edite cirúrgico**, não reescreva arquivos inteiros.
- **grep/glob para localizar; `Read` só o trecho** necessário (evite reler arquivos grandes como `godev.mock.ts`).
- Build com saída filtrada (só `ERROR`).
- **Uma sessão por frente de trabalho** (GO.DEV / DS / refactor) — o histórico é reenviado a cada turno.

## Memória do agente
Regras de design também estão em `~/.claude/projects/.../memory/` (`godev-design-rules`, `godev-card-branco-pattern`).
