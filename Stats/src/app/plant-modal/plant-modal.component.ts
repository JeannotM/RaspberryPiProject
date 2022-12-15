import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-plant-modal',
  templateUrl: './plant-modal.component.html',
  styleUrls: ['./plant-modal.component.scss'],
})
export class PlantModalComponent implements OnInit {

  private months = ["Jan", "Feb", "Maa", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]

  @ViewChild("groundHumidityCanvas") public groundHumidityCanvas!: ElementRef;
  private groundHumidityChart?: Chart;

  public plant: any = {};

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
      }], labels: []
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

  constructor(private http: HttpClient, private storage: Storage, private modalController: ModalController, private navParams: NavParams) { }
  async ngOnInit() {
    this.plant = this.navParams.get("plant");
    this.renderChart();
  }

  dismissModal() { this.modalController.dismiss(); }
  formatDate(date: Date) { return date.getDate() + " " + this.months[date.getMonth()] + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes(); }

  async renderChart() {
    if (!this.groundHumidityChart) {
      this.http.get(environment.groundhumidity.replace("ipAddress", (await this.storage.get("ip"))) + "/" + this.plant['id']).subscribe((result: any) => {
        let values = []
        let timeStamps = []
        let i = 0;
        for(let index in result) {
          if(i++ > 10) break;
          values.push(result[index].level);
          timeStamps.push(this.formatDate(new Date(result[index].created_at)));
        }

        this.groundHumidityChartConfiguration.data.datasets[0].data = values;
        this.groundHumidityChartConfiguration.data.labels = timeStamps;
        this.groundHumidityChart = new Chart(this.groundHumidityCanvas.nativeElement, this.groundHumidityChartConfiguration);
      });
    }
  }
}
