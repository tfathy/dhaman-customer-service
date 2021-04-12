import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable, throwError as observableThrowError } from "rxjs";
import { getSessionInfo } from "./shared/shared/session.storage";
import { catchError } from "rxjs/operators";

@Injectable()
export class CrmHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
  //  req = this.addAuthentication(req);
    return next.handle(req).pipe(
      catchError((err) => {
        console.log(err.status);
         if (err.status == 401) {
            console.log("login failed");
          }
        return observableThrowError(err);
      })
    );
  }

  addAuthentication(req: HttpRequest<any>): HttpRequest<any> {
    const headers: any = {};
    let authToken;
    getSessionInfo("authData").then((data) => {
      authToken = data.token;
    });
    if (authToken) {
      headers["authorization"] = authToken; // add it to the header
      req = req.clone({
        setHeaders: headers,
      });
    }
    return req;
  }
}
