import { Component, OnInit } from '@angular/core';
import { fadeInRightAnimation } from '../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../@fury/animations/fade-in-up.animation';

@Component({
  selector: 'fury-financial-history',
  templateUrl: './financial-history.component.html',
  styles: [],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class FinancialHistoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
