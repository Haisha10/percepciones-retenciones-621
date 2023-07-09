import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { PagoComoPercepcionComponent } from './components/pago-como-percepcion/pago-como-percepcion.component';

const routes: Routes = [
  { path: '', redirectTo: 'comprobantes-de-pago-utilizados-como-percepcion', pathMatch: 'full' },
  { path: 'comprobantes-de-pago-utilizados-como-percepcion', component: PagoComoPercepcionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
