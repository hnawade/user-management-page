import { Component, OnInit } from '@angular/core';
import { CsvEditService } from '../csv-edit.service';
import { User } from '../user';
import { Permissions } from '../permissions';

@Component({
  selector: 'app-csv-table',
  templateUrl: './csv-table.component.html',
  styleUrls: ['./csv-table.component.css']
})
export class CsvTableComponent implements OnInit {
  csvData: string = '';
  rows: string[] = [];
  header: string[] = [];
  itemsPerPage: number = 20;
  currentPage: number = 1;
  totalItems: number = 0;
  visibleRows: User[] = [];
  editingCell: [number, number] | null = null;
  focusedCell: [number, number] | null = null;

  constructor(private csvEditService: CsvEditService) { }

  ngOnInit(): void {
    this.csvEditService.getCsvData().subscribe((data: string) => {
      this.csvData = data;
      this.rows = this.csvData.split('\r\n');
      this.header = this.rows[0].split(',');
      this.rows = this.rows.slice(1);
      this.totalItems = this.rows.length;
      this.updateVisibleRows();
    });
  }
  
  saveCsvData() {
    this.csvEditService.editCsvData([this.header, ...this.rows.map((row) => row.split(','))]).subscribe((editedData: string) => {
      // Here, you can send the editedData to a server or save it locally.
      // For this example, we'll update the local data.
      this.csvData = editedData;
      this.rows = editedData.split('\n');
    });
  }
  
  lineToUser(line: string): User {
    const row: string[] = line.split(',');
    const email = row[0];
    const devices: [string, string] = [row[2], row[3]];
    const token = row[1];
    const school = row[4];
    const permissionsSet: string[] = Object.values(Permissions);
    const permissions: Permissions[] = this.header.filter((headerName, idx) => permissionsSet.includes(headerName) && row[idx] === "1").map((x) => x as Permissions);
    return {
      email,
      token,
      devices,
      school,
      permissions
    };
  }

  onFocus(row: number, col: number) {
    this.focusedCell = [row, col];
  }

  onBlur() {
    this.focusedCell = null;
  }

  onEditButton(row: number, col: number) {
    this.editingCell = [row, col];
  }

  editCell(row: number, col: number, newValue: string) {
    this.csvEditService.editCsvCell(row, col, newValue).subscribe((result: string) => {
      console.log(result);
    });
  }

  addLine() {
    const newLine = Array(this.header.length).fill(''); // Create an empty line with the same number of columns
    this.csvEditService.addCsvLine(newLine).subscribe((result: string) => {
      console.log(result);
      // Refresh the table after adding a new line
      this.csvEditService.getCsvData().subscribe((data: string) => {
        this.csvData = data;
        this.rows = this.csvData.split('\n');
      });
    });
  }

  updateVisibleRows() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.visibleRows = this.rows.slice(startIndex, endIndex).map(this.lineToUser.bind(this));
  }
  goToFirstPage() {
    this.currentPage = 1;
    this.updateVisibleRows();
  }

  goToLastPage() {
    this.currentPage = this.getTotalPages();
    this.updateVisibleRows();
  }

  changePage(direction: number) {
    this.currentPage += direction;
    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.getTotalPages()) {
      this.currentPage = this.getTotalPages();
    }
    this.updateVisibleRows();
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  logInfo(info: any): void {
    console.log(info);
  }
  //
  //  updateCellValue(row: string[], colIndex: number, event: Event) {
  //    console.log(event);
  //    row[colIndex] = (event.target as HTMLInputElement).value;
  //    event.preventDefault();
  //  }
}
