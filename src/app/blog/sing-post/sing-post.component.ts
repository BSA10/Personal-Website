import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, FormGroupName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/admin/user';
import { AuthService } from 'src/app/auth/auth.service';
import { PostPayload } from '../postPayload';
import { AddPostService } from '../services/add-post.service';
import { PostService } from '../services/post.service';
import { CommentPayload } from './commentPayload';

@Component({
  selector: 'app-sing-post',
  templateUrl: './sing-post.component.html',
  styleUrls: ['./sing-post.component.css']
})
export class SingPostComponent implements OnInit {
  post: PostPayload ;
  permaLink: Number ;
  username: string;

  commentPayload: CommentPayload;
  addCommentForm: FormGroup;
  comment= new FormControl('');
  
  comments!: Array<CommentPayload>;
  user: User;

  buttonLoading?: HTMLElement;

  constructor(private rout: Router,private router: ActivatedRoute, private addPostService: AddPostService , private authService:AuthService, private postService:PostService) {
    this.username = this.authService.getUsername();

    this.post = {
      id: 0 ,
    content: '' ,
    title: '' ,
    username:  '',
    lang: '',
    created_at: new Date(),
    user: new User(),
    }
    this.permaLink = 0;

    this.commentPayload = {
      id: 0,
      content: '',
      created_at: new Date(),
      user : new User()
    }    
    this.addCommentForm = new FormGroup({
      comment: this.comment
    });
    // this.comments = [{
    //   id: 0,
    //   content: '',
    //   created_at: new Date(),
    //   user : new User()
    // }]
    this.user= {
      id: 0,
      username: '',
      first_name: '',
      last_name: '',
    }
    
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.permaLink = params['id'];
    });
    if(this.authService.getUsername() != null){ 
    this.authService.getUserLoggedIn().subscribe(data=>{
      this.user = data as User;
    });
  }
    
    this.addPostService.getPost(this.permaLink).subscribe((data:PostPayload) => {
      this.post = data;  
      this.comments = data.comments as Array<CommentPayload>;
      // console.log(data.comments?.map(data=>{return data.user}));
      // this.comments.map(data=> {data.user = data.user as User})
      
    },(err: any) => {
      console.log('Failure Response');
    })
    
  }

  addComment(){

    if(this.username === null){
      this.rout.navigateByUrl('/login');
    }

    else{ 
    this.loading();
    this.commentPayload.content = this.addCommentForm.get('comment')?.value
    
    this.postService.addComment(this.commentPayload,this.post.id,this.username).subscribe(data=>{
      // window.scrollTo(0,0);
      this.buttonLoading?.removeAttribute('disabled');
      this.addCommentForm.get('comment')?.setValue('');
      this.buttonLoading!.innerHTML = 'Add Comment';
      window.location.reload();
      console.log('Success');
    },error=>{
      console.log('Failed');
    })
  }
  }

  loading(){
    this.buttonLoading = document.getElementById('add-comment-button') as HTMLElement;
    this.buttonLoading.setAttribute('disabled','true');
    this.buttonLoading.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...'
  }

  arabicStyle(){
    // var test = document.getElementsByClassName('blog-title');
    // test[0].setAttribute('style','display:flex; justify-content:right;')
    document.getElementsByClassName('blog-title')[0].setAttribute('style','display:flex; justify-content:right;');
    document.getElementsByClassName('blog-name')[0].setAttribute('style','display:flex; justify-content:right;');
    document.getElementsByClassName('blog-createdAt')[0].setAttribute('style','display:flex; justify-content:right;');
    document.getElementsByClassName('blog-content')[0].setAttribute('style','display:flex; justify-content:right;');

  }

  hasComments(){
    
    if(this.post.comments?.length === 0)
      return false;
    else
      return true;
  }

  deleteComment(commentId:number){
    let confirmation = confirm('Are you sure you want to delete the comment?');

    if(confirmation == true){
    const username = this.authService.getUsername();
    
    this.postService.deleteComment(commentId , username).subscribe(data=>{
      window.location.reload();
    });
  }
    
  }

  isUserComment(){
    // if(this.comments)
  }

}
