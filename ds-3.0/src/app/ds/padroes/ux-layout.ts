import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { UxFigma, UxFonte } from './ux-fonte';

/** PADRÃO DE UX — Layout (header, sidebar, MegaMenu, menu mobile). */
@Component({
    selector: 'app-ux-layout',
    standalone: true,
    imports: [AvatarModule, ButtonModule, UxFigma, UxFonte],
    template: `
    <div class="ds-page">
        <div class="ds-page-header">
            <div>
                <h1 class="ds-page-title">Layout e navegação</h1>
                <app-ux-fonte />
            </div>
        </div>

        <!-- HEADER -->
        <div class="ds-card">
            <div class="ux-card-topo">
                <h2 class="ds-card-titulo"><i class="pi pi-window-maximize"></i> Cabeçalho (header)</h2>
                <app-ux-figma node="8336-230951" />
            </div>
            <p class="ux-quando"><strong>Quando usar:</strong> todo sistema tem o cabeçalho padrão, fixo no topo, salvo se o designer avaliar outra solução como mais adequada.</p>

            <div class="ux-exemplo">
                <span class="ux-exemplo-rotulo">Anatomia</span>
                <div class="ux-mock-header">
                    <span class="ux-mock-marcador"><i class="pi pi-bars"></i><span class="ux-num">1</span></span>
                    <span class="ux-mock-marca ux-mock-marcador"><span class="ux-mock-brasao"><i class="pi pi-shield"></i></span> SISTEMA<span class="ux-num">2</span></span>
                    <span class="ux-mock-espaco"></span>
                    <span class="ux-mock-marcador"><p-button label="Ação" [text]="true" icon="pi pi-plus" size="small" /><span class="ux-num">3</span></span>
                    <span class="ux-mock-marcador"><i class="pi pi-bell"></i><span class="ux-num">4</span></span>
                    <span class="ux-mock-user ux-mock-marcador">
                        <p-avatar label="AS" shape="circle" />
                        <span><strong>Ana Souza</strong><br /><small>Analista · Economia</small></span>
                        <i class="pi pi-angle-down"></i>
                        <span class="ux-num">5</span>
                    </span>
                    <span class="ux-mock-marcador"><i class="pi pi-sign-out"></i><span class="ux-num">6</span></span>
                </div>
            </div>
            <div class="ux-anatomia" style="margin-top:1rem">
                <div class="ux-anat-item"><span class="ux-num">1</span><span><strong>Botão abrir/recolher menu</strong><span class="ux-tag-obrig ux-tag-obrig--nao">condicional</span> — só se o sidebar abrir/fechar. Se for estático, oculte.</span></div>
                <div class="ux-anat-item"><span class="ux-num">2</span><span><strong>Brasão + nome do sistema</strong><span class="ux-tag-obrig ux-tag-obrig--sim">obrigatório</span> — sigla toda em maiúsculas (SIGLA); nome completo só com iniciais maiúsculas ("Expresso Servidor").</span></div>
                <div class="ux-anat-item"><span class="ux-num">3</span><span><strong>Ação</strong><span class="ux-tag-obrig ux-tag-obrig--nao">opcional</span> — personalizada conforme o requisito, ou oculta.</span></div>
                <div class="ux-anat-item"><span class="ux-num">4</span><span><strong>Notificação</strong><span class="ux-tag-obrig ux-tag-obrig--nao">opcional</span></span></div>
                <div class="ux-anat-item"><span class="ux-num">5</span><span><strong>Usuário (avatar + nome)</strong><span class="ux-tag-obrig ux-tag-obrig--sim">obrigatório</span>. <strong>Dropdown</strong> opcional (oculte se não houver mais funções). <strong>Descrição</strong> opcional (e-mail, cargo…).</span></div>
                <div class="ux-anat-item"><span class="ux-num">6</span><span><strong>Logout</strong><span class="ux-tag-obrig ux-tag-obrig--sim">obrigatório</span> — sempre com <strong>modal de confirmação</strong>.</span></div>
            </div>
        </div>

        <!-- SIDEBAR -->
        <div class="ds-card">
            <div class="ux-card-topo">
                <h2 class="ds-card-titulo"><i class="pi pi-bars"></i> Menu (sidebar)</h2>
                <app-ux-figma node="8327-20347" />
            </div>
            <p class="ux-quando"><strong>Quando usar:</strong> é o <strong>componente de navegação prioritário</strong> do DS. Substitua só quando o projeto exigir outra solução.</p>

            <div class="ux-exemplo">
                <span class="ux-exemplo-rotulo">Aberto (padrão) e fechado</span>
                <div class="ux-mock-sidebars">
                    <div class="ux-mock-sidebar">
                        <div class="ux-mock-item"><i class="pi pi-home"></i> Página inicial</div>
                        <div class="ux-mock-item ux-mock-item--ativo"><i class="pi pi-users"></i> Gestão de usuários <i class="pi pi-angle-up ux-mock-seta"></i></div>
                        <div class="ux-mock-item ux-mock-item--sub">Consulta de usuários</div>
                        <div class="ux-mock-item ux-mock-item--sub">Cadastro de usuários</div>
                        <div class="ux-mock-item"><i class="pi pi-building"></i> Gestão de unidades <i class="pi pi-angle-down ux-mock-seta"></i></div>
                        <div class="ux-mock-item"><i class="pi pi-chart-bar"></i> Relatórios</div>
                    </div>
                    <div class="ux-mock-sidebar ux-mock-sidebar--fechado">
                        <div class="ux-mock-item"><i class="pi pi-home"></i></div>
                        <div class="ux-mock-item ux-mock-item--ativo"><i class="pi pi-users"></i></div>
                        <div class="ux-mock-item"><i class="pi pi-building"></i></div>
                        <div class="ux-mock-item"><i class="pi pi-chart-bar"></i></div>
                    </div>
                </div>
            </div>

            <h3 class="ux-sub">Anatomia</h3>
            <ul class="ux-regras">
                <li><strong>Aberto</strong> é o formato padrão (inclusive nos protótipos e no primeiro contato do cliente).</li>
                <li><strong>Campo de busca</strong> opcional — só em menus com muitos itens, documentado pelo analista.</li>
                <li><strong>Itens</strong> obrigatórios, definidos pelas <strong>permissões dos perfis</strong>.</li>
                <li><strong>Ícones</strong>: opcionais em menu estático; <strong>obrigatórios</strong> se o menu puder ser recolhido. Subitens: ícone opcional.</li>
                <li>Item com subitens mostra seta <code>angle</code> à direita: <strong>para baixo = fechado</strong>, <strong>para cima = aberto</strong>.</li>
                <li><strong>Fechado</strong>: clicar no ícone leva direto à tela.</li>
            </ul>

            <h3 class="ux-sub">Texto dos itens</h3>
            <ul class="ux-regras">
                <li>Só a <strong>primeira letra maiúscula</strong>: "Página inicial", "Gestão de usuários".</li>
                <li><strong>Substantivo, não verbo no infinitivo</strong>: "Consulta de usuários" (não "Consultar usuários"); "Gestão de unidades orçamentárias" (não "Gerir…").</li>
                <li>O <strong>filho herda o nome do pai</strong>: em "Gestão de usuários", use "Consulta de usuários" e "Cadastro de usuários", não só "Consulta" e "Cadastro".</li>
                <li>Limite de <strong>40 caracteres</strong>.</li>
            </ul>

            <h3 class="ux-sub">Comportamento</h3>
            <ul class="ux-regras">
                <li>Dois estados, aberto e fechado, alternados pelo botão hambúrguer.</li>
                <li><strong>Menu simples fechado:</strong> clicar no ícone navega direto.</li>
                <li><strong>Com busca:</strong> clicar em qualquer ícone expande o menu.</li>
                <li><strong>Com subitens:</strong> clicar no ícone expande o menu já com aquele item aberto; ao fechar, só os itens principais ficam visíveis. Expandindo pelo hambúrguer, os subitens <strong>não</strong> abrem sozinhos.</li>
            </ul>

            <h3 class="ux-sub">Regras da busca no menu</h3>
            <ul class="ux-regras">
                <li>Cada item é buscado pelo <strong>caminho completo</strong> da raiz até ele (ex.: "Gestão de usuários · Consultas · Consultar").</li>
                <li>Todas as palavras, <strong>em qualquer ordem</strong>, em qualquer parte do caminho ("anular empenho em lote" encontra "Empenho › Anular em lote").</li>
                <li>Ignora <strong>maiúsculas, acentos</strong> (orçamento = orcamento) e <strong>plural/singular</strong> (usuário = usuários; ação = ações).</li>
                <li>Ordem por relevância: nome idêntico → nome contém → nome + pai → nome + ancestral distante.</li>
            </ul>
        </div>

        <!-- MEGAMENU -->
        <div class="ds-card">
            <div class="ux-card-topo">
                <h2 class="ds-card-titulo"><i class="pi pi-th-large"></i> MegaMenu</h2>
                <app-ux-figma node="6738-52938" />
            </div>
            <p class="ux-quando"><strong>Quando usar:</strong> só quando a navegação tiver <strong>três ou mais níveis</strong> ou muitas funcionalidades. Suporta 3 níveis por padrão (4º nível via TieredMenu híbrido).</p>
            <ul class="ux-regras">
                <li><strong>Não tem versão fechada:</strong> o hambúrguer recolhe o menu totalmente para a esquerda.</li>
                <li>Itens de 1º nível com seta <code>angle-right</code> abrem o <strong>MegaMenu Overlay</strong>. Se usar ícones, cada item pai tem um ícone único.</li>
                <li>Overlay: até <strong>1636px</strong> (tela 1920), <strong>826px</strong> (1280), <strong>556px</strong> (1024), <strong>286px</strong> (768). Poucos itens → largura se ajusta ao conteúdo.</li>
                <li>Títulos e itens com até <strong>40 caracteres</strong>, primeira letra maiúscula; se um título quebrar linha, alinhe a altura dos demais.</li>
                <li>4º nível: subitem com <code>angle-right</code> abre um <strong>TieredMenu híbrido</strong> sobreposto.</li>
                <li><strong>Busca no header</strong> (lupa) é <strong>obrigatória</strong>: dialog de 700px, input sem rótulo, área "Recentes" (2 últimas), item com estrela de favoritar e o caminho da funcionalidade.</li>
                <li><strong>Favoritos</strong> obrigatório: item fixo no topo do MegaMenu, começa vazio, lista por ordem de inclusão (mais recente primeiro), sem limite, individual por usuário.</li>
                <li>Abaixo de 768px, use o <strong>Menu Mobile</strong>.</li>
            </ul>
        </div>

        <!-- MOBILE -->
        <div class="ds-card">
            <div class="ux-card-topo">
                <h2 class="ds-card-titulo"><i class="pi pi-mobile"></i> Menu mobile</h2>
                <app-ux-figma node="12248-9259" />
            </div>
            <p class="ux-quando"><strong>Quando usar:</strong> só em sistemas com <strong>MegaMenu</strong>, nas telas pequenas (sm 640px e base 390px).</p>
            <ul class="ux-regras">
                <li>Navegação <strong>sequencial</strong> em tela cheia: categorias principais → ao tocar, a lista é substituída pelos subitens, até o último nível.</li>
                <li>Itens com subníveis mostram <code>angle-right</code> à direita; o item selecionado (para voltar) mostra a seta à esquerda.</li>
                <li><strong>Toda a área do item é tocável</strong> (texto e ícone).</li>
                <li>Ícones em subitens são opcionais, mas consistentes em todo o nível; textos com até 40 caracteres.</li>
            </ul>
        </div>
    </div>
    `
})
export class UxLayout {}
