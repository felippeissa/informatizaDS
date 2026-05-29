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

export interface AuditoriaAto {
    id: number;
    numeroAto: string;
    orgao: string;
    unidade: string;
    tipoModeloAto: string;
}

@Component({
    selector: 'app-dracon-auditoria-ato',
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        ButtonModule, InputTextModule, SelectModule,
        TableModule, TooltipModule, DrawerModule, ToastModule,
    ],
    providers: [MessageService],
    templateUrl: './dracon-auditoria-ato.html',
    styleUrl: './dracon-auditoria-ato.scss',
})
export class DraconAuditoriaAto implements OnInit {
    private router = inject(Router);

    registros: AuditoriaAto[] = [];
    drawerVisivel = false;
    itemSel: AuditoriaAto | null = null;

    filtro = {
        processoSEI: '',
        numeroAto: '',
        tipoModeloAto: null as any,
        processoInterno: '',
    };

    tiposModeloAto = [
        { label: 'Autógrafo de lei', value: 'autografo' },
        { label: 'Decreto', value: 'decreto' },
    ];

    ngOnInit() { this.carregar(); }

    carregar() {
        this.registros = Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            numeroAto: `DRN-2025-00${i + 1}`,
            orgao: 'Assembleia Legislativa',
            unidade: '21189 - Gerência de Tecnologia do Estado',
            tipoModeloAto: 'Autógrafo de lei',
        }));
    }

    filtrar() {}
    limparFiltro() {
        this.filtro = { processoSEI: '', numeroAto: '', tipoModeloAto: null, processoInterno: '' };
    }
    expandir(item: AuditoriaAto) { this.itemSel = item; this.drawerVisivel = true; }
    visualizar(item: AuditoriaAto) {}
}
