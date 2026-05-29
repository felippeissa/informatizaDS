# DRACON — Documentação de Telas (Fase 03)

> Gerado automaticamente a partir do código-fonte em `src/app/dracon/`.  
> Organizado por pacote de menu. Cada seção descreve a anatomia da tela e os fluxos de navegação.

---

## Estrutura de Menu

```
1. Processos
   1.1 Gestão          → /dracon/gestao/afastamentos
   1.2 Distribuição    → /dracon/gestao/distribuicao

2. Atos
   2.1 Listagem        → /dracon/atos
   2.2 Modelos         → /dracon/atos/modelos
   2.3 Auditoria       → /dracon/atos/auditoria
   2.4 Auditoria de modelos → /dracon/atos/auditoria-modelos

3. Cadastros
   3.1 Tipo ato        → /dracon/cadastros/tipo-ato
   3.2 Tipo de processo → /dracon/cadastros/tipo-processo
   3.3 Etiqueta        → /dracon/cadastros/etiquetas
   3.4 Afastamento     → /dracon/cadastros/afastamento

4. Relatórios          → /dracon/relatorios
```

---

## Elementos comuns a todas as telas

- **Barra de identificação** — exibida no topo de todas as telas, contém:
  - Ícone de ID + label "Identificação"
  - Campo **Usuário** (ex.: João da Silva)
  - Campo **Unidade** (ex.: 21189 - Gerência de Tecnologia do Estado)
- **Paginação** — todas as tabelas exibem 10 linhas por página com o texto:
  _"Mostrando {first} - {last} de {totalRecords} resultados"_
- **Colunas ordenáveis** — todas as colunas de tabela têm ícone de sort clicável.

---

---

# PACOTE 1 — PROCESSOS

---

## TELA DE LISTAR PROCESSOS

**Arquivo:** `dracon-listar-processos.ts`  
**Rota:** `/dracon/processos`

### Cabeçalho
- Título: **"Listar processos"**
- Botão primário **"Novo processo"** (ícone `pi-plus`) → navega para `/dracon/processos/novo`

### Filtros (4 colunas)
| Campo | Tipo |
|---|---|
| Tipo de processo | Select (Atos Administrativos / Autógrafo de Lei / Decreto) |
| Processo Drácon | Input texto livre |
| Processo SEI | Input texto livre |
| Andamento | Select (Em elaboração / Em tramitação / Concluído) |

**Botões de ação do filtro** (alinhados à direita):
1. **"Mais filtros"** — texto secundário, expande filtros adicionais (placeholder)
2. **"Limpar filtro"** — outlined secondary, reseta todos os campos
3. **"Filtrar"** — primário com ícone `pi-filter`, executa a pesquisa

### Abas + Etiqueta
- Três abas horizontais:
  - **"Todos os processos"** (padrão ativo)
  - **"Processos não lidos e não atribuídos"**
  - **"Meus processos"**
- À direita das abas: botão **"Etiqueta"** (ícone `pi-tag`, texto secundário) — abre filtro por etiqueta

### Tabela de processos
Colunas:
| # | Coluna | Observação |
|---|---|---|
| 1 | ☐ Checkbox | Seleção múltipla (com checkbox global no header) |
| 2 | Processo Drácon | Ordenável |
| 3 | Processo SEI | Ordenável |
| 4 | Criado por | Ordenável |
| 5 | Tipo de processo | Ordenável |
| 6 | Assunto | Ordenável |
| 7 | Ações | Largura fixa 6rem |

**Cada linha tem 2 botões de ação:**
1. **Expandir** (ícone `pi-arrow-up-right`) → abre Drawer de detalhes do processo
2. **Ações** (ícone `pi-bars`) → abre menu contextual flutuante (popup)

### Menu contextual da linha (popup)
Itens do menu ao clicar em "Ações":
- **Editar** (ícone `pi-pencil`) → `/dracon/processos/:id`
- **Documentos SEI** (ícone `pi-file`) → `/dracon/processos/documentos-sei/:id`
- **Cancelar** (ícone `pi-times`) → `/dracon/processos/cancelar/:id`
- _(separador)_
- **Vincular etiquetas** (ícone `pi-tag`) → `/dracon/atos/etiquetas/:id`
- **Histórico de etiquetas** (ícone `pi-history`) → `/dracon/processos/historico-etiquetas/:id`

