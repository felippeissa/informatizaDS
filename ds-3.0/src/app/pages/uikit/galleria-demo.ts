import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-galleria-demo',
    standalone: true,
    imports: [CommonModule, GalleriaModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Galleria</h1>
            <p class="comp-desc">Galeria de imagens com miniaturas clicáveis. Suporta modo fullscreen e transições.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">GalleriaModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/galleria'</span><span class="tok-pt">;</span>
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
                            <div class="demo-card-title">Galleria</div>
                            <p class="demo-card-desc">Galeria de imagens com miniaturas clicáveis. Suporta modo fullscreen e transições.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:20px;gap:0">
                            <p-galleria [value]="images" [numVisible]="5"
                                        [containerStyle]="{'max-width':'680px','width':'100%'}">
                                <ng-template #item let-item>
                                    <img [src]="item.src" [alt]="item.title"
                                         style="width:100%;max-height:320px;object-fit:cover;display:block" />
                                </ng-template>
                                <ng-template #thumbnail let-item>
                                    <img [src]="item.src" [alt]="item.title"
                                         style="width:64px;height:48px;object-fit:cover;display:block;border-radius:4px" />
                                </ng-template>
                            </p-galleria>
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
export class GalleriaDemo {
    images = [
        { title: 'Imagem 1', src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg' },
        { title: 'Imagem 2', src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg' },
        { title: 'Imagem 3', src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg' },
        { title: 'Imagem 4', src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg' },
        { title: 'Imagem 5', src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg' },
        { title: 'Imagem 6', src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6.jpg' },
        { title: 'Imagem 7', src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7.jpg' },
    ];

    code = `<p-galleria [value]="images" [numVisible]="5">
    <ng-template #item let-item>
        <img [src]="item.src" style="width:100%" />
    </ng-template>
    <ng-template #thumbnail let-item>
        <img [src]="item.src" style="width:64px;height:48px;object-fit:cover" />
    </ng-template>
</p-galleria>`;

    props = [
        { name: 'value',          type: 'any[]',   default: 'null',  description: 'Array de itens.' },
        { name: 'numVisible',     type: 'number',  default: '3',     description: 'Número de miniaturas visíveis.' },
        { name: 'circular',       type: 'boolean', default: 'false', description: 'Navegação circular.' },
        { name: 'fullScreen',     type: 'boolean', default: 'false', description: 'Habilita modo tela cheia.' },
        { name: 'showThumbnails', type: 'boolean', default: 'true',  description: 'Exibe miniaturas.' },
        { name: 'showIndicators', type: 'boolean', default: 'false', description: 'Exibe indicadores de posição.' },
        { name: 'autoPlay',       type: 'boolean', default: 'false', description: 'Reprodução automática.' },
        { name: 'transitionInterval', type: 'number', default: '4000', description: 'Intervalo de autoplay em ms.' },
    ];

    themeVars = [
        { variable: '--p-galleria-thumbnail-container-background',  description: 'Fundo do container de miniaturas.' },
        { variable: '--p-galleria-thumbnail-nav-button-color',      description: 'Cor dos botões de navegação.' },
        { variable: '--p-galleria-nav-button-background',           description: 'Fundo dos botões prev/next.' },
        { variable: '--p-galleria-close-button-background',         description: 'Fundo do botão fechar (fullscreen).' },
    ];
}
