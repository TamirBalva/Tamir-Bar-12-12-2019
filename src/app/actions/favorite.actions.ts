import { createAction, props, Action } from '@ngrx/store';
import { City } from '../models/city';
import { Injectable } from '@angular/core';

export const ADD_FAVORITE       = '[FAVORITE] Add'
export const REMOVE_FAVORITE    = '[FAVORITE] Remove'

@Injectable({
    providedIn: 'root'
})
export class AddFavorite implements Action {
    readonly type = ADD_FAVORITE

    constructor(public payload: City) {}
}

@Injectable({
    providedIn: 'root'
})
export class RemoveFavorite implements Action {
    readonly type = REMOVE_FAVORITE

    constructor(public payload: City) {}
}

export type Actions = AddFavorite | RemoveFavorite