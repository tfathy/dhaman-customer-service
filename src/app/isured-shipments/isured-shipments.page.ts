import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoadingController, ModalController } from "@ionic/angular";
import { of } from "rxjs";
import { QueryService } from "../services/query.service";
import { ContractSummary } from "../shared/models/contract-summary";
import { IsuredShipmentsModel } from "../shared/models/isured-shipments-model";
import { getSessionInfo, sessionData } from "../shared/shared/session.storage";
import { InsuredShipmetsDtlComponent } from "./insured-shipmets-dtl/insured-shipmets-dtl.component";

@Component({
  selector: "app-isured-shipments",
  templateUrl: "./isured-shipments.page.html",
  styleUrls: ["./isured-shipments.page.scss"],
})
export class IsuredShipmentsPage implements OnInit {
  authToken: sessionData;  
  showSearchbar: boolean = false;
  queryText = "";
  ios: boolean;
  shipmentList: IsuredShipmentsModel[] = [];
  constructor(
    private queryService: QueryService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    let compRef;
    this.loadingCtrl
      .create({
        message: "Loadind shipments .. please wait",
      })
      .then((loadingElement) => {
        loadingElement.present();
        this.readToken();
        getSessionInfo("authData").then((customerInfo) => {
          compRef = customerInfo.compRef;
          this.queryService
            .findIsueredShipments("Bearer " + this.authToken.token, compRef)
            .subscribe((responseData) => {
              this.shipmentList = responseData;
              loadingElement.dismiss();
            });
        });
      });
  }

  onCancelSearch() {
    of(false).subscribe((data) => {
      console.log(data);
      this.showSearchbar = data;
    });
  }

  findCustomer(event) {
    let query: string = event.detail.value;
    console.log("************************")
    console.log(query);  
    let filteredData; 
    if (!query) {
      this.ngOnInit();
    }else{
      filteredData =   this.shipmentList.filter(
          (row) =>  row.companyName.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1
        );

        return of(filteredData).subscribe(
          data=>{
            this.shipmentList = data;
          }
        )
    }
  }

  openModal(shipment: IsuredShipmentsModel) {
    this.modalCtrl
      .create({
        component: InsuredShipmetsDtlComponent,
        componentProps: {
          "cmsdShipmentNo": shipment.issuredShipmentsPk.cmsdShipmentNo,
          "cmsInvoiceNo": shipment.issuredShipmentsPk.cmsInvoiceNo,
          "cmsdFormNo": shipment.issuredShipmentsPk.cmsdFormNo,
          "cmsdFormYear": shipment.cmsdFormYear,
          "companyName": shipment.companyName,
          "cmsCommPrem": shipment.cmsCommPrem,
          "cmsNoncommPrem": shipment.cmsNoncommPrem,
          "cmsdContAmount": shipment.cmsdContAmount,
          "cmsDextended": shipment.cmsDextended,
          "cmsdMaturityDate": shipment.cmsdMaturityDate,
          "cmsdMaturedAmount": shipment.cmsdMaturedAmount,
          "cmsdShipAmount": shipment.cmsdShipAmount,
          'cmsdCurrency': shipment.cmsdCurrency,
          "cmsdRate": shipment.cmsdRate,
          "cmsShipDate": shipment.cmsShipDate,
          "cmsApproved": shipment.cmsApproved,
          "cmsUid": shipment.cmsUid,
          "contDate": shipment.contDate,
          "contType": shipment.contType,
          "compass": shipment.compass,
          "contCurrency": shipment.contCurrency,
          "applicantNationality": shipment.applicantNationality,
          "shDate": shipment.shDate,
          'compNationality': shipment.compNationality,
          "cuDecimal": shipment.cuDecimal,
          "thirdParty": shipment.thirdParty,
          "debitNote": shipment.debitNote,
          "contractNo": shipment.contractNo,
          "shipStatus": shipment.shipStatus,
          "premium": shipment.premium,
          "applicantName": shipment.applicantName,
        },
      })
      .then((modalElmnt) => {
        modalElmnt.present();
      });
  }
  doRefresh(event) {
    let compRef;
    getSessionInfo("customer").then((customerInfo) => {
      compRef = customerInfo.compRef;
      this.queryService
        .findIsueredShipments("Bearer " + this.authToken.token, compRef)
        .subscribe((responseData) => {
          this.shipmentList = responseData;
          event.target.complete();
        });
    });
  }

  private readToken() {
    getSessionInfo("authData").then((data) => {
      this.authToken = data;
    });
  }
  back(){
    this.router.navigate(['/','home']);
  }

}
