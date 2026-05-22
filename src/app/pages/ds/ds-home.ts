import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';

interface ComponentGroup {
    label: string;
    icon: string;
    items: { name: string; route: string; desc: string }[];
}

@Component({
    selector: 'app-ds-home',
    standalone: true,
    imports: [RouterModule, TagModule, DividerModule],
    styles: [`
        .ds-hero {
            padding: 48px 0 36px;
            border-bottom: 1px solid var(--surface-border);
            margin-bottom: 40px;
        }
        .ds-badge {
            display: inline-flex; align-items: center; gap: 8px;
            background: #ECFDF5; border: 1px solid #A7F3D0;
            color: #059669; font-size: 12px; font-weight: 700;
            padding: 4px 12px; border-radius: 20px;
            margin-bottom: 16px; letter-spacing: .04em;
        }
        .ds-title {
            font-size: 40px; font-weight: 800;
            color: var(--text-color); line-height: 1.1;
            margin: 0 0 16px;
        }
        .ds-title span { color: #059669; }
        .ds-subtitle {
            font-size: 16px; color: var(--text-color-secondary);
            max-width: 540px; line-height: 1.6; margin: 0 0 28px;
        }
        .ds-meta { display: flex; gap: 24px; flex-wrap: wrap; }
        .ds-meta-item {
            display: flex; align-items: center; gap: 8px;
            font-size: 13px; color: var(--text-color-secondary); font-weight: 500;
        }
        .ds-meta-item i { color: #059669; font-size: 14px; }
        .section-title {
            font-size: 22px; font-weight: 700;
            color: var(--text-color); margin: 0 0 6px;
        }
        .section-sub {
            font-size: 14px; color: var(--text-color-secondary);
            margin: 0 0 24px;
        }
        .components-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 16px;
            margin-bottom: 48px;
        }
        .comp-group-card {
            background: var(--surface-card);
            border: 1px solid var(--surface-border);
            border-radius: 12px;
            padding: 20px;
            transition: box-shadow .15s;
        }
        .comp-group-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,.08); }
        .comp-group-header {
            display: flex; align-items: center; gap: 10px;
            margin-bottom: 14px;
        }
        .comp-group-icon {
            width: 36px; height: 36px; border-radius: 8px;
            background: #ECFDF5; display: flex; align-items: center; justify-content: center;
        }
        .comp-group-icon i { color: #059669; font-size: 16px; }
        .comp-group-title { font-size: 15px; font-weight: 700; color: var(--text-color); }
        .comp-list { display: flex; flex-wrap: wrap; gap: 6px; }
        .comp-chip {
            font-size: 12px; color: var(--text-color-secondary);
            background: var(--surface-ground);
            border: 1px solid var(--surface-border);
            border-radius: 6px; padding: 3px 10px;
            text-decoration: none; transition: all .12s;
            cursor: pointer;
        }
        .comp-chip:hover {
            background: #ECFDF5; border-color: #6EE7B7;
            color: #059669; font-weight: 600;
        }
        .start-section {
            background: var(--surface-card);
            border: 1px solid var(--surface-border);
            border-radius: 12px; padding: 28px 32px;
            margin-bottom: 48px;
        }
        .start-title { font-size: 18px; font-weight: 700; color: var(--text-color); margin: 0 0 8px; }
        .start-desc { font-size: 14px; color: var(--text-color-secondary); margin: 0 0 20px; }
        .code-block {
            background: var(--surface-ground);
            border: 1px solid var(--surface-border);
            border-radius: 8px; padding: 14px 18px;
            font-family: monospace; font-size: 13px;
            color: var(--text-color);
            display: flex; align-items: center; justify-content: space-between;
        }
        .token-green { color: #059669; }
        .token-blue { color: #3B82F6; }
        .token-orange { color: #D97706; }
    `],
    template: `
        <!-- Hero -->
        <div class="ds-hero">
            <div class="ds-badge">
                <i class="pi pi-verified"></i>
                Design System Oficial · Informatiza Goiás
            </div>
            <h1 class="ds-title">
                Informatiza<br /><span>Design System</span>
            </h1>
            <p class="ds-subtitle">
                Biblioteca de componentes e diretrizes visuais do Governo do Estado de Goiás.
                Construída com Angular e PrimeNG para padronizar a experiência
                em todos os sistemas do Informatiza Goiás.
            </p>
            <div class="ds-meta">
                <span class="ds-meta-item"><i class="pi pi-box"></i> Angular 21</span>
                <span class="ds-meta-item"><i class="pi pi-th-large"></i> PrimeNG 21</span>
                <span class="ds-meta-item"><i class="pi pi-palette"></i> Tailwind CSS 4</span>
                <span class="ds-meta-item"><i class="pi pi-check-circle"></i> Acessível (WCAG 2.1)</span>
            </div>
        </div>

        <!-- Componentes -->
        <h2 class="section-title">Componentes</h2>
        <p class="section-sub">
            {{ totalComponents }} componentes organizados em {{ groups.length }} categorias, prontos para uso.
        </p>

        <div class="components-grid">
            @for (group of groups; track group.label) {
                <div class="comp-group-card">
                    <div class="comp-group-header">
                        <div class="comp-group-icon">
                            <i [class]="group.icon"></i>
                        </div>
                        <span class="comp-group-title">{{ group.label }}</span>
                    </div>
                    <div class="comp-list">
                        @for (item of group.items; track item.name) {
                            <a [routerLink]="item.route" class="comp-chip">{{ item.name }}</a>
                        }
                    </div>
                </div>
            }
        </div>

        <!-- Começando -->
        <h2 class="section-title">Começando</h2>
        <p class="section-sub">Acesse qualquer componente pelo menu lateral ou pelos links acima.</p>
        <div class="start-section">
            <div class="start-title">Estrutura de cada componente</div>
            <p class="start-desc">
                Cada página de componente contém: visão geral, demonstrações interativas,
                variações de estado e referência de propriedades.
            </p>
            <div class="code-block">
                <span>
                    <span class="token-green">import</span> &#123; <span class="token-blue">ButtonModule</span> &#125;
                    <span class="token-green"> from</span>
                    <span class="token-orange"> 'primeng/button'</span>;
                </span>
            </div>
        </div>
    `
})
export class DsHome {
    groups: ComponentGroup[] = [
        {
            label: 'Formulário',
            icon: 'pi pi-pencil',
            items: [
                { name: 'InputText', route: '/ds/uikit/input', desc: 'Campo de texto' },
                { name: 'Password', route: '/ds/uikit/input', desc: 'Campo senha' },
                { name: 'Checkbox', route: '/ds/uikit/input', desc: 'Checkbox' },
                { name: 'RadioButton', route: '/ds/uikit/input', desc: 'Radio' },
                { name: 'Select', route: '/ds/uikit/input', desc: 'Select' },
                { name: 'MultiSelect', route: '/ds/uikit/input', desc: 'Multi select' },
                { name: 'DatePicker', route: '/ds/uikit/input', desc: 'Data' },
                { name: 'InputNumber', route: '/ds/uikit/input', desc: 'Número' },
                { name: 'Textarea', route: '/ds/uikit/input', desc: 'Texto longo' },
                { name: 'AutoComplete', route: '/ds/uikit/input', desc: 'Auto complete' },
                { name: 'ToggleSwitch', route: '/ds/uikit/input', desc: 'Toggle' },
                { name: 'Slider', route: '/ds/uikit/input', desc: 'Slider' },
            ]
        },
        {
            label: 'Botões',
            icon: 'pi pi-stop',
            items: [
                { name: 'Button', route: '/ds/uikit/button', desc: 'Botão padrão' },
                { name: 'SplitButton', route: '/ds/uikit/button', desc: 'Split button' },
                { name: 'SpeedDial', route: '/ds/uikit/button', desc: 'Speed dial' },
            ]
        },
        {
            label: 'Dados',
            icon: 'pi pi-table',
            items: [
                { name: 'DataTable', route: '/ds/uikit/table', desc: 'Tabela' },
                { name: 'Tree', route: '/ds/uikit/tree', desc: 'Árvore' },
                { name: 'Timeline', route: '/ds/uikit/timeline', desc: 'Timeline' },
                { name: 'Paginator', route: '/ds/uikit/table', desc: 'Paginação' },
                { name: 'OrderList', route: '/ds/uikit/list', desc: 'Lista ordenada' },
            ]
        },
        {
            label: 'Painéis',
            icon: 'pi pi-tablet',
            items: [
                { name: 'Card', route: '/ds/uikit/panel', desc: 'Card' },
                { name: 'Accordion', route: '/ds/uikit/panel', desc: 'Accordion' },
                { name: 'Tabs', route: '/ds/uikit/panel', desc: 'Abas' },
                { name: 'Panel', route: '/ds/uikit/panel', desc: 'Painel' },
                { name: 'Toolbar', route: '/ds/uikit/panel', desc: 'Toolbar' },
                { name: 'Divider', route: '/ds/uikit/panel', desc: 'Divisor' },
                { name: 'Stepper', route: '/ds/uikit/panel', desc: 'Stepper' },
            ]
        },
        {
            label: 'Sobreposições',
            icon: 'pi pi-clone',
            items: [
                { name: 'Dialog', route: '/ds/uikit/overlay', desc: 'Diálogo' },
                { name: 'Drawer', route: '/ds/uikit/overlay', desc: 'Gaveta' },
                { name: 'Tooltip', route: '/ds/uikit/overlay', desc: 'Tooltip' },
                { name: 'Popover', route: '/ds/uikit/overlay', desc: 'Popover' },
                { name: 'ConfirmDialog', route: '/ds/uikit/overlay', desc: 'Confirmação' },
            ]
        },
        {
            label: 'Navegação',
            icon: 'pi pi-bars',
            items: [
                { name: 'Menu', route: '/ds/uikit/menu', desc: 'Menu' },
                { name: 'Menubar', route: '/ds/uikit/menu', desc: 'Menubar' },
                { name: 'Breadcrumb', route: '/ds/uikit/menu', desc: 'Breadcrumb' },
                { name: 'PanelMenu', route: '/ds/uikit/menu', desc: 'Panel menu' },
                { name: 'TieredMenu', route: '/ds/uikit/menu', desc: 'Menu hierárquico' },
            ]
        },
        {
            label: 'Mensagens',
            icon: 'pi pi-comment',
            items: [
                { name: 'Toast', route: '/ds/uikit/message', desc: 'Toast' },
                { name: 'Message', route: '/ds/uikit/message', desc: 'Mensagem inline' },
            ]
        },
        {
            label: 'Mídia',
            icon: 'pi pi-image',
            items: [
                { name: 'Image', route: '/ds/uikit/media', desc: 'Imagem' },
                { name: 'Galleria', route: '/ds/uikit/media', desc: 'Galeria' },
                { name: 'Carousel', route: '/ds/uikit/media', desc: 'Carrossel' },
                { name: 'FileUpload', route: '/ds/uikit/file', desc: 'Upload' },
            ]
        },
        {
            label: 'Miscelânea',
            icon: 'pi pi-circle',
            items: [
                { name: 'Avatar', route: '/ds/uikit/misc', desc: 'Avatar' },
                { name: 'Badge', route: '/ds/uikit/misc', desc: 'Badge' },
                { name: 'Tag', route: '/ds/uikit/misc', desc: 'Tag' },
                { name: 'Chip', route: '/ds/uikit/misc', desc: 'Chip' },
                { name: 'ProgressBar', route: '/ds/uikit/misc', desc: 'Progresso' },
                { name: 'Skeleton', route: '/ds/uikit/misc', desc: 'Skeleton' },
            ]
        }
    ];

    get totalComponents(): number {
        return this.groups.reduce((acc, g) => acc + g.items.length, 0);
    }
}
