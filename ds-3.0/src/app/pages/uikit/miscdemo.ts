import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { ProgressBarModule } from 'primeng/progressbar';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MeterGroupModule } from 'primeng/metergroup';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-misc-demo',
    standalone: true,
    imports: [CommonModule, AvatarModule, AvatarGroupModule, BadgeModule, TagModule, ChipModule, ProgressBarModule, SkeletonModule, ProgressSpinnerModule, MeterGroupModule, ButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        .demo-card-body.wrap { flex-wrap: wrap; gap: 10px; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Miscelânea</h1>
            <p class="comp-desc">Componentes utilitários: Avatar, Badge, Tag, Chip, ProgressBar e Skeleton.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">TagModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/tag'</span><span class="tok-pt">;</span>
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

                    <!-- Avatar -->
                    <div id="avatar" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Avatar</div>
                            <p class="demo-card-desc">Representação visual de um usuário: iniciais, ícone ou imagem. Suporta grupos.</p>
                        </div>
                        <div class="demo-card-body" style="gap:16px;align-items:center">
                            <p-avatar label="FI" styleClass="mr-2" size="xlarge" [style]="{'background-color':'#059669','color':'#fff'}" />
                            <p-avatar label="AB" size="large" [style]="{'background-color':'#3B82F6','color':'#fff'}" />
                            <p-avatar label="CD" [style]="{'background-color':'#D97706','color':'#fff'}" />
                            <p-avatar icon="pi pi-user" size="xlarge" shape="circle" />
                            <p-avatar icon="pi pi-user" size="large" shape="circle" [style]="{'background-color':'#059669','color':'#fff'}" />
                            <p-avatargroup>
                                <p-avatar label="A" shape="circle" [style]="{'background-color':'#059669','color':'#fff'}" />
                                <p-avatar label="B" shape="circle" [style]="{'background-color':'#3B82F6','color':'#fff'}" />
                                <p-avatar label="C" shape="circle" [style]="{'background-color':'#D97706','color':'#fff'}" />
                                <p-avatar label="+3" shape="circle" [style]="{'background-color':'#6B7280','color':'#fff'}" />
                            </p-avatargroup>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.avatar }}</pre></div>
                    </div>

                    <!-- Badge -->
                    <div id="badge" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Badge</div>
                            <p class="demo-card-desc">Marcador numérico ou de status sobreposto a um elemento. Use a diretiva <code>pBadge</code>.</p>
                        </div>
                        <div class="demo-card-body" style="gap:24px;align-items:center">
                            <p-badge value="8" />
                            <p-badge value="42" severity="secondary" />
                            <p-badge value="3" severity="success" />
                            <p-badge value="!" severity="warn" />
                            <p-badge value="5" severity="danger" />
                            <span class="pi pi-bell p-overlay-badge" style="font-size:1.5rem" pBadge severity="danger" value="4"></span>
                            <span class="pi pi-inbox p-overlay-badge" style="font-size:1.5rem" pBadge value="99+"></span>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.badge }}</pre></div>
                    </div>

                    <!-- Tag -->
                    <div id="tag" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Tag</div>
                            <p class="demo-card-desc">Rótulo compacto para categorizar ou indicar status de um item.</p>
                        </div>
                        <div class="demo-card-body" style="gap:10px;align-items:center">
                            <p-tag value="Novo" />
                            <p-tag value="Em andamento" severity="info" />
                            <p-tag value="Concluído" severity="success" />
                            <p-tag value="Atenção" severity="warn" />
                            <p-tag value="Cancelado" severity="danger" />
                            <p-tag value="Arquivado" severity="secondary" />
                            <p-tag value="Novo" icon="pi pi-sparkles" rounded />
                            <p-tag value="Destaque" severity="success" icon="pi pi-check" rounded />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.tag }}</pre></div>
                    </div>

                    <!-- Chip -->
                    <div id="chip" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Chip</div>
                            <p class="demo-card-desc">Elemento compacto para representar filtros, seleções ou informações com ação de remoção.</p>
                        </div>
                        <div class="demo-card-body" style="gap:10px;align-items:center">
                            <p-chip label="Angular" />
                            <p-chip label="React" icon="pi pi-bolt" />
                            <p-chip label="Vue" [removable]="true" />
                            <p-chip label="Goiás" icon="pi pi-map-marker" [removable]="true" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.chip }}</pre></div>
                    </div>

                    <!-- ProgressBar -->
                    <div id="progressbar" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">ProgressBar</div>
                            <p class="demo-card-desc">Barra de progresso determinada ou indeterminada para indicar andamento de operações.</p>
                        </div>
                        <div class="demo-card-body col" style="gap:16px;padding:20px">
                            <div style="width:100%">
                                <p style="font-size:13px;margin:0 0 6px;color:var(--text-color-secondary)">Determinado (75%)</p>
                                <p-progressbar [value]="75" />
                            </div>
                            <div style="width:100%">
                                <p style="font-size:13px;margin:0 0 6px;color:var(--text-color-secondary)">Indeterminado</p>
                                <p-progressbar mode="indeterminate" [style]="{'height':'6px'}" />
                            </div>
                            <div style="width:100%">
                                <p style="font-size:13px;margin:0 0 6px;color:var(--text-color-secondary)">Sem label</p>
                                <p-progressbar [value]="40" [showValue]="false" [style]="{'height':'8px'}" />
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.progressbar }}</pre></div>
                    </div>

                    <!-- Skeleton -->
                    <div id="skeleton" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Skeleton</div>
                            <p class="demo-card-desc">Placeholder animado para indicar carregamento de conteúdo, preservando o layout.</p>
                        </div>
                        <div class="demo-card-body col" style="gap:12px;padding:20px">
                            <div style="display:flex;align-items:center;gap:12px;width:100%">
                                <p-skeleton shape="circle" size="48px" />
                                <div style="flex:1;display:flex;flex-direction:column;gap:6px">
                                    <p-skeleton width="60%" height="14px" />
                                    <p-skeleton width="40%" height="12px" />
                                </div>
                            </div>
                            <p-skeleton width="100%" height="14px" />
                            <p-skeleton width="80%" height="14px" />
                            <p-skeleton width="90%" height="14px" />
                            <p-skeleton width="100%" height="160px" borderRadius="8px" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.skeleton }}</pre></div>
                    </div>

                    <!-- ProgressSpinner -->
                    <div id="progressspinner" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">ProgressSpinner</div>
                            <p class="demo-card-desc">Indicador circular de carregamento indeterminado para operações assíncronas sem duração conhecida.</p>
                        </div>
                        <div class="demo-card-body" style="gap:24px;align-items:center">
                            <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
                                <p-progressspinner />
                                <span style="font-size:11px;color:var(--text-color-secondary)">Padrão</span>
                            </div>
                            <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
                                <p-progressspinner [style]="{'width':'50px','height':'50px'}" strokeWidth="6" />
                                <span style="font-size:11px;color:var(--text-color-secondary)">Stroke 6</span>
                            </div>
                            <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
                                <p-progressspinner [style]="{'width':'40px','height':'40px'}" strokeWidth="4" animationDuration=".5s" />
                                <span style="font-size:11px;color:var(--text-color-secondary)">Rápido</span>
                            </div>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.progressspinner }}</pre></div>
                    </div>

                    <!-- MeterGroup -->
                    <div id="metergroup" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">MeterGroup</div>
                            <p class="demo-card-desc">Barra de progresso segmentada para exibir múltiplas métricas lado a lado em uma única barra.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:20px;gap:0;width:100%">
                            <p-metergroup [value]="meterItems" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.metergroup }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Tag — Propriedades</div>
                    <p-table [value]="propsTag" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header"><tr><th style="width:180px">Nome</th><th style="width:140px">Tipo</th><th style="width:110px">Padrão</th><th>Descrição</th></tr></ng-template>
                        <ng-template pTemplate="body" let-r>
                            <tr><td><strong style="font-family:monospace;font-size:13px">{{ r.name }}</strong></td>
                                <td><span class="badge-type">{{ r.type }}</span></td>
                                <td><span class="badge-default">{{ r.default }}</span></td>
                                <td style="font-size:13px;color:var(--text-color-secondary)">{{ r.description }}</td></tr>
                        </ng-template>
                    </p-table>
                    <div class="api-block-title" style="margin-top:28px">ProgressSpinner — Propriedades</div>
                    <p-table [value]="propsSpinner" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header"><tr><th style="width:180px">Nome</th><th style="width:140px">Tipo</th><th style="width:110px">Padrão</th><th>Descrição</th></tr></ng-template>
                        <ng-template pTemplate="body" let-r>
                            <tr><td><strong style="font-family:monospace;font-size:13px">{{ r.name }}</strong></td>
                                <td><span class="badge-type">{{ r.type }}</span></td>
                                <td><span class="badge-default">{{ r.default }}</span></td>
                                <td style="font-size:13px;color:var(--text-color-secondary)">{{ r.description }}</td></tr>
                        </ng-template>
                    </p-table>
                    <div class="api-block-title" style="margin-top:28px">Avatar — Propriedades</div>
                    <p-table [value]="propsAvatar" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header"><tr><th style="width:180px">Nome</th><th style="width:140px">Tipo</th><th style="width:110px">Padrão</th><th>Descrição</th></tr></ng-template>
                        <ng-template pTemplate="body" let-r>
                            <tr><td><strong style="font-family:monospace;font-size:13px">{{ r.name }}</strong></td>
                                <td><span class="badge-type">{{ r.type }}</span></td>
                                <td><span class="badge-default">{{ r.default }}</span></td>
                                <td style="font-size:13px;color:var(--text-color-secondary)">{{ r.description }}</td></tr>
                        </ng-template>
                    </p-table>
                </div></p-tabpanel>

                <p-tabpanel value="theming"><div style="padding:16px 0">
                    <p-table [value]="themeVars" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header"><tr><th style="width:360px">Variável CSS</th><th>Descrição</th></tr></ng-template>
                        <ng-template pTemplate="body" let-v>
                            <tr><td><span class="theme-var">{{ v.variable }}</span></td><td style="font-size:13px;color:var(--text-color-secondary)">{{ v.description }}</td></tr>
                        </ng-template>
                    </p-table>
                </div></p-tabpanel>
            </p-tabpanels>
        </p-tabs>
    `
})
export class MiscDemo {
    code: any = {
        avatar: `<!-- Iniciais -->
