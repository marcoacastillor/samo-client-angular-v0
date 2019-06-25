export class ProductionProcess {
    public pk_id_production_process: number;
    public fk_id_enterprise: number;
    public defined_period: string;
    public reference: string;
    public date_init: Date;
    public date_end: DataCue;
    public state: string;
}
