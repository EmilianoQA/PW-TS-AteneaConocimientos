// page para dashboard de estudiante

import { Locator, Page, expect } from '@playwright/test';

export class PaginaDashboard {
  readonly page: Page;
  readonly iconoUsuario: Locator;
  readonly opcionCerrarSesion: Locator;
  readonly linkMisTalleres: Locator;

  constructor(page: Page) {
    this.page = page;
    this.iconoUsuario = page.getByRole('button', { name: /account of current user/i });
    this.opcionCerrarSesion = page.getByRole('menuitem', { name: 'Cerrar Sesión' });
    this.linkMisTalleres = page.getByRole('tab', { name: 'Mis Talleres' });
  }

  async verificarUrlDashboard() {
    await this.page.waitForURL(/\/dashboard/);
  }

  async verificarIconoUsuarioVisible() {
    await expect(this.iconoUsuario).toBeVisible();
  }

  async esperarDashboardVisible() {
    await this.linkMisTalleres.waitFor({ state: 'visible' });
  }

  async abrirMenuUsuario() {
    await this.iconoUsuario.click();
    await this.opcionCerrarSesion.waitFor({ state: 'visible' });
  }

  async cerrarSesionDesdeMenu() {
    await this.abrirMenuUsuario();
    await this.opcionCerrarSesion.click();
  }
}
