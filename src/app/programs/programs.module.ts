import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProgramsPageRoutingModule } from "./programs-routing.module";

import { ProgramsPage } from "./programs.page";
import { AgePipe } from './search/pipe/age.pipe';
import { CommunityComponent } from './community/community.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProgramsPageRoutingModule,
  ],
  declarations: [ProgramsPage, CommunityComponent],
})
export class ProgramsPageModule {}
