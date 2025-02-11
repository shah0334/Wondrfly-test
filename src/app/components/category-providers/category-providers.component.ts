import {
  Component,
  effect,
  ElementRef,
  input,
  OnInit,
  output,
  ProviderToken,
  Signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatList,
  MatListModule,
  MatListSubheaderCssMatStyler,
} from '@angular/material/list';
import { CategoryProvider } from '../../shared/models/provider.interface';
import { AutoSelectDirective } from '../../shared/directives/auto-select.directive';

@Component({
  selector: 'app-category-providers',
  standalone: true,
  imports: [CommonModule, MatListModule, AutoSelectDirective],
  templateUrl: './category-providers.component.html',
  styleUrl: './category-providers.component.scss',
})
export class CategoryProvidersComponent implements OnInit {
  categoryProviders = input.required<CategoryProvider[]>();
  selectedCategory = input.required<string | undefined>();
  updateSelectedCategory = output<string>();

  categoryProviderElems = viewChildren(MatListSubheaderCssMatStyler, {
    read: ElementRef<HTMLElement>,
  });

  constructor() {}

  ngOnInit(): void {}

  onCategorySelect = (category: string) =>
    this.updateSelectedCategory.emit(category);
}
