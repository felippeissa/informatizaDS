import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

type Status = 'Ativo' | 'Inativo' | 'Pendente';
interface Linha { id: number; nome: string; tipo: string; responsavel: string; descricao: string; valor: number; status: Status; data: string; }

/**
 * TEMPLATE — Lista com filtros (padrão GESIS).
 * - Filtros: uma linha visível + "Mais filtros"; botões ABAIXO dos campos, à direita
 *   (Mais filtros · Limpar · Filtrar). Busca simples: resultados já aparecem ao abrir.
 * - Tabela: 6 colunas; se a tela for estreita, rola com Nome e Ações congelados; valores numéricos à direita, texto longo com reticências + detalhe,
 *   tags (ativo = primária, inativo = secondary), ações à direita
 *   Editar → Visualizar → Excluir + menu "bars"; exclusão com confirmação.
 * Copie este arquivo como ponto de partida de novas telas de consulta.
 */
@Component({
    selector: 'app-tpl-lista',
    standalone: true,
    imports: [FormsModule, ButtonModule, InputTextModule, SelectModule, DatePickerModule, TableModule, TagModule,
              TooltipModule, MenuModule, DialogModule, ConfirmDialogModule],
    providers: [ConfirmationService],
    template: `
    <p-confirmdialog styleClass="ds-dialog-basico" />

    <div class="ds-page">
        <div class="ds-page-header">
            <h1 class="ds-page-title">Consulta de projetos</h1>
            <p-button label="Novo projeto" (onClick)="novo()" />
        </div>

        <!-- Filtros -->
        <div class="ds-card">
            <div class="ds-grid ds-grid--form">
                <div class="ds-campo">
                    <label for="f-nome">Nome</label>
                    <input id="f-nome" pInputText [(ngModel)]="fNome" placeholder="Digite" />
                </div>
                <div class="ds-campo">
                    <label for="f-tipo">Tipo</label>
                    <p-select inputId="f-tipo" [options]="tipoOpts" [(ngModel)]="fTipo" placeholder="Selecione" [showClear]="true" appendTo="body" />
                </div>
                <div class="ds-campo">
                    <label for="f-status">Situação</label>
                    <p-select inputId="f-status" [options]="statusOpts" [(ngModel)]="fStatus" placeholder="Selecione" [showClear]="true" appendTo="body" />
                </div>
                <div class="ds-campo">
                    <label for="f-resp">Responsável</label>
                    <p-select inputId="f-resp" [options]="responsaveis" [(ngModel)]="fResp" placeholder="Digite e selecione" [filter]="true" [showClear]="true" appendTo="body" />
                </div>
                @if (maisFiltros()) {
                    <div class="ds-campo">
                        <label for="f-periodo">Período de criação</label>
                        <p-datepicker inputId="f-periodo" [(ngModel)]="fPeriodo" selectionMode="range" [readonlyInput]="true"
                                      dateFormat="dd/mm/yy" placeholder="DD/MM/AAAA - DD/MM/AAAA" [showIcon]="true" appendTo="body" />
                    </div>
                }
            </div>
            <div class="ds-botoes" style="margin-top: 1rem;">
                <p-button [label]="maisFiltros() ? 'Menos filtros' : 'Mais filtros'" [icon]="maisFiltros() ? 'pi pi-minus' : 'pi pi-plus'"
                          [text]="true" (onClick)="maisFiltros.set(!maisFiltros())" />
                <p-button label="Limpar" [outlined]="true" (onClick)="limpar()" />
                <p-button label="Filtrar" (onClick)="filtrar()" />
            </div>
        </div>

        <!-- Resultados -->
        <div class="ds-card">
            <p-table [value]="resultado()" [paginator]="true" [rows]="5" [rowsPerPageOptions]="[5, 10, 20]"
                     styleClass="p-datatable-sm" [scrollable]="true" [tableStyle]="{ 'min-width': '52rem' }">
                <ng-template #header>
                    <tr>
                        <th pFrozenColumn style="min-width: 12rem;">Nome</th>
                        <th>Tipo</th>
                        <th>Descrição</th>
                        <th class="ds-num">Valor (R$)</th>
                        <th>Situação</th>
                        <th pFrozenColumn alignFrozen="right" style="text-align: right; width: 11rem;">Ações</th>
                    </tr>
                </ng-template>
                <ng-template #body let-l>
                    <tr>
                        <td pFrozenColumn>{{ l.nome }}</td>
                        <td>{{ l.tipo }}</td>
                        <td>
                            <div class="ds-celula-longa">
                                <span>{{ l.descricao }}</span>
                                <p-button icon="pi pi-info-circle" [text]="true" [rounded]="true" size="small"
                                          pTooltip="Ver detalhes" ariaLabel="Ver detalhes" (onClick)="verDetalhe(l)" />
                            </div>
                        </td>
                        <td class="ds-num">{{ moeda(l.valor) }}</td>
                        <td><p-tag [value]="l.status" [severity]="sev(l.status)" /></td>
                        <td pFrozenColumn alignFrozen="right">
                            <div class="ds-acoes-row">
                                <p-button icon="pi pi-pencil" [text]="true" [rounded]="true" pTooltip="Editar" ariaLabel="Editar" (onClick)="editar()" />
                                <p-button icon="pi pi-eye" [text]="true" [rounded]="true" pTooltip="Visualizar" ariaLabel="Visualizar" (onClick)="visualizar()" />
                                <p-button icon="pi pi-trash" [text]="true" [rounded]="true" severity="danger" pTooltip="Excluir" ariaLabel="Excluir" (onClick)="excluir(l)" />
                                <p-button icon="pi pi-bars" [text]="true" [rounded]="true" pTooltip="Mais ações" ariaLabel="Mais ações" (onClick)="menu.toggle($event)" />
                            </div>
                        </td>
                    </tr>
                </ng-template>
                <ng-template #emptymessage>
                    <tr><td colspan="6" style="text-align: center; padding: 2rem;">Nenhum registro encontrado.</td></tr>
                </ng-template>
            </p-table>
            <p-menu #menu [model]="maisAcoes" [popup]="true" appendTo="body" />
        </div>
    </div>

    <!-- Detalhe do texto longo -->
    <p-dialog header="Descrição" [(visible)]="detalheVisivel" [modal]="true" styleClass="ds-dialog-basico">
        <p style="margin: 0; line-height: 1.6;">{{ detalhe()?.descricao }}</p>
        <ng-template #footer>
            <p-button label="Fechar" [outlined]="true" (onClick)="detalheVisivel = false" />
        </ng-template>
    </p-dialog>
  `,
})
export class TplLista {
    private confirm = inject(ConfirmationService);
    private msg = inject(MessageService);
    private router = inject(Router);

