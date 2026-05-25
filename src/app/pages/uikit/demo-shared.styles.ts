/** Estilos compartilhados entre todas as páginas de componente do Design System */
export const DEMO_STYLES = `
    /* ── cabeçalho ── */
    .comp-header { padding: 32px 0 28px; border-bottom: 1px solid var(--surface-border); }
    .comp-name   { font-size: 30px; font-weight: 800; color: var(--text-color); margin: 0 0 8px; letter-spacing: -.02em; }
    .comp-desc   { font-size: 14px; color: var(--text-color-secondary); margin: 0 0 16px; line-height: 1.65; max-width: 640px; }
    .import-snippet {
        display: inline-flex; align-items: center;
        background: #0F172A; border: 1px solid #1E293B; border-radius: 8px;
        padding: 9px 16px; font-family: 'Courier New', monospace; font-size: 13px;
    }
    .tok-kw  { color: #93C5FD; }
    .tok-id  { color: #86EFAC; }
    .tok-str { color: #FCD34D; }
    .tok-pt  { color: #E2E8F0; }

    /* ── demo card ── */
    .demo-card { border: 1px solid var(--surface-border); border-radius: 12px; overflow: hidden; margin-bottom: 16px; scroll-margin-top: 80px; }
    .demo-card-head { padding: 14px 20px 12px; background: var(--surface-card); border-bottom: 1px solid var(--surface-border); }
    .demo-card-title { font-size: 14px; font-weight: 700; color: var(--text-color); margin: 0 0 3px; }
    .demo-card-desc  { font-size: 12px; color: var(--text-color-secondary); margin: 0; line-height: 1.5; }
    .demo-card-body  { padding: 20px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
    .demo-card-body.col    { flex-direction: column; align-items: flex-start; }
    .demo-card-body.bottom { align-items: flex-end; }

    /* ── code block ── */
    .demo-card-code {
        border-top: 1px solid #1E293B; background: #0F172A;
        padding: 14px 18px; overflow-x: auto;
    }
    .demo-card-code pre {
        margin: 0; font-family: 'Courier New', monospace;
        font-size: 12.5px; line-height: 1.65; color: #E2E8F0;
        white-space: pre;
    }

    /* ── API ── */
    .api-block-title { font-size: 14px; font-weight: 700; color: var(--text-color); margin: 24px 0 8px; letter-spacing: -.01em; }
    .api-block-title:first-child { margin-top: 0; }
    .badge-type    { display: inline-block; background: #DBEAFE; color: #1D4ED8; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; font-family: monospace; white-space: nowrap; }
    .badge-default { display: inline-block; background: var(--surface-ground); color: var(--text-color-secondary); border: 1px solid var(--surface-border); font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 4px; font-family: monospace; white-space: nowrap; }

    /* ── Theming ── */
    .theme-var { font-family: monospace; font-size: 12px; color: #059669; font-weight: 600; }

    /* ── p-table (API / Theming tabs) ── */
    :host ::ng-deep .p-datatable-sm .p-datatable-table-container {
        border: 1px solid var(--surface-border); border-radius: 8px; overflow: hidden;
    }
    :host ::ng-deep .p-datatable-sm .p-datatable-thead > tr > th {
        background: var(--surface-card);
        border-bottom: 2px solid var(--surface-border);
        font-size: 10px; font-weight: 700; text-transform: uppercase;
        letter-spacing: .06em; color: var(--text-color-secondary); padding: 9px 14px;
    }
    :host ::ng-deep .p-datatable-sm .p-datatable-tbody > tr > td {
        padding: 9px 14px; border-bottom: 1px solid var(--surface-border); vertical-align: top;
        background: var(--surface-0, #fff);
    }
    :host ::ng-deep .p-datatable-sm .p-datatable-tbody > tr:nth-child(even) > td {
        background: var(--surface-ground);
    }
    :host ::ng-deep .p-datatable-sm .p-datatable-tbody > tr:last-child > td { border-bottom: none; }
    :host ::ng-deep .p-datatable-sm .p-datatable-tbody > tr:hover > td {
        background: color-mix(in srgb, var(--primary-color) 6%, transparent) !important;
    }

    /* ── tabs: painel transparente + tablist harmonioso ── */
    :host ::ng-deep .p-tabpanels {
        padding: 0;
        background: transparent;
    }
    :host ::ng-deep .p-tablist {
        background: transparent;
        border-bottom: 1px solid var(--surface-border);
        padding: 0;
        margin-top: 20px;
    }
    :host ::ng-deep .p-tab {
        background: transparent;
        border: none;
        border-bottom: 2px solid transparent;
        border-radius: 0;
        color: var(--text-color-secondary);
        font-size: 13px;
        font-weight: 600;
        padding: 10px 16px;
        margin-bottom: -1px;
        transition: color .15s, border-color .15s;
    }
    :host ::ng-deep .p-tab:hover {
        color: var(--text-color);
        border-bottom-color: var(--surface-border);
        background: transparent;
    }
    :host ::ng-deep .p-tab.p-tab-active {
        color: var(--primary-color);
        border-bottom-color: var(--primary-color);
        background: transparent;
    }
    :host ::ng-deep .p-tablist-active-bar { display: none; }
`;
