import { MenuItem } from 'primeng/api';

/**
 * Estrutura de navegação de exemplo (sistema fictício "SIGO" — Sistema Integrado de Gestão Orçamentária).
 * Regras GESIS aplicadas nos textos: primeira letra maiúscula, substantivos ("Consulta de empenhos"),
 * filho herda o nome do pai, no máximo 40 caracteres. Ícone único por item de 1º nível.
 *
 * Níveis: 1º = item do MegaMenu · 2º = título de coluna do overlay · 3º = subitem ·
 *         4º+ = TieredMenu híbrido (subitem com seta).
 */
export interface MmNo { label: string; icon?: string; itens?: MmNo[]; }

export const MM_MENU: MmNo[] = [
    {
        label: 'Planejamento', icon: 'pi pi-compass', itens: [
            { label: 'Plano plurianual', itens: [
                { label: 'Consulta de programas' }, { label: 'Cadastro de programas' },
                { label: 'Consulta de ações' }, { label: 'Cadastro de ações' },
            ]},
            { label: 'Lei orçamentária', itens: [
                { label: 'Consulta de dotações' },
                { label: 'Créditos adicionais', itens: [
                    { label: 'Crédito suplementar' }, { label: 'Crédito especial' }, { label: 'Crédito extraordinário' },
                ]},
            ]},
        ],
    },
    {
        label: 'Execução orçamentária', icon: 'pi pi-wallet', itens: [
            { label: 'Empenho', itens: [
                { label: 'Emissão de empenho' }, { label: 'Consulta de empenhos' },
                { label: 'Anulação de empenho', itens: [
                    { label: 'Anular empenho' }, { label: 'Anular empenho em lote' },
                ]},
            ]},
            { label: 'Liquidação', itens: [
                { label: 'Registro de liquidação' }, { label: 'Consulta de liquidações' },
            ]},
            { label: 'Pagamento', itens: [
                { label: 'Ordem de pagamento' }, { label: 'Consulta de pagamentos' }, { label: 'Programação financeira' },
            ]},
            { label: 'Restos a pagar', itens: [
                { label: 'Inscrição de restos a pagar' }, { label: 'Cancelamento de restos a pagar' },
            ]},
        ],
    },
    {
        label: 'Contabilidade', icon: 'pi pi-calculator', itens: [
            { label: 'Lançamentos contábeis', itens: [
                { label: 'Lançamento manual' }, { label: 'Consulta de lançamentos' },
            ]},
            { label: 'Encerramento', itens: [
                { label: 'Encerramento mensal' }, { label: 'Encerramento anual' },
            ]},
        ],
    },
    {
        label: 'Relatórios', icon: 'pi pi-chart-bar', itens: [
            { label: 'Relatórios gerenciais', itens: [
                { label: 'Execução por órgão' }, { label: 'Execução por fonte de recurso' },
            ]},
            { label: 'Relatórios legais', itens: [
                { label: 'RREO' },
                { label: 'RGF', itens: [ { label: 'RGF anexo 1' }, { label: 'RGF anexo 2' } ] },
            ]},
        ],
    },
    {
        label: 'Cadastros', icon: 'pi pi-database', itens: [
            { label: 'Estrutura administrativa', itens: [
                { label: 'Cadastro de órgãos' }, { label: 'Cadastro de unidades orçamentárias' }, { label: 'Cadastro de fontes de recurso' },
            ]},
            { label: 'Credores', itens: [ { label: 'Consulta de credores' }, { label: 'Cadastro de credores' } ] },
        ],
    },
    {
        label: 'Administração', icon: 'pi pi-cog', itens: [
            { label: 'Gestão de usuários', itens: [
                { label: 'Consulta de usuários' }, { label: 'Cadastro de usuários' }, { label: 'Perfis de acesso' },
            ]},
            { label: 'Sistema', itens: [ { label: 'Parâmetros do sistema' }, { label: 'Auditoria' } ] },
        ],
    },
];

/** Converte para MenuItem (com "routerLink" = caminho) para reaproveitar a busca do menu (menu-busca.ts). */
export function paraMenuItem(nos: MmNo[], pai = ''): MenuItem[] {
    return nos.map((n) => {
        const id = pai ? pai + ' › ' + n.label : n.label;
        return n.itens?.length
            ? { label: n.label, icon: n.icon, items: paraMenuItem(n.itens, id) }
            : { label: n.label, icon: n.icon, routerLink: [id] };
    });
}
