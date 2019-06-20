import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Rol } from 'src/app/shared/models/rol';
import { Person } from 'src/app/shared/models/person';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { User } from 'src/app/shared/models/user';
import { Parameter } from 'src/app/shared/models/parameter';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { PositionService } from 'src/app/shared/services/position.service';
import { Position } from 'src/app/shared/models/position';

@Component({
  selector: 'app-new-user',
  templateUrl: 'new-user.component.html',
  styles: []
})
export class NewUserComponent implements OnInit, OnChanges {
  userForm: FormGroup;
  faPlusCircle = faPlusCircle;

  @Input() public rolList: Rol[];
  @Input() public personList: Person[];
  @Input() public statesUser: Parameter[];
  @Input() public sizesList: Parameter[];

  @Input() public rol: Rol;
  @Input() public user: User;

  // Datos para crear usuario
  @Input() public typesIdList: Parameter[];
  @Input() public enterpriseList: Enterprise[];
  @Input() public laboralStateList: Parameter[];
  @Input() public salaryTypeList : Position[];

  @Output() public create = new EventEmitter<User>();
  @Output() public update = new EventEmitter<User>();
  @Output() public cancel = new EventEmitter<boolean>();
  @Output() public getRol = new EventEmitter<number>();

  @Output() public onCreatePerson = new EventEmitter<Person>();
  @Output() public onCreateEnterprise = new EventEmitter<Enterprise>();
  @Output() public getEmployees = new EventEmitter<number>();

  positionList: Position[] = [];

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
    private positionService: PositionService
  ) { }

  ngOnInit() {
    this.initUpdForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.user)
    {
      if(changes.user.currentValue != changes.user.previousValue)
      {
        this.initUpdForm();
      }
    }
  }

  public getEmployeesByEnterprise(){
    this.getEmployees.emit(this.userForm.value.fk_id_enterprise);
  }

  public getPositionByEnterprise(){
    this.positionService.getByEnterpsie$(this.userForm.value.fk_id_enterprise).subscribe(
      positions => this.positionList = positions
    )
  }

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
  private initUpdForm() {
    this.userForm = this.fb.group({
      pk_id_user: [this.user.pk_id_user],
      username: [this.user.username, Validators.required],
      email: [this.user.email, Validators.email],
      password: ['', [Validators.required, Validators.minLength(3)]],
      state_user: [this.user.state_user, Validators.required],
      fk_id_rol: [this.user.fk_id_rol, Validators.required],
      fk_id_person: [this.user.fk_id_person],
      fk_id_enterprise: ['']
    });
  }

  public createUser() {
    let user = new User;
    user = this.userForm.value;
    this.rol = new Rol;
    this.create.emit(user);
  }

  public updateUser()
  {
    let user = new User;
    user = this.userForm.value;
    this.update.emit(user);
  }

  public getOptions() {
    this.getRol.emit(this.userForm.value.fk_id_rol);
  }

  public cancelUser() {
    this.cancel.emit(false);
  }

  public createPerson(person: Person){
    this.onCreatePerson.emit(person);
  }

  public createEnterprise(enterprise: Enterprise){
    this.onCreateEnterprise.emit(enterprise);
  }

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.userForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.userForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.userForm, controlName, errorCode);
  }

}
