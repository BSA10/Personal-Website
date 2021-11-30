import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = 'http://localhost:8080'
  constructor(private httpClient: HttpClient) { }


  deletePost(paramNum:Number){
    return this.httpClient.get(this.url+'/api/post/delete/'+paramNum);
  }

  deleteComment(commentId:number){
    return this.httpClient.get(this.url+'/api/post/delete/comment/'+commentId);
  }

}