<p-avatar label="FI" size="xlarge"
    [style]="{'background-color':'#059669','color':'#fff'}" />

<!-- Ícone com círculo -->
<p-avatar icon="pi pi-user" shape="circle" />

<!-- Grupo -->
<p-avatargroup>
    <p-avatar label="A" shape="circle" />
    <p-avatar label="B" shape="circle" />
    <p-avatar label="+3" shape="circle" />
</p-avatargroup>`,

        badge: `<!-- Badge standalone -->
<p-badge value="8" />
<p-badge value="3" severity="success" />
<p-badge value="!" severity="warn" />

<!-- Badge sobre elemento -->
<span class="pi pi-bell p-overlay-badge"
    pBadge severity="danger" value="4">
</span>`,

        tag: `<p-tag value="Novo" />
<p-tag value="Concluído" severity="success" />
<p-tag value="Atenção"   severity="warn" />
<p-tag value="Cancelado" severity="danger" />
<p-tag value="Novo" icon="pi pi-sparkles" rounded />`,

        chip: `<p-chip label="Angular" />
<p-chip label="React" icon="pi pi-bolt" />
<p-chip label="Vue" [removable]="true" />`,

        progressbar: `<!-- Determinado -->
<p-progressbar [value]="75" />

<!-- Indeterminado -->
<p-progressbar mode="indeterminate" />

