import { Parameter } from "./parameter";

export class Category {
  public pk_id_category: number;
  public code: string;
  public name: string;
  
  /**
   * Listado de componentes
  */
  public parameters: Parameter[];
}
