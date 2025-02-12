import {
  Component,
  effect,
  ElementRef,
  input,
  OnInit,
  output,
  viewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatListModule,
  MatListSubheaderCssMatStyler,
} from '@angular/material/list';
import { CategoryProvider } from '../../shared/models/provider.interface';

@Component({
  selector: 'app-category-providers',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './category-providers.component.html',
  styleUrl: './category-providers.component.scss',
})
export class CategoryProvidersComponent {
  categoryProviders = input.required<CategoryProvider[]>();
  selectedCategory = input.required<string | undefined>();
  updateSelectedCategory = output<string>();
  categoryProviderElems = viewChildren(MatListSubheaderCssMatStyler, {
    read: ElementRef<HTMLElement>,
  });

  disableObserver: boolean = false;

  constructor() {
    effect(() => {
      const elements = this.categoryProviderElems();
      if (elements.length) {
        this.setupScrollObserver(elements);
      }
    });
  }

  onCategorySelect = (category: string) =>
    this.updateSelectedCategory.emit(category);

  setupScrollObserver(elements: readonly ElementRef[]) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (this.disableObserver) {
          return;
        }

        for (let entry of entries) {
          if (entry.isIntersecting) {
            console.log(entry.target.getAttribute('data-category'));
            this.updateSelectedCategory.emit(
              entry.target.getAttribute('data-category')!
            );
          }
        }

        // console.log(
        //   entries.map((entry) => entry.target.getAttribute('data-category')),
        //   entries
        // );

        // const fullyShownEntry = entries[0];
        // const selectedCategory =
        //   fullyShownEntry?.target.getAttribute('data-category');
        // if (selectedCategory)
        //   this.updateSelectedCategory.emit(selectedCategory);
      },
      { threshold: 1 }
    );

    elements.forEach((selectable) => {
      observer.observe(selectable.nativeElement);
    });
  }

  getElementValueAndUpdateSelectable(provider: Element) {
    const category = provider.getAttribute('data-category') || '';
    console.log(category);
    this.updateSelectedCategory.emit(category);
  }

  scrollToSelected() {
    console.log('categoris scroll to called');
    const selectedCategory = this.selectedCategory();
    const element = this.categoryProviderElems().find(
      (selectable) =>
        selectable.nativeElement.getAttribute('data-category') ===
        selectedCategory
    );

    element?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    this.disableObserver = true;

    setTimeout(() => {
      this.disableObserver = false;
    }, 2000);

    this.flashElement(element!);
  }

  flashElement(element: ElementRef<HTMLDivElement>) {
    const elements = this.categoryProviderElems();
    elements.forEach((elem) =>
      elem.nativeElement.classList.remove('flash-primary')
    );

    (element?.nativeElement as HTMLDivElement).classList.add('flash-primary');
  }
}
