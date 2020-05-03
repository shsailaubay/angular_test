import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { PushNotificationsService } from './push-notifications.service';

@Component({
  selector: 'fury-push-notification-add-dialog-component',
  templateUrl: './push-notification-add-dialog.component.html',
})
export class PushNotificationAddDialogComponent implements OnInit {
  form: FormGroup;
  serverErrors = {};
  registerSuccess = false;

  constructor(
    private dialogRef: MatDialogRef<PushNotificationAddDialogComponent>,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private pushNotificationsService: PushNotificationsService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'theme': this.formBuilder.group({
        'ru': ['', Validators.required],
        'en': ['', Validators.required]
      }),
      'body': this.formBuilder.group({
        'ru': ['', Validators.required],
        'en': ['', Validators.required]
      }),
      'devices': ['', Validators.required]
    });
  }

  submit() {
    this.serverErrors = {};
    const formData = JSON.parse(JSON.stringify(this.form.value));

    this.pushNotificationsService.postData(formData).subscribe((response: any) => {
      this.registerSuccess = true;
      this.form.reset();
      this.snackBar.open('Создано');
      this.dialogRef.close('reload');
    }, (response: any) => {
      this.snackBar.open(response.message, response.name);
      Object.keys(response.error).forEach(prop => {
        this.serverErrors[prop] = response.error[prop][0];
      });
    });
  }

  close() {
    this.form.reset();
    this.dialogRef.close();
  }

}
