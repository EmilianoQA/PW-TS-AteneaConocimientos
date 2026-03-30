import { Locator, Page, expect } from '@playwright/test';

// Clase que representa la página de registro
export class PaginaRegistro {
  readonly page: Page;
  readonly inputNombre: Locator;
  readonly inputApellido: Locator;
  readonly inputEmail: Locator;
  readonly inputPassword: Locator;
  readonly inputConfirmarPassword: Locator;
  readonly buttonCrearCuenta: Locator;
  readonly linkYaTengoCuenta: Locator;
  readonly checkboxTerminos: Locator;
  readonly linkTernimosYCondiciones: Locator;
  readonly buttonMostrarPassword: Locator;
  readonly buttonMostrarConfirmarPassword: Locator;
  readonly linkPoliticaPrivacidad: Locator;
  readonly modalVerificacionEmail: Locator;
  readonly alertaError: Locator;
  readonly errorPassword: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputNombre = page.getByRole('textbox', { name: 'Nombre' });
    this.inputApellido = page.getByRole('textbox', { name: 'Apellido' });
    this.inputEmail = page.getByRole('textbox', { name: 'Correo electrónico' });
    this.inputPassword = page.getByRole('textbox', { name: 'Contraseña', exact: true });
    this.inputConfirmarPassword = page.getByRole('textbox', { name: 'Confirmar contraseña' });
    this.buttonCrearCuenta = page.getByRole('button', { name: 'Crear cuenta' });
    this.linkYaTengoCuenta = page.getByRole('link', { name: '¿Ya tienes cuenta? Inicia' });
    this.checkboxTerminos = page.getByRole('checkbox', { name: 'Acepto los Términos y' });
    this.linkTernimosYCondiciones = page.getByRole('link', { name: 'Términos y Condiciones' });
    this.buttonMostrarPassword = page.getByRole('button', { name: 'Mostrar contraseña' }).first();
    this.buttonMostrarConfirmarPassword = page
      .getByRole('button', { name: 'Mostrar contraseña' })
      .last();
    this.linkPoliticaPrivacidad = page.getByRole('link', {
      name: 'Política de Privacidad',
      exact: true,
    });
    this.modalVerificacionEmail = page.getByRole('heading', { name: 'Verifica tu email' });
    this.alertaError = page.locator('[role="alert"]');
    this.errorPassword = page.locator('#password-helper-text.Mui-error');
  }

  async ingresarNombre(nombre: string) {
    await this.inputNombre.fill(nombre);
  }
  async ingresarApellido(apellido: string) {
    await this.inputApellido.fill(apellido);
  }
  async ingresarEmail(email: string) {
    await this.inputEmail.fill(email);
  }
  async ingresarPassword(password: string) {
    await this.inputPassword.fill(password);
  }
  async ingresarConfirmarPassword(confirmarPassword: string) {
    await this.inputConfirmarPassword.fill(confirmarPassword);
  }
  async aceptarTerminosYCondiciones() {
    await this.checkboxTerminos.check();
  }
  async hacerClickEnCrearCuenta() {
    await this.buttonCrearCuenta.click();
  }
  async mostrarPassword() {
    await this.buttonMostrarPassword.click();
  }
  async mostrarConfirmarPassword() {
    await this.buttonMostrarConfirmarPassword.click();
  }
  async checkLinkTerminosYCondiciones() {
    await this.linkTernimosYCondiciones.click();
  }
  async checkLinkYaTengoCuenta() {
    await this.linkYaTengoCuenta.click();
  }
  async checkLinkPoliticaPrivacidad() {
    await this.linkPoliticaPrivacidad.click();
  }

  async verificarModalVerificacionEmail() {
    await expect(this.modalVerificacionEmail).toBeVisible();
  }

  async verificarAlertaErrorVisible(texto: string) {
    await this.alertaError.waitFor({ state: 'visible', timeout: 10000 });
    await expect(this.alertaError).toContainText(texto);
  }

  async verificarErrorPasswordVisible() {
    await expect(this.errorPassword).toBeVisible();
  }

  async registrarEstudiante(
    nombre: string,
    apellido: string,
    email: string,
    password: string,
    confirmarPassword: string,
  ) {
    await this.ingresarNombre(nombre);
    await this.ingresarApellido(apellido);
    await this.ingresarEmail(email);
    await this.ingresarPassword(password);
    await this.ingresarConfirmarPassword(confirmarPassword);
    await this.aceptarTerminosYCondiciones();
    await this.hacerClickEnCrearCuenta();
  }
}
