import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DrawerModule } from 'primeng/drawer';
import { TooltipModule } from 'primeng/tooltip';
import { PopoverModule } from 'primeng/popover';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-overlay-demo',
    standalone: true,
    imports: [CommonModule, ButtonModule, DialogModule, DrawerModule, TooltipModule, PopoverModule, ConfirmDialogModule, ConfirmPopupModule, TabsModule, TableModule],
    providers: [ConfirmationService],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Sobreposições</h1>
            <p class="comp-desc">Componentes que aparecem sobre o conteúdo principal: diálogos, gavetas, tooltips, popovers e confirmações.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">DialogModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/dialog'</span><span class="tok-pt">;</span>
            </div>
        </div>

        <p-confirmdialog />
        <p-confirmpopup />

        <p-tabs value="features" styleClass="mt-1">
            <p-tablist>
                <p-tab value="features">Features</p-tab>
                <p-tab value="api">API</p-tab>
                <p-tab value="theming">Theming</p-tab>
            </p-tablist>
            <p-tabpanels>
                <p-tabpanel value="features"><div style="padding:20px 0">

                    <!-- Dialog -->
                    <div id="dialog" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Dialog</div>
                            <p class="demo-card-desc">Modal com cabeçalho, conteúdo e rodapé configuráveis. Suporta arrastar e redimensionar.</p>
                        </div>
                        <div class="demo-card-body" style="gap:12px">
                            <p-button label="Básico" (click)="dlgBasic=true" />
                            <p-button label="Com rodapé" (click)="dlgFooter=true" severity="secondary" />
                            <p-button label="Maximizável" (click)="dlgMax=true" severity="secondary" outlined />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.dialog }}</pre></div>
                    </div>

                    <p-dialog header="Diálogo Básico" [(visible)]="dlgBasic" [style]="{width:'420px'}" [modal]="true">
                        <p style="margin:0;line-height:1.6">Conteúdo do diálogo. Adicione formulários, tabelas ou qualquer componente aqui.</p>
                    </p-dialog>

                    <p-dialog header="Com Rodapé" [(visible)]="dlgFooter" [style]="{width:'420px'}" [modal]="true">
                        <p style="margin:0;line-height:1.6">Confirme a ação abaixo.</p>
                        <ng-template pTemplate="footer">
                            <p-button label="Cancelar" severity="secondary" text (click)="dlgFooter=false" />
                            <p-button label="Confirmar" icon="pi pi-check" (click)="dlgFooter=false" />
                        </ng-template>
                    </p-dialog>

                    <p-dialog header="Maximizável" [(visible)]="dlgMax" [style]="{width:'560px'}" [modal]="true" [maximizable]="true">
                        <p style="margin:0;line-height:1.6">Este diálogo pode ser maximizado clicando no ícone no cabeçalho.</p>
                    </p-dialog>

                    <!-- Drawer -->
                    <div id="drawer" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Drawer</div>
                            <p class="demo-card-desc">Painel lateral que desliza da borda da tela. Ideal para menus, filtros e formulários.</p>
                        </div>
                        <div class="demo-card-body" style="gap:12px">
                            <p-button label="Esquerda" (click)="openDrawer('left')" />
                            <p-button label="Direita"  (click)="openDrawer('right')" severity="secondary" />
                            <p-button label="Topo"     (click)="openDrawer('top')" severity="secondary" outlined />
                            <p-button label="Inferior" (click)="openDrawer('bottom')" severity="secondary" outlined />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.drawer }}</pre></div>
                    </div>

                    <p-drawer [(visible)]="drawerVisible" [position]="drawerPos" header="Drawer">
                        <p style="line-height:1.6">Conteúdo do drawer. Posição: <strong>{{ drawerPos }}</strong></p>
                    </p-drawer>

                    <!-- Tooltip -->
                    <div id="tooltip" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Tooltip</div>
                            <p class="demo-card-desc">Dica de texto que aparece ao passar o mouse. Use a diretiva <code>pTooltip</code>.</p>
                        </div>
                        <div class="demo-card-body" style="gap:12px">
                            <p-button label="Topo" pTooltip="Tooltip acima" tooltipPosition="top" />
                            <p-button label="Direita" severity="secondary" pTooltip="Tooltip à direita" tooltipPosition="right" />
                            <p-button label="Inferior" severity="secondary" pTooltip="Tooltip abaixo" tooltipPosition="bottom" />
                            <p-button label="Esquerda" severity="secondary" outlined pTooltip="Tooltip à esquerda" tooltipPosition="left" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.tooltip }}</pre></div>
                    </div>

                    <!-- Popover -->
                    <div id="popover" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Popover</div>
                            <p class="demo-card-desc">Sobreposição com conteúdo rico ativada por clique. Use <code>#op</code> e <code>op.toggle($event)</code>.</p>
                        </div>
                        <div class="demo-card-body">
                            <p-button label="Abrir Popover" icon="pi pi-info-circle" (click)="pop.toggle($event)" severity="secondary" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.popover }}</pre></div>
                    </div>

                    <p-popover #pop>
                        <div style="padding:4px 0">
                            <p style="font-weight:700;margin:0 0 6px">Informações</p>
                            <p style="font-size:13px;color:var(--text-color-secondary);margin:0;line-height:1.5">
                                Use o Popover para exibir conteúdo rico<br/>em um painel flutuante ao clicar.
                            </p>
                        </div>
                    </p-popover>

                    <!-- ConfirmDialog -->
                    <div id="confirmdialog" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">ConfirmDialog</div>
                            <p class="demo-card-desc">Diálogo de confirmação padrão via <code>ConfirmationService</code>. Requer o componente <code>&lt;p-confirmdialog&gt;</code> no template.</p>
                        </div>
                        <div class="demo-card-body" style="gap:12px">
                            <p-button label="Confirmar ação" icon="pi pi-exclamation-triangle" severity="warn" (click)="confirmar()" />
                            <p-button label="Excluir" icon="pi pi-trash" severity="danger" (click)="confirmarExclusao()" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.confirmdialog }}</pre></div>
                    </div>

                    <!-- ConfirmPopup -->
                    <div id="confirmpopup" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">ConfirmPopup</div>
                            <p class="demo-card-desc">Confirmação inline ancorada ao elemento que a disparou. Mais sutil que o ConfirmDialog — ideal para ações destrutivas em linha.</p>
                        </div>
                        <div class="demo-card-body" style="gap:12px">
                            <p-button label="Confirmar inline" icon="pi pi-check" severity="warn" (click)="confirmarPopup($event)" />
                            <p-button label="Excluir item" icon="pi pi-trash" severity="danger" outlined (click)="excluirPopup($event)" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.confirmpopup }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Dialog — Propriedades</div>
                    <p-table [value]="propsDialog" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
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
export class OverlayDemo {
    dlgBasic = false; dlgFooter = false; dlgMax = false;
    drawerVisible = false; drawerPos: 'left'|'right'|'top'|'bottom' = 'left';

