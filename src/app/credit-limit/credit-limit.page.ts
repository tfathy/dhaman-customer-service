import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  Config,  
  LoadingController,
  ModalController,
  ToastController,
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
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

   ngOnInit() {   
  }
  async ionViewWillEnter(){
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
          (error) => {
            loadingElement.dismiss();
            this.showToast(error.statusText);
          }
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
    this.router.navigate(["/", "credit-limit", "credit-limit-form", -1]);
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
  }
  onCancelSearch() {
    of(false).subscribe((data) => {
      console.log(data);
      this.showSearchbar = data;
    });
  }
  async submit(slidingItem, app) {
    const alert = await this.alertCtrl.create({
      header: "Submit Transaction",
      message: "Would you like to submit the transaction?",
      buttons: [
        {
          text: "No",
          handler: () => {
            slidingItem.close();
          },
        },
        {
          text: "Yes",
          handler: () => {
            slidingItem.close();
            this.submitTransaction(app);
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
  back(){
    this.router.navigate(['/','home']);
  }
}
