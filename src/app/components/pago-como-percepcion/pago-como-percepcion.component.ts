import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PagoComoPercepcion } from 'src/app/models/pago-como-percepcion.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { PagoComoPercepcionAddEditComponent } from './pago-como-percepcion-add-edit/pago-como-percepcion-add-edit.component';
import { PagoComoPercepcionService } from 'src/app/services/pago-como-percepcion.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pago-como-percepcion',
  templateUrl: './pago-como-percepcion.component.html',
  styleUrls: ['./pago-como-percepcion.component.scss'],
  providers: [DatePipe]
})
export class PagoComoPercepcionComponent implements OnInit {
  // Table data
  displayedColumns: string[] = [
    'id',
    'ruc',
    'type',
    'serial',
    'number',
    'issueDate',
    'amount',
    'actions'
  ];
  dataSource!: MatTableDataSource<any>;

  // Form data
  isEditable: boolean = true;
  ruc: string = '';
  period: string = '';

  // Data
  generalInformationForm: FormGroup;
  totalAmount: number = 0;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: SnackBarService,
    private _dialog: MatDialog,
    private _pagoComoPercepcionService: PagoComoPercepcionService,
    private _datePipe: DatePipe
  ) {
    this.generalInformationForm = this._formBuilder.group({
      pdt: ['0621'],
      ruc: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^(20|10|15)[0-9]{9}$')]],
      period: [this.getLastMonth(), [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^(2[0-9]{3}|19[0-9]{2})(0[0-9]|1[0-2])$')]],
    });
    this.generalInformationForm.get('pdt')?.disable();
  }

  ngOnInit(): void {
    this.getTableData();
    this.totalAmount = this.getTotalAmount();
  }

  getLastMonth(): string {
    let date: Date = new Date();
    date.setMonth(date.getMonth() - 1);

    let year: string = date.getFullYear().toString();
    let month: string = (date.getMonth() + 1).toString().padStart(2, '0');

    return year + month;
  }

  getTableData(): void {
    this.dataSource = new MatTableDataSource(this._pagoComoPercepcionService.getData());
  }

  getTotalAmount(): number {
    var total: number = 0;
    this.dataSource.data.forEach((row: any) => {
      total += parseFloat(row.amount);
    }
    );
    return total;
  }

  getMonthNameAndYear(): string {
    if (this.generalInformationForm.get('period')?.invalid) {
      return '';
    }
    let date: Date = new Date();
    date.setFullYear(parseInt(this.generalInformationForm.value.period.substring(0, 4)));
    date.setMonth(parseInt(this.generalInformationForm.value.period.substring(4, 6)) - 1);
    let month: string = date.toLocaleString('default', { month: 'long' });
    let year: string = date.getFullYear().toString();

    return month + ' ' + year;
  }

  saveGeneralInformation(): void {
    if (this.generalInformationForm.get('ruc')?.invalid) {
      this._snackBar.showMessage('RUC inválido. Por favor, verifique que el RUC ingresado sea correcto.');
      return;
    }
    if (this.generalInformationForm.get('period')?.invalid) {
      this._snackBar.showMessage('Periodo inválido. Por favor, verifique que el periodo ingresado sea correcto.');
      return;
    }

    if (this.generalInformationForm.valid) {
      this.ruc = this.generalInformationForm.get('ruc')?.value;
      this.period = this.generalInformationForm.get('period')?.value;
    }

    this.generalInformationForm.get('ruc')?.disable();
    this.generalInformationForm.get('period')?.disable();
    this.isEditable = false;
  }

  editGeneralInformation(): void {
    this.generalInformationForm.get('ruc')?.enable();
    this.generalInformationForm.get('period')?.enable();
    this.isEditable = true;
  }

  openAddDialog(): void {
    const dialogRef = this._dialog.open(PagoComoPercepcionAddEditComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTableData();
        this.totalAmount = this.getTotalAmount();
      }
    }
    );
  }

  openEditDialog(row: PagoComoPercepcion): void {
    const dialogRef = this._dialog.open(PagoComoPercepcionAddEditComponent, {
      width: '600px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTableData();
        this.totalAmount = this.getTotalAmount();
      }
    }
    );
  }

  async delete(element: PagoComoPercepcion): Promise<void> {
    if (await this._snackBar.showDeleteConfirmation()) {
      this._pagoComoPercepcionService
        .deleteData(element)
        .subscribe({
          next: () => {
            this.getTableData();
            this.totalAmount = this.getTotalAmount();
          },
          error: (error) => {
            this._snackBar.showMessage(error.message);
          }
        });
    } else {
      this._snackBar.showMessage('Operación cancelada.');
    }
  }

  formatDate(date: Date): string {
    return this._datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  deleteAll(): void {
    this._pagoComoPercepcionService
      .deleteAllData()
      .subscribe({
        next: () => {
          this.getTableData();
          this.totalAmount = this.getTotalAmount();
        },
        error: (error) => {
          this._snackBar.showMessage(error.message);
        }
      });
  }
}
