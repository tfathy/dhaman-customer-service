import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
_isAuthorized = false;
  constructor() { }

  getUserName():Observable<string>{
    return  new Observable( observer => {
      observer.next( 'Tarek' ) 
      observer.complete()
   });
  }
  getCompanyName(){
    return new Observable<string>(observer=>{
      observer.next('Company Name');
      observer.complete();
    })
  }

  get isAuthorized(){
    return this._isAuthorized
  }

  set isAuthorized(value:boolean){
    this._isAuthorized = value;
  }
  getUserInfo(){
    return new Observable(observer=>{
      observer.next('tarek');
      observer.complete();
    })
  }
}
