# Informatiza DS 3.0 — Angular + PrimeNG (guia para agentes de IA)

Use este guia para criar telas no padrão do Informatiza Design System 3.0.
Vitrine ao vivo: https://felippeissa.github.io/informatizaDS/3.0/ds · Tokens: [`tokens.json`](tokens.json)

## Stack
- **Angular 21**, standalone components, signals, lazy loading, zoneless.
- **PrimeNG 21** com preset **Aura** (`@primeuix/themes/aura`), cor primária **emerald**, superfície **slate** (claro) / **zinc** (escuro).
- Ícones: **somente PrimeIcons** (`pi pi-*`). Não use outras bibliotecas de ícones.
- Fonte: **Inter** (`https://rsms.me/inter/inter.css`).
- Modo escuro pela classe `.app-dark` no `<html>`.

```ts
// app.config.ts
providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } })
```

## Foundations (fundamentos visuais)
Documentadas ao vivo em `/ds/foundations/*` (código em `src/app/ds/foundations/`). Valores em [`tokens.json`](tokens.json).
**A raiz da página é 14px** (`html { font-size: 14px }`), então `1rem = 14px`.

| Foundation | Resumo |
|---|---|
| **Cores** (`/cores`) | Use as semânticas: `--primary-color`, `--surface-ground` (fundo da página), `--surface-card`, `--surface-border`, `--surface-hover`, `--text-color`, `--text-color-secondary`. Escalas `--p-primary-50…950` (emerald) e `--p-surface-0…950` (slate/zinc). Status via `severity`: success, info, warn, danger, secondary. |
| **Tipografia** (`/tipografia`) | Inter. Título da página 1.5rem/700 · título de seção 1rem/700 · corpo 1rem/400 · rótulo 0.8125rem/600 · descrição 0.8125rem secundária · legenda 0.75rem/500 secundária. Sentence case. |
| **Espaçamento** (`/espacamento`) | Escala: 0.25 · 0.5 · 0.75 · 1 · 1.25 · 1.5 · 2 · 3 rem. Página e card: padding 1.5rem; **16px** entre blocos, campos, colunas e botões (guia GESIS); rótulo→campo: 0.4rem. Nunca `padding: 0`. |
| **Bordas e elevação** (`/bordas`) | Raios: xs 2px, sm 4px, md 6px (controles), lg 8px (menus), xl 12px (cards/modais), full. Borda `1px solid var(--surface-border)`. Sombras: card `0 1px 4px rgba(0,0,0,.04)`, overlay, modal. |
| **Ícones** (`/icones`) | PrimeIcons. Ações padrão: novo `pi-plus`, editar `pi-pencil`, excluir `pi-trash`, salvar `pi-check`, cancelar `pi-times`, buscar `pi-search`, filtrar `pi-filter`, ver `pi-eye`, baixar `pi-download`, enviar `pi-upload`, imprimir `pi-print`, voltar `pi-arrow-left`, mais `pi-ellipsis-v`. |
| **Grid e layout** (`/grid`) | `AppLayout` = topbar + menu lateral (20rem; o ☰ alterna aberto ⇄ só ícones; vira sobreposição abaixo de 1024px) + conteúdo. Grades `.ds-grid--form` (220px, 6 colunas em 1920px) e `.ds-grid--kpi` (180px); grid de 12 colunas do Tailwind. Breakpoints (guia GESIS): base 390, sm 640, md 768, lg 1024, xl 1280, 2xl 1920; menu lateral fixo a partir de 1024px. |

## Regras obrigatórias
1. **Sempre componentes PrimeNG 21.** Não recrie botão, select, tabela etc. com HTML puro.
2. Nomes novos do PrimeNG 21: `p-select` (não dropdown), `p-datepicker` (não calendar), `p-drawer` (não sidebar),
   `p-toggleswitch` (não inputswitch), `p-popover` (não overlaypanel), `p-tabs/p-tablist/p-tab/p-tabpanels/p-tabpanel` (não tabview).
   `p-autoComplete` usa `optionLabel` (não `field`).
3. **Só variáveis de tema**, nunca cores fixas: `var(--surface-card)`, `var(--surface-ground)`, `var(--surface-border)`,
   `var(--text-color)`, `var(--text-color-secondary)`, `var(--primary-color)`. Severidades via prop `severity` do PrimeNG.
4. **Bento:** todo bloco de conteúdo fica num card com fundo próprio, borda, `border-radius` e padding.
5. **Nunca `padding: 0`.** Todo elemento tem respiro.
6. Overlays (`p-select`, `p-autoComplete`, `p-datepicker`) dentro de `p-dialog`/`p-drawer` usam `appendTo="body"`.
7. Tags de status (padrão GESIS): **ativo = sem `severity`** (cor primária), **inativo = `secondary`**, **alerta = `danger`**. Máx. 2 palavras / 25 caracteres.
   Toasts/messages: `success`, `info` (padrão das messages), `warn`, `error`.

