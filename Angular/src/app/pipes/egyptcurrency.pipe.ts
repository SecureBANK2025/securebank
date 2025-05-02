import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'egyptcurrency'
})
export class EgyptcurrencyPipe implements PipeTransform {

  transform(value: number, showSymbol: boolean = true): string {
    if (typeof value !== 'number') return '';

    const formatted = new Intl.NumberFormat('en-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 2,
    }).format(value);

    return showSymbol ? formatted : formatted.replace('E£', '').trim();
  }

}
