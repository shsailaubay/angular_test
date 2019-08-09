import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

import {ListColumn} from '../../../@fury/shared/list/list-column.model';

import {Observable, of, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {GamingAccountsService} from '../../shared/services/gaming-accounts.service';
import {GamingAccount} from '../../shared/models/gaming-account.model';
import {GAMING_ACCOUNTS_DEMO_DATA} from '../../../assets/gaming-accounts.demo';

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
    private router: Router,
    private gamingAccountsService: GamingAccountsService
  ) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  getData() {
    return of(GAMING_ACCOUNTS_DEMO_DATA.map(gamingAccounts => new GamingAccount(gamingAccounts)));
    // let a;
    // this.gamingAccountsService.getGamingAccounts().subscribe((response: any) => {
    //   a = response.docs.map(gamingAccounts => new GamingAccount(gamingAccounts));
    // });
    // console.log(a);
    // return a;
  }

  ngOnInit() {

    // this.gamingAccountsService.getGamingAccounts().subscribe((response: any) => {
    //   console.log(response);
    //   // this.data = response;
    // });

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
    this.router.navigate(['gaming-accounts/', id]);
  }
}
