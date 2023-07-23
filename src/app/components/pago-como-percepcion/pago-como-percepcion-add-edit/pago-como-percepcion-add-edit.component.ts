import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PagoComoPercepcion } from 'src/app/models/pago-como-percepcion.model';
import { PagoComoPercepcionService } from 'src/app/services/pago-como-percepcion.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-pago-como-percepcion-add-edit',
  templateUrl: './pago-como-percepcion-add-edit.component.html',
  styleUrls: ['./pago-como-percepcion-add-edit.component.scss']
})
export class PagoComoPercepcionAddEditComponent {
  pagoComoPercepcionForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<PagoComoPercepcionAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PagoComoPercepcion,
    private _snackBar: SnackBarService,
    private _pagoComoPercepcionService: PagoComoPercepcionService
  ) {
    this.pagoComoPercepcionForm = this._fb.group({
      ruc: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^(20|10|15)[0-9]{9}$')]],
      type: ['', [Validators.required]],
      serial: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^[A-Z0-9]+$')]],
      number: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(8), Validators.pattern('^[0-9]+$')]],
      issueDate: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')]]
    });
  }

  currentUser: any;
  ngOnInit(): void {
    this.pagoComoPercepcionForm.patchValue(this.data);
  }

  onFormSubmit(): void {
    // Validate form
    if (this.pagoComoPercepcionForm.get('ruc')?.invalid) {
      this._snackBar.showMessage(`El RUC ingresado no es válido. Por favor, verifique que se haya ingresado correctamente.`);
      return;
    }
    if (this.pagoComoPercepcionForm.get('type')?.invalid) {
      this._snackBar.showMessage(`Por favor, seleccione un tipo de comprobante válido.`);
      return;
    }
    if (this.pagoComoPercepcionForm.get('serial')?.invalid) {
      this._snackBar.showMessage(`El número de serie ingresado no es válido. Por favor, verifique que se haya ingresado correctamente.`);
      return;
    }
    if (this.pagoComoPercepcionForm.get('number')?.invalid) {
      this._snackBar.showMessage(`El número de comprobante ingresado no es válido. Por favor, verifique que se haya ingresado correctamente.`);
      return;
    }
    if (this.pagoComoPercepcionForm.get('issueDate')?.invalid) {
      this._snackBar.showMessage(`La fecha de emisión ingresada no es válida. Por favor, verifique que se haya ingresado correctamente.`);
      return;
    }
    if (this.pagoComoPercepcionForm.get('amount')?.invalid) {
      this._snackBar.showMessage(`El monto ingresado no es válido. Por favor, verifique que se haya ingresado correctamente.`);
      return;
    }

    const newData: PagoComoPercepcion = {
      ruc: this.pagoComoPercepcionForm.value.ruc.toString(),
      type: this.pagoComoPercepcionForm.value.type.toString(),
      serial: this.pagoComoPercepcionForm.value.serial.toString(),
      number: this.pagoComoPercepcionForm.value.number.toString().padStart(8, '0'),
      issueDate: this.pagoComoPercepcionForm.value.issueDate,
      amount: parseFloat(this.pagoComoPercepcionForm.value.amount).toFixed(2)
    };

    if (this.data) {
      this._pagoComoPercepcionService
        .updateData(this.data, newData)
        .subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
            this._snackBar.showMessage(`Registro actualizado.`);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
    } else {
      this._pagoComoPercepcionService
        .addData(newData)
        .subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
            this._snackBar.showMessage(`Registro añadido.`);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
    }
  }
}
