import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DatePickerModule } from 'primeng/datepicker';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { UxFigma, UxFonte } from './ux-fonte';

const ORGAOS = ['Secretaria da Economia', 'Secretaria da Educação', 'Secretaria da Saúde', 'Secretaria de Administração', 'Controladoria-Geral do Estado', 'Procuradoria-Geral do Estado'];

/** PADRÃO DE UX — Inputs (placeholders, máscaras, períodos, autocomplete). */
@Component({
    selector: 'app-ux-inputs',
    standalone: true,
    imports: [FormsModule, InputTextModule, InputMaskModule, InputNumberModule, SelectModule, MultiSelectModule, AutoCompleteModule,
              DatePickerModule, IconFieldModule, InputIconModule, UxFigma, UxFonte],
    template: `
    <div class="ds-page">
        <div class="ds-page-header">
            <div>
                <h1 class="ds-page-title">Inputs</h1>
                <app-ux-fonte />
            </div>
        </div>

        <!-- Placeholders -->
        <div class="ds-card">
            <div class="ux-card-topo">
                <h2 class="ds-card-titulo"><i class="pi pi-pencil"></i> Padronização de placeholders</h2>
                <app-ux-figma node="6738-22646" />
            </div>
            <p class="ux-texto">O placeholder dá um <strong>exemplo do formato esperado</strong> — nunca repete o rótulo. Some quando o usuário começa a digitar e <strong>reaparece</strong> se o texto for apagado.
                Sem especificação nos requisitos, use o padrão abaixo.</p>
            <div class="ux-tabela-wrap">
                <table class="ux-tabela">
                    <thead><tr><th>Componente</th><th>Placeholder padrão</th><th>Exemplo</th></tr></thead>
                    <tbody>
                        <tr><td>InputText</td><td><code>Digite</code></td><td><input pInputText placeholder="Digite" aria-label="Exemplo InputText" /></td></tr>
                        <tr><td>Select</td><td><code>Selecione</code> · <code>Digite e selecione</code> (com busca)</td><td><p-select [options]="orgaos" placeholder="Selecione" appendTo="body" aria-label="Exemplo Select" /></td></tr>
                        <tr><td>MultiSelect</td><td><code>Selecione</code> · <code>Digite e selecione</code> (com busca)</td><td><p-multiselect [options]="orgaos" placeholder="Digite e selecione" [filter]="true" appendTo="body" aria-label="Exemplo MultiSelect" /></td></tr>
                        <tr><td>AutoComplete</td><td><code>Digite e selecione</code></td><td><p-autocomplete [(ngModel)]="orgao" [suggestions]="sugestoes" (completeMethod)="buscar($event.query)" [dropdown]="true" placeholder="Digite e selecione" appendTo="body" aria-label="Exemplo AutoComplete" /></td></tr>
                        <tr><td>DatePicker</td><td><code>DD/MM/AAAA</code></td><td><p-datepicker [(ngModel)]="data" dateFormat="dd/mm/yy" placeholder="DD/MM/AAAA" [showIcon]="true" appendTo="body" ariaLabel="Exemplo DatePicker" /></td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Máscaras -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-hashtag"></i> Máscaras</h2>
            <p class="ux-texto">Use <strong>0</strong> para representar números e <strong>letras</strong> para siglas e palavras (também em códigos orçamentários, contratos etc.).</p>
            <div class="ux-grid-6">
                <div class="ux-campo"><label for="m-cpf">CPF</label><p-inputmask inputId="m-cpf" mask="999.999.999-99" placeholder="000.000.000-00" [(ngModel)]="cpf" /></div>
                <div class="ux-campo"><label for="m-valor">Valor (R$)</label><p-inputnumber inputId="m-valor" mode="currency" currency="BRL" locale="pt-BR" placeholder="R$ 0,00" inputStyleClass="ux-num-direita" [(ngModel)]="valor" /></div>
                <div class="ux-campo"><label for="m-data">Data</label><p-inputmask inputId="m-data" mask="99/99/9999" placeholder="DD/MM/AAAA" [(ngModel)]="dataTxt" /></div>
                <div class="ux-campo"><label for="m-email">E-mail</label><input id="m-email" pInputText type="email" placeholder="email&#64;goias.gov.br" /></div>
                <div class="ux-campo"><label for="m-cep">CEP</label><p-inputmask inputId="m-cep" mask="99999-999" placeholder="00000-000" [(ngModel)]="cep" /></div>
                <div class="ux-campo"><label for="m-hora">Hora</label><p-inputmask inputId="m-hora" mask="99:99" placeholder="00:00" [(ngModel)]="hora" /></div>
                <div class="ux-campo"><label for="m-tel">Telefone</label><p-inputmask inputId="m-tel" mask="(99) 99999-9999" placeholder="(00) 00000-0000" [(ngModel)]="tel" /></div>
                <div class="ux-campo"><label for="m-url">URL</label><input id="m-url" pInputText type="url" placeholder="https://www.site.com.br" /></div>
            </div>
            <ul class="ux-regras" style="margin-top:1rem">
                <li><strong>Valor monetário sempre alinhado à direita</strong> — no campo e na tabela.</li>
                <li>Telefone: máscara livre conforme o negócio (DDI, DDD, internacional), sempre usando <code>0</code> no placeholder.</li>
            </ul>
        </div>

        <!-- Períodos -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-calendar"></i> Períodos (data início e fim)</h2>
            <p class="ux-texto">Para período, use <strong>um único DatePicker no modo range</strong> — não dois campos separados.</p>
            <div class="ux-exemplo">
                <span class="ux-exemplo-rotulo">Exemplo</span>
                <div class="ux-campo" style="max-width:320px">
                    <label for="periodo">Período</label>
                    <p-datepicker inputId="periodo" [(ngModel)]="periodo" selectionMode="range" [readonlyInput]="true" dateFormat="dd/mm/yy"
                                  placeholder="DD/MM/AAAA - DD/MM/AAAA" [showIcon]="true" appendTo="body" />
                </div>
            </div>
        </div>

        <!-- Autocomplete x busca x seleção -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-search"></i> Autocomplete, busca e seleção</h2>
            <p class="ux-texto">Deixe claro no requisito se o campo é texto livre ou consulta. Quando houver autocomplete, mostre um ícone (<strong>seta</strong> para dropdown, <strong>lupa</strong> para busca) para não parecer texto simples.</p>
            <div class="ux-tabela-wrap">
                <table class="ux-tabela">
                    <thead><tr><th>Tipo</th><th>Quando usar</th><th>Exemplo</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Dropdown (autocomplete)</strong></td><td>Mostrar resultados antes de digitar; a busca acontece no próprio campo.</td>
                            <td><p-autocomplete [(ngModel)]="orgao2" [suggestions]="sugestoes" (completeMethod)="buscar($event.query)" [dropdown]="true" placeholder="Digite e selecione" appendTo="body" aria-label="Exemplo dropdown" /></td></tr>
                        <tr><td><strong>Campo de busca</strong></td><td>Pode esperar o usuário digitar para listar resultados.</td>
                            <td><p-iconfield><p-inputicon class="pi pi-search" /><input pInputText placeholder="Digite" aria-label="Exemplo busca" /></p-iconfield></td></tr>
                        <tr><td><strong>MultiSelect</strong></td><td>Selecionar mais de uma opção (com ou sem busca, conforme o volume).</td>
                            <td><p-multiselect [options]="orgaos" placeholder="Selecione" appendTo="body" aria-label="Exemplo MultiSelect 2" /></td></tr>
                        <tr><td><strong>Select</strong></td><td>Poucas opções e sem necessidade de busca.</td>
                            <td><p-select [options]="['Ativo', 'Inativo']" placeholder="Selecione" appendTo="body" aria-label="Exemplo Select 2" /></td></tr>
                    </tbody>
                </table>
            </div>
            <h3 class="ux-sub">Quantidade mínima de caracteres</h3>
            <p class="ux-texto" style="margin:0">Não há regra única: designer e analista de requisitos definem juntos, considerando desempenho (volume de dados, API), registros curtos (ex.: "Ana") e o tratamento de maiúsculas, acentos e caracteres especiais.</p>
        </div>
    </div>
    `
})
export class UxInputs {
    orgaos = ORGAOS;
    sugestoes: string[] = [];
    orgao = ''; orgao2 = '';
    data: Date | null = null;
    periodo: Date[] | null = null;
    cpf = ''; valor: number | null = null; dataTxt = ''; cep = ''; hora = ''; tel = '';

    buscar(q: string) {
        const t = (q || '').toLowerCase();
        this.sugestoes = ORGAOS.filter((o) => o.toLowerCase().includes(t));
    }
}
