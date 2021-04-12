import { Component, OnInit } from "@angular/core";
import { LoadingController, ModalController } from "@ionic/angular";
import { of } from "rxjs";
import { QueryService } from "../services/query.service";
import { ContractSummary } from "../shared/models/contract-summary";
import { getSessionInfo, sessionData } from "../shared/shared/session.storage";
import { ContractSummaryDtlComponent } from "./contract-summary-dtl/contract-summary-dtl.component";

@Component({
  selector: "app-contract-summary",
  templateUrl: "./contract-summary.page.html",
  styleUrls: ["./contract-summary.page.scss"],
})
export class ContractSummaryPage implements OnInit {
  authToken: sessionData;
  contractList: ContractSummary[] = [];
  showSearchbar: boolean = false;
  queryText = "";
  ios: boolean;
  constructor(
    private queryService: QueryService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    let compRef;
    this.loadingCtrl.create({
      message: 'Loadind contracts .. please wait'
    }).then(loadingElement=>{
      loadingElement.present();
      this.readToken();
      getSessionInfo("authData").then(customerInfo =>{
        compRef = customerInfo.compRef;
        this.queryService.findContractSummaryByCustomerRef( "Bearer " + this.authToken.token,compRef)
        .subscribe(responseData=>{
          this.contractList = responseData;
          loadingElement.dismiss();
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
    let tempAppData;
    if (!query) {
      this.ngOnInit();
    } /*
    let filteredData = query
      ? this.allApplications.filter((item) =>
          item.comprehensiveLimitsDetailsEntity?.some(
            (row) =>
              row.cldDebtorNameEn.toLowerCase().indexOf(query.toLowerCase()) >
              -1
          )
        )
      : tempAppData;

    return of(filteredData).subscribe((data) => {
      console.log(data);
      this.allApplications = data;
    }
    );
    */
  }
  doRefresh(event){
    let compRef;
    getSessionInfo("customer").then((customerInfo) => {
      compRef = customerInfo.compRef;
      this.queryService
        .findContractSummaryByCustomerRef(
          "Bearer " + this.authToken.token,
          compRef
        )
        .subscribe((responseData) => {
         this.contractList = responseData;
          event.target.complete();
        });
    });
  }
  openModal(contract: ContractSummary){
    this.modalCtrl.create({
      component: ContractSummaryDtlComponent,
      componentProps:{
        "contractNo": contract.contractShipmentsSummaryPk.contractNo,
        "buyerName":contract.buyerName,
        "buyerNationality":contract.buyerNationality,
        "maxAmount":contract.maxAmount,
        "revolving":contract.revolving,
        "outstanding":contract.outstanding,
        "currentRevolving":contract.currentRevolving,
        "ship":contract.ship,
        "unsettled":contract.unsettled,
        "uName":contract.uName,
        "contCurrency":contract.contCurrency,
        "contDate":contract.contDate
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

}
