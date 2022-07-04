import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/admin/user';
import { AuthService } from 'src/app/auth/auth.service';
import { PostPayload } from '../postPayload';
import { AddPostService } from '../services/add-post.service';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {


  addPostForm: FormGroup;
  postPayload: PostPayload;
  title = new FormControl('');
  body = new FormControl('');
  successSend: boolean;
  show: boolean;

  constructor(private addPostService: AddPostService , private router:Router , private authService:AuthService) { 
    this.addPostForm = new FormGroup({
      title: this.title,
      body:this.body,
    });
    this.postPayload = {
      id:0,
      content:'',
      title: '',
      username: '',
      lang: '',
      created_at: new Date(),
      user: new User(),
      
    }
    this.successSend = false;
    this.show = true;
  }

  ngOnInit(): void {
  }

  addPost(){
    this.postPayload.content = this.addPostForm.get('body')?.value;
    this.postPayload.title = this.addPostForm.get('title')?.value;
    this.postPayload.username = this.authService.getUsername();
    
    
    if(this.postPayload.content.includes('^[\u0621-\u064A\u0660-\u0669 ]+$'))
      this.postPayload.lang = 'ar';
    else
      this.postPayload.lang = 'en';
  
    
  
    
    
    this.addPostService.addPost(this.postPayload,this.postPayload.username).subscribe(data => {
      setTimeout(() => {
        this.successSend= false;
        this.show=true;
      }, 10000);
      this.router.navigateByUrl('/blog')
    },error =>{
      console.log('Error Response');
      this.router.navigateByUrl('/blog/add-post');
    }
    )
  }

  emailSendSuccess(): boolean{
    return this.successSend;
  }
  
  timeToSendAgain(){
    return this.show;
  }

}
