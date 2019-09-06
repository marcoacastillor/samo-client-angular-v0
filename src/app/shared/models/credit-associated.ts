export class CreditAssociated {
    public pk_id_credit_associated: number;
    public fk_id_associated_info: number;
    public fk_id_credit_line: number;
    public amount_solicited: number;
    public amount_approved: number;
    public payment_deadline: number;
    public balance_credit: number;
    public application_date: string;
    public disbursment_date: string;
    public number_fees: number;
    public state: string;
}
