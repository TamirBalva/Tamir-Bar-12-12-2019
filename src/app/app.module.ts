import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { StoreModule } from '@ngrx/store';
import { favoritesReducer } from './reducers/favorite.reducer';
import { FavoritesComponent } from './components/favorites/favorites.component';

@NgModule({
  declarations: [
    WeatherForecastComponent,
    LayoutComponent,
    HeaderComponent,
    FavoritesComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatSnackBarModule,

    HttpClientModule,
    AppRoutingModule,
    AngularSvgIconModule,
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      city: favoritesReducer
    }),
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
