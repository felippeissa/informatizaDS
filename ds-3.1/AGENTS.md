# Informatiza DS 3.1 — HTML + CSS / Bootstrap 5 (guia para agentes de IA)

Use este guia para criar páginas HTML estáticas no padrão do Informatiza Design System 3.1.
O 3.1 é baseado no template **Inspinia** (Bootstrap 5). Não há build: cada tela é um `.html` que
carrega os CSS/JS de `assets/`.
Ao vivo: https://felippeissa.github.io/informatizaDS/3.1/index.html · Tokens: [`tokens.json`](tokens.json)

## Stack
- **Bootstrap 5** (classes utilitárias `d-flex`, `gap-2`, `mb-3`, `row`/`col-*` etc.) + CSS do tema.
- CSS: `assets/css/vendors.min.css` + `assets/css/app.min.css`. JS: `assets/js/config.js` (no `<head>`), `assets/js/vendors.min.js` e `assets/js/app.js` (no fim do `<body>`).
- Ícones: **Tabler Icons** (`<i class="ti ti-nome"></i>`), ex.: `ti-home`, `ti-users`, `ti-plus`, `ti-pencil`, `ti-trash`, `ti-search`, `ti-filter`, `ti-check`, `ti-x`, `ti-settings`, `ti-logout`.
- Fonte: **Open Sans**, base 13px.
- Modo escuro: atributo `data-bs-theme="dark"` no `<html>`.

## Regras obrigatórias
1. **Caminhos sempre relativos** (`assets/...`, `minha-tela.html`). O site é publicado em `/informatizaDS/3.1/`.
2. **Use as variáveis do tema**, nunca hex soltos: `var(--theme-primary)`, `var(--theme-body-bg)`, `var(--theme-secondary-bg)` (fundo de card),
   `var(--theme-border-color)`, `var(--theme-body-color)`, `var(--theme-secondary-color)` (texto secundário), `var(--theme-border-radius)`.
   Prefira as classes Bootstrap equivalentes (`text-primary`, `bg-light`, `border`, `rounded`, `text-muted`).
3. Todo conteúdo dentro de **`.card`** (com `.card-header` + `.card-title` e `.card-body`).
4. Use componentes Bootstrap existentes (`.btn`, `.form-control`, `.form-select`, `.form-check`, `.table`, `.badge`, `.alert`, `.modal`, `.dropdown`, `.nav-tabs`). Não crie componentes do zero.
5. Não copie textos de demonstração do template (e-commerce, "Inspinia", "WebAppLayers", "Buy Now", usuários fictícios em inglês).
   Remova o painel de customização (`offcanvas` do tema) das telas de sistema.
6. Status: `badge badge-soft-success` (ativo), `badge-soft-warning` (pendente), `badge-soft-danger` (inativo/erro), `badge-soft-info`, `badge-soft-secondary`.
7. Botões: primário `btn btn-primary`, secundário `btn btn-light`, destrutivo `btn btn-danger`, só texto `btn btn-link`, ação em tabela `btn btn-sm btn-light btn-icon` (com `aria-label`).

## Cores (tema claro)
| Token | Valor | Uso |
|---|---|---|
| `--theme-primary` | `#1ab394` | Ações principais, links, destaque |
| `--theme-secondary` | `#1c84c6` | Ações secundárias |
| `--theme-success` | `#0acf97` | Sucesso / ativo |
| `--theme-info` | `#23c6c8` | Informativo |
| `--theme-warning` | `#f8ac59` | Atenção / pendente |
| `--theme-danger` | `#ed5565` | Erro / exclusão |
| `--theme-purple` | `#7b70ef` | Destaque alternativo |
| `--theme-body-bg` | `#f1f2f7` | Fundo da página |
| `--theme-secondary-bg` | `#ffffff` | Fundo de cards |
| `--theme-body-color` | `#4c4c5c` | Texto |
| `--theme-secondary-color` | `#9ba6b7` | Texto secundário |
| `--theme-border-color` | `#e7e9eb` | Bordas |

