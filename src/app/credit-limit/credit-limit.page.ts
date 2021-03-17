import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  Config,
  IonRouterOutlet,
  LoadingController,
  ModalController,
} from "@ionic/angular";
import { of } from "rxjs";


import {
  getSessionInfo,
  sessionData,
} from "src/app/shared/shared/session.storage";
import { ApplicationService } from "../services/application.service";
import { ComprehensiveLimit } from "../shared/models/comp-limit.model";

@Component({
  selector: "app-credit-limit",
  templateUrl: "./credit-limit.page.html",
  styleUrls: ["./credit-limit.page.scss"],
})
export class CreditLimitPage implements OnInit {
  authToken: sessionData;
  applicationData: ComprehensiveLimit[] = [];
  showSearchbar: boolean = false;
  queryText = "";
  ios: boolean;
  excludeTracks: any = [];

  constructor(
    private applicationService: ApplicationService,
    private router: Router,
    public config: Config,
    public modalCtrl: ModalController,
    public routerOutlet: IonRouterOutlet,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    // this.ios = this.config.get('mode') === 'ios';
    this.authToken = await getSessionInfo("authData");
    this.loadingCtrl
      .create({
        message: "Loading data .... please wait",
      })
      .then(async (loadingElement) => {
        loadingElement.present();
        (
          await this.applicationService.findAll(
            "Bearer " + this.authToken.token
          )
        ).subscribe(
          (data) => {
            console.log(data);
            this.applicationData = data;
            loadingElement.dismiss();
          },
          (error) => loadingElement.dismiss()
        );
      });
  }

  viewRecord(applicationId) {
    console.log(applicationId);
    this.router.navigate([
      "/",
      "credit-limit",
      "credit-limit-form",
      applicationId,
    ]);
  }
  createApp() {
    this.router.navigate(["/", "credit-limit", "credit-limit-form"]);
  }
  async doRefresh(event) {
    this.authToken = await getSessionInfo("authData");
    (
      await this.applicationService.findAll("Bearer " + this.authToken.token)
    ).subscribe((data) => {
      console.log(data);
      this.applicationData = data;
      event.target.complete();
    });
  }
  getRiskName(id): string {
    let output: string = "unknown";
    if (id) {
      if (id === 1) {
        output = "Commercial and Non-Commercial";
      } else if (id === 2) {
        output = "Non-Commercial";
      } else if (id === 3) {
        output = "Commercial";
      }
    }
    return output;
  }
  findCustomer(event) {
    let query: string = event.detail.value;
    let tempAppData;
    if (!query) {
      this.ngOnInit();
    }
    let filteredData = query
      ? this.applicationData.filter((item) =>
          item.comprehensiveLimitsDetailsEntity?.some(
            (row) =>
              row.cldDebtorNameEn.toLowerCase().indexOf(query.toLowerCase()) >
              -1
          )
        )
      : tempAppData;

    return of(filteredData).subscribe((data) => {
      console.log(data);
      this.applicationData = data;
    });

    /*
    this.authToken = await getSessionInfo("authData");
    this.loadingCtrl
      .create({
        message: "Searching .... please wait",
      })
      .then(async (loadingElmnt) => {
        loadingElmnt.present();
        (
          await this.applicationService.filterAll(
            "Bearer " + this.authToken.token,
            query
          )
        ).subscribe((data) => {
          console.log(data);
          this.applicationData = data;
          loadingElmnt.dismiss();
        } , err => {
          console.log(err);
          loadingElmnt.dismiss();
        }
        );
      });
      */
  }
  onCancelSearch(){
    of(false).subscribe(data=>{
      console.log(data);
       this.showSearchbar = data;

    }
      
       );
  }
}
