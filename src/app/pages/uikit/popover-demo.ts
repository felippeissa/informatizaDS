import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-popover-demo',
    standalone: true,
    imports: [CommonModule, PopoverModule, ButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Popover</h1>
            <p class="comp-desc">Sobreposição com conteúdo rico ativada por clique. Use <code>#op</code> e <code>op.toggle($event)</code>.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">PopoverModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/popover'</span><span class="tok-pt">;</span>
            </div>
        </div>

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
                            <div class="demo-card-title">Popover</div>
                            <p class="demo-card-desc">Sobreposição com conteúdo rico ativada por clique. Use <code>#op</code> e <code>op.toggle($event)</code> para controlar a visibilidade.</p>
                        </div>
                        <div class="demo-card-body">
                            <p-button label="Abrir Popover" icon="pi pi-info-circle" (click)="pop.toggle($event)" severity="secondary" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code }}</pre></div>
                    </div>

                    <p-popover #pop>
                        <div style="padding:4px 0">
                            <p style="font-weight:700;margin:0 0 6px">Informações</p>
                            <p style="font-size:13px;color:var(--text-color-secondary);margin:0;line-height:1.5">
                                Use o Popover para exibir conteúdo rico<br/>em um painel flutuante ao clicar.
                            </p>
                        </div>
                    </p-popover>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Propriedades</div>
                    <p-table [value]="props" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:160px">Nome</th><th style="width:130px">Tipo</th><th style="width:120px">Padrão</th><th>Descrição</th></tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-r>
                            <tr>
                                <td><strong style="font-family:monospace;font-size:13px">{{ r.name }}</strong></td>
                                <td><span class="badge-type">{{ r.type }}</span></td>
                                <td><span class="badge-default">{{ r.default }}</span></td>
                                <td style="font-size:13px;color:var(--text-color-secondary)">{{ r.description }}</td>
                            </tr>
                        </ng-template>
                    </p-table>
                    <div class="api-block-title" style="margin-top:24px">Métodos</div>
                    <p-table [value]="methods" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:160px">Nome</th><th>Descrição</th></tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-m>
                            <tr>
                                <td><strong style="font-family:monospace;font-size:13px">{{ m.name }}</strong></td>
                                <td style="font-size:13px;color:var(--text-color-secondary)">{{ m.description }}</td>
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
export class PopoverDemo {
    code = `<p-button label="Info"
    (click)="op.toggle($event)" />

<p-popover #op>
    <div>Conteúdo rico aqui</div>
</p-popover>`;

    props = [
        { name: 'style',         type: 'object',  default: 'null',   description: 'Estilos inline do painel.' },
        { name: 'styleClass',    type: 'string',  default: 'null',   description: 'Classe CSS adicional.' },
        { name: 'appendTo',      type: 'any',     default: 'body',   description: 'Elemento pai onde o popover é renderizado.' },
        { name: 'showTransitionOptions', type: 'string', default: '.12s cubic-bezier(0, 0, 0.2, 1)', description: 'Transição de entrada.' },
        { name: 'hideTransitionOptions', type: 'string', default: '.1s linear', description: 'Transição de saída.' },
    ];

    methods = [
        { name: 'toggle(event)', description: 'Alterna a visibilidade do popover.' },
        { name: 'show(event)',   description: 'Exibe o popover.' },
        { name: 'hide()',        description: 'Oculta o popover.' },
    ];

    themeVars = [
        { variable: '--p-popover-background',    description: 'Fundo do popover.' },
        { variable: '--p-popover-border-color',  description: 'Borda do popover.' },
        { variable: '--p-popover-border-radius', description: 'Raio de borda.' },
        { variable: '--p-popover-padding',       description: 'Padding interno.' },
        { variable: '--p-popover-shadow',        description: 'Sombra do painel.' },
    ];
}
