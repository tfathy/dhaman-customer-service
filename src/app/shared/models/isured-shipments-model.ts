interface IsuredShipmentsModelPk{
    contApplicant: number;
    cmsdShipmentNo: number;
    cmsInvoiceNo: string;
    cmsdFormNo: number; 
}
export interface IsuredShipmentsModel{
    issuredShipmentsPk: IsuredShipmentsModelPk;
    cmsdFormYear: number;
    compRef: number;
    companyName: string;
    cmsCommPrem: number;
    cmsNoncommPrem: number;
    cmsdContAmount: number;
    cmsDextended: number;
    cmsdMaturityDate: Date;
    cmsdMaturedAmount: number;
    cmsdShipAmount: number;
    cmsdCurrency: string;
    cmsdRate: number;
    cmsShipDate: Date;
    cmsApproved: number;
    cmsUid: string;
    contDate: Date;
    contType: number;
    compass: number;
    contCurrency: string;
    applicantNationality: number;
    shDate: Date;
    compNationality: string;
    cuDecimal: number;
    thirdParty: string;
    debitNote: number;
    contractNo: string;
    shipStatus: string;
    premium: number;
    applicantName: string;
}