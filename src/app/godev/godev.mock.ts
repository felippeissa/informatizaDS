import { AgenteTipo, Projeto, SerieUso, UsoProjeto } from './godev.models';

export const PROJETOS_MOCK: Projeto[] = [
    {
        id: 1,
        nome: 'Portal Unificado de Atendimento ao Cidadão',
        descricao: 'Sistema de atendimento integrado para serviços estaduais.',
        tipo: 'Web',
        status: 'ativo',
        sincronizacao: 'sincronizado',
        ultimaPublicacao: 'há 10 min',
        membros: [
            { id: 1, nome: 'Felipe Santiago', email: 'felipe@go.gov.br',  papel: 'PO',          avatar: 'FS' },
            { id: 2, nome: 'Maria Souza',      email: 'maria@go.gov.br',   papel: 'Analista',    avatar: 'MS' },
            { id: 3, nome: 'Carlos Lima',      email: 'carlos@go.gov.br',  papel: 'Design',      avatar: 'CL' },
            { id: 4, nome: 'Ana Pereira',      email: 'ana@go.gov.br',     papel: 'Desenvolvedor', avatar: 'AP' },
            { id: 5, nome: 'João Alves',       email: 'joao@go.gov.br',    papel: 'QA',          avatar: 'JA' },
        ],
        specs: [
            {
                id: 1, nome: 'Login',
                requisito: `# Requisitos Funcionais — Login\n\n## RF-01 — Autenticação\nO sistema deve permitir autenticação via ID Goiás e gov.br.\n\n## RF-02 — Erro de credenciais\nExibir mensagem clara quando as credenciais forem inválidas.\n`,
                tela: {
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
            },
            {
                id: 2, nome: 'Dashboard',
                requisito: `# Histórias de Usuário — Dashboard\n\n## US-01\n**Como** cidadão,\n**Quero** ver um resumo dos meus serviços e solicitações,\n**Para** acompanhar tudo num só lugar.\n`,
                tela: {
                    id: 2, nome: 'Dashboard', status: 'pendente', criadoPor: 'Carlos Lima',
                    componentes: [
                        { id: 1, tipo: 'titulo', texto: 'Olá, Cidadão',                          largura: 100 },
                        { id: 2, tipo: 'texto',  texto: 'Resumo dos seus serviços e solicitações', largura: 100 },
                        { id: 3, tipo: 'campo',  texto: 'Buscar serviço',                        largura: 60 },
                        { id: 4, tipo: 'botao',  texto: 'Buscar',                                largura: 20, variante: 'primario' },
                        { id: 5, tipo: 'botao',  texto: 'Nova solicitação',                      largura: 40, variante: 'secundario' },
                    ],
                    html: `<div style="font-family:sans-serif;background:#f8fafc;min-height:100vh;padding:24px"><div style="max-width:1200px;margin:0 auto"><h1 style="font-size:24px;color:#1e293b;margin:0 0 24px">Olá, Cidadão 👋</h1><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px"><div style="background:#fff;border-radius:10px;padding:20px;border-left:4px solid #16a34a"><div style="font-size:28px;font-weight:700;color:#16a34a">12</div><div style="color:#64748b;font-size:13px;margin-top:4px">Serviços disponíveis</div></div><div style="background:#fff;border-radius:10px;padding:20px;border-left:4px solid #3b82f6"><div style="font-size:28px;font-weight:700;color:#3b82f6">3</div><div style="color:#64748b;font-size:13px;margin-top:4px">Solicitações abertas</div></div><div style="background:#fff;border-radius:10px;padding:20px;border-left:4px solid #f59e0b"><div style="font-size:28px;font-weight:700;color:#f59e0b">1</div><div style="color:#64748b;font-size:13px;margin-top:4px">Aguardando documento</div></div></div></div></div>`,
                },
            },
            {
                id: 3, nome: 'Lista de Serviços',
                requisito: `# Casos de Uso — Lista de Serviços\n\n## UC-01 — Buscar serviço\n**Ator:** Cidadão\n**Fluxo principal:**\n1. O cidadão acessa a lista de serviços\n2. Digita o nome do serviço na busca\n3. O sistema filtra e exibe os resultados\n`,
                tela: {
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
            },
        ],
    },
    {
        id: 2,
        nome: 'API Gestão de Convênios Estaduais',
        descricao: 'API REST para gerenciamento de convênios entre órgãos estaduais.',
        tipo: 'API',
        status: 'ativo',
        sincronizacao: 'dessincronizado',
        ultimaPublicacao: 'há 2h',
        membros: [
            { id: 1, nome: 'Felipe Santiago', email: 'felipe@go.gov.br', papel: 'PO',          avatar: 'FS' },
            { id: 4, nome: 'Ana Pereira',      email: 'ana@go.gov.br',   papel: 'Desenvolvedor', avatar: 'AP' },
        ],
        specs: [
            { id: 1, nome: 'Especificação da API', requisito: `# Especificação da API\n\n## Endpoints\n\n### GET /convenios\nRetorna lista de convênios.\n\n### POST /convenios\nCria novo convênio.\n\n### PUT /convenios/:id\nAtualiza convênio existente.\n`, tela: null },
        ],
    },
    {
        id: 4,
        nome: 'SIAFIC — Planejamento e Execução Orçamentária',
        descricao: 'Sistema integrado de administração financeira: IPOF, saldo orçamentário, DAOFs e empenho.',
        tipo: 'Web',
        status: 'ativo',
        sincronizacao: 'sincronizado',
        ultimaPublicacao: 'há 30 min',
        membros: [
            { id: 1, nome: 'Felipe Santiago', email: 'felipe@go.gov.br',  papel: 'PO',            avatar: 'FS' },
            { id: 6, nome: 'Luciano Fagundes', email: 'luciano@go.gov.br', papel: 'Analista',      avatar: 'LF' },
            { id: 3, nome: 'Carlos Lima',      email: 'carlos@go.gov.br',  papel: 'Design',        avatar: 'CL' },
            { id: 4, nome: 'Ana Pereira',      email: 'ana@go.gov.br',     papel: 'Desenvolvedor', avatar: 'AP' },
        ],
        specs: [
            {
                id: 1, nome: 'Manutenção de Saldo Orçamentário',
                requisito: `# Requisitos — Manutenção de Saldo Orçamentário\n\n## RF-01 — Filtros\nO usuário deve filtrar por Exercício (obrigatório), Unidade orçamentária, Ação orçamentária, Grupo de despesa e Fonte de recurso.\n\n## RF-02 — Exibir saldo zerado\nOpção para incluir registros com saldo zerado no resultado.\n\n## RF-03 — Listagem\nA tabela exibe Unidade, Ação, Grupo de despesa, Fonte de recurso e Saldo orçamentário (R$), com ordenação por coluna e paginação.\n\n## RF-04 — Edição\nCada linha possui ação de editar o saldo orçamentário.\n\n## RF-05 — Incluir parâmetro\nBotão de destaque no topo para incluir novo parâmetro de saldo.\n`,
                tela: {
                    id: 1, nome: 'Manutenção de saldo orçamentário', status: 'pendente', criadoPor: 'Carlos Lima',
                    html: '',
                    componentes: [
                        { id: 1,  tipo: 'titulo', texto: 'Manutenção de saldo orçamentário', largura: 78 },
                        { id: 2,  tipo: 'botao',  texto: '+ Incluir parâmetro',              largura: 20, variante: 'primario' },
                        { id: 3,  tipo: 'campo',  texto: 'Exercício *',                      largura: 14 },
                        { id: 4,  tipo: 'campo',  texto: 'Unidade orçamentária',             largura: 40 },
                        { id: 5,  tipo: 'campo',  texto: 'Ação orçamentária',                largura: 40 },
                        { id: 6,  tipo: 'campo',    texto: 'Grupo de despesa',   largura: 38 },
                        { id: 7,  tipo: 'campo',    texto: 'Fonte de recurso',   largura: 38 },
                        { id: 8,  tipo: 'checkbox', texto: 'Exibir saldo zerado', largura: 18 },
                        { id: 9,  tipo: 'botao',    texto: 'Limpar',             largura: 8,  variante: 'secundario' },
                        { id: 10, tipo: 'botao',    texto: 'Filtrar',            largura: 8,  variante: 'primario' },
                        {
                            id: 11, tipo: 'tabela', largura: 100,
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
            },
        ],
    },
    {
        id: 3,
        nome: 'App Fiscalização de Campo',
        descricao: 'Aplicativo mobile para agentes de fiscalização em campo.',
        tipo: 'Mobile',
        status: 'inativo',
        sincronizacao: 'dessincronizado',
        ultimaPublicacao: 'ontem',
        membros: [
            { id: 2, nome: 'Maria Souza', email: 'maria@go.gov.br', papel: 'Analista', avatar: 'MS' },
            { id: 3, nome: 'Carlos Lima', email: 'carlos@go.gov.br', papel: 'Design',  avatar: 'CL' },
        ],
        specs: [],
    },
    {
        id: 5,
        nome: 'API de Integração gov.br',
        descricao: 'Camada de autenticação e single sign-on com o gov.br para os sistemas estaduais.',
        tipo: 'API',
        status: 'ativo',
        sincronizacao: 'sincronizado',
        ultimaPublicacao: 'há 5 min',
        membros: [
            { id: 4, nome: 'Ana Pereira',  email: 'ana@go.gov.br',  papel: 'Desenvolvedor', avatar: 'AP' },
            { id: 7, nome: 'Bruno Teixeira', email: 'bruno@go.gov.br', papel: 'PO',         avatar: 'BT' },
        ],
        specs: [
            { id: 1, nome: 'Especificação OpenAPI', requisito: '# API gov.br\n\n## Autenticação\nFluxo OAuth2 com o provedor gov.br.\n', tela: null },
        ],
    },
    {
        id: 6,
        nome: 'Portal de Transparência Estadual',
        descricao: 'Divulgação de despesas, receitas e contratos do Estado de Goiás.',
        tipo: 'Web',
        status: 'ativo',
        sincronizacao: 'sincronizado',
        ultimaPublicacao: 'há 1h',
        membros: [
            { id: 1, nome: 'Felipe Santiago', email: 'felipe@go.gov.br', papel: 'PO',      avatar: 'FS' },
            { id: 2, nome: 'Maria Souza',      email: 'maria@go.gov.br',  papel: 'Analista', avatar: 'MS' },
            { id: 3, nome: 'Carlos Lima',      email: 'carlos@go.gov.br', papel: 'Design',  avatar: 'CL' },
            { id: 8, nome: 'Renata Dias',      email: 'renata@go.gov.br', papel: 'QA',      avatar: 'RD' },
        ],
        specs: [
            {
                id: 1, nome: 'Painel de Despesas', requisito: '# Painel de Despesas\n\nExibe despesas por órgão e período (Lei de Acesso à Informação).\n',
                tela: { id: 1, nome: 'Painel de Despesas', status: 'aprovada', criadoPor: 'Carlos Lima', html: '', componentes: [{ id: 1, tipo: 'titulo', texto: 'Despesas', largura: 100 }] },
            },
            {
                id: 2, nome: 'Consulta de Contratos', requisito: '# Consulta de Contratos\n\nBusca de contratos por fornecedor e vigência.\n',
                tela: { id: 2, nome: 'Consulta de Contratos', status: 'pendente', criadoPor: 'Carlos Lima', html: '', componentes: [{ id: 1, tipo: 'titulo', texto: 'Contratos', largura: 100 }] },
            },
        ],
    },
    {
        id: 7,
        nome: 'App Saúde Goiás',
        descricao: 'Agendamento de consultas e exames na rede estadual de saúde.',
        tipo: 'Mobile',
        status: 'ativo',
        sincronizacao: 'dessincronizado',
        ultimaPublicacao: 'há 3h',
        membros: [
            { id: 6, nome: 'Luciano Fagundes', email: 'luciano@go.gov.br', papel: 'Analista',      avatar: 'LF' },
            { id: 4, nome: 'Ana Pereira',      email: 'ana@go.gov.br',     papel: 'Desenvolvedor', avatar: 'AP' },
        ],
        specs: [
            {
                id: 1, nome: 'Agendamento', requisito: '# Agendamento de Consulta\n\nO paciente escolhe especialidade, unidade e horário disponível.\n',
                tela: { id: 1, nome: 'Agendamento', status: 'reprovada', criadoPor: 'Ana Pereira', html: '', componentes: [{ id: 1, tipo: 'titulo', texto: 'Agendar consulta', largura: 100 }] },
            },
        ],
    },
    {
        id: 8,
        nome: 'Sistema de Protocolo Digital',
        descricao: 'Gestão de protocolos e tramitação de documentos entre órgãos.',
        tipo: 'Web',
        status: 'inativo',
        sincronizacao: 'dessincronizado',
        ultimaPublicacao: 'há 1 semana',
        membros: [
            { id: 1, nome: 'Felipe Santiago', email: 'felipe@go.gov.br', papel: 'PO', avatar: 'FS' },
        ],
        specs: [],
    },
    {
        id: 9,
        nome: 'Plataforma de Licitações',
        descricao: 'Pregão eletrônico e gestão de processos licitatórios do Estado.',
        tipo: 'Web',
        status: 'ativo',
        sincronizacao: 'sincronizado',
        ultimaPublicacao: 'há 45 min',
        membros: [
            { id: 7, nome: 'Bruno Teixeira', email: 'bruno@go.gov.br', papel: 'PO',            avatar: 'BT' },
            { id: 8, nome: 'Renata Dias',    email: 'renata@go.gov.br', papel: 'QA',           avatar: 'RD' },
            { id: 4, nome: 'Ana Pereira',    email: 'ana@go.gov.br',    papel: 'Desenvolvedor', avatar: 'AP' },
        ],
        specs: [
            {
                id: 1, nome: 'Sala de Disputa', requisito: '# Sala de Disputa\n\nAcompanhamento de lances em tempo real do pregão eletrônico.\n',
                tela: { id: 1, nome: 'Sala de Disputa', status: 'aprovada', criadoPor: 'Ana Pereira', html: '', componentes: [{ id: 1, tipo: 'titulo', texto: 'Sala de disputa', largura: 100 }] },
            },
        ],
    },

    // ── +30 projetos (volume para listas, ranking e portfólio da home) ──────
    { id: 10, nome: 'Portal de Educação a Distância', descricao: 'Cursos e trilhas de capacitação a distância para a rede estadual.', tipo: 'Web', status: 'ativo', sincronizacao: 'sincronizado', ultimaPublicacao: 'há 5 min', secretaria: 'Secretaria de Estado da Educação (SEDUC)',
      membros: [
          { id: 2, nome: 'Maria Souza', email: 'maria@go.gov.br', papel: 'Analista', avatar: 'MS' },
          { id: 3, nome: 'Carlos Lima', email: 'carlos@go.gov.br', papel: 'Design', avatar: 'CL' },
      ], specs: [] },
    { id: 11, nome: 'App Merenda Escolar', descricao: 'Controle de estoque e cardápio da alimentação escolar.', tipo: 'Mobile', status: 'ativo', sincronizacao: 'dessincronizado', ultimaPublicacao: 'há 2h', secretaria: 'Secretaria de Estado da Educação (SEDUC)',
      membros: [
          { id: 4, nome: 'Ana Pereira', email: 'ana@go.gov.br', papel: 'Desenvolvedor', avatar: 'AP' },
      ], specs: [] },
    { id: 12, nome: 'Sistema de Matrícula Online', descricao: 'Matrícula e rematrícula digital para a rede estadual de ensino.', tipo: 'Web', status: 'ativo', sincronizacao: 'sincronizado', ultimaPublicacao: 'há 20 min', secretaria: 'Secretaria de Estado da Educação (SEDUC)',
      membros: [
          { id: 1, nome: 'Felipe Santiago', email: 'felipe@go.gov.br', papel: 'PO', avatar: 'FS' },
          { id: 5, nome: 'João Alves', email: 'joao@go.gov.br', papel: 'QA', avatar: 'JA' },
      ], specs: [] },
    { id: 13, nome: 'API de Prontuário Eletrônico', descricao: 'Integração de prontuários entre unidades da rede estadual de saúde.', tipo: 'API', status: 'ativo', sincronizacao: 'sincronizado', ultimaPublicacao: 'há 8 min', secretaria: 'Secretaria de Estado da Saúde (SES)',
      membros: [
          { id: 4, nome: 'Ana Pereira', email: 'ana@go.gov.br', papel: 'Desenvolvedor', avatar: 'AP' },
          { id: 7, nome: 'Bruno Teixeira', email: 'bruno@go.gov.br', papel: 'PO', avatar: 'BT' },
      ], specs: [] },
    { id: 14, nome: 'App Agendamento de Vacinas', descricao: 'Agendamento de doses e histórico vacinal do cidadão.', tipo: 'Mobile', status: 'ativo', sincronizacao: 'dessincronizado', ultimaPublicacao: 'há 1h', secretaria: 'Secretaria de Estado da Saúde (SES)',
      membros: [
          { id: 6, nome: 'Luciano Fagundes', email: 'luciano@go.gov.br', papel: 'Analista', avatar: 'LF' },
      ], specs: [] },
    { id: 15, nome: 'Sistema de Regulação de Leitos', descricao: 'Gestão de vagas e regulação de leitos hospitalares em tempo real.', tipo: 'Web', status: 'ativo', sincronizacao: 'sincronizado', ultimaPublicacao: 'há 15 min', secretaria: 'Secretaria de Estado da Saúde (SES)',
      membros: [
          { id: 8, nome: 'Renata Dias', email: 'renata@go.gov.br', papel: 'QA', avatar: 'RD' },
          { id: 3, nome: 'Carlos Lima', email: 'carlos@go.gov.br', papel: 'Design', avatar: 'CL' },
      ], specs: [] },
    { id: 16, nome: 'Painel de Ocorrências Policiais', descricao: 'Painel gerencial de boletins de ocorrência por região.', tipo: 'Web', status: 'ativo', sincronizacao: 'sincronizado', ultimaPublicacao: 'há 3 min', secretaria: 'Secretaria de Segurança Pública (SSP)',
      membros: [
          { id: 2, nome: 'Maria Souza', email: 'maria@go.gov.br', papel: 'Analista', avatar: 'MS' },
      ], specs: [] },
    { id: 17, nome: 'App Segurança Cidadã', descricao: 'Canal de denúncias e alertas de segurança para o cidadão.', tipo: 'Mobile', status: 'ativo', sincronizacao: 'dessincronizado', ultimaPublicacao: 'há 4h', secretaria: 'Secretaria de Segurança Pública (SSP)',
      membros: [
          { id: 4, nome: 'Ana Pereira', email: 'ana@go.gov.br', papel: 'Desenvolvedor', avatar: 'AP' },
          { id: 5, nome: 'João Alves', email: 'joao@go.gov.br', papel: 'QA', avatar: 'JA' },
      ], specs: [] },
    { id: 18, nome: 'Sistema de Gestão Prisional', descricao: 'Controle de vagas, transferências e ocorrências no sistema prisional.', tipo: 'Desktop', status: 'inativo', sincronizacao: 'dessincronizado', ultimaPublicacao: 'há 2 semanas', secretaria: 'Secretaria de Segurança Pública (SSP)',
      membros: [
          { id: 1, nome: 'Felipe Santiago', email: 'felipe@go.gov.br', papel: 'PO', avatar: 'FS' },
      ], specs: [] },
    { id: 19, nome: 'Portal de Licenciamento Ambiental', descricao: 'Solicitação e acompanhamento de licenças ambientais.', tipo: 'Web', status: 'ativo', sincronizacao: 'sincronizado', ultimaPublicacao: 'há 40 min', secretaria: 'Secretaria de Meio Ambiente (SEMAD)',
      membros: [
          { id: 3, nome: 'Carlos Lima', email: 'carlos@go.gov.br', papel: 'Design', avatar: 'CL' },
          { id: 6, nome: 'Luciano Fagundes', email: 'luciano@go.gov.br', papel: 'Analista', avatar: 'LF' },
      ], specs: [] },
    { id: 20, nome: 'API de Monitoramento Ambiental', descricao: 'Integração com sensores de qualidade do ar e da água.', tipo: 'API', status: 'ativo', sincronizacao: 'dessincronizado', ultimaPublicacao: 'há 6h', secretaria: 'Secretaria de Meio Ambiente (SEMAD)',
      membros: [
          { id: 4, nome: 'Ana Pereira', email: 'ana@go.gov.br', papel: 'Desenvolvedor', avatar: 'AP' },
      ], specs: [] },
    { id: 21, nome: 'Sistema de Habitação Popular', descricao: 'Cadastro e seleção de famílias para programas habitacionais.', tipo: 'Web', status: 'ativo', sincronizacao: 'sincronizado', ultimaPublicacao: 'há 12 min', secretaria: 'Agência Goiana de Habitação (AGEHAB)',
      membros: [
          { id: 2, nome: 'Maria Souza', email: 'maria@go.gov.br', papel: 'Analista', avatar: 'MS' },
          { id: 8, nome: 'Renata Dias', email: 'renata@go.gov.br', papel: 'QA', avatar: 'RD' },
      ], specs: [] },
    { id: 22, nome: 'App Minha Casa Goiás', descricao: 'Acompanhamento de obras e entrega de unidades habitacionais.', tipo: 'Mobile', status: 'inativo', sincronizacao: 'dessincronizado', ultimaPublicacao: 'há 3 dias', secretaria: 'Agência Goiana de Habitação (AGEHAB)',
      membros: [
          { id: 7, nome: 'Bruno Teixeira', email: 'bruno@go.gov.br', papel: 'PO', avatar: 'BT' },
      ], specs: [] },
    { id: 23, nome: 'Portal de Editais Culturais', descricao: 'Inscrição e prestação de contas de editais de fomento à cultura.', tipo: 'Web', status: 'ativo', sincronizacao: 'sincronizado', ultimaPublicacao: 'há 25 min', secretaria: 'Secretaria de Estado da Cultura',
      membros: [
          { id: 3, nome: 'Carlos Lima', email: 'carlos@go.gov.br', papel: 'Design', avatar: 'CL' },
          { id: 5, nome: 'João Alves', email: 'joao@go.gov.br', papel: 'QA', avatar: 'JA' },
      ], specs: [] },
    { id: 24, nome: 'Sistema de Gestão de Rodovias', descricao: 'Cadastro e monitoramento de manutenção da malha rodoviária estadual.', tipo: 'Desktop', status: 'ativo', sincronizacao: 'sincronizado', ultimaPublicacao: 'há 50 min', secretaria: 'Agência Goiana de Infraestrutura (GOINFRA)',
      membros: [
          { id: 6, nome: 'Luciano Fagundes', email: 'luciano@go.gov.br', papel: 'Analista', avatar: 'LF' },
          { id: 4, nome: 'Ana Pereira', email: 'ana@go.gov.br', papel: 'Desenvolvedor', avatar: 'AP' },
      ], specs: [] },
    { id: 25, nome: 'API de Tráfego em Tempo Real', descricao: 'Dados de tráfego e ocorrências nas rodovias estaduais.', tipo: 'API', status: 'ativo', sincronizacao: 'dessincronizado', ultimaPublicacao: 'há 2h', secretaria: 'Agência Goiana de Infraestrutura (GOINFRA)',
      membros: [
          { id: 4, nome: 'Ana Pereira', email: 'ana@go.gov.br', papel: 'Desenvolvedor', avatar: 'AP' },
      ], specs: [] },
    { id: 26, nome: 'Portal do Empreendedor', descricao: 'Abertura, alteração e baixa de empresas de forma simplificada.', tipo: 'Web', status: 'ativo', sincronizacao: 'sincronizado', ultimaPublicacao: 'há 18 min', secretaria: 'Secretaria de Desenvolvimento Econômico',
      membros: [
          { id: 1, nome: 'Felipe Santiago', email: 'felipe@go.gov.br', papel: 'PO', avatar: 'FS' },
          { id: 2, nome: 'Maria Souza', email: 'maria@go.gov.br', papel: 'Analista', avatar: 'MS' },
      ], specs: [] },
    { id: 27, nome: 'Sistema de Crédito Rural', descricao: 'Solicitação e acompanhamento de linhas de crédito para produtores rurais.', tipo: 'Web', status: 'ativo', sincronizacao: 'sincronizado', ultimaPublicacao: 'há 33 min', secretaria: 'Secretaria de Agricultura, Pecuária e Abastecimento',
      membros: [
          { id: 8, nome: 'Renata Dias', email: 'renata@go.gov.br', papel: 'QA', avatar: 'RD' },
      ], specs: [] },
    { id: 28, nome: 'App Defesa Agropecuária', descricao: 'Notificação e rastreamento de ocorrências sanitárias no campo.', tipo: 'Mobile', status: 'inativo', sincronizacao: 'dessincronizado', ultimaPublicacao: 'há 1 semana', secretaria: 'Secretaria de Agricultura, Pecuária e Abastecimento',
      membros: [
          { id: 6, nome: 'Luciano Fagundes', email: 'luciano@go.gov.br', papel: 'Analista', avatar: 'LF' },
      ], specs: [] },
    { id: 29, nome: 'Sistema de Habilitação Digital', descricao: 'Emissão e renovação digital da Carteira Nacional de Habilitação.', tipo: 'Web', status: 'ativo', sincronizacao: 'sincronizado', ultimaPublicacao: 'há 7 min', secretaria: 'Departamento Estadual de Trânsito (DETRAN-GO)',
      membros: [
          { id: 3, nome: 'Carlos Lima', email: 'carlos@go.gov.br', papel: 'Design', avatar: 'CL' },
          { id: 7, nome: 'Bruno Teixeira', email: 'bruno@go.gov.br', papel: 'PO', avatar: 'BT' },
      ], specs: [] },
    { id: 30, nome: 'App Multas e Infrações', descricao: 'Consulta e pagamento de multas de trânsito pelo celular.', tipo: 'Mobile', status: 'ativo', sincronizacao: 'dessincronizado', ultimaPublicacao: 'há 5h', secretaria: 'Departamento Estadual de Trânsito (DETRAN-GO)',
      membros: [
          { id: 4, nome: 'Ana Pereira', email: 'ana@go.gov.br', papel: 'Desenvolvedor', avatar: 'AP' },
      ], specs: [] },
    { id: 31, nome: 'Portal de Processos Judiciais', descricao: 'Acompanhamento de processos de interesse da Procuradoria.', tipo: 'Web', status: 'ativo', sincronizacao: 'sincronizado', ultimaPublicacao: 'há 22 min', secretaria: 'Procuradoria-Geral do Estado (PGE)',
      membros: [
          { id: 2, nome: 'Maria Souza', email: 'maria@go.gov.br', papel: 'Analista', avatar: 'MS' },
          { id: 5, nome: 'João Alves', email: 'joao@go.gov.br', papel: 'QA', avatar: 'JA' },
      ], specs: [] },
    { id: 32, nome: 'Sistema de Atendimento à Defensoria', descricao: 'Marcação e triagem de atendimentos jurídicos gratuitos.', tipo: 'Web', status: 'ativo', sincronizacao: 'sincronizado', ultimaPublicacao: 'há 45 min', secretaria: 'Defensoria Pública do Estado de Goiás',
      membros: [
          { id: 1, nome: 'Felipe Santiago', email: 'felipe@go.gov.br', papel: 'PO', avatar: 'FS' },
      ], specs: [] },
    { id: 33, nome: 'Painel de Indicadores Criminais', descricao: 'Painel gerencial de indicadores de segurança pública por município.', tipo: 'Web', status: 'ativo', sincronizacao: 'dessincronizado', ultimaPublicacao: 'há 3h', secretaria: 'Polícia Civil do Estado de Goiás',
      membros: [
          { id: 4, nome: 'Ana Pereira', email: 'ana@go.gov.br', papel: 'Desenvolvedor', avatar: 'AP' },
          { id: 8, nome: 'Renata Dias', email: 'renata@go.gov.br', papel: 'QA', avatar: 'RD' },
      ], specs: [] },
    { id: 34, nome: 'App Ocorrência Online', descricao: 'Registro digital de boletim de ocorrência sem deslocamento.', tipo: 'Mobile', status: 'ativo', sincronizacao: 'sincronizado', ultimaPublicacao: 'há 10 min', secretaria: 'Polícia Militar do Estado de Goiás',
      membros: [
          { id: 6, nome: 'Luciano Fagundes', email: 'luciano@go.gov.br', papel: 'Analista', avatar: 'LF' },
          { id: 3, nome: 'Carlos Lima', email: 'carlos@go.gov.br', papel: 'Design', avatar: 'CL' },
      ], specs: [] },
    { id: 35, nome: 'Sistema de Gestão de Viaturas', descricao: 'Controle de frota, manutenção e escalas do Corpo de Bombeiros.', tipo: 'Desktop', status: 'inativo', sincronizacao: 'dessincronizado', ultimaPublicacao: 'há 4 dias', secretaria: 'Corpo de Bombeiros Militar de Goiás',
      membros: [
          { id: 7, nome: 'Bruno Teixeira', email: 'bruno@go.gov.br', papel: 'PO', avatar: 'BT' },
      ], specs: [] },
    { id: 36, nome: 'Portal do Empresário — Junta Comercial', descricao: 'Registro mercantil e certidões emitidas pela Junta Comercial.', tipo: 'Web', status: 'ativo', sincronizacao: 'sincronizado', ultimaPublicacao: 'há 28 min', secretaria: 'Junta Comercial do Estado de Goiás (JUCEG)',
      membros: [
          { id: 2, nome: 'Maria Souza', email: 'maria@go.gov.br', papel: 'Analista', avatar: 'MS' },
      ], specs: [] },
    { id: 37, nome: 'Painel de Indicadores Socioeconômicos', descricao: 'Painel público de indicadores econômicos e sociais do Estado.', tipo: 'Web', status: 'ativo', sincronizacao: 'sincronizado', ultimaPublicacao: 'há 55 min', secretaria: 'Instituto Mauro Borges de Estatísticas e Estudos (IMB)',
      membros: [
          { id: 4, nome: 'Ana Pereira', email: 'ana@go.gov.br', papel: 'Desenvolvedor', avatar: 'AP' },
          { id: 5, nome: 'João Alves', email: 'joao@go.gov.br', papel: 'QA', avatar: 'JA' },
      ], specs: [] },
    { id: 38, nome: 'Sistema de Obras Públicas', descricao: 'Acompanhamento físico-financeiro de obras públicas estaduais.', tipo: 'Web', status: 'ativo', sincronizacao: 'dessincronizado', ultimaPublicacao: 'há 1h', secretaria: 'Agência Goiana de Infraestrutura (GOINFRA)',
      membros: [
          { id: 6, nome: 'Luciano Fagundes', email: 'luciano@go.gov.br', papel: 'Analista', avatar: 'LF' },
      ], specs: [] },
    { id: 39, nome: 'App Saneamento Goiás', descricao: 'Solicitações, faturas e ocorrências da rede de saneamento.', tipo: 'Mobile', status: 'ativo', sincronizacao: 'sincronizado', ultimaPublicacao: 'há 14 min', secretaria: 'Saneamento de Goiás (SANEAGO)',
      membros: [
          { id: 3, nome: 'Carlos Lima', email: 'carlos@go.gov.br', papel: 'Design', avatar: 'CL' },
          { id: 8, nome: 'Renata Dias', email: 'renata@go.gov.br', papel: 'QA', avatar: 'RD' },
      ], specs: [] },
];

// ===================== Secretaria + uso (home: Projetos populares / Portfólio) =====================
// Gerador pseudoaleatório determinístico (mesmo projeto sempre gera a mesma série).
function mulberry32(seed: number) {
    let a = seed;
    return () => {
        a |= 0; a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function gerarSerie(rand: () => number, n: number, min: number, max: number): SerieUso {
    const serie = Array.from({ length: n }, () => Math.round(min + rand() * (max - min)));
    const media = Math.round((serie.reduce((a, b) => a + b, 0) / serie.length) * 10) / 10;
    return { serie, media };
}

function gerarUso(seed: number): UsoProjeto {
    const rand = mulberry32(seed * 97 + 13);
    return {
        semana:    gerarSerie(rand, 7, 0, 12), // 7 dias
        mes:       gerarSerie(rand, 4, 5, 40), // 4 semanas
        tresMeses: gerarSerie(rand, 3, 20, 120), // 3 meses
    };
}

const SECRETARIAS: Record<number, string> = {
    1: 'Secretaria de Estado da Administração (SEAD)',
    2: 'Secretaria da Fazenda (SEFAZ)',
    3: 'Secretaria de Meio Ambiente (SEMAD)',
    4: 'Secretaria da Fazenda (SEFAZ)',
    5: 'Secretaria de Gestão e Planejamento (SEGPLAN)',
    6: 'Controladoria-Geral do Estado (CGE)',
    7: 'Secretaria de Estado da Saúde (SES)',
    8: 'Secretaria de Estado da Administração (SEAD)',
    9: 'Secretaria de Gestão e Planejamento (SEGPLAN)',
};

for (const p of PROJETOS_MOCK) {
    p.secretaria = p.secretaria ?? SECRETARIAS[p.id] ?? 'Secretaria de Estado';
    p.uso = gerarUso(p.id);
}

// ===================== Pool de ações do ticker "Ações recentes" =====================
// Gerado a partir das specs/telas reais dos projetos, para soar plausível.
function gerarAcoesTicker(): { agente: AgenteTipo; texto: string }[] {
    const acoes: { agente: AgenteTipo; texto: string }[] = [];
    for (const p of PROJETOS_MOCK) {
        for (const s of p.specs) {
            acoes.push({ agente: 'spec', texto: `detalhou o requisito "${s.nome}" no projeto ${p.nome}` });
            acoes.push({ agente: 'task', texto: `quebrou o requisito "${s.nome}" em tarefas técnicas no projeto ${p.nome}` });
            if (s.tela) {
                acoes.push({ agente: 'code', texto: `criou a tela "${s.tela.nome}" para o projeto ${p.nome}` });
                acoes.push({ agente: 'test', texto: `gerou testes para a tela "${s.tela.nome}" no projeto ${p.nome}` });
                const acaoReview = s.tela.status === 'aprovada'
                    ? `aprovou a tela "${s.tela.nome}"`
                    : s.tela.status === 'reprovada'
                        ? `solicitou ajustes na tela "${s.tela.nome}"`
                        : `está revisando a tela "${s.tela.nome}"`;
                acoes.push({ agente: 'review', texto: `${acaoReview} no projeto ${p.nome}` });
            }
        }
    }
    return acoes;
}

export const ACOES_TICKER_MOCK = gerarAcoesTicker();

// ===================== Principais assuntos do Manual Inteligente (home) =====================
export interface AssuntoManual { id: number; pergunta: string; sistema: string; perguntas: number; }

export const ASSUNTOS_MANUAL_MOCK: AssuntoManual[] = [
    { id: 1, pergunta: 'Como consultar o saldo orçamentário no SIAFIC?',        sistema: 'SIAFIC',       perguntas: 128 },
    { id: 2, pergunta: 'Como rastrear uma entrega no SISLOG?',                  sistema: 'SISLOG',       perguntas: 96 },
    { id: 3, pergunta: 'Quais serviços estão disponíveis no Portal Goiás?',     sistema: 'Portal Goiás', perguntas: 84 },
    { id: 4, pergunta: 'Como incluir um IPOF no SIAFIC?',                      sistema: 'SIAFIC',       perguntas: 77 },
    { id: 5, pergunta: 'Como emitir uma certidão negativa pelo Portal Goiás?',  sistema: 'Portal Goiás', perguntas: 65 },
    { id: 6, pergunta: 'Como tramitar um processo no Drácon?',                  sistema: 'Drácon',       perguntas: 58 },
    { id: 7, pergunta: 'Como assinar um documento no ASSINAGO?',                sistema: 'ASSINAGO',     perguntas: 51 },
    { id: 8, pergunta: 'Como criar uma nova spec no GO.DEV?',                   sistema: 'GO.DEV',       perguntas: 43 },
    { id: 9, pergunta: 'Como consultar o status de uma carga no SISLOG?',       sistema: 'SISLOG',       perguntas: 39 },
    { id: 10, pergunta: 'Como recusar a assinatura de um documento no ASSINAGO?', sistema: 'ASSINAGO',   perguntas: 28 },
];
