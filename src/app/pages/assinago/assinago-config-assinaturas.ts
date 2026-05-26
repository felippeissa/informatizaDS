import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';

interface MetodoAssinatura {
    id: string;
    nome: string;
    descricao: string;
    icon: string;
    iconBg: string;
    iconColor: string;
    ativo: boolean;
    info?: string;
}

@Component({
    selector: 'app-assinago-config-assinaturas',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, ToggleSwitchModule, DividerModule, TagModule],
    styles: [`
        :host { --assa-green: #3ACC75; }
        .page-header { margin-bottom: 28px; }
        .breadcrumb  { font-size: 12px; color: var(--text-color-secondary); margin-bottom: 4px; }
        .page-title  { font-size: 28px; font-weight: 800; color: var(--text-color); margin: 0; }
        .subtitle    { font-size: 14px; color: var(--text-color-secondary); margin: 8px 0 0; }

        .metodos-grid { display: flex; flex-direction: column; gap: 16px; max-width: 720px; }

        .metodo-card {
            background: var(--surface-card);
            border: 1px solid var(--surface-border);
            border-radius: 12px;
            padding: 24px;
            display: flex;
            align-items: center;
            gap: 20px;
            transition: border-color .15s;
        }
        .metodo-card.ativo { border-color: color-mix(in srgb, #3ACC75 40%, transparent); }

        .metodo-icon {
            width: 56px; height: 56px; border-radius: 14px;
            display: flex; align-items: center; justify-content: center;
            font-size: 22px; flex-shrink: 0;
        }
        .metodo-body { flex: 1; min-width: 0; }
        .metodo-nome { font-size: 15px; font-weight: 700; color: var(--text-color); margin: 0 0 4px; }
        .metodo-desc { font-size: 13px; color: var(--text-color-secondary); margin: 0; }
        .metodo-info {
            font-size: 11px; color: var(--text-color-secondary);
            margin-top: 8px; padding: 6px 10px;
            background: var(--surface-ground); border-radius: 6px;
            display: inline-block;
        }

        .section-title {
            font-size: 13px; font-weight: 700;
            color: var(--text-color-secondary);
            text-transform: uppercase;
            letter-spacing: .06em;
            margin: 28px 0 12px;
        }
    `],
    template: `
        <div class="page-header">
            <div class="breadcrumb">Configurações › Assinaturas</div>
            <h1 class="page-title">Métodos de assinatura</h1>
            <p class="subtitle">Habilite os métodos de assinatura disponíveis para os usuários do sistema.</p>
        </div>

        <div class="metodos-grid">
            @for (m of metodos; track m.id) {
                <div class="metodo-card" [class.ativo]="m.ativo">
                    <div class="metodo-icon" [style.background]="m.iconBg">
                        <i [class]="m.icon" [style.color]="m.iconColor"></i>
                    </div>

                    <div class="metodo-body">
                        <p class="metodo-nome">{{ m.nome }}</p>
                        <p class="metodo-desc">{{ m.descricao }}</p>
                        @if (m.info) {
                            <span class="metodo-info">{{ m.info }}</span>
                        }
                    </div>

                    <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
                        <span style="font-size:12px;color:var(--text-color-secondary)">
                            {{ m.ativo ? 'Ativo' : 'Inativo' }}
                        </span>
                        <p-toggleswitch [(ngModel)]="m.ativo" />
                    </div>
                </div>
            }
        </div>

        <div class="section-title">Configurações gerais</div>

        <div style="background:var(--surface-card);border:1px solid var(--surface-border);border-radius:12px;overflow:hidden;max-width:720px">
            <div style="display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--surface-border)">
                <div>
                    <div style="font-size:14px;font-weight:700;color:var(--text-color);margin-bottom:2px">
                        Exigir assinatura de todos os assinadores
                    </div>
                    <div style="font-size:12px;color:var(--text-color-secondary)">
                        O documento só é considerado assinado quando todos os assinadores concluírem.
                    </div>
                </div>
                <p-toggleswitch [(ngModel)]="exigirTodos" />
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:20px 24px">
                <div>
                    <div style="font-size:14px;font-weight:700;color:var(--text-color);margin-bottom:2px">
                        Notificar por e-mail ao enviar para assinatura
                    </div>
                    <div style="font-size:12px;color:var(--text-color-secondary)">
                        Envia e-mail automático para cada assinador ao criar o documento.
                    </div>
                </div>
                <p-toggleswitch [(ngModel)]="notificarEmail" />
            </div>
        </div>

        <div style="margin-top:24px;max-width:720px">
            <p-button
                label="Salvar configurações"
                icon="pi pi-check"
                [style]="{'background':'#3ACC75','border-color':'#3ACC75'}"
                (click)="salvar()"
            />
        </div>
    `
})
export class AssinagoConfigAssinaturas {
    metodos: MetodoAssinatura[] = [
        {
            id: 'token',
            nome: 'Token de e-mail',
            descricao: 'O assinador recebe um código de 6 dígitos por e-mail e confirma a assinatura digitando-o.',
            icon: 'pi pi-envelope',
            iconBg: 'color-mix(in srgb, #3ACC75 12%, transparent)',
            iconColor: '#059669',
            ativo: true,
            info: 'Sem necessidade de hardware ou certificado externo.',
        },
        {
            id: 'certificado',
            nome: 'Certificado digital (ICP-Brasil)',
            descricao: 'Assinatura com certificado A1 (arquivo .pfx) ou A3 (token USB/cartão) homologado pela ICP-Brasil.',
            icon: 'pi pi-id-card',
            iconBg: 'color-mix(in srgb, #2563EB 12%, transparent)',
            iconColor: '#2563EB',
            ativo: true,
            info: 'Recomendado para documentos com validade jurídica plena.',
        },
        {
            id: 'govbr',
            nome: 'Gov.br',
            descricao: 'Autenticação e assinatura via conta Gov.br utilizando o nível Prata ou Ouro do usuário.',
            icon: 'pi pi-shield',
            iconBg: 'color-mix(in srgb, #1755A3 12%, transparent)',
            iconColor: '#1755A3',
            ativo: false,
            info: 'Requer integração ativa com a plataforma Gov.br.',
        },
    ];

    exigirTodos    = true;
    notificarEmail = true;

    salvar() { /* mock */ alert('Configurações salvas!'); }
}
