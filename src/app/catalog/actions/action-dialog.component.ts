import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ActionsService } from './actions.service';
import { CountriesService } from '../countries/countries.service';

@Component({
  selector: 'fury-action-dialog-component',
  templateUrl: './action-dialog.component.html',
})
export class ActionDialogComponent implements OnInit {
  countries;
  form: FormGroup;
  serverErrors = {};
  registerSuccess = false;
  image: File;

  constructor(
    private dialogRef: MatDialogRef<ActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private actionsService: ActionsService,
    private countriesService: CountriesService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {

    this.countriesService.getCountries().subscribe((page: any) => {
      console.log(page);
      this.countries = page;
    });

    this.form = this.formBuilder.group({
      'startDate': [this.data ? this.data.startDate : '', Validators.required],
      'endDate': [this.data ? this.data.endDate : '', Validators.required],
      'freeGold': [this.data ? this.data.freeGold : ''],
      'active': [this.data ? this.data.active : ''],
      'repeatEveryDay': [this.data ? this.data.repeatEveryDay : ''],
      'title': this.formBuilder.group({
        'ru': [this.data ? this.data.name_ru : '', Validators.required],
        'en': [this.data ? this.data.name_en : '', Validators.required]
      }),
      'actionPrice': [this.data ? this.data.actionPrice : ''],
      'freeSilvers': [this.data ? this.data.freeSilvers : ''],
      'country': [this.data ? this.data.country : ''],
      'successMessage': this.formBuilder.group({
        'ru': [this.data ? this.data.name_ru : '', Validators.required],
        'en': [this.data ? this.data.name_en : '', Validators.required]
      })
    });
  }

  onFileChanged(event) {
    this.image = event.target.files[0];
  }

  close() {
    this.form.reset();
    this.dialogRef.close();
  }

  submit() {
    this.serverErrors = {};
    const formData = JSON.parse(JSON.stringify(this.form.value));

    if (formData.freeGold) {
      formData.freeSilvers = null;
    }

    if (this.data) {
      this.actionsService.editAction(this.data._id, formData).subscribe((response: any) => {
        this.registerSuccess = true;
        if (this.image) {
          this.actionsService.postActionImage(response._id, this.image).subscribe(res => {
          });
        }
      }, (response: any) => {
        Object.keys(response.error).forEach(prop => {
          this.serverErrors[prop] = response.error[prop][0];
        });
      });
    } else {
      this.actionsService.postAction(formData).subscribe((response: any) => {
        this.registerSuccess = true;
        if (this.image) {
          this.actionsService.postActionImage(response._id, this.image).subscribe(res => {
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
