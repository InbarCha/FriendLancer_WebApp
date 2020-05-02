import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../services/auth.service";
import { Router, ActivatedRoute } from '@angular/router';
import { ForumService} from "../../services/forum.service";
import { PostsService } from "../../services/posts.service";
import { MeetPlaceService } from "../../services/meet-place.service";

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit {
  post: any = {
    postTitle: '',
    postId: '',
    postSubject: '',
    forumId: '',
    forumName: '',
    postLocation: '',
    postParticipants: new Array<string>(),
  };
  withSuggestion: boolean;
  returnURL: string;
  constructor(public auth: AuthService, public forumSer: ForumService, public meetPlaceSer: MeetPlaceService,
              public postsSer: PostsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/posts';
    this.post.forumName = this.forumSer.getActiveForum()['forumName'];
    this.post.forumId = this.forumSer.getActiveForum()['forumId'];
    this.post.postParticipants.push(this.auth.getUserEmail());
    this.withSuggestion = false;

    this.initPostLocationSelect();

    this.postsSer.getAllPosts().subscribe(posts=> {
      var currentUser = this.auth.getUserEmail();
      var favoriteLocations = Array<string>();
      var favoriteLocationsCountPerUser = Array<number>();

      posts.forEach(post=> {
        var postParticipants = post.postParticipants;
        postParticipants.forEach(participant=> {
          if (participant === currentUser) {
            //the location already exists in favoriteLocations array
            var index = favoriteLocations.indexOf(post.postLocation);
            if (index >= 0) {
              favoriteLocationsCountPerUser[index]++;
            }
            //the location doesn't exist in favoriteLocations array
            else {
              favoriteLocations.push(post.postLocation);
              favoriteLocationsCountPerUser.push(1);
            }
          }
        });
      });

      if (favoriteLocations.length > 0) {
        var index = 0;
        var max = favoriteLocationsCountPerUser[0];
        for(var i=0; i<favoriteLocationsCountPerUser.length; i++) {
          if (favoriteLocationsCountPerUser[i] > max) {
            max = favoriteLocationsCountPerUser[i];
            index = i;
          }
        }

        this.post.postLocation = favoriteLocations[index];
        this.withSuggestion = true;
      }
    });
  }

  createPost() {
    var select: HTMLSelectElement = <HTMLSelectElement> document.getElementById("selectPostLocation");
    this.post.postLocation = select.options[select.selectedIndex].value;
    this.postsSer.createPost(this.post.postTitle, this.post.postSubject, this.post.forumId, this.post.forumName,
      this.post.postLocation, this.post.postParticipants).subscribe(data => {
        if (data['message'] === false) {
          // if invalid login, reset the form
          this.post.postTitle = '';
          this.post.postId = '';
          this.post.postLocation = '';
          this.post.postParticipants = '';
          this.post.postSubject = '';
        } else {
          // if we get here, there is no error, the return is valid
          // Let's first save the info into local storage for later use. We can parse this back
          // into an object later
          localStorage.setItem('currentPost', JSON.stringify(data));
          // route user to the return URL
          this.router.navigateByUrl(this.returnURL);
        }
      });

    this.postsSer.sendPostToFacebook(this.post.postTitle, this.post.postSubject, this.post.forumName, this.post.postLocation).subscribe(data=> {
      console.log(data);
    });
  }

  initPostLocationSelect() {
    this.meetPlaceSer.getAllMeetPlaces().subscribe(data=> {
      data.forEach(meetPlace => {
        var meetPlaceName = meetPlace.meetPlaceName;
        var meetPlaceLocation = meetPlace.meetPlaceLocation;
        var newOption = meetPlaceName + " (" + meetPlaceLocation + ")";

        var select: HTMLSelectElement = <HTMLSelectElement> document.getElementById("selectPostLocation");
        select.options.add(new Option(newOption, meetPlaceName));
      });
    });
  }

}
