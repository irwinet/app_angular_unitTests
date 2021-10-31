import { usuarioIngresado } from "./booleanos";

describe('Pruebas booleano', () => {
    it('Debe de retornar true', () => {

        const resp = usuarioIngresado();
        
        // expect(resp).toBe(true);
        expect(resp).toBeTruthy();
        //expect(resp).toBeFalsy();
        // expect(resp).not.toBeTruthy();

    });
});