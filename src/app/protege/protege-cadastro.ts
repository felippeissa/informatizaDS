import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-protege-cadastro',
    standalone: true,
    imports: [FormsModule, ButtonModule, InputTextModule, InputMaskModule, InputNumberModule],
    templateUrl: './protege-cadastro.html',
    styleUrl: './protege-cadastro.scss',
})
export class ProtegeCadastro {
    private messageService = inject(MessageService);

    form = {
        texto1: '', texto2: '', texto3: '',
        cpf: '', cep1: '', valor1: null as number | null,
        texto4: '', cep2: '', valor2: null as number | null,
        texto5: '', cep3: '', valor3: null as number | null,
        texto6: '', valor4: null as number | null,
        texto7: '',
    };

    salvar() {
        this.messageService.add({
            severity: 'success',
            summary: 'Cadastro salvo',
            detail: 'O registro foi salvo com sucesso.',
            life: 4000,
        });
    }

    cancelar() {
        this.form = {
            texto1: '', texto2: '', texto3: '',
            cpf: '', cep1: '', valor1: null,
            texto4: '', cep2: '', valor2: null,
            texto5: '', cep3: '', valor3: null,
            texto6: '', valor4: null,
            texto7: '',
        };
    }
}
