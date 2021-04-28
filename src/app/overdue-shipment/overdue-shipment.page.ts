import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import { QueryService } from '../services/query.service';
import { OverdueShipmentModel } from '../shared/models/overdue-shipment-model';
import {getSessionInfo, sessionData } from '../shared/shared/session.storage';
import { OverdueShipmentDtlComponent } from './overdue-shipment-dtl/overdue-shipment-dtl.component';

@Component({
  selector: 'app-overdue-shipment',
  templateUrl: './overdue-shipment.page.html',
  styleUrls: ['./overdue-shipment.page.scss'],
})
export class OverdueShipmentPage implements OnInit {
  loginCompany: string;
  authToken: sessionData;
  shipmentList: OverdueShipmentModel[] = [];
  showSearchbar: boolean = false;
  queryText = "";
  ios: boolean;
  constructor( private queryService: QueryService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private router: Router) { }

  ngOnInit() {
    this.getCompanyName();
    let compRef;
    this.loadingCtrl.create({message: 'loading data...'}).then(loadinElement=>{
      loadinElement.present();
      this.readToken();
      getSessionInfo("authData").then(data=>{
        compRef = data.compRef;
        this.queryService.findOverdueShipment('Bearer '+this.authToken.token,compRef)
        .subscribe(responseData=>{
          this.shipmentList = responseData;
          loadinElement.dismiss();
        },error=>{
          loadinElement.dismiss();
        })
      })
    })
   
  }

  onCancelSearch() {
    of(false).subscribe((data) => {
      console.log(data);
      this.showSearchbar = data;
    });
  }
  findCustomer(event) {
    let query: string = event.detail.value;   
    let filteredData; 
    if (!query) {
      this.ngOnInit();
    }else{
      filteredData =   this.shipmentList.filter(
          (row) =>  row.buyerNameE.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1
        );

        return of(filteredData).subscribe(
          data=>{
            this.shipmentList = data;
          }
        )
    }
  }
  doRefresh(event){
    let compRef;
    getSessionInfo("customer").then((customerInfo) => {
      compRef = customerInfo.compRef;
      this.queryService.findOverdueShipment('Bearer '+this.authToken.token,compRef)
        .subscribe((responseData) => {
         this.shipmentList = responseData;
          event.target.complete();
        },error=>{
          event.target.complete();
        });
    });
  }
  openModal(shipment: OverdueShipmentModel){
    this.modalCtrl.create({
      component: OverdueShipmentDtlComponent,
      componentProps:{
        "contractNo": shipment.overdueShipmentsPk.contractNo,
        "cmsInvoiceNo":shipment.overdueShipmentsPk.cmsInvoiceNo,
        "cmsShipDate":shipment.cmsShipDate,
        "cmsdMaturityDate":shipment.cmsdMaturityDate,
        "cmsdAmount":shipment.cmsdAmount,
        "contDate":shipment.contDate,
        "contCurrency":shipment.contCurrency,
        "contRisksCovered":shipment.contRisksCovered,
        "contType":shipment.contType,
        "buyerNameE":shipment.buyerNameE,
        "cmsCurrency":shipment.cmsCurrency,
        "contEndDate":shipment.contEndDate
      }
    }).then(modalElmnt=>{
      modalElmnt.present();
    })
  }
  private readToken(){
    getSessionInfo("authData").then(data=>{
      this.authToken = data;
    })
  }
  back(){
    this.router.navigate(['/','home']);
  }

  getCompanyName(){
    getSessionInfo("customer").then(data=>{
      this.loginCompany = data.compNameE;
    })
  }
}
