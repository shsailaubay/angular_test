import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {ListColumn} from '../../../@fury/shared/list/list-column.model';

import {Observable, of, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {GamingAccount} from './gaming-account.model';
import {GAMING_ACCOUNTS_DEMO_DATA} from './gaming-accounts.demo';

@Component({
  selector: 'fury-gaming-accounts',
  templateUrl: './gaming-accounts.component.html',
  styleUrls: ['./gaming-accounts.component.scss']
})

export class GamingAccountsComponent implements OnInit, AfterViewInit, OnDestroy {

  subject$: ReplaySubject<GamingAccount[]> = new ReplaySubject<GamingAccount[]>(1);
  data$: Observable<GamingAccount[]> = this.subject$.asObservable();
  gamingAccounts: GamingAccount[];

  dataSource: MatTableDataSource<GamingAccount> | null;

  @Input()
  columns: ListColumn[] = [
    {name: 'Checkbox', property: 'checkbox', visible: true},
    {name: 'Id', property: 'id', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name', visible: true, isModelProperty: true},
    {name: 'Social link', property: 'social_link', visible: true, isModelProperty: true},
    {name: 'Email', property: 'email', visible: true, isModelProperty: true},
    {name: 'Exp Points', property: 'exp_points', visible: true, isModelProperty: true},
    {name: 'Silver', property: 'silver', visible: true, isModelProperty: true},
    {name: 'Gold', property: 'gold', visible: true, isModelProperty: true},
    {name: 'Player Status', property: 'player_status', visible: true, isModelProperty: true},
    {name: 'Last Visit', property: 'last_visit', visible: true, isModelProperty: true},
    {name: 'Actions', property: 'actions', visible: true},
  ] as ListColumn[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSize = 10;

  constructor(
    private router: Router
  ) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  getData() {
    return of(GAMING_ACCOUNTS_DEMO_DATA.map(gamingAccounts => new GamingAccount(gamingAccounts)));
  }

  ngOnInit() {
    this.getData().subscribe(gamingAccounts => {
      this.subject$.next(gamingAccounts);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter(Boolean)
    ).subscribe((gamingAccounts) => {
      this.gamingAccounts = gamingAccounts;
      this.dataSource.data = gamingAccounts;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  ngOnDestroy() {
  }

  gotoGamingAccount(id) {
    console.log();
    this.router.navigate(['gaming-accounts/gaming-account', id]);
  }
}
