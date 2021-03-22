import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ApplicationService } from 'src/app/services/application.service';
import { BuyerRequestModel } from 'src/app/shared/models/buyer.request.model';
import { ComprehensiveLimit } from 'src/app/shared/models/comp-limit.model';

import { SegmentChangeEventDetail } from "@ionic/core";
import { ICountry } from 'src/app/shared/models/country.model';
import { IonicSelectableComponent } from 'ionic-selectable';
import {
  sessionData,
  getSessionInfo,
} from "src/app/shared/shared/session.storage";
import { ComprehensiveLimitsDetailsEntity } from 'src/app/shared/models/comprehensiveLimitsDetailsEntity.model';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.page.html',
  styleUrls: ['./buyer.page.scss'],
})
export class BuyerPage implements OnInit {
  segmentModel = "basicInfo";
  cldId: number;
  authToken: sessionData;
  model: ComprehensiveLimit = new ComprehensiveLimit();
  buyer: ComprehensiveLimitsDetailsEntity = new ComprehensiveLimitsDetailsEntity() ;
  title = "Buyer Info";
  countryList: ICountry[]=[];
 



  constructor(private route: ActivatedRoute,
    private navCtrl: NavController,
    private applicationService: ApplicationService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router) { }

  async ngOnInit() {
    await getSessionInfo("authData").then(result=>{      
      this.authToken = result;
      this.populateCountryList();
    });    
   
    this.route.paramMap.subscribe((param) => {
      this.cldId = param.get("cldId") as unknown as number;
      if (this.cldId) {
        console.log(this.cldId);
        if(this.cldId >0){
          this.openForView();
        }
      }
    }
    );
  }

  populateCountryList(){
   // populate countryList goes here

}

 
  openForView(){
    console.log(">>BuyerPage open for view record ");
    this.applicationService.findByCldId("Bearer " + this.authToken.token,this.cldId).subscribe(responseData=>{       
      this.buyer = responseData;
    })

  }

  save(){
    this.route.paramMap.subscribe((param) => {
    let id = param.get("cldId") as unknown as number;
    if(id>0){
      this.updateRecord(id);
    }else{
      this.addRecord();
    }
    }
    )

  }

  updateRecord(id){    
    this.loadingCtrl.create({
      message: "posting updates .."
    }).then(loadinElmnt=>{
      loadinElmnt.present();
      this.applicationService.update("Bearer " + this.authToken.token,id,this.model).subscribe( responseData=>{
        loadinElmnt.dismiss();
        this.showToast("Record updated successfully");
        console.log("updated record");
        console.log(responseData);
      })
    })
  }


  addRecord(){

  }

  onSegmentChanged(event: CustomEvent<SegmentChangeEventDetail>){
    console.log("Segment changed", event.detail);
    this.segmentModel = event.detail.value;  
  }
  countryChange(event: {
    component: IonicSelectableComponent,
    value: any
  }){

  }

  showToast(msg: string){
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: "middle"
    }).then(toastElemnt=>{
      toastElemnt.present();
    })
  }
}


