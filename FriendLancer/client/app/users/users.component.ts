import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usersArray: Array<string> = [];
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getAllUsers().subscribe(data => {
      data.forEach(user => {
        this.addRow(user.fullName,user.email,user.city,user.profession);
      });
    });
  }

  addRow(userName, userEmail, userCity, UserProfession) {
    var table: HTMLTableElement = <HTMLTableElement> document.getElementById("myTable");
    var newRow = table.insertRow(-1);

    var newCell_0 = newRow.insertCell(0);
    var newCell_1 = newRow.insertCell(1);
    var newCell_2 = newRow.insertCell(2);
    var newCell_3 = newRow.insertCell(3);

    newCell_0.innerText = userName;
    newCell_1.innerText = userEmail;
    newCell_2.innerText = userCity;
    newCell_3.innerText = UserProfession;
  }

}
