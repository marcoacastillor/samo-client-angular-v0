export class Expense {
    public pk_id_expense: number;
    public fk_id_enterprise: number;
    public fk_id_provider: number;
    public name_provider: string;
    public number_voucher:string;
    public actual_value: number;
    public concept_expense: string;
    public type_expense: string;
    public date_expense: string;
    public description: string;
    public value: number;
}
