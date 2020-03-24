import {Component, OnInit} from '@angular/core';
import { AuthService} from "../services/auth.service";
import { Router, ActivatedRoute } from '@angular/router';
import { ForumService } from "../services/forum.service";
import { PostsService } from "../services/posts.service";

class NumOfPosts {
  _id: string;
  numOfPosts: number;
}

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css']
})

export class ForumsComponent implements OnInit {
  numOfRows: number;
  returnURL: string;
  constructor(public auth: AuthService, public forumSer: ForumService, public postsSer: PostsService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.numOfRows = 1;
    this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.postsSer.groupByForumIdAndCount().subscribe(data=> {
      this.forumSer.getAllForums().subscribe(forums=> {
        forums.forEach(forum => {
          console.log(data);
          var numOfPosts = this.getNumOfPosts(forum.forumId, data);
          this.addRow(forum.forumName, forum.forumId, numOfPosts);
          var currentRow = this.numOfRows;
          var router = this.router;
          var forumSer = this.forumSer;
          //adding listeners for "edit btns"
          document.getElementById('editBtn_' + currentRow).addEventListener('click', function() {
            var table: HTMLTableElement = <HTMLTableElement> document.getElementById("myTableForums");
            var rows = table.rows;
            var forumId = rows[currentRow].cells[1].innerText;
            console.log(forumId);
            var forumName = rows[currentRow].cells[0].innerText;
            console.log(forumName);

            var activeForum = {
              forumName: forumName,
              forumId: forumId
            };

            console.log(JSON.stringify(activeForum));
            forumSer.setActiveForum(activeForum);
            router.navigate(['/forums/update']);
          });

          //adding listeners for "activate btns"
          document.getElementById('activateBtn_' + currentRow).addEventListener('click', function() {
            var table: HTMLTableElement = <HTMLTableElement> document.getElementById("myTableForums");
            var rows = table.rows;
            var forumId = rows[currentRow].cells[1].innerText;
            console.log(forumId);
            var forumName = rows[currentRow].cells[0].innerText;
            console.log(forumName);

            var activeForum = {
              forumName: forumName,
              forumId: forumId
            };

            console.log(JSON.stringify(activeForum));
            forumSer.setActiveForum(activeForum);
            router.navigate(['/posts']);
          });
          this.numOfRows += 1;
        });
      });
    });
  }

  getNumOfPosts(currentForumId: string, numOfPostsArr: NumOfPosts[]) {
    for (var i = 0; i<numOfPostsArr.length; i++) {
      if (numOfPostsArr[i]._id === currentForumId) {
        return numOfPostsArr[i].numOfPosts;
      }
    }

    return 0;
  }

  addRow(forumsName, forumId, numberOfPosts) {
    var table: HTMLTableElement = <HTMLTableElement> document.getElementById("myTableForums");
    var newRow = table.insertRow(this.numOfRows);

    var newCell_0 = newRow.insertCell(0);
    var newCell_1 = newRow.insertCell(1);
    var newCell_2 = newRow.insertCell(2);
    var newCell_3 = newRow.insertCell(3);

    newCell_0.innerText = forumsName;
    newCell_1.innerText = forumId;
    newCell_2.innerText = numberOfPosts;

    var editBtnId = 'editBtn_' + this.numOfRows;
    var activateBtnId = 'activateBtn_' + this.numOfRows;

    var isEnabled = this.auth.isUserAdmin();
    if (isEnabled) {
      var newCell_innerHtml = "<button class='btn btn-primary' id=" + editBtnId + "> Edit Forum </button> " +
        "<button class='btn btn-primary' id=" + activateBtnId + "> Go to Forum </button>";
    }
    else {
      var newCell_innerHtml = "<button class='btn btn-primary' id=" + editBtnId + " disabled> Edit Forum </button> " +
        "<button class='btn btn-primary' id=" + activateBtnId + "> Go to Forum </button>";
    }
    newCell_3.innerHTML = newCell_innerHtml;

  }
}

