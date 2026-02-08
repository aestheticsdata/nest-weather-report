import type { User } from '@interfaces/user.interface';

export const WEATHER_CONDITIONS = [
  'sunny',
  'rainy',
  'cloudy',
  'stormy',
  'snowy',
] as const;
export type WeatherCondition = (typeof WEATHER_CONDITIONS)[number];

export interface Weather {
  id: string;
  country: string;
  city: string;
  temperature: number;
  condition: WeatherCondition;
  createdAt: Date;
  user: User;
}