### Drawer — Detalhes do processo (painel lateral direito, 480px)
**Título:** "Detalhes do processo"

**Grid de informações (2 colunas):**
- Processo Drácon
- Processo SEI
- Tipo de processo
- Assunto
- Andamento
- Criado por

**Seção "Processo" (lista de botões texto):**
1. **Tramitar** (ícone `pi-send`) — placeholder
2. **Editar** (ícone `pi-pencil`) → `/dracon/processos/:id`
3. **Documentos relacionados** (ícone `pi-file`) → `/dracon/processos/documentos-sei/:id`
4. **Cancelar processo** (ícone `pi-times`, danger) → `/dracon/processos/cancelar/:id`

**Seção "Etiquetas" (lista de botões texto):**
5. **Vincular etiquetas** (ícone `pi-tag`) → `/dracon/atos/etiquetas/:id`
6. **Histórico de etiquetas** (ícone `pi-history`) → `/dracon/processos/historico-etiquetas/:id`

**Footer do Drawer:**
- Botão **"Fechar"** (outlined secondary) → fecha o drawer

---

## TELA DE NOVO / EDITAR PROCESSO

**Arquivo:** `dracon-manter-processo.ts`  
**Rota:** `/dracon/processos/novo` (criar) | `/dracon/processos/:id` (editar)

### Cabeçalho
- Título dinâmico: **"Novo processo"** ou **"Editar processo"** (conforme rota)

### Formulário — Card "Dados do processo"
| Campo | Tipo | Obrigatório |
|---|---|---|
| Tipo de processo | Select (Atos Administrativos / Processo Legislativo) | ✅ |
| Assunto | Textarea (3 linhas, resize vertical) | ✅ |
| Processo SEI principal | Input texto (ex.: 53019.000001/2024-01) | ❌ |
| Processo de lei | Input texto (ex.: PL-001/2024) | ❌ |
| Nota | Textarea (3 linhas, resize vertical) | ❌ |

### Card "Etiquetas"
- Botão **"Vincular etiqueta"** (outlined, small, ícone `pi-tag`) → `/dracon/processos/etiquetas`
- Lista de chips coloridos com as etiquetas já vinculadas; cada chip tem botão **✕** para remover
- Mensagem vazia: _"Nenhuma etiqueta vinculada..."_ quando não há etiquetas

### Rodapé (footer actions)
1. **"Voltar"** (outlined secondary) → `/dracon/processos`
2. **"Salvar"** (primário, ícone `pi-check`) → salva e retorna para `/dracon/processos`

---

## TELA DE CANCELAR PROCESSO

**Arquivo:** `dracon-cancelar-processo.ts`  
**Rota:** `/dracon/processos/cancelar/:id`

### Cabeçalho
- Título: **"Cancelar processo"**

### Card principal
- **Banner de alerta** (fundo vermelho claro, borda vermelha):
  - Ícone `pi-exclamation-triangle`
  - Título: _"Atenção — esta ação é irreversível"_
  - Descrição sobre o impacto do cancelamento
- **Campo "Motivo do cancelamento"** (obrigatório):
  - Textarea de 5 linhas com limite de **300 caracteres**
  - Contador de caracteres abaixo: _"X/300 caracteres"_

### Rodapé
1. **"Voltar"** (outlined secondary) → `/dracon/processos`
2. **"Confirmar cancelamento"** (danger, ícone `pi-ban`) — desabilitado enquanto o motivo estiver vazio → confirma e navega para `/dracon/processos`

---

## TELA DE HISTÓRICO DE ETIQUETAS

**Arquivo:** `dracon-historico-etiquetas.ts`  
**Rota:** `/dracon/processos/historico-etiquetas/:id`

### Cabeçalho
- Título: **"Histórico de etiquetas"**

### Card de informações do processo
- Processo: ex. `DRN-2025-001234`
- Tipo: ex. `Atos Administrativos`

