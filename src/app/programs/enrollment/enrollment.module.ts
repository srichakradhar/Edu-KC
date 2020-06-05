import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnrollmentPageRoutingModule } from './enrollment-routing.module';

import { EnrollmentPage } from './enrollment.page';

import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCalendarModule,
    EnrollmentPageRoutingModule
  ],
  declarations: [EnrollmentPage]
})
export class EnrollmentPageModule {}
