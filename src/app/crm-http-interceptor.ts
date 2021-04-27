import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable, throwError as observableThrowError } from "rxjs";

import { catchError } from "rxjs/operators";
import { AlertController } from "@ionic/angular";

@Injectable()
export class CrmHttpInterceptor implements HttpInterceptor {
  constructor(private alertController: AlertController) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
  
    return next.handle(req).pipe(
      catchError((err) => {
        console.log(err.status);
         if (err.status == 401) {
            console.log("CrmHttpInterceptor>>login failed: invalid username or password");
          }
          if(err.status == 503){
            this.showAlert(err.statusText,"Internal Server error:"+err.status);
          }else{
            this.showAlert(err.statusText,err.status); 
          }

        return observableThrowError(err);
      })
    );
  }
  private showAlert(err: string, hdrtxt) {
    this.alertController
      .create({
        header: hdrtxt,
        message: err,
        buttons: ["ok"],
      })
      .then((alertElemnt) => {
        alertElemnt.present();
      });
  }
  
}
