export class ProductOperation {
    public pk_id_operation_product: number;
    public fk_id_product: number;
    public fk_id_operation: number;
    public name:string;
    public code:string;
    public number_units: number;
    public number_package: number;
    public price_package: number;
    public price_unit: number;
    public sale_price_unit: number;
    public cost_price: number;
    public type_product: string;

    public tax: number;
    public reference: string;
    public tax_product: string;
    public value_tax: number;
    public value_total: number;
    public total_product: number;
    public discount: number;
    public subtotal: number;

    public category: string;
    public presentation: string;
    public trademark: string;
    public color: string;
    public size: string;
}
