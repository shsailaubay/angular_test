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
    this.gamingCurrencyRateService.getData().subscribe(data => {
      console.log(data);
      this.curentCurrencyRate = data && data.docs && data.docs[0] && data.docs[0].gold;
    });
  }

}
