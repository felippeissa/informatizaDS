# Manual Inteligente — Componentes utilizados

Levantamento de todos os componentes (PrimeNG, Angular e customizados) usados na tela do
**Manual Inteligente**, o assistente de IA que responde sobre os sistemas do Governo de Goiás
(Drácon, GO.DEV, ASSINAGO, SIAFIC, SISLOG, Portal Goiás).

## Onde vive no código

| Rota           | Componente                                              | Observação |
|----------------|----------------------------------------------------------|------------|
| `/godev/manual`| [`GodevManual`](src/app/godev/godev-manual.ts)            | Acessado a partir do menu lateral do GO.DEV |
| `/manual`      | [`ManualLayout`](src/app/manual/manual-layout.ts) → `GodevManual` | Acessado como sistema próprio pelo switcher de sistemas do topbar |

O `GodevManual` é o mesmo componente nas duas rotas — o conteúdo da tela é idêntico; o que muda é
o layout ao redor (`ManualLayout` adiciona topbar/footer/chat flutuante quando acessado por `/manual`).

## Componentes do PrimeNG usados diretamente no `GodevManual`

| Componente / diretiva | Módulo                    | Onde é usado |
|------------------------|---------------------------|--------------|
| `p-button`             | `primeng/button`          | "Novo chat", item de conversa na sidebar, sugestões de pergunta, botão de anexar, botão de enviar |
| `p-select`              | `primeng/select`          | Seletor de sistema/tema na barra de input |
| `pInputText`            | `primeng/inputtext`       | Campo de busca de conversas (sidebar) e campo de mensagem (barra de input) |
| `pTooltip`              | `primeng/tooltip`         | Tooltip do botão de anexar e do seletor de sistema (quando travado) |

## Diretivas e recursos do Angular

| Recurso            | Onde é usado |
|---------------------|--------------|
| `FormsModule` (`[ngModel]` / `(ngModelChange)`) | Busca de conversas, campo de mensagem, seletor de sistema |
| `CommonModule`       | Base do template |
| `*ngTemplateOutlet`  | Reaproveita a mesma barra de input (`#barra`) tanto na tela de boas-vindas quanto no rodapé da conversa |
| Control flow nativo (`@if` / `@for` / `@empty`) | Lista de conversas, mensagens da conversa ativa, sugestões, indicador de "digitando" |

## Elementos customizados (sem componente equivalente no PrimeNG)

Estilizados manualmente em [godev-manual.scss](src/app/godev/godev-manual.scss), seguindo o
padrão bento do design system (cards com `var(--surface-card)`, borda e `border-radius`):

- Bolhas de mensagem do usuário e da IA (`.gm-msg--user`, `.gm-msg--ia`)
- Avatar circular da IA (`.gm-ia-avatar`)
- Indicador de "digitando" com 3 pontos animados (`.gm-typing`)
- Badge do sistema identificado na resposta da IA (`.gm-ia-sistema`)
- Estado vazio "Nenhuma conversa ainda" (`.gm-conversas-vazio`)

## Serviços

| Serviço | Arquivo | Função |
|---------|---------|--------|
| `ChatBridgeService` | [chat-bridge.service.ts](src/app/chat/chat-bridge.service.ts) | Transporta a conversa (e o rascunho não enviado) do chat flutuante para o Manual Inteligente ao navegar |

## Layout ao redor (somente na rota `/manual`)

Quando acessado como sistema próprio (`/manual`), o `ManualLayout` envolve o `GodevManual` com:

- `AppTopbar` — topbar com switcher de sistemas
- `AppFooter` — rodapé padrão
- `ChatFlutuante` — chat flutuante (componente próprio, com seus próprios `p-button`, `pInputText`,
  `p-select` e `pTooltip` — não faz parte da tela do Manual Inteligente em si, mas convive na mesma página)
