import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {PostsService} from "../services/posts.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  numOfRows: number;
  returnURL: string;
  isCurrentForumExists: boolean;
  currentForumName: string;
  constructor(public auth: AuthService, public postSer: PostsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.numOfRows = 1;
    this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (localStorage['currentForum']) {
      this.isCurrentForumExists = true;
      this.currentForumName = JSON.parse(localStorage['currentForum'])['forumName']
    }
    else {
      this.isCurrentForumExists = false;
      this.router.navigate(['/forums']);
    }
    var forumId = JSON.parse(localStorage['currentForum'])['forumId']
    this.postSer.getAllPostsByForumId(forumId).subscribe(data=> {
      data.forEach(post => {
        this.addRow(post.postTitle, post.postId, post.forumName, post.postLocation, post.postParticipants);
        var currentRow = this.numOfRows;
        var router = this.router;
        document.getElementById('editBtn_' + currentRow).addEventListener('click', function() {
          var table: HTMLTableElement = <HTMLTableElement> document.getElementById("myPostsTable");
          var rows = table.rows;
          var postTitle = rows[currentRow].cells[1].innerText;
          console.log(postTitle);
          var postId = rows[currentRow].cells[2].innerText;
          console.log(postId);
          var forumName = rows[currentRow].cells[3].innerText;
          console.log(forumName);
          var postLocation = rows[currentRow].cells[4].innerText;
          console.log(postLocation);
          var postParticipants = rows[currentRow].cells[5].innerText;
          console.log(postParticipants);


          console.log(JSON.stringify({postTitle: postTitle, postId: postId, forumName:forumName, postLocation:postLocation, postParticipants:postParticipants}));
          localStorage.setItem('currentPost', JSON.stringify({postTitle: postTitle, postId: postId, forumName:forumName, postLocation:postLocation, postParticipants:postParticipants}));
          router.navigate(['/posts/update']);
        });
        this.numOfRows += 1;
      });
    });
  }

  addRow(postTitle, postId, forumName, postLocation, postParticipants) {
    var table: HTMLTableElement = <HTMLTableElement> document.getElementById("myPostsTable");
    var newRow = table.insertRow(this.numOfRows);

    var newCell_0 = newRow.insertCell(0);
    var newCell_1 = newRow.insertCell(1);
    var newCell_2 = newRow.insertCell(2);
    var newCell_3 = newRow.insertCell(3);
    var newCell_4 = newRow.insertCell(4);
    var newCell_5 = newRow.insertCell(5);

    newCell_0.innerText = postTitle;
    newCell_1.innerText = postId;
    newCell_2.innerText = forumName;
    newCell_3.innerText = postLocation;
    newCell_4.innerText = postParticipants;

    var btnId = 'editBtn_' + this.numOfRows;
    var newCell_innerHtml = "<button class='btn btn-primary editBtns' id=" + btnId + "> Edit Post </button>"
    newCell_5.innerHTML = newCell_innerHtml;
  }

}
