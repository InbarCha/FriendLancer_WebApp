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
  ngOnInit(): void {
    this.showHome = true;
    this.showForums = false;
    this.showMyZone = false;
  }
  showForumsPage() {
    this.showHome = false;
    this.showForums = true;
    this.showMyZone = false;
  }
  showHomePage() {
    this.showHome = true;
    this.showForums = false;
    this.showMyZone = false;
  }
  showMyZonePage() {
    this.showHome = false;
    this.showForums = false;
    this.showMyZone = true;
  }
}
