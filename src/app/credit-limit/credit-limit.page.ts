import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Config, IonRouterOutlet, ModalController } from '@ionic/angular';

import {
  getSessionInfo,
  sessionData,
} from "src/app/shared/shared/session.storage";
import { ApplicationService } from '../services/application.service';
import { ComprehensiveLimit } from '../shared/models/comp-limit.model';

@Component({
  selector: 'app-credit-limit',
  templateUrl: './credit-limit.page.html',
  styleUrls: ['./credit-limit.page.scss'],
})
export class CreditLimitPage implements OnInit {
  authToken: sessionData;
  applicationData: ComprehensiveLimit[] = [];  
  showSearchbar: boolean;
  queryText = '';
  ios: boolean;
  excludeTracks: any = [];


  constructor(
    private applicationService: ApplicationService,
    private router: Router,
    public config: Config,
    public modalCtrl: ModalController,
    public routerOutlet: IonRouterOutlet
  ) {}


  async ngOnInit() { 
    this.updateSchedule();
    this.ios = this.config.get('mode') === 'ios';
    this.authToken = await getSessionInfo("authData");
    this.applicationService
      .findAll("Bearer " + this.authToken.token)
      .subscribe((data) => {
        console.log(data);
        this.applicationData = data;
      });
  }
  updateSchedule() {
    // filter data here using services    
  }




  viewRecord(applicationId) {  
    console.log(applicationId) ;
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
