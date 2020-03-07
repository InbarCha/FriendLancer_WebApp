import { Component, OnInit } from '@angular/core';
import { AuthService} from "../services/auth.service";
import { Router, ActivatedRoute } from '@angular/router';
import { ForumService } from "../services/forum.service";

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css']
})
export class ForumsComponent implements OnInit {
  forum: any = {
    forumName: '',
    forumId: ''
  };
  returnURL: string;
  constructor(public auth: AuthService, public forumSer: ForumService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.forumSer.getAllForums().subscribe(data=> {
      data.forEach(forum => {
        this.addRow(forum.forumName, forum.forumId, 0);
      });
    });
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

  addRow(forumsName, forumId, numberOfPosts) {
    var table: HTMLTableElement = <HTMLTableElement> document.getElementById("myTableForums");
    var newRow = table.insertRow(-1);

    var newCell_0 = newRow.insertCell(0);
    var newCell_1 = newRow.insertCell(1);
    var newCell_2 = newRow.insertCell(2);

    newCell_0.innerText = forumsName;
    newCell_1.innerText = forumId;
    newCell_2.innerText = numberOfPosts;
  }

}