## Padrões de UX (GESIS — obrigatórios)
Documentados ao vivo em `/ds/padroes/*` (código em `src/app/ds/padroes/`). Fonte: GESIS, *Definições de padrões de design* (MGS 2.0.1).
- **Botões:** primário (preenchido) e secundário (`[outlined]`) **sem ícone**; terciário (`[text]`) **com ícone à esquerda**. Todos à direita, ordem terciário → secundário → primário, 16px entre eles. Nunca ícone dos dois lados.
- **Placeholders:** `Digite` (input), `Selecione` / `Digite e selecione` (select, multiselect com busca, autocomplete), `DD/MM/AAAA` (data). Máscaras: CPF `000.000.000-00`, CEP `00000-000`, hora `00:00`, e-mail `email@goias.gov.br`, valor `R$ 0,00` **alinhado à direita**. Período = um DatePicker `selectionMode="range"`.
- **Filtros:** uma linha visível + "Mais filtros / Menos filtros" (terciário com ícone); botões **abaixo** dos campos, à direita: Mais filtros · Limpar (secundário) · Filtrar (primário). Obrigatórios nunca ocultos. Busca simples mostra resultados ao abrir; busca pesada exige filtro.
- **Tabelas:** ~6 colunas, sem rolagem horizontal; números à direita; texto longo com reticências + ícone de detalhe (dialog); ações **à direita**, ordem Editar → Visualizar → Excluir, máx. 4, extras em menu `pi-bars`.
- **Formulários:** página única, seções em cards/panels/accordions (**nunca abas**); Cancelar (secundário) + Salvar (primário) sem ícones; confirmar ao cancelar. Validação: toast de erro + campos marcados (muitos campos) ou Salvar desabilitado (poucos campos). Grid de 6 colunas em 1920px, campos quebram linha em vez de encolher.
- **Visualização:** rótulo + texto (nunca campos desabilitados), mesmas seções do cadastro, botão Voltar secundário à direita.
- **Feedback:** message estática (info) para avisos persistentes; toast 3000ms, 350px, título (Sucesso/Informação/Atenção/Erro) + descrição; sucesso padrão "<Registro> criado/atualizado/excluído com sucesso.". Dialog basic 350px, long content 700px. Confirmação obrigatória para editar, cancelar, excluir e logout.
- **Layout:** header com brasão + nome do sistema, usuário (avatar + nome) e logout com confirmação; sidebar é a navegação prioritária (aberto por padrão, fechado só com ícones). Itens de menu em sentence case, substantivos ("Consulta de usuários"), filho herda o nome do pai, máx. 40 caracteres. MegaMenu só com 3+ níveis (com busca no header e Favoritos obrigatórios).

## Classes de página do DS (definidas em `src/assets/ds/_ds.scss`)
| Classe | Uso |
|---|---|
| `.ds-page` | Raiz da tela: coluna com `padding: 1.5rem; gap: 1rem` |
| `.ds-page-header` | Linha título + ações (flex, `space-between`) |
| `.ds-page-title` | `<h1>` da tela (1.5rem, 700) |
| `.ds-card` | Card branco padrão: `surface-card`, borda `surface-border`, raio 12px, padding 1.5rem, sombra `0 1px 4px rgba(0,0,0,.04)` |
| `.ds-card-titulo` | `<h2>` de seção dentro do card (aceita `<i class="pi ...">` antes do texto) |
| `.ds-card-sub` | Subtítulo/descrição abaixo do título do card |
| `.ds-grid .ds-grid--form` | Grade de campos: gap 16px, colunas de no mín. 220px que quebram linha (não encolhem), **6 colunas** a partir de 1800px. Filhos: `.ds-col-2`, `.ds-col-full` |
| `.ds-grid .ds-grid--kpi` | Grade de KPIs (`minmax(180px, 1fr)`) |
| `.ds-campo` | Campo: `<label>` + controle + `<small>` de ajuda, em coluna |
| `.ds-botoes` | **Barra de botões**: à direita, 16px, ordem terciário → secundário → primário |
| `.ds-acoes-row` | Ícones de ação da tabela, alinhados à direita (Editar → Visualizar → Excluir → `pi-bars`) |
| `.ds-num` | Valor numérico alinhado à direita (`th`, `td` ou `styleClass` do InputNumber) |
| `.ds-celula-longa` | Texto longo na célula com reticências (+ botão de detalhe) |
| `.ds-info` / `.ds-info-rotulo` / `.ds-info-valor` | Rótulo + texto em telas de visualização (nunca campo desabilitado) |
| `.ds-dialog-basico` / `.ds-dialog-longo` | `styleClass` de `p-dialog`/`p-confirmdialog`: 350px / 700px, altura até 90% com rolagem, 16px entre botões |
| `.ds-required` / `.ds-erro` | Asterisco de obrigatório / mensagem de erro do campo |
| `.ds-table` | Estilo extra para `p-table` |
| `.ds-warning-box` / `.ds-notice-box` / `.ds-danger-banner` | Avisos e banners |

