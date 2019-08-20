import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormToolsService } from '../../shared/services/form-tools.service';
import { StatusMessage } from '../../shared/models/status-message';
import { GlobalStoreService } from '../../core/services/global-store.service';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Authentication } from 'src/app/shared/models/authentication';
import { tap } from 'rxjs/operators';
import { PersonService } from 'src/app/shared/services/person.service';
import { Person } from 'src/app/shared/models/person';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  authenticationForm: FormGroup;
  userLogin: User = new User;

  success = true;
  code = '';
  description = '';

  public user$: Observable<User> = this.globalStoreService.getUser$();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
    private userService: UserService,
    private globalStoreService: GlobalStoreService,
    private router: Router,
    private personService: PersonService,
    private authenticationService: AuthenticationService,
    private enterPriseService: EnterpriseService
     ) {
    }

  ngOnInit() {
    this.initForm();
  }

  private initForm(){
    this.authenticationForm = this.fb.group({
      username: ['', Validators.required],
      token:[''],
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
    tap((user: User) => {
      this.userLogin = user
    }),
    tap((user:User) => {
      let auth = new Authentication;
      auth.api_token = user.api_token;
      auth.username = user.username;

      this.authenticationService.store$(auth).subscribe();
    }),
    tap((user:User) => {
      this.personService.showLogin$(user.fk_id_person).subscribe(
        person => {
          this.userLogin.person = person;
        }
      )
    }),
    tap((user:User) => {
      this.enterPriseService.showLogin$(user.fk_id_enterprise).subscribe(
        enterprise => {
          this.userLogin.enterprise = enterprise;
        }
      )
    }),
    tap((user:User) => {
      this.globalStoreService.setUser(user);
    })
  )
  .subscribe(
    () => this.router.navigateByUrl('/sales-admin/modules'), 
    (error:any) => {
      this.success = false;
      this.code = error.error.code;
      this.description = error.error.message;
      this.initForm();
  });
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
}
