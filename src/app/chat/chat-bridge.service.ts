import { Injectable, signal } from '@angular/core';

export interface ChatTransferMsg { autor: 'user' | 'ia'; texto: string; sistema?: string; modelo?: string; }

export interface ChatTransfer {
    msgs: ChatTransferMsg[];
    sistema: string;
    draft?: string;
}

/**
 * Ponte entre o chat flutuante e a página do Manual Inteligente:
 * carrega a conversa atual ao navegar para /manual, em vez de abrir em branco.
 */
@Injectable({ providedIn: 'root' })
export class ChatBridgeService {
    transfer = signal<ChatTransfer | null>(null);

    consumir(): ChatTransfer | null {
        const t = this.transfer();
        this.transfer.set(null);
        return t;
    }
}
