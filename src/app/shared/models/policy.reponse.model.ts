export class PolicyResponseModel{
    constructor(        
        public contNo: number,
        public contYear: number,
        public contDate: Date,
        public policyNumber: string,
        public contApplicant: number ,
        public contCurrency: string
    ){}
}