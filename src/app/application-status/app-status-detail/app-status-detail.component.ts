import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-app-status-detail',
  templateUrl: './app-status-detail.component.html',
  styleUrls: ['./app-status-detail.component.scss'],
})
export class AppStatusDetailComponent implements OnInit {
@Input() applicationNo: number;
@Input() cntDescription: string;
@Input() applicationDate: Date;
@Input() countRisksCovered: number;
@Input() importerNameE: string;
@Input() importerCountryE: string;
@Input() applicationCurrency: string;
@Input() applicationAmt: number;
@Input() applValueUsd: number;
@Input() decisionAmount: number;
@Input()decisionCurrency: string;
@Input() creditPeriod: number;
@Input()term: string;
@Input()currentStatus: number;
@Input()ocSpecialConditions: string;

statusDesc: string;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    if( this.currentStatus ===1){
      this.statusDesc = 'In process';
    }else if(this.currentStatus === 3){
      this.statusDesc = 'Rejected';
    }else{
      this.statusDesc = 'Accepted';
    }
  }

  onDismiss(){
    this.modalCtrl.dismiss();
  }

}
