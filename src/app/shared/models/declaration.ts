export class IDeclaration {
  constructor(
    public buyer: string,
    public revolving: number,
    public rate: number,
    public invoiceNum: string,
    public invoiceValue: number,
    public premValue: number,
    public shipDate: Date,
    public matDate: Date
  ) {}
}
