import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../services/auth.service";
import { Router, ActivatedRoute } from '@angular/router';
import {MeetPlaceService} from "../../services/meet-place.service";
import {ForumService} from "../../services/forum.service";

@Component({
  selector: 'app-meet-place-update',
  templateUrl: './meet-place-update.component.html',
  styleUrls: ['./meet-place-update.component.css']
})
export class MeetPlaceUpdateComponent implements OnInit {
  meetPlace: any = {
    meetPlaceName: '',
    meetPlaceType: '',
    meetPlaceLocation: ''
  };
  returnURL: string;
  constructor(public auth: AuthService, public meetPlacesSer: MeetPlaceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/meetPlaces';
    this.meetPlace.meetPlaceName = JSON.parse(localStorage['currentMeetPlace'])['meetPlaceName'];
    console.log(this.meetPlace.meetPlaceName);
    this.meetPlace.meetPlaceType = JSON.parse(localStorage['currentMeetPlace'])['meetPlaceType'];
    console.log(this.meetPlace.meetPlaceType);
    this.meetPlace.meetPlaceLocation = JSON.parse(localStorage['currentMeetPlace'])['meetPlaceLocation'];
    console.log(this.meetPlace.meetPlaceLocation);
  }

  EditMeetPlace() {
    this.meetPlacesSer.editMeetPlace(this.meetPlace.meetPlaceName, this.meetPlace.meetPlaceType, this.meetPlace.meetPlaceLocation).subscribe(data=> {
      if (data['message'] === false) {
        // if invalid login, reset the form
        this.meetPlace.meetPlaceName = '';
        this.meetPlace.meetPlaceType = '';
        this.meetPlace.meetPlaceLocation = '';
        this.meetPlace.deactivateForum();
      }
      else {
        this.meetPlacesSer.deactivateMeetPlace();
        // route user to the return URL
        this.router.navigateByUrl(this.returnURL);
      }
    });
  }
}
