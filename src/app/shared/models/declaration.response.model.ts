import { ICompany } from "./company.model";
import { DeclarationsDetailResponse } from "./declaration-detail.response";
import { ICurrency } from "./icurrency.model";
import { WhoColumns } from "./who-columns.model";

export class DeclarationResponseModel {
  constructor(
    public dcRef?: number,
    public declarationsDetailEntity?: DeclarationsDetailResponse,
    public company?: ICompany,
    public transType?: number,
    public policyNo?: string,
    public dcPeriod?: Date,
    public currency?: ICurrency,
    public status?: string,
    public whoColumns?: WhoColumns
  ) {}
}
