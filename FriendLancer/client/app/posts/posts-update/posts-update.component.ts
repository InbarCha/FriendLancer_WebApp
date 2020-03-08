import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../services/auth.service";
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from "../../services/posts.service";
import {ForumService} from "../../services/forum.service";
import { MeetPlaceService} from "../../services/meet-place.service";

@Component({
  selector: 'app-posts-update',
  templateUrl: './posts-update.component.html',
  styleUrls: ['./posts-update.component.css']
})
export class PostsUpdateComponent implements OnInit {
  post: any = {
    postTitle: '',
    postSubject: '',
    postId: '',
    forumName:'',
    forumId: '',
    postLocation:'',
    postParticipants: new Array<string>()
  };
  returnURL: string;
  constructor(public auth: AuthService, public postSer: PostsService, private router: Router, private route: ActivatedRoute, private meetPlaceSer: MeetPlaceService) { }

  ngOnInit(): void {
    this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/posts';
    this.post = this.postSer.getActivePost();
    this.initPostLocationSelect();
  }

  EditPost() {
    var select: HTMLSelectElement = <HTMLSelectElement> document.getElementById("selectPostLocation");
    this.post.postLocation = select.options[select.selectedIndex].value;
    this.postSer.editPost(this.post.postTitle, this.post.postSubject, this.post.postId, this.post.forumId, this.post.forumName,
      this.post.postLocation, this.post.postParticipants).subscribe(data=> {
      if (data['message'] === false) {
        // if invalid login, reset the form
        this.post.postTitle = '';
        this.post.postSubject = '';
        this.post.postLocation = '';
        this.postSer.deactivatePost();
      }
      else {
        this.postSer.deactivatePost();
        this.router.navigateByUrl(this.returnURL);
      }
    });
  }

  initPostLocationSelect() {
    this.meetPlaceSer.getAllMeetPlaces().subscribe(data => {
      data.forEach(meetPlace => {
        var meetPlaceName = meetPlace.meetPlaceName;
        var meetPlaceLocation = meetPlace.meetPlaceLocation;
        var newOption = meetPlaceName + " (" + meetPlaceLocation + ")";

        var select: HTMLSelectElement = <HTMLSelectElement>document.getElementById("selectPostLocation");
        select.options.add(new Option(newOption, meetPlaceName));
      });
    });
  }
}
