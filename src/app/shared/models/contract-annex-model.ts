interface ContractAnnexModelPk{
    contractNo: string;
    compRef: number;
}
export interface ContractAnnexModel{
    contractAnnexPk: ContractAnnexModelPk;
    contYear: number;
    contDate: Date;
    contStatusCode: number;
    contEndDate: Date;
    contCurrency: string;
    contTypeE: string;
    contApplicant: number;
    exporterE: string;
    contExporterCountry: number;
    applicantNationality: string;
    compNameE: string;
    guarValue: number;
    contRevolving: number;
    decision: number;
    decisionDate: Date;
    contCreditPeriod: number;
    premuim: number;
    impPaymentMode: number;
    term: string;
    claimsComm: number;
    claimsNoncomm: number;
    compNationalityE: string;
    contStatus: string;
}