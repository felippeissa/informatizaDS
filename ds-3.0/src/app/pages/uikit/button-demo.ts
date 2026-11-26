import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-button-demo',
    standalone: true,
    imports: [CommonModule, ButtonModule, ButtonGroupModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Button</h1>
            <p class="comp-desc">Elemento de ação básico com suporte a ícones, severidades, variantes e estados de carregamento.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">ButtonModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/button'</span><span class="tok-pt">;</span>
            </div>
        </div>

        <p-tabs value="features" styleClass="mt-1">
            <p-tablist>
                <p-tab value="features">Features</p-tab>
                <p-tab value="api">API</p-tab>
                <p-tab value="theming">Theming</p-tab>
            </p-tablist>
            <p-tabpanels>
                <p-tabpanel value="features"><div style="padding:20px 0">

                    <!-- Basic -->
                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Básico</div>
                            <p class="demo-card-desc">Botão padrão com label e ícone opcional.</p>
                        </div>
                        <div class="demo-card-body" style="gap:10px;flex-wrap:wrap">
                            <p-button label="Salvar" />
                            <p-button label="Salvar" icon="pi pi-check" />
                            <p-button icon="pi pi-check" />
                            <p-button label="Salvar" icon="pi pi-check" iconPos="right" />
                        </div>
                        <div class="demo-card-code"><pre>{{ codeBasic }}</pre></div>
                    </div>

                    <!-- Severities -->
                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Severidades</div>
                            <p class="demo-card-desc">Variantes de cor para comunicar diferentes níveis de ação.</p>
                        </div>
                        <div class="demo-card-body" style="gap:10px;flex-wrap:wrap">
                            <p-button label="Primary" />
                            <p-button label="Secondary" severity="secondary" />
                            <p-button label="Success"   severity="success" />
                            <p-button label="Info"      severity="info" />
                            <p-button label="Warning"   severity="warn" />
                            <p-button label="Help"      severity="help" />
                            <p-button label="Danger"    severity="danger" />
                            <p-button label="Contrast"  severity="contrast" />
                        </div>
                        <div class="demo-card-code"><pre>{{ codeSeverities }}</pre></div>
                    </div>

                    <!-- Outlined -->
                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Outlined</div>
                            <p class="demo-card-desc">Variante com borda e sem preenchimento.</p>
                        </div>
                        <div class="demo-card-body" style="gap:10px;flex-wrap:wrap">
                            <p-button label="Primary"   outlined />
                            <p-button label="Secondary" severity="secondary" outlined />
                            <p-button label="Success"   severity="success"   outlined />
                            <p-button label="Danger"    severity="danger"    outlined />
                        </div>
                        <div class="demo-card-code"><pre>{{ codeOutlined }}</pre></div>
                    </div>

                    <!-- Text -->
                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Text</div>
                            <p class="demo-card-desc">Variante sem borda nem fundo — aparência de link.</p>
                        </div>
                        <div class="demo-card-body" style="gap:10px;flex-wrap:wrap">
                            <p-button label="Primary"   text />
                            <p-button label="Secondary" severity="secondary" text />
                            <p-button label="Success"   severity="success"   text />
                            <p-button label="Danger"    severity="danger"    text />
                        </div>
                        <div class="demo-card-code"><pre>{{ codeText }}</pre></div>
                    </div>

                    <!-- Raised -->
                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Raised</div>
                            <p class="demo-card-desc">Botão com sombra elevada.</p>
                        </div>
                        <div class="demo-card-body" style="gap:10px;flex-wrap:wrap">
                            <p-button label="Primary"   raised />
                            <p-button label="Secondary" severity="secondary" raised />
                            <p-button label="Success"   severity="success"   raised />
                            <p-button label="Danger"    severity="danger"    raised />
                        </div>
                        <div class="demo-card-code"><pre>{{ codeRaised }}</pre></div>
                    </div>

                    <!-- Rounded -->
                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Rounded</div>
                            <p class="demo-card-desc">Botão com bordas totalmente arredondadas.</p>
                        </div>
                        <div class="demo-card-body" style="gap:10px;flex-wrap:wrap">
                            <p-button label="Primary"   rounded />
                            <p-button label="Secondary" severity="secondary" rounded />
                            <p-button label="Success"   severity="success"   rounded />
                            <p-button label="Danger"    severity="danger"    rounded />
                            <p-button icon="pi pi-check"  rounded />
                            <p-button icon="pi pi-times"  severity="danger" rounded outlined />
                        </div>
                        <div class="demo-card-code"><pre>{{ codeRounded }}</pre></div>
                    </div>

                    <!-- Sizes -->
                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Tamanhos</div>
                            <p class="demo-card-desc">Três tamanhos disponíveis: small, padrão e large.</p>
                        </div>
                        <div class="demo-card-body" style="gap:10px;flex-wrap:wrap;align-items:center">
                            <p-button label="Small"   size="small" />
                            <p-button label="Default" />
                            <p-button label="Large"   size="large" />
                        </div>
                        <div class="demo-card-code"><pre>{{ codeSizes }}</pre></div>
                    </div>

                    <!-- Loading -->
                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Loading</div>
                            <p class="demo-card-desc">Estado de carregamento com spinner automático.</p>
                        </div>
                        <div class="demo-card-body" style="gap:10px;flex-wrap:wrap">
                            <p-button label="Salvando..." [loading]="true" />
                            <p-button label="Enviando..."  [loading]="true" severity="success" />
                            <p-button icon="pi pi-check"   [loading]="true" />
                        </div>
                        <div class="demo-card-code"><pre>{{ codeLoading }}</pre></div>
                    </div>

                    <!-- ButtonGroup -->
                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">ButtonGroup</div>
                            <p class="demo-card-desc">Agrupa botões relacionados em uma única barra visual.</p>
                        </div>
                        <div class="demo-card-body col" style="gap:16px">
                            <p-buttongroup>
                                <p-button label="Salvar"    icon="pi pi-save" />
                                <p-button label="Editar"    icon="pi pi-pencil" severity="secondary" />
                                <p-button label="Excluir"   icon="pi pi-trash"  severity="danger" />
                            </p-buttongroup>
                            <p-buttongroup>
                                <p-button icon="pi pi-align-left"   severity="secondary" outlined />
                                <p-button icon="pi pi-align-center" severity="secondary" outlined />
                                <p-button icon="pi pi-align-right"  severity="secondary" outlined />
                                <p-button icon="pi pi-align-justify" severity="secondary" outlined />
                            </p-buttongroup>
                        </div>
                        <div class="demo-card-code"><pre>{{ codeGroup }}</pre></div>
                    </div>

                    <!-- Link -->
                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Link</div>
                            <p class="demo-card-desc">Botão que age como âncora de navegação.</p>
                        </div>
                        <div class="demo-card-body" style="gap:10px;flex-wrap:wrap">
                            <p-button label="Acessar site" link />
                            <p-button label="Ver mais" icon="pi pi-external-link" link />
                        </div>
                        <div class="demo-card-code"><pre>{{ codeLink }}</pre></div>
                    </div>

                    <!-- Disabled -->
                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Desabilitado</div>
                            <p class="demo-card-desc">Estado desabilitado impede interação.</p>
                        </div>
                        <div class="demo-card-body" style="gap:10px;flex-wrap:wrap">
                            <p-button label="Salvar"   [disabled]="true" />
                            <p-button label="Excluir"  [disabled]="true" severity="danger" />
                            <p-button icon="pi pi-check" [disabled]="true" rounded />
                        </div>
                        <div class="demo-card-code"><pre>{{ codeDisabled }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Propriedades</div>
                    <p-table [value]="props" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:160px">Nome</th><th style="width:130px">Tipo</th><th style="width:120px">Padrão</th><th>Descrição</th></tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-r>
                            <tr>
                                <td><strong style="font-family:monospace;font-size:13px">{{ r.name }}</strong></td>
                                <td><span class="badge-type">{{ r.type }}</span></td>
                                <td><span class="badge-default">{{ r.default }}</span></td>
                                <td style="font-size:13px;color:var(--text-color-secondary)">{{ r.description }}</td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div></p-tabpanel>

                <p-tabpanel value="theming"><div style="padding:16px 0">
                    <p-table [value]="themeVars" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:360px">Variável CSS</th><th>Descrição</th></tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-v>
                            <tr>
                                <td><span class="theme-var">{{ v.variable }}</span></td>
                                <td style="font-size:13px;color:var(--text-color-secondary)">{{ v.description }}</td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div></p-tabpanel>
            </p-tabpanels>
        </p-tabs>
    `
})
export class ButtonDemo {

    codeBasic = `<p-button label="Salvar" />
<p-button label="Salvar" icon="pi pi-check" />
<p-button icon="pi pi-check" />
<p-button label="Salvar" icon="pi pi-check" iconPos="right" />`;

    codeSeverities = `<p-button label="Primary" />
<p-button label="Secondary" severity="secondary" />
<p-button label="Success"   severity="success" />
<p-button label="Info"      severity="info" />
<p-button label="Warning"   severity="warn" />
<p-button label="Help"      severity="help" />
<p-button label="Danger"    severity="danger" />
<p-button label="Contrast"  severity="contrast" />`;

    codeOutlined = `<p-button label="Primary"   outlined />
<p-button label="Secondary" severity="secondary" outlined />
<p-button label="Success"   severity="success"   outlined />
<p-button label="Danger"    severity="danger"    outlined />`;

    codeText = `<p-button label="Primary"   text />
<p-button label="Secondary" severity="secondary" text />
<p-button label="Success"   severity="success"   text />
<p-button label="Danger"    severity="danger"    text />`;

    codeRaised = `<p-button label="Primary"   raised />
<p-button label="Secondary" severity="secondary" raised />
<p-button label="Success"   severity="success"   raised />
<p-button label="Danger"    severity="danger"    raised />`;

    codeRounded = `<p-button label="Primary"  rounded />
<p-button label="Danger"   severity="danger" rounded />
<p-button icon="pi pi-check" rounded />
<p-button icon="pi pi-times" severity="danger" rounded outlined />`;

    codeSizes = `<p-button label="Small"   size="small" />
<p-button label="Default" />
<p-button label="Large"   size="large" />`;

    codeLoading = `<p-button label="Salvando..." [loading]="true" />
<p-button label="Enviando..."  [loading]="true" severity="success" />`;

    codeGroup = `<p-buttongroup>
    <p-button label="Salvar"  icon="pi pi-save" />
    <p-button label="Editar"  icon="pi pi-pencil" severity="secondary" />
    <p-button label="Excluir" icon="pi pi-trash"  severity="danger" />
</p-buttongroup>`;

    codeLink = `<p-button label="Acessar site" link />
<p-button label="Ver mais" icon="pi pi-external-link" link />`;

    codeDisabled = `<p-button label="Salvar"  [disabled]="true" />
<p-button label="Excluir" [disabled]="true" severity="danger" />`;

    props = [
        { name: 'label',     type: 'string',  default: 'null',  description: 'Texto do botão.' },
        { name: 'icon',      type: 'string',  default: 'null',  description: 'Classe do ícone PrimeIcons.' },
        { name: 'iconPos',   type: 'string',  default: 'left',  description: 'Posição do ícone: left | right | top | bottom.' },
        { name: 'severity',  type: 'string',  default: 'null',  description: 'Variante de cor: secondary | success | info | warn | help | danger | contrast.' },
        { name: 'outlined',  type: 'boolean', default: 'false', description: 'Estilo com borda sem preenchimento.' },
        { name: 'text',      type: 'boolean', default: 'false', description: 'Estilo sem borda nem preenchimento.' },
        { name: 'raised',    type: 'boolean', default: 'false', description: 'Adiciona sombra elevada.' },
        { name: 'rounded',   type: 'boolean', default: 'false', description: 'Bordas totalmente arredondadas.' },
        { name: 'link',      type: 'boolean', default: 'false', description: 'Aparência de link de navegação.' },
        { name: 'size',      type: 'string',  default: 'null',  description: 'Tamanho: small | large.' },
        { name: 'loading',   type: 'boolean', default: 'false', description: 'Exibe spinner de carregamento.' },
        { name: 'disabled',  type: 'boolean', default: 'false', description: 'Desabilita o botão.' },
        { name: 'badge',     type: 'string',  default: 'null',  description: 'Valor do badge no botão.' },
        { name: 'badgeSeverity', type: 'string', default: 'null', description: 'Severidade do badge.' },
    ];

    themeVars = [
        { variable: '--p-button-primary-background',       description: 'Fundo do botão primário.' },
        { variable: '--p-button-primary-hover-background', description: 'Fundo no hover.' },
        { variable: '--p-button-primary-color',            description: 'Cor do texto/ícone.' },
        { variable: '--p-button-primary-border-color',     description: 'Cor da borda.' },
        { variable: '--p-button-border-radius',            description: 'Raio de borda padrão.' },
        { variable: '--p-button-sm-font-size',             description: 'Tamanho de fonte no modo small.' },
        { variable: '--p-button-lg-font-size',             description: 'Tamanho de fonte no modo large.' },
        { variable: '--p-button-outlined-primary-border-color', description: 'Borda no outlined.' },
        { variable: '--p-button-text-primary-color',       description: 'Cor no modo text.' },
    ];
}
