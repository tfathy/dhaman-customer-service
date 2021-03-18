import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ICurrency } from "../shared/models/icurrency.model";

@Injectable({
  providedIn: "root",
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  findAll(token: string): Observable<ICurrency[]> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<ICurrency[]>(
      `${environment.backendUrl}/crm-operations/currency`,
      { headers: headerInfo }
    );
  }
}
