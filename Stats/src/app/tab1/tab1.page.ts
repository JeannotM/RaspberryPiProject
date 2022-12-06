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
  @ViewChild("lineChart") public lineChart!: ElementRef;
  private chart?: Chart;

  public chartConfiguration: ChartConfiguration = {
    type: "line",
    data: {
      datasets: [
        {
          data: [ 0 ],
          label: 'Water level',
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        }
      ],
      labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ],
    },
    options: {
      elements: { line: { tension: 0.5 } },
      scales: {
        // We use this empty structure as a placeholder for dynamic theming.
        y: { position: 'left' },
        y1: {
          position: 'right',
          grid: { color: 'rgba(255,50,50,0.2)' },
          ticks: { color: 'rgba(0,0,0,0)' }
        }
      },
  
      plugins: { legend: { display: true } }
    }
  }

  constructor(private http: HttpClient, private storage: Storage) { console.log(storage.get("asd")) }

  ionViewWillEnter() { this.renderChart(); }
  renderChart(): void {
    if(!this.chart) {
      this.http.get(environment.waterlevel).subscribe((result: any) => {
        let values = []
        for(let index in result) values.push(result[index].level)

        this.chartConfiguration.data.datasets[0].data = values;
        this.chart = new Chart(this.lineChart.nativeElement, this.chartConfiguration);
      });
    }
  }
}
