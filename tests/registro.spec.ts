import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { PaginaHome } from '../pages/paginaHome';
import { PaginaRegistro } from '../pages/paginaRegistro';

let paginaHome: PaginaHome;
let paginaRegistro: PaginaRegistro;

dotenv.config();

test.beforeEach(async ({ page }) => {
  paginaHome = new PaginaHome(page);
  paginaRegistro = new PaginaRegistro(page);
});

test('Registro de estudiante (sign up)', async ({ page }) => {
  const emailAleatorio = `user${Date.now()}@example.com`; 
  await paginaHome.navegarAhome();
  await paginaHome.navegarAregistro();
  await paginaRegistro.registrarEstudiante('Nombre', 'Apellido', emailAleatorio, 'password123', 'password123');
  // test incompleto, falta la verificacion del email y poder realizar el login exitoso
});

