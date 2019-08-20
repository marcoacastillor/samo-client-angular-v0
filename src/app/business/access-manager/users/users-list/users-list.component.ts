import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { RolService } from 'src/app/shared/services/rol.service';
import { PersonService } from 'src/app/shared/services/person.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { Rol } from 'src/app/shared/models/rol';
import { Person } from 'src/app/shared/models/person';
import { Parameter } from 'src/app/shared/models/parameter';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users-list',
  templateUrl: 'user-list.component.html',
  styles: []
})
export class UsersListComponent implements OnInit {
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


  success = false;
  message = '';

  constructor(
    private userService: UserService,
    private rolService: RolService,
    private personService: PersonService,
    private parameterService: ParameterService,
    private enterpriseService: EnterpriseService
    ) { }

  ngOnInit() {
    this.loadAllUsers();
  }

  public loadParameters(){
   this.rolService.getAll$().subscribe(
     lst_roles => this.lstRoles = lst_roles
   );
   this.parameterService.getByCodeCategory$(environment.state_user).subscribe(
    lst_parameter => this.lstParameters = lst_parameter
   );
   this.enterpriseService.getAllByType$(environment.enterprise_owner).subscribe(
     lst_enterprise => this.lstEnterprise = lst_enterprise
   )
  }

  public onGetEmployees(id_enterprise: number) {
    this.personService.getEmployeesByEnterprise$(id_enterprise).subscribe(
      persons => this.lstPersons = persons
    );
  }

  private loadAllUsers(){
    this.userService.getAll$().subscribe(
      users => this.lstUsers = users
    )
  }

  public newUser(){
    this.selectedUser = new User;
  }

  public selectUser(user:User){
    this.selectedUser = user;
    this.onGetEmployees(user.fk_id_enterprise);
  }

  public deleteUser(){
    this.userService.delete$(this.selectedUser.pk_id_user).subscribe(
      () => {
        this.loadAllUsers();
        this.success = true;
        this.message = 'Se elimina registro satisfactoriamente.';
      }
    )
  }

  public onCreate(user:User){
    this.userService.store$(user).subscribe(
      () => {
        this.loadAllUsers();
        this.success = true;
        this.message = 'Se crea registro satisfactoriamente.';
      }
    )
  }

  public onUpdate(user:User){
    this.userService.update$(user).subscribe(
      () => {
        this.loadAllUsers();
        this.success = true;
        this.message = 'Se actualiza registro satisfactoriamente.';
      }
    )
  }

}
