import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CsvTableComponent } from './csv-table/csv-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewUserComponent } from './new-user/new-user.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    CsvTableComponent,
    NewUserComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      {path: '', component: CsvTableComponent},
      {path: 'add-user', component: NewUserComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