## Estrutura de uma tela
Parta de **`pages-empty.html`** (página em branco com topbar, menu lateral e rodapé) e troque só o conteúdo.

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>Usuários | Nome do Sistema</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="shortcut icon" href="assets/images/favicon.ico" />
  <script src="assets/js/config.js"></script>
  <link href="assets/css/vendors.min.css" rel="stylesheet" />
  <link id="app-style" href="assets/css/app.min.css" rel="stylesheet" />
</head>
<body>
<div class="wrapper">
  <header class="app-topbar"> <!-- copie de pages-empty.html --> </header>

  <div class="sidenav-menu">
    <!-- logo + menu: copie de pages-empty.html e troque os itens -->
    <ul class="side-nav">
      <li class="side-nav-title">Cadastros</li>
      <li class="side-nav-item">
        <a href="usuarios.html" class="side-nav-link">
          <span class="menu-icon"><i class="ti ti-users"></i></span>
          <span class="menu-text">Usuários</span>
        </a>
      </li>
    </ul>
  </div>

  <div class="content-page">
    <div class="container-fluid">
      <!-- Título da página -->
      <div class="page-title-head d-flex align-items-center">
        <div class="flex-grow-1"><h4 class="page-main-title m-0">Usuários</h4></div>
        <div class="text-end">
          <a href="usuario-novo.html" class="btn btn-primary"><i class="ti ti-plus me-1"></i> Novo usuário</a>
        </div>
      </div>

      <!-- Filtros -->
      <div class="card">
        <div class="card-body">
          <div class="row g-3 align-items-end">
            <div class="col-md-5">
              <label class="form-label" for="busca">Buscar</label>
              <input id="busca" type="text" class="form-control" placeholder="Nome ou CPF" />
            </div>
            <div class="col-md-3">
              <label class="form-label" for="situacao">Situação</label>
              <select id="situacao" class="form-select"><option value="">Todas</option><option>Ativo</option><option>Inativo</option></select>
            </div>
            <div class="col-md-4 d-flex gap-2">
              <button class="btn btn-primary"><i class="ti ti-filter me-1"></i> Filtrar</button>
              <button class="btn btn-link">Limpar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabela -->
      <div class="card">
        <div class="card-header"><h4 class="card-title">Usuários cadastrados</h4></div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="bg-light bg-opacity-25"><tr><th>Nome</th><th>Órgão</th><th>Situação</th><th class="text-end">Ações</th></tr></thead>
              <tbody>
                <tr>
                  <td>Ana Souza</td><td>Secretaria da Economia</td>
                  <td><span class="badge badge-soft-success">Ativo</span></td>
                  <td class="text-end">
                    <a href="#" class="btn btn-sm btn-light btn-icon" aria-label="Editar"><i class="ti ti-pencil"></i></a>
                    <a href="#" class="btn btn-sm btn-light btn-icon" aria-label="Excluir"><i class="ti ti-trash"></i></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer"><div class="container-fluid">© <span data-current-year></span> Governo de Goiás</div></footer>
  </div>
</div>
<script src="assets/js/vendors.min.js"></script>
<script src="assets/js/app.js"></script>
</body>
</html>
```

## Páginas de referência (copie o padrão, não o conteúdo)
| Precisa de… | Veja |
|---|---|
| Página em branco com layout | `pages-empty.html` |
| Campos de formulário | `form-elements.html`, `form-layout.html`, `form-select.html`, `form-pickers.html`, `form-validation.html` |
| Tabelas | `tables-static.html`, `tables-custom.html`, `tables-datatables-basic.html` |
| Botões, badges, alertas, modais, abas | `ui-buttons.html`, `ui-badges.html`, `ui-alerts.html`, `ui-modals.html`, `ui-tabs.html` |
| Gráficos | `charts-apex-*.html`, `charts-echart-*.html` |
| Login / recuperar senha | `auth-*.html` |
| Erros 404/500 | `error-*.html` |
| Variações de layout (menu, topbar) | `layouts-*.html` |
