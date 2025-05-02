import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';
@Pipe({
  name: 'egyptTime'
})
export class EgyptTimePipe implements PipeTransform {

  transform(value: string | Date): string {
    if (!value) return '';

    try {
      return DateTime
        .fromISO(new Date(value).toISOString(), { zone: 'Africa/Cairo' })
        .toFormat('yyyy-MM-dd HH:mm');
    } catch (error) {
      return '';
    }
  }
}
