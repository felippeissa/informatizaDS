import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';

interface ValidacaoResult {
    status: 'sucesso' | 'erro';
    codigo: string;
    titulo?: string;
    bloco?: string;
    assinadores?: string[];
    dataAssinatura?: string;
}

const CODIGOS_VALIDOS: Record<string, ValidacaoResult> = {
    'ASSA-2024-001': {
        status: 'sucesso', codigo: 'ASSA-2024-001',
        titulo: 'Portaria de contratação 2000',
        bloco: 'SIS - Contratação',
        assinadores: ['Ana Paula', 'Bruno Lima', 'Carla Dias', 'Daniel S.'],
        dataAssinatura: '03/12/2024 10:00:00',
    },
    'ASSA-2024-014': {
        status: 'sucesso', codigo: 'ASSA-2024-014',
        titulo: 'Nota de empenho 2024/4521',
        bloco: 'SEFAZ - Financeiro',
        assinadores: ['Helena N.'],
        dataAssinatura: '22/12/2024 11:00:00',
    },
    'ASSA-2024-015': {
        status: 'sucesso', codigo: 'ASSA-2024-015',
        titulo: 'Ordem de pagamento 888',
        bloco: 'SEFAZ - Financeiro',
        assinadores: ['Igor O.', 'Joana P.'],
        dataAssinatura: '28/12/2024 16:00:00',
    },
};

@Component({
    selector: 'app-assinago-validar-documento',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, IconFieldModule, InputIconModule, ProgressSpinnerModule, DividerModule],
    styles: [`
        :host { --assa-green: #3ACC75; }
        .page-header { margin-bottom: 28px; }
        .breadcrumb  { font-size: 12px; color: var(--text-color-secondary); margin-bottom: 4px; }
        .page-title  { font-size: 28px; font-weight: 800; color: var(--text-color); margin: 0; }

        .card {
            background: var(--surface-card);
            border: 1px solid var(--surface-border);
            border-radius: 12px;
            padding: 40px;
            max-width: 640px;
        }

        .result-card {
            border-radius: 10px;
            padding: 24px;
            margin-top: 24px;
        }
        .result-card.sucesso {
            background: #F0FDF4;
            border: 1px solid #86EFAC;
        }
        .result-card.erro {
            background: #FEF2F2;
            border: 1px solid #FCA5A5;
        }
        .result-title { font-size: 15px; font-weight: 700; margin: 0 0 12px; }
        .result-row { display: flex; gap: 8px; font-size: 13px; margin-bottom: 6px; }
        .result-label { color: var(--text-color-secondary); width: 120px; flex-shrink: 0; font-weight: 600; }
        .result-value { color: var(--text-color); }
        .assinador-chip {
            display: inline-flex; align-items: center; gap: 6px;
            background: #fff; border: 1px solid #D1FAE5;
            border-radius: 20px; padding: 3px 10px; font-size: 12px;
            margin: 2px;
        }
    `],
    template: `
        <div class="page-header">
            <div class="breadcrumb">Validar documento</div>
            <h1 class="page-title">Validar documento</h1>
        </div>

        <div class="card">
            <p style="font-size:14px;color:var(--text-color-secondary);margin:0 0 24px">
                Digite o código de validação que aparece no rodapé do documento para verificar sua autenticidade.
            </p>

            <label style="font-size:12px;font-weight:700;color:var(--text-color-secondary);display:block;margin-bottom:6px">
                Código de validação
            </label>
            <div style="display:flex;gap:10px">
                <p-iconfield style="flex:1">
                    <p-inputicon styleClass="pi pi-qrcode" />
                    <input
                        pInputText
                        [(ngModel)]="codigo"
                        placeholder="Ex: ASSA-2024-001"
                        style="width:100%;text-transform:uppercase"
                        (keyup.enter)="validar()"
                    />
                </p-iconfield>
                <p-button
                    label="Validar"
                    icon="pi pi-search"
                    [style]="{'background':'#3ACC75','border-color':'#3ACC75'}"
                    [loading]="validando"
                    (click)="validar()"
                />
            </div>

            <p style="font-size:11px;color:var(--text-color-secondary);margin-top:8px">
                Tente: ASSA-2024-001 · ASSA-2024-014 · ASSA-2024-015
            </p>

            <!-- Loading -->
            @if (validando) {
                <div style="display:flex;align-items:center;gap:12px;margin-top:24px;color:var(--text-color-secondary)">
                    <p-progressSpinner strokeWidth="4" [style]="{'width':'28px','height':'28px'}" />
                    <span>Consultando autenticidade…</span>
                </div>
            }

            <!-- Result: success -->
            @if (resultado && resultado.status === 'sucesso') {
                <div class="result-card sucesso">
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
                        <div style="width:36px;height:36px;border-radius:50%;background:#DCFCE7;display:flex;align-items:center;justify-content:center">
                            <i class="pi pi-check" style="color:#059669;font-size:16px"></i>
                        </div>
                        <p class="result-title" style="color:#059669;margin:0">Documento autêntico e válido</p>
                    </div>
                    <div class="result-row">
                        <span class="result-label">Código:</span>
                        <span class="result-value" style="font-weight:700;font-family:monospace">{{ resultado.codigo }}</span>
                    </div>
                    <div class="result-row">
                        <span class="result-label">Documento:</span>
                        <span class="result-value">{{ resultado.titulo }}</span>
                    </div>
                    <div class="result-row">
                        <span class="result-label">Bloco:</span>
                        <span class="result-value">{{ resultado.bloco }}</span>
                    </div>
                    <div class="result-row">
                        <span class="result-label">Assinado em:</span>
                        <span class="result-value">{{ resultado.dataAssinatura }}</span>
                    </div>
                    <div class="result-row">
                        <span class="result-label">Assinadores:</span>
                        <div>
                            @for (a of resultado.assinadores; track a) {
                                <span class="assinador-chip">
                                    <i class="pi pi-check-circle" style="color:#059669;font-size:11px"></i> {{ a }}
                                </span>
                            }
                        </div>
                    </div>
                </div>
            }

            <!-- Result: error -->
            @if (resultado && resultado.status === 'erro') {
                <div class="result-card erro">
                    <div style="display:flex;align-items:center;gap:10px">
                        <div style="width:36px;height:36px;border-radius:50%;background:#FEE2E2;display:flex;align-items:center;justify-content:center">
                            <i class="pi pi-times" style="color:#DC2626;font-size:16px"></i>
                        </div>
                        <div>
                            <p style="margin:0;font-weight:700;color:#DC2626">Documento não encontrado</p>
                            <p style="margin:4px 0 0;font-size:12px;color:#6B7280">
                                O código <strong>{{ resultado.codigo }}</strong> não corresponde a nenhum documento no sistema.
                            </p>
                        </div>
                    </div>
                </div>
            }
        </div>
    `
})
export class AssinagoValidarDocumento {
    codigo   = '';
    validando = false;
    resultado: ValidacaoResult | null = null;

    validar() {
        if (!this.codigo.trim()) return;
        this.resultado = null;
        this.validando = true;
        const chave = this.codigo.trim().toUpperCase();
        setTimeout(() => {
            this.validando = false;
            this.resultado = CODIGOS_VALIDOS[chave] ?? { status: 'erro', codigo: chave };
        }, 1200);
    }
}
