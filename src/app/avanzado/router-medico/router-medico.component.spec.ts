import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/observable/empty';

import { RouterMedicoComponent } from './router-medico.component';

class FakeRouter {
  navigate(params:any) {

  }
}

class FakeActivatedRoute{
  // params: Observable<any> = Observable.empty();

  private subject = new Subject();

  push(valor:any){
    this.subject.next(valor);
  }

  get params(){
    return this.subject.asObservable();
  }
}

describe('RouterMedicoComponent', () => {
  let component: RouterMedicoComponent;
  let fixture: ComponentFixture<RouterMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RouterMedicoComponent],
      providers: [
        { provide: Router, useClass: FakeRouter },
        { provide: ActivatedRoute, useClass: FakeActivatedRoute }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de redireccionar a Medico cuando se guarde', ()=>{
    const router = TestBed.get(Router);

    const spy=spyOn(router, 'navigate');

    component.guardarMedico();

    expect(spy).toHaveBeenCalledWith(['medico', '123']);
  });

  it('Debe de colocar el id = nuevo', ()=>{
    component = fixture.componentInstance;

    const activatedRoute: FakeActivatedRoute = TestBed.get(ActivatedRoute);

    activatedRoute.push({id: 'nuevo'});

    expect(component.id).toBe('nuevo');;
  });

});
