import { TestBed } from '@angular/core/testing';

import { PagoComoPercepcionService } from './pago-como-percepcion.service';

describe('PagoComoPercepcionService', () => {
  let service: PagoComoPercepcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagoComoPercepcionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
