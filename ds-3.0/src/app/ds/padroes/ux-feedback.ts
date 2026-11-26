import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UxFigma, UxFonte } from './ux-fonte';

/** PADRÃO DE UX — Feedback ao usuário (messages, toasts, dialogs, escrita). */
@Component({
    selector: 'app-ux-feedback',
    standalone: true,
    imports: [ButtonModule, MessageModule, DialogModule, ConfirmDialogModule, UxFigma, UxFonte],
    providers: [ConfirmationService],
    template: `
    <p-confirmdialog styleClass="ds-dialog-basico" />

    <div class="ds-page">
        <div class="ds-page-header">
            <div>
                <h1 class="ds-page-title">Feedback ao usuário</h1>
                <app-ux-fonte />
            </div>
        </div>

        <!-- Messages -->
        <div class="ds-card">
            <div class="ux-card-topo">
                <h2 class="ds-card-titulo"><i class="pi pi-info-circle"></i> Messages — informação complementar</h2>
                <app-ux-figma node="6738-53164" />
            </div>
            <p class="ux-texto">Componente <strong>estático</strong>, dentro do fluxo da página. Para avisos <strong>persistentes e contextuais</strong> — não some sozinho.</p>
            <ul class="ux-regras">
                <li>Use para orientar o usuário (ex.: "Preencha os dados abaixo. Seus dados só serão salvos após o preenchimento.").</li>
                <li>Severidade preferencial: <strong>info</strong> (azul).</li>
                <li>Largura acompanha o conteúdo a que se refere (preenche o container).</li>
            </ul>
            <div class="ux-exemplo" style="margin-top:1rem">
                <span class="ux-exemplo-rotulo">Exemplo</span>
                <p-message severity="info" icon="pi pi-info-circle">Preencha os dados abaixo. Seus dados só serão salvos após o preenchimento.</p-message>
            </div>
        </div>

        <!-- Toasts -->
        <div class="ds-card">
            <div class="ux-card-topo">
                <h2 class="ds-card-titulo"><i class="pi pi-bell"></i> Toasts — feedback temporário</h2>
                <app-ux-figma node="6738-53165" />
            </div>
            <p class="ux-texto">Notificação <strong>flutuante e temporária</strong>, que não interrompe o fluxo. Use para alertas rápidos ("Registro salvo com sucesso", "Erro ao carregar dados").</p>
            <div class="ux-specs">
                <div class="ux-spec"><strong>3000ms</strong><small>Duração padrão. Pode aumentar; nunca diminuir.</small></div>
                <div class="ux-spec"><strong>350px</strong><small>Largura fixa, altura se adapta</small></div>
                <div class="ux-spec"><strong>34 caracteres</strong><small>Título: máximo 1 linha</small></div>
                <div class="ux-spec"><strong>81 caracteres</strong><small>Descrição: máximo 2 linhas</small></div>
            </div>
            <ul class="ux-regras" style="margin-top:1rem">
                <li>Estrutura obrigatória <strong>Título + Descrição</strong>. Títulos padrão: <strong>Sucesso / Informação / Atenção / Erro</strong>.</li>
                <li>O usuário deve poder continuar navegando com o toast na tela.</li>
                <li>Mensagens de sucesso padrão: <strong>"&lt;Registro&gt; criado com sucesso."</strong>, <strong>"&lt;Registro&gt; atualizado com sucesso."</strong>, <strong>"&lt;Registro&gt; excluído com sucesso."</strong></li>
            </ul>
            <div class="ux-exemplo" style="margin-top:1rem">
                <span class="ux-exemplo-rotulo">Experimente</span>
                <div class="ux-linha">
                    <p-button label="Sucesso" severity="success" [outlined]="true" (onClick)="toast('success', 'Sucesso', 'Usuário criado com sucesso.')" />
                    <p-button label="Informação" severity="info" [outlined]="true" (onClick)="toast('info', 'Informação', 'A importação será processada em segundo plano.')" />
                    <p-button label="Atenção" severity="warn" [outlined]="true" (onClick)="toast('warn', 'Atenção', 'O prazo de envio termina amanhã.')" />
                    <p-button label="Erro" severity="danger" [outlined]="true" (onClick)="toast('error', 'Erro', 'Campos obrigatórios não preenchidos.')" />
                </div>
            </div>
        </div>

        <!-- Dialogs -->
        <div class="ds-card">
            <div class="ux-card-topo">
                <h2 class="ds-card-titulo"><i class="pi pi-window-maximize"></i> Dialogs</h2>
                <app-ux-figma node="6738-50209" />
            </div>
            <p class="ux-texto">Janela modal que <strong>interrompe o fluxo</strong> para mensagem importante, confirmação ou ação específica.
                <strong>ConfirmDialog</strong> = título + descrição para confirmar ações. <strong>Dialog</strong> = conteúdo livre (inputs, tabelas, imagens).</p>

            <h3 class="ux-sub">Modais de confirmação</h3>
            <div class="ux-tabela-wrap">
                <table class="ux-tabela">
                    <thead><tr><th>Ação</th><th>Confirmação</th></tr></thead>
                    <tbody>
                        <tr><td>Confirmar cadastro</td><td>Opcional — preferencialmente não usar (só em ações de alto impacto, como disparo de e-mails)</td></tr>
                        <tr><td>Confirmar edição</td><td><strong>Obrigatório</strong></td></tr>
                        <tr><td>Cancelar cadastro</td><td><strong>Obrigatório</strong> (alertar perda dos dados)</td></tr>
                        <tr><td>Cancelar edição</td><td><strong>Obrigatório</strong></td></tr>
                        <tr><td>Confirmar exclusão</td><td><strong>Obrigatório</strong></td></tr>
                        <tr><td>Logout (sair do sistema)</td><td><strong>Obrigatório</strong></td></tr>
                    </tbody>
                </table>
            </div>

            <h3 class="ux-sub">Dimensões</h3>
            <div class="ux-specs">
                <div class="ux-spec"><strong>350px</strong><small>Dialog basic (e ConfirmDialog)</small></div>
                <div class="ux-spec"><strong>700px</strong><small>Dialog long content</small></div>
                <div class="ux-spec"><strong>90% da tela</strong><small>Altura máxima; acima disso, rolagem</small></div>
            </div>
            <ul class="ux-regras" style="margin-top:1rem">
                <li>No código, use as classes do DS no <code>styleClass</code>: <code>&lt;p-confirmdialog styleClass="ds-dialog-basico" /&gt;</code> e <code>&lt;p-dialog styleClass="ds-dialog-longo"&gt;</code>. Elas já aplicam largura, limite de 90% da altura com rolagem e 16px entre os botões.</li>
            </ul>

            <h3 class="ux-sub">Como usar</h3>
            <ul class="ux-regras">
                <li><strong>Título</strong> obrigatório, curto, em 1 linha. <strong>Conteúdo</strong> obrigatório.</li>
                <li><strong>ConfirmDialog:</strong> botões primário e secundário obrigatórios; <strong>sem terciário</strong>.</li>
                <li><strong>Dialog:</strong> botões primário, secundário e terciário opcionais; botão de maximizar só para conteúdo extenso (tabela, texto grande).</li>
                <li>O "X" de fechar é opcional quando já existe botão com a mesma função ("Fechar", "Voltar", "Cancelar", "Não").</li>
                <li>Dialog não permite controle de permissão por perfil (o controle é por tela) — alinhe com o analista de requisitos.</li>
            </ul>
            <div class="ux-exemplo" style="margin-top:1rem">
                <span class="ux-exemplo-rotulo">Experimente</span>
                <div class="ux-linha">
                    <p-button label="Excluir registro" severity="danger" [outlined]="true" (onClick)="confirmarExclusao()" />
                    <p-button label="Cancelar cadastro" [outlined]="true" (onClick)="confirmarCancelamento()" />
                    <p-button label="Dialog long content" [outlined]="true" (onClick)="dialogLongo.set(true)" />
                </div>
            </div>
        </div>

        <!-- Escrita -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-pencil"></i> Diretrizes gerais de escrita</h2>
            <ul class="ux-regras">
                <li>Linguagem <strong>simples, clara e objetiva</strong>, em <strong>voz ativa</strong> e tom instrutivo.</li>
                <li>Evite termos técnicos para o usuário final e mensagens vagas.</li>
                <li>Não dependa só de cor ou ícone: o texto precisa dizer o que aconteceu (acessibilidade).</li>
                <li>Mensagens de erro devem <strong>indicar a ação corretiva</strong> (ex.: "Informe um CPF válido." em vez de "CPF inválido.").</li>
            </ul>
        </div>
    </div>

    <p-dialog header="Histórico do processo" [(visible)]="dialogLongo" [modal]="true" styleClass="ds-dialog-longo"
              [maximizable]="true">
        <p class="ux-texto">Dialog <strong>long content</strong>: 700px de largura, altura adaptável com rolagem acima de 90% da tela, botão de maximizar para conteúdo extenso.</p>
        <ng-template #footer>
            <p-button label="Fechar" [outlined]="true" (onClick)="dialogLongo.set(false)" />
        </ng-template>
    </p-dialog>
    `
})
export class UxFeedback {
    private msg = inject(MessageService);
    private confirm = inject(ConfirmationService);
    dialogLongo = signal(false);

    toast(severity: string, summary: string, detail: string) {
        this.msg.add({ severity, summary, detail, life: 3000 });
    }

    confirmarExclusao() {
        this.confirm.confirm({
            header: 'Excluir usuário',
            message: 'Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.',
            acceptLabel: 'Excluir', rejectLabel: 'Cancelar',
            acceptButtonProps: { severity: 'danger' }, rejectButtonProps: { outlined: true },
            accept: () => this.toast('success', 'Sucesso', 'Usuário excluído com sucesso.')
        });
    }

    confirmarCancelamento() {
        this.confirm.confirm({
            header: 'Cancelar cadastro',
            message: 'Os dados preenchidos serão perdidos. Deseja cancelar o cadastro?',
            acceptLabel: 'Sim, cancelar', rejectLabel: 'Continuar editando',
            rejectButtonProps: { outlined: true }
        });
    }
}
