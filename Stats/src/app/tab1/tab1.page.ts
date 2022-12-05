import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';

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
          data: [ 65, 59, 80, 81, 56, 55, 40 ],
          label: 'Series A',
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        },
        {
          data: [ 28, 48, 40, 19, 86, 27, 90 ],
          label: 'Series B',
          backgroundColor: 'rgba(77,83,96,0.2)',
          borderColor: 'rgba(77,83,96,1)',
          pointBackgroundColor: 'rgba(77,83,96,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(77,83,96,1)',
          fill: 'origin',
        },
        {
          data: [ 180, 480, 770, 90, 1000, 270, 400 ],
          label: 'Series C',
          yAxisID: 'y1',
          backgroundColor: 'rgba(255,0,0,0.3)',
          borderColor: 'red',
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
          grid: { color: 'rgba(255,0,0,0.3)' },
          ticks: { color: 'red' }
        }
      },
  
      plugins: { legend: { display: true } }
    }
  }

  ionViewWillEnter() { this.renderChart(); }
  renderChart(): void {
    if(!this.chart)
      this.chart = new Chart(this.lineChart.nativeElement, this.chartConfiguration);
  }
}
