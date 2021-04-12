import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApplicationStatus } from "../shared/models/application-status";
import { ContractSummary } from "../shared/models/contract-summary";
import { OverdueShipmentModel } from "../shared/models/overdue-shipment-model";

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

  findContractSummaryByCustomerRef(
    token: string,
    customerRef: string
  ): Observable<ContractSummary[]> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<ContractSummary[]>(
      `${environment.backendUrl}/crm-operations/query/contract-summary/${customerRef}`,
      { headers: headerInfo }
    );
  }

  findOverdueShipment(
    token: string,
    customerRef: number
  ): Observable<OverdueShipmentModel[]> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<OverdueShipmentModel[]>(
      `${environment.backendUrl}/crm-operations/query/overdue-ship/${customerRef}`,
      { headers: headerInfo }
    );
  }
}
