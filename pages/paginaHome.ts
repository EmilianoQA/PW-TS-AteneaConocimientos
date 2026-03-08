import { Locator, Page } from '@playwright/test';

export class PaginaHome {
  readonly page: Page;
  readonly botonCrearCuenta: Locator;
  readonly botonIngresar: Locator;
  //readonly urlhome = process.env.BASE_URL;

  constructor(page: Page) {
    this.page = page;
    this.botonCrearCuenta = page.getByRole('link', { name: 'Crear cuenta' });
    this.botonIngresar = page.getByRole('link', { name: 'Ingresar' });
  }

  async navegarAhome() {
    //await this.page.goto(this.urlhome!);
    await this.page.goto('/');
  }

  async navegarAregistro() {
    await this.botonCrearCuenta.click();
  }

  async navegarAingresar() {
    await this.botonIngresar.click();
  }
}
