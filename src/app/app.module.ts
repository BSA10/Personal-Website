import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './index/header/header.component';
import { IndexComponent } from './index/index.component';
import { MainComponent } from './index/main/main.component';
import { FooterComponent } from './index/footer/footer.component';
import { BlogComponent } from './blog/blog.component';
import { AddPostComponent } from './blog/add-post/add-post.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientInterceptor } from './http-client-interceptor';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SingPostComponent } from './blog/sing-post/sing-post.component';
import { AdminComponent } from './admin/admin.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { EditProfileComponent } from './auth/edit-profile/edit-profile.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    IndexComponent,
    MainComponent,
    FooterComponent,
    BlogComponent,
    AddPostComponent,
    SingPostComponent,
    AdminComponent,
    AdminHeaderComponent,
    ProfileComponent,
    EditProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    PdfViewerModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
