import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import { QueryService } from '../services/query.service';
import { ContractAnnexModel } from '../shared/models/contract-annex-model';
import { getSessionInfo, sessionData } from '../shared/shared/session.storage';
import { ContractAnnexDtlComponent } from './contract-annex-dtl/contract-annex-dtl.component';

@Component({
  selector: 'app-contract-annex',
  templateUrl: './contract-annex.page.html',
  styleUrls: ['./contract-annex.page.scss'],
})
export class ContractAnnexPage implements OnInit {
  authToken: sessionData;
  contractList: ContractAnnexModel[] =[];
  showSearchbar: boolean = false;
  queryText = "";
  ios: boolean;
  constructor( private queryService: QueryService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private router: Router) { }

  ngOnInit() {
    let contApplicant;
    this.loadingCtrl.create({
      message: 'Loadind contracts .. please wait'
    }).then(loadingElement=>{
      loadingElement.present();
      this.readToken();
      getSessionInfo("authData").then(customerInfo =>{
        contApplicant = customerInfo.compRef;
        this.queryService.findContractAnnex( "Bearer " + this.authToken.token,contApplicant)
        .subscribe(responseData=>{
          this.contractList = responseData;
          loadingElement.dismiss();
        },error=>{
          console.log(error);
          loadingElement.dismiss();
        })
      })
    })
  }
  onCancelSearch() {
    of(false).subscribe((data) => {
      console.log(data);
      this.showSearchbar = data;
    },error=>{
      console.log(error);
    });
  }
  findCustomer(event) {
    let query: string = event.detail.value;    
    console.log(query);  
    let filteredData; 
    if (!query) {
      this.ngOnInit();
    }else{
      filteredData =   this.contractList.filter(
          (row) =>  row.compNameE.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1
        );

        return of(filteredData).subscribe(
          data=>{
            this.contractList = data;
          },error=>{
            console.log(error);
          }
        )
    }
  }
  doRefresh(event){
    let compRef;
    getSessionInfo("customer").then((customerInfo) => {
      compRef = customerInfo.compRef;
      this.queryService
        .findContractAnnex(
          "Bearer " + this.authToken.token,
          compRef
        )
        .subscribe((responseData) => {
         this.contractList = responseData;
          event.target.complete();
        },error=>{
          console.log(error);
          event.target.complete();
        });
    });
  }
  openModal(contract: ContractAnnexModel){
    this.modalCtrl.create({
      component: ContractAnnexDtlComponent,
      componentProps:{
        "contractNo": contract.contractAnnexPk.contractNo,
        "contDate":contract.contDate,
        "contEndDate":contract.contEndDate,
        "contCurrency":contract.contCurrency,
        "contTypeE":contract.contTypeE,
        "exporterE":contract.exporterE,
        "compNameE":contract.compNameE,
        "guarValue":contract.guarValue,
        "contRevolving":contract.contRevolving,
        "decision":contract.decision,
        "decisionDate":contract.decisionDate,
        "contCreditPeriod":contract.contCreditPeriod,
        "premuim": contract.premuim,
        "term": contract.term,
        "claimsComm":contract.claimsComm,
        "claimsNoncomm": contract.claimsNoncomm,
        "compNationalityE":contract.compNationalityE,
        "contStatus":contract.contStatus
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
}
