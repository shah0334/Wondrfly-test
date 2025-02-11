import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  input,
  output,
  viewChildren,
} from '@angular/core';
import { MatChip, MatChipsModule } from '@angular/material/chips';
import { AutoSelectDirective } from '../../shared/directives/auto-select.directive';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatChipsModule, CommonModule, AutoSelectDirective],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  categories = input<string[]>();
  selectedChip = input<string | undefined>();
  categorySelected = output<string>();

  categoryElems = viewChildren(MatChip, {
    read: ElementRef<HTMLElement>,
  });

  onCategorySelect = (category: string) => this.categorySelected.emit(category);
}
