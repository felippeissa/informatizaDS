# Checklist — Padrões de UX da GESIS no DS 3.0

Fonte: **GESIS · Definições de padrões de design (UX)** — MGS 2.0.1, versão 1.0.13 (21/10/2026).

**Como usar**
- `[x]` = **aplicado** no DS 3.0 (código: layout, templates, componentes ou vitrine) e conferido.
- `[ ]` = **pendente**. A linha abaixo (→) diz o que falta ou onde mexer.
- Todas as regras já estão **documentadas** nas páginas de Padrões de UX (`/ds/padroes/*`); este checklist acompanha se o **próprio DS segue** a regra.
- Marque você também. Ao concluir um item, troque `[ ]` por `[x]` e, se quiser, ajuste a nota.

Última revisão: 26/11/2026.

---

## 0. Base

- [x] Página de **Padrões de UX** criada antes de Foundations, com as regras do guia (`/ds/padroes`)
- [x] Interface em **português**: textos internos do PrimeNG traduzidos (calendário, "Nenhum resultado encontrado", filtros), `lang="pt-BR"`
- [x] Regras resumidas no `AGENTS.md` para outras IAs seguirem
- [x] Os **4 templates** de tela seguem os padrões abaixo
  → Lista, Cadastro, Visualização e Painel de indicadores refeitos em 26/11/2026

---

## 1. Layout — Cabeçalho (header) · `/ds/padroes/layout`

- [x] Botão de abrir/recolher o menu (hambúrguer) à esquerda
- [x] Marca do sistema no header
  → símbolo do Informatiza + nome "Informatiza" (texto, acompanha o modo escuro)
- [x] **Brasão** + nome do sistema no padrão (sigla em maiúsculas; nome completo só com iniciais maiúsculas)
  → decidido (26/11/2026): no lugar do brasão, o símbolo do Informatiza + "Informatiza"
- [x] **Usuário: avatar + nome** (obrigatório)
  → avatar com iniciais + nome; no celular só o avatar
- [x] Descrição do usuário (cargo, e-mail…) — opcional
  → "Analista de Sistemas · SEAD" (oculta abaixo de 992px)
- [x] Dropdown do usuário — opcional
  → Meu perfil · Preferências · Sair
- [x] Notificação — opcional
  → sino com contador de não lidas e painel com "Marcar todas como lidas"
- [x] **Logout com modal de confirmação** (obrigatório)
  → "Sair" (botão e item do menu) abre ConfirmDialog de 350px antes de ir para o login

## 2. Layout — Menu lateral (sidebar)

- [x] Item com subitens mostra seta **angle** (para baixo = fechado, para cima = aberto)
  → `app.menuitem.ts` já usa `pi-angle-down`
- [x] Sidebar **aberto** como estado padrão
- [x] **Sidebar fechado mostrando só os ícones**
  → hambúrguer alterna aberto ⇄ trilho de ícones (4,5rem), um por seção + lupa; seção atual destacada
- [x] Fechado: clicar no ícone navega direto (menu simples)
  → não se aplica à vitrine: como o menu tem busca, vale a regra "clicar em qualquer ícone expande o menu"
- [x] Fechado com subitens: clicar no ícone expande o menu já com o item aberto; pelo hambúrguer, subitens não abrem sozinhos
  → ícone da seção expande o menu já posicionado nela; na vitrine as seções são grupos sempre visíveis (não há dropdown)
- [x] Ícones obrigatórios em todos os itens quando o menu puder ser recolhido
  → seções e itens com ícone (componentes usam pi-circle em comum)
- [x] **Campo de busca** no menu (opcional)
  → no topo do menu, fixo ao rolar; Esc limpa
- [x] Regras da busca: caminho completo, palavras em qualquer ordem, ignora maiúsculas/acentos/plural, ordenação por relevância
  → `app/layout/component/menu-busca.ts`; resultado mostra o caminho (ex.: "Padrões de UX")
- [x] Textos do menu: sentence case, substantivos ("Consulta de usuários"), filho herda o nome do pai, até 40 caracteres
  → regra para os **sistemas**; documentada em Padrões de UX › Layout e no AGENTS.md. Não se aplica à vitrine: lá os itens são nomes de componentes (vocabulário do PrimeNG/Figma)

## 3. Layout — MegaMenu e menu mobile

- [x] **MegaMenu** completo (só para 3+ níveis)
  → exemplo de sistema "SIGO" em `/sistema-megamenu` (menu Templates › Sistema com MegaMenu); código em `src/app/ds/megamenu/`
- [x] MegaMenu sem versão fechada (recolhe totalmente à esquerda)
  → ☰ esconde o menu por inteiro e o conteúdo ocupa a largura toda
