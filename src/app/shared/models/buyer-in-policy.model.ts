export class BuyerInPolicyModel{
    constructor(
       public policyNo: string,
       public compRef: string,
       public contNo: number,
       public contYear: number,
       public contDate: Date,
       public contCurrency: string,
       public contApplicant: number,
       public thirdParty: number,
       public compNameE: string,
       public compNameA: string,
       public prmRate: number,
       public creditLimit: number
    ){}
}