import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IDeclaration } from '../shared/models/declaration';

@Injectable({
  providedIn: 'root'
})
export class DeclarationService {
  url = environment.backendUrl;
  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<IDeclaration[]>(this.url+'/declaration.json');
 }
}
