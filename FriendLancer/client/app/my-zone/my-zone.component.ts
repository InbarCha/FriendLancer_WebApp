import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-my-zone',
  templateUrl: './my-zone.component.html',
  styleUrls: ['./my-zone.component.css']
})
export class MyZoneComponent implements OnInit {
  myDetails:any = {
    myEmail: this.auth.getUserEmail(),
    myFullName: this.auth.getUserFullName(),
    myProfession: this.auth.getUserProfession(),
    myCity: this.auth.getUserCity()
  };
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }
}


