import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IpSettingModalComponent } from '../ip-setting-modal/ip-setting-modal.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private modalController: ModalController) { }

  async presentSettingsModal() {
    const modal = await this.modalController.create({
      component: IpSettingModalComponent,
      cssClass: 'app.component'
    });
    return await modal.present();
  }
}
