export interface Usuario {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    perfil: string;
    unidade: string;
    situacao: 'Ativo' | 'Inativo' | 'Pendente';
    ultimoAcesso: string;
}

export const PERFIS = ['Administrador', 'Gestor', 'Analista', 'Consulta'];
export const SITUACOES = ['Ativo', 'Inativo', 'Pendente'];
export const UNIDADES = [
    'Gerência de Tecnologia do Estado',
    'Superintendência de Gestão',
    'Secretaria da Economia',
    'Secretaria de Saúde',
];

export function iniciais(nome: string): string {
    const partes = nome.trim().split(/\s+/);
    return ((partes[0]?.[0] ?? '') + (partes.length > 1 ? partes[partes.length - 1][0] : '')).toUpperCase();
}

export function severidadeSituacao(situacao: string): 'success' | 'secondary' | 'warn' {
    if (situacao === 'Ativo') return 'success';
    if (situacao === 'Pendente') return 'warn';
    return 'secondary';
}

const NOMES = [
    'João da Silva', 'Maria Oliveira Souza', 'Carlos Eduardo Lima', 'Ana Paula Ferreira',
    'Rafael Martins Costa', 'Juliana Alves Rocha', 'Pedro Henrique Dias', 'Fernanda Ribeiro Gomes',
    'Lucas Almeida Pinto', 'Beatriz Cardoso Melo', 'Marcos Vinícius Teixeira', 'Patrícia Nunes Barbosa',
];

export const USUARIOS_MOCK: Usuario[] = NOMES.map((nome, i) => ({
    id: i + 1,
    nome,
    email: nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(/\s+/).slice(0, 2).join('.') + '@goias.gov.br',
    cpf: `${String(100 + i)}.${String(200 + i)}.${String(300 + i)}-0${i % 10}`,
    perfil: PERFIS[i % PERFIS.length],
    unidade: UNIDADES[i % UNIDADES.length],
    situacao: (i % 5 === 0 ? 'Pendente' : i % 3 === 0 ? 'Inativo' : 'Ativo') as Usuario['situacao'],
    ultimoAcesso: `${String((i % 28) + 1).padStart(2, '0')}/09/2026 ${String(8 + (i % 10)).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}`,
}));
