import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {  filter, map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ComprehensiveLimit } from "../shared/models/comp-limit.model";
import { ComprehensiveLimitsDetailsEntity } from "../shared/models/comprehensiveLimitsDetailsEntity.model";

import { getSessionInfo } from "../shared/shared/session.storage";

@Injectable({
  providedIn: "root",
})
export class ApplicationService {
  loginCustomer = {};
  url = environment.backendUrl;
  constructor(private http: HttpClient) {}

  async findAll(token: string): Promise<Observable<ComprehensiveLimit[]>> {
    let customer = await getSessionInfo("customer");
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
 let compRef = customer.compRef;
    return this.http
      .get<ComprehensiveLimit[]>(
        `${this.url}/crm-operations/application/compRef/${compRef}`,
        
        { headers: headerInfo }
      )
      .pipe(
         map(items => items.filter(item => item.status === 'SAV'))
       , map((responseArray) => {         
          return responseArray.map((record) => {            
            return new ComprehensiveLimit(
              record.clRef,
              record.transType,
              record.riskRef,
              record.hsCode,
              record.status,
              record.customer,
              record.currency,
              record.whoColumns,
              record.comprehensiveLimitsDetailsEntity,
              record.comprehensiveLimitsDetailsEntity.length
            );
          
          });
        })
        ,tap(result => result.sort( (a,b)=>  b.clRef -a.clRef

        )
        )
      );
  }

  async filterAll(
    token: string,
    queryText: string
  ): Promise<Observable<ComprehensiveLimit[]>> {
    let customer = await getSessionInfo("customer");
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    let text = queryText.toLowerCase();
    return this.http
      .post<ComprehensiveLimit[]>(
        this.url + "/crm-operations/application/compRef",
        customer,
        { headers: headerInfo }
      )
      .pipe(
        map((items) =>
          items.filter((item) =>
            item.comprehensiveLimitsDetailsEntity?.some(
              (row) => row.cldDebtorNameEn.toLowerCase().indexOf(text) > -1
            )
          )
        )
      );
  }

  findById(token: string, appid): Observable<ComprehensiveLimit> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<ComprehensiveLimit>(
      this.url + "/crm-operations/application/" + appid,
      { headers: headerInfo }
    );
  }

  findByCldId(token: string, cldId): Observable<ComprehensiveLimitsDetailsEntity> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<ComprehensiveLimitsDetailsEntity>(
      this.url + "/crm-operations/application/detail/" + cldId,
      { headers: headerInfo }
    );
  }

  update(token: string, appid,body: ComprehensiveLimit): Observable<ComprehensiveLimit> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.put<ComprehensiveLimit>(
      this.url + "/crm-operations/application/" + appid,body,
      { headers: headerInfo }
    );
  }

  updateDetail(token: string, appid,body: ComprehensiveLimitsDetailsEntity): Observable<ComprehensiveLimitsDetailsEntity> {
    console.log(">>>>>>>>>body=");
    console.log(body);
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.put<ComprehensiveLimitsDetailsEntity>(
      this.url + "/crm-operations/application/detail/" + appid,body,
      { headers: headerInfo }
    );
  }

  addDetail(token: string, body: ComprehensiveLimitsDetailsEntity): Observable<ComprehensiveLimitsDetailsEntity> {  
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.post<ComprehensiveLimitsDetailsEntity>(
      `${environment.backendUrl}/crm-operations/application/detail` ,body,
      { headers: headerInfo }
    );
  }

  save(token: string,body:ComprehensiveLimit):Observable<ComprehensiveLimit>{
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.post<ComprehensiveLimit>(`${environment.backendUrl}/crm-operations/application`,body,{headers: headerInfo});
  }

  submit(token: string, appid,body: ComprehensiveLimit): Observable<ComprehensiveLimit> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.put<ComprehensiveLimit>(
      this.url + "/crm-operations/application/submit/" + appid,body,
      { headers: headerInfo }
    );
  }
}
