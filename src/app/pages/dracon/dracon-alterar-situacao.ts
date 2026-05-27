import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

const MOCK_ATOS_MAP: Record<number, any> = {
    1:  { processoDracon: '2025000089', tipoModelo: 'Autógrafo de Lei (Sanção) via SEI', dataCriacao: '10/01/2025', dataConclusao: '10/04/2025', unidade: 'Setor de TI - SEAD', responsavel: 'João da Silva Pereira', situacao: 'Em elaboração', prioridade: 'Urgente' },
    2:  { processoDracon: '2025000102', tipoModelo: 'Portaria de designação — modelo padrão', dataCriacao: '12/01/2025', dataConclusao: '12/03/2025', unidade: 'Gerência de RH - SEAD', responsavel: 'Maria Souza da Silva', situacao: 'Publicado', prioridade: 'Alta' },
    3:  { processoDracon: '2025000118', tipoModelo: 'Instrução Normativa TI — modelo 2025', dataCriacao: '15/01/2025', dataConclusao: '15/04/2025', unidade: 'SECTEC - Assessoria', responsavel: 'Carlos Eduardo Martins', situacao: 'Em análise', prioridade: 'Alta' },
    4:  { processoDracon: '2025000137', tipoModelo: 'Resolução de gestão de riscos', dataCriacao: '18/01/2025', dataConclusao: '18/04/2025', unidade: 'Controladoria Geral', responsavel: 'Ana Paula Rodrigues', situacao: 'Cancelado', prioridade: 'Urgente' },
    5:  { processoDracon: '2025000154', tipoModelo: 'Despacho de autorização', dataCriacao: '20/01/2025', dataConclusao: '20/04/2025', unidade: 'SEAD - Licitações', responsavel: 'Roberto Ferreira Neto', situacao: 'Em elaboração', prioridade: 'Média' },
};

