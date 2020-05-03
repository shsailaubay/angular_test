import { Component, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { CashReleaseRequestsService } from './cash-release-requests.service';

@Component({
  selector: 'fury-cash-release-request-decline-component',
  templateUrl: './cash-release-request-decline.component.html',
})
export class CashReleaseRequestDeclineComponent implements OnDestroy {
  subscription: Subscription;

  constructor(
    private dialogRef: MatDialogRef<CashReleaseRequestDeclineComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private cashReleaseRequestsService: CashReleaseRequestsService
  ) {
  }

  decline() {
    this.subscription = this.cashReleaseRequestsService.approveRequest(this.data, false).subscribe(
      () => {
        this.snackBar.open('Запрос отклонен');
        this.dialogRef.close('reload');
      },
      error => {
        this.snackBar.open(error.message);
      }
    );
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
