import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-carousel-demo',
    standalone: true,
    imports: [CommonModule, CarouselModule, TagModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Carousel</h1>
            <p class="comp-desc">Galeria deslizante com controles de navegação. Configure <code>numVisible</code> e <code>numScroll</code> para layout responsivo.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">CarouselModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/carousel'</span><span class="tok-pt">;</span>
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
export class CarouselDemo {
    slides = [
        { title: 'Goiânia',               category: 'Capital',  src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg' },
        { title: 'Parque Estadual',        category: 'Natureza', src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg' },
        { title: 'Chapada dos Veadeiros',  category: 'Turismo',  src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg' },
        { title: 'Serra Dourada',          category: 'Natureza', src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg' },
        { title: 'Caldas Novas',           category: 'Turismo',  src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg' },
        { title: 'Rio Araguaia',           category: 'Natureza', src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6.jpg' },
    ];

    responsiveOptions = [
        { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
        { breakpoint: '767px',  numVisible: 2, numScroll: 1 },
        { breakpoint: '575px',  numVisible: 1, numScroll: 1 },
    ];

    code = `<p-carousel [value]="slides"
            [numVisible]="3" [numScroll]="1"
            [responsiveOptions]="responsiveOptions">
    <ng-template #item let-slide>
        <div style="padding:8px">
            <img [src]="slide.src" [alt]="slide.title"
                 style="width:100%;height:140px;object-fit:cover" />
            <p>{{ slide.title }}</p>
        </div>
    </ng-template>
</p-carousel>

responsiveOptions = [
    { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
    { breakpoint: '767px',  numVisible: 2, numScroll: 1 },
    { breakpoint: '575px',  numVisible: 1, numScroll: 1 },
];`;

    props = [
        { name: 'value',             type: 'any[]',   default: 'null',       description: 'Array de itens.' },
        { name: 'numVisible',        type: 'number',  default: '1',          description: 'Número de itens visíveis.' },
        { name: 'numScroll',         type: 'number',  default: '1',          description: 'Número de itens por scroll.' },
        { name: 'circular',          type: 'boolean', default: 'false',      description: 'Navegação circular.' },
        { name: 'autoplayInterval',  type: 'number',  default: '0',          description: 'Intervalo de autoplay em ms.' },
        { name: 'responsiveOptions', type: 'any[]',   default: 'null',       description: 'Breakpoints responsivos.' },
        { name: 'orientation',       type: 'string',  default: 'horizontal', description: '"horizontal" ou "vertical".' },
    ];

    themeVars = [
        { variable: '--p-carousel-indicator-background',        description: 'Fundo dos indicadores.' },
        { variable: '--p-carousel-indicator-active-background', description: 'Fundo do indicador ativo.' },
        { variable: '--p-carousel-prev-button-background',      description: 'Fundo do botão anterior.' },
        { variable: '--p-carousel-next-button-background',      description: 'Fundo do botão próximo.' },
    ];
}
