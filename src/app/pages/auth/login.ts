import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RippleModule, MessageModule, CommonModule],
    styles: [`
        :host { display: block; }
        .login-page {
            min-height: 100vh;
            background-color: #ECFDF5;
            display: flex;
            flex-direction: column;
        }
        .a11y-bar {
            background: #fff;
            border-bottom: 1px solid #E5E7EB;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 24px;
            font-size: 11px;
            font-weight: 700;
            color: #111;
            flex-shrink: 0;
        }
        .a11y-right { display: flex; align-items: center; gap: 10px; }
        .a11y-btn {
            background: none; border: none; cursor: pointer;
            font-weight: 700; color: #111; padding: 2px 5px;
            border-radius: 4px; line-height: 1;
        }
        .a11y-btn:hover { background: #F3F4F6; }
        .a11y-sep { width: 1px; height: 16px; background: #D1D5DB; }
        .a11y-toggle {
            display: flex; align-items: center; gap: 4px;
            font-size: 11px; font-weight: 700; cursor: pointer;
            background: none; border: none; color: #111;
            padding: 2px 5px; border-radius: 4px;
        }
        .a11y-toggle:hover { background: #F3F4F6; }
        .login-body {
            flex: 1; display: flex;
            align-items: center; justify-content: center;
            padding: 40px 16px;
        }
        .login-card {
            background: #fff;
            border: 1px solid #D1FAE5;
            border-radius: 12px;
            padding: 36px 32px 28px;
            width: 100%; max-width: 360px;
            box-shadow: 0 4px 24px rgba(16, 185, 129, 0.08);
        }
        .logo-wrap {
            display: flex; flex-direction: column;
            align-items: center; margin-bottom: 28px;
        }
        .logo-sub { font-size: 10px; font-weight: 700; letter-spacing: .15em; color: #059669; text-transform: uppercase; }
        .logo-main { font-size: 28px; font-weight: 900; letter-spacing: -.02em; color: #059669; line-height: 1; }
        .logo-main span { color: #D97706; }
        .logo-lines { margin-top: 5px; display: flex; flex-direction: column; gap: 2px; align-items: center; }
        .logo-line { background: #D97706; border-radius: 2px; }
        .logo-line:nth-child(1) { width: 48px; height: 3px; }
        .logo-line:nth-child(2) { width: 36px; height: 3px; }
        .logo-line:nth-child(3) { width: 24px; height: 3px; }
        .field { margin-bottom: 16px; }
        .field label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }
        .remember-row { display: flex; align-items: center; justify-content: space-between; margin: 4px 0 20px; }
        .remember-label { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #374151; cursor: pointer; }
        .recover { font-size: 13px; color: #059669; font-weight: 600; background: none; border: none; cursor: pointer; padding: 0; }
        .recover:hover { text-decoration: underline; }
        .btn-entrar { width: 100%; background: #059669 !important; border-color: #059669 !important; font-weight: 700 !important; padding: 10px !important; border-radius: 8px !important; font-size: 15px !important; }
        .btn-entrar:hover { background: #047857 !important; border-color: #047857 !important; }
        .ou { text-align: center; color: #9CA3AF; font-size: 13px; margin: 16px 0; position: relative; }
        .ou::before, .ou::after { content: ''; position: absolute; top: 50%; width: 42%; height: 1px; background: #E5E7EB; }
        .ou::before { left: 0; } .ou::after { right: 0; }
        .btn-social {
            width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;
            background: #fff !important; border: 1.5px solid #D1D5DB !important; color: #374151 !important;
            font-weight: 600 !important; font-size: 13px !important; padding: 9px !important;
            border-radius: 8px !important; margin-bottom: 10px; cursor: pointer;
        }
        .btn-social:hover { background: #F9FAFB !important; }
        .btn-social:last-of-type { margin-bottom: 0; }
        .govbr { font-size: 11px; font-weight: 900; background: #1351B4; color: #fff; padding: 2px 5px; border-radius: 3px; }
        .id-goias { width: 20px; height: 20px; background: #059669; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 9px; font-weight: 900; }
        .policy { margin-top: 20px; font-size: 10px; color: #9CA3AF; text-align: center; line-height: 1.5; }
        .policy a { color: #6B7280; font-weight: 600; cursor: pointer; }
        .error-msg { margin-bottom: 14px; }
        ::ng-deep .login-card .p-inputtext { width: 100%; border-radius: 8px; }
        ::ng-deep .login-card .p-password { width: 100%; }
        ::ng-deep .login-card .p-password .p-inputtext { width: 100%; }
    `],
    template: `
        <div class="login-page">
            <!-- Barra de Acessibilidade -->
            <div class="a11y-bar">
                <span>GOIAS.GOV.BR</span>
                <div class="a11y-right">
                    <div style="display:flex;gap:2px">
                        <button class="a11y-btn" style="font-size:10px">A-</button>
                        <button class="a11y-btn" style="font-size:13px">A</button>
                        <button class="a11y-btn" style="font-size:16px">A+</button>
                    </div>
                    <div class="a11y-sep"></div>
                    <button class="a11y-toggle">&#9680; ALTO CONTRASTE</button>
                    <div class="a11y-sep"></div>
                    <button class="a11y-toggle">&#9737; ACESSIBILIDADE</button>
                </div>
            </div>

            <!-- Corpo -->
            <div class="login-body">
                <div class="login-card">
                    <!-- Logo -->
                    <div class="logo-wrap">
                        <div class="logo-sub">Aplicações</div>
                        <div class="logo-main">expr<span>e</span>sso</div>
                        <div class="logo-lines">
                            <div class="logo-line"></div>
                            <div class="logo-line"></div>
                            <div class="logo-line"></div>
                        </div>
                    </div>

                    <!-- Erro -->
                    @if (erro) {
                        <div class="error-msg">
                            <p-message severity="error" [text]="erro" styleClass="w-full" />
                        </div>
                    }

                    <!-- Usuário -->
                    <div class="field">
                        <label for="usuario">Usuário</label>
                        <input pInputText id="usuario" type="text" placeholder="Digite" [(ngModel)]="usuario" (keyup.enter)="entrar()" />
                    </div>

                    <!-- Senha -->
                    <div class="field">
                        <label for="senha">Senha</label>
                        <p-password id="senha" [(ngModel)]="senha" placeholder="Digite" [toggleMask]="true" [feedback]="false" [fluid]="true" (onKeyUp)="onSenhaKeyUp($event)" />
                    </div>

                    <!-- Lembrar / Recuperar -->
                    <div class="remember-row">
                        <label class="remember-label" for="lembrar">
                            <p-checkbox [(ngModel)]="lembrar" id="lembrar" [binary]="true" />
                            Mantenha-me conectado
                        </label>
                        <button class="recover">Recuperar senha</button>
                    </div>

                    <p-button label="Entrar" styleClass="btn-entrar" (onClick)="entrar()" />

                    <div class="ou">Ou</div>

                    <button class="btn-social" pRipple>
                        <span class="id-goias">ID</span>
                        Entrar com ID Goiás
                    </button>
                    <button class="btn-social" pRipple>
                        <span class="govbr">gov.br</span>
                        Entrar com gov.br
                    </button>

                    <p class="policy">
                        Utilizamos cookies do navegador para rastrear sua sessão e oferecer uma experiência melhor.
                        Você pode consultar a nossa <a>Política de Cookie</a> para mais detalhes.<br /><br />
                        Ao fazer o login, você concorda com nossa <a>Política de Privacidade</a>
                    </p>
                </div>
            </div>
        </div>
    `
})
export class Login {
    usuario = '';
    senha = '';
    lembrar = false;
    erro = '';

    constructor(private router: Router) {}

    onSenhaKeyUp(event: Event) {
        if ((event as KeyboardEvent).key === 'Enter') this.entrar();
    }

    entrar() {
        this.erro = '';
        if (this.usuario === 'admin' && this.senha === 'admin') {
            this.router.navigate(['/ds']);
        } else {
            this.erro = 'Usuário ou senha incorretos.';
        }
    }
}
