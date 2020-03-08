import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../services/auth.service";
import { Router, ActivatedRoute } from '@angular/router';
import { ForumService} from "../../services/forum.service";
import { PostsService } from "../../services/posts.service";

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

  returnURL: string;
  constructor(public auth: AuthService, public forumSer: ForumService,
              public postsSer: PostsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/posts';
    this.post.forumName = this.forumSer.getActiveForum()['forumName'];
    this.post.forumId = this.forumSer.getActiveForum()['forumId'];
    this.post.postParticipants.push(this.auth.getUserEmail());
  }

  createPost() {
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
  }

}
