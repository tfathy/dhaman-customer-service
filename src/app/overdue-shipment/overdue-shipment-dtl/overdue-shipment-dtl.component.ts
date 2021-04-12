import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";


@Component({
  selector: "app-overdue-shipment-dtl",
  templateUrl: "./overdue-shipment-dtl.component.html",
  styleUrls: ["./overdue-shipment-dtl.component.scss"],
})
export class OverdueShipmentDtlComponent implements OnInit {
  @Input() contractNo: string;
  @Input() cmsInvoiceNo: string;
  @Input() cmsShipDate: Date;
  @Input() cmsdMaturityDate: Date;
  @Input() cmsdAmount: number;
  @Input() contDate: Date;
  @Input() contCurrency: string;
  @Input()contRisksCovered: number;
  @Input()contType: number;
  @Input() buyerNameE: string;
  @Input()cmsCurrency: string;
  @Input()contEndDate: Date;
  
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onDismiss() {
    this.modalCtrl.dismiss();
  }
}
