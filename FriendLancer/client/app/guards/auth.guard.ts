import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Check if a 'currentUser' exists in the localStorage object
    // this will return undefined || false if there isn't
    if (localStorage['currentUsr']) {
      // User is logged in, let's let them through
      return true;
    } else {
      // user is not logged in, let's route them to the login page.
      // We will import the Router from @angular/router and assign it in the consructor
      // then we route the user to the login page and pass parameters with the returnURL
      // So we can return to the requested page after login.
      this.router.navigate(['/login'], {queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}
