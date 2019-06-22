import { Operation } from "./operation";

export class Results {
    public data_results: any[];
    public number_results: number;
    public criteria: string;

    constructor(){
        this.data_results = [];
        this.number_results = 0;
        this.criteria = '';
    }
}
