import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../services/auth.service";
import { Router, ActivatedRoute } from '@angular/router';
import { ForumService} from "../../services/forum.service";

@Component({
  selector: 'app-forums-update',
  templateUrl: './forums-update.component.html',
  styleUrls: ['./forums-update.component.css']
})
export class ForumsUpdateComponent implements OnInit {
  forum: any = {
    forumName: '',
    forumId: ''
  };
  returnURL: string;
  constructor(public auth: AuthService, public forumSer: ForumService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/forums';
    this.forum.forumName = JSON.parse(localStorage['currentForum'])['forumName'];
    console.log(this.forum.forumName);
    this.forum.forumId = JSON.parse(localStorage['currentForum'])['forumId'];
    console.log(this.forum.forumId);
  }

  EditForum() {
    this.forumSer.editForum(this.forum.forumName, this.forum.forumId).subscribe(data=> {
      if (data['message'] === false) {
        // if invalid login, reset the form
        this.forum.forumName = '';
        this.forumSer.deactivateForum();
      } else {
        // if we get here, there is no error, the return is valid
        // Let's first save the info into local storage for later use. We can parse this back
        // into an object later
        console.log("new currentForum is: " +  JSON.stringify(data));
        this.forumSer.deactivateForum();
        // route user to the return URL
        this.router.navigateByUrl(this.returnURL);
      }
    });
  }

}
