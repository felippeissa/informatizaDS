import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        @for (item of model; track item.label) {
            @if (!item.separator) {
                <li app-menuitem [item]="item" [root]="true"></li>
            } @else {
                <li class="menu-separator"></li>
            }
        }
    </ul>`
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Início',
                items: [
                    { label: 'Visão Geral', icon: 'pi pi-fw pi-home', routerLink: ['/ds'] }
                ]
            },
            {
                label: 'Formulário',
                items: [
                    { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/ds/uikit/formlayout'] },
                    { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/ds/uikit/input'] },
                ]
            },
            {
                label: 'Botões',
                items: [
                    { label: 'Button', icon: 'pi pi-fw pi-stop', routerLink: ['/ds/uikit/button'] },
                ]
            },
            {
                label: 'Dados',
                items: [
                    { label: 'DataTable', icon: 'pi pi-fw pi-table', routerLink: ['/ds/uikit/table'] },
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/ds/uikit/tree'] },
                    { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/ds/uikit/timeline'] },
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/ds/uikit/list'] },
                ]
            },
            {
                label: 'Painéis',
                items: [
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/ds/uikit/panel'] },
                ]
            },
            {
                label: 'Sobreposições',
                items: [
                    { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/ds/uikit/overlay'] },
                ]
            },
            {
                label: 'Navegação',
                items: [
                    { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/ds/uikit/menu'] },
                ]
            },
            {
                label: 'Mensagens',
                items: [
                    { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/ds/uikit/message'] },
                ]
            },
            {
                label: 'Mídia',
                items: [
                    { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/ds/uikit/media'] },
                    { label: 'File Upload', icon: 'pi pi-fw pi-file', routerLink: ['/ds/uikit/file'] },
                    { label: 'Charts', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/ds/uikit/charts'] },
                ]
            },
            {
                label: 'Miscelânea',
                items: [
                    { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/misc'] },
                ]
            }
        ];
    }
}
