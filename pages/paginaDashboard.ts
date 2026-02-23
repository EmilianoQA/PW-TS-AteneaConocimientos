// page para dashboard de estudiante

import {Locator, Page} from '@playwright/test';

export class PaginaDashboard {
    readonly page: Page;
    readonly urlDashboard: string;
    readonly iconoUsuario: Locator;

    constructor(page: Page) {
        this.page = page;
        this.urlDashboard = 'https://qa.ateneaconocimientos.com/dashboard';
        this.iconoUsuario = page.getByRole('button', { name: 'account of current user' });
    }

    async verificarUrlDashboard() {
        await this.page.waitForURL(this.urlDashboard);
    }

    async verificarIconoUsuarioVisible() {
        await this.iconoUsuario.isVisible();
    }
}