import dotenv from 'dotenv';
import { test, expect } from '@playwright/test';
import { PaginaLogin } from '@pages/paginaLogin';
import { PaginaDashboard } from '@pages/paginaDashboard';
import { PaginaHome } from '@pages/paginaHome';
import { Helpers } from '@utils/helpers';
import { endpoints } from '@data/endpoints';
dotenv.config();

const emailEstudiante = process.env.E2E_USER;
const passwordEstudiante = process.env.E2E_PASS;

test.describe('Logout de estudiante', () => {
  test.skip(
    !emailEstudiante || !passwordEstudiante,
    'E2E_USER y E2E_PASS son obligatorios para este test.',
  );

  let paginaLogin: PaginaLogin;
  let paginaDashboard: PaginaDashboard;
  let helpers: Helpers;

  test.beforeEach(async ({ page }) => {
    paginaLogin = new PaginaLogin(page);
    paginaDashboard = new PaginaDashboard(page);
    helpers = new Helpers(page);

    await paginaLogin.navegarALogin();
    await paginaLogin.iniciarSesion(emailEstudiante!, passwordEstudiante!);
    await helpers.verificarRespuestaApi(endpoints.login, 200, 'POST');
    await paginaDashboard.esperarDashboardVisible();
  });

  test('Logout limpia sesión y protege rutas', async ({ page }) => {
    const estadoAntes = await page.evaluate(() => ({
      token: window.localStorage.getItem('token'),
      user: window.localStorage.getItem('user'),
    }));
    expect(estadoAntes.token).not.toBeNull();

    await paginaDashboard.cerrarSesionDesdeMenu();

    await expect(page).toHaveURL(/\/login$/);

    const estadoDespues = await page.evaluate(() => ({
      token: window.localStorage.getItem('token'),
      user: window.localStorage.getItem('user'),
    }));
    expect(estadoDespues.token).toBeNull();
    expect(estadoDespues.user).toBeNull();

    const paginaHome = new PaginaHome(page);
    await paginaHome.navegarAhome();
    await expect(paginaHome.botonCrearCuenta).toBeVisible();

    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login$/);
  });
});
