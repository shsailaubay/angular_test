import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../../session.service';

@Component({
  selector: 'fury-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss']
})
export class ToolbarUserComponent implements OnInit {
  userName;

  isOpen: boolean;

  constructor(
    private sessionService: SessionService
  ) {
  }

  ngOnInit() {
    this.setUserInfo();
  }

  setUserInfo() {
    this.userName = this.sessionService.getItem('userName');
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  logout() {
    window.sessionStorage.clear();
  }

}
