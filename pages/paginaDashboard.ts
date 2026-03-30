// page para dashboard de estudiante

import { Locator, Page, expect } from '@playwright/test';

export class PaginaDashboard {
  readonly page: Page;
  readonly iconoUsuario: Locator;

  constructor(page: Page) {
    this.page = page;
    this.iconoUsuario = page.getByRole('button', { name: 'account of current user' });
  }

  async verificarUrlDashboard() {
    await this.page.waitForURL(/\/dashboard/);
  }

  async verificarIconoUsuarioVisible() {
    await expect(this.iconoUsuario).toBeVisible();
  }
}