<!-- Sem label interno -->
<p-progressbar [value]="40" [showValue]="false" />`,

        progressspinner: `<!-- Padrão -->
<p-progressspinner />

<!-- Customizado -->
<p-progressspinner
    [style]="{'width':'50px','height':'50px'}"
    strokeWidth="6"
    animationDuration=".5s" />`,

        metergroup: `<p-metergroup [value]="items" />

// Dados:
items = [
    { label: 'Concluídos',   value: 45, color: '#059669' },
    { label: 'Em andamento', value: 30, color: '#3B82F6' },
    { label: 'Pendentes',    value: 15, color: '#F59E0B' },
    { label: 'Cancelados',   value: 10, color: '#EF4444' },
];`,

        skeleton: `<!-- Linha de texto -->
<p-skeleton width="100%" height="14px" />

<!-- Avatar circular -->
<p-skeleton shape="circle" size="48px" />

<!-- Card completo -->
<p-skeleton width="100%" height="160px" borderRadius="8px" />`,
    };

    meterItems = [
        { label: 'Concluídos',   value: 45, color: '#059669' },
        { label: 'Em andamento', value: 30, color: '#3B82F6' },
        { label: 'Pendentes',    value: 15, color: '#F59E0B' },
        { label: 'Cancelados',   value: 10, color: '#EF4444' },
    ];

    propsSpinner = [
        { name: 'strokeWidth',        type: 'string',  default: '2',     description: 'Espessura do traço (CSS stroke-width).' },
        { name: 'fill',               type: 'string',  default: 'none',  description: 'Cor de preenchimento do círculo de fundo.' },
        { name: 'animationDuration',  type: 'string',  default: '2s',    description: 'Duração da animação de rotação.' },
    ];

    propsTag = [
        { name: 'value',    type: 'string',  default: 'null',  description: 'Texto exibido na tag.' },
        { name: 'severity', type: 'string',  default: 'null',  description: 'Cor semântica: success | info | warn | danger | secondary.' },
        { name: 'icon',     type: 'string',  default: 'null',  description: 'Ícone PrimeIcons.' },
        { name: 'rounded',  type: 'boolean', default: 'false', description: 'Cantos totalmente arredondados.' },
    ];

    propsAvatar = [
        { name: 'label',  type: 'string',  default: 'null',   description: 'Iniciais ou texto curto.' },
        { name: 'icon',   type: 'string',  default: 'null',   description: 'Ícone PrimeIcons.' },
        { name: 'image',  type: 'string',  default: 'null',   description: 'URL da imagem.' },
        { name: 'size',   type: 'string',  default: 'null',   description: '"large" ou "xlarge".' },
        { name: 'shape',  type: 'string',  default: 'square', description: '"square" ou "circle".' },
    ];

    themeVars = [
        { variable: '--p-tag-primary-background',  description: 'Fundo da tag primary.' },
        { variable: '--p-tag-success-background',  description: 'Fundo da tag success.' },
        { variable: '--p-tag-warn-background',     description: 'Fundo da tag warn.' },
        { variable: '--p-tag-danger-background',   description: 'Fundo da tag danger.' },
        { variable: '--p-tag-border-radius',       description: 'Raio de borda da tag.' },
        { variable: '--p-badge-primary-background',description: 'Fundo do badge primary.' },
        { variable: '--p-badge-danger-background', description: 'Fundo do badge danger.' },
        { variable: '--p-progressbar-background',  description: 'Fundo da progress bar.' },
        { variable: '--p-progressbar-value-background', description: 'Cor do valor preenchido.' },
        { variable: '--p-metergroup-background',         description: 'Fundo da barra do MeterGroup.' },
        { variable: '--p-metergroup-border-radius',      description: 'Raio de borda dos segmentos.' },
        { variable: '--p-progressspinner-color-1',       description: 'Primeira cor da animação do spinner.' },
        { variable: '--p-progressspinner-color-2',       description: 'Segunda cor da animação do spinner.' },
    ];
}
