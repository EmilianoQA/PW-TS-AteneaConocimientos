import { test } from '@playwright/test';
import dotenv from 'dotenv';
import { PaginaHome } from '@pages/paginaHome';
import { PaginaLogin } from '@pages/paginaLogin';
import { PaginaDashboard } from '@pages/paginaDashboard';
import { Helpers } from '@utils/helpers';
import { loginData } from '@data/login';
import { endpoints } from '@data/endpoints';
dotenv.config();

let paginaDashboard: PaginaDashboard;
let paginaHome: PaginaHome;
let paginaLogin: PaginaLogin;
let helpers: Helpers;

test.beforeEach(({ page }) => {
  paginaHome = new PaginaHome(page);
  paginaLogin = new PaginaLogin(page);
  paginaDashboard = new PaginaDashboard(page);
  helpers = new Helpers(page);
});

test('Login valido con usuario existente', async ({ page }) => {
  const paginaHomeUrl = process.env.BASE_URL;

  await page.goto(paginaHomeUrl!);
  await paginaHome.navegarAingresar();
  await paginaLogin.ingresarEmail(loginData.usuarioValido.email);
  await paginaLogin.ingresarPassword(loginData.usuarioValido.password);
  await paginaLogin.hacerClickEnIngresar();
  await helpers.verificarRespuestaApi(endpoints.login, 200, 'POST');
  await paginaDashboard.verificarUrlDashboard();
  await paginaDashboard.verificarIconoUsuarioVisible();
});

test('Login con email no registrado', async ({ page }) => {
  const paginaHomeUrl = process.env.BASE_URL;

  await page.goto(paginaHomeUrl!);
  await paginaHome.navegarAingresar();
  await paginaLogin.ingresarEmail(loginData.emailNoRegistrado.email);
  await paginaLogin.ingresarPassword(loginData.emailNoRegistrado.password);
  await paginaLogin.hacerClickEnIngresar();
  await helpers.verificarRespuestaApi(endpoints.login, 401, 'POST');
  await paginaLogin.verificarAlertaErrorVisible();
});

test('Login con password incorrecta', async ({ page }) => {
  const paginaHomeUrl = process.env.BASE_URL;

  await page.goto(paginaHomeUrl!);
  await paginaHome.navegarAingresar();
  await paginaLogin.ingresarEmail(loginData.passwordIncorrecta.email);
  await paginaLogin.ingresarPassword(loginData.passwordIncorrecta.password);
  await paginaLogin.hacerClickEnIngresar();
  await helpers.verificarRespuestaApi(endpoints.login, 401, 'POST');
  await paginaLogin.verificarAlertaErrorVisible();
});
