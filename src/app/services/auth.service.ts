import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { Storage } from "@capacitor/storage";
import { BehaviorSubject, from, Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { UserModel } from "../shared/models/user.model";

export interface AuthResponseData {
  token: string;
  email: string;
  refreshToken: string;
  expires: string;
  userId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService implements OnDestroy {
  private _user = new BehaviorSubject<UserModel>(null);
  private activeLogoutTimer: any;
  public springToken: string = "";

  constructor(private http: HttpClient) {}

  authLogin(loginEmail: string, loginPassword: string) {
    return this.http
      .post<any>(
        `${environment.backendUrl}/crm-security/users/login`,
        {
          loginName: loginEmail,
          customerPass: loginPassword,
        },
        { observe: "response" }
      )
      .pipe(tap((res) => this.setUserData(res)));
  }
  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.userId;
        } else {
          return null;
        }
      })
    );
  }
  get token() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
    );
  }

  private setUserData(userData: HttpResponse<AuthResponseData>) {
    console.log(userData);
    let currentime = new Date().getTime();
    let ms = currentime + +userData.headers.get("expires") * 1000;

    const expirationTime = new Date(currentime + +ms);

    console.log(expirationTime);

    const user = new UserModel(
      userData.headers.get("loginName"),
      userData.headers.get("userId"),
      userData.headers.get("compNameE"),
      userData.headers.get("compNameA"),
      userData.headers.get("compRef"),
      userData.headers.get("token"),
      expirationTime
    );

    this.storeAuthData(
      userData.headers.get("userId"),
      userData.headers.get("token"),
      expirationTime.toISOString(),
      userData.headers.get("loginName"),
      userData.headers.get("compNameA"),
      userData.headers.get("compNameE"),
      userData.headers.get("compRef"),

      userData.headers.get("compcitya"),
      userData.headers.get("compcitye"),
      userData.headers.get("compfax"),
      userData.headers.get("comppoboxa"),
      userData.headers.get("comppoboxe"),
      userData.headers.get("comptel"),
      userData.headers.get("comptel2"),
      userData.headers.get("compwebaddress"),
      userData.headers.get("coushortnamee")
    );

    this._user.next(user);
    this.autoLogout(user.tokenDuration);
  }

  private async storeAuthData(
    userId: string,
    token: string,
    tokenExpirationDate: string,
    loginName: string,
    compNameA: string,
    compNameE: string,
    compRef: string,
    compcitya: string,
    compcitye,
    compfax,
    comppoboxa,
    comppoboxe,
    comptel,
    comptel2,
    compwebaddress,
    coushortnamee
    
  ) {
    const data = JSON.stringify({
      userId: userId,
      token: token,
      tokenExpirationDate: tokenExpirationDate,
      loginName: loginName,
      compNameA: compNameA,
      compNameE: compNameE,
      compRef: compRef
    });

    Storage.set({ key: "authData", value: data });

    const loginCustomer = JSON.stringify({
      compNameA: compNameA,
      compNameE: compNameE,
      compRef: compRef,
      compcitya: compcitya,
      compcitye: compcitye,
      compfax: compfax,
      comppoboxa: comppoboxa,
      comppoboxe: comppoboxe,
      comptel: comptel,
      comptel2: comptel2,
      compwebaddress: compwebaddress,
      coushortnamee: coushortnamee
    });
    Storage.set({ key: "customer", value: loginCustomer });

    await sessionStorage.setItem("loginName", loginName);
    await sessionStorage.setItem("compNameA", compNameA);
    await sessionStorage.setItem("compNameE", compNameE);
    await sessionStorage.setItem("compRef", compRef);

    await sessionStorage.setItem("compcitya",compcitya);
    await sessionStorage.setItem("compcitye", compcitye);
    await sessionStorage.setItem("compfax", compfax);
    await sessionStorage.setItem("comppoboxa", comppoboxa);
    await sessionStorage.setItem("comppoboxe", comppoboxe);

    await sessionStorage.setItem("comptel", comptel);
    await sessionStorage.setItem("comptel2", comptel2);
    await sessionStorage.setItem("compwebaddress", compwebaddress);
    await sessionStorage.setItem("coushortnamee", coushortnamee);

  }

  private autoLogout(duration: number) {
    console.log("*******autoLogout executed********");
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  logout() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
     this._user.next(null);
    // Storage.remove({ key: "authData" });
  }

  autoLogin() {
    return from(Storage.get({ key: "authData" })).pipe(
      map((storedDate) => {
        if (!storedDate || !storedDate.value) {
          console.log("******** cannot find storage authData***** ");
          return null;
        }
        const parsData = JSON.parse(storedDate.value) as {
          token: string;
          tokenExpirationDate: string;
          userId: string;
          loginName: string;
          compNameA: string;
          compNameE: string;
          compRef: string;
        };
        const tokenExpirationTime = new Date(parsData.tokenExpirationDate);
        if (tokenExpirationTime <= new Date()) {
          return null;
        }
        const user = new UserModel(
          parsData.loginName,
          parsData.userId,
          parsData.compNameE,
          parsData.compNameA,
          parsData.compRef,
          parsData.token,
          tokenExpirationTime
        );
        console.log("User stored is:" + user);
        return user;
      }),
      tap((user) => {
        if (user) {
          this._user.next(user);
          this.autoLogout(user.tokenDuration);
        }
      }),
      map((user) => {
        return !!user; // return true if there is a value in the user object
      })
    );
  }

  ngOnDestroy(): void {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
  }
}
