import { ICompany } from "./company.model";
import { WhoColumns } from "./who-columns.model";

export class DeclarationsDetailResponse{
    constructor(
        public ddRef?: number,
        public dcRef?: number,
        public company?: ICompany,
        public ddInvoiceValue?: number,
        public ddPremium?: number,
        public ddInvNo?: string,
        public ddShipDate?: Date,
        public ddMaturityDate?: Date,
        public ddPrmRate?: number,
        public ddRevolving?: number,
        public whoColumns?: WhoColumns
    ){}
}