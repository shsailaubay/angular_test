import {Component, Inject, Renderer2} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {Platform} from '@angular/cdk/platform';
import {MatIconRegistry} from '@angular/material/icon';
import {filter} from 'rxjs/operators';
import {ThemeService} from '../@fury/services/theme.service';
import {SidenavService} from './layout/sidenav/sidenav.service';

@Component({
  selector: 'fury-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private sidenavService: SidenavService,
              private iconRegistry: MatIconRegistry,
              private renderer: Renderer2,
              private themeService: ThemeService,
              @Inject(DOCUMENT) private document: Document,
              private platform: Platform,
              private route: ActivatedRoute) {
    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('style'))
    ).subscribe(queryParamMap => this.themeService.setStyle(queryParamMap.get('style')));

    this.iconRegistry.setDefaultFontSetClass('material-icons');
    this.themeService.theme$.subscribe(theme => {
      if (theme[0]) {
        this.renderer.removeClass(this.document.body, theme[0]);
      }

      this.renderer.addClass(this.document.body, theme[1]);
    });

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }

    this.sidenavService.addItems([
      {
        name: 'Отчет',
        routeOrFunction: '/report',
        icon: 'assignment',
        pathMatchExact: true
      },
      {
        name: 'Финансовая статистика',
        routeOrFunction: '/financial-statistic',
        icon: 'assignment'
      },
      {
        name: 'Финансовая история',
        routeOrFunction: '/financial-history',
        icon: 'assignment'
      },
      {
        name: 'Игровые аккаунты',
        routeOrFunction: '/gaming-accounts',
        icon: 'people'
      },
      {
        name: 'Заявки на вывод денег',
        routeOrFunction: '/cash-release-requests',
        icon: 'local_atm'
      },
      {
        name: 'Курсы игровых валют',
        routeOrFunction: '/gaming-currency-rates',
        icon: 'attach_money'
      },
      {
        name: 'Игры',
        routeOrFunction: '/games',
        icon: 'videogame_asset'
      },
      {
        name: 'Игровые режимы',
        routeOrFunction: '/gaming-modes',
        icon: 'games'
      },
      {
        name: 'Бустеры',
        routeOrFunction: '/boosters',
        icon: 'flash_on'
      },
      {
        name: 'Темы',
        routeOrFunction: '/themes',
        icon: 'color_lens'
      },
      {
        name: 'Страны',
        routeOrFunction: '/countries',
        icon: 'flag'
      },
      {
        name: 'Уровни игроков',
        routeOrFunction: '/gamers-levels',
        icon: 'star'
      },
      {
        name: 'Акции',
        routeOrFunction: '/actions',
        icon: 'brightness_auto'
      },
      {
        name: 'push уведомления',
        routeOrFunction: '/push-notifications',
        icon: 'wb_iridescent'
      },
      {
        name: 'Пользователи',
        routeOrFunction: '/users',
        icon: 'people'
      }
    ]);
  }
}
