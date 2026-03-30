const E2E_USER = process.env.E2E_USER ?? '';
const E2E_PASS = process.env.E2E_PASS ?? '';

export const loginData = {
  usuarioValido: {
    email: E2E_USER,
    password: E2E_PASS,
  },
  emailNoRegistrado: {
    email: 'noexiste@email.com',
    password: 'password123',
  },
  passwordIncorrecta: {
    email: E2E_USER,
    password: 'passwordIncorrecta123',
  },
};
