import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fury-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss']
})
export class ToolbarUserComponent implements OnInit {
  userName;

  isOpen: boolean;

  constructor() { }

  ngOnInit() {
    this.setUserInfo();
  }

  setUserInfo() {
    this.userName = JSON.parse(window.sessionStorage.getItem('userName'));
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
