import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../admin/user';
import { AuthService } from '../auth/auth.service';
import { PostPayload } from './postPayload';
import { AddPostService } from './services/add-post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts!: Observable<Array<PostPayload>>;
  username: string;
  role? : string;
  user : User = new User();
  constructor(private postService:AddPostService,private authService:AuthService ) {
      this.username = '';
   }

  ngOnInit(): void {
    this.posts = this.postService.getAllPosts();
  }

  
}
