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
import { Router } from "@angular/router";

@Injectable()
export class CrmHttpInterceptor implements HttpInterceptor {
  constructor(private alertController: AlertController,private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
  
    return next.handle(req).pipe(
      catchError((err) => {
        console.log(err.status);
         if (err.status == 401) {
          this.showAlert(err.status,"Token Expired. Re-login to get new token");
            this.router.navigate(['/login']);
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
