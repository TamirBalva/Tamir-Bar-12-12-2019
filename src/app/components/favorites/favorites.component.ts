import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city';
import { Forecast } from 'src/app/services/forecast.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { CurrentForecast } from 'src/app/models/current-foreacast';
import { Router } from '@angular/router';
import * as favorites from 'src/app/actions/favorite.actions';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  public temp: City = new City();
  public favoritedCities: City[] = [];
  public favoritedCitiesForecasts: CurrentForecast[] = [];

  public color: boolean = true;
  public isImperial = false;

  constructor(private forecastForFavorite: Forecast, private store: Store<AppState>, private router: Router, private snack: MatSnackBar) { }

  ngOnInit() {
    for (var i = 0, len = localStorage.length; i < len; ++i) {
      this.temp = new City();
      this.temp.Key = (+localStorage.key(i)).toString();
      this.temp.LocalizedName = localStorage.getItem(localStorage.key(i));
      this.favoritedCities.push(this.temp);
      this.forecastForFavorite.getCurrentForecast(this.temp.Key).subscribe(res => {
        this.favoritedCitiesForecasts.push(res[0])
      }, err => {
        this.callSnackBar(err.message)
      })
    }
  }
  public toggle(event) {
    this.isImperial = event.checked;
  }

  public toggeleFavorite(city: City) {
    if (localStorage.getItem(city.Key) !== null) {
      if (confirm("Remove " + city.LocalizedName + " from favorites?")) {
        this.store.dispatch(new favorites.RemoveFavorite(city));
        this.callSnackBar(city.LocalizedName + " has been removed from favorites.");
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(['favorites']);
        });
        this.color = false;
      }
    } else {
      this.store.dispatch(new favorites.AddFavorite(city));
      this.callSnackBar(city.LocalizedName + " has been added to favorites.")
      this.color = true;
    }
  }

  public callSnackBar(message: string, action = '') {
    this.snack.open(message, action, {
      duration: 2500,
      panelClass: ['my-snack-bar']
    });
  }

  public goToHome(i: number) {
    sessionStorage.setItem("searched-city-key", this.favoritedCities[i].Key)
    sessionStorage.setItem("searched-city-name", this.favoritedCities[i].LocalizedName)

  }
}
