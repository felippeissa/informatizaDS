import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-media-demo',
    standalone: true,
    imports: [CommonModule, CarouselModule, GalleriaModule, ImageModule, TagModule, ButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Mídia</h1>
            <p class="comp-desc">Componentes para exibição de imagens e galerias: Image com preview, Carousel e Galleria.</p>
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

                    <!-- Image -->
                    <div id="image" class="demo-card">
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
                        <div class="demo-card-code"><pre>{{ code.image }}</pre></div>
                    </div>

                    <!-- Carousel -->
                    <div id="carousel" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Carousel</div>
                            <p class="demo-card-desc">Galeria deslizante com controles de navegação. Configure <code>numVisible</code> e <code>numScroll</code> para layout responsivo.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:20px;gap:0">
                            <p-carousel [value]="slides" [numVisible]="3" [numScroll]="1"
                                        [responsiveOptions]="responsiveOptions" styleClass="w-full">
                                <ng-template #item let-slide>
                                    <div style="padding:8px">
                                        <div style="border:1px solid var(--surface-border);border-radius:10px;overflow:hidden">
                                            <img [src]="slide.src" [alt]="slide.title"
                                                 style="width:100%;height:140px;object-fit:cover;display:block" />
                                            <div style="padding:10px 12px;background:var(--surface-card)">
                                                <p style="font-weight:700;margin:0 0 2px;font-size:13px;color:var(--text-color)">{{ slide.title }}</p>
                                                <p-tag [value]="slide.category" severity="secondary" />
                                            </div>
                                        </div>
                                    </div>
                                </ng-template>
                            </p-carousel>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.carousel }}</pre></div>
                    </div>

                    <!-- Galleria -->
                    <div id="galleria" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Galleria</div>
                            <p class="demo-card-desc">Galeria de imagens com miniaturas clicáveis. Suporta modo fullscreen e transições.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:20px;gap:0">
                            <p-galleria [value]="galleriaImages" [numVisible]="5"
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
                        <div class="demo-card-code"><pre>{{ code.galleria }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Image — Propriedades</div>
                    <p-table [value]="propsImage" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
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

                    <div class="api-block-title" style="margin-top:24px">Carousel — Propriedades</div>
                    <p-table [value]="propsCarousel" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
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
export class MediaDemo {
    slides = [
        { title: 'Goiânia',          category: 'Capital',    src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg' },
        { title: 'Parque Estadual',  category: 'Natureza',   src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg' },
        { title: 'Chapada dos Veadeiros', category: 'Turismo', src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg' },
        { title: 'Serra Dourada',    category: 'Natureza',   src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg' },
        { title: 'Caldas Novas',     category: 'Turismo',    src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg' },
        { title: 'Rio Araguaia',     category: 'Natureza',   src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6.jpg' },
    ];

    galleriaImages = [
        { title: 'Imagem 1',  src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg' },
        { title: 'Imagem 2',  src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg' },
        { title: 'Imagem 3',  src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg' },
        { title: 'Imagem 4',  src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg' },
        { title: 'Imagem 5',  src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg' },
        { title: 'Imagem 6',  src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6.jpg' },
        { title: 'Imagem 7',  src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7.jpg' },
    ];

    responsiveOptions = [
        { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
        { breakpoint: '767px',  numVisible: 2, numScroll: 1 },
        { breakpoint: '575px',  numVisible: 1, numScroll: 1 },
    ];

    code: any = {
        image: `<!-- Simples -->
<p-image src="caminho/imagem.jpg" alt="Descrição" width="250" />

<!-- Com preview em tela cheia -->
<p-image src="caminho/imagem.jpg" alt="Descrição"
         width="250" [preview]="true" />`,

        carousel: `<p-carousel [value]="slides"
            [numVisible]="3" [numScroll]="1"
            [responsiveOptions]="responsiveOptions">
    <ng-template #item let-slide>
        <img [src]="slide.src" [alt]="slide.title" />
        <p>{{ slide.title }}</p>
    </ng-template>
</p-carousel>`,

        galleria: `<p-galleria [value]="images" [numVisible]="5">
    <ng-template #item let-item>
        <img [src]="item.src" style="width:100%" />
    </ng-template>
    <ng-template #thumbnail let-item>
        <img [src]="item.src" />
    </ng-template>
</p-galleria>`,
    };

    propsImage = [
        { name: 'src',         type: 'string',  default: 'null',  description: 'URL da imagem.' },
        { name: 'alt',         type: 'string',  default: 'null',  description: 'Texto alternativo.' },
        { name: 'width',       type: 'string',  default: 'null',  description: 'Largura em pixels.' },
        { name: 'preview',     type: 'boolean', default: 'false', description: 'Habilita visualização em tela cheia.' },
        { name: 'imageStyle',  type: 'string',  default: 'null',  description: 'Estilos inline na tag img.' },
        { name: 'imageClass',  type: 'string',  default: 'null',  description: 'Classe CSS na tag img.' },
    ];

    propsCarousel = [
        { name: 'value',             type: 'any[]',   default: 'null',  description: 'Array de itens.' },
        { name: 'numVisible',        type: 'number',  default: '1',     description: 'Número de itens visíveis.' },
        { name: 'numScroll',         type: 'number',  default: '1',     description: 'Número de itens por scroll.' },
        { name: 'circular',          type: 'boolean', default: 'false', description: 'Navegação circular.' },
        { name: 'autoplayInterval',  type: 'number',  default: '0',     description: 'Intervalo de autoplay em ms.' },
        { name: 'responsiveOptions', type: 'any[]',   default: 'null',  description: 'Breakpoints responsivos.' },
        { name: 'orientation',       type: 'string',  default: 'horizontal', description: '"horizontal" ou "vertical".' },
    ];

    themeVars = [
        { variable: '--p-carousel-indicator-background',         description: 'Fundo dos indicadores.' },
        { variable: '--p-carousel-indicator-active-background',  description: 'Fundo do indicador ativo.' },
        { variable: '--p-galleria-thumbnail-container-background', description: 'Fundo do container de miniaturas.' },
        { variable: '--p-galleria-thumbnail-nav-button-color',   description: 'Cor dos botões de navegação.' },
    ];
}
