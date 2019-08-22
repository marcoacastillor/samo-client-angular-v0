import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/shared/models/user';
import { Rol } from 'src/app/shared/models/rol';
import { Person } from 'src/app/shared/models/person';
import { Parameter } from 'src/app/shared/models/parameter';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { UserService } from 'src/app/shared/services/user.service';
import { RolService } from 'src/app/shared/services/rol.service';
import { PersonService } from 'src/app/shared/services/person.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { environment } from 'src/environments/environment';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';

@Component({
  selector: 'app-users-owners-list',
  templateUrl: 'users-owners-list.component.html',
  styles: []
})
export class UsersOwnersListComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;

  lstUsers: User[] = [];
  selectedUser: User = new User;

  lstRoles: Rol[] = [];
  lstPersons: Person[] = [];
  lstParameters: Parameter[] = [];
  lstEnterprise: Enterprise[] = [];

  userActive: User = new User;

  success = false;
  message = '';

  constructor(
    private userService: UserService,
    private rolService: RolService,
    private personService: PersonService,
    private parameterService: ParameterService,
    private enterpriseService: EnterpriseService,
    private globalStoreService: GlobalStoreService
    ) { }

  ngOnInit() {
    this.userActive = this.globalStoreService.getUser();
    this.loadUsersByEnterprise(this.userActive.fk_id_enterprise);
  }

  public loadParameters(){
   this.rolService.getAllNotSuperadmin$().subscribe(
     lst_roles => this.lstRoles = lst_roles
   );
   this.parameterService.getByCodeCategory$(environment.state_user).subscribe(
    lst_parameter => this.lstParameters = lst_parameter
   );
   this.enterpriseService.getAllByType$(environment.enterprise_owner).subscribe(
     lst_enterprise => this.lstEnterprise = lst_enterprise
   )
  }

  public getEmployees(id_enterprise: number) {
    this.personService.getEmployeesByEnterprise$(id_enterprise).subscribe(
      persons => this.lstPersons = persons
    );
  }

  private loadUsersByEnterprise(id:number){
    this.userService.getUserByEnteprise$(id).subscribe(
      users => this.lstUsers = users
    )
  }

  public newUser(){
    this.selectedUser = new User;
    this.selectedUser.fk_id_enterprise = this.userActive.fk_id_enterprise;
  }

  public selectUser(user:User){
    this.selectedUser = user;
  }

  public deleteUser(){
    this.userService.delete$(this.selectedUser.pk_id_user).subscribe(
      () => {
        this.loadUsersByEnterprise(this.userActive.fk_id_enterprise);
        this.success = true;
        this.message = 'Se elimina registro satisfactoriamente.';
      }
    )
  }

  public onCreate(user:User){
    this.userService.store$(user).subscribe(
      () => {
        this.loadUsersByEnterprise(this.userActive.fk_id_enterprise);
        this.success = true;
        this.message = 'Se crea registro satisfactoriamente.';
      }
    )
  }

  public onUpdate(user:User){
    this.userService.update$(user).subscribe(
      () => {
        this.loadUsersByEnterprise(this.userActive.fk_id_enterprise)
        this.success = true;
        this.message = 'Se actualiza registro satisfactoriamente.';
      }
    )
  }

}
