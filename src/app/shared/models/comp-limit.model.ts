import { ICompany } from "./company.model";
import { ComprehensiveLimitsDetailsEntity } from "./comprehensiveLimitsDetailsEntity.model";
import { ICurrency } from "./icurrency.model";
import { WhoColumns } from "./who-columns.model";

export class ComprehensiveLimit {
  constructor(
    public clRef?: number,
    public transType?: number,
    public riskRef?: number,
    public hsCode?: number,
    public status?: string,
    public customer?: ICompany,
    public currency?: ICurrency,
    public whoColumns?: WhoColumns,
    public comprehensiveLimitsDetailsEntity?: ComprehensiveLimitsDetailsEntity
  ) {}
}
