import { HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController, AlertController } from "@ionic/angular";
import { first } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { UserInfoModel } from "../shared/models/user.info.model";
import { AppCredential } from "./app-credentials";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  creds = new AppCredential("", "");
  userInfo: UserInfoModel;
  submitted = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}


  ngOnInit() {}
  onLogin(form: NgForm) {   
    this.loadingCtrl
      .create({ message: "Authenticating .. please wait" })
      .then((loadingElement) => {
        loadingElement.present();
        this.authService
          .authLogin(this.creds.loginName, this.creds.password)
          .pipe(first())
          .subscribe((respData: HttpResponse<any>) => {
            console.log("respData>>>>>>>");
            console.log(respData);
            if(respData.ok){
               form.reset;  
            loadingElement.dismiss();            
            this.router.navigateByUrl("/home");
            }else{
              loadingElement.dismiss();              
              this.showAlert('Invalid username or password. Login denied');
              return;
            }
            
          }),
          (error) => {
            console.log("Login error >>" );
            console.log(error);
            loadingElement.dismiss();
            this.showAlert(error);
          };
      });
    }

    private showAlert(err: string) {
      this.alertCtrl
        .create({
          header: "Authentication Failed ",
          message: err,
          buttons: ["ok"],
        })
        .then((alertElemnt) => {
          alertElemnt.present();
        });
    }
}
