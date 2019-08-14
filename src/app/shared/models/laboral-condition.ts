export class LaboralCondition {
    public pk_id_laboral_condition: number;
    public fk_id_enterprise_person: number;
    public contract_type: string;
    public salary_type: string;
    public salary: number;
    public period: number;
    public production_unit: number;
    public pk_product_unit: number;
    public value_product_unit: number;
    public benefit_health: string;
    public benefit_pension: string;
    public benefit_arl: string;
    public benefit_compensation_box: string;
}
