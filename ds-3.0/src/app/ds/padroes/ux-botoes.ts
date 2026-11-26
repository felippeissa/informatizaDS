import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { UxFigma, UxFonte } from './ux-fonte';

/** PADRÃO DE UX — Botões (hierarquia, ícones, dimensões, posicionamento). */
@Component({
    selector: 'app-ux-botoes',
    standalone: true,
    imports: [ButtonModule, UxFigma, UxFonte],
    template: `
    <div class="ds-page">
        <div class="ds-page-header">
            <div>
                <h1 class="ds-page-title">Botões</h1>
                <app-ux-fonte />
            </div>
        </div>

        <!-- Hierarquia -->
        <div class="ds-card">
            <div class="ux-card-topo">
                <h2 class="ds-card-titulo"><i class="pi pi-sort-amount-down"></i> Hierarquia: cores e estilos</h2>
                <app-ux-figma node="8594-22240" />
            </div>
            <p class="ux-texto">Use botão sempre que for preciso disparar uma ação direta (confirmar, enviar, salvar, cancelar). São três níveis:</p>
            <div class="ux-exemplo">
                <span class="ux-exemplo-rotulo">Exemplo</span>
                <div class="ux-linha">
                    <p-button label="Primário" />
                    <p-button label="Secundário" [outlined]="true" />
                    <p-button label="Terciário" icon="pi pi-plus" [text]="true" />
                    <p-button label="Desabilitado" [disabled]="true" />
                </div>
            </div>
            <div class="ux-tabela-wrap" style="margin-top:1rem">
                <table class="ux-tabela">
                    <thead><tr><th>Nível</th><th>Aparência</th><th>PrimeNG</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Primário</strong></td><td>Preenchido com a cor principal, texto branco</td><td><code>&lt;p-button label="Salvar" /&gt;</code></td></tr>
                        <tr><td><strong>Secundário</strong></td><td>Só borda na cor principal, texto na mesma cor</td><td><code>[outlined]="true"</code></td></tr>
                        <tr><td><strong>Terciário</strong></td><td>Só texto, com ícone à esquerda, na cor principal</td><td><code>[text]="true" icon="pi pi-..."</code></td></tr>
                        <tr><td><strong>Desabilitado</strong></td><td>Qualquer um dos três em cinza</td><td><code>[disabled]="true"</code></td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Ícones -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-star"></i> Ícones nos botões</h2>
            <ul class="ux-regras">
                <li><strong>Primário e secundário:</strong> por padrão <strong>sem ícone</strong>. Só com justificativa clara de usabilidade, avaliada pelo designer.</li>
                <li><strong>Terciário:</strong> por padrão <strong>sempre com ícone à esquerda</strong> do texto.</li>
                <li>Ícone <strong>antes do texto</strong> é o padrão. Depois do texto só para indicar direção ou continuidade (ex.: "Próximo").</li>
                <li><strong>Nunca</strong> use ícone dos dois lados no mesmo botão.</li>
                <li>Ícone que não existir no DS deve ser criado e publicado na <strong>Biblioteca de Ícones 3.0</strong> antes de ser usado.</li>
            </ul>
            <div class="ux-faca-evite">
                <div class="ux-faca">
                    <span class="ux-faca-titulo"><i class="pi pi-check-circle"></i> Faça</span>
                    <div class="ux-linha"><p-button label="Mais filtros" icon="pi pi-filter" [text]="true" /><p-button label="Cancelar" [outlined]="true" /><p-button label="Salvar" /></div>
                    <p>Ícone só no terciário; primário e secundário apenas com texto.</p>
                </div>
                <div class="ux-evite">
                    <span class="ux-evite-titulo"><i class="pi pi-times-circle"></i> Evite</span>
                    <div class="ux-linha"><p-button label="Cancelar" icon="pi pi-times" [outlined]="true" /><p-button label="Salvar" icon="pi pi-check" iconPos="right" /></div>
                    <p>Ícones em primário/secundário sem necessidade e ícone à direita sem indicar direção.</p>
                </div>
            </div>
        </div>

        <!-- Dimensões -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-arrows-h"></i> Dimensões</h2>
            <p class="ux-texto">Mantemos as dimensões originais do PrimeNG — não altere altura nem padding dos botões.</p>
            <div class="ux-specs">
                <div class="ux-spec"><strong>inline-flex</strong><small>Layout do botão (texto e ícone alinhados)</small></div>
                <div class="ux-spec"><strong>7px</strong><small>Espaço entre ícone e texto (--button-gap)</small></div>
                <div class="ux-spec"><strong>6px</strong><small>Raio de borda (--button-border-radius)</small></div>
                <div class="ux-spec"><strong>1px</strong><small>Borda, para não se misturar ao fundo</small></div>
            </div>
        </div>

        <!-- Posicionamento -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-align-right"></i> Posicionamento no layout</h2>
            <ul class="ux-regras">
                <li>Todos os botões ficam <strong>à direita</strong> da interface.</li>
                <li>Quanto mais importante, mais à direita: <strong>Terciário → Secundário → Primário</strong>.</li>
                <li>Espaço de <strong>16px</strong> entre botões.</li>
                <li>Exceção: secundário ou terciário à esquerda só com justificativa (ex.: "Voltar" em formulário com navegação por etapas).</li>
            </ul>
            <div class="ux-exemplo" style="margin-top:1rem">
                <span class="ux-exemplo-rotulo">Exemplo — rodapé de formulário</span>
                <div class="ux-linha ux-linha--direita" style="gap:16px">
                    <p-button label="Limpar" icon="pi pi-eraser" [text]="true" />
                    <p-button label="Cancelar" [outlined]="true" />
                    <p-button label="Salvar" />
                </div>
            </div>
        </div>
    </div>
    `
})
export class UxBotoes {}
