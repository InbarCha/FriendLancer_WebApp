import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

class Post {
  postTitle: string;
  postSubject: string;
  postId: string;
  forumId: string;
  forumName: string;
  postLocation: string;
  postParticipants: Array<string>;
}

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  constructor(private http: HttpClient) {
  }

  createPost(postTitle: string, postSubject: string, forumId: string, forumName:string, postLocation: string, postParticipants:[string]) {
    return this.http.post('http://localhost:3000/api/posts', {
      postTitle: postTitle,
      postSubject: postSubject,
      postLocation: postLocation,
      postId: this.generateId(),
      forumId: forumId,
      forumName: forumName,
      postParticipants: postParticipants
    });
  }

  editPost(postTitle: string, postSubject: string, postId: string, forumId: string, forumName:string, postLocation: string, postParticipants:[string]) {
    return this.http.post('http://localhost:3000/api/posts/' + postId, {
      postId: postId,
      postTitle: postTitle,
      postSubject: postSubject,
      forumId: forumId,
      forumName: forumName,
      postLocation: postLocation,
      postParticipants: postParticipants
    });
  }

  getAllPostsByForumId(forumId: string) {
    return this.http.post<Post[]>('http://localhost:3000/api/posts/forums', {
      forumId: forumId
    });
  }

  getPostById(postId: string) {
    return this.http.get<Post>('http://localhost:3000/api/forums/' + postId)
  }

  generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  setActivePost(post: Post) {
    localStorage.setItem('currentPost', JSON.stringify(post));
  }

  deactivatePost() {
    localStorage['currentPost'] = '';
  }

  getActivePost() {
    return JSON.parse(localStorage['currentPost']);
  }
}

