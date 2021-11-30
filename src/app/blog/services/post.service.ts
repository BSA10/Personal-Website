import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentPayload } from '../sing-post/commentPayload';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'http://localhost:8080'
  constructor(private httpClient: HttpClient) { }

  addComment(commentPayload:CommentPayload,postId:number,username:string){
    
    const commentParams = new HttpParams()
            .append('postId',postId)
            .append('username',username);
    return this.httpClient.post(this.url+'/api/post/addComment',commentPayload,{params:commentParams});
  }

  deleteComment(commentId: number,username:string){
    return this.httpClient.post(this.url + '/api/post/deleteComment',null , 
                  {params: new HttpParams().append('commentId',commentId)
                                          .append('username',username)});
  }

  getComments() : Observable<Array<CommentPayload>>{
    return this.httpClient.get<Array<CommentPayload>>(this.url + '/api/post/comments');
  }
  


}
