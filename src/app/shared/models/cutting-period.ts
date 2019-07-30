export class CuttingPeriod {
    public pk_id_cutting_period: number;
    public fk_id_production_process: number;
    public period: string;
    public date_init: Date;
    public date_end: Date;
    public state: string;

    public defined_period: string;
}
