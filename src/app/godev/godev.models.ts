export type Papel = 'PO' | 'Analista' | 'Design' | 'Desenvolvedor' | 'QA' | 'Outro';
export type StatusTela = 'pendente' | 'aprovada' | 'reprovada';
export type TipoProjeto = 'Web' | 'Mobile' | 'API' | 'Desktop' | 'Outro';

export interface Membro {
    id: number;
    nome: string;
    email: string;
    papel: Papel;
    avatar: string; // iniciais
}

export interface Documento {
    id: number;
    titulo: string;
    conteudo: string;
    criadoPor: string;
    atualizadoEm: string;
}

export type TipoComponente = 'titulo' | 'texto' | 'campo' | 'botao' | 'tabela' | 'checkbox';

export interface ComponenteTela {
    id: number;
    tipo: TipoComponente;
    texto: string;            // título, parágrafo, label do campo, rótulo do botão ou colunas da tabela (separadas por "|")
    largura: number;          // percentual (10–100)
    variante?: 'primario' | 'secundario'; // apenas botões
    linhas?: string[][];      // apenas tabelas: linhas de dados
}

export interface Tela {
    id: number;
    nome: string;
    status: StatusTela;
    html: string;             // fallback para telas legadas sem componentes
    criadoPor: string;
    componentes?: ComponenteTela[];
}

export type Sincronizacao = 'sincronizado' | 'dessincronizado';

// Uma Spec reúne, para um mesmo assunto, o requisito (funcional, história de
// usuário, caso de uso...), as telas e o código gerado.
export interface Spec {
    id: number;
    nome: string;
    requisito: string;   // markdown do requisito
    tela: Tela | null;   // cada spec tem exatamente 1 tela (ou nenhuma ainda)
}

export interface Projeto {
    id: number;
    nome: string;
    descricao: string;
    tipo: TipoProjeto;
    status: 'ativo' | 'inativo';
    sincronizacao: Sincronizacao;
    membros: Membro[];
    specs: Spec[];
    ultimaPublicacao: string;
}
