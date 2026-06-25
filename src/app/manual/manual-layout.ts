import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppTopbar } from '../layout/component/app.topbar';
import { AppFooter } from '../layout/component/app.footer';
import { ChatFlutuante } from '../chat/chat-flutuante';

@Component({
    selector: 'app-manual-layout',
    standalone: true,
    imports: [RouterModule, AppTopbar, AppFooter, ChatFlutuante],
    template: `
        <div class="layout-wrapper">
            <app-topbar></app-topbar>
            <app-chat-flutuante></app-chat-flutuante>
            <div class="layout-main-container" style="margin-left:0">
                <div class="layout-main">
                    <router-outlet></router-outlet>
                </div>
                <app-footer></app-footer>
            </div>
        </div>`,
})
export class ManualLayout {}
