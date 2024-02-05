import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvEditService {
  private csvUrl = 'http://3.219.200.215:3000/csv';

  constructor(private http: HttpClient) {}

  getCsvData(): Observable<string> {
    return this.http.get(this.csvUrl, { responseType: 'text' });
  }
  
  editCsvData(data: string[][]): Observable<string> {
    return this.http.put(this.csvUrl, data).pipe(map(() => 'Data saved successfully.'));
  }

  editCsvCell(row: number, col: number, value: string): Observable<string> {
    const endpoint = `${this.csvUrl}/edit-cell/${row}/${col}`;
    return this.http.put(endpoint, value).pipe(map(() => 'Cell updated successfully.'));
  }

  addCsvLine(newLine: string[]): Observable<string> {
    const endpoint = `${this.csvUrl}/add-line`;
    return this.http.post(endpoint, newLine).pipe(map(() => 'Line added successfully.'));
  }
}
