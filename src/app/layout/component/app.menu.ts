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

            /* ══════════════ ÁTOMOS ══════════════ */
            {
                label: 'Átomos',
                items: [
                    {
                        label: 'Buttons',
                        icon: 'pi pi-fw pi-stop',
                        items: [
                            { label: 'Button Primary',   icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/button'], fragment: 'primary' },
                            { label: 'Button Secondary', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/button'], fragment: 'secondary' },
                            { label: 'Severidades',      icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/button'], fragment: 'severidades' },
                            { label: 'Outlined',         icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/button'], fragment: 'outlined' },
                            { label: 'Text',             icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/button'], fragment: 'text' },
                            { label: 'Raised',           icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/button'], fragment: 'raised' },
                            { label: 'Rounded',          icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/button'], fragment: 'rounded' },
                            { label: 'Tamanhos',         icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/button'], fragment: 'tamanhos' },
                            { label: 'Loading',          icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/button'], fragment: 'loading' },
                            { label: 'Grupo',            icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/button'], fragment: 'grupo' },
                            { label: 'SplitButton',      icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/button'], fragment: 'splitbutton' },
                        ]
                    },
                    {
                        label: 'Input',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            { label: 'InputText',    icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/input'], fragment: 'inputtext' },
                            { label: 'Password',     icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/input'], fragment: 'password' },
                            { label: 'Textarea',     icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/input'], fragment: 'textarea' },
                            { label: 'InputNumber',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/input'], fragment: 'inputnumber' },
                            { label: 'Checkbox',     icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/input'], fragment: 'checkbox' },
                            { label: 'RadioButton',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/input'], fragment: 'radio' },
                            { label: 'ToggleSwitch', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/input'], fragment: 'toggle' },
                            { label: 'Slider',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/input'], fragment: 'slider' },
                        ]
                    },
                    {
                        label: 'Select',
                        icon: 'pi pi-fw pi-chevron-down',
                        items: [
                            { label: 'Select',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/input'], fragment: 'select' },
                            { label: 'MultiSelect',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/input'], fragment: 'multiselect' },
                            { label: 'AutoComplete', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/input'], fragment: 'autocomplete' },
                            { label: 'DatePicker',   icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/input'], fragment: 'datepicker' },
                        ]
                    },
                    {
                        label: 'Misc',
                        icon: 'pi pi-fw pi-circle',
                        items: [
                            { label: 'Avatar',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/misc'], fragment: 'avatar' },
                            { label: 'Badge',        icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/misc'], fragment: 'badge' },
                            { label: 'Tag',          icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/misc'], fragment: 'tag' },
                            { label: 'Chip',         icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/misc'], fragment: 'chip' },
                            { label: 'ProgressBar',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/misc'], fragment: 'progressbar' },
                            { label: 'Skeleton',     icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/misc'], fragment: 'skeleton' },
                        ]
                    },
                ]
            },

            /* ══════════════ MOLÉCULAS ══════════════ */
            {
                label: 'Moléculas',
                items: [
                    {
                        label: 'Painéis',
                        icon: 'pi pi-fw pi-tablet',
                        items: [
                            { label: 'Card',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/panel'], fragment: 'card' },
                            { label: 'Accordion',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/panel'], fragment: 'accordion' },
                            { label: 'Tabs',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/panel'], fragment: 'tabs' },
                            { label: 'Panel',      icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/panel'], fragment: 'panel' },
                            { label: 'Toolbar',    icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/panel'], fragment: 'toolbar' },
                            { label: 'Divider',    icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/panel'], fragment: 'divider' },
                            { label: 'Stepper',    icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/panel'], fragment: 'stepper' },
                        ]
                    },
                    {
                        label: 'Mensagens',
                        icon: 'pi pi-fw pi-comment',
                        items: [
                            { label: 'Toast',    icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/message'], fragment: 'toast' },
                            { label: 'Message',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/message'], fragment: 'message' },
                        ]
                    },
                    {
                        label: 'Sobreposições',
                        icon: 'pi pi-fw pi-clone',
                        items: [
                            { label: 'Dialog',        icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/overlay'], fragment: 'dialog' },
                            { label: 'Drawer',        icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/overlay'], fragment: 'drawer' },
                            { label: 'Tooltip',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/overlay'], fragment: 'tooltip' },
                            { label: 'Popover',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/overlay'], fragment: 'popover' },
                            { label: 'ConfirmDialog', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/overlay'], fragment: 'confirmdialog' },
                        ]
                    },
                ]
            },

            /* ══════════════ ORGANISMOS ══════════════ */
            {
                label: 'Organismos',
                items: [
                    {
                        label: 'Dados',
                        icon: 'pi pi-fw pi-table',
                        items: [
                            { label: 'DataTable',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/table'],    fragment: 'datatable' },
                            { label: 'Paginator',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/table'],    fragment: 'paginator' },
                            { label: 'Tree',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/tree'] },
                            { label: 'Timeline',   icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/timeline'] },
                            { label: 'OrderList',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/list'] },
                        ]
                    },
                    {
                        label: 'Navegação',
                        icon: 'pi pi-fw pi-bars',
                        items: [
                            { label: 'Menu',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/menu'], fragment: 'menu' },
                            { label: 'Menubar',    icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/menu'], fragment: 'menubar' },
                            { label: 'Breadcrumb', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/menu'], fragment: 'breadcrumb' },
                            { label: 'PanelMenu',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/menu'], fragment: 'panelmenu' },
                            { label: 'TieredMenu', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/menu'], fragment: 'tieredmenu' },
                        ]
                    },
                    {
                        label: 'Mídia',
                        icon: 'pi pi-fw pi-image',
                        items: [
                            { label: 'Image',      icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/media'], fragment: 'image' },
                            { label: 'Galleria',   icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/media'], fragment: 'galleria' },
                            { label: 'Carousel',   icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/media'], fragment: 'carousel' },
                            { label: 'FileUpload', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/file'] },
                        ]
                    },
                ]
            },
        ];
    }
}
