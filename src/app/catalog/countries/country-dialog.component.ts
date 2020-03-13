import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CountriesService } from './countries.service';

@Component({
  selector: 'fury-country-dialog-component',
  templateUrl: './country-dialog.component.html',
})
export class CountryDialogComponent implements OnInit {
  form: FormGroup;
  serverErrors = {};
  registerSuccess = false;
  flag: File;

  constructor(
    private dialogRef: MatDialogRef<CountryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private countriesService: CountriesService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'name': this.formBuilder.group({
        'ru': [this.data ? this.data.name_ru : '', Validators.required],
        'en': [this.data ? this.data.name_en : '', Validators.required]
      }),
      'flag': [this.data ? this.data.flag : ''],
      'code': [this.data ? this.data.code : '']
    });
  }

  onFileChanged(event) {
    this.flag = event.target.files[0];
  }

  close() {
    this.form.reset();
    this.dialogRef.close();
  }

  submit() {
    this.serverErrors = {};
    const formData = JSON.parse(JSON.stringify(this.form.value));

    if (this.data) {
      this.countriesService.editCountry(this.data._id, formData).subscribe((response: any) => {
        this.registerSuccess = true;
        if (this.flag) {
          this.countriesService.postFlag(response._id, this.flag).subscribe(res => {
          });
        }
      }, (response: any) => {
        Object.keys(response.error).forEach(prop => {
          this.serverErrors[prop] = response.error[prop][0];
        });
      });
    } else {
      this.countriesService.postCountry(formData).subscribe((response: any) => {
        this.registerSuccess = true;
        if (this.flag) {
          this.countriesService.postFlag(response._id, this.flag).subscribe(res => {
          });
        }
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
