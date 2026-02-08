import {
  IsString,
  IsNumber,
  IsIn,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { WEATHER_CONDITIONS } from '@interfaces/weather.interface';

export class UpdateWeatherDto {
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsNumber()
  @Min(-70)
  @Max(50)
  temperature?: number;

  @IsOptional()
  @IsString()
  @IsIn([...WEATHER_CONDITIONS])
  condition?: string;

  @IsOptional()
  @IsString()
  userId?: string;
}
