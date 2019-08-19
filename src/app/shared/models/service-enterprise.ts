export class ServiceEnterprise {
    public pk_id_service_enterprise: number;
    public fk_id_enterprise: number;
    public fk_id_type_service: number;
    public type_service:string;
    public reference_enterprise:string;
    public date_init_service: Date;
    public date_end_service: Date;
    public days_service: number;
    public state_service: string;
    public state_payment_service: string;
    public balance_service: number;
    public observation: string;
}
