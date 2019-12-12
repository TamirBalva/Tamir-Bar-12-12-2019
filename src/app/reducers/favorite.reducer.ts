import { City } from '../models/city';
import * as favorites from '../actions/favorite.actions';


export function favoritesReducer(state: City[] = [], action: favorites.Actions) {
  switch (action.type) {
      case favorites.ADD_FAVORITE:
          localStorage.setItem(action.payload.Key, action.payload.LocalizedName);
          return [...state, action.payload];
      case favorites.REMOVE_FAVORITE:
          localStorage.removeItem(action.payload.Key);
          return state.filter(city => city !== action.payload)
      default:
          return state;
  }
}
