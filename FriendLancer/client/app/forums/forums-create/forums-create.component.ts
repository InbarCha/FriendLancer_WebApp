import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../services/auth.service";
import { Router, ActivatedRoute } from '@angular/router';
import { ForumService} from "../../services/forum.service";

@Component({
  selector: 'app-forums-create',
  templateUrl: './forums-create.component.html',
  styleUrls: ['./forums-create.component.css']
})
export class ForumsCreateComponent implements OnInit {
  forum: any = {
    forumName: '',
    forumId: ''
  };
  returnURL: string;
  constructor(public auth: AuthService, public forumSer: ForumService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/forums';
  }

  createForum() {
    this.forumSer.createForum(this.forum.forumName).subscribe(data=> {
      if (data['message'] === false) {
        // if invalid login, reset the form
        this.forum.forumName = '';
      } else {
        // if we get here, there is no error, the return is valid
        // Let's first save the info into local storage for later use. We can parse this back
        // into an object later
        localStorage.setItem('currentForum', JSON.stringify(data));
        // route user to the return URL
        this.router.navigateByUrl(this.returnURL);
      }
    });
  }


}
