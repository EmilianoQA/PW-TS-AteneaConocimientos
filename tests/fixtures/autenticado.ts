import { test as base } from '@playwright/test';
import dotenv from 'dotenv';
import { PaginaLogin } from '@pages/paginaLogin';
import { Helpers } from '@utils/helpers';
dotenv.config();

type Fixtures = {
  sesionActiva: void;
};

export const test = base.extend<Fixtures>({
  sesionActiva: async ({ page }, use) => {
    const email = process.env.E2E_USER;
    const password = process.env.E2E_PASS;

    if (!email || !password) {
      throw new Error('Debes configurar E2E_USER y E2E_PASS para ejecutar este flujo.');
    }

    const paginaLogin = new PaginaLogin(page);
    const helpers = new Helpers(page);

    await paginaLogin.navegarALogin();
    await paginaLogin.iniciarSesion(email, password);
    await helpers.esperarPorRespuestaAPI('/api/students/login', 'POST', 200);

    await use();
  },
});

export const expect = test.expect;
