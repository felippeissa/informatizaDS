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
        .gs-steps {
            display: flex; flex-direction: column; gap: 0;
            margin-bottom: 48px;
        }
        .gs-step {
            display: grid;
            grid-template-columns: 48px 1fr;
            gap: 0 20px;
        }
        .gs-step-left {
            display: flex; flex-direction: column; align-items: center;
        }
        .gs-step-num {
            width: 36px; height: 36px; border-radius: 50%;
            background: #059669; color: #fff;
            font-size: 14px; font-weight: 800;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0; margin-top: 2px;
            box-shadow: 0 2px 8px rgba(5,150,105,.25);
        }
        .gs-step-line {
            width: 2px; flex: 1; background: #D1FAE5;
            margin: 6px 0; min-height: 20px;
        }
        .gs-step:last-child .gs-step-line { display: none; }
        .gs-step-body {
            padding-bottom: 28px;
        }
        .gs-step-title {
            font-size: 16px; font-weight: 700; color: var(--text-color);
            margin: 0 0 4px; padding-top: 4px;
        }
        .gs-step-desc {
            font-size: 13px; color: var(--text-color-secondary);
            margin: 0 0 12px; line-height: 1.6;
        }
        .code-block {
            background: #0F172A;
            border: 1px solid #1E293B;
            border-radius: 8px; padding: 12px 16px;
            font-family: 'Courier New', monospace; font-size: 13px;
            color: #E2E8F0;
            margin-bottom: 8px;
            overflow-x: auto;
        }
        .code-block:last-child { margin-bottom: 0; }
        .code-comment { color: #64748B; }
        .code-cmd { color: #86EFAC; }
        .code-str { color: #FCD34D; }
        .code-key { color: #93C5FD; }
        .gs-tip {
            display: flex; align-items: flex-start; gap: 8px;
            background: #ECFDF5; border: 1px solid #A7F3D0;
            border-radius: 8px; padding: 10px 14px;
            font-size: 12px; color: #065F46; line-height: 1.5;
            margin-top: 8px;
        }
        .gs-tip i { color: #059669; font-size: 14px; margin-top: 1px; flex-shrink: 0; }
        .gs-prereqs {
            display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 12px;
        }
        .gs-prereq-tag {
            display: flex; align-items: center; gap: 6px;
            background: var(--surface-ground); border: 1px solid var(--surface-border);
            border-radius: 6px; padding: 4px 12px;
            font-size: 12px; font-weight: 600; color: var(--text-color-secondary);
        }
        .gs-prereq-tag i { color: #059669; font-size: 12px; }
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

        <!-- Como Iniciar -->
        <h2 class="section-title">Como iniciar</h2>
        <p class="section-sub">
            Siga os passos abaixo para clonar o kit e começar a desenvolver com o Informatiza Design System v3.0.
        </p>

        <div class="gs-steps">

            <!-- Pré-requisitos -->
            <div class="gs-step">
                <div class="gs-step-left">
                    <div class="gs-step-num">1</div>
                    <div class="gs-step-line"></div>
                </div>
                <div class="gs-step-body">
                    <div class="gs-step-title">Pré-requisitos</div>
                    <p class="gs-step-desc">Certifique-se de ter as ferramentas abaixo instaladas antes de começar.</p>
                    <div class="gs-prereqs">
                        <span class="gs-prereq-tag"><i class="pi pi-check-circle"></i> Node.js 22+</span>
                        <span class="gs-prereq-tag"><i class="pi pi-check-circle"></i> npm 10+</span>
                        <span class="gs-prereq-tag"><i class="pi pi-check-circle"></i> Angular CLI 21</span>
                        <span class="gs-prereq-tag"><i class="pi pi-check-circle"></i> Git</span>
                    </div>
                    <div class="code-block">
                        <span class="code-comment"># Instale o Angular CLI globalmente (caso ainda não tenha)</span><br/>
                        <span class="code-cmd">npm install -g &#64;angular/cli&#64;21</span>
                    </div>
                </div>
            </div>

            <!-- Clonar o repositório -->
            <div class="gs-step">
                <div class="gs-step-left">
                    <div class="gs-step-num">2</div>
                    <div class="gs-step-line"></div>
                </div>
                <div class="gs-step-body">
                    <div class="gs-step-title">Clonar o repositório</div>
                    <p class="gs-step-desc">Clone o repositório oficial do Informatiza DS e entre na pasta do projeto.</p>
                    <div class="code-block">
                        <span class="code-cmd">git clone https://github.com/felippeissa/informatizaDS.git</span><br/>
                        <span class="code-cmd">cd informatizaDS</span>
                    </div>
                </div>
            </div>

            <!-- Instalar dependências -->
            <div class="gs-step">
                <div class="gs-step-left">
                    <div class="gs-step-num">3</div>
                    <div class="gs-step-line"></div>
                </div>
                <div class="gs-step-body">
                    <div class="gs-step-title">Instalar dependências</div>
                    <p class="gs-step-desc">Instale todos os pacotes necessários com npm.</p>
                    <div class="code-block">
                        <span class="code-cmd">npm install</span>
                    </div>
                    <div class="gs-tip">
                        <i class="pi pi-info-circle"></i>
                        <span>O projeto usa <strong>Angular 21</strong>, <strong>PrimeNG 21</strong> e <strong>Tailwind CSS 4</strong>. Todas as dependências serão instaladas automaticamente.</span>
                    </div>
                </div>
            </div>

            <!-- Rodar localmente -->
            <div class="gs-step">
                <div class="gs-step-left">
                    <div class="gs-step-num">4</div>
                    <div class="gs-step-line"></div>
                </div>
                <div class="gs-step-body">
                    <div class="gs-step-title">Rodar localmente</div>
                    <p class="gs-step-desc">Inicie o servidor de desenvolvimento. A aplicação abre automaticamente em <strong>http://localhost:4200</strong>.</p>
                    <div class="code-block">
                        <span class="code-cmd">ng serve</span>
                    </div>
                    <div class="code-block">
                        <span class="code-comment"># Ou via npm</span><br/>
                        <span class="code-cmd">npm start</span>
                    </div>
                </div>
            </div>

            <!-- Estrutura do projeto -->
            <div class="gs-step">
                <div class="gs-step-left">
                    <div class="gs-step-num">5</div>
                    <div class="gs-step-line"></div>
                </div>
                <div class="gs-step-body">
                    <div class="gs-step-title">Estrutura do projeto</div>
                    <p class="gs-step-desc">Conheça a organização de pastas do kit.</p>
                    <div class="code-block">
                        <span class="code-key">src/</span><br/>
                        <span>&nbsp;&nbsp;</span><span class="code-key">app/</span><br/>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="code-key">layout/</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-comment"># Topbar, sidebar, configurador de tema</span><br/>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="code-key">pages/</span><br/>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="code-key">ds/</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-comment"># Página inicial do design system</span><br/>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="code-key">uikit/</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-comment"># Demos de cada componente</span><br/>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="code-key">auth/</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-comment"># Tela de login</span><br/>
                        <span>&nbsp;&nbsp;</span><span class="code-key">assets/</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-comment"># Estilos globais, temas, imagens</span>
                    </div>
                </div>
            </div>

            <!-- Usar um componente -->
            <div class="gs-step">
                <div class="gs-step-left">
                    <div class="gs-step-num">6</div>
                    <div class="gs-step-line"></div>
                </div>
                <div class="gs-step-body">
                    <div class="gs-step-title">Usar um componente</div>
                    <p class="gs-step-desc">Importe o módulo do componente desejado diretamente do PrimeNG no seu componente standalone.</p>
                    <div class="code-block">
                        <span class="code-key">import</span> &#123; <span class="code-str">ButtonModule</span> &#125; <span class="code-key">from</span> <span class="code-str">'primeng/button'</span>;<br/>
                        <span class="code-key">import</span> &#123; <span class="code-str">InputTextModule</span> &#125; <span class="code-key">from</span> <span class="code-str">'primeng/inputtext'</span>;<br/><br/>
                        <span class="code-key">&#64;Component</span>(&#123;<br/>
                        &nbsp;&nbsp;<span class="code-str">standalone</span>: <span class="code-key">true</span>,<br/>
                        &nbsp;&nbsp;<span class="code-str">imports</span>: [<span class="code-str">ButtonModule</span>, <span class="code-str">InputTextModule</span>],<br/>
                        &nbsp;&nbsp;<span class="code-comment">// ...</span><br/>
                        &#125;)
                    </div>
                    <div class="gs-tip">
                        <i class="pi pi-lightbulb"></i>
                        <span>Cada página de componente neste portal traz exemplos prontos, variações de estado e referência completa de propriedades.</span>
                    </div>
                </div>
            </div>

            <!-- Build para produção -->
            <div class="gs-step">
                <div class="gs-step-left">
                    <div class="gs-step-num">7</div>
                </div>
                <div class="gs-step-body">
                    <div class="gs-step-title">Build para produção</div>
                    <p class="gs-step-desc">Gere o build otimizado para deploy.</p>
                    <div class="code-block">
                        <span class="code-cmd">ng build --configuration production</span>
                    </div>
                    <div class="gs-tip">
                        <i class="pi pi-info-circle"></i>
                        <span>O CI/CD via GitHub Actions já está configurado — qualquer push na branch <strong>main</strong> faz deploy automático no GitHub Pages.</span>
                    </div>
                </div>
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