### Tabela de histórico
Colunas:
| # | Coluna | Detalhe |
|---|---|---|
| 1 | Etiqueta | Chip colorido com fundo e borda na cor da etiqueta |
| 2 | Executado por | Nome do usuário |
| 3 | Data da ação | Data e hora |
| 4 | Ação executada | "Vinculação" ou "Remoção" |

_Sem botões de ação por linha — somente leitura._

### Rodapé
1. **"Voltar"** (outlined secondary) → `/dracon/processos`

---

## TELA DE DOCUMENTOS SEI

**Arquivo:** `dracon-documentos-sei.ts`  
**Rota:** `/dracon/processos/documentos-sei/:id`

### Cabeçalho
- Título: **"Documentos SEI"**

### Card principal
- **Info do processo**: ícone de pasta + número do Processo SEI principal
- **Aviso informativo** (fundo azul claro): explica redirecionamento para o SEI externo
- **Checkbox de consentimento**: _"Estou ciente de que serei redirecionado para o sistema SEI..."_

### Rodapé
1. **"Voltar"** (outlined secondary) → `/dracon/processos`
2. **"Ver documentos no SEI"** (primário, ícone `pi-external-link`) — **desabilitado** até o checkbox ser marcado → abre SEI

---

## TELA DE VINCULAR ETIQUETAS

**Arquivo:** `dracon-vincular-etiquetas.ts`  
**Rota:** `/dracon/processos/etiquetas` | `/dracon/atos/etiquetas/:id`

### Cabeçalho
- Título: **"Vincular etiquetas"**

### Card principal — "Selecione as etiquetas"
- **Campo de busca** (input com ícone `pi-search`) — filtra os chips em tempo real
- **Grid de chips coloridos**: cada chip tem:
  - Ícone `pi-tag` (desmarcado) ou `pi-check` (selecionado)
  - Nome da etiqueta
  - Cor de fundo e borda específica por etiqueta
  - **Clique** alterna entre selecionado/desmarcado
- **Informativo de seleção**: _"X etiqueta(s) selecionada(s): nome1, nome2..."_ — aparece quando há seleção

### Rodapé
1. **"Voltar"** (outlined secondary) → `/dracon/processos`
2. **"Salvar"** (primário, ícone `pi-check`) — **desabilitado** se nenhuma etiqueta selecionada → salva e retorna para `/dracon/processos`

---

---

# PACOTE 1.1 — PROCESSOS › GESTÃO

---

## TELA DE LISTAR AFASTAMENTOS

**Arquivo:** `dracon-listar-afastamentos.ts`  
**Rota:** `/dracon/gestao/afastamentos` | `/dracon/cadastros/afastamento`

### Cabeçalho
- Título: **"Listar afastamentos"**
- Botão primário **"Novo afastamento"** (ícone `pi-calendar-plus`) — navega para novo afastamento (placeholder)

### Filtros (5 colunas)
| Campo | Tipo |
|---|---|
| Funcionário afastado | Input texto livre |
| Tipo de afastamento | Select (Licença / Férias / Afastamento / Outros) |
| Status do afastamento | Select (Ativo / Cancelado) |
| Data início | DatePicker (dd/mm/yy, com ícone de calendário) |
| Data fim | DatePicker (dd/mm/yy, com ícone de calendário) |

**Botões de ação do filtro:**
1. **"Limpar filtro"** (outlined secondary)
2. **"Filtrar"** (primário, ícone `pi-filter`)

### Tabela de afastamentos
Colunas:
| # | Coluna | Observação |
|---|---|---|
| 1 | Funcionário afastado | Ordenável |
| 2 | Tipo de afastamento | Ordenável |
| 3 | Data início | Ordenável |
| 4 | Data fim | Ordenável |
| 5 | Status | Tag colorida: verde (Ativo) / cinza (Cancelado) |
| 6 | Ações | Largura fixa 7rem |

**Cada linha tem 3 botões de ação:**
1. **Expandir** (ícone `pi-arrow-up-right`) → abre Drawer de detalhes
2. **Editar** (ícone `pi-pencil`) — **desabilitado** quando status = "Cancelado"
3. **Excluir** (ícone `pi-trash`, danger) — **desabilitado** quando status = "Cancelado"

### Drawer — Detalhes do afastamento (painel lateral direito, 460px)
**Título:** "Detalhes do afastamento"

