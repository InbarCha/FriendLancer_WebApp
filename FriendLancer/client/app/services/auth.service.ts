import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }
  login(email: string, pwd: string) {
    return this.http.post('http://localhost:3000/api/users/login', {
      email: email,
      password: pwd
    });
  }
  register(email:string, pwd:string, fullName:string) {
    return this.http.post('http://localhost:3000/api/users', {
      email: email,
      password: pwd,
      fullName: fullName
    });
  }
  isLoggedIn() {
    if (localStorage['currentUsr']) {
      // User is logged in, let's let them through
      return true;
    } else {
      return false;
    }
  }
  logout() {
    localStorage['currentUsr'] = '';
  }
  getUserEmail() {
    if (localStorage['currentUsr']) {
      return JSON.parse(localStorage['currentUsr'])['email'];
    } else {
      return '';
    }
  }
}

