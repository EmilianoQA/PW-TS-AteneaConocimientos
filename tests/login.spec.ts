import { test } from '@playwright/test';
import dotenv from 'dotenv';
import { PaginaHome } from '@pages/paginaHome';
import { PaginaLogin } from '@pages/paginaLogin';
import { PaginaDashboard } from '@pages/paginaDashboard';
dotenv.config();

let pagianaDashboard: PaginaDashboard;
let paginaHome: PaginaHome;
let paginaLogin: PaginaLogin;

test.beforeEach(({ page }) => {
  paginaHome = new PaginaHome(page);
  paginaLogin = new PaginaLogin(page);
  pagianaDashboard = new PaginaDashboard(page);
});

// Tu test original (lo dejamos tal cual)
test('Login valido con usuario existente', async ({ page }) => {
  const paginaHomeUrl = process.env.BASE_URL;

  await page.goto(paginaHomeUrl!);
  await paginaHome.navegarAingresar();
  await paginaLogin.ingresarEmail('qaatyourservice+1@gmail.com');
  await paginaLogin.ingresarPassword('Contrasña1234!');
  await paginaLogin.hacerClickEnIngresar();
  await pagianaDashboard.verificarUrlDashboard();
  await pagianaDashboard.verificarIconoUsuarioVisible();
});

// Pendiente:
// - Validar la respuesta de la API (puedes usar page.on('response') para esto)
// - Diseñar casos de pruebas no exitosos (ejemplo: login con email no registrado, login con password incorrecta, etc.)
