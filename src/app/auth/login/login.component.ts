import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AuthService } from '../auth.service';
import {LoginPayload} from './loginPayload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // loginFrom: FormGroup;
  
  loginFrom:FormGroup
  loginPayload: LoginPayload;
  itInCorrect: boolean;
  constructor(private authService:AuthService , private router:Router) {
    this.loginFrom = new FormGroup({ // i have to upgrade and give an regex expression pattern to do that.
      username: new FormControl('',[Validators.required,Validators.minLength(3)]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]) 
    },{updateOn:'blur'}); 
    
      this.loginPayload = {
        username: '',
        password: ''
      };
      this.itInCorrect = false;
   }

  ngOnInit(): void {
    
  }

  onSubmit(){
    
    
    this.loginPayload.username = this.loginFrom.get('username')?.value;
    this.loginPayload.password = this.loginFrom.get('password')?.value;
    
    this.authService.login(this.loginPayload.username,this.loginPayload.password).subscribe(data => {
      if (data) {
        console.log('login success');
        this.router.navigateByUrl('/');
      } else {
        console.log('Login failed');
        
      }
    },error => {
      this.itInCorrect = true;
    }
    );

  }

  itsCorrect(){
    return this.itInCorrect;
  }

}
