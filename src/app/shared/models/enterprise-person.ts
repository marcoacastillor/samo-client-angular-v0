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
}
