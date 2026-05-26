import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SpeedDialModule } from 'primeng/speeddial';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-button-demo',
    standalone: true,
    imports: [CommonModule, ButtonModule, ButtonGroupModule, SplitButtonModule, SpeedDialModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <!-- ── Header ── -->
        <div class="comp-header">
            <h1 class="comp-name">Button</h1>
            <p class="comp-desc">Botão é uma extensão do elemento HTML padrão com temas, efeito ripple e suporte a severidades, ícones e estados de carregamento.</p>
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

                <!-- ══ FEATURES ══ -->
                <p-tabpanel value="features"><div style="padding:20px 0">

                    <!-- Primary -->
                    <div id="primary" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Primary</div>
                            <p class="demo-card-desc">Ação principal da interface. Deve aparecer uma única vez por tela.</p>
                        </div>
                        <div class="demo-card-body">
                            <p-button label="Salvar" />
                            <p-button label="Confirmar" icon="pi pi-check" />
                            <p-button label="Próximo" icon="pi pi-arrow-right" iconPos="right" />
                            <p-button label="Desabilitado" [disabled]="true" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.primary }}</pre></div>
                    </div>

                    <!-- Secondary -->
                    <div id="secondary" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Secondary</div>
                            <p class="demo-card-desc">Ação de suporte à ação principal. Menor peso visual.</p>
                        </div>
                        <div class="demo-card-body">
                            <p-button label="Cancelar" severity="secondary" />
                            <p-button label="Voltar" icon="pi pi-arrow-left" severity="secondary" />
                            <p-button label="Configurações" icon="pi pi-cog" severity="secondary" />
                            <p-button label="Desabilitado" severity="secondary" [disabled]="true" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.secondary }}</pre></div>
                    </div>

                    <!-- Severidades -->
                    <div id="severidades" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Severidades</div>
                            <p class="demo-card-desc">Variações semânticas que comunicam o nível de atenção ou tipo de ação.</p>
                        </div>
                        <div class="demo-card-body">
                            <p-button label="Primary" />
                            <p-button label="Secondary" severity="secondary" />
                            <p-button label="Success" severity="success" />
                            <p-button label="Info" severity="info" />
                            <p-button label="Warn" severity="warn" />
                            <p-button label="Danger" severity="danger" />
                            <p-button label="Help" severity="help" />
                            <p-button label="Contrast" severity="contrast" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.severidades }}</pre></div>
                    </div>

                    <!-- Outlined -->
                    <div id="outlined" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Outlined</div>
                            <p class="demo-card-desc">Borda visível com fundo transparente. Ideal para ações secundárias.</p>
                        </div>
                        <div class="demo-card-body">
                            <p-button label="Primary" outlined />
                            <p-button label="Secondary" severity="secondary" outlined />
                            <p-button label="Success" severity="success" outlined />
                            <p-button label="Info" severity="info" outlined />
                            <p-button label="Warn" severity="warn" outlined />
                            <p-button label="Danger" severity="danger" outlined />
                            <p-button label="Contrast" severity="contrast" outlined />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.outlined }}</pre></div>
                    </div>

                    <!-- Text -->
                    <div id="text" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Text</div>
                            <p class="demo-card-desc">Sem borda e sem fundo. Útil em toolbars e contextos com pouco espaço.</p>
                        </div>
                        <div class="demo-card-body">
                            <p-button label="Primary" text />
                            <p-button label="Secondary" severity="secondary" text />
                            <p-button label="Success" severity="success" text />
                            <p-button label="Info" severity="info" text />
                            <p-button label="Warn" severity="warn" text />
                            <p-button label="Danger" severity="danger" text />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.text }}</pre></div>
                    </div>

                    <!-- Raised -->
                    <div id="raised" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Raised</div>
                            <p class="demo-card-desc">Sombra de elevação para destacar o botão sobre a superfície.</p>
                        </div>
                        <div class="demo-card-body">
                            <p-button label="Primary" raised />
                            <p-button label="Secondary" severity="secondary" raised />
                            <p-button label="Success" severity="success" raised />
                            <p-button label="Info" severity="info" raised />
                            <p-button label="Warn" severity="warn" raised />
                            <p-button label="Danger" severity="danger" raised />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.raised }}</pre></div>
                    </div>

                    <!-- Rounded -->
                    <div id="rounded" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Rounded</div>
                            <p class="demo-card-desc">Cantos totalmente arredondados. Combinável com outlined, text e ícones.</p>
                        </div>
                        <div class="demo-card-body">
                            <p-button label="Primary" rounded />
                            <p-button label="Secondary" severity="secondary" rounded />
                            <p-button label="Success" severity="success" rounded />
                            <p-button icon="pi pi-check" rounded />
                            <p-button icon="pi pi-bookmark" severity="secondary" rounded outlined />
                            <p-button icon="pi pi-trash" severity="danger" rounded text raised />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.rounded }}</pre></div>
                    </div>

                    <!-- Tamanhos -->
                    <div id="tamanhos" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Tamanhos</div>
                            <p class="demo-card-desc">Três tamanhos: small, normal (padrão) e large.</p>
                        </div>
                        <div class="demo-card-body bottom">
                            <p-button label="Small" size="small" />
                            <p-button label="Normal" />
                            <p-button label="Large" size="large" />
                            <p-button icon="pi pi-check" size="small" />
                            <p-button icon="pi pi-check" />
                            <p-button icon="pi pi-check" size="large" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.tamanhos }}</pre></div>
                    </div>

                    <!-- Loading -->
                    <div id="loading" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Loading</div>
                            <p class="demo-card-desc">Indica operação assíncrona em andamento. Clique para simular.</p>
                        </div>
                        <div class="demo-card-body">
                            <p-button label="Salvar" icon="pi pi-save" [loading]="loading[0]" (click)="load(0)" />
                            <p-button label="Buscar" icon="pi pi-search" iconPos="right" [loading]="loading[1]" (click)="load(1)" />
                            <p-button icon="pi pi-refresh" [loading]="loading[2]" (click)="load(2)" />
                            <p-button label="Processar" severity="success" [loading]="loading[3]" (click)="load(3)" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.loading }}</pre></div>
                    </div>

                    <!-- Grupo -->
                    <div id="grupo" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Grupo de Botões</div>
                            <p class="demo-card-desc">Agrupa botões sem espaçamento entre eles usando <code>p-buttongroup</code>.</p>
                        </div>
                        <div class="demo-card-body col">
                            <p-buttongroup>
                                <p-button label="Salvar" icon="pi pi-check" />
                                <p-button label="Editar" icon="pi pi-pencil" severity="secondary" />
                                <p-button label="Excluir" icon="pi pi-trash" severity="danger" />
                            </p-buttongroup>
                            <p-buttongroup>
                                <p-button icon="pi pi-align-left" outlined severity="secondary" />
                                <p-button icon="pi pi-align-center" outlined severity="secondary" />
                                <p-button icon="pi pi-align-right" outlined severity="secondary" />
                                <p-button icon="pi pi-align-justify" outlined severity="secondary" />
                            </p-buttongroup>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.grupo }}</pre></div>
                    </div>

                    <!-- SplitButton -->
                    <div id="splitbutton" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">SplitButton</div>
                            <p class="demo-card-desc">Combina um botão principal com um dropdown de ações secundárias.</p>
                        </div>
                        <div class="demo-card-body">
                            <p-splitbutton label="Salvar" icon="pi pi-check" [model]="splitItems" />
                            <p-splitbutton label="Salvar" [model]="splitItems" severity="secondary" />
                            <p-splitbutton label="Salvar" [model]="splitItems" severity="success" />
                            <p-splitbutton label="Salvar" [model]="splitItems" severity="danger" outlined />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.splitbutton }}</pre></div>
                    </div>

                    <!-- SpeedDial -->
                    <div id="speeddial" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">SpeedDial</div>
                            <p class="demo-card-desc">Menu radial de ações rápidas que se expande ao clicar. Configure a direção com <code>direction</code> e adicione uma máscara com <code>[mask]="true"</code>.</p>
                        </div>
                        <div class="demo-card-body" style="position:relative;min-height:220px;overflow:hidden;justify-content:center;align-items:center;gap:80px">
                            <div style="position:relative;width:80px;height:80px;display:flex;align-items:flex-end;justify-content:center">
                                <p-speeddial [model]="speedDialItems" direction="up" />
                                <span style="position:absolute;top:-22px;font-size:11px;font-weight:600;color:var(--text-color-secondary);white-space:nowrap">up</span>
                            </div>
                            <div style="position:relative;width:80px;height:80px;display:flex;align-items:center;justify-content:flex-start">
                                <p-speeddial [model]="speedDialItems" direction="right" />
                                <span style="position:absolute;bottom:-18px;font-size:11px;font-weight:600;color:var(--text-color-secondary);white-space:nowrap">right</span>
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.speeddial }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <!-- ══ API ══ -->
                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Propriedades</div>
                    <p-table [value]="props" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:180px">Nome</th><th style="width:140px">Tipo</th><th style="width:110px">Padrão</th><th>Descrição</th></tr>
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
                    <div class="api-block-title">Eventos</div>
                    <p-table [value]="events" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:180px">Nome</th><th style="width:200px">Parâmetro</th><th>Descrição</th></tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-e>
                            <tr>
                                <td><strong style="font-family:monospace;font-size:13px">{{ e.name }}</strong></td>
                                <td><span class="badge-type">{{ e.params }}</span></td>
                                <td style="font-size:13px;color:var(--text-color-secondary)">{{ e.description }}</td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div></p-tabpanel>

                <!-- ══ THEMING ══ -->
                <p-tabpanel value="theming"><div style="padding:16px 0">
                    <p style="font-size:13px;color:var(--text-color-secondary);margin:0 0 16px;line-height:1.6">
                        Sobrescreva as variáveis abaixo no seu arquivo de tema para customizar a aparência globalmente.
                    </p>
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
export class ButtonDemo implements OnInit {

