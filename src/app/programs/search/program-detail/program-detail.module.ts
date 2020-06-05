import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { ProgramDetailPage } from "./program-detail.page";
import { MapComponent } from './map/map.component';
import { AgePipe } from '../pipe/age.pipe';

const routes: Routes = [
  {
    path: "",
    component: ProgramDetailPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ProgramDetailPage, MapComponent],
  providers:[AgePipe]
})
export class ProgramDetailPageModule {}
