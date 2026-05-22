import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-messages-demo',
    standalone: true,
    imports: [CommonModule, ButtonModule, MessageModule, ToastModule, TabsModule, TableModule],
    providers: [MessageService],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Mensagens</h1>
            <p class="comp-desc">Componentes para comunicar feedback, alertas e notificações ao usuário.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">MessageModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/message'</span><span class="tok-pt">;</span>
            </div>
        </div>

        <p-toast />

        <p-tabs value="features" styleClass="mt-1">
            <p-tablist>
                <p-tab value="features">Features</p-tab>
                <p-tab value="api">API</p-tab>
                <p-tab value="theming">Theming</p-tab>
            </p-tablist>
            <p-tabpanels>
                <p-tabpanel value="features"><div style="padding:20px 0">

                    <!-- Toast -->
                    <div id="toast" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Toast</div>
                            <p class="demo-card-desc">Notificação temporária que aparece no canto da tela via <code>MessageService</code>. Requer <code>&lt;p-toast /&gt;</code> no template.</p>
                        </div>
                        <div class="demo-card-body" style="gap:10px">
                            <p-button label="Sucesso"   severity="success" icon="pi pi-check" (click)="show('success','Salvo!','Registro salvo com sucesso.')" />
                            <p-button label="Info"      severity="info"    icon="pi pi-info-circle" (click)="show('info','Informação','Operação em andamento.')" />
                            <p-button label="Aviso"     severity="warn"    icon="pi pi-exclamation-triangle" (click)="show('warn','Atenção','Verifique os dados.')" />
                            <p-button label="Erro"      severity="danger"  icon="pi pi-times" (click)="show('error','Erro','Falha ao processar.')" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.toast }}</pre></div>
                    </div>

                    <!-- Message inline -->
                    <div id="message" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Message (inline)</div>
                            <p class="demo-card-desc">Alerta fixo dentro do conteúdo da página. Use para validações de formulário e avisos contextuais.</p>
                        </div>
                        <div class="demo-card-body col" style="gap:10px">
                            <p-message severity="success" text="Registro salvo com sucesso!" styleClass="w-full" />
                            <p-message severity="info"    text="Sua sessão expira em 10 minutos." styleClass="w-full" />
                            <p-message severity="warn"    text="Atenção: campos obrigatórios não preenchidos." styleClass="w-full" />
                            <p-message severity="error"   text="Erro ao conectar ao servidor." styleClass="w-full" />
                            <p-message severity="secondary" text="Mensagem neutra para informações secundárias." styleClass="w-full" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.message }}</pre></div>
                    </div>

                    <!-- Message com ícone customizado -->
                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Message com conteúdo customizado</div>
                            <p class="demo-card-desc">Use ng-template para customizar completamente o conteúdo da mensagem.</p>
                        </div>
                        <div class="demo-card-body col" style="gap:10px">
                            <p-message severity="warn" styleClass="w-full">
                                <ng-template #icon><i class="pi pi-exclamation-circle"></i></ng-template>
                                <ng-template #content>
                                    <span style="font-weight:600">Certificado vence em 3 dias.</span>
                                    <span style="font-size:12px;color:inherit;opacity:.8;margin-left:8px">Renove até 25/05/2026.</span>
                                </ng-template>
                            </p-message>
                            <p-message severity="info" styleClass="w-full">
                                <ng-template #content>
                                    <div style="display:flex;align-items:center;justify-content:space-between;width:100%">
                                        <span>Nova versão disponível: <strong>v3.1.0</strong></span>
                                        <p-button label="Atualizar" size="small" severity="info" text />
                                    </div>
                                </ng-template>
                            </p-message>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.messageCustom }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Toast — MessageService.add()</div>
                    <p-table [value]="propsToast" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header"><tr><th style="width:180px">Prop</th><th style="width:140px">Tipo</th><th>Descrição</th></tr></ng-template>
                        <ng-template pTemplate="body" let-r>
                            <tr><td><strong style="font-family:monospace;font-size:13px">{{ r.name }}</strong></td>
                                <td><span class="badge-type">{{ r.type }}</span></td>
                                <td style="font-size:13px;color:var(--text-color-secondary)">{{ r.description }}</td></tr>
                        </ng-template>
                    </p-table>
                    <div class="api-block-title" style="margin-top:28px">Message — Propriedades</div>
                    <p-table [value]="propsMessage" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header"><tr><th style="width:180px">Nome</th><th style="width:140px">Tipo</th><th style="width:110px">Padrão</th><th>Descrição</th></tr></ng-template>
                        <ng-template pTemplate="body" let-r>
                            <tr><td><strong style="font-family:monospace;font-size:13px">{{ r.name }}</strong></td>
                                <td><span class="badge-type">{{ r.type }}</span></td>
                                <td><span class="badge-default">{{ r.default }}</span></td>
                                <td style="font-size:13px;color:var(--text-color-secondary)">{{ r.description }}</td></tr>
                        </ng-template>
                    </p-table>
                </div></p-tabpanel>

                <p-tabpanel value="theming"><div style="padding:16px 0">
                    <p-table [value]="themeVars" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header"><tr><th style="width:360px">Variável CSS</th><th>Descrição</th></tr></ng-template>
                        <ng-template pTemplate="body" let-v>
                            <tr><td><span class="theme-var">{{ v.variable }}</span></td><td style="font-size:13px;color:var(--text-color-secondary)">{{ v.description }}</td></tr>
                        </ng-template>
                    </p-table>
                </div></p-tabpanel>
            </p-tabpanels>
        </p-tabs>
    `
})
export class MessagesDemo {
    constructor(private messageService: MessageService) {}

    show(severity: string, summary: string, detail: string) {
        this.messageService.add({ severity, summary, detail, life: 3000 });
    }

    code: any = {
        toast: `<!-- 1. Adicione no template -->
