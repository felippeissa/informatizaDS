import { MenuItem } from 'primeng/api';

/**
 * Menu do Informatiza Design System — fonte única.
 * Usado pelo menu lateral (app.menu.ts) e pelos números da home (ds-home.ts).
 */
export const DS_MENU: MenuItem[] = [
    {
        label: 'Início',
        icon: 'pi pi-home',
        items: [
            { label: 'Visão Geral', routerLink: ['/ds'] }
        ]
    },

    /* ══════════════ PADRÕES DE UX (GESIS) ══════════════ */
    {
        label: 'Padrões de UX',
        icon: 'pi pi-book',
        items: [
            { label: 'Layout e navegação',  routerLink: ['/ds/padroes/layout'] },
            { label: 'Feedback ao usuário', routerLink: ['/ds/padroes/feedback'] },
            { label: 'Inputs',              routerLink: ['/ds/padroes/inputs'] },
            { label: 'Botões',              routerLink: ['/ds/padroes/botoes'] },
            { label: 'Filtros',             routerLink: ['/ds/padroes/filtros'] },
            { label: 'Tabelas',             routerLink: ['/ds/padroes/tabelas'] },
            { label: 'Formulários',         routerLink: ['/ds/padroes/formularios'] }
        ]
    },

    /* ══════════════ FOUNDATIONS ══════════════ */
    {
        label: 'Foundations',
        icon: 'pi pi-palette',
        items: [
            { label: 'Cores',             routerLink: ['/ds/foundations/cores'] },
            { label: 'Tipografia',        routerLink: ['/ds/foundations/tipografia'] },
            { label: 'Espaçamento',       routerLink: ['/ds/foundations/espacamento'] },
            { label: 'Bordas e elevação', routerLink: ['/ds/foundations/bordas'] },
            { label: 'Ícones',            routerLink: ['/ds/foundations/icones'] },
            { label: 'Grid e layout',     routerLink: ['/ds/foundations/grid'] }
        ]
    },

    /* ══════════════ TEMPLATES DE TELA ══════════════ */
    {
        label: 'Templates',
        icon: 'pi pi-objects-column',
        items: [
            { label: 'Lista com filtros',   routerLink: ['/ds/templates/lista'] },
            { label: 'Cadastro',  routerLink: ['/ds/templates/formulario'] },
            { label: 'Dashboard',           routerLink: ['/ds/templates/dashboard'] },
            { label: 'Visualização', routerLink: ['/ds/templates/detalhe'] },
            { label: 'Sistema com MegaMenu', routerLink: ['/sistema-megamenu'] }
        ]
    },

    /* ══════════════ ÁTOMOS ══════════════ */
    {
        label: 'Átomos',
        icon: 'pi pi-circle',
        items: [
            { label: 'Button',         routerLink: ['/ds/uikit/button'] },
            { label: 'SplitButton',    routerLink: ['/ds/uikit/splitbutton'] },
            { label: 'SpeedDial',      routerLink: ['/ds/uikit/speeddial'] },
            { label: 'InputText',      routerLink: ['/ds/uikit/inputtext'] },
            { label: 'InputMask',      routerLink: ['/ds/uikit/inputmask'] },
            { label: 'InputGroup',     routerLink: ['/ds/uikit/inputgroup'] },
            { label: 'IconField',      routerLink: ['/ds/uikit/iconfield'] },
            { label: 'FloatLabel',     routerLink: ['/ds/uikit/floatlabel'] },
            { label: 'IftaLabel',      routerLink: ['/ds/uikit/iftalabel'] },
            { label: 'Password',       routerLink: ['/ds/uikit/password'] },
            { label: 'Textarea',       routerLink: ['/ds/uikit/textarea'] },
            { label: 'InputNumber',    routerLink: ['/ds/uikit/inputnumber'] },
            { label: 'InputOtp',       routerLink: ['/ds/uikit/inputotp'] },
            { label: 'KeyFilter',      routerLink: ['/ds/uikit/keyfilter'] },
            { label: 'Checkbox',       routerLink: ['/ds/uikit/checkbox'] },
            { label: 'RadioButton',    routerLink: ['/ds/uikit/radiobutton'] },
            { label: 'ToggleSwitch',   routerLink: ['/ds/uikit/toggleswitch'] },
            { label: 'SelectButton',   routerLink: ['/ds/uikit/selectbutton'] },
            { label: 'ToggleButton',   routerLink: ['/ds/uikit/togglebutton'] },
            { label: 'Slider',         routerLink: ['/ds/uikit/slider'] },
            { label: 'Rating',         routerLink: ['/ds/uikit/rating'] },
            { label: 'Knob',           routerLink: ['/ds/uikit/knob'] },
            { label: 'ColorPicker',    routerLink: ['/ds/uikit/colorpicker'] },
            { label: 'Editor',         routerLink: ['/ds/uikit/editor'] },
            { label: 'Select',         routerLink: ['/ds/uikit/select'] },
            { label: 'Listbox',        routerLink: ['/ds/uikit/listbox'] },
            { label: 'MultiSelect',    routerLink: ['/ds/uikit/multiselect'] },
            { label: 'AutoComplete',   routerLink: ['/ds/uikit/autocomplete'] },
            { label: 'CascadeSelect',  routerLink: ['/ds/uikit/cascadeselect'] },
            { label: 'TreeSelect',     routerLink: ['/ds/uikit/treeselect'] },
            { label: 'DatePicker',     routerLink: ['/ds/uikit/datepicker'] },
            { label: 'Avatar',         routerLink: ['/ds/uikit/avatar'] },
            { label: 'Badge',          routerLink: ['/ds/uikit/badge'] },
            { label: 'Tag',            routerLink: ['/ds/uikit/tag'] },
            { label: 'Chip',           routerLink: ['/ds/uikit/chip'] },
            { label: 'ProgressBar',    routerLink: ['/ds/uikit/progressbar'] },
            { label: 'ProgressSpinner',routerLink: ['/ds/uikit/progressspinner'] },
            { label: 'MeterGroup',     routerLink: ['/ds/uikit/metergroup'] },
            { label: 'Skeleton',       routerLink: ['/ds/uikit/skeleton'] },
            { label: 'Inplace',        routerLink: ['/ds/uikit/inplace'] },
            { label: 'BlockUI',        routerLink: ['/ds/uikit/blockui'] },
            { label: 'ScrollTop',      routerLink: ['/ds/uikit/scrolltop'] },
            { label: 'AnimateOnScroll',routerLink: ['/ds/uikit/animateonscroll'] },
            { label: 'Terminal',       routerLink: ['/ds/uikit/terminal'] },
        ]
    },

    /* ══════════════ MOLÉCULAS ══════════════ */
    {
        label: 'Moléculas',
        icon: 'pi pi-clone',
        items: [
            { label: 'Card',          routerLink: ['/ds/uikit/card'] },
            { label: 'Accordion',     routerLink: ['/ds/uikit/accordion'] },
            { label: 'Tabs',          routerLink: ['/ds/uikit/tabs'] },
            { label: 'Panel',         routerLink: ['/ds/uikit/panel'] },
            { label: 'Fieldset',      routerLink: ['/ds/uikit/fieldset'] },
            { label: 'Toolbar',       routerLink: ['/ds/uikit/toolbar'] },
            { label: 'Divider',       routerLink: ['/ds/uikit/divider'] },
            { label: 'Stepper',       routerLink: ['/ds/uikit/stepper'] },
            { label: 'Splitter',      routerLink: ['/ds/uikit/splitter'] },
            { label: 'ScrollPanel',   routerLink: ['/ds/uikit/scrollpanel'] },
            { label: 'Toast',         routerLink: ['/ds/uikit/toast'] },
            { label: 'Message',       routerLink: ['/ds/uikit/message'] },
            { label: 'Dialog',        routerLink: ['/ds/uikit/dialog'] },
            { label: 'DynamicDialog', routerLink: ['/ds/uikit/dynamicdialog'] },
            { label: 'Drawer',        routerLink: ['/ds/uikit/drawer'] },
            { label: 'Tooltip',       routerLink: ['/ds/uikit/tooltip'] },
            { label: 'Popover',       routerLink: ['/ds/uikit/popover'] },
            { label: 'ConfirmDialog', routerLink: ['/ds/uikit/confirmdialog'] },
            { label: 'ConfirmPopup',  routerLink: ['/ds/uikit/confirmpopup'] },
        ]
    },

    /* ══════════════ ORGANISMOS ══════════════ */
    {
        label: 'Organismos',
        icon: 'pi pi-sitemap',
        items: [
            { label: 'DataTable',       routerLink: ['/ds/uikit/datatable'] },
            { label: 'Paginator',       routerLink: ['/ds/uikit/paginator'] },
            { label: 'Tree',            routerLink: ['/ds/uikit/tree'] },
            { label: 'TreeTable',       routerLink: ['/ds/uikit/treetable'] },
            { label: 'Timeline',        routerLink: ['/ds/uikit/timeline'] },
            { label: 'OrderList',       routerLink: ['/ds/uikit/orderlist'] },
            { label: 'PickList',        routerLink: ['/ds/uikit/picklist'] },
            { label: 'DataView',        routerLink: ['/ds/uikit/dataview'] },
            { label: 'OrgChart',        routerLink: ['/ds/uikit/orgchart'] },
            { label: 'VirtualScroller', routerLink: ['/ds/uikit/virtualscroller'] },
            { label: 'Menu',            routerLink: ['/ds/uikit/menu'] },
            { label: 'Menubar',         routerLink: ['/ds/uikit/menubar'] },
            { label: 'MegaMenu',        routerLink: ['/ds/uikit/megamenu'] },
            { label: 'Breadcrumb',      routerLink: ['/ds/uikit/breadcrumb'] },
            { label: 'PanelMenu',       routerLink: ['/ds/uikit/panelmenu'] },
            { label: 'TieredMenu',      routerLink: ['/ds/uikit/tieredmenu'] },
            { label: 'ContextMenu',     routerLink: ['/ds/uikit/contextmenu'] },
            { label: 'Dock',            routerLink: ['/ds/uikit/dock'] },
            { label: 'Steps',           routerLink: ['/ds/uikit/steps'] },
            { label: 'Image',           routerLink: ['/ds/uikit/image'] },
            { label: 'ImageCompare',    routerLink: ['/ds/uikit/imagecompare'] },
            { label: 'Galleria',        routerLink: ['/ds/uikit/galleria'] },
            { label: 'Carousel',        routerLink: ['/ds/uikit/carousel'] },
            { label: 'FileUpload',      routerLink: ['/ds/uikit/fileupload'] },
            { label: 'Chart',           routerLink: ['/ds/uikit/chart'] },
            { label: 'Form Layout',     routerLink: ['/ds/uikit/formlayout'] },
        ]
    },
];

/** Quantidade de páginas (itens com rota) dentro das seções informadas. */
export function contarItens(...secoes: string[]): number {
    return DS_MENU.filter((s) => secoes.includes(s.label ?? ''))
.reduce((total, s) => total + (s.items ?? []).filter((i) => i.routerLink).length, 0);
}
