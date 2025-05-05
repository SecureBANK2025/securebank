import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumberFormat'
})
export class CardNumberFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    // Add a space after every 4 digits
    return value.replace(/(.{4})/g, '$1 ').trim();
  }
}
