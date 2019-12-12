import { Injectable } from '@angular/core';
import { DailyForecasts } from '../models/forecast';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CurrentForecast } from '../models/current-foreacast';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class Forecast {

  constructor(private httpClient: HttpClient) { }

  private apikeys = [
    "6GWhdwqk8zRrfrNBjGUkiVBzxjfVN3FB"
  ];
  public getFiveDayForecast(cityKey: string): Observable<DailyForecasts> {
    return this.httpClient.get<any>(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${this.apikeys[0]}&metric=true`);

  }

  public getCurrentForecast(cityKey: string): Observable<string> {
    return this.httpClient.get<any>(`https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${this.apikeys[0]}`);
  }

  public getGeoLocation(lat: number, lon: number): Observable<City> {
    return this.httpClient.get<any>(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${this.apikeys[0]}&q=${lat},${lon}`);
  }
}