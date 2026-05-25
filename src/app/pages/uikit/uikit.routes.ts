import { Routes } from '@angular/router';

// ── Legacy grouped pages (kept for backward compat) ──────────────────────────
import { FormLayoutDemo }  from './formlayoutdemo';
import { FileDemo }        from './filedemo';
import { TableDemo }       from './tabledemo';
import { TimelineDemo }    from './timelinedemo';

// ── Button ────────────────────────────────────────────────────────────────────
import { ButtonDemo }        from './button-demo';
import { SplitButtonDemo }   from './splitbutton-demo';
import { SpeedDialDemo }     from './speeddial-demo';

// ── Input ────────────────────────────────────────────────────────────────────
import { InputTextDemo }     from './inputtext-demo';
import { InputMaskDemo }     from './inputmask-demo';
import { InputGroupDemo }    from './inputgroup-demo';
import { PasswordDemo }      from './password-demo';
import { TextareaDemo }      from './textarea-demo';
import { InputNumberDemo }   from './inputnumber-demo';
import { CheckboxDemo }      from './checkbox-demo';
import { RadioButtonDemo }   from './radiobutton-demo';
import { ToggleSwitchDemo }  from './toggleswitch-demo';
import { SelectButtonDemo }  from './selectbutton-demo';
import { ToggleButtonDemo }  from './togglebutton-demo';
import { SliderDemo }        from './slider-demo';
import { RatingDemo }        from './rating-demo';
import { KnobDemo }          from './knob-demo';

// ── Select ────────────────────────────────────────────────────────────────────
import { SelectDemo }        from './select-demo';
import { ListboxDemo }       from './listbox-demo';
import { MultiSelectDemo }   from './multiselect-demo';
import { AutoCompleteDemo }  from './autocomplete-demo';
import { DatePickerDemo }    from './datepicker-demo';

// ── Overlay ───────────────────────────────────────────────────────────────────
import { DialogDemo }        from './dialog-demo';
import { DrawerDemo }        from './drawer-demo';
import { TooltipDemo }       from './tooltip-demo';
import { PopoverDemo }       from './popover-demo';
import { ConfirmDialogDemo } from './confirmdialog-demo';
import { ConfirmPopupDemo }  from './confirmpopup-demo';

// ── Panels ────────────────────────────────────────────────────────────────────
import { CardDemo }          from './card-demo';
import { AccordionDemo }     from './accordion-demo';
import { TabsDemo }          from './tabs-demo';
import { PanelDemo }         from './panel-demo';
import { ToolbarDemo }       from './toolbar-demo';
import { DividerDemo }       from './divider-demo';
import { StepperDemo }       from './stepper-demo';
import { FieldsetDemo }      from './fieldset-demo';
import { SplitterDemo }      from './splitter-demo';
import { ScrollPanelDemo }   from './scrollpanel-demo';

// ── Media ─────────────────────────────────────────────────────────────────────
import { ImageDemo }         from './image-demo';
import { GalleriaDemo }      from './galleria-demo';
import { CarouselDemo }      from './carousel-demo';

// ── Messages ──────────────────────────────────────────────────────────────────
import { ToastDemo }         from './toast-demo';
import { MessageDemo }       from './message-demo';

// ── Misc ──────────────────────────────────────────────────────────────────────
import { AvatarDemo }           from './avatar-demo';
import { BadgeDemo }            from './badge-demo';
import { ChipDemo }             from './chip-demo';
import { TagDemo }              from './tag-demo';
import { SkeletonDemo }         from './skeleton-demo';
import { ProgressBarDemo }      from './progressbar-demo';
import { ProgressSpinnerDemo }  from './progressspinner-demo';
import { MeterGroupDemo }       from './metergroup-demo';

// ── Navigation (Menu group) ───────────────────────────────────────────────────
import { MenuDemo }         from './menu-demo';
import { MenubarDemo }      from './menubar-demo';
import { BreadcrumbDemo }   from './breadcrumb-demo';
import { PanelMenuDemo }    from './panelmenu-demo';
import { TieredMenuDemo }   from './tieredmenu-demo';
import { ContextMenuDemo }  from './contextmenu-demo';
import { StepsDemo }        from './steps-demo';

// ── Lists ─────────────────────────────────────────────────────────────────────
import { OrderListDemo }    from './orderlist-demo';
import { PickListDemo }     from './picklist-demo';
import { DataViewDemo }     from './dataview-demo';

