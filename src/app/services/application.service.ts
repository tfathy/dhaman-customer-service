import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { filter, flatMap, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ComprehensiveLimit } from "../shared/models/comp-limit.model";

import { getSessionInfo } from "../shared/shared/session.storage";

@Injectable({
  providedIn: "root",
})
export class ApplicationService {
  loginCustomer = {};
  url = environment.backendUrl;
  constructor(private http: HttpClient) {}

  async findAll(token: string): Promise<Observable<ComprehensiveLimit[]>> {
    console.log("findAll called token=" + token);
    console.log(this.url + "/crm-operations/application/compRef");
    let customer = await getSessionInfo("customer");
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });

    return this.http.post<ComprehensiveLimit[]>(
      this.url + "/crm-operations/application/compRef",
      customer,
      { headers: headerInfo }
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
            item.comprehensiveLimitsDetailsEntity?.some((row) =>
             row.cldDebtorNameEn.toLowerCase().indexOf(text) > -1
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
}
