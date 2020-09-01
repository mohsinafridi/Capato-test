import { Component } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent {
  title = 'Sample data of  age distribution among the company.';
  chartType = 'LineChart';
  myData = [
      ['20-30', 12],
      ['30-40', 11],
      ['40-50', 22],
      ['50-60', 5],
      ['60+', 4],
    ];

    options = {
      hAxis: {
         title: 'Age'
      },
      vAxis: {
         title: 'Total number of Employees'
      },
   };
    width = 550;
    height = 400;

}
