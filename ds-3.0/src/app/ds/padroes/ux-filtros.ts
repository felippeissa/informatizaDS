import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { UxFigma, UxFonte } from './ux-fonte';

/** PADRÃO DE UX — Filtros. */
@Component({
    selector: 'app-ux-filtros',
    standalone: true,
    imports: [FormsModule, ButtonModule, InputTextModule, SelectModule, DatePickerModule, TableModule, MessageModule, UxFigma, UxFonte],
    template: `
    <div class="ds-page">
        <div class="ds-page-header">
            <div>
                <h1 class="ds-page-title">Filtros</h1>
                <app-ux-fonte />
            </div>
        </div>

        <!-- Exemplo correto -->
        <div class="ds-card">
            <div class="ux-card-topo">
                <h2 class="ds-card-titulo"><i class="pi pi-filter"></i> Exemplo no padrão</h2>
                <app-ux-figma node="9547-10648" />
            </div>
            <p class="ux-texto">Uma linha de filtros visível; o restante em <strong>"Mais filtros"</strong>. Botões <strong>abaixo</strong> dos campos, alinhados à direita.</p>
            <div class="ux-exemplo">
                <div class="ux-grid-6">
                    <div class="ux-campo"><label for="f-nome">Nome</label><input id="f-nome" pInputText placeholder="Digite" /></div>
                    <div class="ux-campo"><label for="f-cpf">CPF</label><input id="f-cpf" pInputText placeholder="000.000.000-00" /></div>
                    <div class="ux-campo"><label for="f-orgao">Órgão</label><p-select inputId="f-orgao" [options]="orgaos" placeholder="Selecione" appendTo="body" /></div>
                    <div class="ux-campo"><label for="f-sit">Situação</label><p-select inputId="f-sit" [options]="['Ativo', 'Inativo']" placeholder="Selecione" appendTo="body" /></div>
                    @if (maisFiltros()) {
                        <div class="ux-campo"><label for="f-cargo">Cargo</label><input id="f-cargo" pInputText placeholder="Digite" /></div>
                        <div class="ux-campo"><label for="f-per">Período de admissão</label><p-datepicker inputId="f-per" selectionMode="range" dateFormat="dd/mm/yy" placeholder="DD/MM/AAAA - DD/MM/AAAA" [showIcon]="true" appendTo="body" /></div>
                        <div class="ux-campo"><label for="f-mun">Município</label><p-select inputId="f-mun" [options]="['Goiânia', 'Anápolis', 'Rio Verde']" placeholder="Digite e selecione" [filter]="true" appendTo="body" /></div>
                    }
                </div>
                <div class="ux-botoes-filtro">
                    <p-button [label]="maisFiltros() ? 'Menos filtros' : 'Mais filtros'" [icon]="maisFiltros() ? 'pi pi-minus' : 'pi pi-plus'" [text]="true" (onClick)="maisFiltros.set(!maisFiltros())" />
                    <p-button label="Limpar" [outlined]="true" />
                    <p-button label="Filtrar" />
                </div>
            </div>
        </div>

        <!-- Exemplo: busca pesada com filtro obrigatório -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-lock"></i> Exemplo — busca pesada com filtro obrigatório</h2>
            <p class="ux-texto">A tabela <strong>só aparece depois de filtrar</strong>. O botão <strong>Filtrar</strong> fica desabilitado até todos os obrigatórios (*) serem preenchidos, e eles <strong>nunca</strong> ficam escondidos em "Mais filtros".</p>
            <div class="ux-exemplo">
                <div class="ds-grid ds-grid--form">
                    <div class="ds-campo">
                        <label for="o-orgao">Órgão <span class="ds-required">*</span></label>
                        <p-select inputId="o-orgao" [options]="orgaos" [ngModel]="oOrgao()" (ngModelChange)="oOrgao.set($event)" placeholder="Selecione" [showClear]="true" appendTo="body" />
                    </div>
                    <div class="ds-campo">
                        <label for="o-periodo">Período de empenho <span class="ds-required">*</span></label>
                        <p-datepicker inputId="o-periodo" [ngModel]="oPeriodo()" (ngModelChange)="oPeriodo.set($event)" selectionMode="range" [readonlyInput]="true"
                                      dateFormat="dd/mm/yy" placeholder="DD/MM/AAAA - DD/MM/AAAA" [showIcon]="true" [showButtonBar]="true" appendTo="body" />
                    </div>
                    <div class="ds-campo">
                        <label for="o-credor">Credor</label>
                        <input id="o-credor" pInputText placeholder="Digite" />
                    </div>
                </div>
                <div class="ds-botoes">
                    <p-button label="Limpar" [outlined]="true" (onClick)="limparObrigatorio()" />
                    <p-button label="Filtrar" [disabled]="!podeFiltrar()" (onClick)="filtrado.set(true)" />
                </div>
            </div>

            @if (!filtrado()) {
                <p-message severity="info" icon="pi pi-info-circle" styleClass="mt-4">
                    Preencha os filtros obrigatórios (*) e clique em Filtrar para ver os resultados.
                </p-message>
            } @else {
                <p-table [value]="empenhos" styleClass="p-datatable-sm mt-4">
                    <ng-template #header><tr><th>Empenho</th><th>Credor</th><th class="ds-num">Valor (R$)</th></tr></ng-template>
                    <ng-template #body let-e><tr><td>{{ e.numero }}</td><td>{{ e.credor }}</td><td class="ds-num">{{ e.valor }}</td></tr></ng-template>
                </p-table>
            }
        </div>

        <!-- Regras -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-list-check"></i> Regras</h2>
            <h3 class="ux-sub">Quantidade de filtros</h3>
            <ul class="ux-regras">
                <li>Passou de uma linha → use <strong>filtros avançados recolhidos</strong> com o botão "Mais filtros".</li>
            </ul>
            <h3 class="ux-sub">Apresentação dos resultados</h3>
            <ul class="ux-regras">
                <li><strong>Buscas simples e rápidas:</strong> mostre a tabela de resultados <strong>assim que a tela abrir</strong>, sem exigir filtro.</li>
                <li><strong>Buscas complexas e pesadas:</strong> exija <strong>filtro obrigatório</strong> antes de exibir a tabela.</li>
            </ul>
            <h3 class="ux-sub">Obrigatoriedade</h3>
            <ul class="ux-regras">
                <li>Com filtros obrigatórios, o botão <strong>Filtrar só é habilitado</strong> depois que todos forem preenchidos.</li>
                <li><strong>Campos obrigatórios nunca ficam ocultos.</strong> Se passarem de uma linha, mantenha a área aberta, sem "Mais filtros".</li>
            </ul>
            <h3 class="ux-sub">Botões</h3>
            <ul class="ux-regras">
                <li>Nomes padrão: <strong>Mais filtros / Menos filtros</strong>, <strong>Limpar</strong>, <strong>Filtrar</strong>.</li>
                <li>Ícone <strong>só no terciário</strong> (Mais/Menos filtros).</li>
                <li>Botões <strong>nunca na mesma linha</strong> dos filtros — sempre abaixo, à direita.</li>
            </ul>
            <h3 class="ux-sub">Responsividade</h3>
            <ul class="ux-regras">
                <li>Em telas de <strong>1920px</strong>: grid de <strong>6 colunas</strong> com <strong>16px</strong> de espaço.</li>
                <li>Ao reduzir a tela, os inputs <strong>não encolhem</strong> — vão para a linha seguinte.</li>
            </ul>
            <div class="ux-faca-evite">
                <div class="ux-faca">
                    <span class="ux-faca-titulo"><i class="pi pi-check-circle"></i> Faça</span>
                    <p>Botões em linha própria, abaixo dos campos: Mais filtros (terciário) · Limpar (secundário) · Filtrar (primário).</p>
                </div>
                <div class="ux-evite">
                    <span class="ux-evite-titulo"><i class="pi pi-times-circle"></i> Evite</span>
                    <p>Botão Filtrar ao lado do último campo, ícones em Limpar/Filtrar ou esconder filtro obrigatório em "Mais filtros".</p>
                </div>
            </div>
        </div>
    </div>
    `
})
export class UxFiltros {
    maisFiltros = signal(false);

    // Busca pesada: obrigatórios + tabela só após filtrar
    oOrgao = signal<string | null>(null);
    oPeriodo = signal<Date[] | null>(null);
    filtrado = signal(false);
    podeFiltrar = computed(() => !!this.oOrgao() && !!this.oPeriodo()?.[0] && !!this.oPeriodo()?.[1]);
    empenhos = [
        { numero: '2026NE000123', credor: 'Alfa Serviços Ltda.', valor: '125.400,00' },
        { numero: '2026NE000124', credor: 'Beta Tecnologia S.A.', valor: '48.900,50' },
        { numero: '2026NE000131', credor: 'Gama Transportes', valor: '9.720,00' },
    ];

    limparObrigatorio() { this.oOrgao.set(null); this.oPeriodo.set(null); this.filtrado.set(false); }
    orgaos = ['Secretaria da Economia', 'Secretaria da Educação', 'Secretaria da Saúde'];
}
