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

   isLoggedIn() { // I have to update it
    /**
     * TODO:
     * Write a better method to track the user login in.
     */
    
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


     isUsernameAdmin():boolean{
      /**
       * TODO:
       * Change the rules and try to make every user have a authorites.
       * Get the authorites from the backend.
       */
     return this.isAdminRole;
    
  }

}
