import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApplicationService } from 'src/app/services/application.service';
import { BuyerRequestModel } from 'src/app/shared/models/buyer.request.model';
import { ComprehensiveLimit } from 'src/app/shared/models/comp-limit.model';
import { sessionData } from 'src/app/shared/shared/session.storage';
import { SegmentChangeEventDetail } from "@ionic/core";
import { ICountry } from 'src/app/shared/models/country.model';
import { IonicSelectableComponent } from 'ionic-selectable';
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
  buyer: BuyerRequestModel = new BuyerRequestModel('','','');
  title = "Buyer Info";
  countryList: ICountry[]=[];




  constructor(private route: ActivatedRoute,
    private navCtrl: NavController,
    private applicationService: ApplicationService,
    private router: Router) { }

  ngOnInit() {
    this.populateCountryList();
    this.route.paramMap.subscribe((param) => {
      this.cldId = param.get("cldId") as unknown as number;
      if (this.cldId) {
        console.log(this.cldId);
        if(this.cldId < 0){
          this.openForCreate();
        }else if(this.cldId >0){
          this.openForView();
        }
      }
    }
    );
  }

  populateCountryList(){
   // populate countryList goes here
}

  openForCreate(){
    console.log(">>BuyerPage open for create record ");
  }
  openForView(){
    console.log(">>BuyerPage open for view record ");

  }

  save(){

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
}
