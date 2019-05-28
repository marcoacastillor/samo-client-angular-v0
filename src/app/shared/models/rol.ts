import { Option } from "./option";
import { Module } from "./module";

export class Rol {
  public pk_id_rol: number;
  public name: string;
  public modules: Module[];
  public options: Option[];
}
