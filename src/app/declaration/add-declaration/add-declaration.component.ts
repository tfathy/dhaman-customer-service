import { Component, Input, OnInit } from "@angular/core";
import {
  LoadingController,
  ModalController,
  ToastController,
} from "@ionic/angular";
import { IonicSelectableComponent } from "ionic-selectable";
import { DeclarationService } from "src/app/services/declaration.service";
import { LookUpService } from "src/app/services/look-up.service";
import { BuyerInPolicyModel } from "src/app/shared/models/buyer-in-policy.model";
import { DeclarationResponseModel } from "src/app/shared/models/declaration.response.model";
import {
  getSessionInfo,
  sessionData,
} from "src/app/shared/shared/session.storage";

@Component({
  selector: "app-add-declaration",
  templateUrl: "./add-declaration.component.html",
  styleUrls: ["./add-declaration.component.scss"],
})
export class AddDeclarationComponent implements OnInit {
  @Input() model: DeclarationResponseModel;
  @Input() mode: string;
  @Input() idx: number;
  @Input() ddRef: number;
  authToken: sessionData;

  buyerList: BuyerInPolicyModel[] = [];
  constructor(
    private modalCtrl: ModalController,
    private lookupService: LookUpService,
    private loadingCtrl: LoadingController,
    private declarationService: DeclarationService,
    private toast: ToastController
  ) {}

  ngOnInit() {
      this.loadingCtrl
      .create({
        message: "loading ..",
      })
      .then((loadingElm) => {
        loadingElm.present();
        getSessionInfo("authData").then((authData) => {
          this.authToken = authData;
          if(this.ddRef){
            this.fetchShipmentDtl(this.ddRef);
          }
          this.lookupService
            .findBuyersInPolicy(
              "Bearer " + this.authToken.token,
              this.model.policyNo
            )
            .subscribe((resData) => {
              this.buyerList = resData;
              console.log(this.buyerList);
              loadingElm.dismiss();
            },error=>{
              loadingElm.dismiss();
              console.log(error);
            });
        });
        
      });
      
  }

  save() {   
      this.model.declarationsDetailEntity[this.idx].whoColumns = this.model.whoColumns;
      this.model.declarationsDetailEntity[this.idx].dcRef = this.model.dcRef;   

    console.log(this.model);
    this.loadingCtrl
      .create({
        message: "Saving record...",
      })
      .then((loadingElmnt) => {
        loadingElmnt.present();
        this.declarationService
          .create("Bearer " + this.authToken.token, this.model)
          .subscribe((resData) => {          
            this.toast
              .create({
                message: "Transaction Saved successfully",
                position: "middle",
                duration: 1000,
              })
              .then((toastCtrl) => {
                toastCtrl.present();
              });
            loadingElmnt.dismiss();
            this.modalCtrl.dismiss({
              saved: true,
              newid: resData.dcRef,
            });
          },error=>{
            loadingElmnt.dismiss();
            console.log(error);
          });
      });
  }
  cancel() {
    this.modalCtrl.dismiss({
      saved: false,
    });
  }

  onBuyerChange(event: { component: IonicSelectableComponent; value: any }) {
    console.log(event.value);
    this.model.declarationsDetailEntity[this.idx].ddPrmRate = event.value.prmRate;
   // this.model.declarationsDetailEntity[this.idx].debtorRef = event.value.compRef as number;
  }

  private fetchShipmentDtl(ddRef: number){
    this.declarationService.findShipmentById("Bearer "+this.authToken.token,ddRef)
    .subscribe(data=>{     
      this.model.declarationsDetailEntity[this.idx] = data;
    },error=>{
      console.log(error);
    })
  }
}
