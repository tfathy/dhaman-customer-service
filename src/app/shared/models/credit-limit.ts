export class ICreditLimit{
    constructor(
        public buyer: string,
        public status: string,
        public OperationType: string,
        public creditLimit: number,
        public period: number,
        public paymentMode: string

    ){        
    }
    
}