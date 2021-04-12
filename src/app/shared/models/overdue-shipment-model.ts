interface OverdueShipmentsPk{
    contractNo: string;
    contApplicant: number;
    cmsInvoiceNo: string;
    cmsdCompRef: number;
}
export interface OverdueShipmentModel{
    overdueShipmentsPk: OverdueShipmentsPk;
    cmsShipDate: Date;
    cmsdMaturityDate: Date;
    cmsdAmount: number;
    contDate: Date;
    contCurrency: string;
    contRisksCovered: number;
    contType: number;
    buyerNameE: string;
    cmsCurrency: string;
    couOurReference: string;
    contEndDate: Date;
    applicantName: string; 
}