**Grid de informações (2 colunas):**
- Funcionário afastado (ocupa 2 colunas)
- Tipo de afastamento
- Status (tag colorida)
- Data início
- Data fim

**Footer do Drawer:**
- Botão **"Fechar"** (outlined secondary, largura total)

---

## TELA DE LISTAR DISTRIBUIÇÃO

**Arquivo:** `dracon-listar-distribuicao.ts`  
**Rota:** `/dracon/gestao/distribuicao`

### Cabeçalho
- Título: **"Listar distribuição"**
- Botão primário **"Nova distribuição"** (ícone `pi-plus`) → `/dracon/gestao/distribuicao/nova`

### Filtros (4 colunas)
| Campo | Tipo |
|---|---|
| Processo SEI principal | Input texto livre |
| Destinatário | Input texto livre |
| Tipo de processo | Select (Atos Administrativos) |
| Etapa do processo | Select (Em elaboração / Concluído) |

**Botões de ação do filtro:**
1. **"Mais filtros"** — texto secundário com ícone `pi-sliders-h`
2. **"Limpar filtro"** (outlined secondary)
3. **"Filtrar"** (primário, ícone `pi-filter`)

### Tabela de distribuições
Colunas:
| # | Coluna | Observação |
|---|---|---|
| 1 | Data da distribuição | Ordenável |
| 2 | Nº da distribuição | Ordenável |
| 3 | Distribuído por | Ordenável |
| 4 | Status | Tag: verde (Distribuído) / cinza (Cancelado) |
| 5 | Ações | Largura fixa 7rem |

**Cada linha tem 3 botões de ação:**
1. **Expandir** (ícone `pi-arrow-up-right`) → abre Drawer de detalhes
2. **Visualizar** (ícone `pi-eye`) — placeholder
3. **Excluir** (ícone `pi-trash`, danger) — **desabilitado** quando status ≠ "Distribuído"

### Drawer — Detalhes da distribuição (painel lateral direito, 460px)
**Título:** "Detalhes da distribuição"

**Grid de informações (2 colunas):**
- Data
- Nº distribuição
- Distribuído por (ocupa 2 colunas)
- Status (tag colorida)

**Footer do Drawer:**
- Botão **"Fechar"** (outlined secondary, largura total)

---

## TELA DE NOVA DISTRIBUIÇÃO (DISTRIBUIR PROCESSOS)

**Arquivo:** `dracon-manter-distribuicao.ts`  
**Rota:** `/dracon/gestao/distribuicao/nova`

### Cabeçalho
- Título: **"Distribuir processos"**

### Card — "Processos selecionados para distribuição"
- Subtítulo dinâmico: _"X processo(s) serão incluídos nesta distribuição."_
- **Lista de cards de processo**: cada processo exibido como um card com:
  - Ícone de pasta + número do processo Drácon
  - Tipo e número do Processo SEI
  - Assunto do processo
  - Botão **✕ "Remover da distribuição"** (danger, rounded, text) → remove o processo da lista
- **Estado vazio**: ícone de caixa + mensagem orientativa quando lista está vazia

### Card de confirmação
- Fundo verde claro, ícone `pi-send`
- Título: _"Confirmar distribuição"_
- Descrição sobre o impacto da ação

### Rodapé
1. **"Voltar"** (outlined secondary) → `/dracon/gestao/distribuicao`
2. **"Executar distribuição"** (primário, ícone `pi-send`) — **desabilitado** se lista vazia → executa e navega para `/dracon/gestao/distribuicao`

---

---

# PACOTE 2 — ATOS

---

## TELA DE LISTAR ATOS

**Arquivo:** `dracon-listar-atos.ts`  
**Rota:** `/dracon/atos`

### Cabeçalho
- Título: **"Listar atos"**
- _(Sem botão de "Novo" nesta tela — atos são criados via processos)_

### Filtros (4 colunas)
| Campo | Tipo |
|---|---|
| Tipo de número | Select (Ato / Número interno) |
| Número | Input texto livre |
| Tipo modelo ato | Select (Autógrafo de lei / Decreto / Portaria) |
| Situação do ato | Select (Conclusão / Em elaboração / Cancelamento) |

