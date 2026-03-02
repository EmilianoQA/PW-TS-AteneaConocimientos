import { test } from '@playwright/test';
import dotenv from 'dotenv';
import { PaginaHome } from '@pages/paginaHome';
import { PaginaRegistro } from '@pages/paginaRegistro';
import { Helpers } from '@utils/helpers';

let paginaHome: PaginaHome;
let paginaRegistro: PaginaRegistro;
let helpers: Helpers;

dotenv.config();

test.beforeEach(({ page }) => {
  paginaHome = new PaginaHome(page);
  paginaRegistro = new PaginaRegistro(page);
  helpers = new Helpers(page);
});

test('Registro de estudiante (sign up)', async () => {
  const emailAleatorio = `user${Date.now()}@example.com`;

  await paginaHome.navegarAhome();
  await paginaHome.navegarAregistro();
  await paginaRegistro.registrarEstudiante(
    'Estudiante',
    'Ejemplo',
    emailAleatorio,
    'password123',
    'password123',
  );
  await helpers.verificarRespuestaApi('/api/students/register', 201, 'POST');
  await paginaRegistro.verificarModalVerificacionEmail();
  await helpers.verificarHeadingVisible('Verifica tu email');
});

// pendiente
// validar la respuesta de api
// diseñasar casos de puebas no existosos
// crear archivo de datos,
// meter las endpoint en una lista por si cambian, no tener que cambiar en todos los test, solo en el archivo de datos
// crear el metodo para crear un email aleatorio,
// ejemplo de caso no exitoso: registro con email ya existente, registro con password que no cumple con los requisitos, etc.
