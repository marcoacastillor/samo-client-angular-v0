export class CreditPayment {
    public pk_id_credit_payment: number;
    public fk_id_credit_associated: number;
    public number_fee: number;
    public normal_payment_value: number;
    public interest_value: number;
    public capital_value: number;
    public scheduled_payment_date: string;
    public real_payment_date: number;
    public days_late: number;
    public additional_charge: number;
    public description_additional_charge: string;
    public payment_received: number;
    public contribution: number;
}
