import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-confirmdialog-demo',
    standalone: true,
    imports: [CommonModule, ConfirmDialogModule, ButtonModule, TabsModule, TableModule],
    providers: [ConfirmationService],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">ConfirmDialog</h1>
            <p class="comp-desc">Diálogo de confirmação padrão via <code>ConfirmationService</code>. Requer o componente <code>&lt;p-confirmdialog&gt;</code> no template.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">ConfirmDialogModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/confirmdialog'</span><span class="tok-pt">;</span>
            </div>
        </div>

        <p-confirmdialog />

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
                            <div class="demo-card-title">ConfirmDialog</div>
                            <p class="demo-card-desc">Diálogo de confirmação padrão via <code>ConfirmationService</code>. Requer o componente <code>&lt;p-confirmdialog&gt;</code> no template.</p>
                        </div>
                        <div class="demo-card-body" style="gap:12px">
                            <p-button label="Confirmar ação"  icon="pi pi-exclamation-triangle" severity="warn"   (click)="confirmar()" />
                            <p-button label="Excluir"         icon="pi pi-trash"                severity="danger"  (click)="confirmarExclusao()" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">ConfirmationService — Opções</div>
                    <p-table [value]="props" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:200px">Nome</th><th style="width:130px">Tipo</th><th>Descrição</th></tr>
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
export class ConfirmDialogDemo {
    constructor(private confirmationService: ConfirmationService) {}

    confirmar() {
        this.confirmationService.confirm({
            message: 'Deseja mesmo executar esta ação?',
            header: 'Confirmação',
            icon: 'pi pi-info-circle',
            accept: () => {},
            reject: () => {}
        });
    }

    confirmarExclusao() {
        this.confirmationService.confirm({
            message: 'Este registro será excluído permanentemente. Continuar?',
            header: 'Excluir Registro',
            icon: 'pi pi-exclamation-triangle',
            acceptButtonProps: { label: 'Excluir', severity: 'danger' },
            accept: () => {},
            reject: () => {}
        });
    }

    code = `<!-- No template: -->
<p-confirmdialog />

<!-- No componente: -->
constructor(private cs: ConfirmationService) {}

this.cs.confirm({
    message: 'Deseja continuar?',
    header: 'Confirmação',
    icon: 'pi pi-exclamation-triangle',
    accept: () => { /* ação confirmada */ },
    reject: () => { /* ação cancelada */ }
});`;

    props = [
        { name: 'message',             type: 'string',   description: 'Mensagem de confirmação.' },
        { name: 'header',              type: 'string',   description: 'Título do diálogo.' },
        { name: 'icon',                type: 'string',   description: 'Ícone PrimeIcons.' },
        { name: 'accept',              type: 'Function', description: 'Callback ao confirmar.' },
        { name: 'reject',              type: 'Function', description: 'Callback ao rejeitar.' },
        { name: 'acceptLabel',         type: 'string',   description: 'Texto do botão de confirmação.' },
        { name: 'rejectLabel',         type: 'string',   description: 'Texto do botão de rejeição.' },
        { name: 'acceptButtonProps',   type: 'object',   description: 'Propriedades do botão de aceite (ex: severity).' },
        { name: 'rejectButtonProps',   type: 'object',   description: 'Propriedades do botão de rejeição.' },
    ];

    themeVars = [
        { variable: '--p-dialog-background',      description: 'Fundo do diálogo de confirmação.' },
        { variable: '--p-dialog-border-color',    description: 'Borda do diálogo.' },
        { variable: '--p-dialog-border-radius',   description: 'Raio de borda.' },
        { variable: '--p-overlay-mask-background', description: 'Cor do overlay de fundo.' },
    ];
}
