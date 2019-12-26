import {CurrentWeather} from './Meteo';

export interface Beach {
  idBeach?: number;
  name?: string;
  city?: string;
  province?: string;
  latitude?: number;
  longitude?: number;
  orientation?: string;
  park?: boolean;
  food_service?: boolean;
  lifeguard?: boolean;
  dogs_allowed?: boolean;
  summer_crowding?: boolean;
  photo?: string;
  weatherIcon?: string;
  weather: CurrentWeather;
  traffic?: number;
  beach_service?: boolean;
}

export const Orientation = {
  Nord: 'Nord',
  Sud: 'Sud',
  Ovest: 'Ovest',
  Est: 'Est',
};
