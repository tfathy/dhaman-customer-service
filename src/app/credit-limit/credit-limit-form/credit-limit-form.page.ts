import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AlertController,
  LoadingController,  
  ToastController,
} from "@ionic/angular";
import { IonicSelectableComponent } from "ionic-selectable";
import { ApplicationService } from "src/app/services/application.service";
import { CurrencyService } from "src/app/services/currency.service";
import { ComprehensiveLimit } from "src/app/shared/models/comp-limit.model";
import { ICurrency } from "src/app/shared/models/icurrency.model";
import {
  sessionData,
  getSessionInfo,
} from "src/app/shared/shared/session.storage";

@Component({
  selector: "app-credit-limit-form",
  templateUrl: "./credit-limit-form.page.html",
  styleUrls: ["./credit-limit-form.page.scss"],
})
export class CreditLimitFormPage implements OnInit {
  authToken: sessionData;
  model: ComprehensiveLimit = new ComprehensiveLimit();
  title = "Credit Limit";
  applicationId: number;
  riskList: { riskRef: number; desce: string }[] = [
    { riskRef: 1, desce: "Commercial and Non-Commercial" },
    { riskRef: 2, desce: "Non-Commercial" },
    { riskRef: 3, desce: "Commercial" },
  ];
  currencyList: ICurrency[] = [];
  constructor(
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private applicationService: ApplicationService,
    private currencyService: CurrencyService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    this.loadingCtrl
      .create({
        message: "loading data ...",
      })
      .then(async (loadingElm) => {
        loadingElm.present();
       await getSessionInfo("authData").then((result) => {
          this.authToken = result;
          this.populateCurrencies();
          loadingElm.dismiss();
        });
      });
  }
  ionViewWillEnter() {
    this.route.paramMap.subscribe((param) => {
      this.applicationId = (param.get("applicationId") as unknown) as number;
      if (this.applicationId > 0) {
        this.queryMasterRecord();
      } else {
        console.log(
          "open in entery mode. you should pass -1 as a parameter to the save action"
        );
      }
    },error=>{
      console.log(error);
    });
  }
  private queryMasterRecord() {
    this.loadingCtrl
      .create({
        message: "please wait...",
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.applicationService
          .findById("Bearer " + this.authToken.token, this.applicationId)
          .subscribe(data => {
            this.model.clRef = data.clRef;
            this.model.currency = data.currency;
            this.model.customer = data.customer;
            this.model.hsCode = data.hsCode;
            this.model.riskRef = data.riskRef;
            this.model.status = data.status;
            this.model.transType = data.transType;
            this.model.whoColumns = data.whoColumns;
            this.model.comprehensiveLimitsDetailsEntity =
              data.comprehensiveLimitsDetailsEntity;
            loadingEl.dismiss();
          },error=>{
            console.log(error);
            loadingEl.dismiss();
          })
         
      });
  }
  private populateCurrencies() {
    this.currencyService
      .findAll("Bearer " + this.authToken.token)
      .subscribe(
        data => {
          console.log(data);
        this.currencyList = data;
      },error=>{
        console.log(error);
      });
  }
  getSelectedDesc(id: number) {
    let desce: string = "";
    if (id === 1) {
      desce = "Commercial and Non-Commercial";
    } else if (id === 2) {
      desce = "Non-Commercial";
    } else if (id === 3) {
      desce = "Commercial";
    }
    return desce;
  }

  currencyChange(event: { component: IonicSelectableComponent; value: any }) {
    console.log("Currency:", event.value);
  }
  addBuyer() {
    if (!this.model.currency || !this.model.riskRef) {
      this.showToast("Fill in Required Fields first");
      return;
    }
    let masterRecord = this.composeParams();
    this.router.navigate(
      [
        "/",
        "credit-limit",
        "credit-limit-form",
        this.applicationId,
        "buyer",
        this.applicationId,
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
  private composeParams() {
    let currency = this.model.currency;
    let riskRef = this.model.riskRef;
    let params = { currency: currency, riskRef: riskRef };
    return JSON.stringify(params);
  }
  openBuyerPage(detailId: number) {
    this.router.navigate([
      "/",
      "credit-limit",
      "credit-limit-form",
      this.applicationId,
      "buyer",
      this.applicationId,
      detailId,
    ]);
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

  async submit() {
    const alert = await this.alertCtrl.create({
      header: "Submit Transaction",
      message: "Would you like to submit the transaction?",
      buttons: [
        {
          text: "No",
        },
        {
          text: "Yes",
          handler: () => {
            this.submitTransaction(this.model);
          },
        },
      ],
    });
    await alert.present();
  }
  private submitTransaction(app: ComprehensiveLimit) {
    this.applicationService
      .submit("Bearer " + this.authToken.token, app.clRef, app)
      .subscribe((data) => {
        this.showToast("Transaction Submitted");
        this.router.navigate(["/", "credit-limit"]);
      },error=>{
        console.log(error);
      }
      );
  }
  back(){
    this.router.navigate(['/','credit-limit']);
  }
  saveUpdates(){
    if (!this.model.currency || !this.model.riskRef) {
      this.showToast("Fill in Required Fields first");
      return;
    }
    this.loadingCtrl
    .create({
      message: "posting updates ..",
    })
    .then((loadinElmnt) => {
      loadinElmnt.present();
      this.applicationService
        .update("Bearer " + this.authToken.token, this.model.clRef, this.model)
        .subscribe((responseData) => {
          loadinElmnt.dismiss();
          this.router.navigate(['/','credit-limit']);
          this.showToast("Record updated successfully");           
        },error=>{
          console.log(error);
          loadinElmnt.dismiss();
        });
    });
  }
}
