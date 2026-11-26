import { AfterViewChecked, Component, computed, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
import { LayoutService } from '@/app/layout/service/layout.service';
import { ChatBridgeService } from './chat-bridge.service';

interface Msg { autor: 'user' | 'ia'; texto: string; sistema?: string; }

@Component({
    selector: 'app-chat-flutuante',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, SelectModule, TooltipModule],
    templateUrl: './chat-flutuante.html',
    styleUrl:    './chat-flutuante.scss',
})
export class ChatFlutuante implements AfterViewChecked {
    layoutService = inject(LayoutService);
    private router = inject(Router);
    private bridge = inject(ChatBridgeService);

    chatMode = this.layoutService.chatMode;
    aberto   = this.layoutService.chatAberto;

    // Sistema do contexto atual (null = sem sistema específico → mostra filtro)
    sistemaAtual = signal<string | null>(null);
    sistemaSel   = signal('Todos os sistemas');
    input = '';
    digitando = signal(false);
    msgs = signal<Msg[]>([]);

    sistemasFiltro = [
        { label: 'Todos os sistemas', value: 'Todos os sistemas' },
        { label: 'Drácon',            value: 'Drácon' },
        { label: 'GO.DEV',            value: 'GO.DEV' },
        { label: 'ASSINAGO',          value: 'ASSINAGO' },
        { label: 'SIAFIC',            value: 'SIAFIC' },
        { label: 'SISLOG',            value: 'SISLOG' },
        { label: 'Portal Goiás',      value: 'Portal Goiás' },
    ];

    @ViewChild('scrollArea') private scrollArea?: ElementRef<HTMLElement>;
    private deveRolar = false;

    constructor() {
        this.detectar(this.router.url);
        this.router.events
            .pipe(filter((e) => e instanceof NavigationEnd))
            .subscribe((e: any) => this.detectar(e.urlAfterRedirects));
    }

    private detectar(url: string) {
        let s: string | null = null;
        if (url.startsWith('/dracon'))        s = 'Drácon';
        else if (url.startsWith('/godev'))    s = 'GO.DEV';
        else if (url.startsWith('/assinago')) s = 'ASSINAGO';
        this.sistemaAtual.set(s);
    }

    get temSistemaFixo() { return this.sistemaAtual() !== null; }

    abrir()  { this.aberto.set(true); }
    fechar() { this.aberto.set(false); }

    abrirManual() {
        this.aberto.set(false);
        const sistema = this.sistemaAtual() ?? this.sistemaSel();
        // Leva a conversa atual (e o texto não enviado) para o Manual Inteligente
        if (this.msgs().length || this.input.trim()) {
            this.bridge.transfer.set({
                msgs: this.msgs().map((m) => ({ autor: m.autor, texto: m.texto, sistema: m.sistema })),
                sistema,
                draft: this.input.trim() || undefined,
            });
        }
        this.router.navigateByUrl('/manual');
    }

    enviar() {
        const txt = this.input.trim();
        if (!txt || this.digitando()) return;
        const sis = this.sistemaAtual() ?? this.sistemaSel();
        this.msgs.update((m) => [...m, { autor: 'user', texto: txt }]);
        this.input = '';
        this.digitando.set(true);
        this.deveRolar = true;
        setTimeout(() => {
            this.msgs.update((m) => [...m, { autor: 'ia', texto: this.resposta(txt, sis), sistema: sis }]);
            this.digitando.set(false);
            this.deveRolar = true;
        }, 1100);
    }

    ngAfterViewChecked() {
        if (!this.deveRolar || !this.scrollArea) return;
        this.deveRolar = false;
        const el = this.scrollArea.nativeElement;
        el.scrollTop = el.scrollHeight;
    }

    private resposta(pergunta: string, sistema: string): string {
        const alvo = sistema === 'Todos os sistemas' ? 'os sistemas do Governo de Goiás' : `o ${sistema}`;
        return `Com base na documentação de ${alvo}, aqui vai uma orientação sobre "${pergunta}".\n\n(Resposta simulada do Manual Inteligente.) Para uma resposta completa, abra o Manual Inteligente.`;
    }
}
