import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import type { Weather } from '@interfaces/weather.interface';

@Injectable()
export class WeatherLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data: Weather | Weather[]) => {
        console.log('\n--- [WEATHER REPORT LOG] ---');

        const reports = Array.isArray(data) ? data : [data];

        const logData = reports.map((r) => ({
          id: r.id,
          city: r.city,
          temp: `${r.temperature}°C`,
          condition: r.condition,
          user: r.user?.username || 'Unknown',
        }));

        console.table(logData);
      }),
    );
  }
}
