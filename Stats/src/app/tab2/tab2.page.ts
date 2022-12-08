import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild('ipInput') ipAddress!: IonInput;
  constructor(private storage: Storage) { }

  async ionViewWillEnter() { this.ipAddress.value = await this.storage.get("ip"); }
  async setLocalIp() { await this.storage.set("ip", this.ipAddress.value); }
}
