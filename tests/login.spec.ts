import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { PaginaHome } from '../pages/paginaHome';
import { PaginaLogin } from '../pages/paginaLogin';
import { PaginaDashboard } from '../pages/paginaDashboard';


let pagianaDashboard: PaginaDashboard;
let paginaHome: PaginaHome;
let paginaLogin: PaginaLogin;


test.beforeEach(async ({ page }) => {
  paginaHome = new PaginaHome(page);
  paginaLogin = new PaginaLogin(page);
  pagianaDashboard = new PaginaDashboard(page);
  
});

dotenv.config();

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

