import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

import { MedicosComponent } from './medicos.component';
import { MedicosService } from './medicos.service';

describe('MedicosComponent', () => {

    let componente: MedicosComponent;
    let servicio: MedicosService;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('HttpClient', { post: of({}), get: of({}) })
        servicio = new MedicosService(spy);

        componente = new MedicosComponent(servicio);
    });

    it('Init: Debe de cargar los medicos', () => {

        const medicos = ['medico1', 'medico2', 'medico3'];

        spyOn(servicio, 'getMedicos').and.callFake(() => {
            return Observable.from([
                medicos
            ]);
        });

        componente.ngOnInit();

        expect(componente.medicos.length).toBeGreaterThan(0);

    });

    it('Debe de llamar al servidor para agregar un medico', () => {

        const espia = spyOn(servicio, 'agregarMedico').and.callFake((medico) => {
            return Observable.empty();
        });

        componente.agregarMedico();

        expect(espia).toHaveBeenCalled();
    });

    it('Debe de agregar un nuevo medico al arreglo de medicos', () => {
        const medico = { id: 1, nombre: 'Irwin' };

        spyOn(servicio, 'agregarMedico').and.returnValue(
            Observable.from([medico])
        );

        componente.agregarMedico();

        expect(componente.medicos.indexOf(medico)).toBeGreaterThanOrEqual(0);
    });

    it('Si falla la adicion, la propiedad mensajeError, debe ser igual al error del servidor', () => {
        const miError = 'No se pudo agregar el medico';

        spyOn(servicio, 'agregarMedico').and
            .returnValue(Observable.throw(miError));

        componente.agregarMedico();

        expect(componente.mensajeError).toBe(miError);
    });

    it('Debe de llamar al servidor para borrar un medico', () => {
        
        spyOn(window, 'confirm').and.returnValue(true);
        
        const espia = spyOn(servicio, 'borrarMedico').and
                        .returnValue(Observable.empty());

        componente.borrarMedico('1');

        expect(espia).toHaveBeenCalledWith('1');
    });

    it('No Debe de llamar al servidor para borrar un medico', () => {
        
        spyOn(window, 'confirm').and.returnValue(false);
        
        const espia = spyOn(servicio, 'borrarMedico').and
                        .returnValue(Observable.empty());

        componente.borrarMedico('1');

        expect(espia).not.toHaveBeenCalledWith('1');
    });

});
