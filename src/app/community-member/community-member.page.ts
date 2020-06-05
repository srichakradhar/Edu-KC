import { Component, OnInit, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProgramFormComponent } from './program-form/program-form.component';
import { CommunityMemberService } from './community-member.service';

@Component({
  selector: 'app-community-member',
  templateUrl: './community-member.page.html',
  styleUrls: ['./community-member.page.scss'],
})
export class CommunityMemberPage implements OnInit {
  public programs: any = []
  constructor(public modalController: ModalController,
    private commService: CommunityMemberService) {

  }

  ngOnInit() {
    const programs = JSON.parse(localStorage.getItem('program'));
    if (programs){
      this.programs.push(programs);
    }
  }

  async openProgramModal() {
    let closeEventEmitter = new EventEmitter();
    let saveEventEmitter = new EventEmitter();
    const modal = await this.modalController.create({
      component: ProgramFormComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        clickClose: closeEventEmitter,
        clickSave: saveEventEmitter,
      },
    });

    closeEventEmitter.subscribe((res) => {
      modal.dismiss();
    });

    saveEventEmitter.subscribe((res) => {
      if (res) {
        this.programs.push(res);
      }
      modal.dismiss();
    });

    modal.onDidDismiss().then((data) => {
      console.log("closed");
    });

    return modal.present().then(() => {
      console.log(modal);
    });
  }

}
