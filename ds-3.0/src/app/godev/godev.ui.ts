import { AgenteTipo, Papel, StatusTela, TipoProjeto } from './godev.models';

// Paleta compartilhada do módulo GO.DEV — cores de papéis, status e tipos de projeto.

export const COR_PAPEL: Record<Papel, string> = {
    PO: '#7c3aed', Analista: '#1d4ed8', Design: '#0e7490',
    Desenvolvedor: '#15803d', QA: '#b45309', Outro: '#4b5563',
};

export const BG_PAPEL: Record<Papel, string> = {
    PO: '#ede9fe', Analista: '#dbeafe', Design: '#cffafe',
    Desenvolvedor: '#dcfce7', QA: '#fef3c7', Outro: '#f3f4f6',
};

export const COR_STATUS: Record<StatusTela, string> = {
    pendente: '#b45309', aprovada: '#15803d', reprovada: '#dc2626',
};

export const BG_STATUS: Record<StatusTela, string> = {
    pendente: '#fef3c7', aprovada: '#dcfce7', reprovada: '#fee2e2',
};

export const ICON_STATUS: Record<StatusTela, string> = {
    pendente: 'pi-clock', aprovada: 'pi-check-circle', reprovada: 'pi-times-circle',
};

export const LABEL_STATUS: Record<StatusTela, string> = {
    pendente: 'Pendente', aprovada: 'Aprovada', reprovada: 'Reprovada',
};

export const COR_TIPO: Record<TipoProjeto, string> = {
    Web: '#3b82f6', Mobile: '#8b5cf6', API: '#f59e0b', Desktop: '#06b6d4', Outro: '#6b7280',
};

export const BG_TIPO: Record<TipoProjeto, string> = {
    Web: '#dbeafe', Mobile: '#ede9fe', API: '#fef3c7', Desktop: '#cffafe', Outro: '#f3f4f6',
};

export const PAPEL_OPCOES: { label: string; value: Papel }[] = [
    { label: 'PO',            value: 'PO' },
    { label: 'Analista',      value: 'Analista' },
    { label: 'Design',        value: 'Design' },
    { label: 'Desenvolvedor', value: 'Desenvolvedor' },
    { label: 'QA',            value: 'QA' },
    { label: 'Outro',         value: 'Outro' },
];

export const TIPO_OPCOES: { label: string; value: TipoProjeto }[] = [
    { label: 'Web', value: 'Web' }, { label: 'Mobile', value: 'Mobile' },
    { label: 'API', value: 'API' }, { label: 'Desktop', value: 'Desktop' },
    { label: 'Outro', value: 'Outro' },
];

export const LABEL_AGENTE: Record<AgenteTipo, string> = {
    spec: 'Spec Agent', task: 'Task Agent', code: 'Code Agent', test: 'Test Agent', review: 'Review Agent',
};

export const ICON_AGENTE: Record<AgenteTipo, string> = {
    spec: 'pi-file-edit', task: 'pi-list-check', code: 'pi-code', test: 'pi-verified', review: 'pi-eye',
};

export const COR_AGENTE: Record<AgenteTipo, string> = {
    spec: '#2563eb', task: '#b45309', code: '#15803d', test: '#0e7490', review: '#7c3aed',
};

export const BG_AGENTE: Record<AgenteTipo, string> = {
    spec: '#dbeafe', task: '#fef3c7', code: '#dcfce7', test: '#cffafe', review: '#ede9fe',
};

// Sistemas cobertos pelo Manual Inteligente (mesmas cores do switcher de sistemas / chat flutuante).
export const COR_SISTEMA_MANUAL: Record<string, string> = {
    'Drácon':       '#1755A3',
    'GO.DEV':       '#16A34A',
    'ASSINAGO':     '#7C3AED',
    'SIAFIC':       '#B45309',
    'SISLOG':       '#0E7490',
    'Portal Goiás': '#DB2777',
};

export function iniciais(nome: string): string {
    return nome.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}
