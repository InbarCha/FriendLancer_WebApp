import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

class Users {
  fullName: string;
  email: string;
  city: string;
  profession: string;
}

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
  register(email:string, pwd:string, fullName:string, city:string, profession:string) {
    return this.http.post('http://localhost:3000/api/users', {
      email: email,
      password: pwd,
      fullName: fullName,
      city:city,
      profession: profession
    });
  }

  deleteUser(userEmail: string, password: string) {
    this.http.post('http://localhost:3000/api/users/deleteUser', {
      email: userEmail,
      password: password
    });
    this.logout();
  }

  isLoggedIn() {
    return !!localStorage['currentUsr'];
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

  getUserFullName() {
    if (localStorage['currentUsr']) {
      return JSON.parse(localStorage['currentUsr'])['fullName'];
    } else {
      return '';
    }
  }

  getUserCity() {
    if (localStorage['currentUsr']) {
      return JSON.parse(localStorage['currentUsr'])['city'];
    } else {
      return '';
    }
  }
  getUserProfession() {
    if (localStorage['currentUsr']) {
      return JSON.parse(localStorage['currentUsr'])['profession'];
    } else {
      return '';
    }
  }

  getAllUsers() {
    return this.http.get<Users[]>('http://localhost:3000/api/users');
  }

  isUserAdmin() {
    if (this.isLoggedIn())
      return JSON.parse(localStorage['currentUsr'])['role'] === "admin";
    else return false;
  }
}

