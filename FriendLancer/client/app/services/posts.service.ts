import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

class Post {
  postTitle: string;
  postId: string;
  forumId: string;
  forumName: string;
  postLocation: string;
  postParticipants: [string];
}

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  constructor(private http: HttpClient) {
  }

  createPost(postTitle: string, forumId: string, forumName:string, postLocation: string, postParticipants:[string]) {
    return this.http.post('http://localhost:3000/api/posts', {
      postTitle: postTitle,
      postLocation: postLocation,
      postId: this.generateId(),
      forumId: forumId,
      forumName: forumName,
      postParticipants: postParticipants
    });
  }

  editPost(postTitle: string, postId: string, forumId: string, forumName:string, postLocation: string, postParticipants:[string]) {
    return this.http.post('http://localhost:3000/api/posts/' + postId, {
      postId: postId,
      postTitle: postTitle,
      forumId: forumId,
      forumName: forumName,
      postLocation: postLocation,
      postParticipants: postParticipants
    });
  }

  getAllPostsByForumId(forumId: string) {
    return this.http.get<Post[]>('http://localhost:3000/api/posts/forumId/' + forumId);
  }

  getPostById(postId: string) {
    return this.http.get<Post>('http://localhost:3000/api/forums/' + postId)
  }

  generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}
