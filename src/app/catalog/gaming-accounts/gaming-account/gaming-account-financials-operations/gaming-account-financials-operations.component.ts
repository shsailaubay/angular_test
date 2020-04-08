import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ListColumn } from '../../../../../@fury/shared/list/list-column.model';

import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { FinancialOperation } from './financial-operation.model';
import { GamingAccountsService } from '../../gaming-accounts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fury-gaming-account-financials-operations',
  templateUrl: './gaming-account-financials-operations.component.html',
  styleUrls: ['./gaming-account-financials-operations.component.scss'],
})

export class GamingAccountFinancialsOperationsComponent implements OnInit {

  loading = true;

  gamingAccountId = this.route.snapshot.params['id'];

  subject$: ReplaySubject<FinancialOperation[]> = new ReplaySubject<FinancialOperation[]>(1);
  data$: Observable<FinancialOperation[]> = this.subject$.asObservable();
  financialOperations: FinancialOperation[];

  dataSource: MatTableDataSource<FinancialOperation> | null;

  @Input()
  columns: ListColumn[] = [
    { name: 'Date', property: 'date', visible: true, isModelProperty: true },
    { name: 'Type', property: 'type', visible: true, isModelProperty: true },
    { name: 'Amount', property: 'amount', visible: true, isModelProperty: true },
    { name: 'Status', property: 'status', visible: true, isModelProperty: true },
  ] as ListColumn[];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageSize = 10;

  constructor(
    private route: ActivatedRoute,
    private gamingAccountsService: GamingAccountsService,
  ) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.gamingAccountsService.getGamingAccountFinancialHistory(this.gamingAccountId).subscribe((page: any) => {
      this.subject$.next(page.map(item => new FinancialOperation(item)));
      this.dataSource = new MatTableDataSource();
      this.data$.pipe(
        filter(Boolean),
      ).subscribe((item) => {
        this.financialOperations = item;
        this.dataSource.data = item;
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
}
