import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalStoreService } from '../../core/services/global-store.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, Observable, interval } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ModuleService } from '../../shared/services/module.service';
import { Module } from '../../shared/models/module';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-main-menu',
  templateUrl: 'main-menu.component.html',
  styles: []
})
export class MainMenuComponent implements OnInit {
  public modules: Module[] = [];

  constructor(
    private moduleService: ModuleService
    ) {
  }

  ngOnInit() {
  }
}
