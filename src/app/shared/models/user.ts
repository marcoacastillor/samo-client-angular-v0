import { Rol } from "./rol";
import { Person } from "./person";
import { Module } from "./module";
import { Enterprise } from "./enterprise";

export class User {
  public pk_id_user: number;
  public fk_id_person: number;
  public fk_id_enterprise: number;
  public fk_id_rol: number;
  public username: string;
  public email: string;
  public api_token: string;
  public created_at: string;
  public update_at: string;
  public state_user: string;
  public rol: Rol;
  public person: Person;
  public enterprise: Enterprise;

  public modules: Module[];
}