**Botões de ação do filtro:**
1. **"Mais filtros"** — texto secundário com ícone `pi-sliders-h`
2. **"Limpar filtro"** (outlined secondary)
3. **"Filtrar"** (primário, ícone `pi-filter`)

### Tabela de atos
Colunas:
| # | Coluna | Observação |
|---|---|---|
| 1 | Nº do ato | Ordenável |
| 2 | Tipo modelo ato | Ordenável |
| 3 | Responsável | Ordenável |
| 4 | Situação do ato | Tag colorida: verde (Conclusão) / azul (Em elaboração) / vermelho (Cancelamento) |
| 5 | Ações | Largura fixa 4rem |

**Cada linha tem 1 botão de ação:**
1. **Expandir** (ícone `pi-arrow-up-right`) → abre Drawer de detalhes do ato

### Drawer — Detalhes do ato (painel lateral direito, 480px)
**Título:** "Detalhes do ato"

**Grid de informações (2 colunas):**
- Nº do ato
- Tipo modelo ato
- Responsável
- Situação (tag colorida)

**Seção "Ações" (lista de botões texto):**
1. **Alterar situação** (ícone `pi-pencil`) → `/dracon/atos/alterar-situacao/:id`
2. **Versões do ato** (ícone `pi-history`) → `/dracon/atos/versoes/:id`
3. **Tramitação** (ícone `pi-send`) → `/dracon/atos/tramitacao/:id`

**Footer do Drawer:**
- Botão **"Fechar"** (outlined secondary, largura total)

---

## TELA DE VERSÕES DO ATO

**Arquivo:** `dracon-versoes-ato.ts`  
**Rota:** `/dracon/atos/versoes/:id`

### Cabeçalho
- Título: **"Versões do ato"**
- _(Sem botão de "Novo")_

### Card "Detalhes do ato" (4 colunas, somente leitura)
Campos exibidos:
- Número do ato
- Tipo modelo de ato
- Assunto
- Nível de acesso
- Data de criação
- Processo SEI
- Processo interno
- Situação de ato

### Tabela de versões
Colunas:
| # | Coluna | Observação |
|---|---|---|
| 1 | Versão | ex.: 1.0, 1.2 |
| 2 | Data | Data da versão |
| 3 | Situação | ex.: Conclusão, Alteração textual |
| 4 | Ação executada | ex.: Autógrafo de lei |
| 5 | Executado por | Nome do usuário |
| 6 | Responsável | Nome do responsável |
| 7 | Ações | Largura fixa 6rem |

**Botões por linha:**
- **Visualizar** (ícone `pi-eye`) → sempre visível
- **Restaurar versão** (ícone `pi-database`) → visível **apenas** na linha marcada como `atual = true`

### Rodapé
1. **"Voltar"** (outlined secondary) → `/dracon/atos`

---

## TELA DE ALTERAR SITUAÇÃO DO ATO

**Arquivo:** `dracon-alterar-situacao.ts`  
**Rota:** `/dracon/atos/alterar-situacao/:id`

### Cabeçalho
- Título: **"Alterar situação do ato"**

### Card "Dados do ato" — Formulário (2 colunas)
| Campo | Tipo | Editável |
|---|---|---|
| Número do ato | Input texto | ❌ (readonly) |
| Tipo modelo de ato | Input texto | ❌ (readonly) |
| Nova situação | Select (Em elaboração / Aguardando assinatura / Conclusão / Cancelado) | ✅ obrigatório |
| Responsável | Select (lista de servidores) | ✅ obrigatório |
| Data de criação | DatePicker (dd/mm/yy) | ✅ |
| Data de conclusão | DatePicker (dd/mm/yy) | ✅ |

### Rodapé
1. **"Voltar"** (outlined secondary) → `/dracon/atos`
2. **"Salvar"** (primário, ícone `pi-check`) → salva e retorna para `/dracon/atos`

---

## TELA DE NOVA TRAMITAÇÃO

**Arquivo:** `dracon-manter-tramitacao.ts`  
**Rota:** `/dracon/atos/tramitacao/:id`

### Cabeçalho
- Título: **"Nova tramitação"**

