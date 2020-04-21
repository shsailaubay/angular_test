import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { GamingAccountsService } from '../gaming-accounts.service';
import { ChangeGoldDialogComponent } from './change-gold-dialog/change-gold-dialog.component';

@Component({
  selector: 'fury-gaming-account',
  templateUrl: './gaming-account.component.html',
  styleUrls: ['./gaming-account.component.scss'],
})

export class GamingAccountComponent implements OnInit {

  gamingAccountId = this.route.snapshot.params['id'];
  gamingAccount;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private gamingAccountService: GamingAccountsService,
  ) {
  }

  ngOnInit() {
    this.getGamingAccountData();
  }

  getGamingAccountData() {
    this.gamingAccountService.getGamingAccount(this.gamingAccountId).subscribe((gamingAccount) => {
      this.gamingAccount = gamingAccount;
    });
  }

  openGoldDialog(isAdd) {
    this.dialog.open(ChangeGoldDialogComponent, {
      disableClose: false,
      data: { isAdd, userId: this.gamingAccountId },
    });
  }
}
