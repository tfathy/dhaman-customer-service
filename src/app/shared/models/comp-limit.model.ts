import { ICompany } from "./company.model";
import { ICurrency } from "./icurrency.model";

export class ComprehensiveLimit{
    public clRef: number;
    public transType: number;
    public riskRef: number;
    public hsCode: number;
    public status: string;
    public customer: ICompany;
    public currency: ICurrency;
}