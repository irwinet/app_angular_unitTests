import { MedicoComponent } from "./medico.component";

import { TestBed, ComponentFixture } from '@angular/core/testing';


describe('Medico Component', () => {
    let component: MedicoComponent;
    let fixture: ComponentFixture<MedicoComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MedicoComponent]
        });

        fixture = TestBed.createComponent(MedicoComponent);
        component = fixture.componentInstance;
    });

    it('Debe de crearse el componente', () => {
        expect(component).toBeTruthy();
    });

    it('Debe de retornar el nombre del medico', () => {
        const nombre = 'Irwin';
        const res = component.saludarMedico(nombre);

        expect(res).toContain(nombre);
    });

});