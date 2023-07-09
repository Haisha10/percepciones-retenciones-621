import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pago-como-percepcion',
  templateUrl: './pago-como-percepcion.component.html',
  styleUrls: ['./pago-como-percepcion.component.scss']
})
export class PagoComoPercepcionComponent implements OnInit {
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
  ngOnInit(): void {
    this.getTableData();
  }
  getLastMonth(): string {
    let date: Date = new Date();
    date.setMonth(date.getMonth() - 1);

    let year: string = date.getFullYear().toString();
    let month: string = (date.getMonth() + 1).toString().padStart(2, '0');

    return year + month;
  }

  getTableData(): void {
    this.dataSource = new MatTableDataSource(this.data);
  }

  data = [
    {
      id: 1,
      ruc: '20100923611',
      type: '01',
      serial: 'F001',
      number: '00000001',
      issueDate: '28/07/2023',
      amount: 100.00
    },
  ]
}
