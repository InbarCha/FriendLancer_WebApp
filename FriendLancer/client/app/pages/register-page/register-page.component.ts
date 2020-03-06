import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  errorMessage: string = '';
  credentials: any = {
    email: '',
    pwd: '',
    fullName: '',
    city: '',
    profession: '',
  }
  returnURL: string;
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  register() {
    if (this.credentials.fullName === "" || this.credentials.email === "" || this.credentials.pwd === "" || this.credentials.profession ==="" || this.credentials.city === "") {
      this.initCredentialsToNull();
      this.errorMessage = "One Field or More is Empty!";
    }
    else if (!this.credentials.email.includes('@')) {
      this.initCredentialsToNull();
      this.errorMessage = "Invalid Email";
    }
    else {
      this.auth.register(this.credentials.email, this.credentials.pwd, this.credentials.fullName, this.credentials.city, this.credentials.profession).subscribe(data => {
        if (data['message'] === false) {
          // if invalid login, reset the form
          this.initCredentialsToNull();
          this.errorMessage = "User Already Exists!";
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

  initCredentialsToNull() {
    this.credentials.email = '';
    this.credentials.pwd = '';
    this.credentials.fullName = '';
    this.credentials.city = '';
    this.credentials.profession = '';
  }
}
