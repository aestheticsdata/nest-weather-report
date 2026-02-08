import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateWeatherDto } from '@dto/create-weather.dto';
import { USERS } from '@weather/data/users';

import { Weather, WeatherCondition } from '@interfaces/weather.interface';
import { User } from '@interfaces/user.interface';
import { UpdateWeatherDto } from '@weather/dto/update-weather.dto';

@Injectable()
export class WeatherService {
  private weatherReports: Weather[] = [];

  update(id: string, dto: UpdateWeatherDto): Weather {
    const index = this.weatherReports.findIndex((w) => w.id === id);

    if (index === -1) {
      throw new NotFoundException(`Report with id ${id} not found`);
    }

    const currentReport = this.weatherReports[index];

    let userFound = currentReport.user;
    if (dto.userId) {
      const newUser = USERS.find((u) => u.id === dto.userId);
      if (!newUser) {
        throw new NotFoundException(`User ${dto.userId} not found`);
      }
      userFound = newUser;
    }

    const updatedReport: Weather = {
      ...currentReport,
      ...dto,
      condition: (dto.condition as WeatherCondition) || currentReport.condition,
      user: userFound,
    };

    this.weatherReports[index] = updatedReport;
    return updatedReport;
  }

  clear(): void {
    this.weatherReports = [];
  }

  findAll(): Weather[] {
    return this.weatherReports;
  }

  findOne(id: string): Weather {
    const report: Weather | undefined = this.weatherReports.find(
      (w: Weather) => w.id === id,
    );
    if (!report) {
      throw new NotFoundException();
    }
    return report;
  }

  findByCity(city: string): Weather[] {
    return this.weatherReports.filter((w: Weather) => w.city === city);
  }

  findByCountry(country: string): Weather[] {
    return this.weatherReports.filter((w: Weather) => w.country === country);
  }

  create(dto: CreateWeatherDto): Weather {
    const userFound: User | undefined = USERS.find(
      (u: User) => u.id === dto.userId,
    );

    if (!userFound) {
      throw new NotFoundException();
    }

    const newReport: Weather = {
      id: uuidv4(),
      city: dto.city,
      country: dto.country,
      temperature: dto.temperature,
      condition: dto.condition as WeatherCondition,
      user: userFound,
      createdAt: new Date(),
    };

    this.weatherReports.push(newReport);
    return newReport;
  }

  remove(id: string): void {
    const index: number = this.weatherReports.findIndex(
      (w: Weather) => w.id === id,
    );
    if (index === -1) {
      throw new NotFoundException();
    }
    this.weatherReports.splice(index, 1);
  }
}