    loading = [false, false, false, false];
    splitItems: MenuItem[] = [];
    speedDialItems: MenuItem[] = [];

    code: any = {
        primary: `<p-button label="Salvar" />
<p-button label="Confirmar" icon="pi pi-check" />
<p-button label="Próximo" icon="pi pi-arrow-right" iconPos="right" />
<p-button label="Desabilitado" [disabled]="true" />`,

        secondary: `<p-button label="Cancelar" severity="secondary" />
<p-button label="Voltar" icon="pi pi-arrow-left" severity="secondary" />
<p-button label="Desabilitado" severity="secondary" [disabled]="true" />`,

        severidades: `<p-button label="Primary" />
<p-button label="Secondary" severity="secondary" />
<p-button label="Success"   severity="success" />
<p-button label="Info"      severity="info" />
<p-button label="Warn"      severity="warn" />
<p-button label="Danger"    severity="danger" />
<p-button label="Help"      severity="help" />
<p-button label="Contrast"  severity="contrast" />`,

        outlined: `<p-button label="Primary"   outlined />
<p-button label="Secondary" severity="secondary" outlined />
<p-button label="Success"   severity="success"   outlined />
<p-button label="Danger"    severity="danger"    outlined />`,

        text: `<p-button label="Primary"   text />
<p-button label="Secondary" severity="secondary" text />
<p-button label="Success"   severity="success"   text />
<p-button label="Danger"    severity="danger"    text />`,

        raised: `<p-button label="Primary"   raised />
<p-button label="Secondary" severity="secondary" raised />
<p-button label="Success"   severity="success"   raised />
<p-button label="Danger"    severity="danger"    raised />`,

        rounded: `<p-button label="Primary" rounded />
<p-button icon="pi pi-check" rounded />
<p-button icon="pi pi-bookmark" severity="secondary" rounded outlined />
<p-button icon="pi pi-trash"    severity="danger"    rounded text raised />`,

        tamanhos: `<p-button label="Small"  size="small" />
<p-button label="Normal" />
<p-button label="Large"  size="large" />`,

        loading: `<p-button label="Salvar"   icon="pi pi-save"   [loading]="loading" (click)="loading = true" />
<p-button label="Buscar"   icon="pi pi-search" iconPos="right" [loading]="loading" />
<p-button icon="pi pi-refresh" [loading]="loading" />`,

        grupo: `<p-buttongroup>
    <p-button label="Salvar"  icon="pi pi-check" />
    <p-button label="Editar"  icon="pi pi-pencil"  severity="secondary" />
    <p-button label="Excluir" icon="pi pi-trash"   severity="danger" />
</p-buttongroup>`,

        speeddial: `<p-speeddial [model]="items" direction="up" />

// Items (MenuItem[]):
items = [
    { label: 'Adicionar', icon: 'pi pi-pencil' },
    { label: 'Atualizar', icon: 'pi pi-refresh' },
    { label: 'Excluir',   icon: 'pi pi-trash'  },
    { label: 'Upload',    icon: 'pi pi-upload' },
];`,

        splitbutton: `<p-splitbutton label="Salvar" icon="pi pi-check" [model]="items" />
<p-splitbutton label="Salvar" [model]="items" severity="secondary" />
<p-splitbutton label="Salvar" [model]="items" severity="danger" outlined />`,
    };

