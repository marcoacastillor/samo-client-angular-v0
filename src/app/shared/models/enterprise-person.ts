export class EnterprisePerson {
    public pk_id_enterprise_person: number;
    public fk_id_enterprise: number;
    public fk_id_person: number;
    public fk_id_position: number;
    public date_register: string;
    public date_unregister: string;
    public state: string;
    public salary: number;
    public salary_type: string;
    public production_unit: string;
    public value_product_unit: number;
    public benefit_health: number;
    public benefit_pension: number;
    public benefit_arl: number;
    public benefit_compensation_box: number;
    public contract_type: string;
}
