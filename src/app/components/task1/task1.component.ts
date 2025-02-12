import {
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { CategoryProvider } from '../../shared/models/provider.interface';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryProvidersComponent } from './category-providers/category-providers.component';

@Component({
  selector: 'app-task1',
  standalone: true,
  imports: [CategoriesComponent, CategoryProvidersComponent],
  templateUrl: './task1.component.html',
  styleUrl: './task1.component.scss',
})
export class Task1Component {
  dataService = inject(DataService);
  categories = signal<string[]>([]);
  categoryProviders = signal<CategoryProvider[]>([]);
  data = signal<CategoryProvider[]>([]);
  selectedCategory = signal<string | undefined>(undefined);
  categoriesComponent = viewChild(CategoriesComponent);
  providersComponent = viewChild(CategoryProvidersComponent);

  async ngOnInit() {
    const categories = await this.fetchCategories();
    this.categories.update(() => categories);

    const categoryProviders = await this.fetchCategoryProviders();
    this.categoryProviders.update(() => categoryProviders);
  }

  fetchCategories = () => this.dataService.getCategories();
  fetchCategoryProviders = () => this.dataService.getData();
  onCategorySelect = (category: string, scrollFn: () => void) => {
    this.selectedCategory.update(() => {
      return category;
    });

    setTimeout(() => scrollFn(), 100);
  };
  scrollCategoriesComponent = () =>
    this.categoriesComponent()?.scrollToSelected();
  scrollProvidersComponent = () =>
    this.providersComponent()?.scrollToSelected();
}
