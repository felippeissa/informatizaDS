import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule as PTableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-inplace-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, InplaceModule, InputTextModule, ButtonModule, PTableModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        .demo-grid { display:flex; flex-direction:column; gap:16px; padding:20px; }
        .field-row { display:flex; flex-direction:column; gap:4px; }
        .field-label { font-size:12px; font-weight:600; color:var(--text-color-secondary); }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Inplace</h1>
            <p class="comp-desc">Inplace permite edição inline de conteúdo — clique para substituir o texto de exibição por um campo de edição.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">InplaceModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/inplace'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Edição de texto</div>
                            <p class="demo-card-desc">Clique no valor para ativar o modo de edição.</p>
                        </div>
                        <div class="demo-card-body demo-grid">
                            <div class="field-row">
                                <span class="field-label">Nome</span>
                                <p-inplace>
                                    <ng-template #display>{{ nome || 'Clique para editar...' }}</ng-template>
                                    <ng-template #content>
                                        <input pInputText [(ngModel)]="nome" autofocus placeholder="Digite o nome" />
                                    </ng-template>
                                </p-inplace>
                            </div>
                            <div class="field-row">
                                <span class="field-label">Descrição</span>
                                <p-inplace>
                                    <ng-template #display>{{ descricao || 'Clique para adicionar descrição...' }}</ng-template>
                                    <ng-template #content>
                                        <input pInputText [(ngModel)]="descricao" autofocus placeholder="Digite a descrição" style="width:300px" />
                                    </ng-template>
                                </p-inplace>
                            </div>
                        </div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Com botões de confirmação</div>
                            <p class="demo-card-desc">Use <code>closable</code> para exibir botões Salvar/Cancelar.</p>
                        </div>
                        <div class="demo-card-body demo-grid">
                            <div class="field-row">
                                <span class="field-label">E-mail</span>
                                <p-inplace [closable]="true" (onDeactivate)="onSave()">
                                    <ng-template #display>{{ email || 'Clique para editar e-mail...' }}</ng-template>
                                    <ng-template #content>
                                        <input pInputText [(ngModel)]="email" autofocus placeholder="email@exemplo.com" style="width:260px" />
                                    </ng-template>
                                </p-inplace>
                            </div>
                        </div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Conteúdo rico</div>
                            <p class="demo-card-desc">Inplace pode conter qualquer conteúdo, como tabelas e imagens.</p>
                        </div>
                        <div class="demo-card-body" style="padding:20px">
                            <p-inplace>
                                <ng-template #display>
                                    <span style="color:var(--primary-color);font-weight:600;cursor:pointer">
                                        <i class="pi pi-table" style="margin-right:6px"></i>Ver tabela de dados
                                    </span>
                                </ng-template>
                                <ng-template #content>
                                    <p-table [value]="tableData" styleClass="p-datatable-sm" style="width:100%">
                                        <ng-template #header><tr><th>Nome</th><th>Cargo</th><th>Cidade</th></tr></ng-template>
                                        <ng-template #body let-r><tr>
                                            <td>{{r.nome}}</td><td>{{r.cargo}}</td><td>{{r.cidade}}</td>
                                        </tr></ng-template>
                                    </p-table>
                                </ng-template>
                            </p-inplace>
                        </div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:20px 0">
                    <p class="api-block-title">Propriedades</p>
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
export class InplaceDemo {
    nome = 'João Silva';
    descricao = '';
    email = 'joao@exemplo.com';

    onSave() { console.log('Saved:', this.email); }

    tableData = [
        { nome: 'Ana Lima', cargo: 'Desenvolvedora', cidade: 'Goiânia' },
        { nome: 'Carlos Souza', cargo: 'Designer', cidade: 'Brasília' },
        { nome: 'Mariana Costa', cargo: 'Analista', cidade: 'São Paulo' },
    ];

    apiProps = [
        { prop: 'active', type: 'boolean', default: 'false', desc: 'Estado de edição ativo' },
        { prop: 'closable', type: 'boolean', default: 'false', desc: 'Exibe botões Salvar/Cancelar' },
        { prop: 'disabled', type: 'boolean', default: 'false', desc: 'Desabilita a ativação por clique' },
        { prop: 'closeIcon', type: 'string', default: 'pi pi-times', desc: 'Ícone do botão fechar' },
        { prop: 'editIcon', type: 'string', default: 'pi pi-check', desc: 'Ícone do botão salvar' },
    ];
}
