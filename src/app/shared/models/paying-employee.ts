export class PayingEmployee {
    public pk_id_paying_info: number;
    public fk_id_enterprise_person: number;
    public date_init_period: string;
    public date_end_period: string;
    public value_payment: number;
    public ibc_value: number;
    public health_value: number;
    public pension_value: number;
    public arl_value: number;
    public compensation_value: number;
    public total_discounts: number;
    public other_income: number;
    public state_paying: string;
}
