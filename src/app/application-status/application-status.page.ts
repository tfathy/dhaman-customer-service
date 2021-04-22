import { Component, OnInit } from "@angular/core";
import { of } from "rxjs";
import { ApplicationStatus } from "../shared/models/application-status";
import { getSessionInfo, sessionData } from "../shared/shared/session.storage";
import { SegmentChangeEventDetail } from "@ionic/core";
import { QueryService } from "../services/query.service";
import { LoadingController, ModalController } from "@ionic/angular";
import { AppStatusDetailComponent } from "./app-status-detail/app-status-detail.component";

@Component({
  selector: "app-application-status",
  templateUrl: "./application-status.page.html",
  styleUrls: ["./application-status.page.scss"],
})
export class ApplicationStatusPage implements OnInit {
  authToken: sessionData;
  allApplications: ApplicationStatus[] = [];
  inProcessApplications: ApplicationStatus[] = [];
  rejectedApplications: ApplicationStatus[] = [];
  acceptedApplications: ApplicationStatus[] = [];
  showSearchbar: boolean = false;
  queryText = "";
  ios: boolean;
  segmentModel = "inProcess";

  constructor(
    private queryService: QueryService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    let compRef;
    this.loadingCtrl
      .create({
        message: "loading applications ... please wait",
      })
      .then((loadingElement) => {
        loadingElement.present();
        getSessionInfo("authData").then((info) => {
          this.authToken = info;
          getSessionInfo("customer").then((customerInfo) => {
            compRef = customerInfo.compRef;
            this.queryService
              .findCustomerApplication(
                "Bearer " + this.authToken.token,
                compRef
              )
              .subscribe((responseData) => {
                this.allApplications = responseData;
                this.inProcessApplications = responseData.filter(data=> data.currentStatus === 1);
                this.acceptedApplications = responseData.filter(data=> data.currentStatus ===2);
                this.rejectedApplications = responseData.filter(data=> data.currentStatus === 3 || !data.currentStatus );
                loadingElement.dismiss();
              });
          });
        });
      });
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
    } /*
    let filteredData = query
      ? this.allApplications.filter((item) =>
          item.comprehensiveLimitsDetailsEntity?.some(
            (row) =>
              row.cldDebtorNameEn.toLowerCase().indexOf(query.toLowerCase()) >
              -1
          )
        )
      : tempAppData;

    return of(filteredData).subscribe((data) => {
      console.log(data);
      this.allApplications = data;
    }
    );
    */
  }
  onSegmentChanged(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log("Segment changed", event.detail);
    this.segmentModel = event.detail.value;
  }

  doRefresh(event){
    let compRef;
    getSessionInfo("customer").then((customerInfo) => {
      compRef = customerInfo.compRef;
      this.queryService
        .findCustomerApplication(
          "Bearer " + this.authToken.token,
          compRef
        )
        .subscribe((responseData) => {
          this.allApplications = responseData;
          this.inProcessApplications = responseData.filter(data=> data.currentStatus === 1);
          this.rejectedApplications = responseData.filter(data=> data.currentStatus ===3);
          event.target.complete();
        });
    });
  }
  openModal(app: ApplicationStatus){
    this.modalCtrl.create({
      component: AppStatusDetailComponent,
      componentProps: {
        "applicationNo":app.applicationsRoPk.applicationNo,
        "cntDescription":app.cntDescription,
        "applicationDate": app.applicationDate,
        "countRisksCovered":app.countRisksCovered,
        "importerNameE": app.importerNameE,
        "importerCountryE":app.importerCountryE,
        "applicationCurrency":app.applicationCurrency,
        "applicationAmt":app.applicationAmt,
        "applValueUsd":app.applValueUsd,
        "decisionAmount":app.decisionAmount,
        "decisionCurrency":app.decisionCurrency,
        "creditPeriod":app.creditPeriod,
        "term":app.term,
        "currentStatus":app.currentStatus,
        "ocSpecialConditions":app.ocSpecialConditions
      }
    }).then(async madalEl=>{
      return await madalEl.present();
    })
  }
}
