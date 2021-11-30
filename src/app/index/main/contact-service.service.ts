import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactPayaload } from './contactPayload';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private url = 'http://localhost:8080'

  constructor(private httpClient: HttpClient) { }


  send(contactPayload: ContactPayaload){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
        'Access-Control-Allow-Headers':'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      })
    };
    return this.httpClient.post(this.url + "/feedback",contactPayload,httpOptions);
  }


}
