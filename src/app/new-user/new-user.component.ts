import { Component } from '@angular/core';
import { User } from '../models/user';
import { schools } from '../models/schools';
import { Permissions } from '../models/permissions';
import { CsvEditService } from '../csv-edit.service';

@Component({
  selector: 'app-new-user',
  template: `
  <div class="container">
  <h2>Add New User</h2>
  <form (ngSubmit)="onSubmit()" #userForm="ngForm">
    <div class="form-group">
      <label>Email:</label>
      <input type="email" name="email" [(ngModel)]="user.email" class="form-control" required>
    </div>
    <div class="form-group">
      <label>School:</label>
      <select name="school" [(ngModel)]="user.school" class="form-control" required>
        <option *ngFor="let school of schools" [value]="school">{{ school }}</option>
      </select>
    </div>
    <div class="form-group">
      <label>Permissions:</label>
      <select name="permissions" [(ngModel)]="selectedPermission" class="form-control" required>
        <option *ngFor="let permission of permissions" [value]="permission">{{ permission }}</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary" [disabled]="userForm.invalid">Add User</button>
  </form>
  <button routerLink="/">Back</button>
</div>

<!-- Success Modal -->
<div class="modal" tabindex="-1" role="dialog" [ngClass]="{'show': successMessageVisible}" [ngStyle]="{'display': successMessageVisible ? 'block' : 'none'}">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Success!</h5>
        <button type="button" class="close" aria-label="Close" (click)="closeModal()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        User added successfully!
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" (click)="closeModal()">Close</button>
      </div>
    </div>
  </div>
</div>
  `,
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  user: User = {
    email: '',
    school: '',
    devices: ['',''],
    token: '',
    permissions: []
  };
  selectedPermission: Permissions | undefined;

  permissions: string[] = Object.values(Permissions);
  schools: string[] = schools.map(x => x.name);
  successMessageVisible: boolean = false;

  constructor(private csvEditService: CsvEditService) { }


  onSubmit() {
    this.user.permissions = [this.selectedPermission!]
    this.user.token = schools.find((school) => school.name == this.user.school)?.tokenPrefix + this.selectedPermission!
    console.log(this.user.token);
    this.csvEditService.addUser(this.user).subscribe((result: string) => {
      console.log(result);
      this.resetForm();

      this.successMessageVisible = true;
    });
  }

  resetForm() {
    this.user = {
      email: '',
      school: '',
      devices: ['',''],
      token: '',
      permissions: []
    };
  }

  levelFromString(level: String): Permissions {
    return Object.values(Permissions)[0];
  }

  closeModal() {
    // Hide success modal
    this.successMessageVisible = false;
  }
}
