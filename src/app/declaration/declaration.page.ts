import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { DeclarationService } from "../services/declaration.service";
import { DeclarationResponseModel } from "../shared/models/declaration.response.model";
import { getSessionInfo, sessionData } from "../shared/shared/session.storage";

@Component({
  selector: "app-declaration",
  templateUrl: "./declaration.page.html",
  styleUrls: ["./declaration.page.scss"],
})
export class DeclarationPage implements OnInit {
  declarations: DeclarationResponseModel[] = [];
  authToken: sessionData;
  constructor(
    private router: Router,
    private declarationService: DeclarationService,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    this.authToken = await getSessionInfo("authData");
    this.loadingCtrl
      .create({
        message: "loading ..please wait",
      })
      .then(async (loadingElement) => {
        loadingElement.present();
        await (
          await this.declarationService.findCustomerDelcarations(
            "Bearer " + this.authToken.token
          )
        ).subscribe((data) => {
          this.declarations = data;
          loadingElement.dismiss();
        },error=>{
          loadingElement.dismiss();
          console.log(error);
        });
      });
  }
  createDeclaration() {
    this.router.navigate(["/", "declaration", "declaration-form"]);
  }
  viewRecord(id) {
    console.log(id);
    this.router.navigate([
      "/",
      "declaration",
      "declaration-form",
      id,
    ]);
  }

}
