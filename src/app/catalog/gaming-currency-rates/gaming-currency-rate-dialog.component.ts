import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'fury-gaming-currency-rate-dialog-component',
  templateUrl: './gaming-currency-rate-dialog.component.html',
})
export class GamingCurrencyRateDialogComponent {
  constructor(private dialogRef: MatDialogRef<GamingCurrencyRateDialogComponent>) {
  }

  close(answer: string) {
    this.dialogRef.close(answer);
  }
}
