import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DockModule } from 'primeng/dock';
import { TooltipModule } from 'primeng/tooltip';
import { MenuItem } from 'primeng/api';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-dock-demo',
    standalone: true,
    imports: [CommonModule, DockModule, TooltipModule, TabsModule, TableModule],
    styles: [DEMO_STYLES + `
        .dock-container {
            position: relative; height: 220px;
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            border-radius: 12px; overflow: hidden;
        }
        .dock-label { position:absolute; top:20px; left:50%; transform:translateX(-50%); color:rgba(255,255,255,.6); font-size:12px; }
    `],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Dock</h1>
            <p class="comp-desc">Dock é uma barra de aplicativos estilo macOS com efeito de ampliação ao passar o mouse, posicionável em qualquer lado da tela.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">DockModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/dock'</span><span class="tok-pt">;</span>
            </div>
        </div>

        <p-tabs value="features" styleClass="mt-1">
            <p-tablist>
                <p-tab value="features">Features</p-tab>
                <p-tab value="api">API</p-tab>
            </p-tablist>
            <p-tabpanels>
                <p-tabpanel value="features"><div style="padding:20px 0">

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Bottom (padrão)</div>
                            <p class="demo-card-desc">Passe o mouse sobre os ícones para ver o efeito de ampliação.</p>
                        </div>
                        <div class="demo-card-body" style="padding:0">
                            <div class="dock-container">
                                <span class="dock-label">Passe o mouse sobre o Dock</span>
                                <p-dock [model]="dockItems" position="bottom" />
                            </div>
                        </div>
                    </div>

                    <div class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Posições</div>
                            <p class="demo-card-desc">O Dock pode ser posicionado em <code>bottom</code>, <code>top</code>, <code>left</code> ou <code>right</code>.</p>
                        </div>
                        <div class="demo-card-body" style="flex-wrap:wrap;gap:16px;padding:16px">
                            <div *ngFor="let pos of positions" style="display:flex;flex-direction:column;gap:6px;align-items:center">
                                <div style="position:relative;width:200px;height:120px;background:var(--surface-ground);border-radius:8px;border:1px solid var(--surface-border);overflow:hidden">
                                    <p-dock [model]="smallItems" [position]="$any(pos)" />
                                </div>
                                <small style="color:var(--text-color-secondary)">{{ pos }}</small>
                            </div>
                        </div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:20px 0">
                    <p class="api-block-title">Propriedades</p>
                    <p-table [value]="apiProps" styleClass="p-datatable-sm">
                        <ng-template #header><tr><th>Prop</th><th>Tipo</th><th>Padrão</th><th>Descrição</th></tr></ng-template>
                        <ng-template #body let-r><tr>
                            <td><code>{{r.prop}}</code></td>
                            <td><span class="badge-type">{{r.type}}</span></td>
                            <td><span class="badge-default">{{r.default}}</span></td>
                            <td>{{r.desc}}</td>
                        </tr></ng-template>
                    </p-table>
                </div></p-tabpanel>
            </p-tabpanels>
        </p-tabs>
    `
})
export class DockDemo {
    positions = ['bottom', 'top', 'left', 'right'];

    dockItems: MenuItem[] = [
        { label: 'Finder', icon: 'https://primefaces.org/cdn/primeng/images/dock/finder.svg' },
        { label: 'App Store', icon: 'https://primefaces.org/cdn/primeng/images/dock/appstore.svg' },
        { label: 'Photos', icon: 'https://primefaces.org/cdn/primeng/images/dock/photos.svg' },
        { label: 'Trash', icon: 'https://primefaces.org/cdn/primeng/images/dock/trash.png' },
    ];

    smallItems: MenuItem[] = [
        { label: 'A', icon: 'pi pi-home' },
        { label: 'B', icon: 'pi pi-star' },
        { label: 'C', icon: 'pi pi-cog' },
    ];

    apiProps = [
        { prop: 'model', type: 'MenuItem[]', default: 'null', desc: 'Lista de itens do dock' },
        { prop: 'position', type: 'string', default: 'bottom', desc: 'Posição: bottom | top | left | right' },
        { prop: 'magnification', type: 'boolean', default: 'true', desc: 'Habilita efeito de ampliação' },
    ];
}
