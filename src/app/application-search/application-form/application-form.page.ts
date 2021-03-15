import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { ApplicationService } from "src/app/services/application.service";

import {  map, tap } from "rxjs/operators";
import { getSessionInfo, sessionData } from "src/app/shared/shared/session.storage";
import { ComprehensiveLimit } from "src/app/shared/models/comp-limit.model";

@Component({
  selector: "app-application-form",
  templateUrl: "./application-form.page.html",
  styleUrls: ["./application-form.page.scss"],
})
export class ApplicationFormPage implements OnInit {
  authToken: sessionData;
  app={
    clRef:'',
    transType:'',
    riskRef:'',
    hsCode:'',
    status:'',
    customer:null,
    currency:null   

  }
  title='New Application';
  selectedApplication: ComprehensiveLimit;
  applications: ComprehensiveLimit[] = [];
  applicationId;
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
    });
    console.log(this.applicationId);
    this.applicationService
      .findAll("Bearer " + this.authToken.token)
      .pipe(
        map((items) => items.filter((item) => item.clRef === this.applicationId))
        ,tap( row =>{console.log(row)})
      )
      .subscribe(data=>{
        console.log(data);
      });
  }

  getApplication(id: number) {
    return this.applications.find((app: ComprehensiveLimit) => app.clRef === id);
  }

}
