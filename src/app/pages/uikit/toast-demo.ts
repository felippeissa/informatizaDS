import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-toast-demo',
    standalone: true,
    imports: [CommonModule, ButtonModule, ToastModule, TabsModule, TableModule],
    providers: [MessageService],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Toast</h1>
            <p class="comp-desc">Notificação temporária que aparece no canto da tela via <code>MessageService</code>.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">ToastModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/toast'</span><span class="tok-pt">;</span>
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

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Toast</div>
                            <p class="demo-card-desc">Notificação temporária que aparece no canto da tela via <code>MessageService</code>. Requer <code>&lt;p-toast /&gt;</code> no template.</p>
                        </div>
                        <div class="demo-card-body" style="gap:10px;flex-wrap:wrap">
                            <p-button label="Sucesso"   severity="success" icon="pi pi-check"               (click)="show('success','Salvo!','Registro salvo com sucesso.')" />
                            <p-button label="Info"      severity="info"    icon="pi pi-info-circle"          (click)="show('info','Informação','Operação em andamento.')" />
                            <p-button label="Aviso"     severity="warn"    icon="pi pi-exclamation-triangle" (click)="show('warn','Atenção','Verifique os dados.')" />
                            <p-button label="Erro"      severity="danger"  icon="pi pi-times"               (click)="show('error','Erro','Falha ao processar.')" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">MessageService.add() — Opções</div>
                    <p-table [value]="props" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:160px">Prop</th><th style="width:130px">Tipo</th><th>Descrição</th></tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-r>
                            <tr>
                                <td><strong style="font-family:monospace;font-size:13px">{{ r.name }}</strong></td>
                                <td><span class="badge-type">{{ r.type }}</span></td>
                                <td style="font-size:13px;color:var(--text-color-secondary)">{{ r.description }}</td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div></p-tabpanel>

                <p-tabpanel value="theming"><div style="padding:16px 0">
                    <p-table [value]="themeVars" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:360px">Variável CSS</th><th>Descrição</th></tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-v>
                            <tr>
                                <td><span class="theme-var">{{ v.variable }}</span></td>
                                <td style="font-size:13px;color:var(--text-color-secondary)">{{ v.description }}</td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div></p-tabpanel>
            </p-tabpanels>
        </p-tabs>
    `
})
export class ToastDemo {
    constructor(private messageService: MessageService) {}

    show(severity: string, summary: string, detail: string) {
        this.messageService.add({ severity, summary, detail, life: 3000 });
    }

    code = `<!-- 1. Adicione no template -->
<p-toast />

<!-- 2. Injete o serviço -->
constructor(private ms: MessageService) {}

<!-- 3. Dispare notificações -->
this.ms.add({
    severity: 'success',
    summary: 'Salvo!',
    detail: 'Registro salvo com sucesso.',
    life: 3000
});`;

    props = [
        { name: 'severity', type: 'string',  description: 'Tipo da mensagem: success | info | warn | error.' },
        { name: 'summary',  type: 'string',  description: 'Título em negrito.' },
        { name: 'detail',   type: 'string',  description: 'Texto descritivo.' },
        { name: 'life',     type: 'number',  description: 'Duração em ms antes de fechar automaticamente.' },
        { name: 'sticky',   type: 'boolean', description: 'Se true, não fecha automaticamente.' },
        { name: 'closable', type: 'boolean', description: 'Se false, oculta o botão de fechar.' },
    ];

    themeVars = [
        { variable: '--p-toast-success-background', description: 'Fundo do toast success.' },
        { variable: '--p-toast-info-background',    description: 'Fundo do toast info.' },
        { variable: '--p-toast-warn-background',    description: 'Fundo do toast warn.' },
        { variable: '--p-toast-error-background',   description: 'Fundo do toast error.' },
        { variable: '--p-toast-border-radius',      description: 'Raio de borda do toast.' },
        { variable: '--p-toast-shadow',             description: 'Sombra do toast.' },
    ];
}
