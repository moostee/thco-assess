import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { WeatherService } from '../weather.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})

export class WeatherComponent implements OnInit, OnDestroy {
  temperatures: number[] = [];
  labels: string[] = [];
  subscribtion: any;
  constructor(private router: Router, private route: ActivatedRoute, private weatherService: WeatherService) { }

  ngOnInit(): void {

    this.subscribtion = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(event => {
      console.log('Route changed:', event.url);
      const location = this.route.snapshot.paramMap.get('location');
      this.onSelectForecast(location + '/31,80');
    });
  }

  onSelectForecast(gridpoint: string) {

    this.temperatures = [];
    this.labels = [];
    this.weatherService.getWeatherForecast(gridpoint).subscribe((data: any) => {

      this.temperatures = data.properties.periods.map((period: { temperature: any; }) => period.temperature);
      this.labels = data.properties.periods.map((period: { name: any; }) => period.name);
    });
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }
}
