import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { LinksComponent } from './links/links.component';
import { InfoComponent } from './info/info.component';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule
  ],
  declarations: [AboutComponent, LinksComponent, InfoComponent]
})
export class AboutModule { }