- [x] MegaMenu Overlay com larguras 1636 / 826 / 556 / 286px conforme a tela
  → colunas de 246px (3 cabem em 826px, 6 em 1636px); poucos itens = largura do conteúdo; títulos longos alinham a altura
- [x] TieredMenu híbrido para o 4º nível
  → subitem com angle-right abre camada sobreposta (ex.: Anulação de empenho › Anular empenho em lote)
- [x] **Busca no header** (lupa → dialog de 700px, área "Recentes", estrela de favoritar, caminho da funcionalidade)
  → mesmas regras da busca do menu; "anular lote empenho" encontra "Anular empenho em lote"; Enter abre o 1º resultado
- [x] **Favoritos** (item fixo no topo, por usuário, mais recente primeiro, sem limite)
  → salvos no navegador do usuário (localStorage) no exemplo; num sistema real, gravar por usuário no back-end
- [x] **Menu mobile** sequencial em tela cheia (abaixo de 768px, só com MegaMenu)
  → toda a área do item é tocável; item selecionado no topo (‹) volta um nível

---

## 4. Feedback ao usuário · `/ds/padroes/feedback`

- [x] Toast do layout com duração padrão de **3000ms** (padrão do PrimeNG)
- [x] Toast com **350px** de largura (padrão do PrimeNG = 25rem com base 14px)
- [x] Exemplos ao vivo de toast, ConfirmDialog e Dialog de 700px na página de padrões
- [x] Toasts do próprio DS no padrão: título **Sucesso / Informação / Atenção / Erro** + descrição, mínimo 3000ms
  → cópia nas Foundations agora é "Sucesso / Copiado: …" com 3000ms; todos os toasts do DS com 3000ms
- [x] Mensagens de sucesso padrão nos templates ("<Registro> criado/atualizado/excluído com sucesso.")
  → "Projeto criado com sucesso." (Cadastro) e "Projeto excluído com sucesso." (Lista)
- [x] **Message** (inline) com severidade info para avisos persistentes nos templates de formulário
  → Cadastro abre com message info orientando o preenchimento
- [x] **ConfirmDialog obrigatório** em: editar, cancelar cadastro, cancelar edição, excluir, logout
  → excluir (Lista), cancelar cadastro e, no modo edição do Cadastro (`?modo=edicao`), confirmar edição e cancelar edição; logout no header
- [x] Tamanhos de dialog padronizados: basic **350px**, long content **700px**, rolagem acima de 90% da tela
  → classes `.ds-dialog-basico` / `.ds-dialog-longo` (styleClass) em todos os dialogs do DS; 16px entre botões
- [x] ConfirmDialog sem botão terciário; "X" opcional quando houver botão de fechar
  → todas as confirmações têm só secundário + primário; o "X" foi mantido (permitido pelo guia)

## 5. Inputs · `/ds/padroes/inputs`

- [x] Tabela de placeholders padrão com exemplos ao vivo
- [x] Máscaras de exemplo (CPF, R$, data, CEP, hora, telefone, e-mail, URL)
- [x] Período com **DatePicker range** (exemplo)
- [x] Placeholders padrão nos templates: `Digite`, `Selecione`, `Digite e selecione`, `DD/MM/AAAA`
  → Digite / Selecione / Digite e selecione / DD/MM/AAAA nos templates
- [x] Valor monetário **alinhado à direita** (campo e tabela) nos templates
  → classe .ds-num (tabela da Lista e InputNumber do Cadastro)
- [x] Ícone indicativo em campos com autocomplete (seta para dropdown, lupa para busca)
  → todos os AutoComplete do DS com `[dropdown]="true"`; demo de AutoComplete migrada de `field` para `optionLabel`

## 6. Botões · `/ds/padroes/botoes`

- [x] Dimensões originais do PrimeNG mantidas (raio 6px, gap 7px)
- [x] Hierarquia documentada com exemplos (primário, secundário outlined, terciário text + ícone)
- [x] Home (Visão geral) segue a hierarquia: primário e secundário sem ícone, terciário com ícone
- [x] Templates: **primário e secundário sem ícone**
  → ícones removidos de Novo projeto, Filtrar, Salvar, Editar…
- [x] Templates: **secundário = outlined** (hoje "Cancelar" e "Voltar" são text)
  → Cancelar, Limpar e Voltar agora são outlined
- [x] Botões **à direita**, ordem terciário → secundário → primário, **16px** entre eles
  → nova classe .ds-botoes (16px, à direita); .ds-acoes-row só para ícones da tabela
- [x] Nunca ícone dos dois lados do mesmo botão (conferir nas demos)
  → nenhum caso encontrado; exemplo "Salvar" com ícone à direita trocado por "Próximo →" (direção)

## 7. Filtros · `/ds/padroes/filtros`

