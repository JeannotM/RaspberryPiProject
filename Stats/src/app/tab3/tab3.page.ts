import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { PlantModalComponent } from '../plant-modal/plant-modal.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  // Overengineering is the only way to live

  public registeredPlants = [];

  constructor(private http: HttpClient, private storage: Storage, public modalController: ModalController) { }
  async ionViewWillEnter() { 
    if (this.registeredPlants.length == 0) {
      this.http.get(environment.plants.replace("ipAddress", (await this.storage.get("ip")))).subscribe((result: any) => {
        this.registeredPlants = result;
      });
    }
  }

  async addNewPlant() {
    if (this.registeredPlants.length < 2) {
      const options = {
        headers: { "Content-Type": "application/json" } 
      }
      this.http.post(environment.plants.replace("ipAddress", (await this.storage.get("ip"))), {"name": "Nieuwe Plant"}, options).subscribe((result: any) => {
        this.registeredPlants = [];
        this.ionViewWillEnter();
      });
    }
  }

  async presentPlantModal(clickedPlant: any) {
    const modal = await this.modalController.create({
      component: PlantModalComponent,
      cssClass: 'update-modal-height',
      componentProps: { plant: clickedPlant }
    });
    return await modal.present();
  }
}
