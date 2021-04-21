import { ICompany } from "./company.model";
import { CurrencyResponseModel } from "./currency.model";
import { DeclarationsDetailResponse } from "./declaration-detail.response";

import { WhoColumns } from "./who-columns.model";

export class DeclarationResponseModel {
  constructor(
    public dcRef?: number,
    public declarationsDetailEntity?: DeclarationsDetailResponse[],
    public company?: ICompany,
    public transType?: number,
    public policyNo?: string,
    public dcPeriod?: Date,
    public currency?: CurrencyResponseModel,
    public status?: string,
    public contNo?: number,
    public contYear?: number,
    public whoColumns?: WhoColumns
  ) {}
}
