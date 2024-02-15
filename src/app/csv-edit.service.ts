import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from './models/user';
import { Permissions } from './models/permissions';

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

  addUser(user: User): Observable<string> {
    console.log('New User:', user);
    const S2Flag = user.permissions.includes(Permissions.S2) ? '1' : '';
    const B1Flag = user.permissions.includes(Permissions.B1) ? '1' : '';
    return this.addCsvLine([user.email, user.token, '', '', user.school, '', S2Flag, B1Flag, '','','','','','','','',]);
  }
}
