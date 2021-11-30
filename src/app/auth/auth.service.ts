import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { toTypeScript } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { SubscriptionLoggable } from 'rxjs/internal/testing/SubscriptionLoggable';
import { User } from '../admin/user';
import { JwtAutResponse } from './jwt-aut-response';
import { LoginPayload } from './login/loginPayload';
import { SignUpPayload } from './register/SignUpPayload';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:8080'
  user?: User ;
  isAdminRole = false;
  constructor(private httpClient: HttpClient ) {
    
   }


   signup(signUpPayload: SignUpPayload){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
        'Access-Control-Allow-Headers':'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      })
    };
     return this.httpClient.post(this.url+'/api/user/signup', signUpPayload,httpOptions);
   }

   login(username:string,password:string) : Observable<boolean>{
     
      return this.httpClient.post<JwtAutResponse>(this.url + '/authenticate', {username,password})
      .pipe(map(data => {
        localStorage.setItem('authenticationToken',data.token);
        localStorage.setItem('username',username);
        return true;
      }))
   }

   updateUser(updateProfile: User){
    return this.httpClient.post(this.url+'/api/user/update', updateProfile);
   }

   isLoggedIn() {
    // this.getUserByUsername(this.getUsername()).subscribe(data=>{
    //   if(data.role === 'ADMIN_ROLE')
    //     return this.isAdminRole = true;
    //   else
    //     return this.isAdminRole;
    // })
    return localStorage.getItem('authenticationToken') != null ;
  }


  logout(){
    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('username');
  }

  getUsername():string{
    const user = localStorage.getItem('username')!;
    return user;
  }

   getUserByUsername(username: string){
    let params = new HttpParams();
    params = params.append('username',username)    
    return this.httpClient.get<User>(this.url+'/api/user/getUser',{params:params});
  }

  getUserLoggedIn(){
    return this.httpClient.get<User>(this.url+'/api/user/getUser',{params:new HttpParams().append('username',this.getUsername())});
  }

  

  // getStringUsername():string{
  //   var ss = JSON.parse(localStorage.getItem('username') || '{}');
  //   return ss;
  // }

     isUsernameAdmin():boolean{
    
  
    //  let s =  this.getUser('BSA').subscribe(data=>{
    //    this.isAdminRole =true;
    //  })
     
     
     return this.isAdminRole;
    
    // console.log(this.user);
    // const promis2 = this.user?.role === 'ADMIN_ROLE';
    // console.log(this.isAdminRole);
    
  }

}
