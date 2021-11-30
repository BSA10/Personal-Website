import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardService } from './auth-guard.service';
import { EditProfileComponent } from './auth/edit-profile/edit-profile.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddPostComponent } from './blog/add-post/add-post.component';
import { BlogComponent } from './blog/blog.component';
import { SingPostComponent } from './blog/sing-post/sing-post.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {path:'',component:IndexComponent},
  {path:'admin',component:AdminComponent, canActivate: [AuthGuardService]},
  {path:'blog',component:BlogComponent },
  {path:'blog/add-post',component:AddPostComponent , canActivate: [AuthGuardService]},
  {path:'post/:id', component: SingPostComponent},
  {path:'profile',component: ProfileComponent},
  {path:'edit-profile',component: EditProfileComponent},
  {path:'edit-profile/:password',component: EditProfileComponent},
  {path:'login' , component:LoginComponent},
  {path:'signup' , component:RegisterComponent},
  {path:'**',redirectTo:'',pathMatch:'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
