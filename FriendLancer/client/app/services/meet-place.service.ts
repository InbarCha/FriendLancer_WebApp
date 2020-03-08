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

  searchMeetPlace(meetPlaceName: string, meetPlaceType: string, meetPlaceLocation: string) {
    var query = {};
    if (meetPlaceName != '' && meetPlaceType != '' && meetPlaceLocation != '') {
      query = {
        meetPlaceName: meetPlaceName,
        meetPlaceType: meetPlaceType,
        meetPlaceLocation: meetPlaceLocation,
      }
    }
    else if (meetPlaceName != '' && meetPlaceType != '') {
      query = {
        meetPlaceName: meetPlaceName,
        meetPlaceType: meetPlaceType,
      }
    }
    else if (meetPlaceName != '' && meetPlaceLocation != '') {
      query = {
        meetPlaceName: meetPlaceName,
        meetPlaceLocation: meetPlaceLocation,
      }
    }
    else if (meetPlaceType != '' && meetPlaceLocation != '') {
      query = {
        meetPlaceType: meetPlaceType,
        meetPlaceLocation: meetPlaceLocation,
      }
    }
    else if (meetPlaceType != '') {
      query = {
        meetPlaceType: meetPlaceType,
      }
    }
    else if (meetPlaceLocation != '') {
      query = {
        meetPlaceLocation: meetPlaceLocation,
      }
    }
    else if (meetPlaceName != '') {
      query = {
        meetPlaceName: meetPlaceName,
      }
    }

    return this.http.post<MeetPlace[]>('http://localhost:3000/api/meetPlaces/searchMeetPlace', query);
  }
}
