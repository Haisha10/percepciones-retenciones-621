import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoComoPercepcionAddEditComponent } from './pago-como-percepcion-add-edit.component';

describe('PagoComoPercepcionAddEditComponent', () => {
  let component: PagoComoPercepcionAddEditComponent;
  let fixture: ComponentFixture<PagoComoPercepcionAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoComoPercepcionAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoComoPercepcionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
