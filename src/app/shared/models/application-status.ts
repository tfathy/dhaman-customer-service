interface ApplicationStatusRoPk{
    applicationNo: number;
    contApplicant: number;
    buyerNo: number;
}
export interface ApplicationStatus{
    applicationsRoPk: ApplicationStatusRoPk;
    applicationType: number;
    cntDescription: string;
    applicationDate: Date;
    countRisksCovered: number;
    exporterNameE: string;
    exporterCountryE: string;
    importerNameE: string;
    importerCountryE: string;
    applicationCurrency: string;
    applicationAmt: string;
    applValueUsd: string;
    decisionAmount: string;
    decisionCurrency: string;
    creditPeriod: string;
    term: string;
    currentStatus: number;
    ocSpecialConditions: string;
  
}