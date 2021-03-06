import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
import { ApplicationService } from "src/app/services/application.service";
import { ComprehensiveLimit } from "src/app/shared/models/comp-limit.model";

import { SegmentChangeEventDetail } from "@ionic/core";
import { ICountry } from "src/app/shared/models/country.model";
import { IonicSelectableComponent } from "ionic-selectable";
import {
  sessionData,
  getSessionInfo,
} from "src/app/shared/shared/session.storage";
import { ComprehensiveLimitsDetailsEntity } from "src/app/shared/models/comprehensiveLimitsDetailsEntity.model";
import { PaymentModeService } from "src/app/services/payment-mode.service";
import { IPaymentMode } from "src/app/shared/models/payment.mode";
import { LookUpService } from "src/app/services/look-up.service";
import { IRelationDebtor } from "src/app/shared/models/relationDebtor.model";
import { WhoColumns } from "src/app/shared/models/who-columns.model";
import { error } from "selenium-webdriver";

@Component({
  selector: "app-buyer",
  templateUrl: "./buyer.page.html",
  styleUrls: ["./buyer.page.scss"],
})
export class BuyerPage implements OnInit {
  segmentModel = "basicInfo";
  authToken: sessionData;
  model: ComprehensiveLimit = new ComprehensiveLimit();
  buyer: ComprehensiveLimitsDetailsEntity = new ComprehensiveLimitsDetailsEntity();
  title = "Buyer Info";
  countryList: ICountry[] = [];
  paymodeList: IPaymentMode[] = [];
  buyerRelationList: IRelationDebtor[] = [];
  cldRef: number; // record id for the master
  clRef: number; // record id for the detail

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private paymodeService: PaymentModeService,
    private loadingCtrl: LoadingController,
    private lookupService: LookUpService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  async ngOnInit() {
    await getSessionInfo("authData").then((result) => {
      this.authToken = result;
      this.populateCountryList();
      this.populatePaymentMode();
      this.populateBuyerRelationList();
    });

    this.route.paramMap.subscribe((param) => {
      this.cldRef = (param.get("cldId") as unknown) as number;
      if (this.cldRef) {
        if (this.cldRef > 0) {
          this.openForView();
        } else {
          this.openForInsertMasterDetail();
        }
      }
    },error=>{
      console.log(error);
    });
  }
  private openForInsertMasterDetail() {
    // read the query parameter from the url. the query parameter is the master record object
    // store it in this.model
    console.log("openForInsertMasterDetail");

    this.route.queryParams.subscribe((params) => {
      console.log(params.modelParam);
      this.model = JSON.parse(params.modelParam);
      console.log(this.model);
    },error=>{
      console.log(error);
    });
  }
  populateBuyerRelationList() {
    this.lookupService
      .findAllBuyerRelation("Bearer " + this.authToken.token)
      .subscribe((data) => {
        this.buyerRelationList = data;
      },error=>{
        console.log(error);
      });
  }

  populateCountryList() {
    this.lookupService
      .findAllCountry("Bearer " + this.authToken.token)
      .subscribe((data) => {
        console.log(data);
        this.countryList = data;
      },error=>{
        console.log(error);
      });
  }
  populatePaymentMode() {
    this.paymodeService
      .findAll("Bearer " + this.authToken.token)
      .subscribe((data) => {
        console.log(data);
        this.paymodeList = data;
      },error=>{
        console.log(error);
      });
  }

  openForView() {
    this.applicationService
      .findByCldId("Bearer " + this.authToken.token, this.cldRef)
      .subscribe((responseData) => {
        this.buyer = responseData;
      },error=>{
        console.log(error);
      });
  }

