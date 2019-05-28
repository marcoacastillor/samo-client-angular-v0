import { EnterprisePerson } from "./enterprise-person";
import { Enterprise } from "./enterprise";

export class Person {
    public pk_id_person: number;
    public type_id: string;
    public number_id: string;
    public names: string;
    public last_names:string;
    public address: string;
    public phone: string;

    public enterprise: Enterprise;
    public enterprise_person: EnterprisePerson;
}
