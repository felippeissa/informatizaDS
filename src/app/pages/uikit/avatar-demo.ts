import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-avatar-demo',
    standalone: true,
    imports: [CommonModule, AvatarModule, AvatarGroupModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Avatar</h1>
            <p class="comp-desc">Representação visual de um usuário: iniciais, ícone ou imagem. Suporta grupos.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">AvatarModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/avatar'</span><span class="tok-pt">;</span>
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

                    <!-- Básico -->
                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Iniciais e Ícones</div>
                            <p class="demo-card-desc">Exiba iniciais com <code>label</code> ou um ícone com <code>icon</code>. Use <code>shape="circle"</code> para formato circular.</p>
                        </div>
                        <div class="demo-card-body" style="gap:16px;align-items:center;flex-wrap:wrap">
                            <p-avatar label="FI" size="xlarge" [style]="{'background-color':'#059669','color':'#fff'}" />
                            <p-avatar label="AB" size="large"  [style]="{'background-color':'#3B82F6','color':'#fff'}" />
                            <p-avatar label="CD" [style]="{'background-color':'#D97706','color':'#fff'}" />
                            <p-avatar icon="pi pi-user" size="xlarge" shape="circle" />
                            <p-avatar icon="pi pi-user" size="large" shape="circle" [style]="{'background-color':'#059669','color':'#fff'}" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.basic }}</pre></div>
                    </div>

                    <!-- Grupo -->
                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">AvatarGroup</div>
                            <p class="demo-card-desc">Agrupe avatares sobrepostos com <code>p-avatargroup</code>. Use um avatar com label como contador (ex: +3).</p>
                        </div>
                        <div class="demo-card-body" style="gap:16px;align-items:center">
                            <p-avatargroup>
                                <p-avatar label="A" shape="circle" [style]="{'background-color':'#059669','color':'#fff'}" />
                                <p-avatar label="B" shape="circle" [style]="{'background-color':'#3B82F6','color':'#fff'}" />
                                <p-avatar label="C" shape="circle" [style]="{'background-color':'#D97706','color':'#fff'}" />
                                <p-avatar label="+3" shape="circle" [style]="{'background-color':'#6B7280','color':'#fff'}" />
                            </p-avatargroup>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.group }}</pre></div>
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
export class AvatarDemo {
    code: any = {
        basic: `<!-- Iniciais -->
<p-avatar label="FI" size="xlarge"
    [style]="{'background-color':'#059669','color':'#fff'}" />

<!-- Ícone com círculo -->
<p-avatar icon="pi pi-user" shape="circle" />

<!-- Tamanhos: null (default), "large", "xlarge" -->`,

        group: `<p-avatargroup>
    <p-avatar label="A" shape="circle"
        [style]="{'background-color':'#059669','color':'#fff'}" />
    <p-avatar label="B" shape="circle"
        [style]="{'background-color':'#3B82F6','color':'#fff'}" />
    <p-avatar label="+3" shape="circle"
        [style]="{'background-color':'#6B7280','color':'#fff'}" />
</p-avatargroup>`,
    };

    props = [
        { name: 'label',  type: 'string',  default: 'null',   description: 'Iniciais ou texto curto.' },
        { name: 'icon',   type: 'string',  default: 'null',   description: 'Ícone PrimeIcons.' },
        { name: 'image',  type: 'string',  default: 'null',   description: 'URL da imagem.' },
        { name: 'size',   type: 'string',  default: 'null',   description: '"large" ou "xlarge".' },
        { name: 'shape',  type: 'string',  default: 'square', description: '"square" ou "circle".' },
        { name: 'style',  type: 'object',  default: 'null',   description: 'Estilos inline.' },
    ];

    themeVars = [
        { variable: '--p-avatar-background',     description: 'Fundo do avatar padrão.' },
        { variable: '--p-avatar-color',          description: 'Cor do texto/ícone padrão.' },
        { variable: '--p-avatar-border-radius',  description: 'Raio de borda (square).' },
        { variable: '--p-avatargroup-gap',        description: 'Sobreposição entre avatares no grupo.' },
    ];
}
