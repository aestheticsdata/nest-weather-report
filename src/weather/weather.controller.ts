import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { WeatherLoggerInterceptor } from '@weather/interceptors/weather-logger.interceptor';
import { WeatherService } from '@weather/weather.service';
import { WeatherAuthGuard } from '@weather/guards/weather-auth.guard';
import { CreateWeatherDto } from '@dto/create-weather.dto';
import { UpdateWeatherDto } from '@dto/update-weather.dto';
import { CitySanitizerPipe } from '@app/weather/pipes/city-sanitizer.pipe';
import { CapitalizePipe } from '@app/weather/pipes/city-capitalize.pipe';
import { RoundTemperaturePipe } from '@app/weather/pipes/temperature-rounded.pipe';
import type { Weather } from '@interfaces/weather.interface';

@UseInterceptors(WeatherLoggerInterceptor)
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  @UseGuards(WeatherAuthGuard)
  create(
    @Body('city', CitySanitizerPipe, CapitalizePipe) sanitizedCity: string,
    @Body('temperature', RoundTemperaturePipe) roundedTemperature: number,
    @Body() createWeatherDto: CreateWeatherDto,
  ): Weather {
    createWeatherDto.city = sanitizedCity;
    createWeatherDto.temperature = roundedTemperature;

    return this.weatherService.create(createWeatherDto);
  }

  @Patch(':id')
  @UseGuards(WeatherAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateWeatherDto: UpdateWeatherDto,
  ): Weather {
    return this.weatherService.update(id, updateWeatherDto);
  }

  @Get()
  findAll(): Weather[] {
    return this.weatherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Weather {
    return this.weatherService.findOne(id);
  }

  @Get('city/:city')
  findByCity(@Param('city') city: string): Weather[] {
    return this.weatherService.findByCity(city);
  }

  @Get('country/:country')
  findByCountry(@Param('country') country: string): Weather[] {
    return this.weatherService.findByCountry(country);
  }

  @Delete(':id')
  @UseGuards(WeatherAuthGuard)
  remove(@Param('id') id: string): void {
    return this.weatherService.remove(id);
  }

  @Delete()
  @UseGuards(WeatherAuthGuard)
  removeAll(): void {
    return this.weatherService.clear();
  }
}
