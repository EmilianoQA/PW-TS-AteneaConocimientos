# Atenea Conocimientos - Test Automation Suite

> 📌 **Proyecto Personal de Portafolio** - Suite de automatización en desarrollo como parte de mi portafolio profesional para demostrar expertise Playwright TS, arquitectura de test y buenas prácticas de ingenieria de QA.

## 📋 Descripción General

Suite de pruebas automatizadas E2E para la plataforma educativa **Atenea Conocimientos**, desarrollada con **Playwright** y **TypeScript**. Este proyecto implementa las mejores prácticas de QA automation incluyendo Page Object Model (POM), CI/CD integration y quality gates automatizados.

**Stack Tecnológico:**

- 🎭 **Playwright** v1.57 - Framework de automatización E2E
- 🔷 **TypeScript** 5.9 - Type-safe test code
- 🧹 **ESLint + Prettier** - Code quality & formatting
- 🐕 **Husky** - Git hooks para garantizar calidad
- 📊 **HTML Reporter** - Reportes visuales de ejecución

---

## 🏗️ Arquitectura del Proyecto

```
AteneaConocimientos-PW-TS/
├── pages/                    # Page Object Models
│   ├── paginaHome.ts        # Login/Home page
│   ├── paginaLogin.ts       # Authentication page
│   ├── paginaDashboard.ts   # Dashboard page
│   └── paginaRegistro.ts    # Registration page
├── tests/                    # Test specifications
│   ├── login.spec.ts        # Login test scenarios
│   └── registro.spec.ts     # Registration test scenarios
├── utils/                    # Helpers & utilities
│   └── helpers.ts           # Common test utilities
├── playwright.config.ts      # Playwright configuration
├── tsconfig.json            # TypeScript configuration
├── eslint.config.cjs        # ESLint rules
├── .husky/                  # Git hooks
│   ├── pre-commit          # Lint & format checks
│   └── pre-push            # Type checking & tests
└── .env                     # Environment variables
```

---

## ✨ Características & Buenas Prácticas

### 1. **Page Object Model (POM)** - Escalabilidad & Mantenimiento

Separación clara entre lógica de tests y localizadores de elementos. **Impacto**: Reduce acoplamiento, facilita refactorización y permite agregar nuevas páginas/funcionalidades sin modificar tests existentes. Crítico para proyectos que crecen.

### 2. **Testing Integral: UI + API** - Cobertura Completa End-to-End

Combinación de pruebas de interfaz de usuario con validaciones de respuestas API. **Impacto**: Detecta fallos en múltiples capas (frontend y backend), no solo en UI. Esencial para garantizar calidad integral del sistema.

### 3. **TypeScript Strict Mode** - Prevención de Bugs

Type-safe code que previene errores en tiempo de compilación. **Impacto**: Elimina categorías enteras de bugs antes de que lleguen a runtime, mejora documentación del código, acelera onboarding de nuevos desarrolladores.

### 4. **Path Aliases** - Legibilidad & Escalabilidad

Importes limpios mediante aliases en `tsconfig.json` (`@pages`, `@utils`). **Impacto**: Evita rutas relativas complejas, facilita reorganización de carpetas, mejora legibilidad del código en proyectos de mediano/gran tamaño.

### 5. **Quality Gates Automatizados (Husky)** - Zero Broken Code

Pre-commit y pre-push hooks que validan código antes de llegue al repositorio.

- **Pre-commit**: ESLint, Prettier, Type checking
- **Pre-push**: Full test suite + HTML reports

**Impacto**: Garantiza que código roto nunca llega a remoto, reduce bugs en CI/CD, mejora confiabilidad del proyecto.

### 6. **Ejecución Paralela** - Performance & Speed

Tests ejecutados con múltiples workers. **Impacto**: Reduce significativamente tiempo de ejecución, crítico cuando la suite crece, permite feedback rápido en desarrollo.

### 7. **HTML Reporting & Tracing** - Debugging & Transparencia

Reportes visuales con videos, screenshots y logs automáticos en fallos. **Impacto**: Reduce tiempo de debugging, facilita identificación de problemas, proporciona evidencia clara de qué falló y por qué.

---

## 📈 Escalabilidad del Proyecto

Este proyecto está arquitectado para **crecer sin fricción**:

✅ **Estructura modular**: Agregar nuevas páginas/tests es trivial (copiar template + adaptar)
✅ **Type safety**: TypeScript strict garantiza que cambios no rompan código existente
✅ **Helpers reutilizables**: Utilidades centralizadas para operaciones comunes (API calls, assertions, etc)
✅ **Path aliases**: Reorganizar carpetas no requiere actualizar imports en 50 archivos
✅ **CI/CD ready**: Hooks y configuración lista para integración automática
✅ **Mantenibilidad**: POM + TypeScript + Quality gates aseguran código limpio y testeable

---

## 🚀 Instalación & Setup

### Requisitos Previos

- Node.js 18+
- npm 9+

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd AteneaConocimientos-PW-TS

# 2. Instalar dependencias
npm install

# 3. Descargar navegadores Playwright
npx playwright install

# 4. Configurar variables de entorno
cp .env.example .env
# Editar .env con las credenciales reales
```

### Configuración de Ambiente

```env
# .env
BASE_URL=https://qa.ateneaconocimientos.com/
```

---

## 📝 Ejecutar Tests

### Comando Básico

```bash
# Ejecutar todos los tests (headless mode)
npm run test