  save() {
    this.route.paramMap.subscribe((param) => {
      this.cldRef = (param.get("cldId") as unknown) as number; // primary key of details
      this.clRef = (param.get("applicationId") as unknown) as number; // primary key of master
      if (this.cldRef > 0 && this.clRef > 0) {
        this.updateDetailsRecord(this.cldRef);
      } else if (this.cldRef < 0 && this.clRef > 0) {
        this.addDetailRecord();
      } else if (this.cldRef < 0 && this.clRef < 0) {
        this.addMasterDetails();
      }
    });
  }
  private addMasterDetails() {
    console.log(this.buyer.cldAvgShip,this.buyer.clsCreditLimitRequested );

    if(this.buyer.cldAvgShip > this.buyer.clsCreditLimitRequested){
      this.showAlert("The avarage shipment value cannot be more that the credit limit value.");
      return false;
    }
    const whocolumns: WhoColumns = {
      updUid: this.authToken.loginName,
      lastUpdDate: new Date(),
      lastUpdPc: "Mobile",
      lastUpdUid: this.authToken.loginName,
      updDate: new Date(),
      updPc: "Mobile",
    };

    this.loadingCtrl
      .create({
        message: "Saving transaction ...",
      })
      .then((loadingEl) => {
        loadingEl.present();
        getSessionInfo("customer").then((data) => {
          this.model.customer = data;
          this.model.whoColumns = whocolumns;
          this.model.status = "SAV";
          if (!this.model.comprehensiveLimitsDetailsEntity) {
            this.model.comprehensiveLimitsDetailsEntity = [];
          }
          this.model.comprehensiveLimitsDetailsEntity.push(this.buyer);
          console.log(this.model);
          this.applicationService
            .save("Bearer " + this.authToken.token, this.model)
            .subscribe(resData => {
              this.showToast("Transaction saved successfully");
              this.router.navigate(["/", "credit-limit"]);
              loadingEl.dismiss();
            },error=>{
              console.log(error);
              loadingEl.dismiss();
            });
        });
      });
  }

  updateDetailsRecord(id) {
    console.log(this.buyer.cldAvgShip,this.buyer.clsCreditLimitRequested );

    if(this.buyer.cldAvgShip > this.buyer.clsCreditLimitRequested){
      this.showAlert("The avarage shipment value cannot be more that the credit limit value.");
      return false;
    }
    this.loadingCtrl
      .create({
        message: "posting updates ..",
      })
      .then((loadinElmnt) => {
        loadinElmnt.present();
        this.applicationService
          .updateDetail("Bearer " + this.authToken.token, id, this.buyer)
          .subscribe((responseData) => {
            loadinElmnt.dismiss();
            this.showToast("Record updated successfully");           
          },error=>{
            console.log(error);
            loadinElmnt.dismiss();
          });
      });
  }

  addDetailRecord() {
    console.log(this.buyer.cldAvgShip,this.buyer.clsCreditLimitRequested );

    if(this.buyer.cldAvgShip > this.buyer.clsCreditLimitRequested){
      this.showAlert("The avarage shipment value cannot be more that the credit limit value.");
      return false;
    }
    this.loadingCtrl
      .create({
        message: "adding new buyer ..",
      })
      .then((loadingElement) => {
        loadingElement.present();
        this.buyer.clRef = this.clRef;
        this.applicationService
          .addDetail("Bearer " + this.authToken.token, this.buyer)
          .subscribe(respData => {
            loadingElement.dismiss();
            this.showToast("New Buyer addedd successfully");
            this.router.navigate([
              "/",
              "credit-limit",
              "credit-limit-form",
              this.clRef,
            ]);
          }, error=>{
            console.log(error);
            loadingElement.dismiss();
          });
      });

    // in case of succcess navigate back and show success toast
  }

  onSegmentChanged(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log("Segment changed", event.detail);
    this.segmentModel = event.detail.value;
  }
  countryChange(event: { component: IonicSelectableComponent; value: any }) {}

  showToast(msg: string) {
    this.toastCtrl
      .create({
        message: msg,
        duration: 2000,
        position: "middle",
      })
      .then((toastElemnt) => {
        toastElemnt.present();
      });
  }
  showAlert(msg: string){
    this.alertCtrl.create({
      message: msg,
      buttons:[{text: 'OK'}]
    }).then(alertElm=>{
      alertElm.present();
    })
  }
  back(){
    this.router.navigate(['/','credit-limit','credit-limit-form',this.clRef]);
  }
  outstandingChange(event){
    if(!event.value){
      this.buyer.outstandingReason1 = '';
    }
  }
  outstandingChange2(event){
    if(!event.value){
      this.buyer.outstandingReason2 = '';
    }
  }
  outstandingChange3(event){
    if(!event.value){
      this.buyer.outstandingReason3 = '';
    }
  }
}
