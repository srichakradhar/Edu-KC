import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { Routes, RouterModule } from "@angular/router";

import { SearchPage } from "./search.page";
import { TruncatePipe } from "./pipe/truncate.pipe";
import { FilterModalComponent } from '../filter-modal/filter-modal.component';
import { AgePipe } from './pipe/age.pipe';

const routes: Routes = [
  {
    path: "",
    component: SearchPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SearchPage, TruncatePipe, FilterModalComponent, AgePipe],
  entryComponents: [
    FilterModalComponent
  ]
})
export class SearchPageModule {}
