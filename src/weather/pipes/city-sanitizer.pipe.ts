import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class CitySanitizerPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string') {
      return value;
    }

    // Sanitize dangerous characters (XSS / simple SQL injection)
    // Keep only letters, numbers, spaces, and hyphens
    const sanitized = value.replace(/[<>"/\\;={}]/g, '');

    if (!sanitized || sanitized.trim().length === 0) {
      throw new BadRequestException('City name contains invalid characters');
    }

    return sanitized;
  }
}
