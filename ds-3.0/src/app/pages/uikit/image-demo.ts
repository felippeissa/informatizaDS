import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-image-demo',
    standalone: true,
    imports: [CommonModule, ImageModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Image</h1>
            <p class="comp-desc">Exibe uma imagem com suporte a preview em tela cheia ao clicar.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">ImageModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/image'</span><span class="tok-pt">;</span>
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

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Image</div>
                            <p class="demo-card-desc">Exibe uma imagem com suporte a preview em tela cheia ao clicar. Adicione <code>[preview]="true"</code> para habilitar.</p>
                        </div>
                        <div class="demo-card-body" style="gap:24px;flex-wrap:wrap;align-items:flex-start;padding:24px">
                            <div>
                                <p style="font-size:12px;font-weight:700;color:var(--text-color-secondary);margin:0 0 8px;text-transform:uppercase;letter-spacing:.04em">Sem preview</p>
                                <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg"
                                         alt="Imagem demo" width="180" />
                            </div>
                            <div>
                                <p style="font-size:12px;font-weight:700;color:var(--text-color-secondary);margin:0 0 8px;text-transform:uppercase;letter-spacing:.04em">Com preview (clique)</p>
                                <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg"
                                         alt="Imagem demo" width="180" [preview]="true" />
                            </div>
                            <div>
                                <p style="font-size:12px;font-weight:700;color:var(--text-color-secondary);margin:0 0 8px;text-transform:uppercase;letter-spacing:.04em">Com borda arredondada</p>
                                <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg"
                                         alt="Imagem demo" width="180" [preview]="true"
                                         [imageStyle]="{'border-radius':'12px','display':'block'}" />
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code }}</pre></div>
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
export class ImageDemo {
    code = `<!-- Simples -->
<p-image src="caminho/imagem.jpg" alt="Descrição" width="250" />

<!-- Com preview em tela cheia -->
<p-image src="caminho/imagem.jpg" alt="Descrição"
         width="250" [preview]="true" />

<!-- Com estilo customizado -->
<p-image src="caminho/imagem.jpg" alt="Descrição"
         width="250" [preview]="true"
         [imageStyle]="{'border-radius':'12px'}" />`;

    props = [
        { name: 'src',         type: 'string',  default: 'null',  description: 'URL da imagem.' },
        { name: 'alt',         type: 'string',  default: 'null',  description: 'Texto alternativo.' },
        { name: 'width',       type: 'string',  default: 'null',  description: 'Largura em pixels.' },
        { name: 'preview',     type: 'boolean', default: 'false', description: 'Habilita visualização em tela cheia.' },
        { name: 'imageStyle',  type: 'object',  default: 'null',  description: 'Estilos inline na tag img.' },
        { name: 'imageClass',  type: 'string',  default: 'null',  description: 'Classe CSS na tag img.' },
    ];

    themeVars = [
        { variable: '--p-image-preview-mask-background', description: 'Fundo do overlay de preview.' },
        { variable: '--p-image-preview-icon-color',      description: 'Cor do ícone de preview.' },
        { variable: '--p-image-toolbar-background',      description: 'Fundo da toolbar de preview.' },
    ];
}
