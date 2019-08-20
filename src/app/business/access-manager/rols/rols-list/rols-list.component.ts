import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Rol } from 'src/app/shared/models/rol';
import { RolService } from 'src/app/shared/services/rol.service';

@Component({
  selector: 'app-rols-list',
  templateUrl: 'rols-list.component.html',
  styles: []
})
export class RolsListComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;

  lstRols: Rol[] = [];
  selectedRol: Rol = new Rol;

  success = false;
  message = '';

  constructor(
    private rolService: RolService
    ) { }

  ngOnInit() {
    this.loadAllRols();
  }

  private loadAllRols(){
    this.rolService.getAll$().subscribe(
      rols => this.lstRols = rols
    )
  }

  public newRol(){
    this.selectedRol = new Rol;
  }

  public selectRol(rol:Rol){
    this.selectedRol = rol;
  }

  public deleteRol(){
    this.rolService.delete$(this.selectedRol.pk_id_rol).subscribe(
      () => {
        this.loadAllRols();
        this.success = true;
        this.message = 'Se elimina registro satisfactoriamente.';
      }
    )
  }

  public onCreate(rol:Rol){
    this.rolService.store$(rol).subscribe(
      () => {
        this.loadAllRols();
        this.success = true;
        this.message = 'Se crea registro satisfactoriamente.';
      }
    )
  }

  public onUpdate(rol:Rol){
    this.rolService.update$(rol).subscribe(
      () => {
        this.loadAllRols();
        this.success = true;
        this.message = 'Se actualiza registro satisfactoriamente.';
      }
    )
  }

}
