import { ProvinceData } from 'src/app/models/province-data';
import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {
  title = 'angular-ng2-charts-demo';
  salesData: ChartData<'line'> = {
    labels: [],
    // for(let i = 0; i < ProvinceData){

    // },
    datasets: [
      { label: 'New Cases', data: [1000, 1200, 1050, 2000, 500], tension: 0.5 },
      { label: 'New Deaths', data: [200, 100, 400, 50, 90], tension: 0.5 },
      { label: 'New Recovered', data: [500, 400, 350, 450, 650], tension: 0.5 },
    ],
  };
  salesData2: ChartData<'pie'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      { data: [1000, 1200, 1050, 2000, 500] },
    ],
  };
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Bar chart',
      },
    },
  };
}