### Card "Dados da tramitação" — Formulário (2 colunas)
| Campo | Tipo | Obrigatório |
|---|---|---|
| Tipo de tramitação | Select (Envio / Devolução / Arquivamento) | ✅ |
| Data | DatePicker (dd/mm/yy) | ✅ |
| Observação | Textarea (3 linhas, largura total, 2 colunas) | ❌ |

**Aviso** (banner amarelo): _"A tramitação será enviada para os destinatários selecionados abaixo..."_

### Card "Destinatários"
- Botão **"Adicionar destinatário"** (outlined, small, ícone `pi-plus`) — placeholder
- **Tabela de destinatários** com colunas:
  - Nome
  - Unidade
  - Ações (1 botão por linha)
- **Botão por linha:**
  1. **Remover** (ícone `pi-trash`, danger, rounded) → remove o destinatário da lista

### Rodapé
1. **"Voltar"** (outlined secondary) → `/dracon/processos`
2. **"Salvar"** (primário, ícone `pi-check`) → salva e retorna para `/dracon/processos`

---

## TELA DE AUDITORIA DE ATOS

**Arquivo:** `dracon-auditoria-ato.ts`  
**Rota:** `/dracon/atos/auditoria` | `/dracon/atos/auditoria-modelos`

### Cabeçalho
- Título: **"Listar auditoria de atos"**
- _(Sem botão de "Novo")_

### Filtros (4 colunas)
| Campo | Tipo |
|---|---|
| Processo SEI | Input texto livre |
| Número do ato | Input texto livre |
| Tipo modelo ato | Select (Autógrafo de lei / Decreto) |
| Processo interno | Input texto livre |

**Botões de ação do filtro:**
1. **"Mais filtros"** — texto secundário com ícone `pi-sliders-h`
2. **"Limpar filtro"** (outlined secondary)
3. **"Filtrar"** (primário, ícone `pi-filter`)

### Tabela de auditoria
Colunas:
| # | Coluna | Observação |
|---|---|---|
| 1 | Nº ato | Ordenável |
| 2 | Órgão | Ordenável |
| 3 | Unidade | Ordenável |
| 4 | Tipo modelo ato | Ordenável |
| 5 | Ações | Largura fixa 6rem |

**Cada linha tem 2 botões de ação:**
1. **Expandir** (ícone `pi-arrow-up-right`) → abre Drawer de detalhes
2. **Visualizar** (ícone `pi-eye`) — placeholder

### Drawer — Detalhes da auditoria (painel lateral direito, 460px)
**Título:** "Detalhes da auditoria"

**Grid de informações (2 colunas):**
- Nº ato
- Órgão
- Unidade (ocupa 2 colunas)
- Tipo modelo ato (ocupa 2 colunas)

**Footer do Drawer:**
- Botão **"Fechar"** (outlined secondary, largura total)

---

## TELA DE LISTAR MODELOS DE ATO

**Arquivo:** `dracon-listar-modelos.ts`  
**Rota:** `/dracon/atos/modelos`

> **Componente reutilizado em 3 rotas** com comportamento dinâmico conforme a URL:
> - `/dracon/atos/modelos` → título "Listar modelos de ato", **sem** colunas de Peso e Prazo
> - `/dracon/cadastros/tipo-ato` → título "Listar tipo ato", **com** colunas de Peso e Prazo
> - `/dracon/cadastros/tipo-processo` → título "Listar tipo de processo", **sem** colunas de Peso e Prazo

### Cabeçalho
- Título dinâmico (ver acima)
- Botão primário **"Novo [tipo ato / tipo de processo / modelo]"** (ícone `pi-plus`) — placeholder

### Filtros (2 a 4 colunas, conforme rota)
| Campo | Exibido em | Tipo |
|---|---|---|
| Descrição | Sempre | Input texto livre |
| Complexidade | Sempre | Select (Alta / Média / Baixa) |
| Peso | Apenas Tipo Ato | Input texto livre |
| Prazo total | Apenas Tipo Ato | Input texto (hint: "Dias corridos") |

**Botões de ação do filtro:**
1. **"Mais filtros"** — texto secundário
2. **"Limpar filtro"** (outlined secondary)
3. **"Filtrar"** (primário, ícone `pi-filter`)

