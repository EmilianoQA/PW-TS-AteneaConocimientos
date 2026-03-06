export class DataFactory {
  generarEmail(): string {
    return `user${Date.now()}@example.com`;
  }

  generarNombre(): string {
    const nombres = ['Estudiante', 'Carlos', 'Maria', 'Juan', 'Ana'];
    return nombres[Math.floor(Math.random() * nombres.length)];
  }

  generarApellido(): string {
    const apellidos = ['Ejemplo', 'Garcia', 'Lopez', 'Martinez', 'Perez'];
    return apellidos[Math.floor(Math.random() * apellidos.length)];
  }
}
