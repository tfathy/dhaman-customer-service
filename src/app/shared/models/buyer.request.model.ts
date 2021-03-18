import { NumericValueAccessor } from "@ionic/angular";
import { ICountry } from "./country.model";
import { IPaymentMode } from "./payment.mode";
import { IRelationDebtor } from "./relationDebtor.model";

export class BuyerRequestModel {
  constructor(
    public cldDebtorNameAr: string,
    public cldDebtorNameEn: string,
    public cldAddress: string,
    public cldPhone?: string,
    public country?: ICountry,
    public cldVat?: string,
    public cldAvgShip?: number,
    public cldTenor?: number,
    public clsCreditLimitRequested?: number,
    public paymentMode?: IPaymentMode,
    public cldBank? : string,
    public cldRelationDebtor?: IRelationDebtor,
    public cldPreviousDealing1?: number,
    public cldPreviousDealing2?: number,
    public cldPreviousDealing3?: number,
    public cldOutstanding?: number,
    public cldDispute?: string,
    public clsDisputeYeas?: string,
    public cldGoodsCountryOrigin?: string,
    public clsCommercialReg?: string,
    public cldDestoods?: string,
    public cldImage?: string
   
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
