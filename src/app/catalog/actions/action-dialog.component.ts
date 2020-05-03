import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
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
    private snackBar: MatSnackBar,
    private actionsService: ActionsService,
    private countriesService: CountriesService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {

    console.log(this.data);

    this.countriesService.getCountries().subscribe((page: any) => {
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
      'country': [this.data ? this.data.country_id : ''],
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
        this.form.reset();
        this.snackBar.open('Изменено');
        this.dialogRef.close('reload');
      }, (error: any) => {
        this.snackBar.open(error.message);
        Object.keys(error.error).forEach(prop => {
          this.serverErrors[prop] = error.error[prop][0];
        });
      });
    } else {
      this.actionsService.postAction(formData).subscribe((response: any) => {
        this.registerSuccess = true;
        if (this.image) {
          this.actionsService.postActionImage(response._id, this.image).subscribe(res => {
          });
        }
        this.form.reset();
        this.snackBar.open('Создано');
        this.dialogRef.close('reload');
      }, (error: any) => {
        this.snackBar.open(error.message);
        Object.keys(error.error).forEach(prop => {
          this.serverErrors[prop] = error.error[prop][0];
        });
      });
    }
  }
}
