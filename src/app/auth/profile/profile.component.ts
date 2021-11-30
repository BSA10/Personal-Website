import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/admin/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  constructor(private router: Router , private authService:AuthService) { 
    this.user= {
      id: 0,
      username: '',
      first_name: '',
      email:'',
      password: ''
    }
  }

  ngOnInit(): void {
    if(this.authService.getUsername() != null){ 
      this.authService.getUserLoggedIn().subscribe(data=>{
        this.user = data as User;
      });
    }
  }

}
