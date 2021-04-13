import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-insured-shipmets-dtl',
  templateUrl: './insured-shipmets-dtl.component.html',
  styleUrls: ['./insured-shipmets-dtl.component.scss'],
})
export class InsuredShipmetsDtlComponent implements OnInit {
@Input()cmsdShipmentNo: number;
@Input() cmsInvoiceNo: string;
@Input() cmsdFormNo: number;

@Input() cmsdFormYear: number;
@Input() companyName: string;
@Input() cmsCommPrem: number;
@Input() cmsNoncommPrem: number;
@Input() cmsdContAmount: number;
@Input() cmsDextended: number;
@Input() cmsdMaturityDate: Date;
@Input() cmsdMaturedAmount: number;
@Input() cmsdShipAmount: number;
@Input() cmsdCurrency: string;
@Input() cmsdRate: number;
@Input() cmsShipDate: Date;
@Input() contDate: Date;
@Input() contCurrency: string;
@Input() shDate: Date;
@Input() compNationality: string;
@Input() debitNote: number;
@Input()contractNo: string;
@Input()shipStatus: string;
@Input() premium: number;

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}


  onDismiss(){
    this.modalCtrl.dismiss();
  }
}
