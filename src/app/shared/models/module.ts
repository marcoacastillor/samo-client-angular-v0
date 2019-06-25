import { MComponent } from './m-component';

export class Module {
  public pk_id_module: number;
  public name: string;
  public description: string;
  public url_image: string;
  public url_angular_module: string;
  public icon_name: string;

  /**
   * Listado de componentes
  */
  public components: MComponent[];
}
