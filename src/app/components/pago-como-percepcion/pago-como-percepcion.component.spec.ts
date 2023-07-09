import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoComoPercepcionComponent } from './pago-como-percepcion.component';

describe('PagoComoPercepcionComponent', () => {
  let component: PagoComoPercepcionComponent;
  let fixture: ComponentFixture<PagoComoPercepcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoComoPercepcionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoComoPercepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
