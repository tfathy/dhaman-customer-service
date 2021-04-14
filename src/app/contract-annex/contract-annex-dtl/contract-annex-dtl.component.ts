import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-contract-annex-dtl',
  templateUrl: './contract-annex-dtl.component.html',
  styleUrls: ['./contract-annex-dtl.component.scss'],
})
export class ContractAnnexDtlComponent implements OnInit {
@Input() contractNo: string;  
  @Input() contDate:Date;
  @Input() contEndDate:Date;
  @Input() contCurrency:string;
  @Input() contTypeE:string;
  @Input() exporterE:string;
  @Input() compNameE:string;
  @Input() guarValue:number;
  @Input() contRevolving:number;
  @Input() decision:number;
  @Input() decisionDate:Date;
  @Input() contCreditPeriod:number;
  @Input() premuim:number;
  @Input() term:string;
  @Input() claimsComm:number;
  @Input() claimsNoncomm:number;
  @Input() compNationalityE:string;
  @Input() contStatus:string;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onDismiss(){
    this.modalCtrl.dismiss();
  }
}
