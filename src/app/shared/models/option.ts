export class Option {
  public pk_id_option: number;
  public fk_id_component: number;
  public code: string;
  public description: string;
  public check: string = 'false';
  public viewRef: string;

  public parent: string;
}
