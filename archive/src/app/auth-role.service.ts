import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRoleService implements CanActivate{

  constructor(private authService: AuthService , private router:Router) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):Observable<boolean> | Promise<boolean> | boolean
  {
    
    let isUsernameAdmin = this.authService.isUsernameAdmin();
    
    if(isUsernameAdmin){
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }

  }
}
