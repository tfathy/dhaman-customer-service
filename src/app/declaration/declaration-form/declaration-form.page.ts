import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { error } from "selenium-webdriver";
import { BuyerService } from "src/app/services/buyer.service";
import { CurrencyService } from "src/app/services/currency.service";
import { DeclarationService } from "src/app/services/declaration.service";
import { LookUpService } from "src/app/services/look-up.service";
import { BuyerRequestModel } from "src/app/shared/models/buyer.request.model";
import { DeclarationResponseModel } from "src/app/shared/models/declaration.response.model";
import { ICurrency } from "src/app/shared/models/icurrency.model";
import { IPolocy } from "src/app/shared/models/policy";
import {
  getSessionInfo,
  sessionData,
} from "src/app/shared/shared/session.storage";

@Component({
  selector: "app-declaration-form",
  templateUrl: "./declaration-form.page.html",
  styleUrls: ["./declaration-form.page.scss"],
})
export class DeclarationFormPage implements OnInit {
  authToken: sessionData;
  model: DeclarationResponseModel = new DeclarationResponseModel();
  title = "Credit Limit";
  id: number;
  buyerList: BuyerRequestModel[] = [];
  currencyList: ICurrency[] = [];
  policyList:IPolocy[] = [];
  constructor(
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private declationService: DeclarationService,
    private currencyService: CurrencyService,
    private lookupServices: LookUpService,
    private router: Router
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
        this.queryMasterRecord();
      } else {
        console.log(
          "open in entery mode. you should pass -1 as a parameter to the save action"
        );
      }
    });
  }

  addDeclarationDetail() {
    if (!this.model.currency || !this.model.policyNo || !this.model.dcPeriod) {
      this.showToast("Fill in Required Fields first");
      return;
    }
    let masterRecord = this.composeParams();
    this.router.navigate(
      [
        "/",
        "credit-limit",
        "credit-limit-form",
        this.id,
        "declaration-detail",
        this.id,
        -1,
      ],
      {
        queryParams: {
          modelParam: masterRecord,
        },
        queryParamsHandling: "merge",
      }
    );
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

  private composeParams() {
    let currency = this.model.currency;
    let policyNo = this.model.policyNo;
    let dcPeriod = this.model.dcPeriod;
    let params = { currency: currency, policyNo: policyNo, dcPeriod: dcPeriod };
    return JSON.stringify(params);
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
  private populateCurrencies() {
    this.currencyService
      .findAll("Bearer " + this.authToken.token)
      .subscribe((data) => {
        this.currencyList = data;
      });
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
}
