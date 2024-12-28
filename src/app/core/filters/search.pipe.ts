import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchQuery: string, fields: string[]): any[] {
    if (!items || !searchQuery) {
      return items;
    }

    const query = searchQuery.toLowerCase();

    return items.filter((item) =>
      fields.some((field) =>
        item[field]?.toString().toLowerCase().includes(query)
      )
    );
  }
}
