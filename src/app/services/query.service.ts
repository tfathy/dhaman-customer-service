import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApplicationStatus } from "../shared/models/application-status";

@Injectable({
  providedIn: "root",
})
export class QueryService {
  // api for query application status
  //http://localhost:9092/crm-operations/query/application-status/1558/1
  constructor(private http: HttpClient) {}

  findCustomerApplicationStatus(
    token: string,
    customerRef: string,
    status: String
  ): Observable<ApplicationStatus[]> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<ApplicationStatus[]>(
      `${environment.backendUrl}/crm-operations/query/application-status/${customerRef}/${status}`,
      { headers: headerInfo }
    );
  }

  findCustomerApplication(
    token: string,
    customerRef: string
  ): Observable<ApplicationStatus[]> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<ApplicationStatus[]>(
      `${environment.backendUrl}/crm-operations/query/customer-applications/${customerRef}`,
      { headers: headerInfo }
    );
  }
}
