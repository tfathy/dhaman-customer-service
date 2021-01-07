import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IApplication } from '../shared/models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
url = environment.backendUrl;
  constructor(private http: HttpClient) { }

  getAll(){
     return this.http.get<IApplication>(this.url+'/application.json');
  }
}
