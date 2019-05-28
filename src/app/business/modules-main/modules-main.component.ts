import { Component, OnInit } from '@angular/core';
import { Module } from 'src/app/shared/models/module';
import { ModuleService } from 'src/app/shared/services/module.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modules-main',
  templateUrl: 'modules-main.component.html',
  styles: []
})
export class ModulesMainComponent implements OnInit {
  public url_storage: string = environment.url_storage;
  public modules: Module[] = [];
  constructor(
    private moduleService: ModuleService
  ) { }

  ngOnInit() {
    this.moduleService.getAll$().subscribe(
      modules => this.modules = modules
    )
  }

}
