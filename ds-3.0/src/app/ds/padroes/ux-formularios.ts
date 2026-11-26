import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { PanelModule } from 'primeng/panel';
import { UxFigma, UxFonte } from './ux-fonte';

/** PADRÃO DE UX — Formulários (cadastro e visualização). */
@Component({
    selector: 'app-ux-formularios',
    standalone: true,
    imports: [ButtonModule, InputTextModule, SelectModule, PanelModule, UxFigma, UxFonte],
    template: `
    <div class="ds-page">
        <div class="ds-page-header">
            <div>
                <h1 class="ds-page-title">Formulários</h1>
                <app-ux-fonte />
            </div>
        </div>

        <!-- CADASTRO -->
        <div class="ds-card">
            <div class="ux-card-topo">
                <h2 class="ds-card-titulo"><i class="pi pi-file-edit"></i> Cadastro — estrutura</h2>
                <app-ux-figma node="9812-11670" />
            </div>
            <ul class="ux-regras">
                <li>Padrão: formulário em <strong>uma única página</strong>.</li>
                <li>Assuntos distintos (dados pessoais, endereço, dados profissionais) → <strong>seções temáticas</strong> (arquipélagos).</li>
                <li><strong>Não use abas</strong> para separar seções (limitações de desenvolvimento e manutenção).</li>
                <li>Cadastros extensos → <strong>accordions</strong> ou <strong>panels</strong> para organizar o conteúdo progressivamente.</li>
            </ul>

            <div class="ux-exemplo" style="margin-top:1rem">
                <span class="ux-exemplo-rotulo">Exemplo — cadastro com seções</span>
                <p-panel header="Dados pessoais" [toggleable]="true">
                    <div class="ux-grid-6">
                        <div class="ux-campo"><label for="c-nome">Nome completo <span class="ds-required">*</span></label><input id="c-nome" pInputText placeholder="Digite" /></div>
                        <div class="ux-campo"><label for="c-cpf">CPF <span class="ds-required">*</span></label><input id="c-cpf" pInputText placeholder="000.000.000-00" /></div>
                        <div class="ux-campo"><label for="c-email">E-mail</label><input id="c-email" pInputText placeholder="email&#64;goias.gov.br" /></div>
                    </div>
                </p-panel>
                <p-panel header="Lotação" [toggleable]="true">
                    <div class="ux-grid-6">
                        <div class="ux-campo"><label for="c-orgao">Órgão <span class="ds-required">*</span></label><p-select inputId="c-orgao" [options]="['Secretaria da Economia', 'Secretaria da Saúde']" placeholder="Selecione" appendTo="body" /></div>
                        <div class="ux-campo"><label for="c-cargo">Cargo</label><input id="c-cargo" pInputText placeholder="Digite" /></div>
                    </div>
                </p-panel>
                <div class="ux-linha ux-linha--direita" style="gap:16px">
                    <p-button label="Cancelar" [outlined]="true" />
                    <p-button label="Salvar" />
                </div>
            </div>
        </div>

        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-check-square"></i> Cadastro — dialogs, validação e botões</h2>

            <h3 class="ux-sub">Uso de dialogs</h3>
            <ul class="ux-regras">
                <li>Dialog só para cadastros <strong>pequenos</strong> (ex.: um único campo), alinhado com o analista — o controle de permissão é por <strong>página</strong>, não por dialog.</li>
                <li><strong>Confirmar ao salvar:</strong> opcional, só em ação de alto impacto (disparo de e-mails, alteração de outros processos).</li>
                <li><strong>Confirmar ao cancelar:</strong> obrigatório, avisando que os dados preenchidos serão perdidos.</li>
            </ul>

            <h3 class="ux-sub">Obrigatoriedade e validação</h3>
            <div class="ux-tabela-wrap">
                <table class="ux-tabela">
                    <thead><tr><th>Cenário</th><th>Estratégia</th></tr></thead>
                    <tbody>
                        <tr><td>Muitos campos e usuários menos experientes</td><td>Ao tentar salvar: <strong>toast de erro</strong> + destacar os campos pendentes ou inválidos.</td></tr>
                        <tr><td>Poucos campos e usuários mais experientes</td><td><strong>Desabilitar Salvar/Prosseguir</strong> até todos os obrigatórios estarem preenchidos corretamente.</td></tr>
                    </tbody>
                </table>
            </div>

            <h3 class="ux-sub">Botões e layout</h3>
            <ul class="ux-regras">
                <li>Botões <strong>à direita</strong>, <strong>16px</strong> entre eles, respeitando a hierarquia.</li>
                <li>Nomes padrão <strong>Cancelar</strong> (secundário) e <strong>Salvar</strong> (primário), <strong>sem ícones</strong>.</li>
                <li>Em 1920px: grid de <strong>6 colunas</strong>, 16px de espaço. Em telas menores os inputs não encolhem — vão para a linha de baixo.</li>
            </ul>
        </div>

        <!-- VISUALIZAÇÃO -->
        <div class="ds-card">
            <div class="ux-card-topo">
                <h2 class="ds-card-titulo"><i class="pi pi-eye"></i> Visualização</h2>
                <app-ux-figma node="9867-118361" />
            </div>
            <ul class="ux-regras">
                <li><strong>Poucas informações:</strong> mostre direto na tabela de consulta ou num dialog (lembrando que dialog não tem controle de permissão).</li>
                <li><strong>Muitos campos ou informação complexa:</strong> crie uma <strong>tela dedicada</strong> de visualização.</li>
                <li><strong>Não use campos desabilitados</strong> para exibir dados — parecem interativos e impedem copiar. Use <strong>rótulo + texto</strong>.</li>
                <li>Mantenha as <strong>mesmas colunas, seções e agrupamentos</strong> do cadastro.</li>
                <li>Informação secundária pode ficar em <strong>accordion</strong> ou <strong>panel</strong>.</li>
                <li>Botão <strong>Voltar</strong>: secundário, alinhado à direita.</li>
                <li>Em 1920px: rótulo + texto em grid de <strong>6 colunas</strong>; em telas menores pode reduzir o texto e quebrar linha, mantendo a proporção.</li>
            </ul>

            <div class="ux-exemplo" style="margin-top:1rem">
                <span class="ux-exemplo-rotulo">Exemplo — rótulo + texto</span>
                <div class="ux-grid-6">
                    @for (c of campos; track c.rotulo) {
                        <div class="ux-visualizar"><span class="ux-visualizar-rotulo">{{ c.rotulo }}</span><span class="ux-visualizar-valor">{{ c.valor }}</span></div>
                    }
                </div>
                <div class="ux-linha ux-linha--direita"><p-button label="Voltar" [outlined]="true" /></div>
            </div>

            <div class="ux-faca-evite">
                <div class="ux-faca">
                    <span class="ux-faca-titulo"><i class="pi pi-check-circle"></i> Faça</span>
                    <div class="ux-visualizar"><span class="ux-visualizar-rotulo">CPF</span><span class="ux-visualizar-valor">123.456.789-00</span></div>
                    <p>Rótulo + texto: legível e fácil de copiar.</p>
                </div>
                <div class="ux-evite">
                    <span class="ux-evite-titulo"><i class="pi pi-times-circle"></i> Evite</span>
                    <div class="ux-campo"><label for="ev-cpf">CPF</label><input id="ev-cpf" pInputText value="123.456.789-00" [disabled]="true" /></div>
                    <p>Campo desabilitado: parece editável e não deixa copiar.</p>
                </div>
            </div>
        </div>
    </div>
    `
})
export class UxFormularios {
    campos = [
        { rotulo: 'Nome completo', valor: 'Ana Souza Ribeiro' },
        { rotulo: 'CPF', valor: '123.456.789-00' },
        { rotulo: 'E-mail', valor: 'ana.ribeiro@goias.gov.br' },
        { rotulo: 'Órgão', valor: 'Secretaria da Economia' },
        { rotulo: 'Cargo', valor: 'Analista de Gestão' },
        { rotulo: 'Situação', valor: 'Ativo' },
    ];
}
