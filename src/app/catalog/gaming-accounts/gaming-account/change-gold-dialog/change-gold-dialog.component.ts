import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GamingAccountsService } from '../../gaming-accounts.service';

@Component({
  selector: 'fury-change-gold-dialog',
  templateUrl: './change-gold-dialog.component.html',
  styles: [],
})
export class ChangeGoldDialogComponent implements OnInit {

  gold = new FormControl('', [Validators.required, Validators.min(1)]);

  constructor(
    public dialogRef: MatDialogRef<ChangeGoldDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private gamingAccountService: GamingAccountsService,
  ) {
  }

  ngOnInit() {
  }

  setGold() {
    this.gold.disable();
    this.gamingAccountService.setGold({
      gold: this.data.isAdd ? this.gold.value : -this.gold.value,
      user: this.data.userId
    }).subscribe(() => {
      this.gold.reset();
      this.dialogRef.close();
    }, () => {
      this.gold.enable();
    });
  }

  close() {
    this.dialogRef.close();
  }

}
