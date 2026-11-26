# Informatiza DS 3.0 — Angular + PrimeNG (guia para agentes de IA)

Use este guia para criar telas no padrão do Informatiza Design System 3.0.
Vitrine ao vivo: https://felippeissa.github.io/informatizaDS/3.0/ds · Tokens: [`tokens.json`](tokens.json)

## Stack
- **Angular 21**, standalone components, signals, lazy loading, zoneless.
- **PrimeNG 21** com preset **Aura** (`@primeuix/themes/aura`), cor primária **emerald**, superfície **slate** (claro) / **zinc** (escuro).
- Ícones: **PrimeIcons** (`pi pi-*`).
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
| **Espaçamento** (`/espacamento`) | Escala: 0.25 · 0.5 · 0.75 · 1 · 1.25 · 1.5 · 2 · 3 rem. Página e card: padding 1.5rem; entre cards e campos: 1rem; rótulo→campo: 0.4rem; entre botões: 0.5rem. Nunca `padding: 0`. |
| **Bordas e elevação** (`/bordas`) | Raios: xs 2px, sm 4px, md 6px (controles), lg 8px (menus), xl 12px (cards/modais), full. Borda `1px solid var(--surface-border)`. Sombras: card `0 1px 4px rgba(0,0,0,.04)`, overlay, modal. |
| **Ícones** (`/icones`) | PrimeIcons. Ações padrão: novo `pi-plus`, editar `pi-pencil`, excluir `pi-trash`, salvar `pi-check`, cancelar `pi-times`, buscar `pi-search`, filtrar `pi-filter`, ver `pi-eye`, baixar `pi-download`, enviar `pi-upload`, imprimir `pi-print`, voltar `pi-arrow-left`, mais `pi-ellipsis-v`. |
| **Grid e layout** (`/grid`) | `AppLayout` = topbar + menu lateral (20rem, vira sobreposição abaixo de 992px) + conteúdo. Grades `.ds-grid--form` (240px) e `.ds-grid--kpi` (180px); grid de 12 colunas do Tailwind. Breakpoints: sm 576, md 768, lg 992, xl 1200, 2xl 1920. |

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
7. Severidade de status: `success` = ativo/concluído, `warn` = pendente, `danger` = inativo/erro, `info` = informativo, `secondary` = neutro.

## Classes de página do DS (definidas em `src/assets/ds/_ds.scss`)
| Classe | Uso |
|---|---|
| `.ds-page` | Raiz da tela: coluna com `padding: 1.5rem; gap: 1rem` |
| `.ds-page-header` | Linha título + ações (flex, `space-between`) |
| `.ds-page-title` | `<h1>` da tela (1.5rem, 700) |
| `.ds-card` | Card branco padrão: `surface-card`, borda `surface-border`, raio 12px, padding 1.5rem, sombra `0 1px 4px rgba(0,0,0,.04)` |
| `.ds-card-titulo` | `<h2>` de seção dentro do card (aceita `<i class="pi ...">` antes do texto) |
| `.ds-card-sub` | Subtítulo/descrição abaixo do título do card |
| `.ds-grid .ds-grid--form` | Grade responsiva de campos (`minmax(240px, 1fr)`) |
| `.ds-grid .ds-grid--kpi` | Grade de KPIs (`minmax(180px, 1fr)`) |
| `.ds-campo` | Campo: `<label>` + controle + `<small>` de ajuda, em coluna |
| `.ds-acoes-row` | Linha de botões de ação |
| `.ds-required` | Asterisco de campo obrigatório |
| `.ds-table` | Estilo extra para `p-table` |
| `.ds-detail-grid` / `.ds-detail-item` | Pares rótulo/valor em telas de detalhe |
| `.ds-warning-box` / `.ds-notice-box` / `.ds-danger-banner` | Avisos e banners |

## Templates de tela (copie como ponto de partida)
Código em `src/app/ds/templates/` · ao vivo em `/3.0/ds/templates/<nome>`:
- `tpl-lista.ts` — **Lista com filtros**: card de filtros + card com `p-table` paginada, `p-tag` de status, ações por linha.
- `tpl-formulario.ts` — **Formulário em card**: seções em cards, campos em `.ds-grid--form`, barra de ações no rodapé (Cancelar texto + Salvar primário).
- `tpl-dashboard.ts` — **Dashboard**: KPIs em `.ds-grid--kpi`, `p-chart`, listas.
- `tpl-detalhe.ts` — **Detalhe / Workspace**: cabeçalho de registro + abas.

## Exemplo mínimo (tela de lista)
```ts
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule, ButtonModule, InputTextModule, SelectModule, TableModule, TagModule],
  template: `
  <div class="ds-page">
    <div class="ds-page-header">
      <h1 class="ds-page-title">Usuários</h1>
      <p-button label="Novo usuário" icon="pi pi-plus" />
    </div>

    <div class="ds-card">
      <div class="ds-grid ds-grid--form">
        <div class="ds-campo">
          <label for="busca">Buscar</label>
          <input id="busca" pInputText [(ngModel)]="busca" placeholder="Nome ou CPF" />
        </div>
        <div class="ds-campo">
          <label>Situação</label>
          <p-select [options]="situacoes" [(ngModel)]="situacao" placeholder="Todas" [showClear]="true" />
        </div>
      </div>
    </div>

    <div class="ds-card">
      <p-table [value]="usuarios" [paginator]="true" [rows]="10" styleClass="p-datatable-sm">
        <ng-template #header><tr><th>Nome</th><th>Órgão</th><th>Situação</th><th style="width:8rem">Ações</th></tr></ng-template>
        <ng-template #body let-u>
          <tr>
            <td>{{ u.nome }}</td><td>{{ u.orgao }}</td>
            <td><p-tag [value]="u.situacao" [severity]="u.situacao === 'Ativo' ? 'success' : 'danger'" /></td>
            <td><div class="ds-acoes-row">
              <p-button icon="pi pi-pencil" [text]="true" [rounded]="true" ariaLabel="Editar" />
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