- [x] Exemplo no padrão com "Mais filtros / Menos filtros"
- [x] `tpl-lista`: botões **abaixo** dos campos (hoje na mesma linha)
- [x] `tpl-lista`: nomes **Mais filtros / Menos filtros**, **Limpar** (secundário), **Filtrar** (primário)
- [x] `tpl-lista`: ícone só no terciário (Mais/Menos filtros)
- [x] Filtros avançados recolhidos quando passar de uma linha
  → "Mais filtros" mostra o Período de criação
- [x] Filtro obrigatório: botão Filtrar só habilita com tudo preenchido; obrigatórios nunca ocultos
  → exemplo "busca pesada" em Padrões › Filtros: Filtrar desabilitado até Órgão + Período, tabela só após filtrar
- [x] Grid de **6 colunas** com **16px** em 1920px; inputs quebram linha em vez de encolher
  → .ds-grid--form: gap 16px, colunas de no mín. 220px que quebram linha, 6 colunas a partir de 1800px

## 8. Tabelas · `/ds/padroes/tabelas`

- [x] Exemplo no padrão (valores à direita, ícone de detalhe, ações à direita, menu `bars`)
- [x] Cores das tags documentadas: **ativo = primary**, **inativo = secondary**, **alerta = danger** (Foundations › Cores e `AGENTS.md` atualizados)
- [x] `tpl-lista` / `tpl-detalhe`: tags no padrão (hoje Ativo = success, Inativo = danger)
  → ativo = sem severity (primária), inativo = secondary, pendente = warn
- [x] `tpl-lista`: coluna de ações **à direita**, ordem Editar → Visualizar → Excluir, máx. 4 + menu `pi-bars`
- [x] Valores numéricos alinhados à direita nos templates
- [x] Texto longo: reticências + ícone de detalhe abrindo dialog
  → classe .ds-celula-longa + ícone de detalhe abrindo dialog de 350px
- [x] Média de 6 colunas e sem rolagem horizontal (ou colunas congeladas)
  → Lista com 6 colunas; em telas estreitas rola com Nome (esquerda) e Ações (direita) congeladas (`pFrozenColumn`)

## 9. Formulários · `/ds/padroes/formularios`

- [x] Exemplo de cadastro em seções (panels) e de visualização rótulo + texto
- [x] `tpl-formulario` usa seções em cards (página única, sem abas)
- [x] `tpl-formulario`: **Cancelar** (secundário outlined) + **Salvar** (primário), **sem ícones**, à direita, 16px
- [x] `tpl-formulario`: confirmação obrigatória ao **cancelar** (perda de dados)
- [x] Estratégia de validação: toast de erro + campos marcados **ou** Salvar desabilitado
  → Cadastro usa toast de erro + campos marcados + mensagem com ação corretiva (.ds-erro)
- [x] `tpl-detalhe` (visualização): **sem abas** → seções em cards/panels/accordions
  → seções em cards + panels recolhíveis (Entregas, Histórico)
- [x] `tpl-detalhe`: rótulo + texto (nunca campo desabilitado), botão **Voltar** secundário à direita
  → classes .ds-info; Voltar (secundário) + Editar (primário) à direita
- [x] Template **Visualização** seguindo as mesmas seções do cadastro
  → `tpl-detalhe` virou Visualização (menu e home renomeados)

---

## 10. Decisões pendentes (não marcar sem decidir)

- [x] **Versão do Angular:** guia diz Angular 19 / PrimeOne 20; DS está em Angular 21 / PrimeNG 21 — confirmar com a arquitetura
  → decidido (26/11/2026): **Angular 21 + PrimeNG 21**; o Figma está sendo atualizado
- [x] **Breakpoints:** guia usa 390 / 640 / 768 / 1024 / 1280 / 1920; DS usa 576 / 768 / 992 / 1200 / 1920
  → decidido: **os do guia**. Tailwind, layout (menu fixo a partir de 1024px), Foundations e tokens atualizados
- [x] **Fonte base:** decidido manter **14px** (botões com 32,8px de altura) — 26/11/2026
- [x] **Espaçamentos em px do guia (16px)** com base 14px: usar 16px fixo (≈ 1.143rem) ou aceitar 1rem = 14px
  → decidido: **16px fixo** onde o guia pede (botões, campos, colunas, blocos — `.ds-botoes`, `.ds-grid`, `.ds-page`)
- [x] **Brasão oficial:** não será usado — header usa o símbolo + "Informatiza" (26/11/2026)
- [ ] **Biblioteca de ícones:** ícones novos nascem na "Biblioteca de Ícones 3.0" do Figma; decidir se o DS adota Tabler como complemento
  → em análise por você (Biblioteca de Ícones 3.0)
- [x] **Princípios** da home (Clareza, Consistência, Acessibilidade, Eficiência): validar com o time de UX
  → seguindo o guia: Consistência, Previsibilidade, Qualidade (introdução) e Linguagem clara (diretrizes de escrita)
