import { Projeto } from './godev.models';

export const PROJETOS_MOCK: Projeto[] = [
    {
        id: 1,
        nome: 'Portal Unificado de Atendimento ao Cidadão',
        descricao: 'Sistema de atendimento integrado para serviços estaduais.',
        tipo: 'Web',
        status: 'ativo',
        ultimaPublicacao: 'há 10 min',
        membros: [
            { id: 1, nome: 'Felipe Santiago', email: 'felipe@go.gov.br',  papel: 'PO',          avatar: 'FS' },
            { id: 2, nome: 'Maria Souza',      email: 'maria@go.gov.br',   papel: 'Analista',    avatar: 'MS' },
            { id: 3, nome: 'Carlos Lima',      email: 'carlos@go.gov.br',  papel: 'Design',      avatar: 'CL' },
            { id: 4, nome: 'Ana Pereira',      email: 'ana@go.gov.br',     papel: 'Desenvolvedor', avatar: 'AP' },
            { id: 5, nome: 'João Alves',       email: 'joao@go.gov.br',    papel: 'QA',          avatar: 'JA' },
        ],
        documentos: [
            {
                id: 1, titulo: 'Requisitos Funcionais', criadoPor: 'Maria Souza', atualizadoEm: 'hoje',
                conteudo: `# Requisitos Funcionais\n\n## RF-01 — Login\nO sistema deve permitir autenticação via ID Goiás e gov.br.\n\n## RF-02 — Dashboard\nApós login, o usuário visualiza um painel com resumo de serviços disponíveis.\n\n## RF-03 — Busca de Serviços\nO cidadão pode buscar serviços por nome, categoria ou órgão.\n\n## RF-04 — Solicitação de Serviço\nO sistema deve permitir a abertura de solicitações com anexo de documentos.\n`,
            },
            {
                id: 2, titulo: 'Histórias de Usuário', criadoPor: 'Felipe Santiago', atualizadoEm: 'ontem',
                conteudo: `# Histórias de Usuário\n\n## US-01\n**Como** cidadão,\n**Quero** acessar o portal com meu login do gov.br,\n**Para** não precisar criar uma nova senha.\n\n## US-02\n**Como** atendente,\n**Quero** visualizar todas as solicitações abertas,\n**Para** priorizar o atendimento.\n`,
            },
            {
                id: 3, titulo: 'Casos de Uso', criadoPor: 'Maria Souza', atualizadoEm: '2 dias atrás',
                conteudo: `# Casos de Uso\n\n## UC-01 — Autenticar Usuário\n**Ator:** Cidadão\n**Pré-condição:** Usuário possui cadastro no gov.br\n**Fluxo principal:**\n1. Usuário acessa o portal\n2. Clica em "Entrar com gov.br"\n3. Sistema redireciona para autenticação\n4. Usuário é redirecionado ao dashboard\n`,
            },
        ],
        telas: [
            {
                id: 1, nome: 'Login', status: 'aprovada', criadoPor: 'Carlos Lima',
                html: '',
                componentes: [
                    { id: 1, tipo: 'titulo', texto: 'Bem-vindo',                  largura: 100 },
                    { id: 2, tipo: 'texto',  texto: 'Acesse o Portal do Cidadão', largura: 100 },
                    { id: 3, tipo: 'campo',  texto: 'E-mail',                     largura: 100 },
                    { id: 4, tipo: 'campo',  texto: 'Senha',                      largura: 100 },
                    { id: 5, tipo: 'botao',  texto: 'Entrar',                     largura: 100, variante: 'primario' },
                    { id: 6, tipo: 'botao',  texto: 'Entrar com gov.br',          largura: 48,  variante: 'secundario' },
                    { id: 7, tipo: 'botao',  texto: 'ID Goiás',                   largura: 48,  variante: 'secundario' },
                ],
            },
            {
                id: 2, nome: 'Dashboard', status: 'pendente', criadoPor: 'Carlos Lima',
                componentes: [
                    { id: 1, tipo: 'titulo', texto: 'Olá, Cidadão',                          largura: 100 },
                    { id: 2, tipo: 'texto',  texto: 'Resumo dos seus serviços e solicitações', largura: 100 },
                    { id: 3, tipo: 'campo',  texto: 'Buscar serviço',                        largura: 60 },
                    { id: 4, tipo: 'botao',  texto: 'Buscar',                                largura: 20, variante: 'primario' },
                    { id: 5, tipo: 'botao',  texto: 'Nova solicitação',                      largura: 40, variante: 'secundario' },
                ],
                html: `<div style="font-family:sans-serif;background:#f8fafc;min-height:100vh;padding:24px"><div style="max-width:1200px;margin:0 auto"><h1 style="font-size:24px;color:#1e293b;margin:0 0 24px">Olá, Cidadão 👋</h1><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px"><div style="background:#fff;border-radius:10px;padding:20px;border-left:4px solid #16a34a"><div style="font-size:28px;font-weight:700;color:#16a34a">12</div><div style="color:#64748b;font-size:13px;margin-top:4px">Serviços disponíveis</div></div><div style="background:#fff;border-radius:10px;padding:20px;border-left:4px solid #3b82f6"><div style="font-size:28px;font-weight:700;color:#3b82f6">3</div><div style="color:#64748b;font-size:13px;margin-top:4px">Solicitações abertas</div></div><div style="background:#fff;border-radius:10px;padding:20px;border-left:4px solid #f59e0b"><div style="font-size:28px;font-weight:700;color:#f59e0b">1</div><div style="color:#64748b;font-size:13px;margin-top:4px">Aguardando documento</div></div></div><div style="background:#fff;border-radius:10px;padding:20px"><h2 style="font-size:16px;margin:0 0 16px;color:#1e293b">Serviços recentes</h2><div style="display:flex;flex-direction:column;gap:10px"><div style="display:flex;align-items:center;gap:12px;padding:12px;background:#f8fafc;border-radius:8px"><div style="width:36px;height:36px;background:#dcfce7;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#16a34a;font-size:16px">📋</div><div><div style="font-size:14px;font-weight:600;color:#1e293b">IPTU 2026</div><div style="font-size:12px;color:#64748b">Secretaria de Finanças</div></div><span style="margin-left:auto;background:#dcfce7;color:#16a34a;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700">ATIVO</span></div></div></div></div></div>`,
            },
            {
                id: 3, nome: 'Lista de Serviços', status: 'reprovada', criadoPor: 'Carlos Lima',
                componentes: [
                    { id: 1, tipo: 'titulo', texto: 'Serviços disponíveis',          largura: 100 },
                    { id: 2, tipo: 'campo',  texto: 'Buscar serviços',               largura: 100 },
                    { id: 3, tipo: 'texto',  texto: 'Certidão Negativa — Receita Estadual', largura: 100 },
                    { id: 4, tipo: 'texto',  texto: 'IPVA 2026 — DETRAN Goiás',      largura: 100 },
                    { id: 5, tipo: 'botao',  texto: 'Ver todos os serviços',         largura: 50, variante: 'primario' },
                ],
                html: `<div style="font-family:sans-serif;background:#f8fafc;min-height:100vh;padding:24px"><h1 style="font-size:22px;color:#1e293b;margin:0 0 20px">Serviços disponíveis</h1><input style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:12px 16px;font-size:14px;margin-bottom:20px;box-sizing:border-box" placeholder="🔍 Buscar serviços..."/><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:14px"><div style="background:#fff;border-radius:10px;padding:20px;cursor:pointer;border:1px solid #e2e8f0"><div style="font-size:24px;margin-bottom:10px">🏛</div><div style="font-size:15px;font-weight:600;color:#1e293b">Certidão Negativa</div><div style="font-size:13px;color:#64748b;margin-top:4px">Receita Estadual</div></div><div style="background:#fff;border-radius:10px;padding:20px;cursor:pointer;border:1px solid #e2e8f0"><div style="font-size:24px;margin-bottom:10px">🚗</div><div style="font-size:15px;font-weight:600;color:#1e293b">IPVA 2026</div><div style="font-size:13px;color:#64748b;margin-top:4px">DETRAN Goiás</div></div></div></div>`,
            },
        ],
    },
    {
        id: 2,
        nome: 'API Gestão de Convênios Estaduais',
        descricao: 'API REST para gerenciamento de convênios entre órgãos estaduais.',
        tipo: 'API',
        status: 'ativo',
        ultimaPublicacao: 'há 2h',
        membros: [
            { id: 1, nome: 'Felipe Santiago', email: 'felipe@go.gov.br', papel: 'PO',          avatar: 'FS' },
            { id: 4, nome: 'Ana Pereira',      email: 'ana@go.gov.br',   papel: 'Desenvolvedor', avatar: 'AP' },
        ],
        documentos: [
            { id: 1, titulo: 'Especificação da API', criadoPor: 'Ana Pereira', atualizadoEm: 'hoje', conteudo: `# Especificação da API\n\n## Endpoints\n\n### GET /convenios\nRetorna lista de convênios.\n\n### POST /convenios\nCria novo convênio.\n\n### PUT /convenios/:id\nAtualiza convênio existente.\n` },
        ],
        telas: [],
    },
    {
        id: 4,
        nome: 'SIAFIC — Planejamento e Execução Orçamentária',
        descricao: 'Sistema integrado de administração financeira: IPOF, saldo orçamentário, DAOFs e empenho.',
        tipo: 'Web',
        status: 'ativo',
        ultimaPublicacao: 'há 30 min',
        membros: [
            { id: 1, nome: 'Felipe Santiago', email: 'felipe@go.gov.br',  papel: 'PO',            avatar: 'FS' },
            { id: 6, nome: 'Luciano Fagundes', email: 'luciano@go.gov.br', papel: 'Analista',      avatar: 'LF' },
            { id: 3, nome: 'Carlos Lima',      email: 'carlos@go.gov.br',  papel: 'Design',        avatar: 'CL' },
            { id: 4, nome: 'Ana Pereira',      email: 'ana@go.gov.br',     papel: 'Desenvolvedor', avatar: 'AP' },
        ],
        documentos: [
            {
                id: 1, titulo: 'Requisitos — Saldo Orçamentário', criadoPor: 'Luciano Fagundes', atualizadoEm: 'hoje',
                conteudo: `# Requisitos — Manutenção de Saldo Orçamentário\n\n## RF-01 — Filtros\nO usuário deve filtrar por Exercício (obrigatório), Unidade orçamentária, Ação orçamentária, Grupo de despesa e Fonte de recurso.\n\n## RF-02 — Exibir saldo zerado\nOpção para incluir registros com saldo zerado no resultado.\n\n## RF-03 — Listagem\nA tabela exibe Unidade, Ação, Grupo de despesa, Fonte de recurso e Saldo orçamentário (R$), com ordenação por coluna e paginação.\n\n## RF-04 — Edição\nCada linha possui ação de editar o saldo orçamentário.\n\n## RF-05 — Incluir parâmetro\nBotão de destaque no topo para incluir novo parâmetro de saldo.\n`,
            },
        ],
        telas: [
            {
                id: 1, nome: 'Manutenção de saldo orçamentário', status: 'pendente', criadoPor: 'Carlos Lima',
                html: '',
                componentes: [
                    { id: 1,  tipo: 'titulo', texto: 'Manutenção de saldo orçamentário', largura: 78 },
                    { id: 2,  tipo: 'botao',  texto: '+ Incluir parâmetro',              largura: 20, variante: 'primario' },
                    { id: 3,  tipo: 'campo',  texto: 'Exercício *',                      largura: 14 },
                    { id: 4,  tipo: 'campo',  texto: 'Unidade orçamentária',             largura: 40 },
                    { id: 5,  tipo: 'campo',  texto: 'Ação orçamentária',                largura: 40 },
                    { id: 6,  tipo: 'campo',  texto: 'Grupo de despesa',                 largura: 40 },
                    { id: 7,  tipo: 'campo',  texto: 'Fonte de recurso',                 largura: 40 },
                    { id: 8,  tipo: 'botao',  texto: 'Limpar',                           largura: 8,  variante: 'secundario' },
                    { id: 9,  tipo: 'botao',  texto: 'Filtrar',                          largura: 8,  variante: 'primario' },
                    {
                        id: 10, tipo: 'tabela', largura: 100,
                        texto: 'Unidade orçamentária | Ação orçamentária | Grupo de despesa | Fonte de recurso | Saldo orçamentário (R$)',
                        linhas: [
                            ['0101 - Gabinete do Presidente da Assembleia Legislativa', '2001 - Ação Legislativa',          '3 - Outras despesas correntes',  '15000100 - Recursos não vinculados de impostos', '100.000,00'],
                            ['0150 - Fundo de Modernização FEMAL-GO',                   '2002 - Comunicação Institucional', '4 - Investimentos',              '15010001 - Outros recursos não vinculados',      '100.000,00'],
                            ['0201 - Gabinete do Presidente do TCE',                    '2003 - Modernização Tecnológica',  '5 - Juros e encargos da dívida', '18010300 - Recursos vinculados ao RPPS',         '100.000,00'],
                            ['0250 - Fundo de Modernização do TCE-GO',                  '2001 - Ação Legislativa',          '3 - Outras despesas correntes',  '25000100 - Recursos não vinculados de impostos', '100.000,00'],
                            ['000 - Nome da Unidade Orçamentária',                      '2001 - Ação Legislativa',          '4 - Investimentos',              '17530138 - Recursos provenientes de taxas',      '100.000,00'],
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 3,
        nome: 'App Fiscalização de Campo',
        descricao: 'Aplicativo mobile para agentes de fiscalização em campo.',
        tipo: 'Mobile',
        status: 'ativo',
        ultimaPublicacao: 'ontem',
        membros: [
            { id: 2, nome: 'Maria Souza', email: 'maria@go.gov.br', papel: 'Analista', avatar: 'MS' },
            { id: 3, nome: 'Carlos Lima', email: 'carlos@go.gov.br', papel: 'Design',  avatar: 'CL' },
        ],
        documentos: [],
        telas: [],
    },
];
