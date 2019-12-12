import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CitySearchService {

  constructor(private httpClient: HttpClient) { }

  private apikeys = [
    "6GWhdwqk8zRrfrNBjGUkiVBzxjfVN3FB"
  ];
  public getCityKey(city: string): Observable<City[]> {
    return this.httpClient.get<any>(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.apikeys[0]}&q=${city}&language=en-us`);
  }
}
