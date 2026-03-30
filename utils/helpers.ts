import { Page, expect } from '@playwright/test';

export class Helpers {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // verificar que el elemento buscado por texto es visible
  async verifcarTextoVisible(texto: string) {
    const elemento = this.page.getByText(texto);
    await expect(elemento).toBeVisible();
  }

  async verificarHeadingVisible(texto: string) {
    const elemento = this.page.getByRole('heading', { name: texto });
    await elemento.waitFor({ state: 'visible', timeout: 10000 });
  }

  async verificarRespuestaApi(url: string, status: number, method: string) {
    await this.page.waitForResponse(
      (response) =>
        response.url().includes(url) &&
        response.status() === status &&
        response.request().method() === method,
    );
  }

  async esperarPorRespuestaAPI(url: string, metodo: string, status: number) {
    await this.page.waitForResponse(
      (response) =>
        response.url().includes(url) &&
        response.request().method() === metodo &&
        response.status() === status,
    );
  }
}
