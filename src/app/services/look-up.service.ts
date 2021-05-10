import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { BuyerInPolicyModel } from "../shared/models/buyer-in-policy.model";
import { ICountry } from "../shared/models/country.model";
import { IBuyerInPolicy } from "../shared/models/IBuyerInPolicy";
import { IPolocy } from "../shared/models/policy";
import { PolicyResponseModel } from "../shared/models/policy.reponse.model";
import { IRelationDebtor } from "../shared/models/relationDebtor.model";
import { getSessionInfo } from "../shared/shared/session.storage";

@Injectable({
  providedIn: "root",
})
export class LookUpService {
  constructor(private http: HttpClient) {}

  findAllCountry(token: string): Observable<ICountry[]> {
    const headerInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http
      .get<ICountry[]>(
        `${environment.backendUrl}/crm-operations/lookup/country`,
        { headers: headerInfo }
      )
      .pipe(
        tap((data) =>
          data.sort((a, b) => {
            if (a.couShortNameE < b.couShortNameE) {
              return -1;
            }
            if (a.couShortNameE > b.couShortNameE) {
              return 1;
            }
          })
        )
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

  findAllCustomerPolicies(
    token: string,
    customerRef
  ): Observable<PolicyResponseModel[]> {
    const HeaderInfo = new HttpHeaders({
      Authorization: token,
    });
    return this.http
      .get<IPolocy[]>(
        `${environment.backendUrl}/crm-operations/lookup/policy/${customerRef}`,
        { headers: HeaderInfo }
      )
      .pipe(
        map((responseArray) => {
          return responseArray.map((record) => {
            return new PolicyResponseModel(
              record.contNo,
              record.contYear,
              record.contDate,
              record.policyPk.policyNo,
              record.policyPk.contApplicant,
              record.contCurrency
            );
          });
        })
      );
  }

  findBuyersInPolicy(
    token: string,
    policyNo: string
  ): Observable<BuyerInPolicyModel[]> {
    const HeaderInfo = new HttpHeaders({
      Authorization: token,
    });

    let no = policyNo.replace("/", "-");
    return this.http
      .get<IBuyerInPolicy[]>(
        `${environment.backendUrl}/crm-operations/lookup/buyer/${no}`,
        { headers: HeaderInfo }
      )
      .pipe(
        map((responseArray) => {
          return responseArray.map((record) => {
            return new BuyerInPolicyModel(
              record.buyerPk.policyNo,
              record.buyerPk.compRef,
              record.contNo,
              record.contYear,
              record.contDate,
              record.contCurrency,
              record.contApplicant,
              record.thirdParty,
              record.compNameE,
              record.compNameA,
              record.prmRate,
              record.creditLimit
            );
          });
        })
      );
  }
}