// ── Tree ──────────────────────────────────────────────────────────────────────
import { TreeDemoPage }     from './tree-demo';
import { TreeTableDemo }    from './treetable-demo';

// ── Chart ─────────────────────────────────────────────────────────────────────
import { ChartDemoPage }    from './chart-demo';

// ── Table / Paginator ─────────────────────────────────────────────────────────
import { PaginatorDemo }    from './paginator-demo';

export default [
    // ── Legacy grouped routes (backward compat) ──────────────────────────────
    { path: 'button',       data: { breadcrumb: 'Button' },       component: ButtonDemo },
    { path: 'formlayout',   data: { breadcrumb: 'Form Layout' },  component: FormLayoutDemo },
    { path: 'fileupload',   data: { breadcrumb: 'FileUpload' },   component: FileDemo },
    { path: 'file',         data: { breadcrumb: 'FileUpload' },   component: FileDemo },
    { path: 'timeline',     data: { breadcrumb: 'Timeline' },     component: TimelineDemo },

    // ── Button group ─────────────────────────────────────────────────────────
    { path: 'splitbutton',  data: { breadcrumb: 'SplitButton' },  component: SplitButtonDemo },
    { path: 'speeddial',    data: { breadcrumb: 'SpeedDial' },    component: SpeedDialDemo },

    // ── Input ─────────────────────────────────────────────────────────────────
    { path: 'inputtext',    data: { breadcrumb: 'InputText' },    component: InputTextDemo },
    { path: 'inputmask',    data: { breadcrumb: 'InputMask' },    component: InputMaskDemo },
    { path: 'inputgroup',   data: { breadcrumb: 'InputGroup' },   component: InputGroupDemo },
    { path: 'password',     data: { breadcrumb: 'Password' },     component: PasswordDemo },
    { path: 'textarea',     data: { breadcrumb: 'Textarea' },     component: TextareaDemo },
    { path: 'inputnumber',  data: { breadcrumb: 'InputNumber' },  component: InputNumberDemo },
    { path: 'checkbox',     data: { breadcrumb: 'Checkbox' },     component: CheckboxDemo },
    { path: 'radiobutton',  data: { breadcrumb: 'RadioButton' },  component: RadioButtonDemo },
    { path: 'toggleswitch', data: { breadcrumb: 'ToggleSwitch' }, component: ToggleSwitchDemo },
    { path: 'selectbutton', data: { breadcrumb: 'SelectButton' }, component: SelectButtonDemo },
    { path: 'togglebutton', data: { breadcrumb: 'ToggleButton' }, component: ToggleButtonDemo },
    { path: 'slider',       data: { breadcrumb: 'Slider' },       component: SliderDemo },
    { path: 'rating',       data: { breadcrumb: 'Rating' },       component: RatingDemo },
    { path: 'knob',         data: { breadcrumb: 'Knob' },         component: KnobDemo },

    // ── Select ────────────────────────────────────────────────────────────────
    { path: 'select',       data: { breadcrumb: 'Select' },       component: SelectDemo },
    { path: 'listbox',      data: { breadcrumb: 'Listbox' },      component: ListboxDemo },
    { path: 'multiselect',  data: { breadcrumb: 'MultiSelect' },  component: MultiSelectDemo },
    { path: 'autocomplete', data: { breadcrumb: 'AutoComplete' }, component: AutoCompleteDemo },
    { path: 'datepicker',   data: { breadcrumb: 'DatePicker' },   component: DatePickerDemo },

    // ── Overlay ───────────────────────────────────────────────────────────────
    { path: 'dialog',        data: { breadcrumb: 'Dialog' },        component: DialogDemo },
    { path: 'drawer',        data: { breadcrumb: 'Drawer' },        component: DrawerDemo },
    { path: 'tooltip',       data: { breadcrumb: 'Tooltip' },       component: TooltipDemo },
    { path: 'popover',       data: { breadcrumb: 'Popover' },       component: PopoverDemo },
    { path: 'confirmdialog', data: { breadcrumb: 'ConfirmDialog' }, component: ConfirmDialogDemo },
    { path: 'confirmpopup',  data: { breadcrumb: 'ConfirmPopup' },  component: ConfirmPopupDemo },

    // ── Panels ────────────────────────────────────────────────────────────────
    { path: 'card',         data: { breadcrumb: 'Card' },         component: CardDemo },
    { path: 'accordion',    data: { breadcrumb: 'Accordion' },    component: AccordionDemo },
    { path: 'tabs',         data: { breadcrumb: 'Tabs' },         component: TabsDemo },
    { path: 'panel',        data: { breadcrumb: 'Panel' },        component: PanelDemo },
    { path: 'toolbar',      data: { breadcrumb: 'Toolbar' },      component: ToolbarDemo },
    { path: 'divider',      data: { breadcrumb: 'Divider' },      component: DividerDemo },
    { path: 'stepper',      data: { breadcrumb: 'Stepper' },      component: StepperDemo },
    { path: 'fieldset',     data: { breadcrumb: 'Fieldset' },     component: FieldsetDemo },
    { path: 'splitter',     data: { breadcrumb: 'Splitter' },     component: SplitterDemo },
    { path: 'scrollpanel',  data: { breadcrumb: 'ScrollPanel' },  component: ScrollPanelDemo },

    // ── Media ─────────────────────────────────────────────────────────────────
    { path: 'image',        data: { breadcrumb: 'Image' },        component: ImageDemo },
    { path: 'galleria',     data: { breadcrumb: 'Galleria' },     component: GalleriaDemo },
    { path: 'carousel',     data: { breadcrumb: 'Carousel' },     component: CarouselDemo },

    // ── Messages ──────────────────────────────────────────────────────────────
    { path: 'toast',        data: { breadcrumb: 'Toast' },        component: ToastDemo },
    { path: 'message',      data: { breadcrumb: 'Message' },      component: MessageDemo },

    // ── Misc ──────────────────────────────────────────────────────────────────
    { path: 'avatar',           data: { breadcrumb: 'Avatar' },           component: AvatarDemo },
    { path: 'badge',            data: { breadcrumb: 'Badge' },            component: BadgeDemo },
    { path: 'chip',             data: { breadcrumb: 'Chip' },             component: ChipDemo },
    { path: 'tag',              data: { breadcrumb: 'Tag' },              component: TagDemo },
    { path: 'skeleton',         data: { breadcrumb: 'Skeleton' },         component: SkeletonDemo },
    { path: 'progressbar',      data: { breadcrumb: 'ProgressBar' },      component: ProgressBarDemo },
    { path: 'progressspinner',  data: { breadcrumb: 'ProgressSpinner' },  component: ProgressSpinnerDemo },
    { path: 'metergroup',       data: { breadcrumb: 'MeterGroup' },       component: MeterGroupDemo },

    // ── Navigation ────────────────────────────────────────────────────────────
    { path: 'menu',         data: { breadcrumb: 'Menu' },         component: MenuDemo },
    { path: 'menubar',      data: { breadcrumb: 'Menubar' },      component: MenubarDemo },
    { path: 'breadcrumb',   data: { breadcrumb: 'Breadcrumb' },   component: BreadcrumbDemo },
    { path: 'panelmenu',    data: { breadcrumb: 'PanelMenu' },    component: PanelMenuDemo },
    { path: 'tieredmenu',   data: { breadcrumb: 'TieredMenu' },   component: TieredMenuDemo },
    { path: 'contextmenu',  data: { breadcrumb: 'ContextMenu' },  component: ContextMenuDemo },
    { path: 'steps',        data: { breadcrumb: 'Steps' },        component: StepsDemo },

    // ── Lists ─────────────────────────────────────────────────────────────────
    { path: 'orderlist',    data: { breadcrumb: 'OrderList' },    component: OrderListDemo },
    { path: 'picklist',     data: { breadcrumb: 'PickList' },     component: PickListDemo },
    { path: 'dataview',     data: { breadcrumb: 'DataView' },     component: DataViewDemo },

    // ── Tree ──────────────────────────────────────────────────────────────────
    { path: 'tree',         data: { breadcrumb: 'Tree' },         component: TreeDemoPage },
    { path: 'treetable',    data: { breadcrumb: 'TreeTable' },    component: TreeTableDemo },

    // ── Chart ─────────────────────────────────────────────────────────────────
    { path: 'chart',        data: { breadcrumb: 'Chart' },        component: ChartDemoPage },
    { path: 'charts',       data: { breadcrumb: 'Charts' },       component: ChartDemoPage },

    // ── Table / Paginator ─────────────────────────────────────────────────────
    { path: 'datatable',    data: { breadcrumb: 'DataTable' },    component: TableDemo },
    { path: 'table',        data: { breadcrumb: 'DataTable' },    component: TableDemo },
    { path: 'paginator',    data: { breadcrumb: 'Paginator' },    component: PaginatorDemo },

    { path: '**', redirectTo: '/notfound' }
] as Routes;
