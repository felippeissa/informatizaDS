import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

interface Form {
    nome: string; tipo: string | null; responsavel: string | null; cpf: string; email: string;
    descricao: string; periodo: Date[] | null; valor: number | null; prioridade: string | null; ativo: boolean;
}

const VAZIO: Form = { nome: '', tipo: null, responsavel: null, cpf: '', email: '', descricao: '', periodo: null, valor: null, prioridade: null, ativo: true };

/**
 * TEMPLATE — Formulário de cadastro (padrão GESIS).
 * - Página única, seções temáticas em cards (nunca abas).
 * - Placeholders: Digite / Selecione / Digite e selecione / DD/MM/AAAA; máscaras padrão; valor à direita.
 * - Validação para formulários com muitos campos: ao salvar, toast de erro + campos marcados.
 * - Botões à direita, 16px: Cancelar (secundário, com confirmação) · Salvar (primário). Sem ícones.
 * - Modo edição (?modo=edicao): confirmação OBRIGATÓRIA ao salvar (confirmar edição) e ao cancelar (cancelar edição).
 */
@Component({
    selector: 'app-tpl-formulario',
    standalone: true,
    imports: [FormsModule, ButtonModule, InputTextModule, InputMaskModule, InputNumberModule, TextareaModule, SelectModule,
              DatePickerModule, ToggleSwitchModule, MessageModule, ConfirmDialogModule],
    providers: [ConfirmationService],
    template: `
    <p-confirmdialog styleClass="ds-dialog-basico" />

    <div class="ds-page">
        <div class="ds-page-header">
            <h1 class="ds-page-title">{{ edicao() ? 'Edição de projeto' : 'Cadastro de projeto' }}</h1>
        </div>

        <p-message severity="info" icon="pi pi-info-circle">
            Preencha os dados abaixo. Campos com <strong>*</strong> são obrigatórios e os dados só serão salvos ao clicar em Salvar.
        </p-message>

        <!-- Seção: informações gerais -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-info-circle"></i> Informações gerais</h2>
            <div class="ds-grid ds-grid--form">
                <div class="ds-campo">
                    <label for="c-nome">Nome <span class="ds-required">*</span></label>
                    <input id="c-nome" pInputText [(ngModel)]="form.nome" placeholder="Digite"
                           [class.ng-invalid]="erro('nome')" [class.ng-dirty]="erro('nome')" />
                    @if (erro('nome')) { <small class="ds-erro">Informe o nome do projeto.</small> }
                </div>
                <div class="ds-campo">
                    <label for="c-tipo">Tipo <span class="ds-required">*</span></label>
                    <p-select inputId="c-tipo" [options]="tipos" [(ngModel)]="form.tipo" placeholder="Selecione" appendTo="body"
                              [class.ng-invalid]="erro('tipo')" [class.ng-dirty]="erro('tipo')" />
                    @if (erro('tipo')) { <small class="ds-erro">Selecione o tipo.</small> }
                </div>
                <div class="ds-campo">
                    <label for="c-resp">Responsável <span class="ds-required">*</span></label>
                    <p-select inputId="c-resp" [options]="responsaveis" [(ngModel)]="form.responsavel" placeholder="Digite e selecione"
                              [filter]="true" appendTo="body" [class.ng-invalid]="erro('responsavel')" [class.ng-dirty]="erro('responsavel')" />
                    @if (erro('responsavel')) { <small class="ds-erro">Selecione o responsável.</small> }
                </div>
                <div class="ds-campo">
                    <label for="c-cpf">CPF do responsável</label>
                    <p-inputmask inputId="c-cpf" mask="999.999.999-99" [(ngModel)]="form.cpf" placeholder="000.000.000-00" />
                </div>
                <div class="ds-campo">
                    <label for="c-email">E-mail para contato</label>
                    <input id="c-email" pInputText type="email" [(ngModel)]="form.email" placeholder="email&#64;goias.gov.br" />
                </div>
                <div class="ds-campo ds-col-full">
                    <label for="c-desc">Descrição</label>
                    <textarea id="c-desc" pTextarea [(ngModel)]="form.descricao" rows="3" placeholder="Digite"></textarea>
                </div>
            </div>
        </div>

        <!-- Seção: planejamento -->
        <div class="ds-card">
            <h2 class="ds-card-titulo"><i class="pi pi-calendar"></i> Planejamento</h2>
            <div class="ds-grid ds-grid--form">
                <div class="ds-campo">
                    <label for="c-periodo">Período de execução</label>
                    <p-datepicker inputId="c-periodo" [(ngModel)]="form.periodo" selectionMode="range" [readonlyInput]="true"
                                  dateFormat="dd/mm/yy" placeholder="DD/MM/AAAA - DD/MM/AAAA" [showIcon]="true" appendTo="body" />
                </div>
                <div class="ds-campo">
                    <label for="c-valor">Valor estimado (R$)</label>
                    <p-inputnumber inputId="c-valor" [(ngModel)]="form.valor" mode="currency" currency="BRL" locale="pt-BR"
                                   placeholder="R$ 0,00" styleClass="ds-num" />
                </div>
                <div class="ds-campo">
                    <label for="c-prio">Prioridade</label>
                    <p-select inputId="c-prio" [options]="prioridades" [(ngModel)]="form.prioridade" placeholder="Selecione" appendTo="body" />
                </div>
                <div class="ds-campo">
                    <label for="c-ativo">Situação</label>
                    <div style="display: flex; align-items: center; gap: 0.5rem; padding-top: 0.35rem;">
                        <p-toggleswitch inputId="c-ativo" [(ngModel)]="form.ativo" />
                        <span>{{ form.ativo ? 'Ativo' : 'Inativo' }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Ações: à direita, secundário → primário, sem ícones -->
        <div class="ds-card ds-botoes" style="padding: 1rem 1.5rem;">
            <p-button label="Cancelar" [outlined]="true" (onClick)="cancelar()" />
            <p-button label="Salvar" (onClick)="salvar()" />
        </div>
    </div>
  `,
})
export class TplFormulario implements OnInit {
    private confirm = inject(ConfirmationService);
    private msg = inject(MessageService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    edicao = signal(false);

    /** Registro de exemplo carregado no modo edição. */
    private registro: Form = {
        nome: 'Portal do Servidor', tipo: 'Portal', responsavel: 'Ana Souza', cpf: '12345678900', email: 'portal.servidor@goias.gov.br',
        descricao: 'Autoatendimento do servidor público estadual: consulta de contracheque, férias, benefícios e solicitações internas.',
        periodo: [new Date(2026, 5, 10), new Date(2026, 11, 30)], valor: 1250000, prioridade: 'Alta', ativo: true,
    };

    ngOnInit() {
        this.route.queryParamMap.subscribe((q) => {
            const editar = q.get('modo') === 'edicao';
            this.edicao.set(editar);
            this.form = editar ? { ...this.registro } : { ...VAZIO };
            this.tentouSalvar.set(false);
        });
    }

    tipos = ['Sistema', 'Portal', 'Aplicativo', 'Integração'];
    responsaveis = ['Ana Souza', 'Bruno Lima', 'Carla Dias', 'Diego Melo', 'Elis Rocha'];
    prioridades = ['Baixa', 'Média', 'Alta'];

    form: Form = { ...VAZIO };
    private tentouSalvar = signal(false);

    private obrigatorios: (keyof Form)[] = ['nome', 'tipo', 'responsavel'];

    erro(campo: keyof Form): boolean {
        if (!this.tentouSalvar()) return false;
        const v = this.form[campo];
        return v === null || (typeof v === 'string' && !v.trim());
    }

    salvar() {
        this.tentouSalvar.set(true);
        if (this.obrigatorios.some((c) => this.erro(c))) {
            this.msg.add({ severity: 'error', summary: 'Erro', detail: 'Preencha os campos obrigatórios destacados.', life: 3000 });
            return;
        }
        if (!this.edicao()) {
            this.msg.add({ severity: 'success', summary: 'Sucesso', detail: 'Projeto criado com sucesso.', life: 3000 });
            this.form = { ...VAZIO };
            this.tentouSalvar.set(false);
            return;
        }
        // Confirmar edição: obrigatório (padrão GESIS)
        this.confirm.confirm({
            header: 'Confirmar edição',
            message: 'Deseja salvar as alterações em "' + this.form.nome + '"?',
            acceptLabel: 'Salvar', rejectLabel: 'Cancelar',
            rejectButtonProps: { outlined: true },
            accept: () => {
                this.msg.add({ severity: 'success', summary: 'Sucesso', detail: 'Projeto atualizado com sucesso.', life: 3000 });
                this.router.navigateByUrl('/ds/templates/detalhe');
            }
        });
    }

    /** Cancelar cadastro ou edição: confirmação obrigatória (perda dos dados/alterações). */
    cancelar() {
        const editando = this.edicao();
        this.confirm.confirm({
            header: editando ? 'Cancelar edição' : 'Cancelar cadastro',
            message: editando
                ? 'As alterações não salvas serão perdidas. Deseja cancelar a edição?'
                : 'Os dados preenchidos serão perdidos. Deseja cancelar o cadastro?',
            acceptLabel: 'Sim, cancelar', rejectLabel: 'Continuar editando',
            rejectButtonProps: { outlined: true },
            accept: () => {
                if (editando) { this.router.navigateByUrl('/ds/templates/detalhe'); return; }
                this.form = { ...VAZIO }; this.tentouSalvar.set(false);
            }
        });
    }
}
