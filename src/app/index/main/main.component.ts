import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from './contact-service.service';
import { ContactPayaload } from './contactPayload';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  contactFrom: FormGroup;
  contactPayload: ContactPayaload;
  successSend: boolean;
  show: boolean;
  buttonLoading?: HTMLElement;
  successfulSend: any;
  errorMessage: any;
  constructor(private contactService: ContactService , private router:Router) {
      this.contactFrom = new FormGroup({
        email: new FormControl(''),
        title: new FormControl(''),
        message:new FormControl('')
      });
      this.contactPayload = {
        getFrom:'',
        subject: '',
        message: '',
        created_at: new Date
      }
      this.successSend = false;
      this.show = true;

      
      
   }

  ngOnInit(): void {
  }


  OnSubmit(){
    this.loading();
    this.contactPayload.getFrom =  this.contactFrom.get('email')?.value
    this.contactPayload.subject = this.contactFrom.get('title')?.value
    this.contactPayload.message = this.contactFrom.get('message')?.value
    this.contactPayload.created_at = new Date();
    this.contactService.send(this.contactPayload).subscribe(data =>{
      this.buttonLoading?.removeAttribute('disabled');
      this.contactFrom.get('email')?.setValue('');
      this.contactFrom.get('title')?.setValue('');
      this.contactFrom.get('message')?.setValue('');
      this.buttonLoading!.innerHTML = 'Submit';
      // window.location.reload();
      // this.successSend = true;
        // this.show = false;
        // this.router.navigateByUrl('/');
        // setTimeout(() => {
        //   this.successSend= false;
        //   this.show=true;
        // }, 10000);
        this.successfulSend = true;
        setTimeout(() => {
          window.location.reload();
        }, 3000)
    }, error => {
        this.errorMessage = true;
        this.buttonLoading?.removeAttribute('disabled');
        this.contactFrom.get('email')?.setValue('');
        this.contactFrom.get('title')?.setValue('');
        this.contactFrom.get('message')?.setValue('');
        this.buttonLoading!.innerHTML = 'Submit';
        console.log('Feedback faild');
      });  
    }

    emailSendSuccess(): boolean{
      return this.successSend;
    }
    
    timeToSendAgain(){
      return this.show;
    }
      
    showCv(){
      window.open("http://localhost:8080/CV","_blank");
    }
      

    loading(){
      this.buttonLoading = document.getElementById('submit-feedback') as HTMLElement;
      this.buttonLoading.setAttribute('disabled','true');
      this.buttonLoading.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...'
    }
    

    

  }


