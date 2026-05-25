import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-confirmpopup-demo',
    standalone: true,
    imports: [CommonModule, ConfirmPopupModule, ButtonModule, TabsModule, TableModule],
    providers: [ConfirmationService],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">ConfirmPopup</h1>
            <p class="comp-desc">Confirmação inline ancorada ao elemento que a disparou. Ideal para ações destrutivas em linha.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">ConfirmPopupModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/confirmpopup'</span><span class="tok-pt">;</span>
            </div>
        </div>

        <p-confirmpopup />

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
                            <div class="demo-card-title">ConfirmPopup</div>
                            <p class="demo-card-desc">Confirmação inline ancorada ao elemento. Mais sutil que o ConfirmDialog — ideal para ações destrutivas em linha.</p>
                        </div>
                        <div class="demo-card-body" style="gap:12px">
                            <p-button label="Confirmar inline" icon="pi pi-check"  severity="warn"  (click)="confirmarPopup($event)" />
                            <p-button label="Excluir item"     icon="pi pi-trash"  severity="danger" outlined (click)="excluirPopup($event)" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">ConfirmationService — Opções (ConfirmPopup)</div>
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
export class ConfirmPopupDemo {
    constructor(private confirmationService: ConfirmationService) {}

    confirmarPopup(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Deseja confirmar esta ação?',
            icon: 'pi pi-exclamation-circle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {},
            reject: () => {}
        });
    }

    excluirPopup(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Excluir este item?',
            icon: 'pi pi-trash',
            acceptLabel: 'Excluir',
            rejectLabel: 'Cancelar',
            accept: () => {},
            reject: () => {}
        });
    }

    code = `<!-- No template: -->
<p-confirmpopup />

<!-- No componente: -->
constructor(private cs: ConfirmationService) {}

this.cs.confirm({
    target: event.target as EventTarget,
    message: 'Confirmar?',
    icon: 'pi pi-exclamation-circle',
    acceptLabel: 'Sim',
    rejectLabel: 'Não',
    accept: () => { /* ação confirmada */ }
});`;

    props = [
        { name: 'target',        type: 'EventTarget', description: 'Elemento âncora onde o popup é posicionado.' },
        { name: 'message',       type: 'string',      description: 'Mensagem de confirmação.' },
        { name: 'icon',          type: 'string',      description: 'Ícone PrimeIcons.' },
        { name: 'accept',        type: 'Function',    description: 'Callback ao confirmar.' },
        { name: 'reject',        type: 'Function',    description: 'Callback ao rejeitar.' },
        { name: 'acceptLabel',   type: 'string',      description: 'Texto do botão de confirmação.' },
        { name: 'rejectLabel',   type: 'string',      description: 'Texto do botão de rejeição.' },
    ];

    themeVars = [
        { variable: '--p-confirmpopup-background',    description: 'Fundo do popup de confirmação.' },
        { variable: '--p-confirmpopup-border-color',  description: 'Borda do popup.' },
        { variable: '--p-confirmpopup-border-radius', description: 'Raio de borda.' },
        { variable: '--p-confirmpopup-padding',       description: 'Padding interno.' },
        { variable: '--p-confirmpopup-shadow',        description: 'Sombra do popup.' },
    ];
}
