import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PagoComoPercepcion } from 'src/app/models/pago-como-percepcion.model';
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
    private _snackBar: SnackBarService
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

  onFormSubmit() {
    /*
    if (this.pagoComoPercepcionForm.valid) {
      if (this.data) {
        this.data.ruc = this.employmentForm.value.ruc;
        this.data.name = this.employmentForm.value.name;
        this.data.address = this.employmentForm.value.address;
        this.data.description = this.employmentForm.value.description;
        this.data.requirements = this.employmentForm.value.requirements;
        this.data.creationDate = this.employmentForm.value.creationDate;
        this.data.salary = this.employmentForm.value.salary;
        this.data.phone = this.employmentForm.value.phone;
        this.data.email = this.employmentForm.value.email;
        this._employmentsService
          .updateEmployment(this.data.id, this.data, this.currentUser.id)
          .subscribe({
            next: (val: any) => {
              this._dialogRef.close(true);
              this._snackBar.openSnackBar(`Oferta actualizada`);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.employmentForm.value.isAvailable = true;
        this._employmentsService.addEmployment(this.employmentForm.value, this.currentUser.id).subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
            this._snackBar.openSnackBar(`Oferta añadida`);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    } else {
      this._snackBar.openSnackBar(`Campos inválidos, por favor verifique los datos ingresados.`);
    }*/
  }
}
