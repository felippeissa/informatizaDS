import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '@/app/layout/service/layout.service';
import { filter } from 'rxjs/operators';

interface Notificacao { id: number; titulo: string; quando: string; icone: string; lida: boolean; }

/**
 * Header (padrão GESIS): hambúrguer, marca, [ações do DS], notificações,
 * usuário (avatar + nome + descrição + menu) e logout com confirmação.
 */
@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, TooltipModule, AvatarModule, MenuModule, PopoverModule,
              ButtonModule, ConfirmDialogModule, AppConfigurator],
    providers: [ConfirmationService],
    styles: [`
        .ds-logo { flex-shrink: 0; display: flex; align-items: center; gap: 0.6rem; text-decoration: none; }
        .ds-logo img { height: 2.25rem; width: auto; display: block; }
        .ds-marca-nome { font-size: 1.4rem; font-weight: 800; letter-spacing: -0.02em; color: var(--text-color); line-height: 1; }
        @media (max-width: 575px) { .ds-logo img { height: 1.9rem; } .ds-marca-nome { font-size: 1.2rem; } }
        @media (max-width: 767px) { .sys-wrap { display: none !important; } }
        @media (max-width: 991px) {
            /* o Sakai fixa 20rem no container da logo; no celular isso empurra o usuário e o "Sair" para fora da tela */
            .layout-topbar .layout-topbar-logo-container { width: auto; gap: 0.5rem; }
        }
        @media (max-width: 575px) {
            /* No celular: só o essencial do padrão (notificação, usuário, sair) + tema claro/escuro */
            :host ::ng-deep .layout-topbar-actions { gap: 0.25rem !important; }
            .hdr-config-paleta { display: none !important; }
        }

        /* ── notificações ── */
        .hdr-notif { position: relative; }
        .hdr-notif-badge {
            position: absolute; top: 2px; right: 2px; min-width: 1.05rem; height: 1.05rem; padding: 0 0.25rem;
            border-radius: 999px; background: var(--p-red-500); color: #fff;
            font-size: 0.65rem; font-weight: 700; line-height: 1.05rem; text-align: center;
        }

        .hdr-notif-painel { width: 320px; max-width: 85vw; display: flex; flex-direction: column; gap: 0.25rem; }
        .hdr-notif-topo { display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; padding: 0.25rem 0.25rem 0.5rem; }
        .hdr-notif-item { display: flex; gap: 0.75rem; align-items: flex-start; padding: 0.65rem 0.5rem; border-radius: 8px; }
        .hdr-notif-item--nova { background: color-mix(in srgb, var(--primary-color) 8%, transparent); }
        .hdr-notif-icone {
            width: 2rem; height: 2rem; border-radius: 8px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center;
            background: color-mix(in srgb, var(--primary-color) 14%, transparent); color: var(--primary-color);
        }
        .hdr-notif-titulo { font-size: 0.875rem; font-weight: 600; }
        .hdr-notif-quando { font-size: 0.75rem; color: var(--text-color-secondary); margin-top: 0.15rem; }

        /* ── usuário ── */
        .hdr-usuario {
            display: flex; align-items: center; gap: 0.6rem; height: 2.75rem; padding: 0 0.6rem 0 0.35rem;
            border: none; border-radius: 999px; background: transparent; cursor: pointer;
            color: var(--text-color); font-family: inherit; text-align: left; transition: background .15s;
        }
        .hdr-usuario:hover { background: var(--surface-hover); }
        .hdr-usuario:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
        :host ::ng-deep .hdr-avatar {
            background: color-mix(in srgb, var(--primary-color) 16%, transparent); color: var(--primary-color); font-weight: 700;
        }
        .hdr-usuario-texto { display: flex; flex-direction: column; line-height: 1.2; }
        .hdr-usuario-nome { font-size: 0.875rem; font-weight: 600; white-space: nowrap; }
        .hdr-usuario-desc { font-size: 0.75rem; color: var(--text-color-secondary); white-space: nowrap; }
        .hdr-usuario-seta { font-size: 0.8rem; color: var(--text-color-secondary); }

        /* ── sair ── */
        .hdr-sair { width: auto !important; padding: 0 0.75rem !important; gap: 0.4rem; border-radius: 999px !important; }
        .hdr-sair-texto { font-size: 0.875rem; font-weight: 500; }

        @media (max-width: 991px) {
            .hdr-usuario-texto, .hdr-usuario-seta, .hdr-sair-texto { display: none; }
            .hdr-usuario { padding: 0 0.25rem; }
            .hdr-sair { padding: 0 !important; width: 2.5rem !important; }
        }

        /* ── system switcher trigger ── */
        .sys-wrap { display: flex; align-items: center; }
        .sys-btn {
            display: flex; align-items: center; gap: 6px;
            padding: 0 10px;
            height: 2.5rem;
            border: none;
            border-radius: var(--border-radius, 6px);
            background: transparent;
            cursor: pointer;
            color: var(--text-color);
            transition: background .15s;
            font-family: inherit;
        }
        .sys-btn:hover { background: var(--surface-hover); }
        .sys-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .sys-label { font-size: 12px; font-weight: 600; white-space: nowrap; color: var(--text-color); }
        .sys-chevron { font-size: 9px; color: var(--text-color-secondary); margin-left: 1px; }

        /* ── dropdown panel — mesmo estilo do app-configurator ── */
        .sys-panel {
            position: absolute; top: calc(100% + 6px); right: 0;
            width: 240px;
            background: var(--surface-overlay, var(--surface-card));
            border: 1px solid var(--surface-border);
            border-radius: var(--border-radius, 8px);
            box-shadow: 0 4px 20px rgba(0,0,0,.10);
            padding: 6px;
            z-index: 9999;
        }
        .sys-panel-title {
            font-size: 10px; font-weight: 700; text-transform: uppercase;
            letter-spacing: .07em; color: var(--text-color-secondary);
            padding: 6px 10px 8px;
            border-bottom: 1px solid var(--surface-border);
            margin-bottom: 4px;
        }
        .sys-item {
            display: flex; align-items: center; gap: 10px;
            padding: 8px 10px; border-radius: calc(var(--border-radius, 6px) - 2px);
            cursor: pointer; transition: background .12s;
            border: 1.5px solid transparent;
        }
        .sys-item:hover { background: var(--surface-hover); }
        .sys-item.active {
            background: color-mix(in srgb, var(--primary-color) 8%, transparent);
            border-color: color-mix(in srgb, var(--primary-color) 25%, transparent);
        }
        .sys-item.coming-soon { opacity: .45; cursor: not-allowed; }
        .sys-icon {
            width: 32px; height: 32px; border-radius: calc(var(--border-radius, 6px) - 2px);
            display: flex; align-items: center; justify-content: center;
            font-size: 14px; flex-shrink: 0;
        }
        .sys-info { flex: 1; min-width: 0; }
        .sys-name { font-size: 12px; font-weight: 700; color: var(--text-color); }
        .sys-desc { font-size: 11px; color: var(--text-color-secondary); margin-top: 1px; }
        .sys-badge {
            font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 4px;
            background: var(--surface-border); color: var(--text-color-secondary);
            letter-spacing: .03em; flex-shrink: 0;
        }
        .sys-check { font-size: 11px; color: var(--primary-color); flex-shrink: 0; }
    `],
    template: `
        <div class="layout-topbar">
            <div class="layout-topbar-logo-container">
                <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()" aria-label="Abrir ou recolher o menu">
                    <i class="pi pi-bars"></i>
                </button>
                <!-- Marca (padrão GESIS: símbolo + nome do sistema) -->
                <a class="layout-topbar-logo ds-logo" routerLink="/ds" aria-label="Informatiza — página inicial">
                    <img src="assets/logo-informatiza-ds-simbolo.svg" alt="" />
                    <strong class="ds-marca-nome">Informatiza</strong>
                </a>

            </div>

            <div class="layout-topbar-actions">
                <div class="layout-config-menu">

                    <!-- ── System Switcher ── -->
                    <div class="relative sys-wrap">
                        <button
                            class="sys-btn"
                            pStyleClass="@next"
                            enterFromClass="hidden"
                            enterActiveClass="animate-scalein"
                            leaveToClass="hidden"
                            leaveActiveClass="animate-fadeout"
                            [hideOnOutsideClick]="true"
                        >
                            <span class="sys-dot" [style.background]="activeSystem().color"></span>
                            <span class="sys-label">{{ activeSystem().name }}</span>
                            <i class="pi pi-chevron-down sys-chevron"></i>
                        </button>

                        <div class="sys-panel hidden">
                            <div class="sys-panel-title">Sistemas disponíveis</div>

                            @for (sys of systems; track sys.id) {
                                <div
                                    class="sys-item"
                                    [class.active]="sys.id === activeSystem().id"
                                    [class.coming-soon]="sys.comingSoon"
                                    (click)="!sys.comingSoon && selectSystem(sys)"
                                >
                                    <div class="sys-icon" [style.background]="sys.bgColor">
                                        <i [class]="sys.icon" [style.color]="sys.color"></i>
                                    </div>
                                    <div class="sys-info">
                                        <div class="sys-name">{{ sys.name }}</div>
                                        <div class="sys-desc">{{ sys.desc }}</div>
                                    </div>
                                    @if (sys.comingSoon) {
                                        <span class="sys-badge soon">em breve</span>
                                    } @else if (sys.id === activeSystem().id) {
                                        <i class="pi pi-check sys-check"></i>
                                    }
                                </div>
                            }
                        </div>
                    </div>

                    <!-- ── Dark / Light ── -->
                    <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()" [attr.aria-label]="layoutService.isDarkTheme() ? 'Usar tema claro' : 'Usar tema escuro'">
                        <i [ngClass]="{'pi': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme()}"></i>
                    </button>

                    <!-- ── Theme configurator ── -->
                    <div class="relative hdr-config-paleta">
                        <button
                            class="layout-topbar-action layout-topbar-action-highlight" aria-label="Personalizar tema"
                            pStyleClass="@next"
                            enterFromClass="hidden"
                            enterActiveClass="animate-scalein"
                            leaveToClass="hidden"
                            leaveActiveClass="animate-fadeout"
                            [hideOnOutsideClick]="true"
                        >
                            <i class="pi pi-palette"></i>
                        </button>
                        <app-configurator />
                    </div>
                </div>

                <!-- ── Notificações (opcional no padrão GESIS) ── -->
                <button type="button" class="layout-topbar-action hdr-notif" (click)="notifPainel.toggle($event)"
                        [attr.aria-label]="'Notificações, ' + naoLidas() + ' não lidas'" pTooltip="Notificações" tooltipPosition="bottom">
                    <i class="pi pi-bell"></i>
                    @if (naoLidas() > 0) { <b class="hdr-notif-badge">{{ naoLidas() }}</b> }
                </button>
                <p-popover #notifPainel appendTo="body">
                    <div class="hdr-notif-painel">
                        <div class="hdr-notif-topo">
                            <strong>Notificações</strong>
                            @if (naoLidas() > 0) {
                                <p-button label="Marcar todas como lidas" [text]="true" size="small" (onClick)="marcarLidas()" />
                            }
                        </div>
                        @for (n of notificacoes(); track n.id) {
                            <div class="hdr-notif-item" [class.hdr-notif-item--nova]="!n.lida">
                                <span class="hdr-notif-icone"><i [class]="n.icone"></i></span>
                                <div>
                                    <div class="hdr-notif-titulo">{{ n.titulo }}</div>
                                    <div class="hdr-notif-quando">{{ n.quando }}</div>
                                </div>
                            </div>
                        }
                    </div>
                </p-popover>

                <!-- ── Usuário: avatar + nome (obrigatório), descrição e menu (opcionais) ── -->
                <button type="button" class="hdr-usuario" (click)="menuUsuario.toggle($event)" aria-haspopup="true"
                        [attr.aria-label]="'Menu do usuário ' + usuario.nome">
                    <p-avatar [label]="usuario.iniciais" shape="circle" styleClass="hdr-avatar" />
                    <span class="hdr-usuario-texto">
                        <span class="hdr-usuario-nome">{{ usuario.nome }}</span>
                        <span class="hdr-usuario-desc">{{ usuario.descricao }}</span>
                    </span>
                    <i class="pi pi-angle-down hdr-usuario-seta"></i>
                </button>
                <p-menu #menuUsuario [model]="itensUsuario" [popup]="true" appendTo="body" />

                <!-- ── Logout (obrigatório, sempre com confirmação) ── -->
                <button type="button" class="layout-topbar-action hdr-sair" (click)="sair()" aria-label="Sair do sistema" pTooltip="Sair" tooltipPosition="bottom">
                    <i class="pi pi-sign-out"></i>
                    <b class="hdr-sair-texto">Sair</b>
                </button>
            </div>
        </div>

        <p-confirmdialog key="logout" styleClass="ds-dialog-basico" />
    `
})
export class AppTopbar implements OnInit {
    items!: MenuItem[];
    layoutService = inject(LayoutService);
    router        = inject(Router);
    private confirm = inject(ConfirmationService);

