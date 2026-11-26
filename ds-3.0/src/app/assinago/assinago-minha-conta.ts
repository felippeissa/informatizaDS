import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-assinago-minha-conta',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, DividerModule, TagModule, ToastModule],
    providers: [MessageService],
    styles: [`
        :host { --assa-green: #3ACC75; }

        .page-header { margin-bottom: 28px; }
        .breadcrumb  { font-size: 12px; color: var(--text-color-secondary); margin-bottom: 4px; }
        .page-title  { font-size: 28px; font-weight: 800; color: var(--text-color); margin: 0; }

        .layout { display: grid; grid-template-columns: 280px 1fr; gap: 24px; align-items: start; }

        /* profile card */
        .profile-card {
            background: var(--surface-card);
            border: 1px solid var(--surface-border);
            border-radius: 12px;
            padding: 32px 24px;
            text-align: center;
        }
        .avatar-circle {
            width: 88px; height: 88px; border-radius: 50%;
            background: linear-gradient(135deg, #3ACC75 0%, #059669 100%);
            display: flex; align-items: center; justify-content: center;
            font-size: 28px; font-weight: 900; color: #fff;
            margin: 0 auto 16px;
            box-shadow: 0 4px 16px rgba(58,204,117,.35);
        }
        .profile-name { font-size: 17px; font-weight: 700; color: var(--text-color); margin: 0 0 4px; }
        .profile-cargo { font-size: 13px; color: var(--text-color-secondary); margin: 0 0 8px; }
        .profile-dept { font-size: 12px; color: var(--text-color-secondary); margin: 0 0 20px; }
        .profile-matricula {
            font-size: 11px; font-weight: 700; padding: 4px 10px;
            background: color-mix(in srgb, #3ACC75 12%, transparent);
            color: #059669; border-radius: 20px;
            display: inline-block; margin-bottom: 20px;
        }

        /* form section */
        .form-card {
            background: var(--surface-card);
            border: 1px solid var(--surface-border);
            border-radius: 12px;
            overflow: hidden;
        }
        .form-section-header {
            padding: 16px 24px;
            border-bottom: 1px solid var(--surface-border);
            font-size: 13px; font-weight: 700; color: var(--text-color);
            background: var(--surface-ground);
        }
        .form-section-body { padding: 0; }

        .field-row {
            display: flex; align-items: center;
            padding: 16px 24px;
            border-bottom: 1px solid var(--surface-border);
            gap: 12px;
        }
        .field-row:last-child { border-bottom: none; }
        .field-label {
            font-size: 12px; font-weight: 700;
            color: var(--text-color-secondary);
            width: 140px; flex-shrink: 0;
        }
        .field-value { flex: 1; font-size: 13px; color: var(--text-color); }
        .field-readonly { color: var(--text-color-secondary); font-style: italic; }
        .field-edit-area { flex: 1; display: flex; align-items: center; gap: 8px; }
        .field-edit-area input { flex: 1; }
    `],
    template: `
        <p-toast />

        <div class="page-header">
            <div class="breadcrumb">Minha conta</div>
            <h1 class="page-title">Minha conta</h1>
        </div>

        <div class="layout">
            <!-- ── Profile card ── -->
            <div class="profile-card">
                <div class="avatar-circle">{{ perfil.iniciais }}</div>
                <p class="profile-name">{{ perfil.nome }}</p>
                <p class="profile-cargo">{{ perfil.cargo }}</p>
                <p class="profile-dept">{{ perfil.departamento }}</p>
                <div class="profile-matricula">Matrícula {{ perfil.matricula }}</div>

                <p-button
                    label="Alterar foto"
                    icon="pi pi-camera"
                    severity="secondary"
                    [outlined]="true"
                    size="small"
                    styleClass="w-full"
                />
            </div>

            <!-- ── Form sections ── -->
            <div style="display:flex;flex-direction:column;gap:20px">

                <!-- Informações pessoais -->
                <div class="form-card">
                    <div class="form-section-header">Informações pessoais</div>
                    <div class="form-section-body">

                        <!-- Nome -->
                        <div class="field-row">
                            <span class="field-label">Nome completo</span>
                            <span class="field-value field-readonly">{{ perfil.nome }}</span>
                        </div>

                        <!-- Matrícula -->
                        <div class="field-row">
                            <span class="field-label">Matrícula</span>
                            <span class="field-value field-readonly">{{ perfil.matricula }}</span>
                        </div>

                        <!-- Cargo -->
                        <div class="field-row">
                            <span class="field-label">Cargo</span>
                            <span class="field-value field-readonly">{{ perfil.cargo }}</span>
                        </div>

                        <!-- Departamento -->
                        <div class="field-row">
                            <span class="field-label">Departamento</span>
                            <span class="field-value field-readonly">{{ perfil.departamento }}</span>
                        </div>

                    </div>
                </div>

                <!-- Contato -->
                <div class="form-card">
                    <div class="form-section-header">Informações de contato</div>
                    <div class="form-section-body">

                        <!-- E-mail -->
                        <div class="field-row">
                            <span class="field-label">E-mail</span>
                            @if (!editandoEmail) {
                                <span class="field-value">{{ perfil.email }}</span>
                                <p-button
                                    label="Editar"
                                    icon="pi pi-pencil"
                                    severity="secondary"
                                    [text]="true"
                                    size="small"
                                    (click)="editarEmail()"
                                />
                            } @else {
                                <div class="field-edit-area">
                                    <input pInputText [(ngModel)]="novoEmail" type="email" />
                                    <p-button label="Salvar" size="small"
                                        [style]="{'background':'#3ACC75','border-color':'#3ACC75'}"
                                        (click)="salvarEmail()" />
                                    <p-button label="Cancelar" severity="secondary" [outlined]="true" size="small"
                                        (click)="editandoEmail = false" />
                                </div>
                            }
                        </div>

                        <!-- Telefone -->
                        <div class="field-row">
                            <span class="field-label">Telefone</span>
                            @if (!editandoTelefone) {
                                <span class="field-value">{{ perfil.telefone }}</span>
                                <p-button
                                    label="Editar"
                                    icon="pi pi-pencil"
                                    severity="secondary"
                                    [text]="true"
                                    size="small"
                                    (click)="editarTelefone()"
                                />
                            } @else {
                                <div class="field-edit-area">
                                    <input pInputText [(ngModel)]="novoTelefone" type="tel" />
                                    <p-button label="Salvar" size="small"
                                        [style]="{'background':'#3ACC75','border-color':'#3ACC75'}"
                                        (click)="salvarTelefone()" />
                                    <p-button label="Cancelar" severity="secondary" [outlined]="true" size="small"
                                        (click)="editandoTelefone = false" />
                                </div>
                            }
                        </div>

                    </div>
                </div>

                <!-- Segurança -->
                <div class="form-card">
                    <div class="form-section-header">Segurança</div>
                    <div class="form-section-body">
                        <div class="field-row">
                            <span class="field-label">Senha</span>
                            <span class="field-value">••••••••••••</span>
                            <p-button
                                label="Alterar senha"
                                icon="pi pi-lock"
                                severity="secondary"
                                [outlined]="true"
                                size="small"
                                (click)="senhaVisible = true"
                            />
                        </div>
                        <div class="field-row">
                            <span class="field-label">Último acesso</span>
                            <span class="field-value field-readonly">26/05/2026 — 09:14</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- ── Alterar senha (inline) ── -->
        @if (senhaVisible) {
            <div style="position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center">
                <div style="background:var(--surface-card);border-radius:12px;padding:32px;width:400px">
                    <h3 style="margin:0 0 20px;font-size:16px;font-weight:700">Alterar senha</h3>
                    <div style="display:flex;flex-direction:column;gap:12px">
                        <div>
                            <label style="font-size:12px;font-weight:700;color:var(--text-color-secondary)">Senha atual</label>
                            <input pInputText [(ngModel)]="senhaAtual" type="password" class="w-full mt-1" />
                        </div>
                        <div>
                            <label style="font-size:12px;font-weight:700;color:var(--text-color-secondary)">Nova senha</label>
                            <input pInputText [(ngModel)]="senhaNova" type="password" class="w-full mt-1" />
                        </div>
                        <div>
                            <label style="font-size:12px;font-weight:700;color:var(--text-color-secondary)">Confirmar nova senha</label>
                            <input pInputText [(ngModel)]="senhaConfirm" type="password" class="w-full mt-1" />
                        </div>
                    </div>
                    <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:20px">
                        <p-button label="Cancelar" severity="secondary" [outlined]="true" (click)="senhaVisible = false" />
                        <p-button label="Salvar" [style]="{'background':'#3ACC75','border-color':'#3ACC75'}" (click)="salvarSenha()" />
                    </div>
                </div>
            </div>
        }
    `
})
export class AssinagoMinhaConta {
    perfil = {
        iniciais: 'FL',
        nome: 'Felipe Luiz da Silva',
        cargo: 'Administrador',
        departamento: 'SETIN — Secretaria de TI',
        email: 'felipe.luiz@setin.gov.br',
        telefone: '(82) 3315-4400',
        matricula: '1234567',
    };

    editandoEmail    = false;
    editandoTelefone = false;
    novoEmail        = '';
    novoTelefone     = '';

    senhaVisible  = false;
    senhaAtual    = '';
    senhaNova     = '';
    senhaConfirm  = '';

    editarEmail()    { this.novoEmail    = this.perfil.email;    this.editandoEmail    = true; }
    editarTelefone() { this.novoTelefone = this.perfil.telefone; this.editandoTelefone = true; }

    salvarEmail()    { this.perfil.email    = this.novoEmail;    this.editandoEmail    = false; }
    salvarTelefone() { this.perfil.telefone = this.novoTelefone; this.editandoTelefone = false; }

    salvarSenha() {
        /* mock: just close */
        this.senhaVisible  = false;
        this.senhaAtual    = '';
        this.senhaNova     = '';
        this.senhaConfirm  = '';
    }
}
