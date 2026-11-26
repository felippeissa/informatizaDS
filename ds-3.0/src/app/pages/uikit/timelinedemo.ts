import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-timeline-demo',
    standalone: true,
    imports: [CommonModule, TimelineModule, ButtonModule, TabsModule, TableModule],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">Timeline</h1>
            <p class="comp-desc">Componente visual para exibir eventos em ordem cronológica, no eixo vertical ou horizontal.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">TimelineModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/timeline'</span><span class="tok-pt">;</span>
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

                    <!-- Vertical -->
                    <div id="timeline" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Vertical</div>
                            <p class="demo-card-desc">Linha do tempo padrão com marcadores customizados e conteúdo à direita.</p>
                        </div>
                        <div class="demo-card-body" style="padding:24px;align-items:flex-start">
                            <p-timeline [value]="events" style="max-width:520px;width:100%">
                                <ng-template #marker let-event>
                                    <span [style]="{'background':event.color,'border-radius':'50%','width':'32px','height':'32px','display':'flex','align-items':'center','justify-content':'center','flex-shrink':'0'}">
                                        <i [class]="event.icon" style="color:#fff;font-size:13px"></i>
                                    </span>
                                </ng-template>
                                <ng-template #content let-event>
                                    <div style="padding:0 0 20px 6px">
                                        <p style="font-weight:700;margin:0 0 2px;font-size:14px;color:var(--text-color)">{{ event.status }}</p>
                                        <p style="font-size:11px;color:var(--text-color-secondary);margin:0 0 4px;font-weight:600">{{ event.date }}</p>
                                        <p style="font-size:13px;color:var(--text-color-secondary);margin:0;line-height:1.5">{{ event.description }}</p>
                                    </div>
                                </ng-template>
                            </p-timeline>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.vertical }}</pre></div>
                    </div>

                    <!-- Alternate -->
                    <div id="alternate" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Alternado</div>
                            <p class="demo-card-desc">Conteúdo alternado entre esquerda e direita com <code>align="alternate"</code>.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:24px;gap:0">
                            <p-timeline [value]="events" align="alternate" styleClass="w-full">
                                <ng-template #marker let-event>
                                    <span [style]="{'background':event.color,'border-radius':'50%','width':'28px','height':'28px','display':'flex','align-items':'center','justify-content':'center'}">
                                        <i [class]="event.icon" style="color:#fff;font-size:12px"></i>
                                    </span>
                                </ng-template>
                                <ng-template #content let-event>
                                    <div style="padding-bottom:16px">
                                        <p style="font-weight:700;margin:0;font-size:13px;color:var(--text-color)">{{ event.status }}</p>
                                        <p style="font-size:11px;color:var(--text-color-secondary);margin:0">{{ event.date }}</p>
                                    </div>
                                </ng-template>
                            </p-timeline>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.alternate }}</pre></div>
                    </div>

                    <!-- Horizontal -->
                    <div id="horizontal" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Horizontal</div>
                            <p class="demo-card-desc">Processo em etapas com <code>layout="horizontal"</code>. Ideal para wizards e fluxos lineares.</p>
                        </div>
                        <div class="demo-card-body" style="padding:32px 24px;justify-content:center">
                            <p-timeline [value]="steps" layout="horizontal" styleClass="w-full">
                                <ng-template #marker let-step>
                                    <span [style]="{'background':step.color,'border-radius':'50%','width':'32px','height':'32px','display':'flex','align-items':'center','justify-content':'center'}">
                                        <i [class]="step.icon" style="color:#fff;font-size:13px"></i>
                                    </span>
                                </ng-template>
                                <ng-template #content let-step>
                                    <p style="font-size:12px;font-weight:600;margin:6px 0 0;text-align:center;color:var(--text-color)">{{ step.label }}</p>
                                </ng-template>
                            </p-timeline>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.horizontal }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">Timeline — Propriedades</div>
                    <p-table [value]="propsTimeline" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
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
export class TimelineDemo {
    events = [
        { status: 'Pedido Recebido',  date: '15/01/2025 · 09:00', description: 'Protocolo #12345 registrado no sistema.', icon: 'pi pi-shopping-cart', color: '#3B82F6' },
        { status: 'Em Análise',       date: '15/01/2025 · 11:30', description: 'Documentos em verificação pela equipe técnica.', icon: 'pi pi-search', color: '#F59E0B' },
        { status: 'Aprovado',         date: '16/01/2025 · 08:15', description: 'Solicitação aprovada pelo responsável.', icon: 'pi pi-check', color: '#059669' },
        { status: 'Concluído',        date: '17/01/2025 · 14:00', description: 'Processo finalizado com sucesso.', icon: 'pi pi-flag', color: '#6366F1' },
    ];

    steps = [
        { label: 'Solicitação', icon: 'pi pi-file',   color: '#3B82F6' },
        { label: 'Análise',     icon: 'pi pi-search', color: '#F59E0B' },
        { label: 'Aprovação',   icon: 'pi pi-check',  color: '#059669' },
        { label: 'Publicação',  icon: 'pi pi-send',   color: '#6366F1' },
    ];

    code: any = {
        vertical: `<p-timeline [value]="events">
    <ng-template #marker let-event>
        <span [style]="{'background': event.color, 'border-radius': '50%',
                        'width': '32px', 'height': '32px',
                        'display': 'flex', 'align-items': 'center',
                        'justify-content': 'center'}">
            <i [class]="event.icon" style="color:#fff"></i>
        </span>
    </ng-template>
    <ng-template #content let-event>
        <p style="font-weight:700">{{ event.status }}</p>
        <small>{{ event.date }}</small>
    </ng-template>
</p-timeline>`,

        alternate: `<p-timeline [value]="events" align="alternate">
    <ng-template #content let-event>
        <p>{{ event.status }}</p>
        <small>{{ event.date }}</small>
    </ng-template>
</p-timeline>`,

        horizontal: `<p-timeline [value]="steps" layout="horizontal">
    <ng-template #marker let-step>
        <span [style]="{'background': step.color, 'border-radius': '50%',
                        'width': '32px', 'height': '32px', ...}">
            <i [class]="step.icon" style="color:#fff"></i>
        </span>
    </ng-template>
    <ng-template #content let-step>
        <p style="text-align:center">{{ step.label }}</p>
    </ng-template>
</p-timeline>`,
    };

    propsTimeline = [
        { name: 'value',      type: 'any[]',  default: 'null',     description: 'Array de eventos para renderizar.' },
        { name: 'layout',     type: 'string', default: 'vertical', description: 'Orientação: "vertical" ou "horizontal".' },
        { name: 'align',      type: 'string', default: 'left',     description: 'Alinhamento: "left" | "right" | "alternate".' },
        { name: 'dataKey',    type: 'string', default: 'null',     description: 'Campo usado como chave única.' },
        { name: 'styleClass', type: 'string', default: 'null',     description: 'Classe CSS extra no container.' },
    ];

    themeVars = [
        { variable: '--p-timeline-event-marker-background',   description: 'Fundo do marcador.' },
        { variable: '--p-timeline-event-marker-border-color', description: 'Borda do marcador.' },
        { variable: '--p-timeline-event-marker-size',         description: 'Tamanho do marcador.' },
        { variable: '--p-timeline-event-connector-color',     description: 'Cor da linha conectora.' },
        { variable: '--p-timeline-event-connector-size',      description: 'Espessura da linha conectora.' },
    ];
}
