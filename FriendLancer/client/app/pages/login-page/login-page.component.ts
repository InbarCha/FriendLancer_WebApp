import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  errorMessage: string = "";
  credentials: any = {
    email: '',
    pwd: ''
  };
  returnURL: string;
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  login() {
    // We checked for validation in HTML so our credentials should not be blank.
    this.auth.login(this.credentials.email, this.credentials.pwd).subscribe(data => {
      if (data['message'] === false) {
        // if invalid login, reset the form
        this.credentials.email = '';
        this.credentials.pwd = '';
        this.errorMessage = "User or Password are Incorrect!";
      } else {
        // if we get here, there is no error, the return is valid
        // Let's first save the info into local storage for later use. We can parse this back
        // into an object later
        localStorage.setItem('currentUsr', JSON.stringify(data));
        // route user to the return URL
        this.router.navigateByUrl(this.returnURL);
      }
    });
  }

}


