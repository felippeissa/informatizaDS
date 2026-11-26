import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

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
export class AppMenu implements OnInit, OnDestroy {
    model: MenuItem[] = [];
    private router = inject(Router);
    private sub!: Subscription;

    ngOnInit() {
        this.buildMenu(this.router.url);
        this.sub = this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((e: any) => this.buildMenu(e.urlAfterRedirects));
    }

    ngOnDestroy() { this.sub?.unsubscribe(); }

    private buildMenu(_url: string) {
        this.model = this.dsMenu;
    }

    /* ══════════════════════════════════════════════════════
       Menu: Informatiza Design System
    ══════════════════════════════════════════════════════ */
    private get dsMenu(): MenuItem[] { return [
            {
                label: 'Início',
                items: [
                    { label: 'Visão Geral', icon: 'pi pi-fw pi-home', routerLink: ['/ds'] }
                ]
            },

            /* ══════════════ FOUNDATIONS ══════════════ */
            {
                label: 'Foundations',
                items: [
                    { label: 'Cores',             icon: 'pi pi-fw pi-palette',    routerLink: ['/ds/foundations/cores'] },
                    { label: 'Tipografia',        icon: 'pi pi-fw pi-pencil',     routerLink: ['/ds/foundations/tipografia'] },
                    { label: 'Espaçamento',       icon: 'pi pi-fw pi-arrows-h',   routerLink: ['/ds/foundations/espacamento'] },
                    { label: 'Bordas e elevação', icon: 'pi pi-fw pi-clone',      routerLink: ['/ds/foundations/bordas'] },
                    { label: 'Ícones',            icon: 'pi pi-fw pi-star',       routerLink: ['/ds/foundations/icones'] },
                    { label: 'Grid e layout',     icon: 'pi pi-fw pi-th-large',   routerLink: ['/ds/foundations/grid'] }
                ]
            },

            /* ══════════════ TEMPLATES DE TELA ══════════════ */
            {
                label: 'Templates',
                items: [
                    { label: 'Lista com filtros',   icon: 'pi pi-fw pi-list',          routerLink: ['/ds/templates/lista'] },
                    { label: 'Formulário em card',  icon: 'pi pi-fw pi-pencil',        routerLink: ['/ds/templates/formulario'] },
                    { label: 'Dashboard',           icon: 'pi pi-fw pi-chart-line',    routerLink: ['/ds/templates/dashboard'] },
                    { label: 'Detalhe / Workspace', icon: 'pi pi-fw pi-window-maximize', routerLink: ['/ds/templates/detalhe'] }
                ]
            },

            /* ══════════════ ÁTOMOS ══════════════ */
            {
                label: 'Átomos',
                items: [
                    { label: 'Button',         icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/button'] },
                    { label: 'SplitButton',    icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/splitbutton'] },
                    { label: 'SpeedDial',      icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/speeddial'] },
                    { label: 'InputText',      icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/inputtext'] },
                    { label: 'InputMask',      icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/inputmask'] },
                    { label: 'InputGroup',     icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/inputgroup'] },
                    { label: 'IconField',      icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/iconfield'] },
                    { label: 'FloatLabel',     icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/floatlabel'] },
                    { label: 'IftaLabel',      icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/iftalabel'] },
                    { label: 'Password',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/password'] },
                    { label: 'Textarea',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/textarea'] },
                    { label: 'InputNumber',    icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/inputnumber'] },
                    { label: 'InputOtp',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/inputotp'] },
                    { label: 'KeyFilter',      icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/keyfilter'] },
                    { label: 'Checkbox',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/checkbox'] },
                    { label: 'RadioButton',    icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/radiobutton'] },
                    { label: 'ToggleSwitch',   icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/toggleswitch'] },
                    { label: 'SelectButton',   icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/selectbutton'] },
                    { label: 'ToggleButton',   icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/togglebutton'] },
                    { label: 'Slider',         icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/slider'] },
                    { label: 'Rating',         icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/rating'] },
                    { label: 'Knob',           icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/knob'] },
                    { label: 'ColorPicker',    icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/colorpicker'] },
                    { label: 'Editor',         icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/editor'] },
                    { label: 'Select',         icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/select'] },
                    { label: 'Listbox',        icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/listbox'] },
                    { label: 'MultiSelect',    icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/multiselect'] },
                    { label: 'AutoComplete',   icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/autocomplete'] },
                    { label: 'CascadeSelect',  icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/cascadeselect'] },
                    { label: 'TreeSelect',     icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/treeselect'] },
                    { label: 'DatePicker',     icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/datepicker'] },
                    { label: 'Avatar',         icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/avatar'] },
                    { label: 'Badge',          icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/badge'] },
                    { label: 'Tag',            icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/tag'] },
                    { label: 'Chip',           icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/chip'] },
                    { label: 'ProgressBar',    icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/progressbar'] },
                    { label: 'ProgressSpinner',icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/progressspinner'] },
                    { label: 'MeterGroup',     icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/metergroup'] },
                    { label: 'Skeleton',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/skeleton'] },
                    { label: 'Inplace',        icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/inplace'] },
                    { label: 'BlockUI',        icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/blockui'] },
                    { label: 'ScrollTop',      icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/scrolltop'] },
                    { label: 'AnimateOnScroll',icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/animateonscroll'] },
                    { label: 'Terminal',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/terminal'] },
                ]
            },

            /* ══════════════ MOLÉCULAS ══════════════ */
            {
                label: 'Moléculas',
                items: [
                    { label: 'Card',          icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/card'] },
                    { label: 'Accordion',     icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/accordion'] },
                    { label: 'Tabs',          icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/tabs'] },
                    { label: 'Panel',         icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/panel'] },
                    { label: 'Fieldset',      icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/fieldset'] },
                    { label: 'Toolbar',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/toolbar'] },
                    { label: 'Divider',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/divider'] },
                    { label: 'Stepper',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/stepper'] },
                    { label: 'Splitter',      icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/splitter'] },
                    { label: 'ScrollPanel',   icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/scrollpanel'] },
                    { label: 'Toast',         icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/toast'] },
                    { label: 'Message',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/message'] },
                    { label: 'Dialog',        icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/dialog'] },
                    { label: 'DynamicDialog', icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/dynamicdialog'] },
                    { label: 'Drawer',        icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/drawer'] },
                    { label: 'Tooltip',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/tooltip'] },
                    { label: 'Popover',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/popover'] },
                    { label: 'ConfirmDialog', icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/confirmdialog'] },
                    { label: 'ConfirmPopup',  icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/confirmpopup'] },
                ]
            },

            /* ══════════════ ORGANISMOS ══════════════ */
            {
                label: 'Organismos',
                items: [
                    { label: 'DataTable',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/datatable'] },
                    { label: 'Paginator',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/paginator'] },
                    { label: 'Tree',            icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/tree'] },
                    { label: 'TreeTable',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/treetable'] },
                    { label: 'Timeline',        icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/timeline'] },
                    { label: 'OrderList',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/orderlist'] },
                    { label: 'PickList',        icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/picklist'] },
                    { label: 'DataView',        icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/dataview'] },
                    { label: 'OrgChart',        icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/orgchart'] },
                    { label: 'VirtualScroller', icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/virtualscroller'] },
                    { label: 'Menu',            icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/menu'] },
                    { label: 'Menubar',         icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/menubar'] },
                    { label: 'MegaMenu',        icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/megamenu'] },
                    { label: 'Breadcrumb',      icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/breadcrumb'] },
                    { label: 'PanelMenu',       icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/panelmenu'] },
                    { label: 'TieredMenu',      icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/tieredmenu'] },
                    { label: 'ContextMenu',     icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/contextmenu'] },
                    { label: 'Dock',            icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/dock'] },
                    { label: 'Steps',           icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/steps'] },
                    { label: 'Image',           icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/image'] },
                    { label: 'ImageCompare',    icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/imagecompare'] },
                    { label: 'Galleria',        icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/galleria'] },
                    { label: 'Carousel',        icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/carousel'] },
                    { label: 'FileUpload',      icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/fileupload'] },
                    { label: 'Chart',           icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/chart'] },
                    { label: 'Form Layout',     icon: 'pi pi-fw pi-circle', routerLink: ['/ds/uikit/formlayout'] },
                ]
            },
        ]; }
}
