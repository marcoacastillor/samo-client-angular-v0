import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { Rol } from 'src/app/shared/models/rol';
import { Person } from 'src/app/shared/models/person';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { UserService } from 'src/app/shared/services/user.service';
import { RolService } from 'src/app/shared/services/rol.service';
import { PersonService } from 'src/app/shared/services/person.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { tap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { Parameter } from 'src/app/shared/models/parameter';
import { environment } from 'src/environments/environment';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { Position } from 'src/app/shared/models/position';

@Component({
  selector: 'app-main-user',
  templateUrl: 'main-user.component.html',
  styles: []
})
export class MainUserComponent implements OnInit {
  public userList: User[] = [];
  public rolList: Rol[] = [];
  public personList: Person[] = [];
  public statesUser: Parameter[] = [];

  //datos para crear pesona
  public enterpriseList: Enterprise[] = [];
  
  public newUser = false;
  public showUser = false;
  public listUser = true;
  
  public rol: Rol = new Rol;
  public user: User = new User;
  public activeUser: User = new User;
  
  constructor(
    private globalStoreService: GlobalStoreService,
    private usuarioService: UserService,
    private rolService: RolService,
    private personService: PersonService,
    private UtilService: UtilsService,
    private parameterService: ParameterService,
    private enterpriseService: EnterpriseService,
  ) { }

  ngOnInit() { 
    this.activeUser = this.globalStoreService.getUser();
    this.loadDataCreation();
    
    this.user.rol = new Rol;
    this.user.person = new Person;
  }

  private loadDataCreation(){ 
    this.loadUsers();
    this.loadRols();
  }

  private loadUsers() {
    this.usuarioService.getAll$().subscribe(
      users => this.userList = users
    );
  }

  private loadRols() {
    this.rolService.getAll$().subscribe(
      rols => this.rolList = rols
    );
  }

  public onGetEmployees(id_enterprise: number) {
    this.personService.getEmployeesByEnterprise$(id_enterprise).subscribe(
      persons => this.personList = persons
    );
  }

  private loadStates(){
    this.parameterService.getByCodeCategory$(environment.state_user).subscribe(
      states => this.statesUser = states
    );
  }

  private loadEnterprisesOwners(){
    this.enterpriseService.getByType$(environment.enterprise_owner).subscribe(
      enterprises => this.enterpriseList = enterprises
    );
  }

  public onGetRol(id: number) {
    this.rolService.show$(id).subscribe(
      rol => this.rol = rol
    );
  }

  public onCreate(user: User) {
    this.usuarioService.store$(user).subscribe(this.onSuccess);
    this.rol = new Rol();
    this.user = new User();
    this.personList = [];
  }

  public onUpdate(user: User) {
    this.usuarioService.update$(user).subscribe(this.onSuccess);
    this.rol = new Rol();
    this.user = new User();
  }

  public onDelete(id: number) {
    this.usuarioService.delete$(id).subscribe(this.onSuccess);
  }

  public onShow(id:number) {
    this.showUser = true;
    this.newUser = false;
    this.listUser = false;

    this.usuarioService.show$(id).pipe(
      tap(this.loadUser),
      switchMap((user: User): Observable<Person> => this.personService.show$(user.fk_id_person)),
      tap(this.loadPerson),
    ).subscribe(this.onSuccess);
  }

  private loadUser = (user: User): void => {
    this.user = user;
  }

  private loadPerson = (person: Person): void => {
    this.user.person = person;
  }

  public onNew(user: User) {
    this.newUser = true;
    this.showUser = false;
    this.listUser = false;
    let activeUser = this.globalStoreService.getUser();

    this.loadStates();
    this.loadEnterprisesOwners();
    
    if(user.pk_id_user)
    {
      this.user = user;
    }
    else
    {  
      this.user = user;
      this.user.fk_id_enterprise = activeUser.fk_id_enterprise;
      this.user.rol = new Rol;
      this.user.person = new Person;
    }
  }

  public onInactive(user: User) {
    let usernew = user;
    if(user.state_user === 'Activo')
      usernew.state_user = 'Inactivo';
    else
      usernew.state_user = 'Activo';

    this.usuarioService.update$(usernew).subscribe(this.onSuccess);
  }

  public onCancel(event: boolean) {
    this.listUser = event;
    this.newUser  = false;
    this.showUser = false;
  }

  public onCancelShow(event: boolean) {
    this.listUser = event;
    this.newUser  = false;
    this.showUser = false;
  }

  /*
  * ------------------------------------------
  * Funciones validación de resultado
  * ------------------------------------------
  */
  private onSuccess = () => {
  this.globalStoreService.dispatchUserMessage('200', ' Se ejecutó exitosamente, la operación ');
  this.loadUsers();
  }

  /*
  * ------------------------------------------
  * Funciones visualización
  * ------------------------------------------
  */
  public getClassNew() {
    return this.UtilService.getClassNew(this.newUser);
  }

  public getClassList() {
    return this.UtilService.getClassList(this.listUser);
  }

  public getClassShow() {
    return this.UtilService.getClassShow(this.showUser);
  }

}