    novo() { this.router.navigateByUrl('/ds/templates/formulario'); }
    editar() { this.router.navigate(['/ds/templates/formulario'], { queryParams: { modo: 'edicao' } }); }
    visualizar() { this.router.navigateByUrl('/ds/templates/detalhe'); }

    fNome = '';
    fTipo: string | null = null;
    fStatus: Status | null = null;
    fResp: string | null = null;
    fPeriodo: Date[] | null = null;
    maisFiltros = signal(false);

    tipoOpts = ['Sistema', 'Portal', 'Aplicativo', 'Integração'];
    statusOpts: Status[] = ['Ativo', 'Pendente', 'Inativo'];
    responsaveis = ['Ana Souza', 'Bruno Lima', 'Carla Dias', 'Diego Melo', 'Elis Rocha', 'Fábio Nunes'];

    maisAcoes: MenuItem[] = [
        { label: 'Duplicar', icon: 'pi pi-copy' },
        { label: 'Histórico', icon: 'pi pi-history' },
        { label: 'Imprimir', icon: 'pi pi-print' },
    ];

    private dados = signal<Linha[]>([
        { id: 1, nome: 'Portal do Servidor', tipo: 'Portal', responsavel: 'Ana Souza', descricao: 'Autoatendimento do servidor: contracheque, férias, benefícios e solicitações internas.', valor: 1250000, status: 'Ativo', data: '02/07/2026' },
        { id: 2, nome: 'Gestão Orçamentária', tipo: 'Sistema', responsavel: 'Bruno Lima', descricao: 'Planejamento, execução e acompanhamento do orçamento das unidades.', valor: 384900.5, status: 'Pendente', data: '28/06/2026' },
        { id: 3, nome: 'Vistoria Móvel', tipo: 'Aplicativo', responsavel: 'Carla Dias', descricao: 'Registro de vistorias em campo com fotos e geolocalização.', valor: 97200, status: 'Ativo', data: '15/06/2026' },
        { id: 4, nome: 'Barramento de Pagamentos', tipo: 'Integração', responsavel: 'Diego Melo', descricao: 'Integração com instituições financeiras para pagamentos e conciliação.', valor: 452000, status: 'Inativo', data: '10/06/2026' },
        { id: 5, nome: 'Protocolo Digital', tipo: 'Sistema', responsavel: 'Elis Rocha', descricao: 'Abertura, tramitação e consulta de processos administrativos.', valor: 210500, status: 'Ativo', data: '05/06/2026' },
        { id: 6, nome: 'Ouvidoria Online', tipo: 'Portal', responsavel: 'Fábio Nunes', descricao: 'Canal de manifestações do cidadão com acompanhamento de prazos.', valor: 68000, status: 'Pendente', data: '01/06/2026' },
    ]);

