import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GamingModesService } from './gaming-modes.service';

@Component({
  selector: 'fury-gaming-mode-dialog-component',
  templateUrl: './gaming-mode-dialog.component.html',
})
export class GamingModeDialogComponent implements OnInit {
  form: FormGroup;
  serverErrors = {};
  registerSuccess = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<GamingModeDialogComponent>,
    private gamingModesService: GamingModesService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'name': this.formBuilder.group({
        'ru': [this.data ? this.data.name_ru : '', Validators.required],
        'en': [this.data ? this.data.name_en : '', Validators.required]
      }),
      'description': this.formBuilder.group({
        'ru': [this.data ? this.data.description_ru : '', Validators.required],
        'en': [this.data ? this.data.description_en : '', Validators.required]
      }),
      'slug': [this.data ? this.data.slug : '']
    });
  }

  close() {
    this.form.reset();
    this.dialogRef.close();
  }

  submit() {
    this.serverErrors = {};
    const formData = JSON.parse(JSON.stringify(this.form.value));

    if (this.data) {
      this.gamingModesService.editData(this.data._id, formData).subscribe((response: any) => {
        this.registerSuccess = true;
      }, (response: any) => {
        Object.keys(response.error).forEach(prop => {
          this.serverErrors[prop] = response.error[prop][0];
        });
      });
    } else {
      this.gamingModesService.postData(formData).subscribe((response: any) => {
        this.registerSuccess = true;
      }, (response: any) => {
        Object.keys(response.error).forEach(prop => {
          this.serverErrors[prop] = response.error[prop][0];
        });
      });
    }

    this.form.reset();
    this.dialogRef.close();
  }
}
