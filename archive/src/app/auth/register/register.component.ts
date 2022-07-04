import { Component, OnInit } from '@angular/core';
import { AbstractControl, CheckboxRequiredValidator, FormBuilder, FormControl, FormGroup, NgControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SignUpPayload } from './SignUpPayload';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css',
  '../../../assets/css/loginStatic/fonts/material-icon/css/material-design-iconic-font.min.css',
  '../../../assets/css/loginStatic/css/style.css'
]
})
export class RegisterComponent implements OnInit {

  signUpForm: FormGroup;
  signUpPayload: SignUpPayload;

  constructor(private fromBuilder: FormBuilder , private authService: AuthService , private router: Router) {
    this.signUpForm = new FormGroup({
      first_name: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
      email: new FormControl('',[Validators.required,Validators.email,Validators.minLength(3),Validators.maxLength(60)]),
      username: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
      password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(30)]),
      confirm_password: new FormControl('',[Validators.required]), // ,Validators.pattern('^[A-Za-z][A-Za-z0-9@#%&*]+$')
      hasAcceptTerms: new FormControl(false,[Validators.requiredTrue])
    },{ updateOn: 'blur'});
      
    this.signUpPayload = {
      first_name: '',
    username: '',
    email: '',
    password: '',
    // confirmPassword: '',
    }
   }

  ngOnInit(): void {
    
  }

  // CheckFormErrors(){
  //   // console.log(this.signUpForm.updateOn);
    
  //   // console.log(this.signUpForm.get('username')?.value);
    
  //   if(this.signUpForm.invalid)
  //     return true;
  //   else
  //     return false;
  // }

  onSubmit(){
    // if(this.signUpForm.errors){
      this.signUpPayload.username = this.signUpForm.get('username')?.value
      this.signUpPayload.first_name = this.signUpForm.get('first_name')?.value
      this.signUpPayload.email = this.signUpForm.get('email')?.value
      this.signUpPayload.password = this.signUpForm.get('password')?.value
      // this.signUpPayload.confirmPassword = this.signUpForm.get('confirmPassword')?.value
  
      this.authService.signup(this.signUpPayload).subscribe(data => {
        console.log('success');
        this.router.navigateByUrl('/login');
      }, error => {
        console.log('Failed');
      });
    // }
    // else
      // console.log('This is not valid');
      
    
  }

  // checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
  //   let pass = this.signUpForm.get('password')?.value;
  //   let confirmPass = this.signUpForm.get('confirm_password')?.value
  //   return pass === confirmPass ? null : { notSame: true }
  // }
  

}