    constructor(private confirmationService: ConfirmationService) {}

    openDrawer(pos: 'left'|'right'|'top'|'bottom') { this.drawerPos = pos; this.drawerVisible = true; }

    confirmar() {
        this.confirmationService.confirm({
            message: 'Deseja mesmo executar esta ação?',
            header: 'Confirmação', icon: 'pi pi-info-circle',
            accept: () => {}, reject: () => {}
        });
    }

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

    confirmarExclusao() {
        this.confirmationService.confirm({
            message: 'Este registro será excluído permanentemente. Continuar?',
            header: 'Excluir Registro', icon: 'pi pi-exclamation-triangle',
            acceptButtonProps: { label: 'Excluir', severity: 'danger' },
            accept: () => {}, reject: () => {}
        });
    }

    code: any = {
        dialog: `<p-button label="Abrir" (click)="visible=true" />

<p-dialog header="Título" [(visible)]="visible"
    [style]="{width:'450px'}" [modal]="true">
    <p>Conteúdo do diálogo</p>
    <ng-template pTemplate="footer">
        <p-button label="Fechar" (click)="visible=false" />
    </ng-template>
</p-dialog>`,

        drawer: `<p-button label="Abrir" (click)="drawerVisible=true" />

<p-drawer [(visible)]="drawerVisible"
    position="left"
    header="Menu">
    <p>Conteúdo do drawer</p>
</p-drawer>`,

        tooltip: `<!-- Diretiva pTooltip em qualquer elemento -->
<p-button label="Salvar"
    pTooltip="Clique para salvar as alterações"
    tooltipPosition="top" />

<input pInputText pTooltip="Campo obrigatório" />`,

        popover: `<p-button label="Info"
    (click)="op.toggle($event)" />

<p-popover #op>
    <div>Conteúdo rico aqui</div>
</p-popover>`,

        confirmpopup: `<!-- No template: -->
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
});`,

        confirmdialog: `<!-- No template: -->
<p-confirmdialog />

<!-- No componente: -->
constructor(private cs: ConfirmationService) {}

this.cs.confirm({
    message: 'Deseja continuar?',
    header: 'Confirmação',
    icon: 'pi pi-exclamation-triangle',
    accept: () => { /* ação confirmada */ },
    reject: () => { /* ação cancelada */ }
});`,
    };

    propsDialog = [
        { name: 'header',       type: 'string',  default: 'null',  description: 'Texto do cabeçalho.' },
        { name: 'visible',      type: 'boolean', default: 'false', description: 'Controla visibilidade (two-way).' },
        { name: 'modal',        type: 'boolean', default: 'true',  description: 'Exibe overlay escuro de fundo.' },
        { name: 'style',        type: 'object',  default: 'null',  description: 'Estilos inline: ex. {width: "450px"}.' },
        { name: 'draggable',    type: 'boolean', default: 'true',  description: 'Permite arrastar o diálogo.' },
        { name: 'resizable',    type: 'boolean', default: 'true',  description: 'Permite redimensionar.' },
        { name: 'maximizable',  type: 'boolean', default: 'false', description: 'Exibe botão de maximizar.' },
        { name: 'closable',     type: 'boolean', default: 'true',  description: 'Exibe botão de fechar.' },
        { name: 'position',     type: 'string',  default: 'center', description: 'Posição: center | top | bottom | left | right.' },
    ];

    themeVars = [
        { variable: '--p-dialog-background',     description: 'Fundo do diálogo.' },
        { variable: '--p-dialog-border-color',   description: 'Borda do diálogo.' },
        { variable: '--p-dialog-border-radius',  description: 'Raio de borda.' },
        { variable: '--p-dialog-header-padding', description: 'Padding do cabeçalho.' },
        { variable: '--p-dialog-content-padding',description: 'Padding do conteúdo.' },
        { variable: '--p-dialog-footer-padding', description: 'Padding do rodapé.' },
        { variable: '--p-overlay-mask-background',description: 'Cor do overlay de fundo.' },
    ];
}
