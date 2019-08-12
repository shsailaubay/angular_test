import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { SidenavService } from './layout/sidenav/sidenav.service';
import { ThemeService } from '../@fury/services/theme.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Platform } from '@angular/cdk/platform';

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
        name: 'Dashboard',
        routeOrFunction: '/',
        icon: 'dashboard',
        pathMatchExact: true
      },
      {
        name: 'Игровые аккаунты',
        routeOrFunction: '/gaming-accounts',
        icon: 'videogame_asset'
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
        name: 'Страны',
        routeOrFunction: '/countries',
        icon: 'flag'
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
      // {
      //   name: 'Логи',
      //   routeOrFunction: '/a',
      //   icon: 'history'
      // },
      // {
      //   name: 'Настройки',
      //   routeOrFunction: '/a',
      //   icon: 'settings'
      // },
      // {
      //   name: 'Управление темами',
      //   routeOrFunction: '/a',
      //   icon: 'color_lens'
      // },
      {
        name: 'Пользователи',
        routeOrFunction: '/users',
        icon: 'account_circle'
      }
    ]);
  }
}
