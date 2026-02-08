import { IsString, IsNumber, IsIn, Min, Max } from 'class-validator';

import { WEATHER_CONDITIONS } from '@interfaces/weather.interface';

export class CreateWeatherDto {
  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsNumber()
  @Min(-70)
  @Max(50)
  temperature: number;

  @IsString()
  @IsIn([...WEATHER_CONDITIONS])
  condition: string;

  @IsString()
  userId: string;
}
