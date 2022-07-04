import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { User } from 'src/app/admin/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  permaLink: number;
  changePasswordParam: any;
  user: User;
  successfulChange: any;
  updateForm:FormGroup;
  countDown:Subscription | undefined;
  counter = 5;
  tick = 1000;

  constructor(private router:Router , private routerActive: ActivatedRoute , private authService:AuthService) {
    this.permaLink =0;
    
    this.updateForm = new FormGroup({
      id: new FormControl(),
      first_name:new FormControl(),
      last_name: new FormControl(),
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      repeat_password: new FormControl(),
    })

    this.user= {
      id: 0,
      username: '',
      first_name: '',
      last_name: '',
      email:'',
      password:'',
    }
   }

  ngOnInit(): void {
    this.routerActive.params.subscribe(params => {
      this.permaLink = params['id'];
    });
    
    
    
    this.routerActive.params.subscribe(params => {
      this.changePasswordParam = params['password'];
      if(this.changePasswordParam === undefined)
        this.changePasswordParam = false;
    });

    this.authService.getUserLoggedIn().subscribe(data=>{
      this.user = data as User;
    });
  }

onSubmit(){
 
  if(this.updateForm.get('first_name')?.value != null && this.updateForm.get('first_name')?.value != '')
    this.user.first_name = this.updateForm.get('first_name')?.value;
  if(this.updateForm.get('last_name')?.value != null && this.updateForm.get('last_name')?.value != '')
    this.user.last_name = this.updateForm.get('last_name')?.value;
  if(this.updateForm.get('username')?.value != null && this.updateForm.get('username')?.value != '')
    this.user.username = this.updateForm.get('username')?.value;
  if(this.updateForm.get('email')?.value != null && this.updateForm.get('email')?.value != '')
    this.user.email = this.updateForm.get('email')?.value;
  if(this.updateForm.get('password')?.value != null && this.updateForm.get('password')?.value != '')
    this.user.password = this.updateForm.get('password')?.value;
  
  this.authService.updateUser(this.user).subscribe(data=>{
    this.successfulChange = true;
    this.countDown = timer(0,this.tick).subscribe(() => --this.counter)
    setTimeout(() => {
      this.router.navigateByUrl('/profile');
    }, 5000);    
  })

}

}
