import { Injectable } from '@angular/core';
import { categories, data } from './data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  getData() {
    return Promise.resolve(data.sort((a, b) => (a.name > b.name ? 1 : -1)));
  }

  getCategories() {
    return Promise.resolve(categories.sort());
  }
}
