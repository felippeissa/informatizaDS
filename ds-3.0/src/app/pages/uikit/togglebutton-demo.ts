import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-togglebutton-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, ToggleButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">ToggleButton</h1>
            <p class="comp-desc">Botão com estado ligado/desligado e labels customizáveis. Útil para ativar/desativar funcionalidades.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">ToggleButtonModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/togglebutton'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">ToggleButton</div>
                            <p class="demo-card-desc">Botão com estado ligado/desligado e labels customizáveis.</p>
                        </div>
                        <div class="demo-card-body" style="gap:16px;flex-wrap:wrap">
                            <p-togglebutton [(ngModel)]="togBtn1" onLabel="Ativo"     offLabel="Inativo"    onIcon="pi pi-check"     offIcon="pi pi-times" />
                            <p-togglebutton [(ngModel)]="togBtn2" onLabel="Favorito"  offLabel="Adicionar"  onIcon="pi pi-star-fill" offIcon="pi pi-star" />
                            <p-togglebutton [(ngModel)]="togBtn3" onLabel="Fixado"    offLabel="Fixar"      onIcon="pi pi-lock"      offIcon="pi pi-unlock" severity="warn" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code }}</pre></div>
                    </div>

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
export class ToggleButtonDemo {
    togBtn1 = true;
    togBtn2 = false;
    togBtn3 = false;

    code = `<p-togglebutton [(ngModel)]="ativo"
    onLabel="Ativo"
    offLabel="Inativo"
    onIcon="pi pi-check"
    offIcon="pi pi-times" />`;

    props = [
        { name: 'onLabel',    type: 'string',  default: 'Yes',   description: 'Label quando ativo.' },
        { name: 'offLabel',   type: 'string',  default: 'No',    description: 'Label quando inativo.' },
        { name: 'onIcon',     type: 'string',  default: 'null',  description: 'Ícone quando ativo.' },
        { name: 'offIcon',    type: 'string',  default: 'null',  description: 'Ícone quando inativo.' },
        { name: 'severity',   type: 'string',  default: 'null',  description: 'Severidade: secondary | success | info | warn | danger | contrast.' },
        { name: 'disabled',   type: 'boolean', default: 'false', description: 'Desabilita o botão.' },
        { name: 'iconPos',    type: 'string',  default: 'left',  description: 'Posição do ícone: left | right.' },
    ];

    themeVars = [
        { variable: '--p-togglebutton-background',         description: 'Fundo quando inativo.' },
        { variable: '--p-togglebutton-border-color',       description: 'Borda quando inativo.' },
        { variable: '--p-togglebutton-color',              description: 'Cor do texto quando inativo.' },
        { variable: '--p-togglebutton-checked-background', description: 'Fundo quando ativo.' },
        { variable: '--p-togglebutton-checked-color',      description: 'Cor do texto quando ativo.' },
    ];
}
