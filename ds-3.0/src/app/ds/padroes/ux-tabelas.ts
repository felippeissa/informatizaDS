import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule, Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { UxFigma, UxFonte } from './ux-fonte';

interface Linha { contrato: string; fornecedor: string; objeto: string; valor: number; situacao: 'Ativo' | 'Inativo' | 'Vencido'; }

/** PADRÃO DE UX — Tabelas. */
@Component({
    selector: 'app-ux-tabelas',
    standalone: true,
    imports: [ButtonModule, TableModule, TagModule, TooltipModule, MenuModule, UxFigma, UxFonte],
    template: `
    <div class="ds-page">
        <div class="ds-page-header">
            <div>
                <h1 class="ds-page-title">Tabelas</h1>
                <app-ux-fonte />
            </div>
        </div>

        <!-- Exemplo -->
        <div class="ds-card">
            <div class="ux-card-topo">
                <h2 class="ds-card-titulo"><i class="pi pi-table"></i> Exemplo no padrão</h2>
                <app-ux-figma node="6738-49721" />
            </div>
            <p class="ux-texto">Também chamada de <strong>grid</strong>. Segue o modelo mental de planilhas: até ~6 colunas, valores à direita, ações à direita.</p>
            <p-table [value]="linhas" styleClass="p-datatable-sm" [tableStyle]="{ 'min-width': '48rem' }">
                <ng-template #header>
                    <tr>
                        <th>Contrato</th><th>Fornecedor</th><th>Objeto</th>
                        <th class="ux-num-direita">Valor (R$)</th><th>Situação</th>
                        <th style="text-align:right; width: 11rem">Ações</th>
                    </tr>
                </ng-template>
                <ng-template #body let-l>
                    <tr>
                        <td>{{ l.contrato }}</td>
                        <td>{{ l.fornecedor }}</td>
                        <td style="max-width: 14rem">
                            <div style="display:flex; align-items:center; gap:.25rem">
                                <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap">{{ l.objeto }}</span>
                                <p-button icon="pi pi-info-circle" [text]="true" [rounded]="true" size="small" pTooltip="Ver detalhes" ariaLabel="Ver detalhes" />
                            </div>
                        </td>
                        <td class="ux-num-direita">{{ moeda(l.valor) }}</td>
                        <td><p-tag [value]="l.situacao" [severity]="sev(l.situacao)" /></td>
                        <td>
                            <div class="ux-acoes-direita">
                                <p-button icon="pi pi-pencil" [text]="true" [rounded]="true" pTooltip="Editar" ariaLabel="Editar" />
                                <p-button icon="pi pi-eye" [text]="true" [rounded]="true" pTooltip="Visualizar" ariaLabel="Visualizar" />
                                <p-button icon="pi pi-trash" [text]="true" [rounded]="true" severity="danger" pTooltip="Excluir" ariaLabel="Excluir" />
                                <p-button icon="pi pi-bars" [text]="true" [rounded]="true" pTooltip="Mais ações" ariaLabel="Mais ações" (onClick)="menu.toggle($event)" />
                            </div>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
            <p-menu #menu [model]="maisAcoes" [popup]="true" appendTo="body" />
        </div>

        <!-- Regras -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-list-check"></i> Regras</h2>

            <h3 class="ux-sub">Estrutura geral</h3>
            <ul class="ux-regras">
                <li><strong>Sem rolagem horizontal.</strong> Se for inevitável, congele as colunas mais relevantes (identificação ou ações).</li>
                <li>Média de <strong>6 colunas</strong>, com as informações essenciais para a decisão.</li>
                <li>Títulos de coluna objetivos, sem quebra de linha.</li>
            </ul>

            <h3 class="ux-sub">Células</h3>
            <ul class="ux-regras">
                <li><strong>Valores numéricos sempre à direita.</strong></li>
                <li>Texto longo: poucos registros → permitir quebra de linha; muitos registros → reticências (...) + ícone de <strong>detalhe</strong> que abre um dialog.</li>
                <li><strong>Edição na célula</strong> (estilo planilha) só quando o usuário altera muitos registros de forma repetida. Prefira o ícone de lápis abrindo dialog ou nova tela.</li>
            </ul>

            <h3 class="ux-sub">Tags</h3>
            <ul class="ux-regras">
                <li>Sem frases: <strong>no máximo 2 palavras e 25 caracteres</strong>.</li>
                <li>Cor de acordo com a severidade: <strong>primary = ativo</strong>, <strong>secondary = inativo</strong>, <strong>danger = alerta</strong>.</li>
                <li>Mais status do que cores? Priorize o texto — não repita cores, para evitar ambiguidade.</li>
            </ul>
            <div class="ux-exemplo" style="margin-top:0.75rem">
                <div class="ux-linha"><p-tag value="Ativo" /><p-tag value="Inativo" severity="secondary" /><p-tag value="Vencido" severity="danger" /></div>
            </div>

            <h3 class="ux-sub">Ícones de ação</h3>
            <ul class="ux-regras">
                <li>Coluna de ações <strong>alinhada à direita</strong>.</li>
                <li>Ordem, da esquerda para a direita: <strong>Editar → Visualizar → Excluir → outras</strong>.</li>
                <li>No máximo <strong>4 ícones</strong>. Mais ações → ícone <code>pi-bars</code> abrindo um menu.</li>
                <li>Ícone de <strong>detalhe</strong> para conteúdo que ficou oculto na célula (abre dialog).</li>
            </ul>
        </div>
    </div>
    `
})
export class UxTabelas {
    @ViewChild('menu') menu!: Menu;

    linhas: Linha[] = [
        { contrato: '012/2026', fornecedor: 'Alfa Serviços Ltda.', objeto: 'Manutenção predial preventiva e corretiva das unidades regionais', valor: 1250000, situacao: 'Ativo' },
        { contrato: '027/2026', fornecedor: 'Beta Tecnologia S.A.', objeto: 'Licenças de software de gestão documental', valor: 384900.5, situacao: 'Ativo' },
        { contrato: '103/2025', fornecedor: 'Gama Transportes', objeto: 'Locação de veículos para fiscalização', valor: 97200, situacao: 'Vencido' },
        { contrato: '088/2024', fornecedor: 'Delta Alimentos', objeto: 'Fornecimento de refeições', valor: 45000, situacao: 'Inativo' },
    ];

    maisAcoes: MenuItem[] = [
        { label: 'Duplicar', icon: 'pi pi-copy' },
        { label: 'Histórico', icon: 'pi pi-history' },
        { label: 'Imprimir', icon: 'pi pi-print' },
    ];

    moeda(v: number) { return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

    sev(s: string): 'secondary' | 'danger' | undefined {
        return s === 'Inativo' ? 'secondary' : s === 'Vencido' ? 'danger' : undefined;
    }
}
