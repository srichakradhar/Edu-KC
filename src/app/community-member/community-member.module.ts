import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommunityMemberPageRoutingModule } from './community-member-routing.module';

import { CommunityMemberPage } from './community-member.page';
import { ProgramFormComponent } from './program-form/program-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommunityMemberPageRoutingModule
  ],
  declarations: [CommunityMemberPage, ProgramFormComponent]
})
export class CommunityMemberPageModule {}
