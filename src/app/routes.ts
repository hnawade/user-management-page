import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NewUserComponent } from './new-user/new-user.component';
import { CsvTableComponent } from './csv-table/csv-table.component';

const routeConfig: Routes = [
    {
      path: '',
      component: CsvTableComponent,
      title: 'Home page'
    },
    {
      path: 'details/:id',
      component: NewUserComponent,
      title: 'New Users'
    }
  ];
  
  export default routeConfig;