import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { FavoritesComponent } from './components/favorites/favorites.component';


const routes: Routes = [
  { path: "home", component: WeatherForecastComponent },
  { path: "favorites", component: FavoritesComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", component: WeatherForecastComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
