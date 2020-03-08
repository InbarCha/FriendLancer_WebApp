import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-my-zone',
  templateUrl: './my-zone.component.html',
  styleUrls: ['./my-zone.component.css']
})
export class MyZoneComponent implements OnInit {
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}


