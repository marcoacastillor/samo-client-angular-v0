import { AbstractOperation } from "./abstract-operation";
import { TotalStocks } from "./total-stocks";

export class AbstractStock {
    public sales: AbstractOperation[];
    public purchase: AbstractOperation[];
    public total_sales: TotalStocks;
    public total_purchase: TotalStocks;
}
