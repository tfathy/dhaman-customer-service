export class CurrencyResponseModel{
   constructor(
    public cuCode: string,
    public cuDescriptionE?: string,
    public cuDesriptionA?: string,
    public cuDecimal?: number
   ){}
}