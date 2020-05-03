import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { UsersService } from './users.service';

@Component({
  selector: 'fury-user-add-dialog-component',
  templateUrl: './user-add-dialog.component.html',
})
export class UserAddDialogComponent implements OnInit {
  form: FormGroup;
  serverErrors = {};
  registerSuccess = false;

  constructor(
    private dialogRef: MatDialogRef<UserAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'name': [this.data ? this.data.name : '', Validators.required],
      'role': [this.data ? this.data.role : '', Validators.required],
      'email': [this.data ? this.data.email : '', [Validators.required, Validators.email]],
      'phone': [this.data ? this.data.phone : ''],
    });
  }

  submit() {
    this.serverErrors = {};
    const formData = JSON.parse(JSON.stringify(this.form.value));

    if (this.data) {
      this.usersService.editData(this.data.id, formData).subscribe(
        (response: any) => {
          this.registerSuccess = true;
          this.form.reset();
          this.snackBar.open('Изменено');
          this.dialogRef.close('reload');
        },
        (response: any) => {
          this.snackBar.open(response.message, response.name);
          Object.keys(response.error).forEach(prop => {
            this.serverErrors[prop] = response.error[prop][0];
          });
        }
      );
    } else {
      this.usersService.postData(formData).subscribe(
        (response: any) => {
          this.registerSuccess = true;
          this.form.reset();
          this.snackBar.open('Создано');
          this.dialogRef.close('reload');
        },
        (response: any) => {
          this.snackBar.open(response.message, response.name);
          Object.keys(response.error).forEach(prop => {
            this.serverErrors[prop] = response.error[prop][0];
          });
        }
      );
    }
  }

  close() {
    this.form.reset();
    this.dialogRef.close();
  }
}
