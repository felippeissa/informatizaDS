import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { DrawerModule } from 'primeng/drawer';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';

export interface ProcessoDistribuicao {
    id: number;
    processoDracon: string;
    processoSEI: string;
    tipoProcesso: string;
    prioridade: string;
    complexidade: string;
}

export interface Distribuicao {
    id: number;
    dataDistribuicao: string;
    numeroDistribuicao: string;
    distribuidoPor: string;
    status: string;
    processos: ProcessoDistribuicao[];
}

@Component({
    selector: 'app-dracon-listar-distribuicao',
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        ButtonModule, InputTextModule, SelectModule,
        TableModule, TooltipModule, TagModule,
        DrawerModule, DialogModule, TextareaModule, ToastModule,
    ],
    providers: [MessageService],
    templateUrl: './dracon-listar-distribuicao.html',
    styleUrl: './dracon-listar-distribuicao.scss',
})
export class DraconListarDistribuicao implements OnInit {
    private router  = inject(Router);
    private msgSvc  = inject(MessageService);

    registrosOriginal: Distribuicao[] = [];
    registros: Distribuicao[] = [];
    sel: Distribuicao | null = null;

    drawerVisivel          = false;
    dialogVisualizarVisivel = false;
    dialogCancelarVisivel  = false;
    motivoCancelamento     = '';

    filtro = {
        processoSEI:   '',
        destinatario:  '',
        tipoProcesso:  null as any,
        etapa:         null as any,
    };

    tiposProcesso = [
        { label: 'Atos Administrativos',   value: 'Atos Administrativos' },
        { label: 'Processo Legislativo',   value: 'Processo Legislativo' },
        { label: 'Projetos de Lei',        value: 'Projetos de Lei' },
    ];
    etapas = [
        { label: 'Em elaboração', value: 'elaboracao' },
        { label: 'Concluído',     value: 'concluido'  },
    ];

    ngOnInit() { this.carregar(); }

    carregar() {
        const usuarios = [
            'Bruno Pereira da Silva Oliveira',
            'Maria Souza dos Santos Ferreira',
            'Carlos Alberto Lima Rodrigues',
            'Ana Paula Mendes Costa',
            'Roberto Henrique Gonçalves',
            'Fernanda Cristina de Oliveira',
            'João Marcos Alves Pereira',
        ];

        const processosBase: ProcessoDistribuicao[] = [
            { id: 1,  processoDracon: '2026001', processoSEI: '202618037000009', tipoProcesso: 'Projetos de Lei',      prioridade: 'Urgente', complexidade: 'Média'  },
            { id: 2,  processoDracon: '2026002', processoSEI: '202618037000015', tipoProcesso: 'Atos Administrativos', prioridade: 'Normal',  complexidade: 'Alta'   },
            { id: 3,  processoDracon: '2026003', processoSEI: '202618037000023', tipoProcesso: 'Processo Legislativo', prioridade: 'Urgente', complexidade: 'Baixa'  },
            { id: 4,  processoDracon: '2026004', processoSEI: '202618037000031', tipoProcesso: 'Projetos de Lei',      prioridade: 'Normal',  complexidade: 'Média'  },
            { id: 5,  processoDracon: '2026005', processoSEI: '202618037000044', tipoProcesso: 'Atos Administrativos', prioridade: 'Baixa',   complexidade: 'Baixa'  },
        ];

        const datas = [
            '25/04/2025 14:45', '26/04/2025 09:30', '28/04/2025 11:15',
            '02/05/2025 16:00', '05/05/2025 08:45', '09/05/2025 13:20',
            '12/05/2025 10:10', '15/05/2025 15:55', '20/05/2025 09:05',
            '22/05/2025 14:30',
        ];

        this.registrosOriginal = Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            dataDistribuicao:   datas[i],
            numeroDistribuicao: `DIST-2025-${String(100 + i).padStart(3, '0')}`,
            distribuidoPor:     usuarios[i % usuarios.length],
            status:             i % 4 === 2 ? 'Cancelado' : 'Distribuído',
            processos:          processosBase.slice(0, (i % 3) + 2),
        }));
        this.registros = [...this.registrosOriginal];
    }

    // ── Filtro ─────────────────────────────────────────────────────
    filtrar() {
        this.registros = this.registrosOriginal.filter(r => {
            const okSEI = !this.filtro.processoSEI ||
                r.processos.some(p => p.processoSEI.includes(this.filtro.processoSEI));
            const okDest = !this.filtro.destinatario ||
                r.distribuidoPor.toLowerCase().includes(this.filtro.destinatario.toLowerCase());
            const okTipo = !this.filtro.tipoProcesso ||
                r.processos.some(p => p.tipoProcesso === this.filtro.tipoProcesso);
            return okSEI && okDest && okTipo;
        });
    }

    limparFiltro() {
        this.filtro = { processoSEI: '', destinatario: '', tipoProcesso: null, etapa: null };
        this.registros = [...this.registrosOriginal];
    }

    // ── Nova distribuição ──────────────────────────────────────────
    novaDistribuicao() {
        this.router.navigate(['/dracon/gestao/distribuicao/nova']);
    }

    // ── Expandir (drawer detalhes) ─────────────────────────────────
    expandir(d: Distribuicao) { this.sel = d; this.drawerVisivel = true; }

    // ── Visualizar processos da distribuição ───────────────────────
    visualizar(d: Distribuicao) { this.sel = d; this.dialogVisualizarVisivel = true; }

    // ── Cancelar distribuição ──────────────────────────────────────
    abrirCancelar(d: Distribuicao) {
        this.sel = d;
        this.motivoCancelamento = '';
        this.dialogCancelarVisivel = true;
    }

    confirmarCancelamento() {
        if (!this.sel || !this.motivoCancelamento.trim()) return;
        const idx = this.registrosOriginal.findIndex(r => r.id === this.sel!.id);
        if (idx > -1) {
            this.registrosOriginal[idx].status = 'Cancelado';
            this.registros = [...this.registrosOriginal];
        }
        this.dialogCancelarVisivel = false;
        this.msgSvc.add({ severity: 'success', summary: 'Sucesso', detail: 'Distribuição cancelada.' });
    }
}
