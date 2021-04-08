import { Component, OnInit } from "@angular/core";
import { of } from "rxjs";
import { ApplicationStatus } from "../shared/models/application-status";
import { getSessionInfo, sessionData } from "../shared/shared/session.storage";
import { SegmentChangeEventDetail } from "@ionic/core";
import { QueryService } from "../services/query.service";
import { LoadingController } from "@ionic/angular";

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
    private loadingCtrl: LoadingController
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
                this.rejectedApplications = responseData.filter(data=> data.currentStatus ===3);
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
}
