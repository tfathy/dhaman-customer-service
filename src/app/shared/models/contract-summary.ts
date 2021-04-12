interface ContractSummaryPk{
    contractNo: string;
    applicantRef: number;
    buyer: number;
}
export interface ContractSummary{
    contractShipmentsSummaryPk: ContractSummaryPk;
    applicantName: string;
    buyerName: string;
    buyerNationality: string; 
    maxAmount: number;
    revolving: number;
    outstanding: number;
    currentRevolving: number;
    ship: number;
    unsettled: number;
    uName: string;
    contCurrency: string;
    contDate: Date;
}