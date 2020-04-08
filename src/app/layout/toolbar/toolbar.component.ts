import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { ThemeService } from '../../../@fury/services/theme.service';
import { GamingCurrencyRateService } from '../../catalog/gaming-currency-rates/gaming-currency-rate.service';

@Component({
  selector: 'fury-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  curentCurrencyRate;
  amountCurrencyGold;
  amountCurrencySilver;
  amountCurrencyAmount;

  @Input()
  @HostBinding('class.no-box-shadow')
  hasNavigation: boolean;

  @Output() openSidenav = new EventEmitter();
  @Output() openQuickPanel = new EventEmitter();

  topNavigation$ = this.themeService.config$.pipe(map(config => config.navigation === 'top'));

  constructor(
    private themeService: ThemeService,
    private gamingCurrencyRateService: GamingCurrencyRateService
  ) {
  }

  ngOnInit() {
    this.gamingCurrencyRateService.getAmountCurrencies().subscribe(data => {
      this.amountCurrencyGold = data && data.gold;
      this.amountCurrencySilver = data && data.silver;

      this.gamingCurrencyRateService.getData().subscribe(cur => {
        this.curentCurrencyRate = cur && cur.docs && cur.docs[0] && cur.docs[0].gold;

        this.amountCurrencyAmount = this.curentCurrencyRate * this.amountCurrencyGold;
      });

    });
  }

}
