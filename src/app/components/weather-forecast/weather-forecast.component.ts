import { Component, OnInit } from '@angular/core';
import { Forecast } from 'src/app/services/forecast.service';
import { DailyForecasts } from 'src/app/models/forecast';
import { CitySearchService } from 'src/app/services/city-search.service';
import { FormControl } from '@angular/forms';
import { City } from 'src/app/models/city';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import * as favorites from 'src/app/actions/favorite.actions';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {

  public cityForm = new FormControl();
  public city: City = new City();
  public cities;
  public forecastCards: DailyForecasts[] = [];

  private defaultForecast = "215854";

  public color: boolean = false;
  public isImperial = false;
  public headerTemp: number;
  public headerCity: string;


  constructor(public forecast: Forecast, private citySearchService: CitySearchService, private store: Store<AppState>, private snack: MatSnackBar, private titleService: Title) { }


  ngOnInit() {
    this.titleService.setTitle("Herolo Weather App Task");
    if (sessionStorage.getItem("searched-city-key") === null) {
      this.findLocation();
    }
    setTimeout(()=>{
    if (sessionStorage.getItem("searched-city-key") === null) { // this will fire as default only if 'findLocation' has been turned down, or has not worked properly
      this.forecast.getFiveDayForecast(this.defaultForecast).subscribe(res => {
        this.forecastCards = res.DailyForecasts;
        this.headerCity = "Tel-Aviv"
        this.city.Key = this.defaultForecast;
        this.city.LocalizedName = this.headerCity;
        this.headerTemp = res.DailyForecasts[0].Temperature.Maximum.Value;
        if (localStorage.getItem(this.city.Key) !== null) {
          this.color = true;
        }
        else {
          this.color = false;
        }
      }, err => {
        this.callSnackBar(err.message, 'Dismiss');
      })
    }
    else {
      this.forecast.getFiveDayForecast(sessionStorage.getItem("searched-city-key")).subscribe(res => {
        this.forecastCards = res.DailyForecasts;
        this.headerCity = sessionStorage.getItem("searched-city-name")
        this.city.Key = sessionStorage.getItem("searched-city-key")
        this.city.LocalizedName = this.headerCity;
        this.headerTemp = res.DailyForecasts[0].Temperature.Maximum.Value;
        if (localStorage.getItem(this.city.Key) !== null) {
          this.color = true;
        }
        else {
          this.color = false;
        }
      }, err => {
        this.callSnackBar(err.message, 'Dismiss');
      })
    }
  }, 1000)

  }

  public onSearchInvoke() {
    this.callSnackBar("Finding the weather forecast for " + sessionStorage.getItem("searched-city-name"), 'Dismiss')
    setTimeout(() => {
      this.forecast.getFiveDayForecast(sessionStorage.getItem("searched-city-key")).subscribe(res => {
        this.forecastCards = res.DailyForecasts;
        this.headerCity = sessionStorage.getItem("searched-city-name");
        this.headerTemp = res.DailyForecasts[0].Temperature.Maximum.Value;
        if (localStorage.getItem(this.city.Key) !== null) {
          this.color = true;
        }
        else {
          this.color = false;
        }
      },
        err => {
          this.callSnackBar(err.message, 'Dismiss');
        })
    }, 2000);

  }
  // area autocomplete start
  public autoComplete(value) {
    this.citySearchService.getCityKey(value).subscribe(res => {
      this.cities = res;
    }, err => {
      this.callSnackBar(err.error.Message, 'Dismiss');
    });
  }

  public onOptionSelected(selectedCity) {
    this.city = selectedCity;
    sessionStorage.setItem("searched-city-key", this.city.Key);
    sessionStorage.setItem("searched-city-name", this.city.LocalizedName);
  }
  // area autocomplete end

  public toggle(event) {
    this.isImperial = event.checked;
  }


  public toggeleFavorite() {
    if (localStorage.getItem(this.city.Key) !== null) {
      if (confirm("Remove " + this.city.LocalizedName + " from favorites?")) {
        this.store.dispatch(new favorites.RemoveFavorite(this.city));
        this.callSnackBar(this.city.LocalizedName + " has been removed from favorites.", 'Dismiss');
        this.color = false;
      }
    } else {
      this.store.dispatch(new favorites.AddFavorite(this.city));
      this.callSnackBar(this.city.LocalizedName + " has been added to favorites.", 'Dismiss')
      this.color = true;
    }
  }

  public findLocation() {
    this.forecastCards = [];
    try{

    
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        this.callSnackBar("Locating...", 'Dismiss');
        setTimeout(() => {
          this.forecast.getGeoLocation(position.coords.latitude, position.coords.longitude).subscribe(resMain => {
            this.city.LocalizedName = resMain.LocalizedName;
            this.city.Key = resMain.Key;
            sessionStorage.setItem("searched-city-key", resMain.Key);
            sessionStorage.setItem("searched-city-name", resMain.LocalizedName);
            if (localStorage.getItem(resMain.Key) !== null) {
              this.color = true;
            }
            else {
              this.color = false;
            }
            this.forecast.getFiveDayForecast(resMain.Key).subscribe(resSecondary => {
              this.forecastCards = resSecondary.DailyForecasts;
              this.headerTemp = resSecondary.DailyForecasts[0].Temperature.Maximum.Value;
              this.headerCity = resMain.LocalizedName;

            }, err => {
              this.callSnackBar(err.error.Message, 'Dismiss');
            });
          }, err => {
            this.callSnackBar(err.error.Message, 'Dismiss')
          });
        }, 1000);
      }, err => {
        this.callSnackBar('Unable to retrieve your location without permission', 'Dismiss');
      });

    }
  }
  catch (err){
    console.log("got to catch")
    this.callSnackBar(err.error.Message, 'Dismiss')
  }
  }

  public callSnackBar(message: string, action = '') {
    this.snack.open(message, action, {
      duration: 2500,
      panelClass: ['my-snack-bar']
    });
  }
}
