import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  input,
  output,
  viewChild,
  viewChildren,
} from '@angular/core';
import { MatChip, MatChipSet, MatChipsModule } from '@angular/material/chips';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatChipsModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  categories = input<string[]>();
  selectedCategory = input<string | undefined>();
  categorySelected = output<string>();
  list = viewChildren(MatChip, {
    read: ElementRef<HTMLElement>,
  });
  scrollContainer = viewChild<ElementRef<HTMLElement>>('list');

  scrollToSelected() {
    console.log('categoris scroll to called');
    const selectedCategory = this.selectedCategory();

    const element = this.list().find(
      (selectable) =>
        selectable.nativeElement.getAttribute('data-category') ===
        selectedCategory
    );

    element?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });

    // const scrollContainer = this.scrollContainer();

    // scrollContainer?.nativeElement.scrollTo(element?.nativeElement.offsetLeft);
    // console.log(scrollContainer);

    // element?.nativeElement.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'center',
    // });
  }

  onCategorySelect = (category: string) => this.categorySelected.emit(category);
}
