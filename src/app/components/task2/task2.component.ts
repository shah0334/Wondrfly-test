import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  validCategories,
  validCities,
  validPrograms,
} from '../../shared/services/data';

@Component({
  selector: 'app-task2',
  standalone: true,
  imports: [],
  templateUrl: './task2.component.html',
  styleUrl: './task2.component.scss',
})
export class Task2Component {
  city?: string;
  program?: string;
  category?: string;
  filteredData: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const { city, program, category } = params;

      if (city && !validCities.includes(city)) {
        this.router.navigate(['/404']);
        return;
      }
      if (category && !validCategories.includes(category)) {
        this.router.navigate(['/404']);
        return;
      }
      if (program && !validPrograms.includes(program)) {
        this.router.navigate(['/404']);
        return;
      }

      this.city = city;
      this.program = program;
      this.category = category;
    });
  }
}
