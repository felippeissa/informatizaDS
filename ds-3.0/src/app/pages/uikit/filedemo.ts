import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { DEMO_STYLES } from './demo-shared.styles';

@Component({
    selector: 'app-file-demo',
    standalone: true,
    imports: [CommonModule, FileUploadModule, ToastModule, ButtonModule, TabsModule, TableModule],
    providers: [MessageService],
    styles: [DEMO_STYLES],
    template: `
        <div class="comp-header">
            <h1 class="comp-name">FileUpload</h1>
            <p class="comp-desc">Componente para seleção e envio de arquivos com suporte a drag-and-drop, múltiplos arquivos e validação.</p>
            <div class="import-snippet">
                <span class="tok-kw">import</span><span class="tok-pt">&nbsp;&#123;&nbsp;</span><span class="tok-id">FileUploadModule</span><span class="tok-pt">&nbsp;&#125;&nbsp;</span><span class="tok-kw">from</span><span class="tok-str">&nbsp;'primeng/fileupload'</span><span class="tok-pt">;</span>
            </div>
        </div>

        <p-toast />

        <p-tabs value="features" styleClass="mt-1">
            <p-tablist>
                <p-tab value="features">Features</p-tab>
                <p-tab value="api">API</p-tab>
                <p-tab value="theming">Theming</p-tab>
            </p-tablist>
            <p-tabpanels>
                <p-tabpanel value="features"><div style="padding:20px 0">

                    <!-- Basic -->
                    <div id="basic" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Basic</div>
                            <p class="demo-card-desc">Modo simples com um único botão. Use <code>mode="basic"</code> para uma interface compacta.</p>
                        </div>
                        <div class="demo-card-body" style="gap:16px;align-items:center">
                            <p-fileupload #fuBasic mode="basic"
                                          chooseLabel="Escolher arquivo"
                                          chooseIcon="pi pi-upload"
                                          name="demo[]"
                                          accept="image/*,application/pdf"
                                          [maxFileSize]="5000000"
                                          (onSelect)="onSelectBasic($event)" />
                            <p style="font-size:12px;color:var(--text-color-secondary);margin:0">
                                {{ uploadedBasic ? 'Arquivo: ' + uploadedBasic : 'Nenhum arquivo selecionado' }}
                            </p>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.basic }}</pre></div>
                    </div>

                    <!-- Advanced -->
                    <div id="advanced" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Advanced</div>
                            <p class="demo-card-desc">Modo completo com área de drag-and-drop, lista de arquivos selecionados e botões de ação.</p>
                        </div>
                        <div class="demo-card-body col" style="padding:20px;gap:0">
                            <p-fileupload name="demo[]"
                                          [multiple]="true"
                                          accept="image/*,application/pdf"
                                          [maxFileSize]="5000000"
                                          mode="advanced"
                                          chooseLabel="Escolher"
                                          uploadLabel="Enviar"
                                          cancelLabel="Cancelar"
                                          (onSelect)="onSelectAdvanced($event)"
                                          styleClass="w-full">
                                <ng-template #empty>
                                    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:20px;color:var(--text-color-secondary)">
                                        <i class="pi pi-cloud-upload" style="font-size:2.5rem;color:var(--primary-color)"></i>
                                        <p style="margin:0;font-size:14px">Arraste arquivos aqui ou clique para selecionar</p>
                                        <p style="margin:0;font-size:12px">PDF, imagens — máx. 5 MB</p>
                                    </div>
                                </ng-template>
                            </p-fileupload>
                        </div>
                        <div class="demo-card-code"><pre>{{ code.advanced }}</pre></div>
                    </div>

                    <!-- Auto Upload -->
                    <div id="auto" class="demo-card">
                        <div class="demo-card-head">
                            <div class="demo-card-title">Auto Upload</div>
                            <p class="demo-card-desc">Com <code>[auto]="true"</code> o envio ocorre automaticamente após a seleção do arquivo.</p>
                        </div>
                        <div class="demo-card-body" style="gap:12px;align-items:center">
                            <p-fileupload mode="basic"
                                          chooseLabel="Envio automático"
                                          chooseIcon="pi pi-upload"
                                          name="demo[]"
                                          [auto]="true"
                                          accept="image/*"
                                          (onSelect)="onSelectAuto($event)"
                                          severity="secondary" />
                        </div>
                        <div class="demo-card-code"><pre>{{ code.auto }}</pre></div>
                    </div>

                </div></p-tabpanel>

                <p-tabpanel value="api"><div style="padding:16px 0">
                    <div class="api-block-title">FileUpload — Propriedades</div>
                    <p-table [value]="propsFileUpload" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:180px">Nome</th><th style="width:130px">Tipo</th><th style="width:110px">Padrão</th><th>Descrição</th></tr>
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

                    <div class="api-block-title" style="margin-top:24px">FileUpload — Eventos</div>
                    <p-table [value]="eventsFileUpload" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'100%'}">
                        <ng-template pTemplate="header">
                            <tr><th style="width:180px">Evento</th><th style="width:160px">Parâmetro</th><th>Descrição</th></tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-r>
                            <tr>
                                <td><strong style="font-family:monospace;font-size:13px">{{ r.name }}</strong></td>
                                <td><span class="badge-type">{{ r.type }}</span></td>
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
export class FileDemo {
    uploadedBasic = '';

    constructor(private messageService: MessageService) {}

    onSelectBasic(event: any) {
        if (event.files?.length) {
            this.uploadedBasic = event.files[0].name;
            this.messageService.add({ severity: 'info', summary: 'Arquivo selecionado', detail: event.files[0].name, life: 3000 });
        }
    }

    onSelectAdvanced(event: any) {
        this.messageService.add({ severity: 'success', summary: `${event.files.length} arquivo(s) selecionado(s)`, life: 3000 });
    }

    onSelectAuto(event: any) {
        if (event.files?.length) {
            this.messageService.add({ severity: 'success', summary: 'Enviado automaticamente', detail: event.files[0].name, life: 3000 });
        }
    }

    code: any = {
        basic: `<p-fileupload mode="basic"
             chooseLabel="Escolher arquivo"
             chooseIcon="pi pi-upload"
             name="demo[]"
             accept="image/*,application/pdf"
             [maxFileSize]="5000000"
             (onSelect)="onSelect($event)" />`,

        advanced: `<p-fileupload name="demo[]"
             [multiple]="true"
             accept="image/*"
             [maxFileSize]="5000000"
             mode="advanced"
             (onSelect)="onSelect($event)">
    <ng-template #empty>
        <div>Arraste arquivos aqui</div>
    </ng-template>
</p-fileupload>`,

        auto: `<!-- Envia automaticamente ao selecionar -->
<p-fileupload mode="basic"
             chooseLabel="Envio automático"
             name="demo[]"
             [auto]="true"
             accept="image/*"
             (onSelect)="onSelect($event)" />`,
    };

    propsFileUpload = [
        { name: 'name',          type: 'string',  default: 'null',     description: 'Nome do campo para envio HTTP.' },
        { name: 'url',           type: 'string',  default: 'null',     description: 'URL de destino para upload.' },
        { name: 'mode',          type: 'string',  default: 'advanced', description: '"basic" ou "advanced".' },
        { name: 'multiple',      type: 'boolean', default: 'false',    description: 'Permite múltiplos arquivos.' },
        { name: 'accept',        type: 'string',  default: 'null',     description: 'Tipos aceitos (ex: "image/*").' },
        { name: 'maxFileSize',   type: 'number',  default: 'null',     description: 'Tamanho máximo em bytes.' },
        { name: 'auto',          type: 'boolean', default: 'false',    description: 'Envia automaticamente ao selecionar.' },
        { name: 'chooseLabel',   type: 'string',  default: 'Choose',   description: 'Texto do botão de escolha.' },
        { name: 'uploadLabel',   type: 'string',  default: 'Upload',   description: 'Texto do botão de envio.' },
        { name: 'cancelLabel',   type: 'string',  default: 'Cancel',   description: 'Texto do botão de cancelar.' },
    ];

    eventsFileUpload = [
        { name: '(onSelect)',    type: 'FileSelectEvent',  description: 'Disparado ao selecionar arquivo(s).' },
        { name: '(onUpload)',    type: 'FileUploadEvent',  description: 'Disparado após upload bem-sucedido.' },
        { name: '(onError)',     type: 'FileUploadErrorEvent', description: 'Disparado em caso de erro.' },
        { name: '(onClear)',     type: 'Event',            description: 'Disparado ao limpar a lista.' },
        { name: '(onRemove)',    type: 'FileRemoveEvent',  description: 'Disparado ao remover um arquivo.' },
    ];

    themeVars = [
        { variable: '--p-fileupload-header-background',  description: 'Fundo do cabeçalho.' },
        { variable: '--p-fileupload-content-background', description: 'Fundo da área de conteúdo.' },
        { variable: '--p-fileupload-content-border-color', description: 'Borda da área de conteúdo.' },
        { variable: '--p-fileupload-file-border-color',  description: 'Borda de cada arquivo listado.' },
        { variable: '--p-fileupload-border-color',       description: 'Borda geral do componente.' },
    ];
}
