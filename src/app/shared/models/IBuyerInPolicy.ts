interface IBuyerInPolicyPk{
    policyNo: string;
    compRef: string;
}
export interface IBuyerInPolicy{
    buyerPk: IBuyerInPolicyPk;
     contNo: number;
     contYear: number;
     contDate: Date;
     contCurrency: string;
     contApplicant: number;
     thirdParty: number;
     compNameE: string;
     compNameA: string;
     prmRate: number;
     creditLimit: number;
}