## Templates de tela (copie como ponto de partida — já seguem os padrões GESIS)
Código em `src/app/ds/templates/` · ao vivo em `/3.0/ds/templates/<nome>`:
- `tpl-lista.ts` — **Lista com filtros**: filtros com "Mais filtros" e botões abaixo (Mais filtros · Limpar · Filtrar); tabela com valor à direita, reticências + detalhe, tags, ações Editar → Visualizar → Excluir + menu, exclusão com ConfirmDialog e toast.
- `tpl-formulario.ts` — **Cadastro / Edição** (`?modo=edicao`): confirmação obrigatória ao salvar e ao cancelar a edição; message info, seções em cards, placeholders e máscaras padrão, valor à direita, validação (toast de erro + campos marcados), Cancelar com confirmação + Salvar.
- `tpl-detalhe.ts` — **Visualização**: rótulo + texto nas mesmas seções do cadastro, panels recolhíveis, Voltar + Editar à direita. Sem abas.
- `ds/megamenu/sistema-megamenu.ts` — **Sistema com MegaMenu** (rota `/sistema-megamenu`, layout próprio): para sistemas com 3+ níveis. MegaMenu sem versão fechada, overlay com colunas (larguras 1636/826/556/286px), TieredMenu híbrido no 4º nível, busca no header (dialog 700px, Recentes, estrela de favoritar), Favoritos no topo e menu mobile sequencial abaixo de 768px. Dados em `mm-dados.ts`.
- `tpl-dashboard.ts` — **Painel de indicadores**: KPIs em `.ds-grid--kpi`, `p-chart`, listas.

## Exemplo mínimo (tela de consulta)
```ts
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule, ButtonModule, InputTextModule, SelectModule, TableModule, TagModule],
  template: `
  <div class="ds-page">
    <div class="ds-page-header">
      <h1 class="ds-page-title">Consulta de usuários</h1>
      <p-button label="Novo usuário" />
    </div>

    <div class="ds-card">
      <div class="ds-grid ds-grid--form">
        <div class="ds-campo">
          <label for="f-nome">Nome</label>
          <input id="f-nome" pInputText [(ngModel)]="nome" placeholder="Digite" />
        </div>
        <div class="ds-campo">
          <label for="f-sit">Situação</label>
          <p-select inputId="f-sit" [options]="situacoes" [(ngModel)]="situacao" placeholder="Selecione" [showClear]="true" />
        </div>
      </div>
      <div class="ds-botoes" style="margin-top: 1rem">
        <p-button label="Limpar" [outlined]="true" />
        <p-button label="Filtrar" />
      </div>
    </div>

    <div class="ds-card">
      <p-table [value]="usuarios" [paginator]="true" [rows]="10" styleClass="p-datatable-sm">
        <ng-template #header><tr><th>Nome</th><th>Órgão</th><th>Situação</th><th style="text-align:right; width:10rem">Ações</th></tr></ng-template>
        <ng-template #body let-u>
          <tr>
            <td>{{ u.nome }}</td><td>{{ u.orgao }}</td>
            <td><p-tag [value]="u.situacao" [severity]="u.situacao === 'Inativo' ? 'secondary' : undefined" /></td>
            <td><div class="ds-acoes-row">
              <p-button icon="pi pi-pencil" [text]="true" [rounded]="true" ariaLabel="Editar" />
              <p-button icon="pi pi-eye" [text]="true" [rounded]="true" ariaLabel="Visualizar" />
              <p-button icon="pi pi-trash" [text]="true" [rounded]="true" severity="danger" ariaLabel="Excluir" />
            </div></td>
          </tr>
        </ng-template>
        <ng-template #emptymessage><tr><td colspan="4">Nenhum registro encontrado.</td></tr></ng-template>
      </p-table>
    </div>
  </div>`
})
export class Usuarios { /* ... */ }
```

## Componentes disponíveis na vitrine
Átomos, moléculas e organismos do PrimeNG 21 com demo em `src/app/pages/uikit/` e rota `/ds/uikit/<nome>`
(ex.: `button`, `inputtext`, `select`, `datepicker`, `datatable`, `dialog`, `drawer`, `tabs`, `toast`, `chart`).
Consulte a demo do componente antes de usá-lo para seguir os mesmos props e variantes.

## Pegadinhas
- Assets estáticos em `public/assets/` (não `src/assets/`).
- Budget de CSS por componente: erro acima de **32 kB** no build de produção.
- Rode comandos `npm`/`ng` dentro de `ds-3.0/`. Validar: `npx ng build --configuration development`.