@Component({
    selector: 'app-dracon-alterar-situacao',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, SelectModule, TextareaModule, FileUploadModule, DialogModule, ToastModule],
    providers: [MessageService],
    styles: [`
        :host { --dracon: #1755A3; }
        .page-header { margin-bottom: 28px; }
        .breadcrumb  { font-size: 12px; color: var(--text-color-secondary); margin-bottom: 4px; }
        .page-title  { font-size: 28px; font-weight: 800; color: var(--text-color); margin: 0; }

        .form-card {
            background: var(--surface-card);
            border: 1px solid var(--surface-border);
            border-radius: 12px;
            padding: 28px;
            max-width: 820px;
        }
        .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px 24px; }
        .form-field { display:flex; flex-direction:column; gap:6px; margin-bottom:16px; }
        .form-field.full { grid-column: 1 / -1; }
        .form-field label { font-size:12px; font-weight:700; color:var(--text-color-secondary); }
        .readonly-value {
            padding: 8px 12px;
            background: var(--surface-ground);
            border: 1px solid var(--surface-border);
            border-radius: var(--border-radius, 6px);
            font-size: 13px; color: var(--text-color);
            min-height: 38px; display:flex; align-items:center;
        }
        .section-title {
            font-size: 11px; font-weight: 700; text-transform: uppercase;
            letter-spacing: .07em; color: var(--text-color-secondary);
            margin: 24px 0 16px;
        }
        .action-bar { display:flex; justify-content:flex-end; gap:10px; margin-top:24px; }
    `],
    template: `
        <p-toast />
        <div class="page-header">
            <div class="breadcrumb">Atos › Listagem › Alterar situação ou responsável</div>
            <h1 class="page-title">Alterar situação e responsável pelo ato</h1>
        </div>

        <div class="form-card">
            <div class="form-grid">
                <!-- Número do ato -->
                <div class="form-field">
                    <label>Número do ato</label>
                    <div class="readonly-value">{{ ato.processoDracon }}</div>
                </div>

                <!-- Situação do ato -->
                <div class="form-field">
                    <label>Situação do ato</label>
                    <p-select [(ngModel)]="form.situacao" [options]="situacaoOpts"
                        placeholder="Selecione a situação" (onChange)="onSituacaoChange()" />
                </div>

                <!-- Tipo modelo ato -->
                <div class="form-field full">
                    <label>Tipo modelo ato</label>
                    <div class="readonly-value">{{ ato.tipoModelo }}</div>
                </div>

                <!-- Datas -->
                <div class="form-field">
                    <label>Data de criação</label>
                    <div class="readonly-value">{{ ato.dataCriacao }}</div>
                </div>
                <div class="form-field">
                    <label>Data de conclusão</label>
                    <div class="readonly-value">{{ ato.dataConclusao }}</div>
                </div>

                <!-- Responsável -->
                <div class="form-field full">
                    <label>Responsável</label>
                    <input pInputText [(ngModel)]="form.responsavel"
                        placeholder="Mínimo 4 caracteres de nome ou CPF completo" />
                </div>

                <!-- Prioridade -->
                <div class="form-field">
                    <label>Prioridade</label>
                    <p-select [(ngModel)]="form.prioridade" [options]="prioridadeOpts" placeholder="Selecione" />
                </div>

                <!-- Unidade -->
                <div class="form-field">
                    <label>Unidade / Setor</label>
                    <div class="readonly-value">{{ ato.unidade }}</div>
                </div>
            </div>

            <!-- Upload -->
            <div class="section-title">Documentos</div>
            <p-fileupload
                name="docs"
                [multiple]="true"
                chooseLabel="Selecionar arquivos"
                uploadLabel="Enviar"
                cancelLabel="Cancelar"
                [showUploadButton]="false"
                [style]="{'width':'100%'}"
            >
                <ng-template #empty>
                    <div style="padding:20px;text-align:center;color:var(--text-color-secondary);font-size:13px">
                        <i class="pi pi-upload" style="font-size:28px;display:block;margin-bottom:8px;opacity:.4"></i>
                        Escolha os documentos ou arraste aqui
                    </div>
                </ng-template>
            </p-fileupload>

            <!-- Actions -->
            <div class="action-bar">
                <p-button label="Voltar" severity="secondary" [outlined]="true" icon="pi pi-arrow-left"
                    (click)="voltar()" />
                <p-button label="Salvar" icon="pi pi-check"
                    [style]="{'background':'#1755A3','border-color':'#1755A3'}"
                    (click)="salvar()" />
            </div>
        </div>

        <!-- ─── Modal: Cancelar ato ─── -->
        <p-dialog
            [(visible)]="cancelarVisible"
            header="Cancelar ato"
            [modal]="true"
            [draggable]="false"
            [style]="{'width':'460px'}"
        >
            <p style="font-size:13px;color:var(--text-color-secondary);margin:0 0 16px">
                Informe o motivo do cancelamento. Esta ação não poderá ser desfeita.
            </p>
            <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:4px">
                <label style="font-size:12px;font-weight:700;color:var(--text-color-secondary)">
                    Motivo do cancelamento *
                </label>
                <textarea pTextarea [(ngModel)]="cancelarMotivo" rows="4"
                    placeholder="Digite uma descrição…" style="width:100%;resize:vertical"
                    [maxlength]="300"></textarea>
                <span style="font-size:11px;color:var(--text-color-secondary);text-align:right">
                    {{ cancelarMotivo.length }}/300
                </span>
            </div>

            <ng-template #footer>
                <p-button label="Cancelar" severity="secondary" [outlined]="true"
                    (click)="cancelarVisible=false; form.situacao=ato.situacao" />
                <p-button label="Confirmar" severity="danger" icon="pi pi-times"
                    [disabled]="!cancelarMotivo.trim()"
                    (click)="confirmarCancelamento()" />
            </ng-template>
        </p-dialog>
    `
})
export class DraconAlterarSituacao implements OnInit {
    private toast  = inject(MessageService);
    private route  = inject(ActivatedRoute);
    private router = inject(Router);

    ato: any = {};
    form = { situacao: '', responsavel: '', prioridade: '' };

    cancelarVisible = false;
    cancelarMotivo  = '';

    situacaoOpts  = ['Em elaboração', 'Em análise', 'Publicado', 'Aprovado', 'Cancelamento'].map(v => ({ label: v, value: v }));
    prioridadeOpts = ['Baixa', 'Média', 'Alta', 'Urgente', 'Prioritário'].map(v => ({ label: v, value: v }));

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id')) || 1;
        const data = MOCK_ATOS_MAP[id] ?? MOCK_ATOS_MAP[1];
        this.ato  = data;
        this.form = { situacao: data.situacao, responsavel: data.responsavel, prioridade: data.prioridade };
    }

    onSituacaoChange() {
        if (this.form.situacao === 'Cancelamento') {
            this.cancelarMotivo = '';
            this.cancelarVisible = true;
        }
    }

    confirmarCancelamento() {
        this.cancelarVisible = false;
        this.toast.add({ severity: 'success', summary: 'Ato cancelado com sucesso!', detail: `Motivo: ${this.cancelarMotivo}`, life: 4000 });
        setTimeout(() => this.router.navigate(['/dracon/atos']), 1800);
    }

    salvar() {
        this.toast.add({ severity: 'success', summary: 'Ato alterado com sucesso!', detail: 'As informações foram salvas.', life: 3000 });
        setTimeout(() => this.router.navigate(['/dracon/atos']), 1500);
    }

    voltar() { this.router.navigate(['/dracon/atos']); }
}
