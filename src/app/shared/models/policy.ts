export interface IPolocy{
    policyPk: PolicyPk;
    contNo: number;
    contYear: number;
    contDate: Date;
}
interface PolicyPk{
    policyNo: string;
    contApplicant: number;
}