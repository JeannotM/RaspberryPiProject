import { Component, ViewChild } from '@angular/core';
import { IonInput, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-ip-setting-modal',
  templateUrl: './ip-setting-modal.component.html',
  styleUrls: ['./ip-setting-modal.component.scss'],
})
export class IpSettingModalComponent {

  @ViewChild('ipInput') ipAddress!: IonInput;
  constructor(private storage: Storage, private modalController: ModalController) { }

  dismissModal() { this.modalController.dismiss(); }
  async ionViewWillEnter() { this.ipAddress.value = await this.storage.get("ip"); }
  async setLocalIp() { await this.storage.set("ip", this.ipAddress.value); }

}
