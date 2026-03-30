import { expect, Locator, Page } from '@playwright/test';

export class PaginaTopAtenienses {
  readonly page: Page;
  readonly tituloSeccion: Locator;
  readonly botonActualizarRanking: Locator;
  readonly posicionesNumeradas: Locator;
  readonly alertaSesionObligatoria: Locator;
  readonly medallaOro: Locator;
  readonly medallaPlata: Locator;
  readonly medallaBronce: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tituloSeccion = page.getByRole('heading', { name: 'Top Atenienses' });
    this.botonActualizarRanking = page.getByRole('button', {
      name: /Actualizar (ranking|mi posición)/i,
    });
    this.medallaOro = page.getByText('🥇');
    this.medallaPlata = page.getByText('🥈');
    this.medallaBronce = page.getByText('🥉');
    this.posicionesNumeradas = page.getByText(/^#(4|5|6|7|8|9|10)$/);
    this.alertaSesionObligatoria = page.getByText('Inicia sesión como estudiante', {
      exact: false,
    });
  }

  async navegarALTopAtenienses() {
    await this.page.goto('/top-atenienses');
  }

  async actualizarRanking() {
    await this.botonActualizarRanking.click();
  }

  async validarSeccionVisible() {
    await expect(this.tituloSeccion).toBeVisible();
    await expect(this.botonActualizarRanking).toBeVisible();
  }

  async validarPodioCompleto() {
    await expect(this.medallaOro).toBeVisible();
    await expect(this.medallaPlata).toBeVisible();
    await expect(this.medallaBronce).toBeVisible();
  }

  async validarParticipantesTop10() {
    await expect(this.posicionesNumeradas).toHaveCount(7);
  }

  async validarAlertasDeshabilitadas() {
    await expect(this.alertaSesionObligatoria).toHaveCount(0);
  }
}
