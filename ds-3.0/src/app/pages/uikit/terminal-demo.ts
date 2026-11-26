import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalModule, TerminalService } from 'primeng/terminal';
import { Subscription } from 'rxjs';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-terminal-demo',
    standalone: true,
    imports: [CommonModule, TerminalModule, TabsModule, TableModule],
    providers: [TerminalService],
    styles: [DEMO_STYLES + `
        :host ::ng-deep .p-terminal {
            background: #0F172A; color: #E2E8F0;
            border-radius: 10px; font-family: 'Courier New', monospace;
            min-height: 220px;
        }
        :host ::ng-deep .p-terminal-prompt { color: #34D399; }
        :host ::ng-deep .p-terminal-input { color: #E2E8F0; background: transparent; }
        .terminal-hint { font-size:12px; color:var(--text-color-secondary); margin-top:8px; }
        .terminal-hint code { background:var(--surface-ground); padding:2px 6px; border-radius:4px; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Terminal</h1>
            <p class="comp-desc">Terminal emula um console interativo. Os comandos são processados pelo <code>TerminalService</code>, permitindo respostas dinâmicas.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">TerminalModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/terminal'</span><span class="tok-pt">;</span>
            </div>
        </div>

        <p-tabs value="features" styleClass="mt-1">
            <p-tablist>
                <p-tab value="features">Features</p-tab>
                <p-tab value="api">API</p-tab>
            </p-tablist>
            <p-tabpanels>
                <p-tabpanel value="features"><div style="padding:20px 0">

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Terminal interativo</div>
                            <p class="demo-card-desc">Digite um comando e pressione Enter. Os comandos são processados pelo <code>TerminalService</code>.</p>
                        </div>
                        <div class="demo-card-body" style="flex-direction:column;align-items:stretch;padding:16px">
                            <p-terminal welcomeMessage="Bem-vindo ao terminal Informatiza DS. Digite 'help' para ver os comandos disponíveis." prompt="informatiza$" />
                            <p class="terminal-hint">
                                Comandos disponíveis:
                                <code>help</code> &nbsp;
                                <code>date</code> &nbsp;
                                <code>clear</code> &nbsp;
                                <code>echo [texto]</code> &nbsp;
                                <code>version</code>
                            </p>
                        </div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:20px 0">
                    <p class="api-block-title">Propriedades do Terminal</p>
                    <p-table [value]="apiProps" styleClass="p-datatable-sm">
                        <ng-template #header><tr><th>Prop</th><th>Tipo</th><th>Padrão</th><th>Descrição</th></tr></ng-template>
                        <ng-template #body let-r><tr>
                            <td><code>{{r.prop}}</code></td>
                            <td><span class="badge-type">{{r.type}}</span></td>
                            <td><span class="badge-default">{{r.default}}</span></td>
                            <td>{{r.desc}}</td>
                        </tr></ng-template>
                    </p-table>
                    <p class="api-block-title" style="margin-top:20px">TerminalService</p>
                    <p-table [value]="serviceApi" styleClass="p-datatable-sm">
                        <ng-template #header><tr><th>Método / Observable</th><th>Descrição</th></tr></ng-template>
                        <ng-template #body let-r><tr>
                            <td><code>{{r.name}}</code></td><td>{{r.desc}}</td>
                        </tr></ng-template>
                    </p-table>
                </div></p-tabpanel>
            </p-tabpanels>
        </p-tabs>
    `
})
export class TerminalDemo implements OnDestroy {
    subscription: Subscription;
    private terminalService = inject(TerminalService);

    constructor() {
        this.subscription = this.terminalService.commandHandler.subscribe((command: string) => {
            this.handleCommand(command);
        });
    }

    handleCommand(command: string) {
        const cmd = command.trim().toLowerCase();
        let response = '';

        if (cmd === 'help') {
            response = 'Comandos: help, date, clear, echo [texto], version';
        } else if (cmd === 'date') {
            response = new Date().toLocaleString('pt-BR');
        } else if (cmd.startsWith('echo ')) {
            response = command.substring(5);
        } else if (cmd === 'version') {
            response = 'Informatiza DS v1.0.0 — Angular 21 + PrimeNG 21';
        } else if (cmd === '') {
            response = '';
        } else {
            response = `Comando não reconhecido: "${command}". Digite "help" para ver os comandos.`;
        }

        this.terminalService.sendResponse(response);
    }

    ngOnDestroy() {
        if (this.subscription) this.subscription.unsubscribe();
    }

    apiProps = [
        { prop: 'welcomeMessage', type: 'string', default: 'null', desc: 'Mensagem exibida ao iniciar' },
        { prop: 'prompt', type: 'string', default: '>', desc: 'Prompt exibido antes da entrada' },
    ];

    serviceApi = [
        { name: 'commandHandler', desc: 'Observable que emite o comando digitado pelo usuário' },
        { name: 'sendResponse(res)', desc: 'Envia a resposta do comando para o terminal' },
    ];
}
