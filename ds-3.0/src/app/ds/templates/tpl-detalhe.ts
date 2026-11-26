import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { TimelineModule } from 'primeng/timeline';

/**
 * TEMPLATE — Detalhe / Workspace.
 * Padrão para telas de detalhe com abas: conteúdo principal em card com
 * p-tabs e um painel lateral (bento) com metadados. Vira coluna única no mobile.
 */
@Component({
    selector: 'app-tpl-detalhe',
    standalone: true,
    imports: [ButtonModule, TagModule, TabsModule, TableModule, TimelineModule],
    template: `
    <div class="ds-page">
        <div class="ds-page-header">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <h1 class="ds-page-title">Portal do Servidor</h1>
                <p-tag value="Ativo" severity="success" />
            </div>
            <div class="ds-acoes-row">
                <p-button label="Editar" icon="pi pi-pencil" [outlined]="true" />
                <p-button label="Publicar" icon="pi pi-send" />
            </div>
        </div>

        <div class="tpl-det-grid">
            <!-- Conteúdo principal -->
            <div class="ds-card">
                <p-tabs value="0">
                    <p-tablist>
                        <p-tab value="0">Resumo</p-tab>
                        <p-tab value="1">Itens</p-tab>
                        <p-tab value="2">Histórico</p-tab>
                    </p-tablist>
                    <p-tabpanels>
                        <p-tabpanel value="0">
                            <p style="line-height: 1.7; color: var(--text-color);">
                                Projeto responsável pelo portal de autoatendimento do servidor público estadual.
                                Reúne consulta de contracheque, férias, benefícios e solicitações internas.
                            </p>
                            <div class="ds-grid ds-grid--kpi" style="margin-top: 1rem;">
                                <div style="padding: 1rem; background: var(--surface-ground); border-radius: 10px;">
                                    <div style="font-size: 0.75rem; color: var(--text-color-secondary);">Progresso</div>
                                    <div style="font-size: 1.5rem; font-weight: 700;">92%</div>
                                </div>
                                <div style="padding: 1rem; background: var(--surface-ground); border-radius: 10px;">
                                    <div style="font-size: 0.75rem; color: var(--text-color-secondary);">Tarefas</div>
                                    <div style="font-size: 1.5rem; font-weight: 700;">48</div>
                                </div>
                                <div style="padding: 1rem; background: var(--surface-ground); border-radius: 10px;">
                                    <div style="font-size: 0.75rem; color: var(--text-color-secondary);">Membros</div>
                                    <div style="font-size: 1.5rem; font-weight: 700;">7</div>
                                </div>
                            </div>
                        </p-tabpanel>
                        <p-tabpanel value="1">
                            <p-table [value]="itens" styleClass="p-datatable-sm">
                                <ng-template #header>
                                    <tr><th>Item</th><th>Responsável</th><th>Status</th></tr>
                                </ng-template>
                                <ng-template #body let-i>
                                    <tr>
                                        <td>{{ i.nome }}</td>
                                        <td>{{ i.responsavel }}</td>
                                        <td><p-tag [value]="i.status" [severity]="i.status === 'Concluído' ? 'success' : 'warn'" /></td>
                                    </tr>
                                </ng-template>
                            </p-table>
                        </p-tabpanel>
                        <p-tabpanel value="2">
                            <p-timeline [value]="historico" align="left">
                                <ng-template #content let-e>
                                    <div style="padding-bottom: 1rem;">
                                        <div style="font-weight: 600;">{{ e.titulo }}</div>
                                        <div style="font-size: 0.75rem; color: var(--text-color-secondary);">{{ e.data }}</div>
                                    </div>
                                </ng-template>
                            </p-timeline>
                        </p-tabpanel>
                    </p-tabpanels>
                </p-tabs>
            </div>

            <!-- Painel lateral -->
            <aside class="ds-card" style="height: fit-content;">
                <h2 class="ds-card-titulo"><i class="pi pi-info-circle"></i> Detalhes</h2>
                @for (m of metadados; track m.label) {
                    <div style="display: flex; justify-content: space-between; padding: 0.6rem 0; border-bottom: 1px solid var(--surface-border);">
                        <span style="color: var(--text-color-secondary); font-size: 0.8125rem;">{{ m.label }}</span>
                        <span style="font-weight: 600; font-size: 0.8125rem;">{{ m.valor }}</span>
                    </div>
                }
            </aside>
        </div>
    </div>
  `,
    styles: [`
    .tpl-det-grid {
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 1rem;
        align-items: start;
    }
    @media (max-width: 900px) {
        .tpl-det-grid { grid-template-columns: 1fr; }
    }
  `],
})
export class TplDetalhe {
    itens = [
        { nome: 'Tela de login', responsavel: 'Ana Souza', status: 'Concluído' },
        { nome: 'Consulta de contracheque', responsavel: 'Bruno Lima', status: 'Em andamento' },
        { nome: 'Solicitação de férias', responsavel: 'Carla Dias', status: 'Em andamento' },
    ];

    historico = [
        { titulo: 'Projeto publicado', data: '02/07/2026 14:20' },
        { titulo: 'Revisão de QA aprovada', data: '01/07/2026 09:10' },
        { titulo: 'Tela de login concluída', data: '28/06/2026 16:45' },
        { titulo: 'Projeto criado', data: '10/06/2026 08:00' },
    ];

    metadados = [
        { label: 'Tipo', valor: 'Web' },
        { label: 'Secretaria', valor: 'SEAD' },
        { label: 'Criado em', valor: '10/06/2026' },
        { label: 'Última publicação', valor: '02/07/2026' },
        { label: 'Responsável', valor: 'Ana Souza' },
    ];
}
