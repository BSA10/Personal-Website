import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  @Input() username:string ;

  constructor(private authService:AuthService) {
    this.username= this.authService.getUsername();
   }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

  isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  }
  isUsernameFound(){
    return this.authService.getUsername() != null;
  }
  isRoleAdmin(){

    
    return this.authService.isUsernameAdmin();
  }
}