    // Busca simples e rápida: resultados aparecem ao abrir; o botão Filtrar aplica.
    private filtroAplicado = signal({ nome: '', tipo: null as string | null, status: null as Status | null, resp: null as string | null });

    resultado = computed(() => {
        const f = this.filtroAplicado();
        const n = f.nome.trim().toLowerCase();
        return this.dados().filter((l) =>
            (!n || l.nome.toLowerCase().includes(n)) &&
            (!f.tipo || l.tipo === f.tipo) &&
            (!f.status || l.status === f.status) &&
            (!f.resp || l.responsavel === f.resp));
    });

    detalhe = signal<Linha | null>(null);
    detalheVisivel = false;

    filtrar() {
        this.filtroAplicado.set({ nome: this.fNome, tipo: this.fTipo, status: this.fStatus, resp: this.fResp });
    }

    limpar() {
        this.fNome = ''; this.fTipo = null; this.fStatus = null; this.fResp = null; this.fPeriodo = null;
        this.filtrar();
    }

    verDetalhe(l: Linha) { this.detalhe.set(l); this.detalheVisivel = true; }

    excluir(l: Linha) {
        this.confirm.confirm({
            header: 'Excluir projeto',
            message: 'Tem certeza que deseja excluir "' + l.nome + '"? Esta ação não pode ser desfeita.',
            acceptLabel: 'Excluir', rejectLabel: 'Cancelar',
            acceptButtonProps: { severity: 'danger' }, rejectButtonProps: { outlined: true },
            accept: () => {
                this.dados.update((d) => d.filter((x) => x.id !== l.id));
                this.msg.add({ severity: 'success', summary: 'Sucesso', detail: 'Projeto excluído com sucesso.', life: 3000 });
            }
        });
    }

    moeda(v: number) { return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

    /** Tags (GESIS): ativo = primária (sem severity), inativo = secondary, pendente = warn. */
    sev(s: Status): 'secondary' | 'warn' | undefined {
        return s === 'Inativo' ? 'secondary' : s === 'Pendente' ? 'warn' : undefined;
    }
}
