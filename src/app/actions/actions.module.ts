import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActionsPageRoutingModule } from './actions-routing.module';

import { ActionsPage } from './actions.page';
import { AccordianComponent } from './accordian/accordian.component';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActionsPageRoutingModule,
  ],
  declarations: [ActionsPage, AccordianComponent],
  entryComponents: [AccordianComponent],
  providers: [
    Contacts
  ]
})
export class ActionsPageModule {}
