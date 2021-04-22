import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoadingController, ModalController } from "@ionic/angular";
import { of } from "rxjs";
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
  showSearchbar: boolean = false;
  queryText = "";
  ios: boolean;
  constructor(
    private router: Router,
    private declarationService: DeclarationService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
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
        ).subscribe(
          (data) => {
            this.declarations = data;
            loadingElement.dismiss();
          },
          (error) => {
            loadingElement.dismiss();
            console.log(error);
          }
        );
      });
  }
  createDeclaration() {
    this.router.navigate(["/", "declaration", "declaration-form"]);
/*
    getSessionInfo("customer").then((data) => {
      this.modalCtrl
        .create({
          component: AddDeclarationComponent,
          componentProps: {
            company: data,
            transType: 2,
            status: "SAV",
            whoColumns: new WhoColumns(
              new Date(),
              this.authToken.loginName,
              "",
              new Date(),
              "",
              ""
            ),
          },
        })
        .then((modalElm) => {
          modalElm.present();
          modalElm.onDidDismiss().then(dismissedData=>{
            console.log(dismissedData.data.saved);
            if(dismissedData.data.saved===true){
              console.log("data saved");
              this.ngOnInit();
            }
          })
        });
    });
*/
  }
  viewRecord(id) {
    console.log(id);
    this.router.navigate(["/", "declaration", "declaration-form", id]);
  }

  onCancelSearch() {
    of(false).subscribe((data) => {
      console.log(data);
      this.showSearchbar = data;
    });
  }

  findCustomer(event) {
    let query: string = event.detail.value;
    let tempAppData;
    if (!query) {
      this.ngOnInit();
    }
    let filteredData = query
      ? this.declarations.filter((item) =>
          item.declarationsDetailEntity?.some(
            (row) =>
              row.company?.compNameE.toLowerCase().indexOf(query.toLowerCase()) >
              -1
          )
        )
      : tempAppData;

    return of(filteredData).subscribe((data) => {
      console.log(data);
      this.declarations = data;
    });
  }

}