    props = [
        { name: 'label',         type: 'string',  default: 'null',   description: 'Texto exibido no botão.' },
        { name: 'icon',          type: 'string',  default: 'null',   description: 'Classe PrimeIcons, ex: "pi pi-check".' },
        { name: 'iconPos',       type: 'string',  default: 'left',   description: 'Posição do ícone: left | right | top | bottom.' },
        { name: 'severity',      type: 'string',  default: 'null',   description: 'Variante: secondary | success | info | warn | danger | help | contrast.' },
        { name: 'disabled',      type: 'boolean', default: 'false',  description: 'Desabilita o botão.' },
        { name: 'loading',       type: 'boolean', default: 'false',  description: 'Exibe spinner e desabilita o botão.' },
        { name: 'raised',        type: 'boolean', default: 'false',  description: 'Adiciona sombra de elevação.' },
        { name: 'rounded',       type: 'boolean', default: 'false',  description: 'Aplica border-radius máximo.' },
        { name: 'outlined',      type: 'boolean', default: 'false',  description: 'Borda visível, fundo transparente.' },
        { name: 'text',          type: 'boolean', default: 'false',  description: 'Remove borda e fundo.' },
        { name: 'size',          type: 'string',  default: 'null',   description: '"small" ou "large".' },
        { name: 'type',          type: 'string',  default: 'button', description: 'Tipo HTML: submit | reset | button.' },
        { name: 'badge',         type: 'string',  default: 'null',   description: 'Valor do badge no canto superior direito.' },
        { name: 'ariaLabel',     type: 'string',  default: 'null',   description: 'aria-label para acessibilidade.' },
    ];

