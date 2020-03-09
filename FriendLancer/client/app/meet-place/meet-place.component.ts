import { Component, OnInit } from '@angular/core';
import { AuthService} from "../services/auth.service";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { MeetPlaceService } from "../services/meet-place.service";
import { HttpParameterCodec } from "@angular/common/http";

class Position {
  latitude: number;
  longitude: number;

  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

import {AgmCoreModule} from '@agm/core';
import {google} from "@agm/core/services/google-maps-types";

@Component({
  selector: 'app-meet-place',
  templateUrl: './meet-place.component.html',
  styleUrls: ['./meet-place.component.css']
})
export class MeetPlaceComponent implements OnInit {
  public positions = [new Position(51.017467, 10.233982)]; // static point for debug

  meetPlace:any = {
    meetPlaceName: '',
    meetPlaceType: '',
    meetPlaceLocation: ''
  };
  numOfRows: number;
  returnURL: string;
  showSearchForm: boolean;
  errorMessage:string = '';

  constructor(public auth: AuthService, public meetPlaceSer: MeetPlaceService, private router: Router,
               private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.showSearchForm = false;
    this.numOfRows = 1;
    this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.drawTable();
    this.getPositions();
  }

  getPositions() {
    this.meetPlaceSer.getAllMeetPlaces().subscribe(data=> {
      data.forEach(meetPlace=> {
        var meetPlaceLocation = meetPlace.meetPlaceLocation;
        console.log("meetPlaceLocation: " + meetPlaceLocation);
        this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(meetPlaceLocation) +'&key=AIzaSyCQPe2NpmzkQ5Ox2UNUBPMVzX3ds-psSVQ').subscribe(data=>{
          var latitude = data['results'][0]['geometry']['location']['lat'];
          var longitude = data['results'][0]['geometry']['location']['lng'];
          console.log("latitude is: " + latitude);
          console.log("longitude is: " + longitude);
          this.positions.push(new Position(latitude, longitude));
        });
      });
      console.log(this.positions);
    });
  }

  drawTable() {
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

  searchMeetPlace() {
    if (this.meetPlace.meetPlaceName === '' && this.meetPlace.meetPlaceType === '' && this.meetPlace.meetPlaceLocation === '') {
      this.errorMessage = "All Rows are Empty"!
    }
    else {
      this.meetPlaceSer.searchMeetPlace(this.meetPlace.meetPlaceName, this.meetPlace.meetPlaceType, this.meetPlace.meetPlaceLocation).subscribe(data=>{
        this.deleteTable();
        this.errorMessage = '';
        data.forEach(meetPlace=> {
          this.addRow(meetPlace.meetPlaceName, meetPlace.meetPlaceType, meetPlace.meetPlaceLocation);
        });
      });
    }
  }

  showSearchFormFunc() {
    this.showSearchForm = !this.showSearchForm;
    if (this.showSearchForm === false) {
      this.errorMessage = "";
    }
  }

  cancelSearch() {
    this.showSearchForm = false;
    this.errorMessage = "";
    this.deleteTable();
    this.drawTable();
  }

  deleteTable() {
    var table: HTMLTableElement = <HTMLTableElement> document.getElementById("myMeetPlacesTable");
    while(table.rows.length > 1) {
      table.deleteRow(-1);
    }
    this.numOfRows = 1;
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

  // GOOGLE MAPS
  latitude =32.074109;
  longitude=34.782827;
  onChooseLocation (event)
  {
    this.latitude= event.coords.lat;
    this.longitude=event.coords.lng;
  }


}
