import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICreditLimit } from '../shared/models/credit-limit';

@Injectable({
  providedIn: 'root'
})
export class CreditLimitService {
  url = environment.backendUrl;
  constructor(private http: HttpClient) { }
  getAll(){
    return this.http.get<ICreditLimit[]>(this.url+'/credit-limit.json');
 }
 
}
