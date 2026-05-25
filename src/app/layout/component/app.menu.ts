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

            /* ══════════════ TEMPLATES ══════════════ */
            {
                label: 'Templates',
                items: [
                    {
                        label: 'Listagens',
                        icon: 'pi pi-fw pi-list',
                        path: 'tpl-listagens',
                        items: [
                            { label: 'Lista com Filtros', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/templates/lista-filtros'] },
                        ]
                    },
                    {
                        label: 'Formulários',
                        icon: 'pi pi-fw pi-file-edit',
                        path: 'tpl-forms',
                        items: [
                            { label: 'Incluir IPOF', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/templates/incluir-ipof'] },
                        ]
                    },
                ]
            },

            /* ══════════════ ÁTOMOS ══════════════ */
            {
                label: 'Átomos',
                items: [
                    {
                        label: 'Buttons',
                        icon: 'pi pi-fw pi-stop',
                        path: 'atm-buttons',
                        items: [
                            { label: 'Button',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/button'] },
                            { label: 'SplitButton',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/splitbutton'] },
                            { label: 'SpeedDial',    icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/speeddial'] },
                        ]
                    },
                    {
                        label: 'Input',
                        icon: 'pi pi-fw pi-pencil',
                        path: 'atm-input',
                        items: [
                            { label: 'InputText',    icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/inputtext'] },
                            { label: 'InputMask',    icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/inputmask'] },
                            { label: 'InputGroup',   icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/inputgroup'] },
                            { label: 'Password',     icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/password'] },
                            { label: 'Textarea',     icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/textarea'] },
                            { label: 'InputNumber',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/inputnumber'] },
                            { label: 'Checkbox',     icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/checkbox'] },
                            { label: 'RadioButton',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/radiobutton'] },
                            { label: 'ToggleSwitch', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/toggleswitch'] },
                            { label: 'SelectButton', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/selectbutton'] },
                            { label: 'ToggleButton', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/togglebutton'] },
                            { label: 'Slider',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/slider'] },
                            { label: 'Rating',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/rating'] },
                            { label: 'Knob',         icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/knob'] },
                        ]
                    },
                    {
                        label: 'Select',
                        icon: 'pi pi-fw pi-chevron-down',
                        path: 'atm-select',
                        items: [
                            { label: 'Select',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/select'] },
                            { label: 'Listbox',      icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/listbox'] },
                            { label: 'MultiSelect',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/multiselect'] },
                            { label: 'AutoComplete', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/autocomplete'] },
                            { label: 'DatePicker',   icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/datepicker'] },
                        ]
                    },
                    {
                        label: 'Misc',
                        icon: 'pi pi-fw pi-circle',
                        path: 'atm-misc',
                        items: [
                            { label: 'Avatar',          icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/avatar'] },
                            { label: 'Badge',           icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/badge'] },
                            { label: 'Tag',             icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/tag'] },
                            { label: 'Chip',            icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/chip'] },
                            { label: 'ProgressBar',     icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/progressbar'] },
                            { label: 'ProgressSpinner', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/progressspinner'] },
                            { label: 'MeterGroup',      icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/metergroup'] },
                            { label: 'Skeleton',        icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/skeleton'] },
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
                        path: 'mol-panels',
                        items: [
                            { label: 'Card',        icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/card'] },
                            { label: 'Accordion',   icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/accordion'] },
                            { label: 'Tabs',        icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/tabs'] },
                            { label: 'Panel',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/panel'] },
                            { label: 'Fieldset',    icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/fieldset'] },
                            { label: 'Toolbar',     icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/toolbar'] },
                            { label: 'Divider',     icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/divider'] },
                            { label: 'Stepper',     icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/stepper'] },
                            { label: 'Splitter',    icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/splitter'] },
                            { label: 'ScrollPanel', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/scrollpanel'] },
                        ]
                    },
                    {
                        label: 'Mensagens',
                        icon: 'pi pi-fw pi-comment',
                        path: 'mol-messages',
                        items: [
                            { label: 'Toast',   icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/toast'] },
                            { label: 'Message', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/message'] },
                        ]
                    },
                    {
                        label: 'Sobreposições',
                        icon: 'pi pi-fw pi-clone',
                        path: 'mol-overlays',
                        items: [
                            { label: 'Dialog',        icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/dialog'] },
                            { label: 'Drawer',        icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/drawer'] },
                            { label: 'Tooltip',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/tooltip'] },
                            { label: 'Popover',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/popover'] },
                            { label: 'ConfirmDialog', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/confirmdialog'] },
                            { label: 'ConfirmPopup',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/confirmpopup'] },
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
                        path: 'org-dados',
                        items: [
                            { label: 'DataTable',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/datatable'] },
                            { label: 'Paginator',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/paginator'] },
                            { label: 'Tree',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/tree'] },
                            { label: 'TreeTable',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/treetable'] },
                            { label: 'Timeline',   icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/timeline'] },
                            { label: 'OrderList',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/orderlist'] },
                            { label: 'PickList',   icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/picklist'] },
                            { label: 'DataView',   icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/dataview'] },
                        ]
                    },
                    {
                        label: 'Navegação',
                        icon: 'pi pi-fw pi-bars',
                        path: 'org-nav',
                        items: [
                            { label: 'Menu',        icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/menu'] },
                            { label: 'Menubar',     icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/menubar'] },
                            { label: 'Breadcrumb',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/breadcrumb'] },
                            { label: 'PanelMenu',   icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/panelmenu'] },
                            { label: 'TieredMenu',  icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/tieredmenu'] },
                            { label: 'ContextMenu', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/contextmenu'] },
                            { label: 'Steps',       icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/steps'] },
                        ]
                    },
                    {
                        label: 'Mídia',
                        icon: 'pi pi-fw pi-image',
                        path: 'org-media',
                        items: [
                            { label: 'Image',      icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/image'] },
                            { label: 'Galleria',   icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/galleria'] },
                            { label: 'Carousel',   icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/carousel'] },
                            { label: 'FileUpload', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/fileupload'] },
                        ]
                    },
                    {
                        label: 'Charts',
                        icon: 'pi pi-fw pi-chart-bar',
                        path: 'org-charts',
                        items: [
                            { label: 'Chart',    icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/chart'] },
                        ]
                    },
                    {
                        label: 'Formulários',
                        icon: 'pi pi-fw pi-file-edit',
                        path: 'org-forms',
                        items: [
                            { label: 'Form Layout', icon: 'pi pi-fw pi-minus', routerLink: ['/ds/uikit/formlayout'] },
                        ]
                    },
                ]
            },
        ];
    }
}
