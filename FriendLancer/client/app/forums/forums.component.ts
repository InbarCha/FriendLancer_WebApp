import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import { AuthService} from "../services/auth.service";
import { Router, ActivatedRoute } from '@angular/router';
import { ForumService } from "../services/forum.service";

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css']
})
export class ForumsComponent implements OnInit {
  numOfRows: number;
  returnURL: string;
  constructor(public auth: AuthService, public forumSer: ForumService, private router: Router, private route: ActivatedRoute, private elRef:ElementRef) { }
  ngOnInit(): void {
    this.numOfRows = 1;
    this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.forumSer.getAllForums().subscribe(data=> {
      data.forEach(forum => {
        this.addRow(forum.forumName, forum.forumId, 0);
        var currentRow = this.numOfRows;
        var router = this.router;
        document.getElementById('editBtn_' + currentRow).addEventListener('click', function() {
          var table: HTMLTableElement = <HTMLTableElement> document.getElementById("myTableForums");
          var rows = table.rows;
          var forumId = rows[currentRow].cells[1].innerText;
          console.log(forumId);
          var forumName = rows[currentRow].cells[0].innerText;
          console.log(forumName);

          console.log(JSON.stringify({forumName: forumName, forumId: forumId}));
          localStorage.setItem('currentForum', JSON.stringify({forumName: forumName, forumId: forumId}));
          router.navigate(['/forums/update']);
        });
        this.numOfRows += 1;
      });
    });
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

    var btnId = 'editBtn_' + this.numOfRows;
    var newCell_innerHtml = "<button class='btn btn-primary editBtns' id=" + btnId + "> Edit Forum </button>"
    newCell_3.innerHTML = newCell_innerHtml;
  }
}

