import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'formatDate',
  standalone: true
})
export class FormatDatePipe implements PipeTransform {
  transform(value: Date | string | number, format: string = 'dd/MM/yyyy'): string {
    if (!value) return '';
    return formatDate(value, format, 'fr-FR'); // Tu peux changer ici la locale
  }
}
