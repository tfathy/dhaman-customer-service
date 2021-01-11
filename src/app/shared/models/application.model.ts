export class IApplication {
  constructor(
    public id: string,
    public buyerNameAr: string,
    public buyerNameEn: string,
    public address: string,
    public phone: string,
    public comNumber: string,
    public vat: string,
    public avgShipment: number,
    public crLimit: number,
    public tenorDays: number,
    public payMode: string,
    public buyerBank: string,
    public email: string,
    public fax: string
  ) {}
}
