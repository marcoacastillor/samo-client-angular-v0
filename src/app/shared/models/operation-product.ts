export class OperationProduct {
    public pk_id_operation_product: number;
    public fk_id_product: number;
    public fk_id_operation: number;
    public number_units: number;
    public number_package: number;
    public price_unit: number;
    public price_package: number;
    public total_product: number;
    public tax: string;
    public value_tax: number;

    public code: string;
    public name: string;
    public presentation: string;
}