### Tabela
Colunas:
| # | Coluna | Exibido |
|---|---|---|
| 1 | Descrição | Sempre |
| 2 | Complexidade | Sempre |
| 3 | Peso | Apenas Tipo Ato |
| 4 | Prazo total | Apenas Tipo Ato |
| 5 | Situação | Tag: verde (Ativo) / cinza (Inativo) |
| 6 | Ações | Largura fixa 7rem |

**Cada linha tem 3 botões de ação:**
1. **Visualizar** (ícone `pi-eye`) → abre Drawer de detalhes
2. **Histórico** (ícone `pi-undo`) — placeholder
3. **Editar** (ícone `pi-pencil`) — placeholder

### Drawer — Detalhes (painel lateral direito, 440px)
**Título:** "Detalhes"

**Grid de informações (2 colunas):**
- Descrição (ocupa 2 colunas)
- Complexidade
- Peso _(se tipo ato)_
- Prazo total _(se tipo ato)_
- Situação (tag)

**Footer do Drawer:**
- Botão **"Fechar"** (outlined secondary, largura total)

---

---

# PACOTE 3 — CADASTROS

---

## TELA DE LISTAR TIPO ATO

**Arquivo:** `dracon-listar-modelos.ts` (reutilizado)  
**Rota:** `/dracon/cadastros/tipo-ato`

→ Ver **TELA DE LISTAR MODELOS DE ATO** acima.  
Diferença: título "Listar tipo ato", exibe colunas **Peso** e **Prazo total**.

---

## TELA DE LISTAR TIPO DE PROCESSO

**Arquivo:** `dracon-listar-modelos.ts` (reutilizado)  
**Rota:** `/dracon/cadastros/tipo-processo`

→ Ver **TELA DE LISTAR MODELOS DE ATO** acima.  
Diferença: título "Listar tipo de processo", **sem** colunas Peso e Prazo total.

---

## TELA DE LISTAR ETIQUETAS

**Arquivo:** `dracon-listar-etiquetas.ts`  
**Rota:** `/dracon/cadastros/etiquetas`

### Cabeçalho
- Título: **"Listar etiquetas"**
- Botão primário **"Nova etiqueta"** (ícone `pi-plus`) → `/dracon/cadastros/etiquetas/nova`

### Filtros (2 colunas)
| Campo | Tipo |
|---|---|
| Descrição | Input texto livre |
| Situação | Select (Ativo / Inativo) |

**Botões de ação do filtro:**
1. **"Limpar filtro"** (outlined secondary)
2. **"Filtrar"** (primário, ícone `pi-filter`)

### Tabela de etiquetas
Colunas:
| # | Coluna | Observação |
|---|---|---|
| 1 | Descrição | Ordenável |
| 2 | Representação | Chip colorido com borda e fundo na cor configurada |
| 3 | Situação | Tag: verde (Ativo) / cinza (Inativo) |
| 4 | Ações | Largura fixa 4rem |

**Cada linha tem 1 botão de ação:**
1. **Editar** (ícone `pi-pencil`) → `/dracon/cadastros/etiquetas/:id`

---

## TELA DE CRIAR / EDITAR ETIQUETA

**Arquivo:** `dracon-manter-etiqueta.ts`  
**Rota:** `/dracon/cadastros/etiquetas/nova` | `/dracon/cadastros/etiquetas/:id`

### Cabeçalho
- Título dinâmico: **"Criar etiqueta"** ou **"Editar etiqueta"** (conforme rota)

### Card "Dados da etiqueta" — Formulário (2 colunas)
| Campo | Tipo | Obrigatório |
|---|---|---|
| Descrição | Input texto (ex.: "Em atraso") | ✅ |
| Cor | Color picker + hex code + chip de pré-visualização | ✅ |

**Pré-visualização ao vivo**: um chip colorido mostra em tempo real como a etiqueta aparecerá com a cor e descrição preenchidas.

### Rodapé
1. **"Voltar"** (outlined secondary) → `/dracon/cadastros/etiquetas`
2. **"Salvar"** (primário, ícone `pi-check`) → salva e retorna para `/dracon/cadastros/etiquetas`

---

## TELA DE LISTAR AFASTAMENTOS (CADASTRO)

