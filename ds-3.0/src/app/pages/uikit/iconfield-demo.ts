import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-iconfield-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, IconFieldModule, InputIconModule, InputTextModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        .demo-grid { display:flex; flex-wrap:wrap; gap:20px; padding:20px; align-items:flex-start; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">IconField</h1>
            <p class="comp-desc">IconField é um container que posiciona ícones dentro de campos de input, à esquerda ou à direita.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">IconFieldModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/iconfield'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Ícone à esquerda</div>
                            <p class="demo-card-desc">Padrão: o ícone fica à esquerda do input.</p>
                        </div>
                        <div class="demo-card-body demo-grid">
                            <p-iconfield>
                                <p-inputicon styleClass="pi pi-search" />
                                <input pInputText [(ngModel)]="search" placeholder="Pesquisar..." />
                            </p-iconfield>

                            <p-iconfield>
                                <p-inputicon styleClass="pi pi-user" />
                                <input pInputText [(ngModel)]="username" placeholder="Usuário" />
                            </p-iconfield>

                            <p-iconfield>
                                <p-inputicon styleClass="pi pi-envelope" />
                                <input pInputText [(ngModel)]="email" placeholder="E-mail" />
                            </p-iconfield>
                        </div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Ícone à direita</div>
                            <p class="demo-card-desc">Use <code>iconPosition="right"</code> para posicionar o ícone à direita.</p>
                        </div>
                        <div class="demo-card-body demo-grid">
                            <p-iconfield iconPosition="right">
                                <input pInputText [(ngModel)]="search2" placeholder="Pesquisar..." />
                                <p-inputicon styleClass="pi pi-search" />
                            </p-iconfield>

                            <p-iconfield iconPosition="right">
                                <input pInputText [(ngModel)]="pass" placeholder="Senha" type="password" />
                                <p-inputicon styleClass="pi pi-eye" />
                            </p-iconfield>
                        </div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Ambos os lados</div>
                        </div>
                        <div class="demo-card-body demo-grid">
                            <p-iconfield>
                                <p-inputicon styleClass="pi pi-search" />
                                <input pInputText [(ngModel)]="search3" placeholder="Pesquisar produtos..." />
                                <p-inputicon styleClass="pi pi-times" style="cursor:pointer" (click)="search3=''" />
                            </p-iconfield>
                        </div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:20px 0">
                    <p class="api-block-title">IconField — Propriedades</p>
                    <p-table [value]="apiProps" styleClass="p-datatable-sm">
                        <ng-template #header><tr><th>Prop</th><th>Tipo</th><th>Padrão</th><th>Descrição</th></tr></ng-template>
                        <ng-template #body let-r><tr>
                            <td><code>{{r.prop}}</code></td>
                            <td><span class="badge-type">{{r.type}}</span></td>
                            <td><span class="badge-default">{{r.default}}</span></td>
                            <td>{{r.desc}}</td>
                        </tr></ng-template>
                    </p-table>
                </div></p-tabpanel>
            </p-tabpanels>
        </p-tabs>
    `
})
export class IconFieldDemo {
    search = '';  search2 = '';  search3 = '';
    username = '';  email = '';  pass = '';

    apiProps = [
        { prop: 'iconPosition', type: 'string', default: 'left', desc: 'Posição do ícone: left | right' },
    ];
}
