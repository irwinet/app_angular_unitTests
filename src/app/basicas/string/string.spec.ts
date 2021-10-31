
// Agrupa Pruebas
// describe('Pruebas de Strings');

import { mensaje } from "./string";

// Una sola prueba
// it('Debe de regresar un string');
// it('Debe de contener un nombre');

describe('Pruebas de Strings', () => {
    it('Debe de regresar un string', () => {
        const resp = mensaje('Irwin');

        expect(typeof resp).toBe('string');
    });

    it('Debe de retornar un saludo con el nombre enviado', () => {
        const nombre = 'Irwin';
        
        const resp = mensaje(nombre);

        expect(resp).toContain(nombre);
    });
});