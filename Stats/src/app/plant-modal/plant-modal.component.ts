import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-plant-modal',
  templateUrl: './plant-modal.component.html',
  styleUrls: ['./plant-modal.component.scss'],
})
export class PlantModalComponent {

  @ViewChild("groundHumidityCanvas") public groundHumidityCanvas!: ElementRef;
  private groundHumidityChart?: Chart;

  public groundHumidityChartConfiguration: ChartConfiguration = {
    type: "line", data: {
      datasets: [{
        data: [ ],
        label: 'Ground Humidity',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }], labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ]
    },
    options: {
      elements: { line: { tension: 0.5 } },
      scales: {
        y: { position: 'left' },
        y1: {
          position: 'right',
          grid: { color: 'rgba(255,50,50,0.2)' },
          ticks: { color: 'rgba(0,0,0,0)' }
        }
      }, plugins: { legend: { display: true } } } }

  constructor(private http: HttpClient, private storage: Storage, private modalController: ModalController) { }

  dismissModal() { this.modalController.dismiss(); }
  async ionViewWillEnter() { this.renderChart(); }
  async renderChart() {
    if (!this.groundHumidityChart) {
      this.http.get(environment.groundhumidity.replace("ipAddress", (await this.storage.get("ip")))).subscribe((result: any) => {
        let values = []
        for(let index in result) values.push(result[index].level)

        this.groundHumidityChartConfiguration.data.datasets[0].data = values;
        this.groundHumidityChart = new Chart(this.groundHumidityCanvas.nativeElement, this.groundHumidityChartConfiguration);
      });
    }
  }
}
