import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormToolsService } from './services/form-tools.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { PagesComponent } from './pages/pages.component';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [CardComponent, PagesComponent],
  exports: [ ReactiveFormsModule, CardComponent, PagesComponent ],
  providers: [ FormToolsService, UserService ]
})
export class SharedModule { }
