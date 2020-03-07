import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

class MeetPlace {
  meetPlaceName: string;
  meetPlaceType: string;
  meetPlaceLocation: string;
}

@Injectable({
  providedIn: 'root'
})
export class MeetPlaceService {
  constructor(private http: HttpClient) { }

  createMeetPlace(meetPlaceName: string, meetPlaceType: string, meetPlaceLocation: string) {
    return this.http.post('http://localhost:3000/api/meetPlaces', {
      meetPlaceName: meetPlaceName,
      meetPlaceType: meetPlaceType,
      meetPlaceLocation: meetPlaceLocation,
    });
  }

  editMeetPlace(meetPlaceName: string, meetPlaceType: string, meetPlaceLocation: string) {
    return this.http.post('http://localhost:3000/api/meetPlaces/' + meetPlaceName, {
      meetPlaceName: meetPlaceName,
      meetPlaceType: meetPlaceType,
      meetPlaceLocation: meetPlaceLocation,
    });
  }

  getAllMeetPlaces() {
    return this.http.get<MeetPlace[]>('http://localhost:3000/api/meetPlaces');
  }

  getMeetPlaceByName(meetPlaceName: string) {
    return this.http.get<MeetPlace>('http://localhost:3000/api/meetPlaces/' + meetPlaceName);
  }

  setActiveMeetPlace(meetPlace: MeetPlace) {
    localStorage.setItem('currentMeetPlace', JSON.stringify(meetPlace));
  }

  deactivateMeetPlace() {
    localStorage['currentMeetPlace'] = '';
  }

  getActiveMeetPlace() {
    return JSON.parse(localStorage['currentMeetPlace']);
  }
}
