import { test } from '@playwright/test';
import dotenv from 'dotenv';
import { PaginaHome } from '@pages/paginaHome';
import { PaginaRegistro } from '@pages/paginaRegistro';
import { Helpers } from '@utils/helpers';
import { DataFactory } from '@utils/dataFactory';
import { registroData } from '@data/registro';
import { endpoints } from '@data/endpoints';

let paginaHome: PaginaHome;
let paginaRegistro: PaginaRegistro;
let helpers: Helpers;
const dataFactory = new DataFactory();

dotenv.config();

test.beforeEach(({ page }) => {
  paginaHome = new PaginaHome(page);
  paginaRegistro = new PaginaRegistro(page);
  helpers = new Helpers(page);
});

test('Registro de estudiante (sign up)', async () => {
  await paginaHome.navegarAhome();
  await paginaHome.navegarAregistro();
  await paginaRegistro.registrarEstudiante(
    registroData.estudianteValido.nombre,
    registroData.estudianteValido.apellido,
    dataFactory.generarEmail(),
    registroData.estudianteValido.password,
    registroData.estudianteValido.password,
  );
  await helpers.verificarRespuestaApi(endpoints.registro, 201, 'POST');
  await paginaRegistro.verificarModalVerificacionEmail();
  await helpers.verificarHeadingVisible('Verifica tu email');
});

test('Registro con email ya existente', async () => {
  await paginaHome.navegarAhome();
  await paginaHome.navegarAregistro();
  await paginaRegistro.registrarEstudiante(
    registroData.emailExistente.nombre,
    registroData.emailExistente.apellido,
    registroData.emailExistente.email,
    registroData.emailExistente.password,
    registroData.emailExistente.password,
  );
  await helpers.verificarRespuestaApi(endpoints.registro, 409, 'POST');
  await paginaRegistro.verificarAlertaErrorVisible('Ya existe una cuenta con este email.');
});

test('Registro con password que no cumple los requisitos', async () => {
  await paginaHome.navegarAhome();
  await paginaHome.navegarAregistro();
  await paginaRegistro.registrarEstudiante(
    registroData.passwordDebil.nombre,
    registroData.passwordDebil.apellido,
    dataFactory.generarEmail(),
    registroData.passwordDebil.password,
    registroData.passwordDebil.password,
  );
  await paginaRegistro.verificarErrorPasswordVisible();
});
