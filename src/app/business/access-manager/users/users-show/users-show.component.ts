import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { Person } from 'src/app/shared/models/person';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { PersonService } from 'src/app/shared/services/person.service';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { Rol } from 'src/app/shared/models/rol';
import { RolService } from 'src/app/shared/services/rol.service';
import { AccessEnterprise } from 'src/app/shared/models/access-enterprise';
import { AccessEnterpriseService } from 'src/app/shared/services/access-enterprise.service';
import { faThList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users-show',
  templateUrl: 'user-show.component.html',
  styles: []
})
export class UsersShowComponent implements OnInit {
  faThList = faThList;
  id_user = 0;

  user: User = new User;
  person: Person = new Person;
  enterprise: Enterprise = new Enterprise;
  rol: Rol = new Rol;
  accessEnterprise: AccessEnterprise = new AccessEnterprise;

  constructor(
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private personService: PersonService,
    private enterpriseService: EnterpriseService,
    private rolService: RolService,
    private accessEnterpriseService: AccessEnterpriseService
  ) { }

  ngOnInit() {
    let id = this.activateRoute.snapshot.params['id'];
    this.id_user = id;
    this.getInfoById(id);
  }

  private getInfoById(id:number){
    this.userService.show$(id).pipe(
      tap((user:User) => this.user = user),
      tap((user: User) => this.personService.show$(user.fk_id_person).subscribe(
        person => this.person = person
      )),
      tap((user:User) => this.enterpriseService.show$(user.fk_id_enterprise).subscribe(
        enterprise => this.enterprise = enterprise
      )),
      tap((user:User) => this.rolService.show$(user.fk_id_rol).subscribe(
        rol => this.rol = rol
      )),
      tap((user:User) => this.accessEnterpriseService.getAccessByEnterprise$(user.fk_id_enterprise).subscribe(
        access_enterprise => this.accessEnterprise = access_enterprise
      ))
    ).subscribe()
  }

}
