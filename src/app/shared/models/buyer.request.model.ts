import { NumericValueAccessor } from "@ionic/angular";
import { ICountry } from "./country.model";
import { IPaymentMode } from "./payment.mode";
import { IRelationDebtor } from "./relationDebtor.model";

export class BuyerRequestModel {
  constructor(
    public cLDRef?: number,
    public clRef?: number,
    public cldDebtorNameAr?: string,
    public cldDebtorNameEn?: string,
    public cldAddress?: string,
    public cldPhone?: string,
    public country?: ICountry,
    public cldVat?: string,
    public cldAvgShip?: number,
    public cldTenor?: number,
    public clsCreditLimitRequested?: number,
    public paymentMode?: IPaymentMode,
    public cldBank?: string,
    public cldRelationDebtor?: IRelationDebtor,
    public cldPreviousDealing1?: number,
    public cldPreviousDealing2?: number,
    public cldPreviousDealing3?: number,
    public cldOutstanding?: number,
    public cldDispute?: number,
    public clsDisputeYeas?: string,
    public cldGoodsCountryOrigin?:string,
    public clsCommercialReg?: string,
    public cldDestoods?: string,
    public cldImage?: string,
    public cldImagePath?: string, 
    public couShortNameE?: string,
    public cldYear1?: number,
    public cldYear2?: number,
    public cldYear3?:number,
    public cldOutstanding2?: number,
    public cldOutstanding3?:number,
    public ptPreviousRef1?:IPaymentMode,
    public ptPreviousRef2?:IPaymentMode,
    public ptPreviousRef3?:IPaymentMode,
    public outstandingReason1?: string,
    public outstandingReason2?: string,
    public outstandingReason3?: string
   
  ) {}


   /*
    cldDispute": null,
                "clsDisputeYeas": "No",
                "cldGoodsCountryOrigin": null,
                "clsCommercialReg": "555CCCC                  ",
                "cldDestoods": null,
                "cldImage": "Tewst Att",
    */
}
