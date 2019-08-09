import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GamingAccountsService} from '../../../shared/services/gaming-accounts.service';

@Component({
  selector: 'fury-gaming-account',
  templateUrl: './gaming-account.component.html',
  styleUrls: ['./gaming-account.component.scss']
})

export class GamingAccountComponent implements OnInit {
  gamingAccountId = this.route.snapshot.params['id'];
  gamingAccount;

  constructor(
    private route: ActivatedRoute,
    private gamingAccountService: GamingAccountsService
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

}
