import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { GamersLevelsService } from './gamers-levels.service';

@Component({
  selector: 'fury-gamers-level-dialog-component',
  templateUrl: './gamers-level-dialog.component.html',
})
export class GamersLevelDialogComponent implements OnInit {
  form: FormGroup;
  serverErrors = {};
  registerSuccess = false;

  constructor(
    private dialogRef: MatDialogRef<GamersLevelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private gamersLevelsService: GamersLevelsService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'name': this.formBuilder.group({
        'ru': [this.data ? this.data.name_ru : '', Validators.required],
        'en': [this.data ? this.data.name_en : '', Validators.required]
      }),
      'min': [this.data ? this.data.min : ''],
      'max': [this.data ? this.data.max : '']
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
      this.gamersLevelsService.editData(this.data._id, formData).subscribe((response: any) => {
        this.registerSuccess = true;
        this.form.reset();
        this.snackBar.open('Изменено');
        this.dialogRef.close('reload');
      }, (response: any) => {
        this.snackBar.open(response.message);
        Object.keys(response.error).forEach(prop => {
          this.serverErrors[prop] = response.error[prop][0];
        });
      });
    } else {
      this.gamersLevelsService.postData(formData).subscribe((response: any) => {
        this.registerSuccess = true;
        this.form.reset();
        this.snackBar.open('Создано');
        this.dialogRef.close('reload');
      }, (response: any) => {
        this.snackBar.open(response.message);
        Object.keys(response.error).forEach(prop => {
          this.serverErrors[prop] = response.error[prop][0];
        });
      });
    }
  }
}
