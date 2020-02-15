import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  primaryDisplayBorderTitle = 'FriendLancer';
  primaryDisplayBorderContent = 'Collaboration Made Easy';
  constructor() { }

  ngOnInit(): void {

  }

}
