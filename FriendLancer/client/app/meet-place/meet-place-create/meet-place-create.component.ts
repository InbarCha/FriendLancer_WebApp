import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../services/auth.service";
import { Router, ActivatedRoute } from '@angular/router';
import { MeetPlaceService} from "../../services/meet-place.service";
import {ForumService} from "../../services/forum.service";

@Component({
  selector: 'app-meet-place-create',
  templateUrl: './meet-place-create.component.html',
  styleUrls: ['./meet-place-create.component.css']
})
export class MeetPlaceCreateComponent implements OnInit {
  meetPlace: any = {
    meetPlaceName: '',
    meetPlaceType: '',
    meetPlaceLocation: ''
  };
  returnURL: string;
  constructor(public auth: AuthService, public meetPlaceSer: MeetPlaceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/meetPlaces';
  }

  createMeetPlace() {
    this.meetPlaceSer.createMeetPlace(this.meetPlace.meetPlaceName, this.meetPlace.meetPlaceType, this.meetPlace.meetPlaceLocation).subscribe(data => {
      if (data['message'] === false) {
        // if invalid login, reset the form
        this.meetPlace.meetPlaceName = '';
        this.meetPlace.meetPlaceType = '';
        this.meetPlace.meetPlaceLocation = '';
      } else {
        localStorage.setItem('currentMeetPlace', JSON.stringify(data));
        // route user to the return URL
        this.router.navigateByUrl(this.returnURL);
      }
    });
  }
}
