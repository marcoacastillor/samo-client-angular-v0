import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormToolsService } from '../../shared/services/form-tools.service';
import { StatusMessage } from '../../shared/models/status-message';
import { GlobalStoreService } from '../../core/services/global-store.service';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { OptionRolService } from 'src/app/shared/services/option-rol.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Authentication } from 'src/app/shared/models/authentication';
import { tap, switchMap } from 'rxjs/operators';
import { PersonService } from 'src/app/shared/services/person.service';
import { Person } from 'src/app/shared/models/person';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  authenticationForm: FormGroup;
  status: StatusMessage = null;
  userLogin: User = new User;
  personLogin: Person = new Person;

  public user$: Observable<User> = this.globalStoreService.getUser$();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
    private userService: UserService,
    private globalStoreService: GlobalStoreService,
    private router: Router,
    private personService: PersonService,
    private authenticationService: AuthenticationService
     ) {
    }

  ngOnInit() {
    this.authenticationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
  public onLogin() {
    this.userService.sendCredential$(this.authenticationForm.value).pipe(
      tap(this.loadUser),
      tap(this.setAuthenticationVentas),
      switchMap((user: User): Observable<Person> => this.personService.showLogin$(user[0].fk_id_person)),
      tap(this.setUserSession)
    )
    .subscribe(this.onSuccess, this.onError);
  }
  
  private setAuthenticationVentas = (user: User) : void => {
    // inicio: envío info a sistema de Ventas
    let auth = new Authentication;
    auth.api_token = user[0].api_token;
    auth.username = user[0].username;

    this.authenticationService.store$(auth).subscribe();
    // fin: envío info a sistema de Ventas
  }

  private loadUser = (user: User): void => {
    this.userLogin = user[0];
  }

  private setUserSession = (person: Person): void => {
    this.userLogin.person = person;
    this.globalStoreService.setUser(this.userLogin);
  }

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.authenticationForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.authenticationForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.authenticationForm, controlName, errorCode);
  }

  /*
  * ------------------------------------------
  * Funciones validación de resultado
  * ------------------------------------------
  */
  private onSuccess = () => {
    this.globalStoreService.dispatchUserMessage('200', 'Login exitoso... Cargando módulos para el usuario. ');
    this.router.navigateByUrl('/sales-admin/modules');
  }

  private onError = (error: any) => {
      this.status = new StatusMessage;
      this.globalStoreService.setUser(null);

      this.authenticationForm.reset();
      this.status.code = error.status;
      this.status.desc = error.statusText;
      this.status.serverDesc = error.error.error;
  }
}
