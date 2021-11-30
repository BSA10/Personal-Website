import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService , private router:Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):Observable<boolean> | Promise<boolean> | boolean
  {
    
    let isAuthenticated = this.authService.isLoggedIn();
    // let isAuthenticated = true;
    if(isAuthenticated){
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }

  }
  
}