    /** Usuário logado (mock). Descrição: cargo · órgão (opcional no padrão). */
    usuario = { nome: 'Ana Souza', iniciais: 'AS', descricao: 'Analista de Sistemas · SEAD' };

    itensUsuario: MenuItem[] = [
        { label: 'Meu perfil', icon: 'pi pi-user' },
        { label: 'Preferências', icon: 'pi pi-cog' },
        { separator: true },
        { label: 'Sair', icon: 'pi pi-sign-out', command: () => this.sair() },
    ];

    notificacoes = signal<Notificacao[]>([
        { id: 1, titulo: 'Novos Padrões de UX publicados', quando: 'Hoje, 09:30', icone: 'pi pi-book', lida: false },
        { id: 2, titulo: 'Templates de tela atualizados', quando: 'Hoje, 08:15', icone: 'pi pi-objects-column', lida: false },
        { id: 3, titulo: 'Foundations disponíveis', quando: 'Ontem, 17:40', icone: 'pi pi-palette', lida: true },
    ]);
    naoLidas = computed(() => this.notificacoes().filter((n) => !n.lida).length);

    marcarLidas() { this.notificacoes.update((l) => l.map((n) => ({ ...n, lida: true }))); }

    /** Logout: confirmação obrigatória (padrão GESIS). */
    sair() {
        this.confirm.confirm({
            key: 'logout',
            header: 'Sair do sistema',
            message: 'Deseja realmente sair? Alterações não salvas serão perdidas.',
            acceptLabel: 'Sair', rejectLabel: 'Cancelar',
            rejectButtonProps: { outlined: true },
            accept: () => this.router.navigateByUrl('/auth/login')
        });
    }

    systems = [
        {
            id: 'informatiza',
            name: 'Informatiza 3.0',
            desc: 'Design System oficial',
            icon: 'pi pi-th-large',
            color: '#059669',
            bgColor: 'color-mix(in srgb, #059669 12%, transparent)',
            route: '/ds',
            comingSoon: false
        },
    ];

    activeSystem = signal(this.systems[0]);

    ngOnInit() {
        this.syncSystemFromUrl(this.router.url);
        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((e: any) => this.syncSystemFromUrl(e.urlAfterRedirects));
    }

    private syncSystemFromUrl(url: string) {
        const matched = this.systems.find(s => !s.comingSoon && url.startsWith('/' + s.id));
        if (matched) this.activeSystem.set(matched);
    }

    selectSystem(sys: any) {
        this.activeSystem.set(sys);
        this.router.navigateByUrl(sys.route);
    }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({
            ...state,
            darkTheme: !state.darkTheme
        }));
    }
}
