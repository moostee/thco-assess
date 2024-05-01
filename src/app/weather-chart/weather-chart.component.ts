import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartConfiguration } from 'chart.js';


@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.css'],

})
export class WeatherChartComponent implements OnInit {
  @Input() temperatures: number[] = [];
  @Input() labels: string[] = [];

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Temperature',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: 'Weather Forecast Analysis'
      },
      tooltip: {
        enabled: true,
        position: 'nearest',
        //external: externalTooltipHandler
      }
    }
  };

  public lineChartLegend = true;
  constructor() { }

  ngOnInit(): void {
    //this.lineChartOptions.plugins?.title?.text = '';
    this.lineChartData.labels = this.labels;
    this.lineChartData.datasets[0].data = this.temperatures;
  }

  public lineChartColors = [
    {
      borderColor: 'rgba(0,0,255,0.3)',
      backgroundColor: 'rgba(0,0,255,0.3)',
    },
  ];

  
}
