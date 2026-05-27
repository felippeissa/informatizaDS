import { Component, inject, signal, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '@/app/layout/service/layout.service';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator],
    styles: [`
        .ds-logo-text {
            display: flex; flex-direction: column; line-height: 1.1;
        }
        .ds-logo-sup { font-size: 9px; font-weight: 700; letter-spacing: .1em; color: #059669; text-transform: uppercase; }
        .ds-logo-main { font-size: 16px; font-weight: 900; color: #059669; letter-spacing: -.02em; }
        .ds-logo-main span { color: #D97706; }

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
                <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                    <i class="pi pi-bars"></i>
                </button>

                @if (activeSystem().id === 'assinago') {
                    <a class="layout-topbar-logo" routerLink="/assinago">
                        <img src="assets/logoassinago.svg" alt="AssinaGO" style="height:36px;width:auto" />
                    </a>
                } @else if (activeSystem().id === 'dracon') {
                    <a class="layout-topbar-logo" routerLink="/dracon">
                        <div class="ds-logo-text">
                            <span class="ds-logo-sup" style="color:#1755A3">Gestão de Atos</span>
                            <span class="ds-logo-main" style="color:#1755A3">DRA<span style="color:#D97706">CON</span></span>
                        </div>
                    </a>
                } @else {
                    <a class="layout-topbar-logo" routerLink="/ds">
                        <div class="ds-logo-text">
                            <span class="ds-logo-sup">Aplicações</span>
                            <span class="ds-logo-main">expr<span>e</span>sso</span>
                        </div>
                    </a>
                }
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
                    <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                        <i [ngClass]="{'pi': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme()}"></i>
                    </button>

                    <!-- ── Theme configurator ── -->
                    <div class="relative">
                        <button
                            class="layout-topbar-action layout-topbar-action-highlight"
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

                <div class="layout-topbar-menu hidden lg:block">
                    <div class="layout-topbar-menu-content">
                        <a routerLink="/auth/login" class="layout-topbar-action" title="Sair">
                            <i class="pi pi-sign-out"></i>
                            <span>Sair</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class AppTopbar implements OnInit {
    items!: MenuItem[];
    layoutService = inject(LayoutService);
    router        = inject(Router);

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
        {
            id: 'assinago',
            name: 'ASSINAGO',
            desc: 'Assinatura digital de documentos',
            icon: 'pi pi-pen-to-square',
            color: '#7C3AED',
            bgColor: 'color-mix(in srgb, #7C3AED 12%, transparent)',
            route: '/assinago',
            comingSoon: false
        },
        {
            id: 'dracon',
            name: 'DRACON',
            desc: 'Gestão de processos e atos normativos',
            icon: 'pi pi-briefcase',
            color: '#1755A3',
            bgColor: 'color-mix(in srgb, #1755A3 12%, transparent)',
            route: '/dracon',
            comingSoon: false
        },
        {
            id: 'protege',
            name: 'Protege',
            desc: 'Sistema de proteção social',
            icon: 'pi pi-shield',
            color: '#2563EB',
            bgColor: 'color-mix(in srgb, #2563EB 12%, transparent)',
            route: '/protege',
            comingSoon: true
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
        const matched = this.systems.find(s => !s.comingSoon && url.startsWith(s.route));
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
