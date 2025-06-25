import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cfaFormat',
  standalone: true 
})
export class CfaFormatPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value === null || value === undefined) return '';
    const numericValue = typeof value === 'string'
      ? parseFloat(value.replace(/\s/g, '').replace(/[^0-9.]/g, ''))
      : value;
    if (isNaN(numericValue)) return '';
    return numericValue.toLocaleString('fr-FR') + ' F CFA';
  }
}
