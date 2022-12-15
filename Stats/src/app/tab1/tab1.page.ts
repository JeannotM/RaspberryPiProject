import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private months = ["Jan", "Feb", "Maa", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]

  @ViewChild("waterPumpedCanvas") public waterPumpedCanvas!: ElementRef;
  @ViewChild("waterLevelCanvas") public waterLevelCanvas!: ElementRef;

  private waterPumpedChart?: Chart;
  private waterLevelChart?: Chart;

  public waterLevelChartConfiguration: ChartConfiguration = {
    type: "line", data: {
      datasets: [{
        data: [ ],
        label: 'Water level',
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

  public waterPumpedChartConfiguration: ChartConfiguration = {
    type: "line", data: {
      datasets: [{
        data: [ ],
        label: 'Water Pumped',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin'
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

  constructor(private http: HttpClient, private storage: Storage) { }

  formatDate(date: Date) { return date.getDate() + " " + this.months[date.getMonth()] + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes(); }
  async ionViewWillEnter() { this.renderChart(); }
  async renderChart() {
    if (!this.waterLevelChart) {
      this.http.get(environment.waterlevel.replace("ipAddress", (await this.storage.get("ip")))).subscribe((result: any) => {
        let values = []
        let timeStamps = []
        let i = 0;
        for(let index in result) {
          if(i++ > 10) break;
          values.push(result[index].level);
          timeStamps.push(this.formatDate(new Date(result[index].created_at)));
        }

        this.waterLevelChartConfiguration.data.datasets[0].data = values;
        this.waterLevelChartConfiguration.data.labels = timeStamps;
        this.waterLevelChart = new Chart(this.waterLevelCanvas.nativeElement, this.waterLevelChartConfiguration);
      });
    }

    if (!this.waterPumpedChart) {
      this.http.get(environment.waterpumped.replace("ipAddress", (await this.storage.get("ip")))).subscribe((result: any) => {
        let values = []
        let timeStamps = []
        let i = 0;
        for(let index in result) {
          if(i++ > 10) break;
          values.push(result[index].level);
          timeStamps.push(this.formatDate(new Date(result[index].created_at)));
        }

        this.waterPumpedChartConfiguration.data.datasets[0].data = values;
        this.waterPumpedChartConfiguration.data.labels = timeStamps;
        this.waterPumpedChart = new Chart(this.waterPumpedCanvas.nativeElement, this.waterPumpedChartConfiguration);
      });
    }
  }
}
