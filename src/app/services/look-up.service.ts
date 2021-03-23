import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ICountry } from "../shared/models/country.model";
import { IRelationDebtor } from "../shared/models/relationDebtor.model";

@Injectable({
  providedIn: "root",
})
export class LookUpService {
  constructor(private http: HttpClient) {}

  findAllCountry(token: string): Observable<ICountry[]> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<ICountry[]>(
      `${environment.backendUrl}/crm-operations/lookup/country`,
      { headers: headerInfo }
    );
  }

  findAllBuyerRelation(token: string): Observable<IRelationDebtor[]> {
    const HeaderInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<IRelationDebtor[]>(
      `${environment.backendUrl}/crm-operations/lookup/buyer-relation`,
      { headers: HeaderInfo }
    );
  }
}
