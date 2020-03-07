import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'FriendLancer';
  showHome: boolean;
  showForums: boolean;
  showMyZone: boolean;
  constructor() {
  }
  ngOnInit(): void {
    this.showHome = true;
    this.showForums = false;
    this.showMyZone = false;
  }
}
