import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GamingAccountsService} from '../../gaming-accounts.service';

@Component({
  selector: 'fury-gaming-account-ratings',
  templateUrl: './gaming-account-ratings.component.html',
  styleUrls: ['./gaming-account-ratings.component.scss']
})
export class GamingAccountRatingsComponent implements OnInit {
  gamingAccountId = this.route.snapshot.params['id'];
  gamingAccount;

  constructor(
    private route: ActivatedRoute,
    private gamingAccountService: GamingAccountsService
  ) { }

  ngOnInit() {
    this.getGamingAccountData();
  }

  getGamingAccountData() {
    this.gamingAccountService.getGamingAccount(this.gamingAccountId).subscribe((gamingAccount) => {
      this.gamingAccount = gamingAccount;
    });
  }
}
