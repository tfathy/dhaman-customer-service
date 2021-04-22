import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DeclarationsDetailResponse } from "../shared/models/declaration-detail.response";
import { DeclarationResponseModel } from "../shared/models/declaration.response.model";
import { getSessionInfo } from "../shared/shared/session.storage";

@Injectable({
  providedIn: "root",
})
export class DeclarationService {
  constructor(private http: HttpClient) {}

  async findCustomerDelcarations(
    token: string
  ): Promise<Observable<DeclarationResponseModel[]>> {
    let customer = await getSessionInfo("customer");
    let compRef = customer.compRef;
    const headerInfo = new HttpHeaders({
      Authorization: token,
      observe: 'response'
    });

    return this.http.get<DeclarationResponseModel[]>(
      `${environment.backendUrl}/crm-operations/declaration/customer/${compRef}`,
      { headers: headerInfo }
    );
  }

  findById(token: string, id): Observable<DeclarationResponseModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
      observe: 'response'
    });
    return this.http.get<DeclarationResponseModel>(
      `${environment.backendUrl}/crm-operations/declaration/${id}`,
      { headers: headerInfo }
    );
  }

  findShipmentById(
    token: string,
    ddRef: number
  ): Observable<DeclarationsDetailResponse> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
      observe: 'response'
    });
    return this.http.get<DeclarationsDetailResponse>(
      `${environment.backendUrl}/crm-operations/declaration/detailbyid/${ddRef}`,
      { headers: headerInfo }
    );
  }

  create(token: string, body: DeclarationResponseModel) {
    const headerInfo = new HttpHeaders({
      Authorization: token,
      observe: 'response'
    });
    return this.http.post<DeclarationResponseModel>(
      `${environment.backendUrl}/crm-operations/declaration`,
      body,
      { headers: headerInfo }
    );
  }

  submit(
    token: string,
    body: DeclarationResponseModel,
    id: number
  ): Observable<DeclarationResponseModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
      observe: 'response'
    });
    return this.http.put<DeclarationResponseModel>(
      `${environment.backendUrl}/crm-operations/declaration/submit/${id}`,
      body, { headers: headerInfo  }
    );
  }
}
