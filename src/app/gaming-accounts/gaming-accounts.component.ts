import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ListColumn} from '../../@fury/shared/list/list-column.model';

import {Observable, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {GamingAccountsService} from './gaming-accounts.service';
import {GamingAccount} from './gaming-account.model';

@Component({
  selector: 'fury-gaming-accounts',
  templateUrl: './gaming-accounts.component.html',
  styleUrls: ['./gaming-accounts.component.scss']
})
export class GamingAccountsComponent implements OnInit {

  subject$: ReplaySubject<GamingAccount[]> = new ReplaySubject<GamingAccount[]>(1);
  data$: Observable<GamingAccount[]> = this.subject$.asObservable();
  gamingAccounts: GamingAccount[];

  dataSource: MatTableDataSource<GamingAccount> | null;

  @Input()
  columns: ListColumn[] = [
    {name: 'Checkbox', property: 'checkbox', visible: true},
    {name: 'Id', property: 'id', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name', visible: true, isModelProperty: true},
    {name: 'Social link', property: 'socialLink', visible: true, isModelProperty: true},
    {name: 'Email', property: 'email', visible: true, isModelProperty: true},
    {name: 'Exp Points', property: 'expPoints', visible: true, isModelProperty: true},
    {name: 'Silver', property: 'silver', visible: true, isModelProperty: true},
    {name: 'Gold', property: 'gold', visible: true, isModelProperty: true},
    {name: 'Player Status', property: 'playerStatus', visible: true, isModelProperty: true},
    {name: 'Last Visit', property: 'lastVisit', visible: true, isModelProperty: true},
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

  ngOnInit() {
    this.gamingAccountsService.getGamingAccounts().subscribe((page: any) => {
      this.subject$.next(page.docs.map(gamingAccounts => new GamingAccount(gamingAccounts)));
      this.dataSource = new MatTableDataSource();
      this.data$.pipe(
        filter(Boolean)
      ).subscribe((gamingAccounts) => {
        this.gamingAccounts = gamingAccounts;
        this.dataSource.data = gamingAccounts;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  gotoGamingAccount(id) {
    this.router.navigate(['gaming-accounts/', id]);
  }
}
