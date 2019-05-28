import { ProductOperation } from "./product-operation";
import { Payment } from "./payment";
import { OperationValue } from "./operation-value";
import { Product } from "./product";

export class Purchase {
    public pk_id_operation: number;
    public pk_id_purchase: number;
    public fk_id_provider: number; //proveedor
    public fk_id_person: number; //vendedor
    public operation_type: string; //si es compra o venta de productos
    public payment_type: string; //tipo de pago: efectivo, crédito
    public state_operation: string; //estado de compra
    public date_purchase: string; //fecha de compra
    public number_invoice: string;
    public total_purchase: number;
    public subtotal_operation: number;
    public total_tax: number;
    public total_discounts: number;
    public value_discount: number;
    public state_purchase: string;
    public total_taxes: number;
    public subtotal_purchase: number;

    public total_operation: number;
    public total_pays: number;
    public products_list: Product[];
    public date_operation: string;
    public notes: any[];
    
    public products: ProductOperation[];
    public payments: Payment[];
    public discounts: OperationValue[];
    public taxes: OperationValue[];
}
