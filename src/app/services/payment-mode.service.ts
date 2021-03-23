import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IPaymentMode } from "../shared/models/payment.mode";

@Injectable({
  providedIn: "root",
})
export class PaymentModeService {
  constructor(private http: HttpClient) {}

  findAll(token: string): Observable<IPaymentMode[]> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<IPaymentMode[]>(
      `${environment.backendUrl}/crm-operations/paymode`,
      { headers: headerInfo }
    );
  }
}
