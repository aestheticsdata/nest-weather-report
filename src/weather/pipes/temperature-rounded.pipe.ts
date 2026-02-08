import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class RoundTemperaturePipe implements PipeTransform {
  transform(value: number): number {
    if (typeof value !== 'number') return value;
    // Round to 1 decimal place
    return Math.round(value * 10) / 10;
  }
}
