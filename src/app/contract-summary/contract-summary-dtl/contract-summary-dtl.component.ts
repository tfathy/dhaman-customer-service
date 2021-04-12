import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-contract-summary-dtl',
  templateUrl: './contract-summary-dtl.component.html',
  styleUrls: ['./contract-summary-dtl.component.scss'],
})
export class ContractSummaryDtlComponent implements OnInit {
  @Input() contractNo: string;
 @Input() buyerName: string;
 @Input() buyerNationality: string;
 @Input() maxAmount: number;
 @Input() revolving: number;
 @Input() outstanding: number;
 @Input() currentRevolving: number;
 @Input() ship: number;
 @Input() unsettled: number;
 @Input() uName: string;
 @Input() contCurrency: string;
 @Input() contDate: Date;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  onDismiss(){
    this.modalCtrl.dismiss();
  }
}
