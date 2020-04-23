import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
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
    private snackBar: MatSnackBar,
    private gamingAccountService: GamingAccountsService,
  ) {
  }

  ngOnInit() {
  }

  setGold() {
    console.log(this.data);
    console.log(this.gold);
    this.gold.disable();
    this.gamingAccountService.setGold({
      gold: this.data.isAdd ? this.gold.value : -this.gold.value,
      user: this.data.userId
    }).subscribe(() => {
      this.gold.reset();
      this.dialogRef.close();
      this.snackBar.open('', 'Золото изменено');
    }, error => {
      this.gold.enable();
      this.snackBar.open(error.message, error.name);
    });
  }

  close() {
    this.dialogRef.close();
  }

}
