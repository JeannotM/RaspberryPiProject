import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PlantModalComponent } from '../plant-modal/plant-modal.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private http: HttpClient, private storage: Storage, public modalController: ModalController) { }

  async presentPlantModal() {
    const modal = await this.modalController.create({
      component: PlantModalComponent,
      cssClass: 'update-modal-height'
    });
    return await modal.present();
  }
}