# Ejecutar con interfaz gráfica (útil para debugging)
npm run test:headed

# Ejecutar en modo CI/CD
npm run test:ci
```

### Ver Reportes

```bash
# Abrir último reporte HTML
npm run report:open
```

### Comandos Adicionales

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Arreglar problemas de linting automáticamente
npm run lint:fix

# Formatear código
npm run format
```

---

## 🧪 Test Coverage

### Casos de Uso Cubiertos

#### 1️⃣ **Login de Estudiante**

- ✅ Login con credenciales válidas
- ✅ Navegación exitosa a dashboard
- ✅ Validación de elementos UI

**Ubicación:** `tests/login.spec.ts`

#### 2️⃣ **Registro de Estudiante**

- ✅ Flujo completo de registro
- ✅ Validación de respuestas API
- ✅ Modal de verificación de email

**Ubicación:** `tests/registro.spec.ts`

### Próximas Mejoras Planeadas

- [ ] Test de error flows (credenciales inválidas)
- [ ] Validación de campos requeridos
- [ ] Screenshot comparativos
- [ ] Performance testing
- [ ] Accesibilidad (WCAG)

---

## 🔍 Anatomía de un Test

```typescript
import { test } from '@playwright/test';
import { PaginaHome } from '@pages/paginaHome';
import { PaginaLogin } from '@pages/paginaLogin';

test('Login exitoso con credenciales válidas', async ({ page }) => {
  // 1. Instanciar Page Objects
  const paginaHome = new PaginaHome(page);
  const paginaLogin = new PaginaLogin(page);

  // 2. Navegar
  await paginaHome.navegarAingresar();

  // 3. Interactuar
  await paginaLogin.ingresarEmail('usuario@example.com');
  await paginaLogin.ingresarPassword('password123');
  await paginaLogin.hacerClickEnIngresar();

  // 4. Verificar resultados
  await expect(page).toHaveURL(/dashboard/);
});
```

---

## 🛡️ Garantía de Calidad

### Pre-commit Checks

Cada commit ejecuta automáticamente:

```bash
npm run lint           # ESLint - Detecta problemas de código
npm run format:check   # Prettier - Valida formato
```

### Pre-push Checks

Antes de push a remoto:

```bash
npm run typecheck      # TypeScript - Type safety
npm run test           # Playwright - E2E tests
```

Esto asegura que **código roto nunca llega a remoto** 🚫

---

## 📊 Configuración Avanzada

### playwright.config.ts

**Características destacadas:**

- Resolución de path aliases (TypeScript)
- Ejecución paralela `fullyParallel: true`
- Reporter HTML
- Retries automáticos en CI
- Traces en fallos

```typescript
import 'tsconfig-paths/register'; // ← Resuelve @pages, @utils

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    trace: 'on-first-retry', // Videos solo en fallos
  },
});
```

---

## 🐛 Debugging

### Modo Headed (Con navegador visible)

```bash
npm run test:headed
```

### Debug interactivo

```bash
npx playwright test --debug
```

### Ver videos de fallos

Los videos se guardan automáticamente en:

```
test-results/
playwright-report/
```

---

## 🔗 Integración CI/CD

Este proyecto está diseñado para integrarse con:

- ✅ GitHub Actions
- ✅ GitLab CI
- ✅ Azure Pipelines
- ✅ Jenkins

**Pre-push hook ejecutará tests:**

```bash
.husky/pre-push → npm run typecheck && npm run test
```

---

## 📚 Recursos & Referencias

- [Playwright Docs](https://playwright.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Page Object Model Best Practices](https://playwright.dev/docs/pom)
- [ESLint Configuration](https://eslint.org/)

---

## 📝 Notas de Desarrollo

### Estructura de Packages

```json
{
  "@playwright/test": "1.57.0", // E2E Framework
  "typescript": "5.9.3", // Type safety
  "eslint": "10.0.2", // Code linting
  "prettier": "3.8.1", // Code formatting
  "tsconfig-paths": "4.2.0", // Path aliases
  "husky": "9.1.7" // Git hooks
}
```

### Scripts Quick Reference

| Comando               | Descripción                      |
| --------------------- | -------------------------------- |
| `npm run test`        | Ejecutar tests (headless)        |
| `npm run test:headed` | Ejecutar con navegador visible   |
| `npm run test:ci`     | Ejecutar en CI (reporter lineal) |
| `npm run report:open` | Abrir reporte HTML               |
| `npm run lint`        | Validar código                   |
| `npm run typecheck`   | Validar tipos                    |
| `npm run format`      | Formatear código                 |

---

## 👨‍💻 Creado por

**Emiliano Maure** - QA Automation Engineer

---

## 📄 Licencia

ISC

---

## ✅ Quality Metrics

| Métrica            | Estado                 |
| ------------------ | ---------------------- |
| Code Coverage      | 2 test suites          |
| Type Safety        | ✅ Strict mode         |
| Code Linting       | ✅ ESLint enforced     |
| Pre-commit Quality | ✅ Husky hooks activos |
| Parallel Execution | ✅ Configurado         |
| Test Reporting     | ✅ HTML reports        |