    events = [
        { name: 'onClick', params: 'MouseEvent', description: 'Emitido ao clicar no botão.' },
        { name: 'onFocus', params: 'FocusEvent', description: 'Emitido quando o botão recebe foco.' },
        { name: 'onBlur',  params: 'FocusEvent', description: 'Emitido quando o botão perde o foco.' },
    ];

    themeVars = [
        { variable: '--p-button-primary-background',        description: 'Fundo do botão primário.' },
        { variable: '--p-button-primary-color',             description: 'Cor do texto primário.' },
        { variable: '--p-button-primary-hover-background',  description: 'Fundo no hover (primary).' },
        { variable: '--p-button-primary-active-background', description: 'Fundo ao pressionar (primary).' },
        { variable: '--p-button-secondary-background',      description: 'Fundo do botão secondary.' },
        { variable: '--p-button-success-background',        description: 'Fundo do botão success.' },
        { variable: '--p-button-danger-background',         description: 'Fundo do botão danger.' },
        { variable: '--p-button-warn-background',           description: 'Fundo do botão warn.' },
        { variable: '--p-button-border-radius',             description: 'Raio de borda padrão.' },
        { variable: '--p-button-padding-x',                 description: 'Padding horizontal interno.' },
        { variable: '--p-button-padding-y',                 description: 'Padding vertical interno.' },
        { variable: '--p-button-font-size',                 description: 'Tamanho da fonte padrão.' },
        { variable: '--p-button-sm-font-size',              description: 'Fonte no size="small".' },
        { variable: '--p-button-lg-font-size',              description: 'Fonte no size="large".' },
        { variable: '--p-button-focus-ring-width',          description: 'Anel de foco (acessibilidade).' },
    ];

    ngOnInit() {
        this.splitItems = [
            { label: 'Atualizar', icon: 'pi pi-refresh' },
            { label: 'Duplicar',  icon: 'pi pi-copy' },
            { separator: true },
            { label: 'Excluir',   icon: 'pi pi-times' },
        ];
        this.speedDialItems = [
            { label: 'Adicionar', icon: 'pi pi-pencil', command: () => {} },
            { label: 'Atualizar', icon: 'pi pi-refresh', command: () => {} },
            { label: 'Excluir',   icon: 'pi pi-trash',   command: () => {} },
            { label: 'Upload',    icon: 'pi pi-upload',  command: () => {} },
        ];
    }

    load(index: number) {
        this.loading[index] = true;
        setTimeout(() => (this.loading[index] = false), 1500);
    }
}
