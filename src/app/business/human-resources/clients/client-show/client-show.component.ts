import { Component, OnInit } from '@angular/core';
import { faThList, faEye } from '@fortawesome/free-solid-svg-icons';
import { Person } from 'src/app/shared/models/person';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from 'src/app/shared/services/person.service';
import { OperationService } from 'src/app/shared/services/operation.service';
import { Operation } from 'src/app/shared/models/operation';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-client-show',
  templateUrl: 'client-show.component.html',
  styles: []
})
export class ClientShowComponent implements OnInit {
  faThList = faThList;
  faEye = faEye;

  id_person: number;
  person: Person = new Person;
  lstOperations: Operation[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private personService: PersonService,
    private operationService: OperationService
  ) { }

  ngOnInit() {
    this.id_person = this.activateRoute.snapshot.params['id'];
    this.getDetailClient(this.id_person);
  }

  private getDetailClient(id: number){
    this.personService.show$(id).pipe(
      tap((person:Person) => this.person= person),
      tap((person:Person) => {
        this.operationService.getOperationByClient$(person.pk_id_person).subscribe(
          operations => this.lstOperations = operations
        )
      })
    ).subscribe()

  }

}
