import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { PostPayload } from '../blog/postPayload';
import { AddPostService } from '../blog/services/add-post.service';
import { PostService } from '../blog/services/post.service';
import { CommentPayload } from '../blog/sing-post/commentPayload';
import { AdminService } from './admin.service';
import { User } from './user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  posts!: Observable<Array<PostPayload>>;
  comments!: Observable<Array<CommentPayload>>;
  parmNum: number;
  @Input() username = '';
  user: User = new User();
  constructor(private postService: AddPostService,
    private postServices: PostService,
    private adminService: AdminService, 
    private activeRouter: ActivatedRoute ,
    private router:Router,
    private authService:AuthService) { 
    this.parmNum = 0;
  }

  ngOnInit(): void {
    this.posts = this.postService.getAllPosts();
    this.comments = this.postServices.getComments();
    this.activeRouter.params.subscribe(params =>{
      this.parmNum = params['id'];
    });
    
  }

  deletePost(id:Number){
    this.adminService.deletePost(id).subscribe(data =>{
      console.log("Success");
      this.router.navigateByUrl('/blog');
    },error => {
      console.log('Error');
      this.router.navigateByUrl('/admin');
      
    });
  }

  deleteComment(commentId: number){
    this.adminService.deleteComment(commentId).subscribe(data=>{
      window.location.reload();
    })
  }

  shit(){ // This method for testing the isUsernameAdmin() from AuthService for implementing Roles in my website 
          // just to manage the admins and regular users.
    console.log('Shit method');
      console.log(this.authService.isUsernameAdmin());
  }
  

}
