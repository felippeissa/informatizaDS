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
import { DrawerModule } from 'primeng/drawer';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';

export interface Ato {
    id: number;
    numero: string;
    tipoModeloAto: string;
    responsavel: string;
    situacao: string;
}

@Component({
    selector: 'app-dracon-listar-atos',
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        ButtonModule, InputTextModule, SelectModule,
        TableModule, TooltipModule, DrawerModule,
        ToastModule, TagModule,
    ],
    providers: [MessageService],
    templateUrl: './dracon-listar-atos.html',
    styleUrl: './dracon-listar-atos.scss',
})
export class DraconListarAtos implements OnInit {
    private router = inject(Router);

    atos: Ato[] = [];
    drawerVisivel = false;
    atoSel: Ato | null = null;

    filtro = {
        tipoNumero: null as any,
        numero: '',
        tipoModeloAto: null as any,
        situacao: null as any,
    };

    tiposNumero = [
        { label: 'Ato', value: 'ato' },
        { label: 'Número interno', value: 'interno' },
    ];
    tiposModeloAto = [
        { label: 'Autógrafo de lei', value: 'autografo' },
        { label: 'Decreto', value: 'decreto' },
        { label: 'Portaria', value: 'portaria' },
    ];
    situacoes = [
        { label: 'Conclusão', value: 'conclusao' },
        { label: 'Em elaboração', value: 'elaboracao' },
        { label: 'Cancelamento', value: 'cancelamento' },
    ];

    ngOnInit() { this.carregar(); }

    carregar() {
        this.atos = Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            numero: '202521',
            tipoModeloAto: 'Autógrafo de lei-ordinário-modelo teste',
            responsavel: 'Roberto da Silva Fagundes',
            situacao: i % 3 === 0 ? 'Conclusão' : i % 3 === 1 ? 'Em elaboração' : 'Cancelamento',
        }));
    }

    getSeveridade(s: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
        const m: Record<string, any> = {
            'Conclusão': 'success',
            'Em elaboração': 'info',
            'Cancelamento': 'danger',
        };
        return m[s] ?? 'secondary';
    }

    filtrar() {}
    limparFiltro() {
        this.filtro = { tipoNumero: null, numero: '', tipoModeloAto: null, situacao: null };
    }
    expandir(a: Ato) { this.atoSel = a; this.drawerVisivel = true; }
    alterarSituacao(a: Ato) { this.drawerVisivel = false; this.router.navigate(['/dracon/atos/alterar-situacao', a.id]); }
    verVersoes(a: Ato) { this.drawerVisivel = false; this.router.navigate(['/dracon/atos/versoes', a.id]); }
    tramitar(a: Ato) { this.drawerVisivel = false; this.router.navigate(['/dracon/atos/tramitacao', a.id]); }
}
