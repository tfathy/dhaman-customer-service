export interface IPolocy{
    policyPk: PolicyPk;
    contNo: number;
    contYear: number;
    contDate: Date;   
    contCurrency: string; 
}
interface PolicyPk{
    policyNo: string;
    contApplicant: number;
}