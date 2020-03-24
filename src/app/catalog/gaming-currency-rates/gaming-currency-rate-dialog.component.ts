import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GamingCurrencyRateService } from './gaming-currency-rate.service';

@Component({
  selector: 'fury-gaming-currency-rate-dialog-component',
  templateUrl: './gaming-currency-rate-dialog.component.html',
})
export class GamingCurrencyRateDialogComponent {

  form = this.fb.group({
    gold: ['', Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<GamingCurrencyRateDialogComponent>,
    private fb: FormBuilder,
    private gamingCurrencyRateService: GamingCurrencyRateService,
  ) {
  }

  close() {
    this.form.reset();
    this.dialogRef.close();
  }

  submit() {
    const formData = JSON.parse(JSON.stringify(this.form.value));
    this.gamingCurrencyRateService.postData(formData).subscribe();
    this.form.reset();
    this.dialogRef.close();
  }
}
