import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { ApplicationService } from "src/app/services/application.service";
import { ComprehensiveLimit } from "src/app/shared/models/comp-limit.model";
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
  applicationId;
  riskList: { riskRef: number; desce: string }[] = [
    { riskRef: 1, desce: "Commercial and Non-Commercial" },
    { riskRef: 2, desce: "Non-Commercial" },
    { riskRef: 3, desce: "Commercial" },
  ];
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private applicationService: ApplicationService
  ) {}

  async ngOnInit() {
    this.authToken = await getSessionInfo("authData");
  }
  ionViewWillEnter() {
    this.route.paramMap.subscribe((param) => {
      this.applicationId = param.get("applicationId");
      if (this.applicationId) {
        this.applicationService
          .findById("Bearer " + this.authToken.token, this.applicationId)
          .subscribe((data) => {
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
          }),
          (error) => {
            console.log(error);
          };
      }
    });
  }

  getSelectedDesc(id: number){
    let desce: string = '';
    if(id===1){
      desce = 'Commercial and Non-Commercial';
    }else if(id===2){
      desce = 'Non-Commercial';
    }else if(id ===3){
      desce = 'Commercial';
    }
    return desce;
  }
}
