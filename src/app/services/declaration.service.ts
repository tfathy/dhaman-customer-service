import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
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
    });

    return this.http.get<DeclarationResponseModel[]>(
      `${environment.backendUrl}/crm-operations/declaration/customer/${compRef}`,
      { headers: headerInfo }
    );
  }

  findById(token: string, id): Observable<DeclarationResponseModel> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<DeclarationResponseModel>(
      `${environment.backendUrl}/crm-operations/declaration/${id}`,
      { headers: headerInfo }
    );
  }
}
