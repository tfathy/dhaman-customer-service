import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import { IonicSelectableComponent } from "ionic-selectable";
import { error } from "selenium-webdriver";
import { BuyerService } from "src/app/services/buyer.service";
import { CurrencyService } from "src/app/services/currency.service";
import { DeclarationService } from "src/app/services/declaration.service";
import { LookUpService } from "src/app/services/look-up.service";
import { BuyerRequestModel } from "src/app/shared/models/buyer.request.model";
import { CurrencyResponseModel } from "src/app/shared/models/currency.model";
import { DeclarationsDetailResponse } from "src/app/shared/models/declaration-detail.response";
import { DeclarationResponseModel } from "src/app/shared/models/declaration.response.model";
import { ICurrency } from "src/app/shared/models/icurrency.model";
import { IPolocy } from "src/app/shared/models/policy";
import { PolicyResponseModel } from "src/app/shared/models/policy.reponse.model";
import { WhoColumns } from "src/app/shared/models/who-columns.model";
import {
  getSessionInfo,
  sessionData,
} from "src/app/shared/shared/session.storage";
import { AddDeclarationComponent } from "../add-declaration/add-declaration.component";

@Component({
  selector: "app-declaration-form",
  templateUrl: "./declaration-form.page.html",
  styleUrls: ["./declaration-form.page.scss"],
})
export class DeclarationFormPage implements OnInit {
  authToken: sessionData;
  model: DeclarationResponseModel = new DeclarationResponseModel();
  newModel: DeclarationResponseModel;
  title = "Credit Limit";
  id: number;
  selectedCurrency: CurrencyResponseModel;
  buyerList: BuyerRequestModel[] = [];
  currencyList: ICurrency[] = [];
  policyList: PolicyResponseModel[] = [];
  selectedPolicyNo: string;
  selectedPeriod: string;
  selectedContNo: number;
  selectedContYear: number;
  pageStaus = "new";
  constructor(
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private declationService: DeclarationService,
    private currencyService: CurrencyService,
    private lookupServices: LookUpService,
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    await getSessionInfo("authData").then((result) => {
      this.authToken = result;
      this.populatePolicyList();
    });
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    this.route.paramMap.subscribe((param) => {
      this.id = (param.get("id") as unknown) as number;
      console.log("this.id =" + this.id);
      if (this.id > 0) {
        this.pageStaus = "query";
        this.queryMasterRecord();
      }
    });
  }

  addDeclarationDetail() {
    if (this.pageStaus === "new") {
      if (!this.selectedPolicyNo || !this.selectedPeriod) {
        this.showToast("Fill in Required Fields first");
        return;
      }
    } else {
      if (!this.model.policyNo || !this.model.dcPeriod) {
        this.showToast("Fill in Required Fields first");
        return;
      }
    }

    let idx = 0;
    let mode = this.model.dcRef ? "detail" : "masterDetail";
    let period = new Date("01/" + this.selectedPeriod);
    getSessionInfo("customer").then((data) => {
      let dtl = [
        new DeclarationsDetailResponse(
          null,
          this.model.dcRef,
          null,
          0,
          0,
          null,
          null,
          null,
          0,
          0,
          this.model.whoColumns
        ),
      ];
      if (mode === "masterDetail") {
        this.newModel = new DeclarationResponseModel(
          null,
          dtl,
          data,
          2,
          this.selectedPolicyNo,
          period,
          this.selectedCurrency,
          "SAV",
          this.selectedContNo,
          this.selectedContYear,
          new WhoColumns(
            new Date(),
            this.authToken.loginName,
            "",
            new Date(),
            "",
            ""
          )
        );
      } else {
        idx = this.model.declarationsDetailEntity.length ;
        this.model.declarationsDetailEntity.push(
          new DeclarationsDetailResponse(
            null,
            this.model.dcRef,
            null,
            0,
            0,
            null,
            null,
            null,
            0,
            0,
            this.model.whoColumns
          )
        );
        this.newModel = this.model;
      }

      this.modalCtrl
        .create({
          component: AddDeclarationComponent,
          componentProps: { model: this.newModel, mode: mode, idx: idx },
        })
        .then((modalElm) => {
          modalElm.present();
          modalElm.onDidDismiss().then((dismissedData) => {
            console.log(dismissedData.data.saved);
            if (dismissedData.data.saved === true) {
              console.log("data saved");
              this.id = dismissedData.data.newid;
              console.log("this.id=" + this.id);
              this.queryMasterRecord();
            }
          });
        });
    });   
  }

  openDeclationDetailPage(detailId: number) {
    this.router.navigate([
      "/",
      "declaration",
      "declaration-form",
      this.id,
      "buyer",
      this.id,
      detailId,
    ]);
  }

  
  private populatePolicyList() {
    getSessionInfo("customer").then((data) => {
      let customerRef = data.compRef;
      this.lookupServices
        .findAllCustomerPolicies("Bearer " + this.authToken.token, customerRef)
        .subscribe(
          (responseData) => {
            console.log("policyList");
            console.log(responseData);
            this.policyList = responseData;
          },
          (error) => {
            this.showToast("Error: cannot fetch Customer policies");
            console.log(error);
          }
        );
    });
  }
  private queryMasterRecord() {
    this.declationService
      .findById("Bearer " + this.authToken.token, this.id)
      .subscribe((data) => {
        console.log(data);
        this.model.dcRef = data.dcRef;
        this.model.company = data.company;
        this.model.currency = data.currency;
        this.model.policyNo = data.policyNo;
        this.model.dcPeriod = data.dcPeriod;
        this.model.status = data.status;
        this.model.transType = data.transType;
        this.model.whoColumns = data.whoColumns;
        this.model.status = data.status;
        this.model.declarationsDetailEntity = data.declarationsDetailEntity;
      }),
      (error) => {
        console.log(error);
      };
  }
  

  private showToast(msg: string) {
    this.toastCtrl
      .create({
        message: msg,
        duration: 1000,
        position: "middle",
      })
      .then((toastEl) => {
        toastEl.present();
      });
  }

  onItemChange(event: { component: IonicSelectableComponent; value: any }) {
    console.log(event.value);
    this.selectedCurrency = new CurrencyResponseModel(event.value.contCurrency);
    this.selectedPolicyNo = event.value.policyNumber;
    this.selectedContNo = event.value.contNo;
    this.selectedContYear = event.value.contYear;
  }
}
