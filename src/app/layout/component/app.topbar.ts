import { Component, inject, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '@/app/layout/service/layout.service';

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

        /* ── system switcher ── */
        .sys-btn {
            display: flex; align-items: center; gap: 7px;
            padding: 5px 10px 5px 8px;
            border: 1px solid var(--surface-border);
            border-radius: 8px;
            background: var(--surface-card);
            cursor: pointer;
            transition: background .15s, border-color .15s;
            color: var(--text-color);
        }
        .sys-btn:hover { background: var(--surface-hover); border-color: var(--primary-color); }
        .sys-dot {
            width: 8px; height: 8px; border-radius: 50%; background: #059669; flex-shrink: 0;
        }
        .sys-label {
            font-size: 12px; font-weight: 700; letter-spacing: -.01em; white-space: nowrap;
        }
        .sys-chevron { font-size: 10px; color: var(--text-color-secondary); }

        /* ── dropdown panel ── */
        .sys-panel {
            position: absolute; top: calc(100% + 8px); right: 0;
            width: 260px;
            background: var(--surface-overlay);
            border: 1px solid var(--surface-border);
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0,0,0,.12);
            padding: 8px;
            z-index: 9999;
        }
        .sys-panel-title {
            font-size: 10px; font-weight: 700; text-transform: uppercase;
            letter-spacing: .08em; color: var(--text-color-secondary);
            padding: 4px 8px 8px; border-bottom: 1px solid var(--surface-border);
            margin-bottom: 6px;
        }
        .sys-item {
            display: flex; align-items: center; gap: 10px;
            padding: 9px 10px; border-radius: 8px; cursor: pointer;
            transition: background .12s;
            border: 1.5px solid transparent;
        }
        .sys-item:hover { background: var(--surface-hover); }
        .sys-item.active {
            background: color-mix(in srgb, var(--primary-color) 8%, transparent);
            border-color: color-mix(in srgb, var(--primary-color) 30%, transparent);
        }
        .sys-item.coming-soon { opacity: .5; cursor: not-allowed; }
        .sys-icon {
            width: 34px; height: 34px; border-radius: 8px;
            display: flex; align-items: center; justify-content: center;
            font-size: 16px; flex-shrink: 0;
        }
        .sys-info { flex: 1; min-width: 0; }
        .sys-name { font-size: 13px; font-weight: 700; color: var(--text-color); }
        .sys-desc { font-size: 11px; color: var(--text-color-secondary); margin-top: 1px; }
        .sys-badge {
            font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 4px;
            background: #059669; color: #fff; letter-spacing: .04em; flex-shrink: 0;
        }
        .sys-badge.soon { background: var(--surface-border); color: var(--text-color-secondary); }
        .sys-check { font-size: 12px; color: var(--primary-color); flex-shrink: 0; }
    `],
    template: `
        <div class="layout-topbar">
            <div class="layout-topbar-logo-container">
                <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                    <i class="pi pi-bars"></i>
                </button>
                <a class="layout-topbar-logo" routerLink="/ds">
                    <div class="ds-logo-text">
                        <span class="ds-logo-sup">Aplicações</span>
                        <span class="ds-logo-main">expr<span>e</span>sso</span>
                    </div>
                </a>
            </div>

            <div class="layout-topbar-actions">
                <div class="layout-config-menu">

                    <!-- ── System Switcher ── -->
                    <div class="relative">
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
export class AppTopbar {
    items!: MenuItem[];
    layoutService = inject(LayoutService);

    systems = [
        {
            id: 'informatiza',
            name: 'Informatiza 3.0',
            desc: 'Design System oficial',
            icon: 'pi pi-th-large',
            color: '#059669',
            bgColor: 'color-mix(in srgb, #059669 12%, transparent)',
            comingSoon: false
        },
        {
            id: 'protege',
            name: 'Protege',
            desc: 'Sistema de proteção social',
            icon: 'pi pi-shield',
            color: '#2563EB',
            bgColor: 'color-mix(in srgb, #2563EB 12%, transparent)',
            comingSoon: true
        },
        {
            id: 'celeiro',
            name: 'Celeiro',
            desc: 'Gestão de estoques',
            icon: 'pi pi-box',
            color: '#D97706',
            bgColor: 'color-mix(in srgb, #D97706 12%, transparent)',
            comingSoon: true
        },
    ];

    activeSystem = signal(this.systems[0]);

    selectSystem(sys: any) {
        this.activeSystem.set(sys);
    }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({
            ...state,
            darkTheme: !state.darkTheme
        }));
    }
}