<p-toast />

<!-- 2. Injete o serviço -->
constructor(private ms: MessageService) {}

<!-- 3. Dispare notificações -->
this.ms.add({
    severity: 'success',
    summary: 'Salvo!',
    detail: 'Registro salvo com sucesso.',
    life: 3000
});`,

        message: `<!-- Success -->
<p-message severity="success"
    text="Operação realizada com sucesso!"
    styleClass="w-full" />

<!-- Error -->
<p-message severity="error"
    text="Erro ao processar a solicitação."
    styleClass="w-full" />

<!-- Severidades: success | info | warn | error | secondary -->`,

        messageCustom: `<p-message severity="warn" styleClass="w-full">
    <ng-template #content>
        <div style="display:flex;justify-content:space-between;width:100%">
            <span>Certificado vence em <strong>3 dias</strong>.</span>
            <p-button label="Renovar" size="small" severity="warn" text />
        </div>
    </ng-template>
</p-message>`,
    };

    propsToast = [
        { name: 'severity', type: 'string', description: 'Tipo da mensagem: success | info | warn | error.' },
        { name: 'summary',  type: 'string', description: 'Título em negrito.' },
        { name: 'detail',   type: 'string', description: 'Texto descritivo.' },
        { name: 'life',     type: 'number', description: 'Duração em ms antes de fechar automaticamente.' },
        { name: 'sticky',   type: 'boolean',description: 'Se true, não fecha automaticamente.' },
        { name: 'closable', type: 'boolean',description: 'Se false, oculta o botão de fechar.' },
    ];

    propsMessage = [
        { name: 'severity',   type: 'string',  default: 'info',  description: 'Tipo: success | info | warn | error | secondary.' },
        { name: 'text',       type: 'string',  default: 'null',  description: 'Texto simples da mensagem.' },
        { name: 'closable',   type: 'boolean', default: 'false', description: 'Exibe botão para fechar.' },
        { name: 'icon',       type: 'string',  default: 'null',  description: 'Ícone customizado.' },
        { name: 'styleClass', type: 'string',  default: 'null',  description: 'Classe CSS extra.' },
    ];

    themeVars = [
        { variable: '--p-message-success-background', description: 'Fundo do message success.' },
        { variable: '--p-message-success-color',      description: 'Cor do texto success.' },
        { variable: '--p-message-info-background',    description: 'Fundo do message info.' },
        { variable: '--p-message-warn-background',    description: 'Fundo do message warn.' },
        { variable: '--p-message-error-background',   description: 'Fundo do message error.' },
        { variable: '--p-toast-success-background',   description: 'Fundo do toast success.' },
        { variable: '--p-toast-border-radius',        description: 'Raio de borda do toast.' },
    ];
}
