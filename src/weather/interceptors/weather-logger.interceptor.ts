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

        // Filter out undefined/null elements before mapping to avoid errors
        const logData = reports
          .filter((r) => r != null && r.id != null)
          .map((r) => ({
            id: r.id,
            city: r.city,
            temp: `${r.temperature}°C`,
            condition: r.condition,
            user: r.user?.username || 'Unknown',
          }));

        // Only log if there's data to display
        if (logData.length > 0) {
          console.table(logData);
        } else {
          console.log('No weather reports to display');
        }
      }),
    );
  }
}
