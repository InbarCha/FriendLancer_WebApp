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

class NumOfPosts {
  _id: string;
  numOfPosts: number;
}

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  facebookPageAccessToken = "EAACwl16xoDsBACXRmYIcIYmmySAViHTtwaGquIYcVZC9m8Nte8pVywcwbsXCEZBB8shZCZCPFHJ6ZCsZAFlxI6rRNNCEuCc4CIerZCb7rGimS46BFqMRRbf8VADjHj2AlFo48istZAOBDaTvAcBz4f4hvqy1ZCokYax9GsrfVVpGOZAX5u5DEYDU6Y";
  facebookPageId = "102130368083020";

  constructor(private http: HttpClient) {
  }

  createPost(postTitle: string, postSubject: string, forumId: string, forumName:string, postLocation: string, postParticipants:Array<string>) {
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

  sendPostToFacebook(postTitle: string, postSubject: string, forumName:string, postLocation: string) {
    var url = "https://graph.facebook.com/" + this.facebookPageId + "/feed?access_token=" + this.facebookPageAccessToken;
    var newPostString = "A new post has been created! | " +
                        "Post Title: " + postTitle + " | " +
                        "Post Subject: " + postSubject + " | "+
                        "Forum Name: " + forumName + " | "+
                        "Post Location: " + postLocation;
    return this.http.post(url, {
      message : newPostString
    });
  }

  editPost(postTitle: string, postSubject: string, postId: string, forumId: string, forumName:string, postLocation: string, postParticipants:Array<string>) {
    return this.http.post<Post>('http://localhost:3000/api/posts/' + postId, {
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


  getAllPosts() {
    return this.http.get<Post[]>('http://localhost:3000/api/posts');
  }

  getPostById(postId: string) {
      return this.http.post<Post>('http://localhost:3000/api/posts/postId', {
        postId: postId
      });
  }

  generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  setActivePost(post: Post) {
    console.log("Setting currentPost: " + JSON.stringify(post));
    localStorage.setItem('currentPost', JSON.stringify(post));
  }

  deactivatePost() {
    localStorage['currentPost'] = '';
  }

  getActivePost() {
    return JSON.parse(localStorage['currentPost']);
  }

  deletePost(postId: string) {
    return this.http.post('http://localhost:3000/api/posts/postDelete', {
      postId: postId
    });
  }

  groupByForumIdAndCount() {
    return this.http.get<NumOfPosts[]>('http://localhost:3000/api/posts/postsGroupBy');
  }

  groupByForumNameAndCount() {
    return this.http.get<NumOfPosts[]>('http://localhost:3000/api/posts/postsGroupByForumName');
  }

  groupByPostLocationAndCount() {
    return this.http.get<NumOfPosts[]>('http://localhost:3000/api/posts/postsGroupByPostLocation');
  }

  searchPost(postTitle: string, postId: string, postLocation: string, forumName: string) {
    var query = {};
    if (postTitle != '' && postId != '' && postLocation != '') {
      query = {
        postId: postId,
        postTitle: postTitle,
        postLocation: postLocation,
        forumName: forumName
      }
    }
    else if (postTitle != '' && postId != '') {
      query = {
        postId: postId,
        postTitle: postTitle,
        forumName: forumName
      }
    }
    else if (postTitle != '' && postLocation != '') {
      query = {
        postTitle: postTitle,
        postLocation: postLocation,
        forumName: forumName
      }
    }
    else if (postLocation != '' && postId != '') {
      query = {
        postId: postId,
        postLocation: postLocation,
        forumName: forumName
      }
    }
    else if (postLocation != '') {
      query = {
        postLocation: postLocation,
        forumName: forumName
      }
    }
    else if (postTitle != '') {
      query = {
        postTitle: postTitle,
        forumName: forumName
      }
    }
    else if (postId != '') {
      query = {
        postId: postId,
        forumName: forumName
      }
    }

    return this.http.post<Post[]>('http://localhost:3000/api/posts/postsSearch', query);
  }
}

