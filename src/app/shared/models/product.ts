export class Product {
    public pk_id_product: number;
    public category: string;
    public fk_id_enterprise: number;
    public code: string;
    public name: string;
    public units_package: number;
    public sale_price_unit: number;
    public sale_price_package: number;
    public type_product: string;
    public units_available: number;
    public cost_price: number;
    public html_barcode: string;
    public url_barcode: string;

    public reference: string;
    public presentation: string;
    public size: string;
    public color: string;
    public trademark: string;
}
