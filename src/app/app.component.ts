import {
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { CategoriesComponent } from './components/categories/categories.component';
import { DataService } from './shared/services/data.service';
import { CategoryProvidersComponent } from './components/category-providers/category-providers.component';
import { CategoryProvider } from './shared/models/provider.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CategoriesComponent, CategoryProvidersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
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
