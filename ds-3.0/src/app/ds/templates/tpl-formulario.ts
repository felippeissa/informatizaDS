import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

/**
 * TEMPLATE — Formulário em card.
 * Padrão para telas de cadastro/edição: seções em cards brancos (bento),
 * campos em grade responsiva e barra de ações fixa no rodapé do conteúdo.
 */
@Component({
    selector: 'app-tpl-formulario',
    standalone: true,
    imports: [FormsModule, ButtonModule, InputTextModule, TextareaModule, SelectModule, DatePickerModule, ToggleSwitchModule],
    template: `
    <div class="ds-page">
        <div class="ds-page-header">
            <h1 class="ds-page-title">Formulário em card</h1>
            <p-button label="Voltar" icon="pi pi-arrow-left" [text]="true" />
        </div>

        <!-- Seção: dados gerais -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-info-circle"></i> Informações gerais</h2>
            <div class="ds-grid ds-grid--form">
                <div class="ds-campo">
                    <label>Nome <span style="color: var(--red-500);">*</span></label>
                    <input pInputText [(ngModel)]="form.nome" placeholder="Ex.: Portal do Servidor" />
                </div>
                <div class="ds-campo">
                    <label>Tipo</label>
                    <p-select [options]="tipos" [(ngModel)]="form.tipo" placeholder="Selecione" />
                </div>
                <div class="ds-campo">
                    <label>Responsável</label>
                    <p-select [options]="responsaveis" [(ngModel)]="form.responsavel" placeholder="Selecione" [filter]="true" />
                </div>
            </div>
            <div class="ds-campo" style="margin-top: 1rem;">
                <label>Descrição</label>
                <textarea pTextarea [(ngModel)]="form.descricao" rows="3" placeholder="Descreva o registro..."></textarea>
            </div>
        </div>

        <!-- Seção: configurações -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-cog"></i> Configurações</h2>
            <div class="ds-grid ds-grid--form">
                <div class="ds-campo">
                    <label>Data de início</label>
                    <p-datepicker [(ngModel)]="form.inicio" dateFormat="dd/mm/yy" [showIcon]="true" appendTo="body" />
                </div>
                <div class="ds-campo">
                    <label>Prioridade</label>
                    <p-select [options]="prioridades" [(ngModel)]="form.prioridade" placeholder="Selecione" />
                </div>
                <div class="ds-campo">
                    <label>Situação</label>
                    <div style="display: flex; align-items: center; gap: 0.5rem; padding-top: 0.25rem;">
                        <p-toggleswitch [(ngModel)]="form.ativo" />
                        <span>{{ form.ativo ? 'Ativo' : 'Inativo' }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Barra de ações -->
        <div class="ds-card" style="display: flex; justify-content: flex-end; gap: 0.75rem; padding: 1rem 1.5rem;">
            <p-button label="Cancelar" [text]="true" />
            <p-button label="Salvar" icon="pi pi-check" />
        </div>
    </div>
  `,
})
export class TplFormulario {
    tipos = ['Projeto', 'Documento', 'Relatório'];
    responsaveis = ['Ana Souza', 'Bruno Lima', 'Carla Dias', 'Diego Melo'];
    prioridades = ['Baixa', 'Média', 'Alta'];

    form = {
        nome: '',
        tipo: null as string | null,
        responsavel: null as string | null,
        descricao: '',
        inicio: null as Date | null,
        prioridade: null as string | null,
        ativo: true,
    };
}
