import { Product } from "./product";
import { ProductOperation } from "./product-operation";

export class Operation {
    public pk_id_operation: number;
    public fk_id_person: number;
    public fk_id_enterprise: number;
    public operation_type: string;
    public payment_type: string;
    public state_operation: string;
    public number_invoice: string;
    public date_operation: string;
    public external_reference: string;
    public subtotal_operation: number;
    public total_operation: number;
    public total_tax: number;
    public total_discounts: number;
    public total_pays: number;
    public value_discount: string;

    public products_list: ProductOperation[];
    public notes: any[];
    public operations: any[];
}
