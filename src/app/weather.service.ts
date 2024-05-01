import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeatherForecast(gridpoint: string) {
    const apiUrl = `https://api.weather.gov/gridpoints/${gridpoint}/forecast`;
    return this.http.get(apiUrl);
  }
}
