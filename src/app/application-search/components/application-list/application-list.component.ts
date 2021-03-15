import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IonItemSliding } from "@ionic/angular";
import { ApplicationService } from "src/app/services/application.service";
import { ComprehensiveLimit } from "src/app/shared/models/comp-limit.model";

import {
  getSessionInfo,
  sessionData,
} from "src/app/shared/shared/session.storage";

@Component({
  selector: "app-application-list",
  templateUrl: "./application-list.component.html",
  styleUrls: ["./application-list.component.scss"],
})
export class ApplicationListComponent implements OnInit {
  authToken: sessionData;
  applicationData: ComprehensiveLimit[] = [];  
  constructor(
    private applicationService: ApplicationService,
    private router: Router
  ) {}

  async ngOnInit() {
    console.log("ng on init");
    this.authToken = await getSessionInfo("authData");
    this.applicationService
      .findAll("Bearer " + this.authToken.token)
      .subscribe((data) => {
        console.log(data);
        this.applicationData = data;
      });
  }

  onEdit(applicationId, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate([
      "/",
      "application-search",
      "application-form",
      applicationId,
    ]);
  }
  createApp() {
    this.router.navigate(["/", "application-search", "application-form"]);
  }
  async doRefresh(event){
    this.authToken = await getSessionInfo("authData");
    this.applicationService
      .findAll("Bearer " + this.authToken.token)
      .subscribe((data) => {
        console.log(data);
        this.applicationData = data;
        event.target.complete();
      });
  }
   getRiskName(id): string{
    let output: string = 'unknown';
    if(id){
      if(id ===  1) {
        output = 'Commercial and Non-Commercial';
      }else if(id===2){
        output = 'Non-Commercial';
      }else if(id=== 3){
        output = 'Commercial';
      }
    }
    return output;
  }
}
