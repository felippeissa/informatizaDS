import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { TabsModule } from 'primeng/tabs';
import { CheckboxModule } from 'primeng/checkbox';
import { Menu } from 'primeng/menu';

export interface Processo {
    id: number;
    processoDracon: string;
    processoSEI: string;
    criadoPor: string;
    tipoProcesso: string;
    assunto: string;
    andamento: string;
}

@Component({
    selector: 'app-dracon-listar-processos',
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        ButtonModule, InputTextModule, SelectModule,
        TableModule, TooltipModule, DrawerModule,
        MenuModule, ToastModule, TabsModule, CheckboxModule,
    ],
    providers: [MessageService],
    templateUrl: './dracon-listar-processos.html',
    styleUrl: './dracon-listar-processos.scss',
})
export class DraconListarProcessos implements OnInit {
    private router = inject(Router);

    processos: Processo[] = [];
    selecionados: Processo[] = [];
    abaAtiva = 'todos';
    drawerVisivel = false;
    processoSel: Processo | null = null;
    menuItens: MenuItem[] = [];

    filtro = { tipoProcesso: null as any, processoDracon: '', processoSEI: '', andamento: null as any };

    tiposProcesso = [
        { label: 'Atos Administrativos', value: 'atos' },
        { label: 'Autógrafo de Lei', value: 'autografo' },
        { label: 'Decreto', value: 'decreto' },
    ];
    andamentos = [
        { label: 'Em elaboração', value: 'elaboracao' },
        { label: 'Em tramitação', value: 'tramitacao' },
        { label: 'Concluído', value: 'concluido' },
    ];

    @ViewChild('globalMenu') globalMenu!: Menu;

    ngOnInit() { this.carregar(); }

    carregar() {
        this.processos = Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            processoDracon: `003100310`,
            processoSEI: `00310031003100315457`,
            criadoPor: 'Maria Souza da Silva',
            tipoProcesso: 'Atos Administrativos',
            assunto: 'Regulamentação de decreto legislativo',
            andamento: 'Em tramitação',
        }));
    }

    filtrar() {}
    limparFiltro() { this.filtro = { tipoProcesso: null, processoDracon: '', processoSEI: '', andamento: null }; }
    novoProcesso() { this.router.navigate(['/dracon/processos/novo']); }
    expandir(p: Processo) { this.processoSel = p; this.drawerVisivel = true; }

    editarProcesso(p: Processo) { this.drawerVisivel = false; this.router.navigate(['/dracon/processos', p.id]); }
    verDocumentos(p: Processo) { this.drawerVisivel = false; this.router.navigate(['/dracon/processos/documentos-sei', p.id]); }
    cancelarProcesso(p: Processo) { this.drawerVisivel = false; this.router.navigate(['/dracon/processos/cancelar', p.id]); }
    vincularEtiquetas(p: Processo) { this.drawerVisivel = false; this.router.navigate(['/dracon/atos/etiquetas', p.id]); }
    historicoEtiquetas(p: Processo) { this.drawerVisivel = false; this.router.navigate(['/dracon/processos/historico-etiquetas', p.id]); }

    abrirMenu(event: Event, p: Processo) {
        this.processoSel = p;
        this.menuItens = [
            { label: 'Editar', icon: 'pi pi-pencil', command: () => this.editarProcesso(p) },
            { label: 'Documentos SEI', icon: 'pi pi-file', command: () => this.verDocumentos(p) },
            { label: 'Cancelar', icon: 'pi pi-times', command: () => this.cancelarProcesso(p) },
            { separator: true },
            { label: 'Vincular etiquetas', icon: 'pi pi-tag', command: () => this.vincularEtiquetas(p) },
            { label: 'Histórico de etiquetas', icon: 'pi pi-history', command: () => this.historicoEtiquetas(p) },
        ];
        this.globalMenu.toggle(event);
    }
}
