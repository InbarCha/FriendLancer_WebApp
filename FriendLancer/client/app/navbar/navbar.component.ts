import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  primaryDisplayBorderTitle = 'FriendLancer';
  primaryDisplayBorderContent = 'Collaboration Made Easy';
  @Output() showHomePageEmitter = new EventEmitter<boolean>();
  @Output() showForumsEmitter = new EventEmitter<boolean>();
  @Output() showMyZoneEmitter = new EventEmitter<boolean>();
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }
}
