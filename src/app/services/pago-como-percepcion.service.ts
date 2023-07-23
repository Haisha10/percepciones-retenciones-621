import { Injectable } from '@angular/core';
import { PagoComoPercepcion } from '../models/pago-como-percepcion.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoComoPercepcionService {

  data: PagoComoPercepcion[] = [];

  constructor() {
    this.data = localStorage.getItem('pago-como-percepcion') ? JSON.parse(localStorage.getItem('pago-como-percepcion')!) : this.data;
  }

  getData(): PagoComoPercepcion[] {
    return this.data;
  }

  addData(data: PagoComoPercepcion): Observable<PagoComoPercepcion> {
    this.data.push(data);
    localStorage.setItem('pago-como-percepcion', JSON.stringify(this.data));
    return of(data);
  }

  updateData(data: PagoComoPercepcion, newData: PagoComoPercepcion): Observable<PagoComoPercepcion> {
    let index: number = this.data.findIndex((element: PagoComoPercepcion) => element.ruc === data.ruc && element.type === data.type && element.serial === data.serial && element.number === data.number);
    this.data[index] = newData;
    localStorage.setItem('pago-como-percepcion', JSON.stringify(this.data));
    return of(newData);
  }

  deleteData(data: PagoComoPercepcion): Observable<PagoComoPercepcion> {
    let index: number = this.data.findIndex((element: PagoComoPercepcion) => element.ruc === data.ruc && element.type === data.type && element.serial === data.serial && element.number === data.number);
    this.data.splice(index, 1);
    localStorage.setItem('pago-como-percepcion', JSON.stringify(this.data));
    return of(data);
  }

  deleteAllData(): Observable<PagoComoPercepcion[]> {
    this.data = [];
    localStorage.setItem('pago-como-percepcion', JSON.stringify(this.data));
    return of(this.data);
  }
}
