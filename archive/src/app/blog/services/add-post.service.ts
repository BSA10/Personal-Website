import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PostPayload } from '../postPayload';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {
  private url = 'http://localhost:8080'
  constructor(private httpClient: HttpClient) { }

  addPost(postPayload: PostPayload , username:string){
    return this.httpClient.post('http://localhost:8080/api/post/addPost', postPayload , {params:new HttpParams().append('username',username)});
  }

  getAllPosts(): Observable<Array<PostPayload>>{
    return this.httpClient.get<Array<PostPayload>>("http://localhost:8080/api/post/all");
  }

  getPost(permaLink: Number):Observable<PostPayload>{
    return this.httpClient.get<PostPayload>('http://localhost:8080/api/post/get/' + permaLink);
  }

  

}
