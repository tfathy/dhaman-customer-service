import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ComprehensiveLimit } from '../shared/models/comp-limit.model';

import { ICompany } from '../shared/models/company.model';
import { getSessionInfo } from '../shared/shared/session.storage';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  loginCustomer: ICompany;
url = environment.backendUrl;
  constructor(private http: HttpClient) { }

  findAll(token: string){
    const headerInfo = new HttpHeaders({
      "Authorization": token
    });
    this.setLoginCustomer();
    console.log("********this.loginCustomer *******");
    console.log(this.loginCustomer);
     return this.http.post<ComprehensiveLimit[]>(this.url+'/crm-operations/application/compRef',this.loginCustomer,{headers: headerInfo});
  }
  findById(token: string,appid){
    const headerInfo = new HttpHeaders({
      "Authorization": token
    });
    return this.http.get<ComprehensiveLimit>(this.url+'/crm-operations/application/'+appid,{headers: headerInfo});
  }

  async setLoginCustomer(){
    this.loginCustomer =  await getSessionInfo("customer");
  }
}
