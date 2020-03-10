import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import * as d3 from 'd3';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
  }

}
