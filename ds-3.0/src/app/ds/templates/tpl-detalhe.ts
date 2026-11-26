import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TimelineModule } from 'primeng/timeline';

/**
 * TEMPLATE — Visualização (padrão GESIS).
 * - Tela dedicada para registros com muitas informações.
 * - Rótulo + texto (nunca campos desabilitados), nas MESMAS seções e colunas do cadastro.
 * - Sem abas: seções em cards; conteúdo secundário em panels recolhíveis.
 * - Botões à direita: Voltar (secundário) · Editar (primário). Sem ícones.
 */
@Component({
    selector: 'app-tpl-detalhe',
    standalone: true,
    imports: [ButtonModule, TagModule, PanelModule, TableModule, TimelineModule],
    template: `
    <div class="ds-page">
        <div class="ds-page-header">
            <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
                <h1 class="ds-page-title">Portal do Servidor</h1>
                <p-tag value="Ativo" />
            </div>
        </div>

        <!-- Seção: informações gerais (mesma organização do cadastro) -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-info-circle"></i> Informações gerais</h2>
            <div class="ds-grid ds-grid--form">
                @for (c of gerais; track c.rotulo) {
                    <div class="ds-info" [class.ds-col-full]="c.inteiro">
                        <span class="ds-info-rotulo">{{ c.rotulo }}</span>
                        <span class="ds-info-valor">{{ c.valor }}</span>
                    </div>
                }
            </div>
        </div>

        <!-- Seção: planejamento -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-calendar"></i> Planejamento</h2>
            <div class="ds-grid ds-grid--form">
                @for (c of planejamento; track c.rotulo) {
                    <div class="ds-info">
                        <span class="ds-info-rotulo">{{ c.rotulo }}</span>
                        <span class="ds-info-valor">{{ c.valor }}</span>
                    </div>
                }
            </div>
        </div>

        <!-- Informações secundárias em panels recolhíveis -->
        <p-panel header="Entregas" [toggleable]="true">
            <p-table [value]="itens" styleClass="p-datatable-sm">
                <ng-template #header>
                    <tr><th>Entrega</th><th>Responsável</th><th class="ds-num">Concluído (%)</th><th>Situação</th></tr>
                </ng-template>
                <ng-template #body let-i>
                    <tr>
                        <td>{{ i.nome }}</td>
                        <td>{{ i.responsavel }}</td>
                        <td class="ds-num">{{ i.progresso }}</td>
                        <td><p-tag [value]="i.status" [severity]="i.status === 'Concluída' ? undefined : 'warn'" /></td>
                    </tr>
                </ng-template>
            </p-table>
        </p-panel>

        <p-panel header="Histórico" [toggleable]="true" [collapsed]="true">
            <p-timeline [value]="historico" align="left">
                <ng-template #content let-e>
                    <div style="padding-bottom: 1rem;">
                        <div style="font-weight: 600;">{{ e.titulo }}</div>
                        <div style="font-size: 0.8125rem; color: var(--text-color-secondary);">{{ e.data }}</div>
                    </div>
                </ng-template>
            </p-timeline>
        </p-panel>

        <!-- Ações: à direita, secundário → primário, sem ícones -->
        <div class="ds-card ds-botoes" style="padding: 1rem 1.5rem;">
            <p-button label="Voltar" [outlined]="true" (onClick)="voltar()" />
            <p-button label="Editar" (onClick)="editar()" />
        </div>
    </div>
  `,
})
export class TplDetalhe {
    private router = inject(Router);

    gerais = [
        { rotulo: 'Nome', valor: 'Portal do Servidor' },
        { rotulo: 'Tipo', valor: 'Portal' },
        { rotulo: 'Responsável', valor: 'Ana Souza' },
        { rotulo: 'CPF do responsável', valor: '123.456.789-00' },
        { rotulo: 'E-mail para contato', valor: 'portal.servidor@goias.gov.br' },
        { rotulo: 'Descrição', valor: 'Autoatendimento do servidor público estadual: consulta de contracheque, férias, benefícios e solicitações internas.', inteiro: true },
    ];

    planejamento = [
        { rotulo: 'Período de execução', valor: '10/06/2026 - 30/12/2026' },
        { rotulo: 'Valor estimado (R$)', valor: '1.250.000,00' },
        { rotulo: 'Prioridade', valor: 'Alta' },
        { rotulo: 'Situação', valor: 'Ativo' },
    ];

    itens = [
        { nome: 'Tela de login', responsavel: 'Ana Souza', progresso: 100, status: 'Concluída' },
        { nome: 'Consulta de contracheque', responsavel: 'Bruno Lima', progresso: 70, status: 'Em andamento' },
        { nome: 'Solicitação de férias', responsavel: 'Carla Dias', progresso: 35, status: 'Em andamento' },
    ];

    historico = [
        { titulo: 'Projeto publicado', data: '02/07/2026 14:20' },
        { titulo: 'Revisão de QA aprovada', data: '01/07/2026 09:10' },
        { titulo: 'Tela de login concluída', data: '28/06/2026 16:45' },
        { titulo: 'Projeto criado', data: '10/06/2026 08:00' },
    ];

    voltar() { this.router.navigateByUrl('/ds/templates/lista'); }
    editar() { this.router.navigate(['/ds/templates/formulario'], { queryParams: { modo: 'edicao' } }); }
}