**Arquivo:** `dracon-listar-afastamentos.ts` (reutilizado)  
**Rota:** `/dracon/cadastros/afastamento`

→ Ver **TELA DE LISTAR AFASTAMENTOS** (Pacote 1.1).  
Mesma tela, mesma estrutura.

---

---

# PACOTE 4 — RELATÓRIOS

---

## TELA DE RELATÓRIOS

**Arquivo:** `dracon-relatorios.ts`  
**Rota:** `/dracon/relatorios`

### Cabeçalho
- Título: **"Relatórios"**
- _(Sem botões no header)_

---

### RELATÓRIO 1 — Quantidade de processo

**Card** com ícone `pi-chart-bar` (verde), título e descrição do relatório.

**Filtros (5 colunas):**
| Campo | Tipo |
|---|---|
| Tipo de processo | Select (Atos Administrativos / Processo Legislativo) |
| Ano início | Select (anos de 2016 a 2025) |
| Mês início | Select (Janeiro a Dezembro) |
| Ano fim | Select (anos de 2016 a 2025) |
| Mês fim | Select (Janeiro a Dezembro) |

**Botão de ação** (alinhado à direita):
- **"Gerar relatório"** (primário, ícone `pi-file-export`) — placeholder

---

### RELATÓRIO 2 — Tramitação dos processos

**Card** com ícone `pi-sitemap` (verde), título e descrição do relatório.

**Filtros (4 colunas):**
| Campo | Tipo |
|---|---|
| Tipo de processo | Select (Atos Administrativos / Processo Legislativo) |
| Processo SEI | Select (placeholder, sem opções carregadas) |
| Ano | Select (anos de 2016 a 2025) |
| Mês | Select (Janeiro a Dezembro) |

**Botão de ação** (alinhado à direita):
- **"Gerar relatório"** (primário, ícone `pi-file-export`) — placeholder

---

---

# MAPA DE FLUXOS

```
/dracon/processos
  ├── [Botão "Novo processo"]      → /dracon/processos/novo
  ├── [Linha > Expandir]           → Drawer de detalhes
  │     ├── [Tramitar]             → placeholder
  │     ├── [Editar]               → /dracon/processos/:id
  │     ├── [Documentos]           → /dracon/processos/documentos-sei/:id
  │     ├── [Cancelar]             → /dracon/processos/cancelar/:id
  │     ├── [Vincular etiquetas]   → /dracon/atos/etiquetas/:id
  │     └── [Histórico etiquetas]  → /dracon/processos/historico-etiquetas/:id
  └── [Linha > Ações (menu)]       → mesmas ações acima

/dracon/atos
  └── [Linha > Expandir]           → Drawer de detalhes
        ├── [Alterar situação]     → /dracon/atos/alterar-situacao/:id
        ├── [Versões do ato]       → /dracon/atos/versoes/:id
        └── [Tramitação]           → /dracon/atos/tramitacao/:id

/dracon/atos/versoes/:id
  └── [Voltar]                     → /dracon/atos

/dracon/gestao/distribuicao
  └── [Botão "Nova distribuição"]  → /dracon/gestao/distribuicao/nova

/dracon/cadastros/etiquetas
  ├── [Botão "Nova etiqueta"]      → /dracon/cadastros/etiquetas/nova
  └── [Linha > Editar]             → /dracon/cadastros/etiquetas/:id

/dracon/cadastros/tipo-ato         → reutiliza dracon-listar-modelos
/dracon/cadastros/tipo-processo    → reutiliza dracon-listar-modelos
/dracon/atos/modelos               → reutiliza dracon-listar-modelos
/dracon/cadastros/afastamento      → reutiliza dracon-listar-afastamentos
/dracon/atos/auditoria-modelos     → reutiliza dracon-auditoria-ato
```

---

## Contagem de telas

| Categoria | Quantidade |
|---|---|
| Telas de listagem (com tabela) | 8 |
| Telas de formulário (criar/editar) | 5 |
| Telas de confirmação/ação | 3 |
| Telas de visualização (somente leitura) | 2 |
| **Total de componentes únicos** | **18** |
| Rotas mapeadas (incluindo aliases) | 22 |
