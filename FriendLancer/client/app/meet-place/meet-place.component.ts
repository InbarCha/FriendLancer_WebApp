import { Component, OnInit } from '@angular/core';
import { AuthService} from "../services/auth.service";
import { Router, ActivatedRoute } from '@angular/router';
import { MeetPlaceService } from "../services/meet-place.service";
import {ForumService} from "../services/forum.service";


import {AgmCoreModule} from '@agm/core';


@Component({
  selector: 'app-meet-place',
  templateUrl: './meet-place.component.html',
  styleUrls: ['./meet-place.component.css']
})
export class MeetPlaceComponent implements OnInit {
  numOfRows: number;
  returnURL: string;
  constructor(public auth: AuthService, public meetPlaceSer: MeetPlaceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.numOfRows = 1;
    this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.meetPlaceSer.getAllMeetPlaces().subscribe(data=> {
      data.forEach(meetPlace=> {
        this.addRow(meetPlace.meetPlaceName, meetPlace.meetPlaceType, meetPlace.meetPlaceLocation);
        var currentRow = this.numOfRows;
        var router = this.router;
        var meetPlaceSer = this.meetPlaceSer;

        //adding listeners for "edit btns"
        document.getElementById('editBtn_' + currentRow).addEventListener('click', function() {
          var table: HTMLTableElement = <HTMLTableElement> document.getElementById("myMeetPlacesTable");
          var rows = table.rows;
          var meetPlaceName = rows[currentRow].cells[0].innerText;
          console.log(meetPlaceName);
          var meetPlaceType = rows[currentRow].cells[1].innerText;
          console.log(meetPlaceType);
          var meetPlaceLocation = rows[currentRow].cells[2].innerText;
          console.log(meetPlaceLocation);

          var activeMeetPlace = {
            meetPlaceName: meetPlaceName,
            meetPlaceType: meetPlaceType,
            meetPlaceLocation: meetPlaceLocation,
          };

          console.log(JSON.stringify(activeMeetPlace));
          meetPlaceSer.setActiveMeetPlace(activeMeetPlace);
          router.navigate(['/meetPlaces/update']);
        });
        this.numOfRows += 1;
      });
    });
  }

  addRow(meetPlaceName, meetPlaceType, meetPlaceLocation) {
    var table: HTMLTableElement = <HTMLTableElement> document.getElementById("myMeetPlacesTable");
    var newRow = table.insertRow(this.numOfRows);

    var newCell_0 = newRow.insertCell(0);
    var newCell_1 = newRow.insertCell(1);
    var newCell_2 = newRow.insertCell(2);
    var newCell_3 = newRow.insertCell(3);

    newCell_0.innerText = meetPlaceName;
    newCell_1.innerText = meetPlaceType;
    newCell_2.innerText = meetPlaceLocation;

    var editBtnId = 'editBtn_' + this.numOfRows;
    var newCell_innerHtml = "<button class='btn btn-primary' id=" + editBtnId + "> Edit Meet Place </button> ";
    newCell_3.innerHTML = newCell_innerHtml;
  }

}
