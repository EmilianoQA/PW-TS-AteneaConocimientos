// page para login

import { Locator, Page } from '@playwright/test';

export class PaginaLogin {
  readonly page: Page;
  readonly textoEncabezadoLogin: Locator;
  readonly inputEmail: Locator;
  readonly inputPassword: Locator;
  readonly buttonIngresar: Locator;
  readonly linkOlvideMiPassword: Locator;
  readonly linkCrearCuenta: Locator;
  readonly buttonMostrarPassword: Locator;
  readonly buttonAccederConGoogle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.textoEncabezadoLogin = page.getByRole('heading', { name: 'Acceso de Estudiantes' });
    this.inputEmail = page.getByRole('textbox', { name: 'Correo Electrónico' });
    this.inputPassword = page.getByRole('textbox', { name: 'Contraseña' });
    this.buttonMostrarPassword = page.getByRole('button', { name: 'Mostrar contraseña' });
    this.buttonAccederConGoogle = page.getByRole('button', { name: 'Fazer Login com o Google.' });
    this.buttonIngresar = page.getByRole('button', { name: 'Ingresar' });
    this.linkOlvideMiPassword = page.getByRole('link', { name: '¿Olvidaste tu contraseña?' });
    this.linkCrearCuenta = page.getByRole('link', { name: '¿No tienes cuenta? Crea tu' });
  }
  async ingresarEmail(email: string) {
    await this.inputEmail.fill(email);
  }
  async ingresarPassword(password: string) {
    await this.inputPassword.fill(password);
  }
  async hacerClickEnIngresar() {
    await this.buttonIngresar.click();
  }
}
