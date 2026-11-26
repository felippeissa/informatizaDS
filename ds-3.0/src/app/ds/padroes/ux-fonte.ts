import { Component, input } from '@angular/core';

/** Arquivo Figma do Informatiza 3.0 (time de UX da GESIS). */
export const FIGMA_DS = 'https://www.figma.com/design/oBPMZCbXjlFLs1qZ11ofD8/Informatiza-3.0';

/** Link "Acesse no Figma" para um nó do arquivo do DS. */
@Component({
    selector: 'app-ux-figma',
    standalone: true,
    template: `<a class="ux-figma" [href]="url()" target="_blank" rel="noopener"><i class="pi pi-external-link"></i> Acesse no Figma</a>`
})
export class UxFigma {
    node = input.required<string>();
    url = () => FIGMA_DS + '?node-id=' + this.node();
}

/** Rodapé de cabeçalho: de onde vêm as regras da página. */
@Component({
    selector: 'app-ux-fonte',
    standalone: true,
    template: `
        <p class="ux-fonte">
            <i class="pi pi-book"></i>
            Fonte: <strong>GESIS · Definições de padrões de design (UX)</strong> — MGS 2.0.1, versão 1.0.13.
            <a [href]="figma" target="_blank" rel="noopener">Design System no Figma</a>
        </p>`
})
export class UxFonte {
    figma = FIGMA_DS + '?node-id=8594-22240';
}
